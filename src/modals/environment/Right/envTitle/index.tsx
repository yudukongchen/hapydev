import { EnvironmentItem } from '#types/environment';
import React from 'react';
import { AUTH_TYPES } from '../constants';
import { Input, Select, Space } from 'antd';
import { css } from '@emotion/css';
import produce from 'immer';
import { useSafeState } from 'ahooks';
import ModifyIcon from './modifyIcon';
import { isNull } from 'lodash';
import useUserInfo from '@hooks/modules/useUserInfo';
import useProjectInfo from '@hooks/useProjectInfo';

type Props = {
  value: EnvironmentItem;
  onChange: (newVal: EnvironmentItem) => void;
};

const EnvTitle: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const userInfo = useUserInfo();
  const projectInfo = useProjectInfo();

  const [editIcon, setEditIcon] = useSafeState(null);

  const handleChange = (key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
    setEditIcon(null);
  };

  return (
    <>
      <ModifyIcon
        open={!isNull(editIcon)}
        defaultValue={editIcon}
        onSave={handleChange.bind(null, 'icon')}
        onCancel={setEditIcon.bind(null, null)}
      />
      <div className="env-title">
        <div
          className="env-title-icon"
          onClick={setEditIcon.bind(null, value?.icon)}
          style={{
            color: value?.icon?.color,
            backgroundColor: 'var(--ant-color-fill-secondary)',
          }}
        >
          {value?.icon?.text}
        </div>
        <Space.Compact className="env-title-right">
          <Input
            value={value?.name}
            spellCheck={false}
            onChange={(e) => {
              handleChange('name', e.target.value);
            }}
          />
          {projectInfo?.is_offline !== 1 && (
            <Select
              disabled={value?.creator_id !== userInfo?.user_id}
              popupClassName={css({
                width: '160px !important',
              })}
              placement="bottomRight"
              options={AUTH_TYPES}
              value={value?.auth_type}
              onChange={handleChange.bind(null, 'auth_type')}
            />
          )}
        </Space.Compact>
      </div>
    </>
  );
};

export default EnvTitle;
