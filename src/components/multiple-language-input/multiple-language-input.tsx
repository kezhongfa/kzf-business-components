import React, { Ref, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { createUseStyles } from "react-jss";
import { Icon, Menu, Dropdown } from "@shuyun-ep-team/kylin-ui";
import update from "immutability-helper";
import Input, { InputProps } from "@shuyun-ep-team/kylin-ui/es/input";
import { TextAreaProps } from "antd/es/input/TextArea";
import { isObject } from "@shuyun-ep-team/utils/es/type";
import CustomModal from "../../common-components/modal";
import FormLanguage from "./form-language";
import { TLanguage } from "../../types/language";
import { languageDefault } from "../../constants/language";
import { translate } from "../../helpers/translate";
import { getCurLanguage } from "./i18n";
import { TValidationRule } from "../../types/form";
import { RootI18nContext } from "../../contexts";
import * as styles from "./index.jss";

const { TextArea } = Input;
const useStyles = createUseStyles(styles);

export interface ILanguagesItem {
  label: string;
  value?: string;
  validator?: TValidationRule;
}
export interface ILanguages {
  [key: string]: ILanguagesItem;
}

export type TComponentType = "singleLine" | "multiLine";

export type TProps = TextAreaProps & InputProps;
export interface IProps extends TProps {
  /**使用语言 */
  language?: TLanguage;
  /**组件类型 */
  componentType?: TComponentType;
  /** 默认语言 */
  defaultLanguage?: string;
  /** 外部验证函数 */
  validator?: TValidationRule;
  /** 所有语言列表 */
  allLanguages?: ILanguages;
  /* 录入结果 */
  onOk?: (allLanguages: ILanguages, values: Record<string, string>) => void;
  /** 内部使用 */
  forwardRef?: Ref<any>;
}

const allLanguagesDefault: ILanguages = {
  "zh-CN": {
    label: "中文",
    value: "",
  },
};

export const MultipleLanguageInput = (props: IProps) => {
  const {
    forwardRef,
    componentType = "singleLine",
    language = languageDefault,
    defaultLanguage = languageDefault,
    allLanguages = allLanguagesDefault,
    validator,
    onOk,
    disabled,
    style = {},
    ...restProps
  } = props;
  const styles = useStyles();
  const formRef = useRef<any>();
  const [i18n, setI18n] = useState({});
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    getCurLanguage(language).then((res) => {
      setI18n(res);
      setModalTitle(translate(res, "MultipleLanguageInput.ModalTitle"));
    });
  }, [language]);

  const _allLanguages = useMemo(() => {
    if (isObject(allLanguages) && Object.keys(allLanguages).length > 0) {
      return allLanguages;
    }
    return allLanguagesDefault;
  }, [allLanguages]);

  const languageMenu = useMemo(() => {
    return disabled ? (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <></>
    ) : (
      <Menu>
        {Object.keys(_allLanguages).map((key: string) => {
          const { label, value } = _allLanguages[key];
          const languageIcon = (
            <div
              className={value ? styles.languageMenuItemIconActive : styles.languageMenuItemIcon}
            />
          );
          return (
            <Menu.Item key={key} className={styles.languageMenuItem} title={label}>
              <div className={styles.languageMenuItemLabel}>{label}</div>
              {languageIcon}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }, [isMenuVisible, _allLanguages, disabled]);

  const onModalOk = useCallback(() => {
    formRef.current.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        const valuesKeys = Object.keys(values);
        let allLanguages = _allLanguages;
        Object.keys(_allLanguages).forEach((key) => {
          if (values[key] !== undefined && valuesKeys.includes(key)) {
            allLanguages = update(allLanguages, { [key]: { value: { $set: values[key] } } });
          }
        });
        setModalVisible(false);
        onOk && onOk(allLanguages, values);
      }
    });
  }, [onOk, _allLanguages]);

  const onModalCancel = useCallback(() => {
    setModalVisible(false);
  }, []);

  const suffixIcon = useMemo(
    () => (
      <Dropdown overlay={languageMenu}>
        <span
          onMouseEnter={() => {
            setMenuVisible(true);
          }}
          onMouseLeave={() => {
            setMenuVisible(false);
          }}
          onClick={() => setModalVisible(true)}
        >
          <Icon type="global" className={styles.languageIconGlobal} />
        </span>
      </Dropdown>
    ),
    []
  );

  const getMultipleInput = () => {
    if (componentType === "singleLine") {
      return <Input suffix={suffixIcon} disabled={disabled} style={{ ...style }} {...restProps} />;
    } else if (componentType === "multiLine") {
      return (
        <div className={styles.multipleInput}>
          <TextArea disabled={disabled} {...restProps} style={{ ...style, paddingRight: 30 }} />
          <span style={{ position: "absolute", right: 11, top: 8 }}>{suffixIcon}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <span ref={forwardRef}>{getMultipleInput()}</span>
      <CustomModal
        title={modalTitle}
        visible={modalVisible}
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <RootI18nContext.Provider value={{ i18n }}>
          <FormLanguage
            wrappedComponentRef={formRef}
            defaultLanguage={defaultLanguage}
            allLanguages={_allLanguages}
            validator={validator}
          />
        </RootI18nContext.Provider>
      </CustomModal>
    </>
  );
};

MultipleLanguageInput.defaultProps = {
  language: languageDefault,
  defaultLanguage: languageDefault,
};

export default MultipleLanguageInput;
