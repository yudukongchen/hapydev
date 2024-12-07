import { theme } from 'antd';
import React from 'react';
import { FolderWrapper } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import Headers from './headers';
import Base from './base';
import Docs from './docs';
import produce from 'immer';
import { FolderCollection } from '#types/collection/folder';

type Props = {
  value: FolderCollection;
  onChange: (newVal: FolderCollection) => void;
  onSave: () => void;
};
const FolderPage: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;
  const { token } = theme.useToken();
  const [mode, setMode] = useSafeState('base');

  const handleChangeDoc = useMemoizedFn((newVal) => {
    const result = produce(value, (draft) => {
      draft.data.description = newVal;
    });
    onChange(result);
  });

  return (
    <FolderWrapper token={token}>
      <Headers value={mode} onChange={setMode} />
      {mode == 'base' && <Base value={value} onChange={onChange} onSave={onSave} />}
      {mode == 'docs' && <Docs value={value?.data?.description ?? ''} onChange={handleChangeDoc} />}
    </FolderWrapper>
  );
};

export default FolderPage;
