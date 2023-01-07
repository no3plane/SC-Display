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
    let newElement = document.createElement("div");
    newElement.innerHTML = Card.TEMPLATE;
    let node = newElement.firstElementChild as HTMLElement;

    this._node = node;
    this._head = node.querySelector(".head") as HTMLElement;
    this._medal = node.querySelector(".medal") as HTMLElement;
    this._medalName = node.querySelector(".medal-name") as HTMLElement;
    this._medalLabel = node.querySelector(".medal-label") as HTMLElement;
    this._medalLevel = node.querySelector(".medal-level") as HTMLElement;
    this._username = node.querySelector(".username") as HTMLElement;
    this._price = node.querySelector(".price") as HTMLElement;
    this._body = node.querySelector(".body") as HTMLElement;
    this._expire = node.querySelector(".expire") as HTMLElement;
    this._startTime = node.querySelector(".start-time") as HTMLElement;
    this._translation = node.querySelector(".translation") as HTMLElement;

    this.initNode(sc);
  }

  public initNode(sc: SuperChat) {
    this.setMedal({
      name: sc.medalName,
      level: sc.medalLevel,
      borderColor: sc.medalBorderColor,
      backgroundColorStart: sc.medalBackgroundColorStart,
      backgroundColorEnd: sc.medalBackgroundColorEnd,
      fontColor: sc.medalFontColor,
    });
    this.setUsername(sc.username, sc.usernameColor);
    this.setPrice(sc.price);
    this.setMessage(sc.message, sc.messageTranslation);
    this.setStartTime(sc.startTime);
    this.setMainColor(sc.priceColor);
    if (sc.isExpired()) {
      // this.expired();
    }
  }

  public read() {
    this._node.classList.add("read");
  }

  public unread() {
    this._node.classList.remove("read");
  }

  public setMainColor(color: string) {
    this._node.style.boxShadow = `0 1px 5px 0 ${color}bf`;
    this._price.style.color = color;
    this._head.style.borderBottomColor = color;
  }

  public setMedal(medal: {
    name: string;
    level: number;
    borderColor: string;
    fontColor: string;
    backgroundColorStart: string;
    backgroundColorEnd: string;
  }) {
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

  public setUsername(username: string, color: string) {
    this._username.textContent = username;
    this._username.style.color = color;
  }

  public setPrice(price: number) {
    this._price.textContent = String(price);
  }

  public setMessage(message: string, translation: string) {
    this._body.textContent = message;
    this._translation.textContent = translation;
  }

  public setStartTime(startTime: Date) {
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

  /**
   * 破环性操作
   */
  public expired() {
    this._expire.textContent = "已过期";
    this._node.style.boxShadow = "";
    this._username.style.color = "";
    this._price.style.color = "";
    this._head.style.borderBottomColor = "";
    this._node.classList.add("expired");
  }

  public getHTMLElement() {
    return this._node;
  }
}
