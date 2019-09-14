const counter = {
  cherries: 10,
  pears: 10,
  plums: 10,
  apples: 10,
  ravens: 0
};

const roll = () => Math.floor(Math.random() * 6) + 1;

const game = () => {};

for (i = 0; i < 20; i++) {
  console.log(roll());
}
