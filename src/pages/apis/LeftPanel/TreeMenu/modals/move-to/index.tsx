import { BaseCollection } from '#types/collection/base';
import { emitGlobal } from '@subjects/global';
import { treeSelectWraper } from '@theme/tree-select';
import { nodeSort } from '@utils/node-sort';
import { useSafeState } from 'ahooks';
import { Button, message, Modal, TreeSelect } from 'antd';
import { isArray, isPlainObject, isUndefined } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  open: boolean;
  value: BaseCollection;
  onClose: () => void;
};

const MoveTo: React.FC<Props> = (props) => {
  const { open, value, onClose } = props;
  const [parentId, setParentId] = useSafeState(null);
  const [loading, setLoading] = useSafeState(false);
  const apiDatas = useSelector((store: any) => store?.apis?.datas?.base_datas);

  const treeData = useMemo(() => {
    if (!isPlainObject(apiDatas)) {
      return [];
    }
    const cloneDatas = {};
    Object.values(apiDatas)
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
  }, [apiDatas]);

  useEffect(() => {
    setParentId(value?.parent_id);
  }, [value?.name]);

  const handleCallback = (success) => {
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  const handleSave = () => {
    if (value.id === parentId) {
      message.error('操作无效');
      return;
    }

    setLoading(true);
    emitGlobal('APIS/saveApi', {
      data: { ...value, parent_id: parentId },
      callback: handleCallback,
    });
  };

  return (
    <Modal
      open={open}
      title="移动到"
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
      <div style={{ padding: '8px 0' }}>目标目录</div>
      <TreeSelect
        value={parentId}
        onChange={setParentId}
        style={{ width: '100%' }}
        popupClassName={treeSelectWraper}
        treeData={treeData}
        treeDefaultExpandAll
      />
    </Modal>
  );
};

export default MoveTo;
