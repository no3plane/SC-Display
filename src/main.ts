
import { Card } from "./Card.js";
import { sc1, sc2, sc3 } from "./data.js";
import { SuperChat } from "./SuperChat.js";

const list = document.querySelector(".list") as HTMLElement;

const card1 = new Card(new SuperChat(sc1));
list.appendChild(card1.getHTMLElement());
const card2 = new Card(new SuperChat(sc2));
list.appendChild(card2.getHTMLElement());
const card3 = new Card(new SuperChat(sc3));
list.appendChild(card3.getHTMLElement());

card1.read();
card2.read();
card2.unread();
card3.expired();