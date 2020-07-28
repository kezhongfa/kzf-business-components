import moment from "moment";
import { DateFormats } from "@shuyun-ep-team/utils/es/date";

export function handleDataFormatDateTime(timestamp: moment.MomentInput) {
  return timestamp ? moment(timestamp).format(DateFormats.DateTime) : "";
}

export function handleDataFormatDate(timestamp: moment.MomentInput) {
  return timestamp ? moment(timestamp).format(DateFormats.Date) : "";
}

export function handleDataFormatTime(timestamp: moment.MomentInput) {
  return timestamp ? moment(timestamp).format(DateFormats.Time) : "";
}

export function getTimeDiff(time1: moment.MomentInput, time2 = moment()) {
  return moment(time1).diff(moment(time2));
}
