import React, { useState, useEffect } from "react";
import { Car, CarResponseProps, Situations } from "../typings/types";
import Loading from "./Loading";
import Box from "@material-ui/core/Box";
import ListView from "./ListView";
import FilterView from "./FilterView";
import { BASE_URL_CARS } from "../utilities/constants";
export default function MainView() {
  let [page, setPage] = useState(1);
  let [data, setData] = useState<Car[]>([]);
  let [pageCount, setPageCount] = useState<number>(0);
  let [totalCarsCount, setCarsCount] = useState<number>(0);
  let [loading, setLoading] = useState(true);
  let [currentManufacturer, setCurrentManufacturer] = useState("");
  let [currentColor, setCurrentColor] = useState("");
  useEffect(() => {
    fetch(
      `${BASE_URL_CARS}?page=${page}&color=${currentColor}&manufacturer=${currentManufacturer}`
    )
      .then((resp) => resp.json())
      .then((data: CarResponseProps) => {
        setLoading(false);
        const { cars, totalPageCount, totalCarsCount } = data;
        setData(cars);
        setCarsCount(totalCarsCount);
        setPageCount(totalPageCount);
      });
    return () => {};
  }, [page, currentColor, currentManufacturer]);
  const handleColorChange = (color: string) => {
    setPage(1);
    setCurrentColor(color);
  };
  const handleManufacturerChange = (manufacturer: string) => {
    setCurrentManufacturer(manufacturer);
    setPage(1);
  };
  const handlePages = (situation: Situations) => {
    switch (situation) {
      case "previous":
        break;
      case "first":
        break;
      case "next":
        break;
      case "last":
        break;
      default:
        break;
    }
  };
  return (
    <>
      {loading && <Loading />}
      {!loading && data.length && (
        <Box display="flex">
          <FilterView
            handleColorChange={handleColorChange}
            handleManufacturerChange={handleManufacturerChange}
            currentColor={currentColor}
            currentManufacturer={currentManufacturer}
          ></FilterView>
          <ListView
            cars={data as Car[]}
            count={data.length}
            totalCarsCount={totalCarsCount}
            page={page}
            pageCount={pageCount}
            handlePages={handlePages}
          />
        </Box>
      )}
    </>
  );
}
