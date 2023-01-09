import { SuperChat } from "./SuperChat";

export class CardHandler {
  private cardNode: HTMLElement;
  private superChat: SuperChat;
  private expired: boolean;

  constructor(card: HTMLElement, sc: SuperChat) {
    this.cardNode = card;
    this.superChat = sc;
    this.expired = false;
    this.updateTime();
  }

  public getRead() {
    return this.superChat.read;
  }

  public setRead(read: boolean) {
    this.superChat.read = read;
    if (read) {
      this.cardNode.classList.add("read");
    } else {
      this.cardNode.classList.remove("read");
    }
  }

  public updateTime() {
    if (this.expired) {
      return;
    }

    let timeLeft = Math.ceil((+this.superChat.endTime - +new Date()) / 1000);
    if (timeLeft > 0) {
      const _expire = this.cardNode.querySelector(".expire") as HTMLElement;
      // _expire.textContent = `${timeLeft}s / ${this.superChat.duration}s`;
      _expire.textContent = `${timeLeft}s`;
      return;
    }

    this.expired = true;
    const _expire = this.cardNode.querySelector(".expire") as HTMLElement;
    const _username = this.cardNode.querySelector(".username") as HTMLElement;
    const _price = this.cardNode.querySelector(".price") as HTMLElement;
    const _head = this.cardNode.querySelector(".head") as HTMLElement;
    _expire.textContent = "已过期";
    _username.style.color = "";
    _price.style.color = "";
    _head.style.borderBottomColor = "";
    this.cardNode.style.boxShadow = "";
    this.cardNode.classList.add("expired");
  }
}
