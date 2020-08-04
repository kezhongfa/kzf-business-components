import React, { FC, useContext } from "react";
import { createUseStyles } from "react-jss";
import { Button } from "@shuyun-ep-team/kylin-ui";
import { translate } from "../../../../../../helpers/translate";
import * as i18nMap from "../../../../i18n.map";
import { RootI18nContext } from "../../../../../../contexts";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

interface IProps {
  disabled?: boolean;
  onOk?: () => void;
}

const OperateBtn: FC<IProps> = (props) => {
  const { onOk, disabled } = props;
  const styles = useStyles();
  const rootI18nContext = useContext(RootI18nContext);
  const { i18n } = rootI18nContext;

  return (
    <div className={styles.operatorWrapper}>
      <div className={styles.btnWrapper}>
        <Button type="primary" disabled={disabled} onClick={onOk}>
          {translate(i18n, i18nMap.i18n.SURE)}
        </Button>
      </div>
    </div>
  );
};

export default OperateBtn;
