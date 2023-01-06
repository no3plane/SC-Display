import { SuperChat } from "./SuperChat.js";

/**
 * 负责卡片的显示、样式，可以从这里拿到卡片的DOM节点
 */
export class Card {
  private static TEMPLATE = `
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
        <div class="translation"></div>
      </div>
      <div class="footer">
        <span class="expire">已过期</span>
        <span class="start-time">14:41:40</span>
      </div>
    </li>
  `;
  private _node: HTMLElement;
  private _superChat: SuperChat;

  private _head: HTMLElement;
  private _medal: HTMLElement;
  private _medalName: HTMLElement;
  private _medalLabel: HTMLElement;
  private _medalLevel: HTMLElement;
  private _username: HTMLElement;
  private _price: HTMLElement;
  private _body: HTMLElement;
  private _expire: HTMLElement;
  private _startTime: HTMLElement;
  private _translation: HTMLElement;

  constructor(sc: SuperChat) {
    this._superChat = sc;

    let newElement = document.createElement("div");
    newElement.innerHTML = Card.TEMPLATE;
    this._node = newElement.firstElementChild as HTMLElement;

    this._head = this._node.querySelector(".head") as HTMLElement;
    this._medal = this._node.querySelector(".medal") as HTMLElement;
    this._medalName = this._node.querySelector(".medal-name") as HTMLElement;
    this._medalLabel = this._node.querySelector(".medal-label") as HTMLElement;
    this._medalLevel = this._node.querySelector(".medal-level") as HTMLElement;
    this._username = this._node.querySelector(".username") as HTMLElement;
    this._price = this._node.querySelector(".price") as HTMLElement;
    this._body = this._node.querySelector(".body") as HTMLElement;
    this._expire = this._node.querySelector(".expire") as HTMLElement;
    this._startTime = this._node.querySelector(".start-time") as HTMLElement;
    this._translation = this._node.querySelector(".translation") as HTMLElement;

    this.updateMedal();
    this.updateUsername();
    this.updatePrice();
    this.updateMessage();
    this.updateStartTime();
    this.updateExpire();
    
    this._node.classList.add('read');
  }

  public updateShadowColor() {

  }

  public updateMedal(
    medal: {
      name: string;
      level: number;
      borderColor: string;
      fontColor: string;
      backgroundColorStart: string;
      backgroundColorEnd: string;
    } = {
      name: this._superChat.medalName,
      level: this._superChat.medalLevel,
      borderColor: this._superChat.medalBorderColor,
      backgroundColorStart: this._superChat.medalBackgroundColorStart,
      backgroundColorEnd: this._superChat.medalBackgroundColorEnd,
      fontColor: this._superChat.medalFontColor,
    }
  ) {
    this._medalName.textContent = medal.name;
    this._medalLevel.textContent = String(medal.level);
    this._medal.style.borderColor = medal.borderColor;
    this._medalLabel.style.backgroundImage =
      "linear-gradient(45deg," +
      medal.backgroundColorStart +
      "," +
      medal.backgroundColorEnd +
      ")";
    this._medalLabel.style.color = medal.fontColor;
  }

  public updateUsername(
    username: string = this._superChat.username,
    color: string = this._superChat.usernameColor
  ) {
    this._username.textContent = username;
    this._username.style.color = color;
  }

  public updatePrice(
    price: number = this._superChat.price,
    color: string = this._superChat.priceColor
  ) {
    this._price.textContent = String(price);
    this._price.style.color = color;
    this._head.style.borderBottomColor = color;
  }

  public updateMessage(
    message: string = this._superChat.message,
    translation: string = this._superChat.messageTranslation
  ) {
    this._body.textContent = message;
    this._translation.textContent = translation;
  }

  public updateStartTime(startTime: Date = this._superChat.startTime) {
    const hour = startTime.getHours();
    const second = startTime.getSeconds();
    const minute = startTime.getMinutes();
    this._startTime.textContent =
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second);
  }

  public updateExpire() {
    this._expire.textContent = this._superChat.isExpired() ? "已过期" : "";
  }

  public getHTMLElement() {
    return this._node;
  }
}
