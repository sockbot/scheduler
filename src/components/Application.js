import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
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
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`);
    // allow errors to be caught in Appointment
  }

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

  const appointmentsJSX = getAppointmentsForDay(state, state.day).map(
    appointment => {
      const interview = getInterview(state, appointment.interview);
      const interviewersForDay = getInterviewersForDay(state, state.day);
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={interview}
          interviewersForDay={interviewersForDay}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsJSX}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
