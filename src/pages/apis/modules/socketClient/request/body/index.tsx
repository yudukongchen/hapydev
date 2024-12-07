import React from 'react';
import { theme } from 'antd';
import { BodyWrapper } from './style';
import BodyModes from './bodyModes';
import { SocketBody } from '#types/collection/socketClient';
import ISOTable from './isoTable';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import MonacoEditor from '@components/base/MonacoEditor';
import FixedPacket from './fixedPacket';
import DelimiterPacket from './delimiterPacket';

type Props = {
  value: SocketBody;
  onChange: (newVal: SocketBody) => void;
};

const BodyPanel: React.FC<Props> = (props) => {
  const { token } = theme.useToken();

  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newData);
  });

  return (
    <BodyWrapper token={token}>
      <BodyModes value={value} onChange={onChange} />
      {value?.mode === 'iso8583' && (
        <ISOTable value={value?.iso8583} onChange={handleChange.bind(null, 'iso8583')} />
      )}
      {value?.mode === 'fixed_packet' && (
        <FixedPacket
          value={value?.fixed_packet}
          onChange={handleChange.bind(null, 'fixed_packet')}
        />
      )}
      {value?.mode === 'delimiter_packet' && (
        <DelimiterPacket
          value={value?.delimiter_packet}
          onChange={handleChange.bind(null, 'delimiter_packet')}
        />
      )}

      {value?.mode === 'raw' && (
        <div className="monaco-panel">
          <MonacoEditor
            language={value?.raw_type ?? 'text'}
            value={value?.raw}
            onChange={handleChange.bind(null, 'raw')}
          />
        </div>
      )}
    </BodyWrapper>
  );
};

export default BodyPanel;
