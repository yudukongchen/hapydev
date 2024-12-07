import { Button, Input, theme } from 'antd';
import { DocumentWrapper } from './style';
import React from 'react';
import produce from 'immer';
import MDEditor from '@components/bus/MarkdownEditor';
import { DocumentCollection } from '#types/collection/document';

type Props = {
  value: DocumentCollection;
  onChange: (newVal: DocumentCollection) => void;
  onSave: () => void;
};

const Document: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;
  const { token } = theme.useToken();

  const handleChangeDescription = (newVal) => {
    const result = produce(value, (draft) => {
      draft.data.description = newVal;
    });
    onChange(result);
  };

  const handleChangeName = (newVal) => {
    const result = produce(value, (draft) => {
      draft.name = newVal;
    });
    onChange(result);
  };

  return (
    <DocumentWrapper token={token}>
      <div className="doc-header">
        <div className="head-left">
          <Input
            value={value.name}
            spellCheck={false}
            onChange={(e) => {
              handleChangeName(e.target.value);
            }}
          />
        </div>
        <div className="head-right">
          <Button onClick={onSave}>保存</Button>
        </div>
      </div>
      <div className="doc-container">
        <MDEditor value={value.data.description} onChange={handleChangeDescription} />
      </div>
    </DocumentWrapper>
  );
};

export default Document;
