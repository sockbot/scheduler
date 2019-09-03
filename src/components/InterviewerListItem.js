import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const listItemClasses = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  const imageItemClasses = classNames("interviewers__item-image");

  return (
    <li className={listItemClasses} onClick={() => setInterviewer(id)} key={id}>
      <img className={imageItemClasses} src={avatar} alt={name} />
      {selected ? name : ""}
    </li>
  );
}
