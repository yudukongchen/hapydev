import { Checkbox, theme } from 'antd';
import { EnvsWrapper } from './style';
import React, { useMemo } from 'react';
import { EnvironmentItem } from '#types/environment';
import produce from 'immer';
import { useMemoizedFn } from 'ahooks';
import { isString } from 'lodash';

type Props = {
  envList: EnvironmentItem[];
  envKeys: string[];
  onEnvKeysChange: (newKeys: string[]) => void;
};

const Envs: React.FC<Props> = (props) => {
  const { envList, envKeys, onEnvKeysChange } = props;
  const { token } = theme.useToken();

  const envCheckeds = useMemo(() => {
    const result = {};
    envKeys?.forEach((key) => {
      result[key] = true;
    });

    return result;
  }, [envKeys]);

  const handleChange = useMemoizedFn((key, checked) => {
    const result = produce(envCheckeds, (draft) => {
      if (checked) {
        draft[key] = true;
      } else {
        delete draft[key];
      }
    });
    onEnvKeysChange(Object.keys(result));
  });

  const handleCheckedAll = useMemoizedFn((checked) => {
    if (checked === true) {
      onEnvKeysChange(envList?.map((item) => item.env_id));
      return;
    }
    onEnvKeysChange([]);
  });

  return (
    <EnvsWrapper token={token}>
      <div className="header">
        <div className="env-item ">
          <div className="item-ckb">
            <Checkbox
              checked={envKeys?.length === envList?.length && envList.length > 0}
              onChange={(e) => {
                handleCheckedAll(e.target.checked);
              }}
            />
          </div>
          <div className="item-name">环境名称</div>
          <div className="item-url">前置URL</div>
        </div>
      </div>
      <div className="env-list">
        {envList.map((item, index) => (
          <div className="env-item" key={index}>
            <div className="item-ckb">
              <Checkbox
                checked={envCheckeds?.[item?.env_id] === true}
                onChange={(e) => {
                  handleChange(item?.env_id, e.target.checked);
                }}
              />
            </div>
            <div className="item-name">{item?.name}</div>
            <div className="item-url">
              {isString(item?.env_urls?.default) && item?.env_urls?.default !== '' && (
                <>{item?.env_urls?.default}</>
              )}
            </div>
          </div>
        ))}
      </div>
    </EnvsWrapper>
  );
};

export default Envs;
