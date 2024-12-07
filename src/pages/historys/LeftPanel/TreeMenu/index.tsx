import { Button, Empty } from 'antd';
import Tree from '@components/base/Tree';
import { useMemoizedFn } from 'ahooks';
import { list2Tree } from './list2tree';
import SvgDelete from '@assets/icons/delete.svg?react';
import cn from 'classnames';
import React, { useMemo } from 'react';
import { isEmpty, isFunction } from 'lodash';
import NodeTitle from './nodeTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addTabsItem } from '@reducers/historys/tabs';
import { addOpensItem } from '@reducers/historys/opens';
import LazyLoading from '@components/bus/LazyLoading';
import { deleteHistory } from '@bll/historys';

type Props = {
  filter: any;
  reload: () => void;
};
const LeftPanel: React.FC<Props> = (props) => {
  const active_id = useSelector<any, string>((store) => store?.historys?.tabs?.active_id);
  const history_datas = useSelector<any, any>((store) => store?.historys?.datas?.base_datas);
  const is_loading = useSelector<any, boolean>((store) => store?.historys?.datas?.is_loading);

  const dispatch = useDispatch();
  const { filter, reload } = props;
  const treeData = useMemo(() => {
    const list: any[] = Object.values(history_datas);
    if (isEmpty(filter?.name)) {
      return list2Tree(list);
    }
    const list2 = list.filter((item) => item?.url?.indexOf(filter?.name) !== -1);

    return list2Tree(list2);
  }, [history_datas, filter]);

  const handleDelete = async (id, e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    await deleteHistory(id);
    if (isFunction(reload)) {
      reload();
    }
  };

  const handleNodeClick = useMemoizedFn((node) => {
    if (node?.data_type === 'group') {
      return;
    }

    const nodeId = node?.id;
    dispatch(
      addTabsItem({
        id: nodeId,
      })
    );

    dispatch(addOpensItem(node?.item));
  });

  const renderNode = useMemoizedFn((nodeItem, { indent, selected }) => {
    return (
      <div
        className={cn('menu-tree-node', {
          'tree-node-selected': selected,
        })}
      >
        {indent}
        <NodeTitle nodeItem={nodeItem} />
        <div className="btns-item">
          <Button
            onClick={handleDelete.bind(null, nodeItem?.data?.id)}
            icon={<SvgDelete />}
            size="small"
            type="text"
          />
        </div>
      </div>
    );
  });

  if (is_loading) {
    return <LazyLoading active />;
  }

  if (isEmpty(treeData)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />;
  }

  return (
    <Tree
      selectedKeys={[active_id]}
      defaultExpandAll
      className="tree-panel"
      fieldNames={{
        key: 'id',
        title: 'title',
        parent: 'parent',
      }}
      dataList={treeData}
      render={renderNode}
      onNodeClick={handleNodeClick}
      rootIndex={1}
    />
  );
};

export default LeftPanel;
