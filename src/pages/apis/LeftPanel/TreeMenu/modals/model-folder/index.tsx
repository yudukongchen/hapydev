import { DataModel } from '#types/data-model';
import { emitGlobal } from '@subjects/global';
import { nodeSort } from '@utils/node-sort';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Input, Modal, TreeSelect } from 'antd';
import produce from 'immer';
import { isArray, isPlainObject, isUndefined } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  open: boolean;
  defaultValue: DataModel;
  onClose: () => void;
};

const ModelFolder: React.FC<Props> = (props) => {
  const { open, defaultValue, onClose } = props;
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const [value, setValue] = useSafeState<Partial<DataModel>>({});

  const [loading, setLoading] = useSafeState(false);
  const modelDatas = useSelector((store: any) => store?.models?.base_datas);

  const treeData = useMemo(() => {
    if (!isPlainObject(modelDatas)) {
      return [];
    }
    const cloneDatas = {};
    Object.values(modelDatas)
      .sort(nodeSort)
      .forEach((item: any) => {
        if (item.data_type === 'folder') {
          cloneDatas[item.id] = {
            value: item.id,
            title: item.name,
            parent_id: item.parent_id,
          };
        }
      });

    const rootList = [];
    Object.values(cloneDatas).forEach((item: any) => {
      if (item.parent_id === '0') {
        rootList.push(item);
      }
      const parentItem = cloneDatas?.[item?.parent_id];
      if (isUndefined(parentItem)) {
        return;
      }
      if (!isArray(parentItem?.children)) {
        parentItem.children = [];
      }
      parentItem.children.push(item);
    });
    const rootItem = {
      value: '0',
      title: '根目录',
      children: rootList,
    };

    return [rootItem];
  }, [modelDatas]);

  useEffect(() => {
    if (!isUndefined(defaultValue)) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    setValue(result);
  });

  const handleSave = () => {
    setLoading(true);
    emitGlobal('MODELS/saveModel', {
      data: {
        ...value,
        project_id: current_project_id,
      },
      callback: (success) => {
        setLoading(false);
        if (success) {
          onClose();
        }
      },
    });
  };

  return (
    <Modal
      open={open}
      title="新建目录"
      onCancel={onClose}
      width={400}
      onOk={handleSave}
      destroyOnClose
      footer={
        <>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSave} loading={loading}>
            确定
          </Button>
        </>
      }
    >
      <div style={{ padding: '8px 0' }}>目录名称</div>
      <Input
        value={value?.name}
        onChange={(e) => {
          handleChange('name', e.target.value);
        }}
      />
      <div style={{ padding: '8px 0' }}>父级目录</div>
      <TreeSelect
        value={value?.parent_id}
        onChange={handleChange.bind(null, 'parent_id')}
        style={{ width: '100%' }}
        treeData={treeData}
        treeDefaultExpandAll
      />
    </Modal>
  );
};

export default ModelFolder;
