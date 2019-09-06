import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(all => {
        const [days, appointments, interviewers] = all;
        setState(prev => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }));
      })
      .catch(
        err => console.error("ERROR IN APPLICATION COMPONENT", err.config) // this causes an error with tests?
      );
    return;
  }, []);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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
        return setState({
          ...state,
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
