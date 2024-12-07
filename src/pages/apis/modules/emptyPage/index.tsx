import { Button, theme } from 'antd';
import { EmptyWrapper } from './style';
import SvgApi from '@assets/icons/api1.svg?react';
import SvgMarkdown from '@assets/icons/markdown.svg?react';
import SvgGrpc from '@assets/icons/grpc.svg?react';
import SvgWebsocket from '@assets/icons/websocket.svg?react';
import { emitGlobal } from '@subjects/global';

const EmptyPage = (props) => {
  const { value } = props;
  const { token } = theme.useToken();

  const handleCreateItem = (type) => {
    emitGlobal('apis/createNewItem', {
      type,
      id: value?.id,
    });
  };

  return (
    <EmptyWrapper token={token}>
      <div className="box-panel">
        <div>
          <div className="box-item api" onClick={handleCreateItem.bind(null, 'http')}>
            <div className="svg">
              <SvgApi />
            </div>
            <div className="text">新建接口</div>
          </div>
          <div className="box-item markdown" onClick={handleCreateItem.bind(null, 'document')}>
            <div className="svg">
              <SvgMarkdown />
            </div>
            <div className="text">新建 Markdown</div>
          </div>
        </div>
        <div>
          <div className="box-item websocket" onClick={handleCreateItem.bind(null, 'websocket')}>
            <div className="svg">
              <SvgWebsocket />
            </div>
            <div className="text">新建 WebSocket</div>
          </div>
          <div className="box-item grpc" onClick={handleCreateItem.bind(null, 'grpc')}>
            <div className="svg">
              <SvgGrpc />
            </div>
            <div className="text">新建 gRpc</div>
          </div>
        </div>
      </div>

      <div className="more-actions">
        <Button type="primary">快速导入项目</Button>
      </div>
    </EmptyWrapper>
  );
};

export default EmptyPage;
