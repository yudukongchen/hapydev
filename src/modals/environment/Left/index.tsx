import React, { useMemo } from 'react';
import cn from 'classnames';
import { LeftPanelWrapper } from './style';
import { Button, Dropdown, Modal, message, theme } from 'antd';
import SvgAdd from '@assets/icons/add.svg?react';
import SvgMore from '@assets/icons/more.svg?react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { EnvironmentItem } from '#types/environment';
import { isPlainObject } from 'lodash';
import ContextMenu from './context-menu';
import { emitGlobal } from '@subjects/global';
import { useSelector } from 'react-redux';
import { deleteEnvItem } from '@bll/projects/envs';

type Props = {
  env_datas: { [key: string]: EnvironmentItem };
  activeKey: string;
  onActiveChange: (newVal: string) => void;
  onCreateEmpty: () => void;
  onCopyItem: (env_id: string) => void;
};

const Left: React.FC<Props> = (props) => {
  const { env_datas, activeKey, onActiveChange, onCreateEmpty, onCopyItem } = props;
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);
  const { token } = theme.useToken();
  const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useSafeState(null);

  const envList = useMemo(() => {
    if (!isPlainObject(env_datas)) {
      return [];
    }
    const sortedList = Object.values(env_datas).sort((a, b) => a.sort - b.sort);
    return sortedList;
  }, [env_datas]);

  const handleDeleteItem = useMemoizedFn(async (id) => {
    setOpen(null);
    if (['local_mock', 'remote_mock'].includes(id)) {
      message.error('Mock环境不可删除');
      return;
    }
    const confirmed = await modal.confirm({
      title: '删除确认',
      content: '确定要删除吗？将不可恢复',
    });

    if (confirmed) {
      deleteEnvItem(current_project_id, id).subscribe({
        next(resp) {
          if (resp?.code !== 10000) {
            message.error(resp?.message);
            return;
          }
          if (id === current_env_id) {
            emitGlobal('ENVS/switchEnv', envList?.[0].env_id);
          }
          if (id === activeKey) {
            onActiveChange('local_mock');
          }
          emitGlobal('ENVS/loadEnvsList', { project_id: current_project_id });
        },
        error(err) {
          message.error(err?.message);
        },
      });
    }
  });

  const handleCopyItem = useMemoizedFn((id) => {
    onCopyItem(id);
    setOpen(null);
  });

  return (
    <LeftPanelWrapper token={token}>
      {contextHolder}
      <div className="big-title">环境管理</div>
      <div className="env-list beautify-scrollbar">
        {envList.map((item, index) => (
          <div
            onClick={onActiveChange.bind(null, item.env_id)}
            key={index}
            className={cn('env-item', item.env_id === activeKey ? 'active' : null)}
          >
            <div
              className="env-item-icon"
              style={{
                color: item.icon?.color,
                backgroundColor: 'var(--ant-color-fill-secondary)',
              }}
            >
              {item?.icon?.text}
            </div>
            <div className="env-item-text">{item?.name}</div>
            {!['local_mock', 'remote_mock'].includes(item?.env_id) && (
              <div className="env-item-btns">
                <Dropdown
                  open={item.env_id === open}
                  onOpenChange={(show) => {
                    if (show) {
                      setOpen(item?.env_id);
                    } else {
                      setOpen(null);
                    }
                  }}
                  dropdownRender={() => (
                    <ContextMenu
                      env_id={item?.env_id}
                      onCopy={handleCopyItem}
                      onDelete={handleDeleteItem}
                    />
                  )}
                >
                  <Button icon={<SvgMore />} size="small" type="text" />
                </Dropdown>
              </div>
            )}
          </div>
        ))}

        <div className="add-panel">
          <Button onClick={onCreateEmpty} icon={<SvgAdd />}>
            新建环境
          </Button>
        </div>
      </div>
    </LeftPanelWrapper>
  );
};
export default Left;
