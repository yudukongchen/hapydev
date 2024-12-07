import { BaseCollection } from '#types/collection/base';
import { DataModel } from '#types/data-model';
import { EnvironmentItem } from '#types/environment';
import { message, Modal, Spin, Tabs } from 'antd';
import React, { useEffect } from 'react';
import Apis from './apis';
import Models from './models';
import Envs from './envs';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { APIOptions, DataModelOptions } from './type';
import { useSelector } from 'react-redux';
import { isArray } from 'lodash';
import { prepareApisList } from '@bll/apis/import';
import { batchSaveApis } from '@bll/apis';
import { emitGlobal } from '@subjects/global';
import { concatMap, from, merge, reduce, tap } from 'rxjs';
import { DEFAULT_API_OPTIONS, DEFAULT_MODEL_OPTIONS } from './constants';
import { prepareEnvsList } from './utils';
import { saveEnvs } from '@bll/projects/envs';
import { prepareModelsList } from '@bll/models/import';
import { batchSaveModels } from '@bll/models';

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
  const [apiData, setApiData] = useSafeState<APIOptions>(DEFAULT_API_OPTIONS);
  const [modelData, setModelData] = useSafeState<DataModelOptions>(DEFAULT_MODEL_OPTIONS);
  const [envKeys, setEnvKeys] = useSafeState([]);

  useEffect(() => {
    if (!open) {
      setApiData(DEFAULT_API_OPTIONS);
      setModelData(DEFAULT_MODEL_OPTIONS);
      setEnvKeys([]);
    }
  }, [open]);

  const handleClose = () => {
    setLoading(false);
    onClose();
  };

  const handleComfirm = useMemoizedFn(async () => {
    if (isArray(apiData?.selectedKeys)) {
      const apiDataList = await prepareApisList(apiData, apiList, current_project_id);
      const modelDataList = await prepareModelsList(modelData, modelList, current_project_id);

      const envDataList = prepareEnvsList(envList, envKeys);

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
    }
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
              label: `接口(${apiData?.selectedKeys?.length ?? 0}/${apiList?.length ?? 0})`,
              key: 'apis',
              children: <Apis apiList={apiList} value={apiData} onChange={setApiData} />,
            },
            {
              label: `数据模型(${modelData?.selectedKeys?.length ?? 0}/${modelList?.length ?? 0})`,
              key: 'models',
              children: <Models modelList={modelList} value={modelData} onChange={setModelData} />,
            },
            {
              label: `环境(${envKeys?.length ?? 0}/${envList?.length ?? 0})`,
              key: 'envs',
              children: <Envs envList={envList} envKeys={envKeys} onEnvKeysChange={setEnvKeys} />,
            },
          ]}
        />
      </Spin>
    </Modal>
  );
};

export default Preview;
