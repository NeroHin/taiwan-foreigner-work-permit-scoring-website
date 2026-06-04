export const PASSING_SCORE = 70
export const MAX_SCORE = 200

export const purposes = [
  {
    id: 'estimate',
    title: '我只想先估分',
    description: '立即看分數與差距，文件清單先收起來。',
    primaryStep: '先補足最有機會加分的項目，再確認是否要進入文件準備。'
  },
  {
    id: 'apply',
    title: '我準備送件',
    description: '邊估分邊整理應備文件與官方連結。',
    primaryStep: '確認分數達標後，依新聘或展延情境整理雇主與申請人文件。'
  },
  {
    id: 'renew',
    title: '我已有評點制許可',
    description: '聚焦展延與是否加計新點數。',
    primaryStep: '若不加計新項目，官方說明可僅附評點表；若要加分，再補對應證明。'
  }
]

export const scoringSections = [
  {
    id: 'education',
    title: '學歷',
    evidence: '畢業證書影本；副學士限官方列示相關學門。',
    options: [
      { label: '博士學位', points: 30 },
      { label: '碩士學位', points: 20 },
      { label: '學士學位', points: 10 },
      { label: '副學士學位', points: 5 },
      { label: '尚未符合', points: 0 }
    ]
  },
  {
    id: 'salary',
    title: '聘僱薪資',
    evidence: '聘僱契約需載明月平均薪資、職稱、工作內容與期間。',
    options: [
      { label: '月薪 47,971 元以上', points: 40 },
      { label: '月薪 40,000 至未達 47,971 元', points: 30 },
      { label: '月薪 35,000 至未達 40,000 元', points: 20 },
      { label: '月薪 31,520 至未達 35,000 元', points: 10 },
      { label: '未達 31,520 元或尚未確定', points: 0 }
    ]
  },
  {
    id: 'experience',
    title: '工作或實習經驗',
    evidence: '國內外專職工作證明；實習限在臺就學期間取得。',
    options: [
      { label: '工作經驗 2 年以上', points: 20 },
      { label: '工作 1 年以上未達 2 年，或在臺就學期間實習 1 年以上', points: 10 },
      { label: '未達上述條件', points: 0 }
    ]
  },
  {
    id: 'roleSkill',
    title: '擔任職務資格',
    evidence: '專業訓練、課程、技能檢定、作品、競賽、專利等證明。',
    options: [
      { label: '具有企業所需該職務特殊專長能力', points: 20 },
      { label: '尚無明確證明', points: 0 }
    ]
  },
  {
    id: 'mandarin',
    title: '華語語文能力',
    evidence: '華語測驗、在臺中文課程成績或華語學習時數證明。',
    options: [
      { label: '流利等級以上', points: 30 },
      { label: '高階等級', points: 25 },
      { label: '進階等級', points: 20 },
      { label: '尚未符合', points: 0 }
    ]
  },
  {
    id: 'otherLanguage',
    title: '他國語言能力或成長經驗',
    evidence: '護照影本；兩項以上語言能力需另附檢定或 360 小時以上修習證明。',
    options: [
      { label: '華語以外 2 項以上他國語文能力', points: 20 },
      { label: '華語以外 1 項他國語文能力，或他國連續居留 6 年以上', points: 10 },
      { label: '尚未符合', points: 0 }
    ]
  },
  {
    id: 'policy',
    title: '配合政府政策',
    evidence: '雇主政策認定函、專班學位證書或 G2G 入學相關文件。',
    options: [
      { label: '政策企業受僱者、政策專班或 G2G 管道畢業僑外生', points: 20 },
      { label: '尚未符合', points: 0 }
    ]
  },
  {
    id: 'scholarship',
    title: '獎學金或成績優異',
    evidence: '政府、學校核定公文、公告名單或成績排名證明。',
    options: [
      { label: '政府獎學金或成績前 30%', points: 20 },
      { label: '學校獎學金，或成績前 50% 且 GPA 達 3', points: 5 },
      { label: '尚未符合', points: 0 }
    ]
  }
]

export const baseDocuments = [
  '審查費收據或線上繳費資料',
  '申請書',
  '受聘僱外國人名冊',
  '評點表及符合各評點項目的證明文件',
  '護照影本或外僑居留證影本',
  '在臺取得學士以上學歷畢業證書影本',
  '聘僱契約書影本或副本',
  '雇主身分證明、立案或設立登記證明',
  '依工作項目可能需要的特許事業許可或營業額證明'
]

export const renewalDocuments = [
  '評點表',
  '原聘僱許可函文號或影本',
  '護照影本或外僑居留證影本',
  '聘僱契約書影本或副本',
  '如要加計新點數，補上新增評點項目的證明文件'
]

export const officialLinks = [
  {
    label: 'WDA 應備文件與評點表',
    href: 'https://ezworktaiwan.wda.gov.tw/cp.aspx?n=2991AC80BCDA014A&s=AA9D36CA55662CED'
  },
  {
    label: 'AP0 評點表下載',
    href: 'https://ezworktaiwan.wda.gov.tw/News_Content.aspx?n=C2D71E282D50644B&s=D78D6310A0088ABC&sms=9CB1BB388B89EC79'
  },
  {
    label: '外國專業人員工作許可申辦網',
    href: 'https://ezwp.wda.gov.tw'
  }
]
