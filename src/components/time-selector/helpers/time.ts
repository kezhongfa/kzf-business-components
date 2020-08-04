/* eslint-disable indent */
import moment from "moment";
import { DateFormats } from "@shuyun-ep-team/utils/es/date";
import { isNumeric } from "../../../helpers";
import { unitTextJson, unitJson } from "./constant";
import { TUnit } from "../types";
import { translate } from "../../../helpers/translate";
import * as i18nMap from "../i18n.map";

/**
 * 格式化以自然天为单位
 * @param {*} number
 * @returns
 */
function formatTimeByDayUnit(number: number) {
  return moment().subtract(number, "days").format(DateFormats.Date);
}

/**
 * 格式化以自然周为单位
 * @param {*} number
 * @returns
 */
function formatTimeByWeekUnit(number: number) {
  return moment().day(number).format(DateFormats.Date);
}

/**
 * 格式化以自然月为单位
 * @param {*} number
 * @returns
 */
function formatTimeByMonthUnit(number: number) {
  return moment()
    .startOf("month")
    .subtract(number, "months")
    .subtract(1, "days")
    .format(DateFormats.Date);
}

/**
 * 格式化以自然季度为单位
 * @param {*} number
 * @returns
 */

function formatTimeByQuarterUnit(number: number) {
  return moment()
    .startOf("quarter")
    .subtract(number, "quarters")
    .subtract(1, "days")
    .format(DateFormats.Date);
}

/**
 * 格式化以自然年为单位
 * @param {*} number
 * @returns
 */
function formatTimeByYearUnit(number: number) {
  return moment()
    .startOf("year")
    .subtract(number, "years")
    .subtract(1, "days")
    .format(DateFormats.Date);
}
/**
 * 根据单位获取对应文案
 * @param {*} number
 * @param {*} unit
 * @returns
 */
function getDescribeByUnit(i18n: any, number: number, unit: TUnit) {
  let result = "";
  if (number === 0) {
    if (unit === unitJson.DAY) {
      result = translate(i18n, i18nMap.i18n.TODAY);
    } else if (unit === unitJson.WEEK) {
      result = translate(i18n, i18nMap.i18n.THIS_WEEK);
    } else if (unit === unitJson.MONTH) {
      result = translate(i18n, i18nMap.i18n.THIS_MONTH);
    } else if (unit === unitJson.QUARTER) {
      result = translate(i18n, i18nMap.i18n.THIS_QUARTER);
    } else if (unit === unitJson.YEAR) {
      result = translate(i18n, i18nMap.i18n.THIS_YEAR);
    }
  } else if (number === 1) {
    if (unit === unitJson.DAY) {
      result = translate(i18n, i18nMap.i18n.YESTERDAY);
    } else if (unit === unitJson.WEEK) {
      result = translate(i18n, i18nMap.i18n.LAST_WEEK);
    } else if (unit === unitJson.MONTH) {
      result = translate(i18n, i18nMap.i18n.LAST_MONTH);
    } else if (unit === unitJson.QUARTER) {
      result = translate(i18n, i18nMap.i18n.LAST_QUARTER);
    } else if (unit === unitJson.YEAR) {
      result = translate(i18n, i18nMap.i18n.LAST_YEAR);
    }
  } else if (number === 2) {
    if (unit === unitJson.DAY) {
      result = translate(i18n, i18nMap.i18n.THE_DAY_BEFORE_YESTERDAY);
    } else if (unit === unitJson.WEEK) {
      result = translate(i18n, i18nMap.i18n.THE_WEEK_BEFORE_LAST_WEEK);
    } else if (unit === unitJson.MONTH) {
      result = translate(i18n, i18nMap.i18n.THE_MONTH_BEFORE_LAST_MONTH);
    } else if (unit === unitJson.QUARTER) {
      result = translate(i18n, i18nMap.i18n.THE_QUARTER_BEFORE_LAST_QUARTER);
    } else if (unit === unitJson.YEAR) {
      result = translate(i18n, i18nMap.i18n.THE_YEAR_BEFORE_LAST_YEAR);
    }
  }
  return result;
}
/**
 * 最近
 * @export
 * @param {*} number
 * @param {*} unit
 * @param {boolean} [includeCurrentPeriod=true]
 * @returns
 */
