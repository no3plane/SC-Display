import { CardFactory } from "../src/Card";
import { sc1, sc2, sc3 } from "../src/data";
import { SuperChat } from "../src/SuperChat";

describe("Card Class", () => {
  const superChat1 = new SuperChat(sc1);
  const superChat2 = new SuperChat(sc2);
  const superChat3 = new SuperChat(sc3);

  const list = document.createElement("li");

  test("price", () => {
    const card1 = new CardFactory(superChat1);
    const cardElement1 = card1.getHTMLElement();
    const price = cardElement1.querySelector(".price")?.textContent;
    expect(price).toBe("100");
  });

  test("addCard", () => {
    const card = new CardFactory(superChat1).getHTMLElement();
    list.insertBefore(card, list.firstChild);
  });

  test("readCard", () => {
    const card = new CardFactory(superChat1).getHTMLElement();
    card.read();
  });

  test("updateCardExpired", () => {
    const card = new CardFactory(superChat1);
    card.updateExpired();
    if (superChat1.isExpired()) {
      card.setExpired();
    }
  });

  test("filterCard", () => {
    
  });

  test("sortCard", () => {});
});
