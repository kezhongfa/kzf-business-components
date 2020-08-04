import React, { useContext } from "react";
import Select, { ISelectProps } from "@shuyun-ep-team/kylin-ui/lib/select";
import { timeOperator } from "../../../../helpers/constant";
import { TOperator } from "../../../../types";
import { translate } from "../../../../../../helpers/translate";
import { RootI18nContext } from "../../../../../../contexts";

interface IProps {
  value?: TOperator;
  style?: React.CSSProperties;
  onChange?: (v: TOperator) => void;
}

export default function FixedTmePointSelect(props: IProps) {
  const rootI18nContext = useContext(RootI18nContext);
  const { i18n } = rootI18nContext;
  return (
    <Select {...(props as ISelectProps)}>
      {timeOperator.fixedTimePoint.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {translate(i18n, item.title)}
        </Select.Option>
      ))}
    </Select>
  );
}
