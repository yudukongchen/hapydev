import React, { useMemo } from 'react';
import { Tooltip, Select, Flex } from 'antd';
import { isObject, map } from 'lodash';
import { useSelector } from 'react-redux';
import { EnvironmentItem } from '#types/environment';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
  style: any;
};

const optionsContentDefaultStyle: React.CSSProperties = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

const ServerItems: React.FC<Props> = (props) => {
  const { value, onChange, style } = props;
  const serversData = useSelector((store: any) => store?.envs?.servers);
  const server_list = useSelector((store: any) => store?.envs?.server_list);
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);
  const currentEnv = useSelector<any, EnvironmentItem>(
    (store) => store?.envs?.env_datas?.[current_env_id]
  );

  const getServerName = (server_id) => {
    if (server_id === 'inherit') {
      return '继承父级';
    }
    return serversData?.[server_id] ?? '默认服务';
  };

  const getBaseUrl = (server_id) => {
    return currentEnv?.env_urls?.[server_id] ?? '';
  };

  const computedValue = useMemo(() => {
    if (value === 'inherit') {
      return 'inherit';
    }
    if (!isObject(serversData?.[value])) {
      return 'default';
    }
    return value;
  }, [serversData, value]);

  return (
    <Select value={computedValue} style={style} onChange={onChange} optionLabelProp="label">
      <Select.OptGroup label="默认服务">
        <Select.Option key="inherit" value="inherit" label="继承父级">
          <Flex justify="space-between">
            <span>继承父级</span>
            <span>跟随父级目录设置（推荐）</span>
          </Flex>
        </Select.Option>
      </Select.OptGroup>
      <Select.OptGroup label="手动指定">
        {map(server_list, (server_id) => (
          <Select.Option key={server_id} value={server_id} label={getServerName(server_id)}>
            <Flex justify="space-between">
              <Tooltip title={getServerName(server_id)}>
                <span
                  style={{
                    maxWidth: '50%',
                    ...optionsContentDefaultStyle,
                  }}
                >
                  {getServerName(server_id)}
                </span>
              </Tooltip>
              <Tooltip title={`${getBaseUrl(server_id)}（${currentEnv?.name}）`}>
                <span
                  style={{
                    maxWidth: '50%',
                    ...optionsContentDefaultStyle,
                  }}
                >
                  {getBaseUrl(server_id)}（{currentEnv?.name}）
                </span>
              </Tooltip>
            </Flex>
          </Select.Option>
        ))}
      </Select.OptGroup>
    </Select>
  );
};

export default ServerItems;
