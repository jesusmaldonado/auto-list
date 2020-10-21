import React, { useState, useEffect, useRef } from "react";
import {
  Car,
  CarResponseProps,
  Situations,
  StateObject,
} from "../typings/types";
import Loading from "./Loading";
import ListView from "./ListView";

import FilterView from "./FilterView";
import { BASE_URL_CARS, initialState } from "../utilities/constants";
import { Fade, Box } from "@material-ui/core";
import DetailView from "./DetailView";

export default function MainView() {
  const cache = useRef({});

  let [state, setCurrentState] = useState(initialState);
  let {
    page,
    cars,
    totalPageCount,
    totalCarsCount,
    loading,
    manufacturer,
    color,
    filterClicked,
    detailClicked,
    currentCar,
    favoriteCars,
  }: StateObject = state;
  useEffect(() => {
    const url = new URL(BASE_URL_CARS);
    url.searchParams.append("page", String(page));
    if (color !== "") {
      url.searchParams.append("color", color);
    }
    if (manufacturer !== "") {
      url.searchParams.append("manufacturer", manufacturer);
    }
    if (cache.current[url.toString()]) {
      handleDataChange(cache.current[url.toString()]);
    } else {
      fetch(url.toString())
        .then((resp) => resp.json())
        .then((data: CarResponseProps) => {
          cache.current[url.toString()] = data;
          handleDataChange(data);
        });
    }

    return () => {};
    // we ignore certain dependencies
    // on purpose because we only want to fetch on filter click
    // or on page click
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterClicked]);
  useEffect(() => {
    window.addEventListener("storage", checkFavorites);
    checkFavorites();
    return () => {
      window.removeEventListener("storage", checkFavorites);
    };
  }, []);
  function checkFavorites() {
    const favorites = localStorage.getItem("favoriteCars");

    if (favorites) {
      setCurrentState((prev) => ({
        ...prev,
        favoriteCars: JSON.parse(favorites),
      }));
    }
  }
  var handleDataChange = (data: CarResponseProps) => {
    const { cars, totalPageCount, totalCarsCount } = data;
    setCurrentState((prev: any) => ({
      ...prev,
      filterClicked: false,
      loading: false,
      cars: cars,
      totalCarsCount,
      totalPageCount,
    }));
  };

  const handleColorChange = (color: string) => {
    setCurrentState((prev) => ({
      ...prev,
      color,
    }));
  };

  const handleManufacturerChange = (manufacturer: string) => {
    setCurrentState((prev) => ({
      ...prev,
      manufacturer,
    }));
  };

  const handleFilterClicked = () => {
    setCurrentState((prev) => ({
      ...prev,
      page: 1,
      filterClicked: true,
    }));
  };
  const handlePages = (situation: Situations) => {
    switch (situation) {
      case "previous":
        if (page - 1 >= 1) {
          setCurrentState((prev) => ({
            ...prev,
            page: page - 1,
          }));
        }
        break;
      case "first":
        setCurrentState((prev) => ({
          ...prev,
          page: 1,
        }));
        break;
      case "next":
        if (page + 1 <= totalPageCount) {
          setCurrentState((prev) => ({
            ...prev,
            page: page + 1,
          }));
        }
        break;
      case "last":
        if (page !== totalPageCount) {
          setCurrentState((prev) => ({
            ...prev,
            page: totalPageCount,
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleDetailClicked = (car: Car) => {
    setCurrentState((prev: any) => ({
      ...prev,
      detailClicked: true,
      currentCar: car,
    }));
  };

  const handleSaveClicked = (car: Car) => {
    if (car) {
      const favorites = localStorage.getItem("favoriteCars");
      if (favorites) {
        let favoriteCars = JSON.parse(favorites);
        favoriteCars[car.stockNumber] = favoriteCars[car.stockNumber]
          ? false
          : true;
        localStorage.setItem("favoriteCars", JSON.stringify(favoriteCars));
      } else {
        localStorage.setItem(
          "favoriteCars",
          JSON.stringify({
            [car.stockNumber]: true,
          })
        );
      }
    }
    setCurrentState((prev) => ({
      ...prev,
      currentCar: null,
      detailClicked: false,
    }));
    checkFavorites();
  };

  return (
    <>
      <Box display="flex">
        {!detailClicked && (
          <Fade
            in={true}
            timeout={{
              appear: 400,
              enter: 400,
              exit: 400,
            }}
          >
            <FilterView
              handleColorChange={handleColorChange}
              handleManufacturerChange={handleManufacturerChange}
              currentColor={color}
              currentManufacturer={manufacturer}
              handleFilterClicked={handleFilterClicked}
            ></FilterView>
          </Fade>
        )}
        {!loading && !detailClicked && (
          <Fade
            in={true}
            timeout={{
              appear: 200,
              enter: 200,
              exit: 100,
            }}
          >
            <ListView
              favoriteCars={favoriteCars}
              cars={cars}
              totalCarsCount={totalCarsCount}
              page={page}
              pageCount={totalPageCount}
              handlePages={handlePages}
              handleDetailClicked={handleDetailClicked}
            />
          </Fade>
        )}
        {loading && (
          <Fade
            in={true}
            timeout={{
              appear: 400,
              enter: 400,
              exit: 400,
            }}
          >
            <Loading></Loading>
          </Fade>
        )}
        {!loading && detailClicked && currentCar && (
          <Fade
            in={true}
            timeout={{
              appear: 400,
              enter: 400,
              exit: 400,
            }}
          >
            <DetailView
              car={currentCar}
              favoriteCars={favoriteCars}
              handleSaveClicked={handleSaveClicked}
            ></DetailView>
          </Fade>
        )}
      </Box>
    </>
  );
}
