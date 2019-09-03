import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

import "components/Appointment/styles.scss";
// import InterviewerList from "components/InterviewerList";

export default function Appointment(props) {
  const { id, time, interview } = props;
  return (
    <article className="appointment">
      <Header key={id} time={time} />
      {props.interview ? (
        <Show student={interview.student} interviewer={interview.interviewer} />
      ) : (
        <Empty />
      )}
    </article>
  );
}
