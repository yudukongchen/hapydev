import React from 'react';
import BodyModes from './BodyModes';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import None from './None';
import DataTable from '../DataTable';
import RawModes from './RawModes';
import BinaryMode from './BinaryMode';
import { bodyWrapper } from './style';
import { ApiRequest } from '#types/collection/api';
import { Get } from '#types/libs';

type Props = {
  value: Get<ApiRequest, 'body'>;
  onChange: (newVal: any) => void;
};

const Body: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });

    onChange(result);
  });

  const isRawMode = ['plain', 'javascript', 'json', 'html', 'xml'].includes(value?.mode);

  //console.log(value?.mode, '==value?.mode=====');

  return (
    <div className={bodyWrapper}>
      <BodyModes isRawMode={isRawMode} renderMode="radio" value={value} onChange={onChange} />
      {value?.mode === 'none' && <None />}
      {(value?.mode === 'form-data' || value?.mode === 'urlencoded') && (
        <DataTable
          value={value?.parameter as any}
          onChange={handleChange.bind(null, 'parameter')}
        />
      )}
      {isRawMode && <RawModes value={value} onChange={onChange} />}
      {value.mode === 'binary' && (
        <BinaryMode value={value?.binary} onChange={handleChange.bind(null, 'binary')} />
      )}
    </div>
  );
};

export default React.memo(Body);
