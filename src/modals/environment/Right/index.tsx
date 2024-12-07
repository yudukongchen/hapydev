import React, { useEffect } from 'react';
import { EnvironmentItem } from '#types/environment';
import { Button, Tooltip, message, theme } from 'antd';
import { RightPanelWrapper } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import EnvTitle from './envTitle';
import EnvServers from './envServers';
import EnvVars from './envVars';
import SvgEmphasize from '@assets/icons/emphasize.svg?react';
import produce from 'immer';
import { isEmpty } from 'lodash';

type Props = {
  value: EnvironmentItem;
  onSave: (newVal: EnvironmentItem) => void;
  onCancel: () => void;
};
const RightPanel: React.FC<Props> = (props) => {
  const { value, onSave, onCancel } = props;
  const { token } = theme.useToken();
  const [editValue, setEditValue] = useSafeState<EnvironmentItem>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleChange = (key, newVal) => {
    const result = produce(editValue, (draft) => {
      draft[key] = newVal;
    });
    setEditValue(result);
  };

  const handleSave = useMemoizedFn(() => {
    if (isEmpty(editValue?.name)) {
      message.error('环境名称不能为空');
      return;
    }

    onSave(editValue);
  });

  return (
    <RightPanelWrapper token={token}>
      <div className="case-title">环境名称:</div>
      <EnvTitle value={editValue} onChange={setEditValue} />
      <div className="scroll-panels beautify-scrollbar">
        <div className="case-title">
          服务(前置URL):
          <Tooltip title="注意: 正常情况不要添加多个'服务'。当且仅当同一'环境'下，多个接口使用不同的'前置URL'时，才需要添加多个服务。这种场景下，每个服务设置不同'前置URL'，不同接口或目录选择不同'服务'即可。">
            <span className="span-svg">
              <SvgEmphasize className="case-title-icon" />
            </span>
          </Tooltip>
        </div>
        <EnvServers value={editValue} onChange={setEditValue} />
        <div className="case-title">环境变量:</div>
        <EnvVars
          value={editValue?.variables ?? []}
          onChange={handleChange.bind(null, 'variables')}
        />
      </div>
      <div className="bottom-panel">
        <Button onClick={onCancel} type="default">
          关闭
        </Button>
        <Button onClick={handleSave} type="primary">
          保存
        </Button>
      </div>
    </RightPanelWrapper>
  );
};

export default RightPanel;
