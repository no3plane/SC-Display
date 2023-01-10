import { SuperChat } from "./SuperChat";

export class CardHandler {
  private el: HTMLElement;
  private superChat: SuperChat;
  private expired: boolean;
  private readHandler: () => void;
  private unreadHandler: () => void;

  constructor(card: HTMLElement, sc: SuperChat) {
    this.el = card;
    this.superChat = sc;
    this.expired = false;
    this.readHandler = () => {};
    this.unreadHandler = () => {};

    this.updateTime();

    this.el.addEventListener("click", () => {
      this.setRead(!this.getRead());
    });
  }

  set onread(f: () => void) {
    this.readHandler = f;
  }

  set onunread(f: () => void) {
    this.unreadHandler = f;
  }

  public getRead() {
    return this.superChat.read;
  }

  public setRead(read: boolean) {
    this.superChat.read = read;
    if (read) {
      this.el.classList.add("sc__read");
      this.readHandler();
    } else {
      this.el.classList.remove("sc__read");
      this.unreadHandler();
    }
  }

  public updateTime() {
    if (this.expired) {
      return;
    }

    let timeLeft = Math.ceil((+this.superChat.endTime - +new Date()) / 1000);
    if (timeLeft > 0) {
      const _expire = this.el.querySelector(".sc__expire") as HTMLElement;
      _expire.textContent = `${timeLeft}s`;
      return;
    }

    this.expired = true;
    const _expire = this.el.querySelector(".sc__expire") as HTMLElement;
    const _username = this.el.querySelector(".sc__username") as HTMLElement;
    const _price = this.el.querySelector(".sc__price") as HTMLElement;
    const _head = this.el.querySelector(".sc__head") as HTMLElement;
    _expire.textContent = "已过期";
    _username.style.color = "";
    _price.style.color = "";
    _head.style.borderBottomColor = "";
    this.el.style.boxShadow = "";
    this.el.classList.add("sc__expired");
  }
}
