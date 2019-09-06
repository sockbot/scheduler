import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET APPLICATION DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_APPOINTMENTS = "SET_APPOINTMENTS";

  function reducer(state, action) {
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
      case SET_APPOINTMENTS:
        return {
          ...state,
          appointments: action.appointments
        };
      case SET_INTERVIEW:
        return { ...state, interview: action.interview };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(all => {
        const [days, appointments, interviewers] = all;
        dispatch({
          type: SET_APPLICATION_DATA,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        });
      })
      .catch(
        err => console.error("ERROR IN APPLICATION COMPONENT", err) // this causes an error with tests?
      );
    return;
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    if (interview.interviewer == false || interview.student == false) {
      return Promise.reject("Interviewer and Student cannot be blank");
    } else {
      return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
        return dispatch({
          type: SET_APPOINTMENTS,
          appointments
        });
      });
      // allow errors to be caught in Appointment
    }
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`);
    // allow errors to be caught in Appointment
  }

  return { state, setDay, bookInterview, cancelInterview };
}
