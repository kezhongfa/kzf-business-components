import React, { useContext } from "react";
import Select, { ISelectProps } from "@shuyun-ep-team/kylin-ui/lib/select";
import { commonTimeTypeList } from "../../../../helpers/constant";
import { TCommonTimeSelectType } from "../../../../types";
import { translate } from "../../../../../../helpers/translate";
import { RootI18nContext } from "../../../../../../contexts";

interface IProps {
  style?: React.CSSProperties;
  value?: TCommonTimeSelectType;
  onChange?: (v: TCommonTimeSelectType) => void;
}

export default function CommonTimeSelect(props: IProps) {
  const rootI18nContext = useContext(RootI18nContext);
  const { i18n } = rootI18nContext;
  return (
    <Select {...(props as ISelectProps)}>
      {commonTimeTypeList.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {translate(i18n, item.title)}
        </Select.Option>
      ))}
    </Select>
  );
}
