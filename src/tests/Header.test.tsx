import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the header", () => {
  const { getByText } = render(<App />);
  const purchaseElement = getByText(/purchase/i);
  const myOrdersElement = getByText(/my orders/i);
  const sellElement = getByText(/sell/i);

  expect(purchaseElement).toBeInTheDocument();
  expect(myOrdersElement).toBeInTheDocument();
  expect(sellElement).toBeInTheDocument();
});
