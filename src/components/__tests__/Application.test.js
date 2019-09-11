import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getAllByTestId(appointment, /interviewers__item/i)[0]);

    fireEvent.click(getByText(appointment, /save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, /lydia miller-jones/i));

    const monday = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(monday, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 2", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const bookedAppointment = getAllByTestId(container, "appointment").find(
      name => queryByText(name, "Archie Cohen")
    );

    fireEvent.click(getByAltText(bookedAppointment, /delete/i));

    expect(
      getByText(bookedAppointment, /are you sure you would like to delete?/i)
    ).toBeInTheDocument();

    fireEvent.click(getByText(bookedAppointment, /confirm/i));

    expect(getByText(bookedAppointment, /deleting/i)).toBeInTheDocument();

    await waitForElement(() => getByAltText(bookedAppointment, /add/i));

    const monday = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(monday, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const bookedAppointment = getAllByTestId(container, "appointment").find(
      name => queryByText(name, "Archie Cohen")
    );

    fireEvent.click(getByAltText(bookedAppointment, /edit/i));

    fireEvent.change(
      getByPlaceholderText(bookedAppointment, /enter student name/i),
      {
        target: { value: "Lydia Miller-Jones" }
      }
    );

    fireEvent.click(getAllByTestId(bookedAppointment, "interviewers__item")[0]);

    fireEvent.click(getByText(bookedAppointment, /save/i));

    expect(getByText(bookedAppointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() =>
      getByText(bookedAppointment, /lydia miller-jones/i)
    );

    const monday = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(monday, /1 spot remaining/i)).toBeInTheDocument();
  });
});
