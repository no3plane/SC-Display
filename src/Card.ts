import { CardHandler } from "./CardHandler.js";
import { GuardLevel, SuperChat } from "./SuperChat.js";

/**
 * 负责卡片的显示、样式，可以从这里拿到卡片的DOM节点
 */
export class CardFactory {
  private _node: HTMLElement;

  constructor() {
    this._node = CardFactory.createEmptyCard();
  }

  private static createEmptyCard() {
    const TEMPLATE = `
      <li class="card">
        <div class="head">
          <span class="medal">
            <div class="medal-label">
              <i class="medal-icon"></i>
              <span class="medal-name"></span>
            </div>
            <div class="medal-level">27</div>
          </span>
          <span class="username"></span>
          <span class="price">30</span>
        </div>
        <div class="body">
          <div class="message"></div>
          <div class="translation"></div>
        </div>
        <div class="footer">
          <span class="expire">已过期</span>
          <span class="start-time">14:41:40</span>
        </div>
      </li>
    `;
    let newElement = document.createElement("div");
    newElement.innerHTML = TEMPLATE;
    return newElement.firstElementChild as HTMLElement;
  }

  public createCard(sc: SuperChat) {
    if (sc.medal) {
      this.addMedal({
        name: sc.medal.name,
        level: sc.medal.level,
        guardLevel: sc.medal.guardLevel,
        borderColor: sc.medal.borderColor,
        backgroundColorStart: sc.medal.backgroundColorStart,
        backgroundColorEnd: sc.medal.backgroundColorEnd,
        fontColor: sc.medal.fontColor,
      });
    } else {
      this.removeMedal();
    }
    this.setUsername(sc.username, sc.usernameColor);
    this.setPrice(sc.price);
    this.setMessage(sc.message, sc.messageTranslation);
    this.setStartTime(sc.startTime);
    this.setMainColor(sc.priceColor);

    let result = this._node as HTMLElement;
    this._node = CardFactory.createEmptyCard();
    return result;
  }

  private setMainColor(color: string) {
    this.setStyle(null, "boxShadow", `0 1px 5px 0 ${color}bf`);
    this.setStyle(".price", "color", color);
    this.setStyle(".head", "borderBottomColor", color);
  }

  /**
   * 根据Template渲染出来的DOM是完整地带有Medal和MedalIcon的。
   * 不过实际情况有些用户并不带有粉丝牌或者并没上舰，所以Medal和MedalIcon是可选的。
   * 对于这两个可选的，这里提供了remove方法把它从模板渲染出来的DOM中删掉。
   * 且对于这两个可选的，设置它们时，方法名的动词是add，而不是set。
   */
  private removeMedal() {
    this.setStyle(".medal", "display", "none");
  }

  private addMedal(medal: {
    name: string;
    level: number;
    guardLevel: GuardLevel;
    borderColor: string;
    fontColor: string;
    backgroundColorStart: string;
    backgroundColorEnd: string;
  }) {
    const backgroundImage =
      "linear-gradient(45deg," +
      medal.backgroundColorStart +
      "," +
      medal.backgroundColorEnd +
      ")";

    this.setText(".medal-name", medal.name);
    this.setText(".medal-level", String(medal.level));

    this.setStyle(".medal", "display", ""); // 如果之前调用过removeMedal()
    this.setStyle(".medal", "borderColor", medal.borderColor);
    this.setStyle(".medal-label", "backgroundImage", backgroundImage);
    this.setStyle(".medal-label", "color", medal.fontColor);

    if (medal.guardLevel === GuardLevel.None) {
      this.removeMedalIcon();
    } else {
      this.addMedalIcon(medal.guardLevel);
    }
  }

  private addMedalIcon(guardLevel: GuardLevel) {
    this.setStyle(".medal-icon", "display", "");
    this.addClass(".medal", "medal-left-margin");

    switch (guardLevel) {
      case GuardLevel.Captain:
        this.addClass(".medal-icon", "medal-icon-captain");
        break;
      case GuardLevel.Admiral:
        this.addClass(".medal-icon", "medal-icon-admiral");
        break;
      case GuardLevel.Viceroy:
        this.addClass(".medal-icon", "medal-icon-viceroy");
        break;
      default:
        console.warn("未知用户粉丝牌身份");
        break;
    }
  }

  private removeMedalIcon() {
    this.setStyle(".medal-icon", "display", "none");
    this.removeClass(".medal", "medal-left-margin");
  }

  private setUsername(username: string, color: string) {
    this.setText(".username", username);
    this.setStyle(".username", "color", color);
    (this._node.querySelector(".username") as HTMLSpanElement).title = username;
  }

  private setPrice(price: number) {
    this.setText(".price", String(price));
  }

  private setMessage(message: string, translation: string) {
    this.setText(".message", message);
    this.setText(".translation", translation);
  }

  private setStartTime(startTime: Date) {
    const hour = startTime.getHours();
    const second = startTime.getSeconds();
    const minute = startTime.getMinutes();
    const text =
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second);
    this.setText(".start-time", text);
  }

  private setStyle(
    cssSelector: string | null,
    cssProperty: keyof CSSStyleDeclaration,
    value: string
  ) {
    let elem: HTMLElement;
    if (!cssSelector) {
      elem = this._node;
    }
    elem = this._node.querySelector(cssSelector) as HTMLElement;
    (elem.style[cssProperty] as any) = value;
  }

  private setText(cssSelector: string, text: string) {
    const elem = this._node.querySelector(cssSelector) as HTMLElement;
    elem.textContent = text;
  }

  private addClass(cssSelector: string, classValue: string) {
    const elem = this._node.querySelector(cssSelector) as HTMLElement;
    elem.classList.add(classValue);
  }

  private removeClass(cssSelector: string, classValue: string) {
    const elem = this._node.querySelector(cssSelector) as HTMLElement;
    elem.classList.remove(classValue);
  }
}

export interface CardHTMLElement extends HTMLElement {
  cardHandler: CardHandler;
}
