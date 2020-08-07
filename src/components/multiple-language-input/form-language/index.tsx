import React, { forwardRef, useImperativeHandle, useContext, useMemo } from "react";
import { Form, Input } from "@shuyun-ep-team/kylin-ui";
import { FormComponentProps } from "@shuyun-ep-team/kylin-ui/es/form";
import { commonFormModalItemLayout } from "../../../helpers/form";
import { ILanguages } from "../multiple-language-input";
import { TValidationRule } from "../../../types/form";
import { RootI18nContext } from "../../../contexts";
import { translate } from "../../../helpers/translate";

interface IProps extends FormComponentProps {
  defaultLanguage: string;
  allLanguages: ILanguages;
  validator?: TValidationRule;
}

const FormLanguage = (props: IProps, ref: any) => {
  const { form, allLanguages, defaultLanguage, validator } = props;
  const { getFieldDecorator } = form;
  const rootI18nContext = useContext(RootI18nContext);
  const { i18n } = rootI18nContext;

  useImperativeHandle(ref, () => ({
    form,
  }));

  const ruleDefault = useMemo(
    () => ({
      required: true,
      message: translate(i18n, "MultipleLanguageInput.Form.Validate.Common.NoEmpty"),
    }),
    [i18n]
  );

  const getFormItems = () => {
    const items: Array<any> = [];
    Object.keys(allLanguages).forEach((key) => {
      const { label, value, validator: _validator } = allLanguages[key];
      const rules: Array<TValidationRule> = key === defaultLanguage ? [ruleDefault] : [];
      if (_validator) {
        rules.push(_validator);
      } else if (validator) {
        rules.push(validator);
      }
      const item = (
        <Form.Item key={key} label={label}>
          {getFieldDecorator(key, {
            initialValue: value,
            rules,
          })(<Input />)}
        </Form.Item>
      );
      if (key === defaultLanguage) {
        items.unshift(item);
      } else {
        items.push(item);
      }
    });
    return items;
  };
  return <Form {...commonFormModalItemLayout}>{getFormItems()}</Form>;
};

export default Form.create<IProps>({
  name: "form-language",
})(forwardRef(FormLanguage));
