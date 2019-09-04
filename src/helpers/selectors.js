export default function getAppointmentsForDay(state, day) {
  const dayObj = state.days.filter(targetDay => targetDay.name === day)[0];
  if (state.days.length === 0 || dayObj == undefined) {
    return [];
  }
  const results = [];
  dayObj.appointments.forEach(id => results.push(state.appointments[id]));
  return results;
}
