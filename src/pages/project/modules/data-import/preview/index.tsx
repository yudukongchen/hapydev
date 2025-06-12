import { BaseCollection } from '#types/collection/base';
import { DataModel } from '#types/data-model';
import { EnvironmentItem } from '#types/environment';
import { message, Modal, Spin, Tabs } from 'antd';
import React, { useEffect } from 'react';
import Apis from './apis';
import Models from './models';
import Envs from './envs';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { useSelector } from 'react-redux';
import { isArray } from 'lodash';
import { prepareApisList } from '@bll/apis/import';
import { batchSaveApis } from '@bll/apis';
import { emitGlobal } from '@subjects/global';
import { concatMap, from, merge, reduce, tap } from 'rxjs';
import { DEFAULT_IMPORT_OPTIONS } from './constants';
import { prepareEnvsList } from './utils';
import { saveEnvs } from '@bll/projects/envs';
import { prepareModelsList } from '@bll/models/import';
import { batchSaveModels } from '@bll/models';
import produce from 'immer';

type Props = {
  open: boolean;
  onClose: () => void;
  apiList?: BaseCollection[];
  modelList?: DataModel[];
  envList?: EnvironmentItem[];
};
const Preview: React.FC<Props> = (props) => {
  const { open, onClose, apiList, modelList, envList } = props;

  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const [loading, setLoading] = useSafeState(false);
  const [options, setOptions] = useSafeState(DEFAULT_IMPORT_OPTIONS);

  useEffect(() => {
    if (!open) {
      setOptions(DEFAULT_IMPORT_OPTIONS);
    }
  }, [open]);

  const handleClose = () => {
    setLoading(false);
    onClose();
  };

  const handleComfirm = useMemoizedFn(async () => {
    if (!isArray(options?.apis?.selectedKeys)) {
      return;
    }
    const apiDataList = await prepareApisList(options?.apis, apiList, current_project_id);
    const modelDataList = await prepareModelsList(options?.models, modelList, current_project_id);
    const envDataList = prepareEnvsList(envList, options?.envs);
    setLoading(true);
    merge(
      batchSaveApis(current_project_id, apiDataList).pipe(
        tap((resp) => {
          if (resp?.code !== 10000) {
            message.error(resp?.message);
            return;
          }
          emitGlobal('APIS/loadApiDatas', current_project_id);
        })
      ),
      batchSaveModels(current_project_id, modelDataList).pipe(
        tap((resp) => {
          if (resp?.code !== 10000) {
            message.error(resp?.message);
            return;
          }
          emitGlobal('MODELS/loadModelDatas', current_project_id);
        })
      ),
      from(envDataList).pipe(
        concatMap((data) => saveEnvs(current_project_id, data)),
        reduce((a, b) => a.concat(b), []),
        tap(() => {
          emitGlobal('ENVS/loadEnvsList', {
            project_id: current_project_id,
          });
        })
      )
    )
      .pipe(reduce((a, b) => a.concat(b), []))
      .subscribe({
        next() {
          message.success('导入完成');
          onClose();
          setLoading(false);
        },
        error() {
          setLoading(false);
        },
      });
  });

  const handleChangeOptions = useMemoizedFn((key, newVal) => {
    const result = produce(options, (draft) => {
      draft[key] = newVal;
    });
    setOptions(result);
  });

  return (
    <Modal
      centered
      width={860}
      open={open}
      title="导入预览"
      onClose={handleClose}
      onCancel={handleClose}
      onOk={handleComfirm}
    >
      <Spin spinning={loading}>
        <Tabs
          defaultActiveKey="apis"
          items={[
            {
              label: `接口(${options?.apis?.selectedKeys?.length ?? 0}/${apiList?.length ?? 0})`,
              key: 'apis',
              children: (
                <Apis
                  apiList={apiList}
                  value={options?.apis}
                  onChange={handleChangeOptions.bind(null, 'apis')}
                />
              ),
            },
            {
              label: `数据模型(${options?.models?.selectedKeys?.length ?? 0}/${modelList?.length ?? 0})`,
              key: 'models',
              children: (
                <Models
                  modelList={modelList}
                  value={options?.models}
                  onChange={handleChangeOptions.bind(null, 'models')}
                />
              ),
            },
            {
              label: `环境(${options?.envs?.length ?? 0}/${envList?.length ?? 0})`,
              key: 'envs',
              children: (
                <Envs
                  envList={envList}
                  envKeys={options?.envs}
                  onEnvKeysChange={handleChangeOptions.bind(null, 'envs')}
                />
              ),
            },
          ]}
        />
      </Spin>
    </Modal>
  );
};

export default Preview;
