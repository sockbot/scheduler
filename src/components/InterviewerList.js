import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewerItem = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={props.interviewer}
        id={props.interviewer}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItem}</ul>
    </section>
  );
}
