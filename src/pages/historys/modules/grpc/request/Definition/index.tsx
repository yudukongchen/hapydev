import { Button, Segmented, theme } from 'antd';
import { DefinitionWrapper } from './style';
import { DEFINITION_OPTIONS } from './constants';
import { useMemoizedFn } from 'ahooks';
import SvgCloudLink from '@assets/icons/cloud-link.svg?react';
import Imports from './imports';
import MonacoEditor from '@components/base/MonacoEditor';
import { ServiceDefinition } from '#types/collection/grpc';
import React from 'react';
import produce from 'immer';

type Props = {
  value: ServiceDefinition;
  onChange: (newVal: ServiceDefinition) => void;
};

const Definition: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();

  const handleChangeDefinition = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  const handleChangeReflect = (newVal) => {
    handleChangeDefinition('is_server_reflection', newVal === 'reflect' ? 1 : -1);
  };

  const is_server_reflection = value?.is_server_reflection === 1;

  const computedProtoCode = is_server_reflection
    ? value?.reflection_proto?.code
    : value?.local_proto?.code;

  return (
    <DefinitionWrapper token={token}>
      <div className="left-panel">
        <div className="type-panel">
          <div>服务类型</div>
          <Segmented
            value={is_server_reflection ? 'reflect' : 'imports'}
            onChange={handleChangeReflect}
            size="small"
            className="view-modes"
            options={DEFINITION_OPTIONS}
          />
        </div>
        {is_server_reflection ? (
          <>
            <div className="desc-panel">当前正使用服务反射proto</div>
            <div className="btns-panel">
              <Button
                icon={<SvgCloudLink style={{ width: 16, height: 16 }} />}
                size="small"
                type="link"
                // loading
              >
                更新服务反射
              </Button>
            </div>
          </>
        ) : (
          <Imports />
        )}
      </div>
      <div className="right-panel">
        <MonacoEditor value={computedProtoCode} readOnly language="go" />
      </div>
    </DefinitionWrapper>
  );
};

export default Definition;
