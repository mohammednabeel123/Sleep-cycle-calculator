const lightBulb = document.getElementById("fa-lightbulb");
const bodyElement = document.body;
const wakeTime = document.getElementById("wake-time");
const bedTime = document.getElementById("bed-time");
const calculateBedTime = document.getElementById("calculate-bedtime");
const result = document.getElementById("result");

lightBulb.addEventListener("click", function () {
  if (
    bodyElement.style.color === "rgb(168, 166, 119)" &&
    bodyElement.style.background.includes("linear-gradient")
  ) {
    bodyElement.style.color = "";
    bodyElement.style.background = "";
  } else {
    bodyElement.style.color = "rgb(168, 166, 119)";
    bodyElement.style.background =
      "linear-gradient(135deg, #000224, #5c5b51, #99a2d3)";
  }
});

calculateBedTime.addEventListener("click", function (event) {
  event.preventDefault();

  // Getting bed time values
  const bedTimeValue = bedTime.value;
  const wakeTimeValue = wakeTime.value;

  // Validating input
  if (
    !bedTimeValue.match(/^([01]\d|2[0-3]):([0-5]\d)$/) ||
    !wakeTimeValue.match(/^([01]\d|2[0-3]):([0-5]\d)$/)
  ) {
    result.innerText = "Please enter valid time in HH:MM format.";
    return;
  }

  // Splitting time values into hours and minutes
  const [bedTimeHour, bedTimeMinute] = bedTimeValue.split(":").map(Number);
  const [wakeTimeHour, wakeTimeMinute] = wakeTimeValue.split(":").map(Number);

  let hoursDifference = wakeTimeHour - bedTimeHour;
  let minutesDifference = wakeTimeMinute - bedTimeMinute;

  // Adjust if the minute difference is negative
  if (minutesDifference < 0) {
    minutesDifference += 60;
    hoursDifference -= 1;
  }

  // Adjust if wake time is earlier in the day (assume the next day)
  if (
    wakeTimeHour < bedTimeHour ||
    (wakeTimeHour === bedTimeHour && minutesDifference < 0)
  ) {
    hoursDifference += 24;
  }

  // Adjust if the hours difference is negative
  if (hoursDifference < 0) {
    hoursDifference += 24;
  }

  // Formatting result
  const formattedMinutes = String(minutesDifference).padStart(2, "0");

  // Displaying the result
  result.innerText = `Sleep time - ${hoursDifference} Hours : ${formattedMinutes} Minutes`;
});
