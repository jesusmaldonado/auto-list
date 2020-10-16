import React, { useState, useEffect, useRef } from "react";
import {
  Car,
  CarResponseProps,
  Situations,
  StateObject,
} from "../typings/types";
import Loading from "./Loading";
import ListView from "./ListView";
import Footer from "./Footer";

import FilterView from "./FilterView";
import { BASE_URL_CARS } from "../utilities/constants";
import { Fade, Box } from "@material-ui/core";

const initialState = {
  page: 1,
  cars: [],
  totalPageCount: 0,
  totalCarsCount: 0,
  loading: true,
  manufacturer: "",
  color: "",
  filterClicked: false,
  detailClicked: false,
  currentCar: null,
};

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

  var handleDataChange = (data: CarResponseProps) => {
    const { cars, totalPageCount, totalCarsCount } = data;
    setCurrentState({
      ...state,
      filterClicked: false,
      loading: false,
      cars,
      totalCarsCount,
      totalPageCount,
    });
  };

  const handleColorChange = (color: string) => {
    setCurrentState({
      ...state,
      color,
    });
  };

  const handleManufacturerChange = (manufacturer: string) => {
    setCurrentState({
      ...state,
      manufacturer,
    });
  };

  const handleFilterClicked = () => {
    setCurrentState({
      ...state,
      page: 1,
      filterClicked: true,
    });
  };
  const handlePages = (situation: Situations) => {
    switch (situation) {
      case "previous":
        if (page - 1 >= 1) {
          setCurrentState({ ...state, page: page - 1 });
        }
        break;
      case "first":
        setCurrentState({ ...state, page: 1 });
        break;
      case "next":
        if (page + 1 <= totalPageCount) {
          setCurrentState({ ...state, page: page + 1 });
        }
        break;
      case "last":
        if (page !== totalPageCount) {
          setCurrentState({ ...state, page: totalPageCount });
        }
        break;
      default:
        break;
    }
  };

  const handleDetailClicked = (car: Car) => {
    setCurrentState({
      ...state,
      detailClicked: true,
      currentCar: car,
    });
  };
  return (
    <>
      <Box display="flex">
        {!detailClicked && (
          <FilterView
            handleColorChange={handleColorChange}
            handleManufacturerChange={handleManufacturerChange}
            currentColor={color}
            currentManufacturer={manufacturer}
            handleFilterClicked={handleFilterClicked}
          ></FilterView>
        )}
        {!loading && !detailClicked && (
          <Fade in={true}>
            <ListView
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
          <Fade in={!loading}>
            <Loading></Loading>
          </Fade>
        )}
        {!loading && detailClicked && (
          <Fade in={true}>
            <div>'Detail View</div>
          </Fade>
        )}
      </Box>
      <Footer />
    </>
  );
}
