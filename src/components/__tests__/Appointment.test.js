import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

describe("Appointment", () => {
  it("renders without crashing", async () => {
    await render(<Appointment />);
  });
});
