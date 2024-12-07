import React from 'react';
import { Button, Dropdown } from 'antd';
import SvgSetting from '@assets/icons/settings.svg?react';
import { headersWrapper } from './style';
import { RULE_TYPE_OPTIONS } from './constants';
import { useMemoizedFn } from 'ahooks';

const RuleHeader: React.FC<any> = (props) => {
  const { onChangeAll } = props;

  const handleChange = useMemoizedFn(({ key }) => {
    onChangeAll(key);
  });

  return (
    <div className={headersWrapper}>
      <span>分隔符</span>
      <Dropdown
        trigger={['click']}
        menu={{
          onClick: handleChange,
          items: RULE_TYPE_OPTIONS.map((item) => ({
            label: item.label,
            key: item.value,
          })),
        }}
      >
        <Button
          className="btn-settings-all"
          size="small"
          type="text"
          icon={<SvgSetting style={{ width: 12 }} />}
        >
          统一设置
        </Button>
      </Dropdown>
    </div>
  );
};

export default RuleHeader;
