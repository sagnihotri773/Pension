import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Welcome from "./welcome";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

test("renders welcome message and button", () => {
  render(
    <MemoryRouter>
      <Welcome />
    </MemoryRouter>
  );

  expect(
    screen.getByText(/Welcome to Pension Plan Data Management/i)
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});
