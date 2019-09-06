import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const {
    id,
    time,
    interview,
    interviewersForDay,
    bookInterview,
    cancelInterview
  } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(err => {
        console.error("SAVING ERROR:", err);
        transition(ERROR_SAVE, true);
      });
  }

  function destroy(id) {
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(err => {
        console.error("DELETING ERROR:", err);
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment">
      <Header key={id} time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={destroy}
          appointmentId={id}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewersForDay}
          onCancel={() => back()}
          onSave={save}
          name={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"ERROR SAVE"} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"ERROR DELETE"} onClose={() => back()} />
      )}
    </article>
  );
}
