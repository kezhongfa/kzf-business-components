import React, { useContext } from "react";
import Select, { ISelectProps } from "@shuyun-ep-team/kylin-ui/lib/select";
import { pureTimeTypeList } from "../../../../helpers/constant";
import { TCommonTimeSelectType } from "../../../../types";
import { translate } from "../../../../../../helpers/translate";
import { RootI18nContext } from "../../../../../../contexts";

interface IListItem {
  title: string;
  value: TCommonTimeSelectType;
}
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  list?: Array<IListItem>;
}

export default function TimeTypeSelect(props: IProps) {
  const { list = pureTimeTypeList } = props;
  const rootI18nContext = useContext(RootI18nContext);
  const { i18n } = rootI18nContext;
  return (
    <Select {...(props as ISelectProps)}>
      {list.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {translate(i18n, item.title)}
        </Select.Option>
      ))}
    </Select>
  );
}

TimeTypeSelect.defaultProps = {
  list: pureTimeTypeList,
};
