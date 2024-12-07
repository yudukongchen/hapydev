import cn from 'classnames';
import SvgMarkdown from '@assets/icons/markdown2.svg?react';
import SvgWebSocket from '@assets/icons/websocket.svg?react';
import SvgGrpc from '@assets/icons/grpc.svg?react';
import SvgSocketService from '@assets/icons/socket-service.svg?react';
import SvgSocketIO from '@assets/icons/socket-io.svg?react';
import SvgFolder from '@assets/icons/folder.svg?react';
import { REQUEST_METHOD } from '@constants/request';
import { useMemo } from 'react';

const getClassName = (value) => {
  if (value?.data_type === 'http') {
    return {
      method: true,
      [value?.data?.request?.method]: true,
    };
  }
  if (value?.data_type === 'socket_client') {
    return {
      method: true,
      socket_client: true,
    };
  }
  return {
    'api-item-icon': true,
    [value?.data_type]: true,
  };
};

const renderInterface = (value) => {
  const renderNode = {
    http: REQUEST_METHOD?.[value?.data?.request?.method] ?? 'GET',
    socket_service: <SvgSocketService />,
    socket_client: 'SOCK',
    document: <SvgMarkdown />,
    websocket: <SvgWebSocket />,
    socket_io: <SvgSocketIO />,
    grpc: <SvgGrpc />,
    folder: <SvgFolder />,
  };

  return (
    <>
      <span className={cn(getClassName(value))}>{renderNode?.[value?.data_type]}</span>
      {value?.name}
    </>
  );
};

export default renderInterface;
