import { useReducer, useEffect } from "react";
import axios from "axios";
import { getSpotsForDay } from "helpers/selectors";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

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
        err => console.error("ERROR IN APPLICATION COMPONENT:", err) // this causes an error with tests?
      );
    return;
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    if (!interview.interviewer || !interview.student) {
      return Promise.reject("Interviewer and Student cannot be blank");
    } else {
      return axios.put(`/api/appointments/${id}`, { interview }).then(() =>
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview
        })
      );
      // allow errors to be caught in Appointment component
    }
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() =>
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null
      })
    );
    // allow errors to be caught in Appointment component
  }

  return { state, setDay, bookInterview, cancelInterview };
}
