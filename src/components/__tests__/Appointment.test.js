import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("doesn't call the function", () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
