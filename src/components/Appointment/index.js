import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";
import axios from "axios";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { id, time, interview, interviewersForDay, bookInterview } = props;
  const { mode, transition } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header key={id} time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => axios.get("/api/debug/reset")}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewersForDay}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
    </article>
  );
}
