import * as moment from "moment";

export type TTrigger = ("click" | "hover" | "contextMenu")[];
export type TOperator = "EQ" | "NE" | "GT" | "LT" | "LE" | "GE" | "GE_LE" | "GT_LT" | "GE_LT";
export type TUnit = "DAY" | "WEEK" | "MONTH" | "QUARTER" | "YEAR";

export type TFixPointTimeValue =
  | [moment.Moment, moment.Moment]
  | [number, number]
  | [string, string]
  | [moment.Moment]
  | [number]
  | [string];

export type TCommonTimeType = "date" | "dateTime" | undefined;
export type TCommonValue =
  | number
  | [number, number]
  | [moment.Moment, moment.Moment]
  | [moment.Moment]
  | [string, string]
  | undefined;
export type TCommonTimeSelectType =
  | "ALL_TIME"
  | "RECENT_TIME"
  | "BEFORE_DEADLINE_TIME"
  | "FIXED_POINT_TIME"
  | "FREE_INTERVAL_TIME"
  | "TIME_INTERVAL_TIME";

export interface ICommonTimeSelectValue {
  timeSelectType: string;
  value?: TCommonValue;
  includeCurrentPeriod?: boolean;
  operator?: TOperator;
  unit?: TUnit;
}
export enum validateStatus {
  error = "error",
  success = "success",
  warning = "warning",
  validating = "validating",
}

export type TIntervalValue = [number, number] | [moment.Moment, moment.Moment] | [string, string];
export interface IIntervalTimeSelectValue {
  value?: TIntervalValue;
  operator?: TOperator;
}
