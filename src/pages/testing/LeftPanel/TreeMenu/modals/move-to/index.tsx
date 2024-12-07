import { Testing } from '#types/testing';
import { updateTesting } from '@bll/testing';
import { emitGlobal } from '@subjects/global';
import { useSafeState } from 'ahooks';
import { Button, message, Modal, TreeSelect } from 'antd';
import { isArray, isPlainObject, isUndefined } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  open: boolean;
  value: any;
  onClose: () => void;
  dataList: Testing[];
};

const MoveTo: React.FC<Props> = (props) => {
  const { open, value, onClose, dataList } = props;

  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const [parentId, setParentId] = useSafeState(null);
  const [loading, setLoading] = useSafeState(false);
  const treeData = useMemo(() => {
    if (!isArray(dataList)) {
      return [];
    }
    const cloneDatas = {};
    dataList.forEach((item) => {
      if (item.type === 'folder') {
        cloneDatas[item.test_id] = {
          value: item.test_id,
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
  }, [dataList]);

  useEffect(() => {
    setParentId(value?.parent_id);
  }, [value?.name]);

  const handleSave = () => {
    if (value.test_id === parentId) {
      message.error('操作无效');
      return;
    }
    setLoading(true);

    updateTesting(current_project_id, value.test_id, {
      parent_id: parentId,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('TESTING/getTestingList', current_project_id);
        onClose();
      },
      complete() {
        setLoading(false);
      },
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
        treeData={treeData}
        treeDefaultExpandAll
      />
    </Modal>
  );
};

export default MoveTo;
