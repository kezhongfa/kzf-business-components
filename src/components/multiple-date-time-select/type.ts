import * as moment from "moment";

export type TDateTimeSelectType = "date" | "dateTime" | "time";
export type TDateTimeSelectValueItem = moment.Moment | string;
export type TDateTimeSelectValue = Array<TDateTimeSelectValueItem>;
export type TDateTimeSelectTrigger = ("click" | "hover" | "contextMenu")[];
