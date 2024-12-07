import { Input, theme, Select, Switch, Radio } from 'antd';
import { EditFormWrapper } from './style';
import { QuickShare } from '#types/share';
import React, { useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import ApiSelect from './api-select';
import { AUTH_TYPE_OPTIONS, SHARE_TYPE_OPTIONS } from './constants';
import Password from './password';
import ExpireTime from './expire-time';
import useEnvs from '@hooks/modules/useEnvs';

type Props = {
  value: QuickShare;
  onChange: (newVal: QuickShare) => void;
};
const EditForm: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();
  const { envList } = useEnvs();
  const computedEnvOptions = useMemo(() => {
    return envList.map((item) => ({ label: item?.name, value: item?.env_id }));
  }, [envList]);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  const handleChangeConfig = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft.config[key] = newVal;
    });
    onChange(result);
  });

  return (
    <EditFormWrapper token={token}>
      <div className="base-panel">
        <div className="form-item">
          <div className="item-name">标题</div>
          <Input
            className="item-value"
            spellCheck={false}
            value={value?.name}
            onChange={(e) => {
              handleChange('name', e.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <div className="item-name">运行环境</div>
          <Select
            className="item-value"
            options={computedEnvOptions}
            mode="multiple"
            value={value?.config?.env_ids}
            onChange={handleChangeConfig.bind(null, 'env_ids')}
          />
        </div>
        <div className="form-item">
          <div className="item-name">允许导出数据</div>
          <div className="item-value">
            <Switch
              size="small"
              checked={value?.config?.enable_export === 1}
              onChange={(ckd) => {
                handleChangeConfig('enable_export', ckd ? 1 : -1);
              }}
            />
          </div>
        </div>
      </div>
      <div className="config-panel">
        <div className="form-item">
          <div className="item-name">分享接口范围</div>
          <div className="item-value right">
            <Radio.Group
              options={SHARE_TYPE_OPTIONS}
              value={value?.config?.share_type}
              onChange={(e) => {
                handleChangeConfig('share_type', e.target.value);
              }}
            />
          </div>
        </div>
        {value?.config?.share_type === 'IDS' && (
          <ApiSelect
            value={value.config.share_ids}
            onChange={handleChangeConfig.bind(null, 'share_ids')}
          />
        )}

        <div className="form-item">
          <div className="item-name">访问限制</div>
          <div className="item-value right">
            <Radio.Group
              options={AUTH_TYPE_OPTIONS}
              value={value?.auth_type}
              onChange={(e) => {
                handleChange('auth_type', e.target.value);
              }}
            />
          </div>
        </div>
        {value.auth_type === 2 && (
          <Password
            value={value?.config?.password}
            onChange={handleChangeConfig.bind(null, 'password')}
          />
        )}
        <ExpireTime value={value?.expire_time} onChange={handleChange.bind(null, 'expire_time')} />
      </div>
    </EditFormWrapper>
  );
};

export default EditForm;
