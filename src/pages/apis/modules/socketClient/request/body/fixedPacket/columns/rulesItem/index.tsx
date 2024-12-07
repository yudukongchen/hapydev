import React from 'react';
import { Popover, Button, theme } from 'antd';
import { rulesWrapper } from './style';
import ModifyRule from './modifyRule';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { FILL_TYPES, COMMON_CONTENT_TYPES } from './constants';
import { isNumber, isPlainObject } from 'lodash';
import SvgMore from '@assets/icons/more.svg?react';
import { FillRules, FixedPacketDataItem } from '#types/collection/socketClient';
import { DEFAULT_FILL_RULE } from '../../constant';

interface ItemKey {
  value: FillRules;
  rowData: FixedPacketDataItem;
  onChange: (newVal: FillRules) => void;
}

export const MessageRules: React.FC<ItemKey> = (props) => {
  const { value, rowData, onChange } = props;

  const [showTips, setShowTips] = useSafeState(false);

  const { token } = theme.useToken();

  const handleClose = useMemoizedFn(() => {
    setShowTips(false);
  });

  const handleChange = (newVal: FillRules) => {
    onChange(newVal);
    setTimeout(() => {
      setShowTips(false);
    }, 0);
  };

  return (
    <div className={rulesWrapper}>
      <div className="span-panel">
        {isPlainObject(value) && (
          <>
            <span>{isNumber(value?.length) ? `长度:${value?.length}` : 0}</span>,
            <span>{FILL_TYPES?.[value?.fill_type] ?? ''}</span>,
            <span>
              填充内容:
              {(value?.fill_content_type === 'common' && COMMON_CONTENT_TYPES?.[value?.common]) ??
                ''}
              {(value?.fill_content_type === 'custom' && value?.custom) ?? ''}
            </span>
          </>
        )}
      </div>
      <Popover
        open={showTips}
        onOpenChange={setShowTips}
        style={{ background: token.colorBgContainer }}
        placement="leftTop"
        trigger="click"
        content={
          <ModifyRule
            onChange={handleChange}
            formData={isPlainObject(rowData?.rules) ? rowData?.rules : { ...DEFAULT_FILL_RULE }}
            dataKey={rowData?.name}
            dataValue={rowData?.value}
            onCancel={handleClose}
          />
        }
      >
        <Button
          type="text"
          size="small"
          icon={<SvgMore style={{ width: 14, fill: 'currentcolor' }} />}
        />
      </Popover>
    </div>
  );
};

export default MessageRules;
