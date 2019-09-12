import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

export default function useApplicationData() {
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
