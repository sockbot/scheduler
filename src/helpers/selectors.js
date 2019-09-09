export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.filter(targetDay => targetDay.name === day)[0];
  if (state.days.length === 0 || dayObj === undefined) {
    return [];
  }
  const results = [];
  dayObj.appointments.forEach(id => results.push(state.appointments[id]));
  return results;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewObj = { ...interview };

  interviewObj.interviewer = state.interviewers[interviewObj.interviewer];
  return interviewObj;
}

export function getInterviewersForDay(state, day) {
  const intObj = state.days.filter(targetDay => targetDay.name === day)[0];
  if (state.days.length === 0 || intObj === undefined) {
    return [];
  }
  const results = [];
  intObj.interviewers.forEach(id => results.push(state.interviewers[id]));
  return results;
}

export function getSpotsForDay(state, dayName) {
  const appointments = getAppointmentsForDay(state, dayName);
  return appointments.reduce((prev, curr) => {
    if (curr.interview !== null) {
      return prev - 1;
    }
    return prev;
  }, appointments.length);
}
