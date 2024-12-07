import { Alert, Input, Segmented } from 'antd';
import React from 'react';
import { MultiEditWrapper } from './style';
import { CONVERT_MODES } from './constants';

type EditMode = 'colon' | 'comma'; //colon.冒号 comma.逗号

type Props = {
  value: string;
  onChange: (newVal: string) => void;
  mode: EditMode;
  onModeChange: (newMode: EditMode) => void;
};
const MultiParams: React.FC<Props> = (props) => {
  const { value, onChange, mode, onModeChange } = props;
  return (
    <MultiEditWrapper>
      <div className="form-header">
        <Segmented options={CONVERT_MODES} value={mode} onChange={onModeChange} />
      </div>
      <Input.TextArea
        className="textarea beautify-scrollbar"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        spellCheck={false}
      />
      <Alert
        banner
        showIcon={false}
        type="info"
        className="footer-text"
        message={
          mode === 'comma' ? (
            <>数据格式遵循 《标准 CSV 规范》字段之间以英文逗号( , )分隔，多条记录以换行分隔</>
          ) : (
            <>字段之间以英文冒号( : )分隔，多条记录以换行分隔</>
          )
        }
      />
    </MultiEditWrapper>
  );
};

export default MultiParams;
