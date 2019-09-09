import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  getByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", async () => {
  const { getByText } = render(<Application />);
  await waitForElement(() => getByText("Monday"));
});
