import { POST_SCRIPTS } from './constant';
import MonacoEditor from '@components/base/MonacoEditor';
import { ScriptBoxWraper } from './style';
import { useSafeState } from 'ahooks';
import { theme, Button } from 'antd';
import SvgAngleRight from '@assets/icons/angle-right.svg?react';
import SvgAngleLeft from '@assets/icons/angle-left.svg?react';

interface ScriptBoxProps {
  value: string;
  onChange: (val: string) => void;
}

const ScriptBox = (props: ScriptBoxProps) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();

  const [showHelp, setShowHelp] = useSafeState(true);

  const handleAppendScript = (text) => {
    if (value === '') {
      onChange(text);
    } else {
      onChange(`${value}\n${text}`);
    }
  };

  return (
    <ScriptBoxWraper token={token}>
      <div className="editor-panel">
        <MonacoEditor language="javascript" value={value} onChange={onChange}></MonacoEditor>
      </div>
      {showHelp ? (
        <div className="helper-panel beautify-scrollbar">
          <div className="panel-head">
            <span>代码片段</span>
            <Button
              type="text"
              size="small"
              icon={<SvgAngleRight />}
              onClick={() => {
                setShowHelp(false);
              }}
            ></Button>
          </div>
          {POST_SCRIPTS.map((item, index) => (
            <div
              className="script-item"
              onClick={() => {
                handleAppendScript(item.text);
              }}
              key={index}
            >
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="helper-bar-mini"
          onClick={() => {
            setShowHelp(true);
          }}
        >
          <SvgAngleLeft />
          <span>帮助</span>
        </div>
      )}
    </ScriptBoxWraper>
  );
};

export default ScriptBox;
