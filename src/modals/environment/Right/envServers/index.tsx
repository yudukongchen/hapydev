import React, { useMemo } from 'react';
import { cloneDeep, isPlainObject, isString } from 'lodash';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { ServerListWrapper } from './style';
import AddServer from './addServer';
import ModifyServer from './modifyServer';
import ItemMenu from './itemMenu';
import { EnvironmentItem } from '#types/environment';
import Table from '@components/base/table';
import { Button, Input, message, theme } from 'antd';
import SvgAdd from '@assets/icons/add.svg?react';
import { removeServer } from '@reducers/envs';
import { deleteServers, saveServers } from '@bll/projects/servers';
import { emitGlobal } from '@subjects/global';

type Props = {
  value: EnvironmentItem;
  onChange: (newVal: EnvironmentItem) => void;
};

export const EnvServers: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const serversData = useSelector((store: any) => store?.envs?.servers);
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const dispatch = useDispatch();

  const { token } = theme.useToken();

  const [modalType, setModalType] = useSafeState<'add' | 'modify' | null>(null);
  const [serverId, setServerId] = useSafeState(null);

  const handleChangeEnvServer = useMemoizedFn((key, newUrl) => {
    if (['remote_mock', 'local_mock'].includes(value.env_id)) {
      return;
    }
    const newVal = cloneDeep(value);
    if (!isPlainObject(newVal.env_urls)) {
      newVal.env_urls = {
        default: '',
      };
    }
    newVal.env_urls[key] = newUrl;
    onChange(newVal);
  });

  const handleDeleteServer = useMemoizedFn((server_id: string) => {
    deleteServers(current_project_id, server_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('SERVERS/getdatalist', current_project_id);
      },
      complete() {
        setModalType(null);
      },
    });
  });

  const handleShowModify = useMemoizedFn((server_id: string) => {
    setServerId(server_id);
    setModalType('modify');
  });

  const columns = [
    {
      title: '服务名',
      dataIndex: 'id',
      width: 320,
      enableResize: true,
      render: (text: any, rowData: any, rowIndex: number) => (
        <div className="env-name-item">
          <div className="env-name">
            <span>{serversData?.[rowData] ?? ''}</span>
            {rowData === 'default' && <span className="icon-default">默认</span>}
          </div>
          <ItemMenu
            enableDel={rowData !== 'default'}
            onDelete={handleDeleteServer.bind(null, rowData)}
            onModify={handleShowModify.bind(null, rowData)}
          />
        </div>
      ),
    },
    {
      title: '前置URL',
      dataIndex: 'url',
      render: (text: any, rowData: any, rowIndex: number) => (
        <Input
          className="env-url-item"
          spellCheck={false}
          size="small"
          disabled={['remote_mock', 'local_mock'].includes(value?.env_id)}
          value={
            rowData === 'default' ? value?.env_urls?.default : (value?.env_urls?.[rowData] ?? '')
          }
          onChange={(e) => {
            handleChangeEnvServer(rowData, e.target.value);
          }}
        />
      ),
    },
  ];

  const dataList = useMemo(() => {
    if (!isPlainObject(serversData)) {
      return ['default'];
    }
    return Object.keys(serversData);
  }, [serversData]);

  const handleSaveServerItem = (name, edit_server_id?: string) => {
    let server_id = uuidV4();
    if (isString(edit_server_id)) {
      server_id = edit_server_id;
    }

    saveServers(current_project_id, {
      name,
      server_id,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('SERVERS/getdatalist', current_project_id);
      },
      complete() {
        setModalType(null);
      },
    });
  };

  return (
    <>
      {modalType === 'add' && (
        <AddServer
          onCancel={setModalType.bind(null, null)}
          value=""
          onSave={handleSaveServerItem}
        />
      )}

      {modalType === 'modify' && (
        <ModifyServer
          onCancel={setModalType.bind(null, null)}
          value={serversData?.[serverId] ?? ''}
          onSave={(name) => {
            handleSaveServerItem(name, serverId);
          }}
        />
      )}
      <ServerListWrapper token={token}>
        <Table showBorder columns={columns} data={dataList} rowKey="id" />
        <div className="btns-panel">
          <Button size="small" icon={<SvgAdd />} onClick={setModalType.bind(null, 'add')}>
            添加服务
          </Button>
        </div>
      </ServerListWrapper>
    </>
  );
};

export default EnvServers;
