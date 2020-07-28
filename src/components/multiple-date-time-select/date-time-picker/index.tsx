import React, { useCallback, useMemo, useState, useEffect } from "react";
import { DatePicker, TimePicker, Button } from "@shuyun-ep-team/kylin-ui";
import moment from "moment";
import { TDateTimeSelectType } from "../type";
import { isEmptyValue } from "../../../helpers";
import { translate } from "../../../helpers/translate";
import { getCurLanguage } from "../i18n";
import { TLanguage } from "../../../types/language";
import { languageDefault } from "../../../constants/language";
import { timeTypeDefault, timeTypeJson } from "../constant";

export interface IProps {
  language?: TLanguage;
  timeType: TDateTimeSelectType;
  onOk?: (v: moment.Moment) => void;
}

export const DateTimePicker = (props: IProps) => {
  const { onOk, timeType, language } = props;
  const [i18n, setI18n] = useState({});
  const [timeValue, setTimeValue] = useState(null as moment.Moment | null);

  useEffect(() => {
    getCurLanguage(language).then((res) => {
      setI18n(res);
    });
  }, [language]);

  const curTimeType = useMemo(() => {
    return timeType || timeTypeDefault;
  }, [timeType]);

  const onTimeChange = useCallback((time: moment.Moment) => {
    setTimeValue(time);
  }, []);

  const handleTimeClose = () => {
    if (timeValue) {
      onOk && onOk(timeValue);
    }
  };

  const timeAddon = useCallback(
    () => (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          type="primary"
          onClick={handleTimeClose}
          disabled={isEmptyValue(timeValue)}
        >
          {translate(i18n, "MultipleDateTimeSelect.Btn.Text.Sure")}
        </Button>
      </div>
    ),
    [timeValue, i18n]
  );

  const onChange = useCallback(
    (date: moment.Moment | null) => {
      if (date && onOk) {
        onOk(date);
      }
    },
    [onOk]
  );

  const dateTimePicker = useMemo(() => {
    if (curTimeType === timeTypeJson.date) {
      return <DatePicker open={true} showToday={false} onChange={onChange} />;
    } else if (curTimeType === timeTypeJson.dateTime) {
      return <DatePicker open={true} showTime={true} showToday={false} onOk={onChange} />;
    } else if (curTimeType === timeTypeJson.time) {
      return <TimePicker open={true} onChange={onTimeChange} addon={timeAddon} />;
    }
    return null;
  }, [curTimeType, onChange, onTimeChange, timeAddon]);

  return dateTimePicker;
};

DateTimePicker.defaultProps = {
  language: languageDefault,
  timeType: timeTypeDefault,
};
export default DateTimePicker;