export function calculateRecentTime(
  number: number | undefined,
  unit: TUnit,
  includeCurrentPeriod = true
) {
  let time = "";
  if (number === undefined) {
    return {
      time,
    };
  }
  if (unit === unitJson.DAY) {
    if (includeCurrentPeriod) {
      if (number === 1) {
        time = formatTimeByDayUnit(0);
      } else {
        time = formatTimeByDayUnit(number - 1) + " - " + formatTimeByDayUnit(0);
      }
    } else {
      if (number === 1) {
        time = formatTimeByDayUnit(1);
      } else {
        time = formatTimeByDayUnit(number) + " - " + formatTimeByDayUnit(1);
      }
    }
  } else if (unit === unitJson.WEEK) {
    if (includeCurrentPeriod) {
      time =
        formatTimeByWeekUnit(-7 * (number - 1) + 1) + " - " + moment().format(DateFormats.Date);
    } else {
      time = formatTimeByWeekUnit(-7 * (number - 1) - 6) + " - " + formatTimeByWeekUnit(0);
    }
  } else if (unit === unitJson.MONTH) {
    if (includeCurrentPeriod) {
      time =
        moment()
          .startOf("month")
          .subtract(number - 1, "months")
          .format(DateFormats.Date) +
        " - " +
        moment().format(DateFormats.Date);
    } else {
      time =
        moment().startOf("month").subtract(number, "months").format(DateFormats.Date) +
        " - " +
        moment().startOf("month").subtract(1, "days").format("YYYY-MM-DD");
    }
  } else if (unit === unitJson.QUARTER) {
    if (includeCurrentPeriod) {
      time =
        moment()
          .startOf("quarter")
          .subtract(number - 1, "quarters")
          .format(DateFormats.Date) +
        " - " +
        moment().format(DateFormats.Date);
    } else {
      time =
        moment().startOf("quarter").subtract(number, "quarters").format(DateFormats.Date) +
        " - " +
        moment().startOf("quarter").subtract(1, "days").format(DateFormats.Date);
    }
  } else if (unit === unitJson.YEAR) {
    if (includeCurrentPeriod) {
      time =
        moment()
          .startOf("year")
          .subtract(number - 1, "years")
          .format(DateFormats.Date) +
        " - " +
        moment().format(DateFormats.Date);
    } else {
      time =
        moment().startOf("year").subtract(number, "years").format(DateFormats.Date) +
        " - " +
        moment().startOf("year").subtract(1, "days").format(DateFormats.Date);
    }
  }
  return {
    time,
  };
}

/**
 * 截止之前
 * @export
 * @param {*} number
 * @param {*} unit
 * @returns
 */
export function calculateBeforeDeadlineTime(i18n: any, number: number, unit: TUnit) {
  let describe = "",
    time = "";
  if (!isNumeric(number)) {
    return {
      describe,
      time,
    };
  }
  if (unit === unitJson.DAY) {
    describe = getDescribeByUnit(i18n, number, unit);
    time = formatTimeByDayUnit(number);
  } else if (unit === unitJson.WEEK) {
    describe = getDescribeByUnit(i18n, number, unit);
    time = formatTimeByWeekUnit(-7 * (number - 1));
  } else if (unit === unitJson.MONTH) {
    describe = getDescribeByUnit(i18n, number, unit);
    time = formatTimeByMonthUnit(number - 1);
  } else if (unit === unitJson.QUARTER) {
    describe = getDescribeByUnit(i18n, number, unit);
    time = formatTimeByQuarterUnit(number - 1);
  } else if (unit === unitJson.YEAR) {
    describe = getDescribeByUnit(i18n, number, unit);
    time = formatTimeByYearUnit(number - 1);
  }
  if (number === 0) {
    time = formatTimeByDayUnit(0);
  }
  return {
    prefixText: translate(i18n, i18nMap.i18n.IS),
    suffixText: "",
    describe: describe ? translate(i18n, i18nMap.i18n.DEAD_LINE) + describe : describe,
    time: translate(i18n, i18nMap.i18n.DEAD_LINE) + time,
  };
}

