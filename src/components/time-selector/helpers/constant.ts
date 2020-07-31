import * as i18nMap from "../i18n.map";

export const timeSelectType = {
  ALL_TIME: "ALL_TIME",
  RECENT_TIME: "RECENT_TIME",
  BEFORE_DEADLINE_TIME: "BEFORE_DEADLINE_TIME",
  FIXED_POINT_TIME: "FIXED_POINT_TIME",
  FREE_INTERVAL_TIME: "FREE_INTERVAL_TIME",
  TIME_INTERVAL_TIME: "TIME_INTERVAL_TIME",
};

export const unitJson = {
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
  QUARTER: "QUARTER",
  YEAR: "YEAR",
};
export const operatorJson = {
  EQ: "EQ",
  NE: "NE",
  GT: "GT",
  LT: "LT",
  LE: "LE",
  GE: "GE",
  GE_LE: "GE_LE",
  GE_LT: "GE_LT",
  GT_LE: "GT_LE",
  GT_LT: "GT_LT",
};

export const commonTimeTypeList = [
  {
    title: i18nMap.i18n.ALL_TIME,
    value: timeSelectType.ALL_TIME,
  },
  {
    title: i18nMap.i18n.RECENT_TIME,
    value: timeSelectType.RECENT_TIME,
  },
  {
    title: i18nMap.i18n.BEFORE_DEADLINE_TIME,
    value: timeSelectType.BEFORE_DEADLINE_TIME,
  },
  {
    title: i18nMap.i18n.FIXED_POINT_TIME,
    value: timeSelectType.FIXED_POINT_TIME,
  },
  {
    title: i18nMap.i18n.FREE_INTERVAL_TIME,
    value: timeSelectType.FREE_INTERVAL_TIME,
  },
];

export const pureTimeTypeList = [
  {
    title: i18nMap.i18n.GE_LE,
    value: timeSelectType.TIME_INTERVAL_TIME,
  },
];

export const pureTimePointJson = {
  [operatorJson.GE_LE]: "≤  x  ≤",
  [operatorJson.GE_LT]: "≤  x  <",
  [operatorJson.GT_LE]: "<  x  ≤",
  [operatorJson.GT_LT]: "<  x  <",
};

export const unitTextJson = {
  [unitJson.DAY]: i18nMap.i18n.DAY,
  [unitJson.WEEK]: i18nMap.i18n.WEEK,
  [unitJson.MONTH]: i18nMap.i18n.MONTH,
  [unitJson.QUARTER]: i18nMap.i18n.QUARTER,
  [unitJson.YEAR]: i18nMap.i18n.YEAR,
};

export const timeOperator = {
  fixedTimePoint: [
    {
      title: i18nMap.i18n.EQ,
      value: operatorJson.EQ,
    },
    {
      title: i18nMap.i18n.NE,
      value: operatorJson.NE,
    },
    {
      title: i18nMap.i18n.LE,
      value: operatorJson.LE,
    },
    {
      title: i18nMap.i18n.GE,
      value: operatorJson.GE,
    },
    {
      title: i18nMap.i18n.GE_LE,
      value: operatorJson.GE_LE,
    },
  ],
  pureTimePoint: [
    {
      title: pureTimePointJson[operatorJson.GE_LE],
      value: operatorJson.GE_LE,
    },
    {
      title: pureTimePointJson[operatorJson.GE_LT],
      value: operatorJson.GE_LT,
    },
    {
      title: pureTimePointJson[operatorJson.GT_LE],
      value: operatorJson.GT_LE,
    },
    {
      title: pureTimePointJson[operatorJson.GT_LT],
      value: operatorJson.GT_LT,
    },
  ],
};

export const unitList = [
  {
    title: i18nMap.i18n.NATURAL_DAY,
    value: unitJson.DAY,
  },
  {
    title: i18nMap.i18n.NATURAL_WEEK,
    value: unitJson.WEEK,
  },
  {
    title: i18nMap.i18n.NATURAL_MONTH,
    value: unitJson.MONTH,
  },
  {
    title: i18nMap.i18n.NATURAL_QUARTER,
    value: unitJson.QUARTER,
  },
  {
    title: i18nMap.i18n.NATURAL_YEAR,
    value: unitJson.YEAR,
  },
];
