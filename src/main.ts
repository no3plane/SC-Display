import { CardFactory } from "./Card.js";
import { CardHandler } from "./CardHandler.js";
import { sc1, sc2, sc3, sc4 } from "./data.js";
import { RawSuperChat, SuperChat } from "./SuperChat.js";

const updateTimeList: CardHandler[] = [];
setInterval(() => {
  updateTimeList.forEach((item) => {
    item.updateTime();
  });
}, 1000);

function buildCard(sc: RawSuperChat) {
  const superChat = new SuperChat(sc);
  const card = cardFactory.createCard(superChat);
  const cardHandler = new CardHandler(card, superChat);
  card.addEventListener("click", () => {
    cardHandler.setRead(!cardHandler.getRead());
  });
  updateTimeList.push(cardHandler);
  return card;
}

const list = document.querySelector(".list") as HTMLElement;
const cardFactory = new CardFactory();

const card1 = buildCard(sc1);
list.appendChild(card1);

const card2 = buildCard(sc2);
list.appendChild(card2);

const card3 = buildCard(sc3);
list.appendChild(card3);

const card4 = buildCard(sc4);
list.appendChild(card4);