/**
 * 自由时间区间（过去）
 * @export
 * @param {number} max
 * @param {number} min
 * @param {*} unit
 * @returns
 */
export function calculateFreeTimeBetween(
  i18n: any,
  max: number | undefined,
  min: number | undefined,
  unit: TUnit
) {
  let describe = "",
    time = "",
    suffixText = "";
  if (max === undefined || min === undefined || !isNumeric(max) || !isNumeric(min) || max < min) {
    return {
      describe,
      suffixText,
      time,
    };
  }
  if (max > 2 && min > 2) {
    suffixText = translate(i18n, i18nMap.i18n.WITHIN);
  }
  if (max < 3) {
    describe = getDescribeByUnit(i18n, max, unit);
  } else {
    if (unit === unitJson.MONTH || unit === unitJson.QUARTER) {
      describe = `${translate(i18n, i18nMap.i18n.THE_LAST)} ${max}${translate(
        i18n,
        i18nMap.i18n.INDIVIDUAL
      )}${translate(i18n, unitTextJson[unit])}`;
    } else {
      describe = `${translate(i18n, i18nMap.i18n.THE_LAST)}${max}${translate(
        i18n,
        unitTextJson[unit]
      )}`;
    }
  }
  if (min < 3) {
    describe += `${translate(i18n, i18nMap.i18n.TO)}${getDescribeByUnit(i18n, min, unit)}`;
  } else {
    if (unit === unitJson.MONTH || unit === unitJson.QUARTER) {
      describe += `${translate(i18n, i18nMap.i18n.TO)}${min}${translate(
        i18n,
        i18nMap.i18n.INDIVIDUAL
      )}${translate(i18n, unitTextJson[unit])}`;
    } else {
      describe += `${translate(i18n, i18nMap.i18n.TO)}${min}${translate(i18n, unitTextJson[unit])}`;
    }
  }

  if (unit === unitJson.DAY) {
    if (max === min) {
      time = formatTimeByDayUnit(max);
    } else {
      time = formatTimeByDayUnit(max) + " - " + formatTimeByDayUnit(min);
    }
  } else if (unit === unitJson.WEEK) {
    const afTime = formatTimeByWeekUnit(1 - 7 * max);
    const bfTime =
      min === 0 ? moment().format(DateFormats.Date) : formatTimeByWeekUnit(-7 * (min - 1));
    time = afTime + " - " + bfTime;
  } else if (unit === unitJson.MONTH) {
    const afTime = moment().startOf("month").subtract(max, "months").format(DateFormats.Date);
    const bfTime =
      min === 0
        ? moment().format(DateFormats.Date)
        : moment()
            .startOf("month")
            .subtract(min - 1, "months")
            .subtract(1, "days")
            .format(DateFormats.Date);
    time = afTime + " - " + bfTime;
  } else if (unit === unitJson.QUARTER) {
    const afTime = moment().startOf("quarter").subtract(max, "quarters").format(DateFormats.Date);
    const bfTime =
      min === 0
        ? moment().format(DateFormats.Date)
        : moment()
            .startOf("quarter")
            .subtract(min - 1, "quarters")
            .subtract(1, "days")
            .format(DateFormats.Date);
    time = afTime + " - " + bfTime;
  } else if (unit === unitJson.YEAR) {
    const afTime = moment().startOf("year").subtract(max, "years").format(DateFormats.Date);
    const bfTime =
      min === 0
        ? moment().format(DateFormats.Date)
        : moment()
            .startOf("year")
            .subtract(min - 1, "years")
            .subtract(1, "days")
            .format(DateFormats.Date);
    time = afTime + " - " + bfTime;
  }
  return {
    prefixText: translate(i18n, i18nMap.i18n.IS),
    suffixText,
    describe,
    time,
  };
}
