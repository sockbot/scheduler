import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  const { message, onConfirm, onCancel, appointmentId } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>
          Cancel
        </Button>
        <Button danger onClick={() => onConfirm(appointmentId)}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
