import { DEFAULT_DOCUMENT_DATA } from '@constants/apis/document';
import { DEFAULT_FOLDER_DATA } from '@constants/apis/folder';
import { DEFAULT_GRPC_DATA } from '@constants/apis/grpc';
import { DEFAULT_HTTP_DATA } from '@constants/apis/http';
import { DEFAULT_SOCKET_CLIENT_DATA } from '@constants/apis/socket-client';
import { DEFAULT_SOCKET_SERVICE_DATA } from '@constants/apis/socket-service';
import { DEFAULT_WEBSOCKET_DATA } from '@constants/apis/websocket';
import { DEFAULT_SOCKET_IO_DATA } from '@constants/apis/socket-io';
import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn } from 'ahooks';
import { isNull } from 'lodash';
import { useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import useModelsCreation from './models';
import { emitGlobal } from '@subjects/global';

const useCreation = () => {
  useModelsCreation();

  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const getDefaultApiData = (type) => {
    if (type === 'http') {
      return DEFAULT_HTTP_DATA;
    }
    if (type === 'document') {
      return DEFAULT_DOCUMENT_DATA;
    }
    if (type === 'websocket') {
      return DEFAULT_WEBSOCKET_DATA;
    }
    if (type === 'socket_io') {
      return DEFAULT_SOCKET_IO_DATA;
    }
    if (type === 'grpc') {
      return DEFAULT_GRPC_DATA;
    }
    if (type === 'socket_service') {
      return DEFAULT_SOCKET_SERVICE_DATA;
    }
    if (type === 'socket_client') {
      return DEFAULT_SOCKET_CLIENT_DATA;
    }
    if (type === 'folder') {
      return DEFAULT_FOLDER_DATA;
    }
    if (type === 'empty') {
      return {
        node_type: 'empty',
      };
    }
  };

  const handleCreateNewItem = useMemoizedFn((data) => {
    const { type, id = uuidV4(), parent_id = '0' } = data;
    const defaultData = getDefaultApiData(type);
    const itemData = {
      node_type: 'interface',
      ...defaultData,
      project_id: current_project_id,
      parent_id,
      id,
    };

    emitGlobal('APIS/OPENS/addOpensItem', itemData);
  });

  const handleCreateOpensItem = useMemoizedFn((apiData) => {
    if (isNull(apiData?.id)) {
      apiData.id = uuidV4();
    }

    const itemData = {
      node_type: 'interface',
      ...apiData,
      project_id: current_project_id,
    };
    emitGlobal('APIS/OPENS/addOpensItem', itemData);
  });

  useGlobalSubject('apis/createNewItem', handleCreateNewItem, []);
  useGlobalSubject('apis/createOpensItem', handleCreateOpensItem, []);
};

export default useCreation;
