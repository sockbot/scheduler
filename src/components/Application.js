import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import getAppointmentsForDay from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments")]).then(
      all => {
        const days = all[0].data;
        const appointments = all[1].data;
        setState(prev => ({ ...prev, days, appointments }));
      }
    );
    return;
  }, []);

  const appointmentsJSX = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return <Appointment key={appointment.id} {...appointment} />;
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
