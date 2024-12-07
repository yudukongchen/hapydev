import React from 'react';
import { Button, Popover } from 'antd';
import SvgSetting from '@assets/icons/settings.svg?react';
import { headersWrapper } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import ModifyRule from './modifyRule';
import { DEFAULT_FILL_RULE } from '../../constant';

const RuleHeader: React.FC<any> = (props) => {
  const { onChangeAll } = props;
  const [showTips, setShowTips] = useSafeState(false);

  const handleClose = () => {
    setShowTips(false);
  };

  const handleChange = useMemoizedFn((newVal) => {
    onChangeAll(newVal);
    setTimeout(() => {
      setShowTips(false);
    }, 0);
  });

  return (
    <div className={headersWrapper}>
      <span>报文定长规则</span>
      <Popover
        open={showTips}
        onOpenChange={setShowTips}
        placement="leftTop"
        trigger="click"
        content={
          <ModifyRule onChange={handleChange} formData={DEFAULT_FILL_RULE} onCancel={handleClose} />
        }
      >
        <Button
          className="btn-settings-all"
          size="small"
          type="text"
          icon={<SvgSetting style={{ width: 12 }} />}
        >
          统一设置
        </Button>
      </Popover>
    </div>
  );
};

export default RuleHeader;
