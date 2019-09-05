import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const { id, time, interview, interviewersForDay } = props;

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log(name, interviewer);
  }

  return (
    <article className="appointment">
      <Header key={id} time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewersForDay}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
    </article>
  );
}
