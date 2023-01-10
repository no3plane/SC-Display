import { CardHandler } from "./CardHandler";
import { GuardLevel, SuperChat } from "./SuperChat";

let _node: HTMLElement = renderEmptyCard();

function renderEmptyCard() {
  const TEMPLATE = `
    <li class="sc__card">
      <div class="sc__head">
        <a class="sc__medal" target="_blank">
          <div class="sc__medal-label">
            <i class="sc__medal-icon"></i>
            <span class="sc__medal-name"></span>
          </div>
          <div class="sc__medal-level"></div>
        </a>
        <a class="sc__username" target="_blank"></a>
        <span class="sc__price"></span>
      </div>
      <div class="sc__body">
        <div class="sc__message"></div>
        <div class="sc__translation"></div>
      </div>
      <div class="sc__footer">
        <span class="sc__expire"></span>
        <span class="sc__start-time"></span>
      </div>
    </li>
  `;

  let newElement = document.createElement("div");
  newElement.innerHTML = TEMPLATE;
  return newElement.firstElementChild as HTMLElement;
}

export function renderCard(sc: SuperChat) {
  _node = renderEmptyCard();

  if (sc.medal) {
    addMedal({
      name: sc.medal.name,
      level: sc.medal.level,
      guardLevel: sc.medal.guardLevel,
      borderColor: sc.medal.borderColor,
      backgroundColorStart: sc.medal.backgroundColorStart,
      backgroundColorEnd: sc.medal.backgroundColorEnd,
      fontColor: sc.medal.fontColor,
      upUid: sc.medal.upUid,
      upName: sc.medal.upName,
    });
  } else {
    removeMedal();
  }
  setUsername(sc.username, sc.userId, sc.usernameColor);
  setPrice(sc.price);
  setMessage(sc.message, sc.messageTranslation);
  setStartTime(sc.startTime);
  setMainColor(sc.priceColor);

  let result = _node as HTMLCardElement;
  result.cardHandler = new CardHandler(result, sc);

  return result;
}

function setMainColor(color: string) {
  setStyle(null, "boxShadow", `0 1px 5px 0 ${color}bf`);
  setStyle(".sc__price", "color", color);
  setStyle(".sc__head", "borderBottomColor", color);
}

/**
 * 根据Template渲染出来的DOM是完整地带有Medal和MedalIcon的。
 * 不过实际情况有些用户并不带有粉丝牌或者并没上舰，所以Medal和MedalIcon是可选的。
 * 对于这两个可选的，这里提供了remove方法把它从模板渲染出来的DOM中删掉。
 * 且对于这两个可选的，设置它们时，方法名的动词是add，而不是set。
 */
function removeMedal() {
  setStyle(".sc__medal", "display", "none");
}

function addMedal(medal: {
  name: string;
  level: number;
  guardLevel: GuardLevel;
  borderColor: string;
  fontColor: string;
  backgroundColorStart: string;
  backgroundColorEnd: string;
  upUid: number;
  upName: string;
}) {
  const backgroundImage =
    "linear-gradient(45deg," +
    medal.backgroundColorStart +
    "," +
    medal.backgroundColorEnd +
    ")";

  setText(".sc__medal-name", medal.name);
  setText(".sc__medal-level", String(medal.level));

  setStyle(".sc__medal", "display", ""); // 如果之前调用过removeMedal()
  setStyle(".sc__medal", "borderColor", medal.borderColor);
  setStyle(".sc__medal-label", "backgroundImage", backgroundImage);
  setStyle(".sc__medal-label", "color", medal.fontColor);

  const _medal = _node.querySelector(".sc__medal") as HTMLElement;
  _medal.setAttribute("href", `https://space.bilibili.com/${medal.upUid}`);
  _medal.title = medal.upName;

  if (medal.guardLevel === GuardLevel.None) {
    removeMedalIcon();
  } else {
    addMedalIcon(medal.guardLevel);
  }
}

function addMedalIcon(guardLevel: GuardLevel) {
  setStyle(".sc__medal-icon", "display", "");
  addClass(".sc__medal", "sc__medal-label-guard");

  switch (guardLevel) {
    case GuardLevel.Captain:
      addClass(".sc__medal-icon", "sc__medal-icon-captain");
      break;
    case GuardLevel.Admiral:
      addClass(".sc__medal-icon", "sc__medal-icon-admiral");
      break;
    case GuardLevel.Viceroy:
      addClass(".sc__medal-icon", "sc__medal-icon-viceroy");
      break;
    default:
      console.warn("未知用户粉丝牌身份");
      break;
  }
}

function removeMedalIcon() {
  setStyle(".sc__medal-icon", "display", "none");
  removeClass(".sc__medal", "medal-label-guard");
}

function setUsername(username: string, userId: number, color: string) {
  setText(".sc__username", username);
  setStyle(".sc__username", "color", color);

  const _username = _node.querySelector(".sc__username") as HTMLSpanElement;
  _username.title = username;
  _username.setAttribute("href", `https://space.bilibili.com/${userId}`);
}

function setPrice(price: number) {
  setText(".sc__price", String(price));
}

function setMessage(message: string, translation: string) {
  setText(".sc__message", message);
  setText(".sc__translation", translation);
}

function setStartTime(startTime: Date) {
  const hour = startTime.getHours();
  const second = startTime.getSeconds();
  const minute = startTime.getMinutes();
  const text =
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second);
  setText(".sc__start-time", text);
}

function setStyle(
  cssSelector: string | null,
  cssProperty: keyof CSSStyleDeclaration,
  value: string
) {
  let elem: HTMLElement;
  if (!cssSelector) {
    elem = _node;
  } else {
    elem = _node.querySelector(cssSelector as string) as HTMLElement;
  }
  (elem.style[cssProperty] as any) = value;
}

function setText(cssSelector: string, text: string) {
  const elem = _node.querySelector(cssSelector) as HTMLElement;
  elem.textContent = text;
}

function addClass(cssSelector: string, classValue: string) {
  const elem = _node.querySelector(cssSelector) as HTMLElement;
  elem.classList.add(classValue);
}

function removeClass(cssSelector: string, classValue: string) {
  const elem = _node.querySelector(cssSelector) as HTMLElement;
  elem.classList.remove(classValue);
}

export interface HTMLCardElement extends HTMLElement {
  cardHandler: CardHandler;
}
