export const enum GuardLevel {
  None = 0, // 普通
  Captain = 3, // 舰长
  Admiral = 2, // 提督
  Viceroy = 1, // 总督
}

export class SuperChat {
  /* 原本就有的字段 */
  id: number;

  medal: {
    name: string;
    level: number;
    borderColor: string;
    backgroundColorStart: string;
    backgroundColorEnd: string;
    fontColor: string;
    guardLevel: GuardLevel;
  } | null;

  username: string;
  usernameColor: string;

  price: number;
  priceColor: string;

  message: string;
  messageTranslation: string;

  startTime: Date;
  endTime: Date;
  duration: number;

  roomGuardLevel: GuardLevel;
  /* 额外添加的字段 */
  read: boolean;

  constructor(rawSc: RawSuperChat) {
    if (rawSc.medal_info) {
      this.medal = {
        name: rawSc.medal_info.medal_name,
        level: rawSc.medal_info.medal_level,
        borderColor: "#" + rawSc.medal_info.medal_color_border.toString(16),
        backgroundColorStart:
          "#" + rawSc.medal_info.medal_color_start.toString(16),
        backgroundColorEnd: "#" + rawSc.medal_info.medal_color_end.toString(16),
        fontColor: `#${rawSc.medal_info.medal_color}`,
        guardLevel: rawSc.medal_info.guard_level,
      };
    } else {
      this.medal = null;
    }

    this.id = rawSc.id;
    this.username = rawSc.user_info.uname;
    this.usernameColor = rawSc.user_info.name_color;
    this.price = rawSc.price;
    this.priceColor = rawSc.background_price_color;
    this.message = rawSc.message;
    this.messageTranslation = rawSc.message_trans;
    this.startTime = new Date(rawSc.start_time * 1000);
    this.endTime = new Date(rawSc.end_time * 1000);
    this.duration = rawSc.time;
    this.roomGuardLevel = rawSc.user_info.guard_level;
    this.read = false;
  }
}

export interface RawMessage {
  cmd: "SUPER_CHAT_MESSAGE"; // "SUPER_CHAT_MESSAGE",
  data: RawSuperChat;
  roomid: number; // 25512443
}

export interface RawSuperChat {
  background_bottom_color: string; // 下方颜色比较深的，写着SC内容的区域
  background_color: string; // 上方区域，用户名头像区域
  background_color_end: string; // 未知
  background_color_start: string; // 未知
  background_icon: string; // "",
  background_image: string; // 右侧一个小图片作为背景
  background_price_color: string; // "#ECCF75",
  color_point: number; // 0.7,
  dmscore: number; // 120,
  end_time: number; // 1667052432,
  gift: {
    gift_id: number; // 12000,
    gift_name: string; // "醒目留言",
    num: number; // 1
  };
  id: number; // 5435571,
  is_ranked: number; // 0,
  is_send_audit: number; // 0,
  medal_info: {
    anchor_roomid: number; // 25512443,
    anchor_uname: string; // "露早GOGO",
    guard_level: number; // 用户是粉丝牌对应主播的什么身份
    icon_id: number; // 0,
    is_lighted: number; // 1,
    medal_color: string; // "#1a544b",
    medal_color_border: number; // 6809855,
    medal_color_end: number; // 5414290,
    medal_color_start: number; // 1725515,
    medal_level: number; // 22,
    medal_name: string; // "GOGO队",
    special: string; // "",
    target_id: number; // 1669777785
  } | null;
  message: string; // "你是狡黠，是纯真，是我们的精灵，人间的美好。你说，遇到我们，你很开心。但遇到你，更是我们的幸运。亲爱的露早，你是最棒的！",
  message_font_color: string; // "#72110E",
  message_trans: string; // "",
  price: number; // 100,
  rate: number; // 1000,
  start_time: number; // 1667052132,
  time: number; // 300,
  token: string; // "8156D664",
  trans_mark: number; // 0,
  ts: number; // 1667052132,
  uid: number; // 343292134,
  user_info: {
    face: string; // "https://i1.hdslb.com/bfs/face/ef32438dc638e96b291237331998900d9dba8cfc.jpg",
    face_frame: string; // "https://i0.hdslb.com/bfs/live/80f732943cc3367029df65e267960d56736a82ee.png",
    guard_level: number; // 用户是当前主播的什么身份
    is_main_vip: number; // 0,
    is_svip: number; // 0,
    is_vip: number; // 0,
    level_color: string; // "#61c05a",
    manager: number; // 0,
    name_color: string; // "#00D1F1",
    title: string; // "0",
    uname: string; // 用户名
    user_level: number; // 可能是B站等级
  };
}
