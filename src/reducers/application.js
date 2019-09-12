import { getSpotsForDay } from "helpers/selectors";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET APPLICATION DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW:
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      const newState = { ...state, appointments };

      const foundDay = newState.days.find(day => {
        return day.appointments.includes(action.id);
      });

      const days = newState.days.map(day => {
        if (day.name === foundDay.name) {
          return { ...day, spots: getSpotsForDay(newState, day.name) };
        } else {
          return day;
        }
      });

      return { ...state, appointments, days };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
