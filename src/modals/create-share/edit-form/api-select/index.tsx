import { ShareApiItem } from '#types/share';
import SvgRight from '@assets/icons/angle-right.svg?react';
import { list2TreeList } from './list2tree';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Modal, Tree } from 'antd';
import { isObject, omit } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { API_NODES } from './modules';
import { treeWrapper } from './style';
import produce from 'immer';

type Props = {
  value: ShareApiItem[];
  onChange: (newVal: ShareApiItem[]) => void;
};

const ApiSelect: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const [showTree, setShowTree] = useSafeState(false);
  const [ckeckeds, setCheckeds] = useSafeState([]);
  const [folders, setFolders] = useSafeState({});

  useEffect(() => {
    const keyList = [];
    const folderDatas = {};
    value?.forEach((item) => {
      keyList.push(item.id);
      if (item.is_all === 1) {
        folderDatas[item.id] = true;
      }
    });
    setCheckeds(keyList);
    setFolders(folderDatas);
  }, [value]);

  const apiDatas = useSelector((store: any) => store.apis?.datas?.base_datas);

  const treeDatas = useMemo(() => {
    const list = Object.values(apiDatas)
      .map((item: any) =>
        omit({ ...item, key: item.id, method: item?.data?.request?.method }, 'data')
      )
      ?.sort((a, b) => a?.sort - b?.sort);
    const result = list2TreeList(list, { key: 'id', parent: 'parent_id' }, folders);
    return result;
  }, [apiDatas, folders]);

  const handleClose = () => {
    setShowTree(false);
  };

  const handleChangeFolder = useMemoizedFn((id, isAll) => {
    const result = produce(folders, (draft) => {
      if (isAll) {
        draft[id] = true;
      } else {
        delete draft[id];
      }
    });
    setFolders(result);
  });

  const renderTitle = (item) => {
    const Element = API_NODES?.[item.data_type] as React.LazyExoticComponent<React.FC<any>>;

    if (isObject(Element)) {
      return (
        <Element
          item={item}
          is_all={folders?.[item.id]}
          onAllChange={handleChangeFolder.bind(null, item.id)}
        />
      );
    }
    return null;
  };

  const handleChecked = (ckdKeys) => {
    setCheckeds(ckdKeys);
  };

  const handleOk = () => {
    const list: { [key: string]: ShareApiItem } = {};
    ckeckeds.forEach((id) => {
      const item = {
        id,
      } as ShareApiItem;
      if (folders?.[id] === true) {
        item.is_all = 1;
      }
      list[id] = item;
    });

    Object.entries(folders).forEach(([id, checked]) => {
      if (checked === true) {
        list[id] = {
          id: id,
          is_all: 1,
        };
      }
    });
    const resultList = Object.values(list);
    onChange(resultList);
    setShowTree(false);
  };

  const computedCheckeds = useMemo(() => {
    const checkedDatas = {};
    ckeckeds?.forEach((id) => {
      checkedDatas[id] = true;
    });
    Object.entries(folders).forEach(([id, checked]) => {
      if (checked === true) {
        checkedDatas[id] = true;
      }
    });
    return Object.keys(checkedDatas);
  }, [ckeckeds, folders]);

  return (
    <>
      <Modal open={showTree} title="选择接口" onCancel={handleClose} onOk={handleOk}>
        <div style={{ maxHeight: 400, overflow: 'auto' }} className="beautify-scrollbar">
          <Tree
            checkedKeys={computedCheckeds}
            className={treeWrapper}
            selectedKeys={[]}
            activeKey={null}
            selectable={false}
            checkable
            treeData={treeDatas}
            titleRender={renderTitle}
            onCheck={handleChecked}
          />
        </div>
      </Modal>
      <div className="form-item">
        <div className="item-name">圈选接口</div>
        <div className="item-value right">
          <div className="label-item" onClick={setShowTree.bind(null, true)}>
            {value.length === 0 ? <>选择接口</> : <>已选择{value?.length}条数据</>}
            <SvgRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiSelect;
