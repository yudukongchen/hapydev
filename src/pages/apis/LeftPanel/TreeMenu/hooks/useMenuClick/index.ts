import { emitGlobal } from '@subjects/global';
import { handleCopyCurl, handleCreateItem } from './utils';
import { useSelector } from 'react-redux';
import { RequestOptions } from '@utils/tools/hapydev-request/types';
import useCookies from '@hooks/modules/useCookies';
import { useMemoizedFn } from 'ahooks';
import { getParentApiFolders } from '@utils/collections';
import useVariables from '@hooks/useVariables';
import { DEFAULT_MODEL_FOLDER } from '@constants/models/folder';
import { cloneDeep } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

const useMenuClick = () => {
  const apiDatas = useSelector((store: any) => store?.apis?.datas?.base_datas);
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);
  const current_environment = useSelector((store: any) => store?.envs?.env_datas?.[current_env_id]);
  const cookiesList = useCookies();
  const variables = useVariables();

  const handleModelClick = useMemoizedFn((item, key) => {
    if (key === 'CREATE_MODEL') {
      emitGlobal('models/createNewItem', {
        type: key,
        parent_id: item?.id,
      });
      return;
    }
    if (key === 'CREATE_FOLDER') {
      const modelData = cloneDeep(DEFAULT_MODEL_FOLDER);
      modelData.parent_id = item?.id;
      modelData.id = uuidV4();
      emitGlobal('ApisMenu/updateModal', {
        modal: 'modelFolder',
        value: modelData,
      });
      return;
    }
    if (key === 'IMPORT_JSON_SCHEMA') {
      emitGlobal('ApisMenu/updateModal', {
        modal: 'importSchema',
        value: item?.id,
      });
      return;
    }
    if (key === 'RENAME') {
      emitGlobal('ApisMenu/updateModal', {
        modal: 'rename-model',
        value: item,
      });
      return;
    }
    if (key === 'MOVE') {
      emitGlobal('ApisMenu/updateModal', {
        modal: 'move-model',
        value: item,
      });
      return;
    }
    if (key === 'COPY') {
      const newItem = { ...item, sort: -1, id: uuidV4(), name: item.name + ' Copy' };
      emitGlobal('MODELS/saveModel', {
        data: newItem,
        callback: (data) => {
          emitGlobal('APIS/OPENS/addOpensItem', {
            ...newItem,
            node_type: 'model',
          });
        },
      });
      return;
    }
    if (key === 'DELETE') {
      emitGlobal('MODELS/deleteModel', item);
      return;
    }

    debugger;

    console.log(111);
  });

  const handleMenuClick = useMemoizedFn((node_type, item, e) => {
    if (e?.domEvent) {
      e?.domEvent?.stopPropagation();
      e?.domEvent?.preventDefault();
    }

    const key = e?.key;

    if (node_type === 'model') {
      handleModelClick(item, key);
      return;
    }

    if (key === 'ADD_SOCKET_CLIENT') {
      handleCreateItem('socket_client', item);
      return;
    }
    if (key === 'CREATE_HTTP') {
      handleCreateItem('http', item);
      return;
    }
    if (key === 'CREATE_DOCUMENT') {
      handleCreateItem('document', item);
      return;
    }
    if (key === 'CREATE_FOLDER') {
      handleCreateItem('folder', item);
      return;
    }
    if (key === 'CREATE_WEBSOCKET') {
      handleCreateItem('websocket', item);
      return;
    }
    if (key === 'CREATE_GRPC') {
      handleCreateItem('grpc', item);
      return;
    }
    if (key === 'CREATE_SOCKET_SERVICE') {
      handleCreateItem('socket_service', item);
      return;
    }
    if (key === 'CREATE_SOCKET_IO') {
      handleCreateItem('socket_io', item);
      return;
    }
    if (key === 'RENAME') {
      emitGlobal('ApisMenu/updateModal', {
        modal: 'rename',
        value: item,
      });
      return;
    }
    if (key === 'COPY') {
      emitGlobal('ApisTree/Copy', item);
      return;
    }
    if (key === 'MOVE') {
      emitGlobal('ApisMenu/updateModal', {
        modal: 'moveTo',
        value: item,
      });
      return;
    }
    if (key === 'DELETE') {
      emitGlobal('APIS/deleteApi', item);
      return;
    }
    if (key === 'SHARE') {
      const shareData =
        item?.data_type === 'folder' ? { id: item?.id, is_all: 1 } : { id: item?.id };
      emitGlobal('APIS/showShareModal', shareData);
      return;
    }
    if (key === 'COPY_CURL') {
      const options: RequestOptions = {
        cookies: cookiesList,
        collections: getParentApiFolders(item.parent_id, apiDatas),
        servers: current_environment?.env_urls,
        variables,
      };

      handleCopyCurl(item, options);
      return;
    }
  });

  return handleMenuClick;
};
export default useMenuClick;
