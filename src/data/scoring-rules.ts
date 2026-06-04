import { Category } from "@/lib/types";

export const PASSING_THRESHOLD = 70;
export const MAX_SCORE = 200;

export const categories: Category[] = [
  {
    id: "education",
    name: "學歷",
    maxPoints: 30,
    options: [
      { id: "edu-phd", label: "博士", points: 30 },
      { id: "edu-master", label: "碩士", points: 24 },
      { id: "edu-bachelor", label: "大學（學士）", points: 18 },
      { id: "edu-associate", label: "副學士（專科）", points: 10 },
    ],
  },
  {
    id: "salary",
    name: "聘僱薪資",
    maxPoints: 40,
    options: [
      { id: "sal-4", label: "月薪 47,971 元以上", points: 40 },
      { id: "sal-3", label: "月薪 40,000 ~ 47,970 元", points: 30 },
      { id: "sal-2", label: "月薪 35,000 ~ 39,999 元", points: 20 },
      { id: "sal-1", label: "月薪 31,520 ~ 34,999 元", points: 10 },
    ],
  },
  {
    id: "experience",
    name: "工作經驗",
    maxPoints: 20,
    options: [
      { id: "exp-4", label: "2 年以上相關工作經驗", points: 20 },
      { id: "exp-3", label: "1 年以上未滿 2 年", points: 15 },
      { id: "exp-2", label: "6 個月以上未滿 1 年（或實習）", points: 10 },
      { id: "exp-1", label: "未滿 6 個月", points: 5 },
      { id: "exp-0", label: "無相關經驗", points: 0 },
    ],
  },
  {
    id: "mandarin",
    name: "華語能力",
    maxPoints: 30,
    options: [
      { id: "man-native", label: "華語為母語", points: 30 },
      { id: "man-high", label: "華語流利（TOCFL B2 以上）", points: 25 },
      { id: "man-mid", label: "華語中階（TOCFL B1）", points: 20 },
      { id: "man-basic", label: "基礎華語（TOCFL A2）", points: 10 },
      { id: "man-none", label: "無華語能力", points: 0 },
    ],
  },
  {
    id: "foreign-lang",
    name: "他國語言能力",
    maxPoints: 20,
    options: [
      { id: "fl-2", label: "精通 2 種以上外語", points: 20 },
      { id: "fl-1", label: "精通 1 種外語", points: 10 },
      { id: "fl-0", label: "無特殊外語能力", points: 0 },
    ],
  },
  {
    id: "qualification",
    name: "職務資格",
    maxPoints: 20,
    options: [
      { id: "qual-yes", label: "具相關專業證照或資格", points: 20 },
      { id: "qual-partial", label: "具部分相關資格", points: 10 },
      { id: "qual-no", label: "無特殊資格", points: 0 },
    ],
  },
  {
    id: "policy",
    name: "配合政策",
    maxPoints: 20,
    options: [
      { id: "pol-yes", label: "任職於配合政策之企業", points: 20 },
      { id: "pol-partial", label: "部分符合政策加分", points: 10 },
      { id: "pol-no", label: "不適用", points: 0 },
    ],
  },
  {
    id: "academic",
    name: "獎學金或成績",
    maxPoints: 20,
    options: [
      { id: "aca-gov", label: "獲政府獎學金", points: 20 },
      { id: "aca-school", label: "獲校內獎學金", points: 15 },
      { id: "aca-top", label: "成績排名前 20%", points: 10 },
      { id: "aca-none", label: "無特殊成績表現", points: 0 },
    ],
  },
];
