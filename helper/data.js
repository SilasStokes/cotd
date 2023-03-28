const colors = [
  "#4c00ff",
  "#ff742e",
  "#00bfff",
  "#00ff7f",
  "#ff00ff",
  "#ffd700",
  "#40e0d0",
  "#ff4500",
  "#808080",
  "#8b008b",
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
const dates = Array.from({ length: 10 }, (_, i) => {
  const date = new Date(2023, 2, i + 1); // March 2023
  const color = colors[i];
  //   const color = colors_human[i];
  return {
    color: color,
    date: date.toISOString(),
  };
});

export default dates;
// console.log(dates);
