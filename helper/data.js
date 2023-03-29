function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const colors = [
  "#ff9669",
  "#fff352",
  "#61ff4f",
  "#5cffe1",
  "#5ef4ff",
  "#70a2ff",
  "#9a63ff",
  "#db63ff",
  "#ff4ad5",
  "#ff5c74",
];

const colors_human = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "brown",
  "gray",
  "black",
];
const dates = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2023, getRandomInt(3), getRandomInt(28)); // March 2023
  const color = colors[getRandomInt(10)];
  //   const color = colors_human[i];
  return {
    color: color,
    date: date.toISOString().substring(0, 10),
  };
});

export default dates;
// console.log(dates);
