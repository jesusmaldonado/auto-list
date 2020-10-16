import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the footer", () => {
  const { getByText } = render(<App />);
  const autoGroup = getByText("© AUTO1 Group 2018");

  expect(autoGroup).toBeInTheDocument();
});
