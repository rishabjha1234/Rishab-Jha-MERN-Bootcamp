let count = 0;

const countElement = document.querySelector("#count");
const incrementBtn = document.querySelector("#increment");
const decrementBtn = document.querySelector("#decrement");
const resetBtn = document.querySelector("#reset");

incrementBtn.addEventListener("click", function () {
  console.log("incrementBtn event is called!");
  count++;
  countElement.textContent = count;
});

resetBtn.addEventListener("click", function () {
  console.log("resetBtn event is called!");
  count = 0;
  countElement.textContent = count;
});

decrementBtn.addEventListener("click", function () {
  console.log("decrementBtn is called!");
  count--;
  countElement.textContent = count;
});
