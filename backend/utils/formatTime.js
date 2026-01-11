function formatTime(startTime) {
  let [h, m] = startTime.split(":").map(Number);

  let startMinutes = h * 60 + m;
  let endMinutes = startMinutes + 30;

  let endH = Math.floor(endMinutes / 60) % 24;
  let endM = endMinutes % 60;

  return `${startTime}-${String(endH).padStart(2,"0")}.${String(endM).padStart(2,"0")}`;
}

export default formatTime;