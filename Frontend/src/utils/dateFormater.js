const dateFormater = (date) => {
  const newDate = new Date(date);

  const dateString = newDate.toLocaleDateString();
  const dateHour = (newDate.getHours() < 10) ? `0${newDate.getHours()}` : newDate.getHours()
  const dateMinutes = (newDate.getMinutes() < 10) ? `0${newDate.getMinutes()}` : newDate.getMinutes()
  const formatedDate = `${dateString}, ${dateHour}:${dateMinutes}`

  return formatedDate
}

export default dateFormater;