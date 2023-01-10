import { HTMLCardElement, renderCard } from "./CardRenderer";
import { RawSuperChat, SuperChat } from "./SuperChat";
import { zxxDrag } from "./lib/zxxDrag";
import "./lib/bliveproxy.js";

const TEMPLATE = `
  <div class="sc__root sc__mini">
    <div class="sc__title-bar">
      <div class="sc__title">SC Viewer <span class="sc__read-count">3/4</span></div>
      <svg
        class="sc__mini-icon"
        viewBox="0 0 939 939"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path
          d="m42.68032,0q18.00192,0 30.33088,12.32896l268.32896,268.32896l0,-195.66592q0,-17.67424 12.4928,-30.16704t30.16704,-12.4928t30.16704,12.4928t12.4928,30.16704l0,298.65984q0,17.67424 -12.67712,30.33088t-30.33088,12.67712l-298.65984,0q-17.67424,0 -30.16704,-12.4928t-12.4928,-30.16704t12.4928,-30.16704t30.16704,-12.4928l195.66592,0l-268.32896,-268.32896q-12.32896,-12.32896 -12.32896,-30.33088q0,-18.3296 12.16512,-30.49472t30.49472,-12.16512l0.02048,-0.02048zm512.32768,512l298.65984,0q17.67424,0 30.16704,12.4928t12.4928,30.16704t-12.4928,30.16704t-30.16704,12.4928l-195.66592,0l268.00128,268.32896q12.67712,12.67712 12.67712,30.33088t-12.4928,30.16704t-30.16704,12.4928q-18.00192,0 -30.33088,-12.32896l-268.32896,-268.32896l0,195.66592q0,17.67424 -12.4928,30.16704t-30.16704,12.4928t-30.16704,-12.4928t-12.4928,-30.16704l0,-298.65984q0,-17.67424 12.67712,-30.33088t30.33088,-12.67712l-0.04096,0.02048z"
        />
      </svg>
    </div>
    <ul class="sc__list"></ul>
  </div>
`;

let newElement = document.createElement("div");
newElement.innerHTML = TEMPLATE;
const root = newElement.firstElementChild as HTMLElement;

const cards: HTMLCardElement[] = [];
setInterval(() => {
  cards.forEach((card) => {
    card.cardHandler.updateTime();
  });
}, 1000);

const readCountElem = root.querySelector(".sc__read-count") as HTMLElement;
let readCount = 0;
const increaseReadCount = () => {
  readCount++;
  updateReadCount();
};
const decreaseReadCount = () => {
  readCount--;
  updateReadCount();
};
const updateReadCount = () => {
  readCountElem.textContent = `${readCount}/${cards.length}`;
};
updateReadCount();

let mini = true;
const switchMini = () => {
  if (mini) {
    root.classList.remove("sc__mini");
  } else {
    root.classList.add("sc__mini");
  }
  mini = !mini;
}
root.querySelector(".sc__mini-icon")?.addEventListener("click", switchMini);
root.querySelector(".sc__title-bar")?.addEventListener("dblclick", switchMini);

const list = root.querySelector(".sc__list") as HTMLElement;
function addSuperChat(rawSc: RawSuperChat) {
  const card = renderCard(new SuperChat(rawSc));
  card.cardHandler.onread = increaseReadCount;
  card.cardHandler.onunread = decreaseReadCount;
  cards.push(card);
  list.appendChild(card);
  updateReadCount();
}

zxxDrag(root.querySelector(".sc__title-bar") as HTMLElement, {
  target: root,
});

document.body.appendChild(root);

// TODO 这里应该怎么写测试 ╥﹏╥...
bliveproxy.addCommandHandler("SUPER_CHAT_MESSAGE", (rawMessage) => {
  addSuperChat(rawMessage.data);
});
