import React from "react";
import { render, screen } from "@testing-library/react";
import DetailView from "../components/DetailView";
import cars from "../fixtures/cars.json";
import userEvent from "@testing-library/user-event";

const handleSaveClicked = jest.fn();
const car = cars[0];
let sampleDetailViewProps = {
  car,
  favoriteCars: {
    10028: false,
  },
  handleSaveClicked,
};

test("Detail View Renders the Correct Car Description", () => {
  render(<DetailView {...sampleDetailViewProps} />);

  const element = screen.getByText("Chrysler Le Baron");
  expect(element).toBeInTheDocument();
});

test("Detail View Renders the Correct Car Title", () => {
  render(<DetailView {...sampleDetailViewProps} />);

  const element = screen.getByText(
    "Stock # 10028 - 179498 KM - Diesel - yellow"
  );
  expect(element).toBeInTheDocument();
});

test("List View saves the correct car", () => {
  render(<DetailView {...sampleDetailViewProps} />);
  const element = screen.getByText("Save");
  userEvent.click(element);
  expect(handleSaveClicked).toBeCalledWith(car);
});

test("List View unfavorites the next car", () => {
  sampleDetailViewProps = {
    ...sampleDetailViewProps,
    favoriteCars: {
      10028: true,
    },
  };
  render(<DetailView {...sampleDetailViewProps} />);
  const element = screen.queryByText("Save");
  expect(element).toEqual(null);
  const unfav = screen.getByText("Unfavorite");
  expect(unfav).toBeInTheDocument();
  userEvent.click(unfav);
  expect(handleSaveClicked).toBeCalledWith(car);
});
