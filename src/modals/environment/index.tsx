import { useMemoizedFn, useSafeState } from 'ahooks';
import { Panel, PanelGroup } from 'react-resizable-panels';
import ResizeBar from '@components/bus/ResizeBar';
import { message, Spin, theme } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import { EnvironmentWrapper } from './style';
import Left from './Left';
import Right from './Right';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { EnvironmentItem } from '#types/environment';
import { cloneDeep, isNumber, isObject, isUndefined, omit } from 'lodash';
import { saveEnvs } from '@bll/projects/envs';
import { getUserID } from '@utils/uid';
import { emitGlobal } from '@subjects/global';
import { DEFAULT_ENV_ITEM } from '@constants/enviroments';

type Props = {
  env_id: string;
  onCancel: () => void;
};

const Settings: React.FC<Props> = (props) => {
  const { env_id, onCancel } = props;
  const env_datas = useSelector<any, { [key: string]: EnvironmentItem }>(
    (store) => store?.envs?.env_datas
  );
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const { token } = theme.useToken();
  const [editValue, setEditValue] = useSafeState<EnvironmentItem>(null);

  const [loading, setLoading] = useSafeState(false);

  const handleActiveChange = useMemoizedFn((env_id) => {
    if (isUndefined(env_datas?.[env_id])) {
      return;
    }
    setEditValue(env_datas?.[env_id]);
  });

  useEffect(() => {
    handleActiveChange(env_id);
  }, [env_id]);

  const handleSaveEnv = useMemoizedFn((newVal: EnvironmentItem) => {
    let maxId = 0;
    Object.values(env_datas).forEach((item) => {
      if (isNumber(item?.sort) && item?.sort > maxId) {
        maxId = item.sort;
      }
    });
    setLoading(true);
    saveEnvs(current_project_id, {
      ...newVal,
      sort: newVal.sort === -1 ? maxId + 1 : newVal.sort,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('保存成功');
        emitGlobal('ENVS/loadEnvsList', { project_id: current_project_id });
      },
      error(err) {
        setLoading(false);
        message.error(err?.message);
      },
      complete() {
        setLoading(false);
      },
    });
  });

  const handleCreateEmpty = () => {
    const newItem = cloneDeep(DEFAULT_ENV_ITEM);
    newItem.env_id = uuidV4();
    newItem.creator_id = getUserID();
    setEditValue(newItem);
  };

  const handleCopyItem = useMemoizedFn((env_id) => {
    const sourceItem = env_datas?.[env_id];
    if (!isObject(sourceItem)) {
      return;
    }
    let maxId = 0;
    Object.values(env_datas).forEach((item) => {
      if (isNumber(item?.sort) && item?.sort > maxId) {
        maxId = item.sort;
      }
    });
    const newItem = cloneDeep(sourceItem);
    newItem.env_id = uuidV4();
    newItem.name = newItem.name + ' copy';
    newItem.sort = maxId + 1;
    handleSaveEnv(newItem);
    setTimeout(() => {
      setEditValue(newItem);
    }, 0);
  });

  return (
    <Spin spinning={loading}>
      <EnvironmentWrapper token={token}>
        <PanelGroup direction="horizontal">
          <Panel minSize={20} maxSize={50} collapsible defaultSize={25}>
            <Left
              env_datas={env_datas}
              activeKey={editValue?.env_id}
              onActiveChange={handleActiveChange}
              onCreateEmpty={handleCreateEmpty}
              onCopyItem={handleCopyItem}
            />
          </Panel>
          <ResizeBar direction="horizontal" />
          <Panel>
            <Right value={editValue} onSave={handleSaveEnv} onCancel={onCancel} />
          </Panel>
        </PanelGroup>
      </EnvironmentWrapper>
    </Spin>
  );
};

export default React.memo(Settings);
