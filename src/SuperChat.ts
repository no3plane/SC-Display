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
    upUid: number;
    upName: string;
  } | null;

  username: string;
  usernameColor: string;
  userId: number;

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
        upUid: rawSc.medal_info.target_id,
        upName: rawSc.medal_info.anchor_uname,
      };
    } else {
      this.medal = null;
    }

    this.id = rawSc.id;
    this.username = rawSc.user_info.uname;
    this.usernameColor = rawSc.user_info.name_color;
    this.userId = rawSc.uid;
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
  cmd: MessageType;
  data: RawSuperChat;
  roomid: number;
}

export type MessageType = "SUPER_CHAT_MESSAGE" | "DANMU_MSG" | "SEND_GIFT";

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
  end_time: number; // 时间/1000
  gift: {
    gift_id: number; // 12000,
    gift_name: string; // "醒目留言",
    num: number; // 1
  };
  id: number; // 应该是SC的ID
  is_ranked: number; // 0,
  is_send_audit: number; // 0,
  medal_info: {
    anchor_roomid: number; // 直播间房间号
    anchor_uname: string; // 主播名
    guard_level: number; // 用户是粉丝牌对应主播的什么身份
    icon_id: number; // 0,
    is_lighted: number; // 1,
    medal_color: string; // "#1a544b",
    medal_color_border: number; // 6809855,
    medal_color_end: number; // 5414290,
    medal_color_start: number; // 1725515,
    medal_level: number; // 粉丝牌等级
    medal_name: string; // 粉丝群体的名字
    special: string; // "",
    target_id: number; // 主播B站主页ID
  } | null;
  message: string; // SC内容
  message_font_color: string; // "#72110E",
  message_trans: string; // SC内容翻译
  price: number; // SC价格
  rate: number; // 1000,
  start_time: number; // 时间/1000
  time: number; // SC持续时间
  token: string; // "8156D664",
  trans_mark: number; // 0,
  ts: number; // 1667052132,
  uid: number; // 用户B站主页ID
  user_info: {
    face: string; // 用户头像URL
    face_frame: string; // 用户头像框URL
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
