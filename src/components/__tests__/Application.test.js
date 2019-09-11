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

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", () => {
    // 1. Render the Application.
    // 2. Wait until the text "Archie Cohen" is displayed.
    // 3. Click the "Edit" button on the Archie Cohen appointment.
    // 4. Change the student name to "Lydia Miller-Jones" and the Interviewer to the first interviewer.
    // 5. Click the "Save" button on the confirmation.
    // 6. Check that the element with the text "Saving" is displayed.
    // 7. Check that the appointment is with "Lydia Miller-Jones" and "Sylvia Palmer".
    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  });
});
