import { theme, Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import React from 'react';
import { API_NODES } from './modules';
import { isObject } from 'lodash';
import { TreeWrapper } from './style';

type Props = {
  treeDatas: DataNode[];
  ckeckeds: any[];
  setCheckeds: (newVal: any[]) => void;
};

const ApiList: React.FC<Props> = (props) => {
  const { treeDatas, ckeckeds, setCheckeds } = props;
  const { token } = theme.useToken();
  const renderTitle = (item) => {
    const Element = API_NODES?.[item.data_type] as React.LazyExoticComponent<React.FC<any>>;

    if (isObject(Element)) {
      return <Element item={item} />;
    }
    return null;
  };
  const handleChecked = (ckdKeys) => {
    setCheckeds(ckdKeys);
  };

  return (
    <TreeWrapper token={token} className="beautify-scrollbar">
      <Tree
        checkedKeys={ckeckeds}
        selectedKeys={[]}
        activeKey={null}
        selectable={false}
        checkable
        treeData={treeDatas}
        titleRender={renderTitle}
        onCheck={handleChecked}
      />
    </TreeWrapper>
  );
};

export default ApiList;
