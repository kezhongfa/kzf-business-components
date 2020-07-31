import moment from "moment";
import { TOperator } from "../../../../types";
import { operatorJson } from "../../../../helpers/constant";

// 格式化时间范围
const range = (start: number, end: number) => {
  const result: number[] = [];
  for (let i: number = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// 获取开始时间disabled选项
export function getStartTimeDisabled(
  startTime: moment.Moment | undefined,
  endTime: moment.Moment | undefined,
  operator: TOperator
) {
  let result = {};
  if (endTime !== undefined && operator !== undefined) {
    const endHours = endTime.hours();
    const endMinutes = endTime.minutes();
    const endSeconds = endTime.seconds();
    const disabledHours = () => range(endHours + 1, 24);
    if (startTime !== undefined) {
      const startHours = startTime.hours();
      const startMinutes = startTime.minutes();
      if (operator === operatorJson.GE_LE) {
        if (startHours === endHours) {
          if (startMinutes === endMinutes) {
            result = {
              disabledHours,
              disabledMinutes: () => range(endMinutes + 1, 60),
              disabledSeconds: () => range(endSeconds + 1, 60),
            };
          } else {
            result = {
              disabledHours,
              disabledMinutes: () => range(endMinutes + 1, 60),
              disabledSeconds: () => range(60, 60),
            };
          }
        } else if (startHours < endHours) {
          result = {
            disabledHours,
            disabledMinutes: () => range(60, 60),
            disabledSeconds: () => range(60, 60),
          };
        }
      } else if (
        operator === operatorJson.GT_LT ||
        operator === operatorJson.GE_LT ||
        operator === operatorJson.GT_LE
      ) {
        if (startHours === endHours) {
          if (startMinutes === endMinutes) {
            result = {
              disabledHours,
              disabledMinutes: () => range(endMinutes + 1, 60),
              disabledSeconds: () => range(endSeconds, 60),
            };
          } else {
            result = {
              disabledHours,
              disabledMinutes: () => range(endMinutes + 1, 60),
              disabledSeconds: () => range(60, 60),
            };
          }
        } else if (startHours < endHours) {
          result = {
            disabledHours,
            disabledMinutes: () => range(60, 60),
            disabledSeconds: () => range(60, 60),
          };
        }
      }
    } else {
      if (operator === operatorJson.GE_LE) {
        result = {
          disabledHours,
          disabledMinutes: () => range(endMinutes + 1, 60),
          disabledSeconds: () => range(endSeconds + 1, 60),
        };
      } else if (
        operator === operatorJson.GT_LT ||
        operator === operatorJson.GE_LT ||
        operator === operatorJson.GT_LE
      ) {
        result = {
          disabledHours,
          disabledMinutes: () => range(endMinutes + 1, 60),
          disabledSeconds: () => range(endSeconds, 60),
        };
      }
    }
  }

  return result;
}

// 获取结束时间disabled选项
export function getEndTimeDisabled(
  startTime: moment.Moment | undefined,
  endTime: moment.Moment | undefined,
  operator: TOperator
) {
  let result = {};

  if (startTime !== undefined && operator !== undefined) {
    const startHours = startTime.hours();
    const startMinutes = startTime.minutes();
    const startSeconds = startTime.seconds();
    const disabledHours = () => range(0, startHours);
    if (endTime !== undefined) {
      const endHours = endTime.hours();
      const endMinutes = endTime.minutes();
      if (operator === operatorJson.GE_LE) {
        if (endHours === startHours) {
          if (endMinutes === startMinutes) {
            result = {
              disabledHours,
              disabledMinutes: () => range(0, startMinutes),
              disabledSeconds: () => range(0, startSeconds),
            };
          } else {
            result = {
              disabledHours,
              disabledMinutes: () => range(0, startMinutes),
              disabledSeconds: () => range(60, 60),
            };
          }
        } else if (endHours > startHours) {
          result = {
            disabledHours,
            disabledMinutes: () => range(60, 60),
            disabledSeconds: () => range(60, 60),
          };
        }
      } else if (
        operator === operatorJson.GT_LT ||
        operator === operatorJson.GE_LT ||
        operator === operatorJson.GT_LE
      ) {
        if (endHours === startHours) {
          if (endMinutes === startMinutes) {
            result = {
              disabledHours,
              disabledMinutes: () => range(0, startMinutes),
              disabledSeconds: () => range(0, startSeconds + 1),
            };
          } else if (endMinutes > startMinutes) {
            result = {
              disabledHours,
              disabledMinutes: () => range(0, startMinutes),
              disabledSeconds: () => range(60, 60),
            };
          }
        } else if (endHours > startHours) {
          result = {
            disabledHours,
            disabledMinutes: () => range(60, 60),
            disabledSeconds: () => range(60, 60),
          };
        }
      }
    } else {
      if (operator === operatorJson.GE_LE) {
        result = {
          disabledHours,
          disabledMinutes: () => range(0, startMinutes),
          disabledSeconds: () => range(0, startSeconds),
        };
      } else if (
        operator === operatorJson.GT_LT ||
        operator === operatorJson.GE_LT ||
        operator === operatorJson.GT_LE
      ) {
        result = {
          disabledHours,
          disabledMinutes: () => range(0, startMinutes),
          disabledSeconds: () => range(0, startSeconds + 1),
        };
      }
    }
  }

  return result;
}
