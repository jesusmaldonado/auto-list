import React from "react";
import { render, screen } from "@testing-library/react";
import ListView from "../components/ListView";
import cars from "../fixtures/cars.json";
import userEvent from "@testing-library/user-event";

const handlePages = jest.fn();
const handleDetailClicked = jest.fn();
const sampleListViewProps = {
  cars,
  totalCarsCount: 1000,
  favoriteCars: {
    10028: true,
  },
  page: 2,
  pageCount: 3,
  handlePages,
  handleDetailClicked,
};
test("List View Renders a list of 10 Cars", () => {
  render(<ListView {...sampleListViewProps} />);
  const elements = screen.getAllByTestId("car-name");
  expect(elements.length).toEqual(10);
});

test("List View renders the appropriate number of counts of cars", () => {
  render(<ListView {...sampleListViewProps} />);
  const elements = screen.getByText("Showing 10 of 1000 results");
  expect(elements).toBeInTheDocument();
});

test("List View Renders an appropriate page view", () => {
  render(<ListView {...sampleListViewProps} />);
  const elements = screen.getByText("Page 2 of 3");
  expect(elements).toBeInTheDocument();
});

test("List View can go to a first page", () => {
  render(<ListView {...sampleListViewProps} />);
  userEvent.click(screen.getByText("First"));
  expect(handlePages).toBeCalledWith("first");
});

test("List View can go to a previous  page", () => {
  render(<ListView {...sampleListViewProps} />);
  userEvent.click(screen.getByText("Previous"));
  expect(handlePages).toBeCalledWith("previous");
});

test("List View can go to a next page", () => {
  render(<ListView {...sampleListViewProps} />);
  userEvent.click(screen.getByText("Next"));
  expect(handlePages).toBeCalledWith("next");
});

test("List View can go to a last page", () => {
  render(<ListView {...sampleListViewProps} />);
  userEvent.click(screen.getByText("Last"));
  expect(handlePages).toBeCalledWith("last");
});

test("List View can go to a detail view", () => {
  render(<ListView {...sampleListViewProps} />);
  const elements = screen.getAllByText("View Details");
  userEvent.click(elements[0]);
  expect(handleDetailClicked).toBeCalledWith(cars[0]);
});
