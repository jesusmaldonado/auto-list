import React, { useState, useEffect, useRef } from "react";
import { Car, CarResponseProps, Situations } from "../typings/types";
import Loading from "./Loading";
import Box from "@material-ui/core/Box";
import ListView from "./ListView";
import Footer from "./Footer";

import FilterView from "./FilterView";
import { BASE_URL_CARS } from "../utilities/constants";
import Fade from "@material-ui/core/Fade";
export default function MainView() {
  const cache = useRef({});
  let [page, setPage] = useState(1);
  let [data, setData] = useState<Car[]>([]);
  let [pageCount, setPageCount] = useState<number>(0);
  let [totalCarsCount, setCarsCount] = useState<number>(0);
  let [loading, setLoading] = useState(true);
  let [currentManufacturer, setCurrentManufacturer] = useState("");
  let [currentColor, setCurrentColor] = useState("");
  let [filterClicked, setFilterClicked] = useState(false);
  useEffect(() => {
    const url = new URL(BASE_URL_CARS);
    url.searchParams.append("page", page);
    if (currentColor !== "") {
      url.searchParams.append("color", currentColor);
    }
    if (currentManufacturer !== "") {
      url.searchParams.append("manufacturer", currentManufacturer);
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
  }, [page, filterClicked]);

  var handleDataChange = (data: CarResponseProps) => {
    setFilterClicked(false);
    setLoading(false);
    const { cars, totalPageCount, totalCarsCount } = data;
    setData(cars);
    setCarsCount(totalCarsCount);
    setPageCount(totalPageCount);
  };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  };

  const handleManufacturerChange = (manufacturer: string) => {
    setCurrentManufacturer(manufacturer);
  };

  const handleFilterClicked = () => {
    setPage(1);
    setFilterClicked(true);
  };
  const handlePages = (situation: Situations) => {
    switch (situation) {
      case "previous":
        if (page - 1 >= 1) {
          setPage(page - 1);
        }
        break;
      case "first":
        setPage(1);
        break;
      case "next":
        if (page + 1 <= pageCount) {
          setPage(page + 1);
        }
        break;
      case "last":
        if (page !== pageCount) {
          setPage(pageCount);
        }
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Box display="flex">
        <FilterView
          handleColorChange={handleColorChange}
          handleManufacturerChange={handleManufacturerChange}
          currentColor={currentColor}
          currentManufacturer={currentManufacturer}
          handleFilterClicked={handleFilterClicked}
        ></FilterView>
        {!loading && (
          <Fade in={true}>
            <ListView
              cars={data as Car[]}
              count={data.length}
              totalCarsCount={totalCarsCount}
              page={page}
              pageCount={pageCount}
              handlePages={handlePages}
            />
          </Fade>
        )}
        {loading && (
          <Fade in={!loading}>
            <Loading></Loading>
          </Fade>
        )}
      </Box>
      <Footer />
    </>
  );
}
