import MonacoEditor from '@components/base/MonacoEditor';
import React from 'react';
import { RawPanelWrapper } from './style';
import { Button, Tooltip, message, theme } from 'antd';
import SvgFormat from '@assets/icons/format.svg?react';
import { formatCode } from '@utils/formatCode';
import SvgFlashAuto from '@assets/icons/flash-auto.svg?react';
import { useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import { emitGlobal } from '@subjects/global';

type Props = {
  api_id: string;
  value: string;
  onChange: (newVal: string) => void;
  onMockRequest: () => void;
};

const RawPanel: React.FC<Props> = (props) => {
  const { api_id, value, onChange, onMockRequest } = props;

  const tempData = useSelector((store: any) => store?.tempDatas?.api?.[api_id]);
  const { token } = theme.useToken();

  const handleFormatCode = async () => {
    try {
      const result = await formatCode(value, 'json');
      onChange(result);
    } catch (ex) {
      message.error(ex.toString());
    }
  };

  const handleEndStream = useMemoizedFn(() => {
    emitGlobal('PROXYS/GRPC/endStream', api_id);
  });

  const handleSendMessage = useMemoizedFn(() => {
    emitGlobal('PROXYS/GRPC/sendMessage', {
      api_id,
      message: value,
    });
  });

  return (
    <RawPanelWrapper token={token}>
      <div className="editor-panel">
        <MonacoEditor value={value} language="json" onChange={onChange} />
      </div>
      <div className="tools-panel">
        <div className="left">
          <Tooltip title="美化">
            <Button
              onClick={handleFormatCode}
              size="small"
              icon={<SvgFormat style={{ width: 16, height: 16 }} />}
              type="text"
            />
          </Tooltip>
          <Button onClick={onMockRequest} type="text" size="small" icon={<SvgFlashAuto />}>
            使用示例数据
          </Button>
        </div>
        {tempData?.status === 'streaming' && (
          <div className="right">
            <Button onClick={handleEndStream} size="small">
              结束串流
            </Button>
            <Button onClick={handleSendMessage} type="primary" size="small">
              发送
            </Button>
          </div>
        )}
      </div>
    </RawPanelWrapper>
  );
};
export default RawPanel;
