import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const formatSpots = numSpots => {
    if (numSpots === 0) {
      return `no spots remaining`;
    }
    if (numSpots === 1) {
      return `${numSpots} spot remaining`;
    }
    return `${numSpots} spots remaining`;
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  return (
    <li data-testid="day" onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
