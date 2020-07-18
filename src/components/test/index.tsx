import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * A label to show on the button
   */
  label: string;
}

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Test } from 'kzf-business-components'
 * ~~~
 */
export const Test = ({ label = "Hello", ...props }: ButtonProps) => (
  <button type="button" {...props}>
    {label}
  </button>
);

export default Test;
