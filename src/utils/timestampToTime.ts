function timestampToTime(timestamp: number) {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${paddedMinutes}`;
}

export default timestampToTime;
