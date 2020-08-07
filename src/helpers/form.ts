import { Form } from "@shuyun-ep-team/kylin-ui";

const { createFormField } = Form;

export function createMapPropValuesToFields(values: { [x: string]: any }) {
  return Object.keys(values).reduce(
    (res, field) => ({
      ...res,
      [field]: createFormField({
        value: values[field],
      }),
    }),
    {}
  );
}

export const commonFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

export const commonFormModalItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
