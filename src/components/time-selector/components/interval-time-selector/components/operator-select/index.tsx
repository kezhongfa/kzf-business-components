import React from "react";
import Select, { ISelectProps } from "@shuyun-ep-team/kylin-ui/lib/select";
import { timeOperator } from "../../../../helpers/constant";
import { TOperator } from "../../../../types";

interface IProps {
  value?: TOperator;
  style?: React.CSSProperties;
  onChange?: (v: TOperator) => void;
}

export default function OperatorSelect(props: IProps) {
  return (
    <Select {...(props as ISelectProps)}>
      {timeOperator.pureTimePoint.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {item.title}
        </Select.Option>
      ))}
    </Select>
  );
}
