import { sc1 } from "../src/data";
import { SuperChat } from "../src/SuperChat";

test("all", () => {
  sc1.end_time = sc1.end_time * 1000;
  const superChat1 = new SuperChat(sc1);
  let timeLeft = +superChat1.endTime - +new Date();
  console.log(superChat1.endTime);
  expect(timeLeft).toBeLessThan(1);
});
