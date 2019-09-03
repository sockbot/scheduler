import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const listItemClasses = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  const imageItemClasses = classNames("interviewers__item-image");

  return (
    <li className={listItemClasses} onClick={setInterviewer}>
      <img className={imageItemClasses} src={avatar} alt={name} />
      {selected ? name : ""}
    </li>
  );
}
