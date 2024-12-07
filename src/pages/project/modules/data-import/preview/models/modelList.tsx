import { Tree } from 'antd';
import React from 'react';
import useModels from './hooks/useModels';
import SvgFolder from '@assets/icons/folder.svg?react';
import SvgModel from '@assets/icons/model.svg?react';
import cn from 'classnames';
import { methodsWrapper } from '@theme/methods';
import { DataModel } from '#types/data-model';

type Props = {
  modelList: DataModel[];
  value: string[];
  onChange: (newIds: string[]) => void;
};

const ApiList: React.FC<Props> = (props) => {
  const { modelList, value, onChange } = props;

  const treeDatas = useModels({ modelList });

  const renderNode = (item) => {
    return (
      <>
        {item.data_type === 'folder' && <SvgFolder />}
        {item.data_type === 'model' && <SvgModel />}
        <span className="name">{item?.name}</span>
      </>
    );
  };

  return (
    <div className={cn('left-tree-panel', 'beautify-scrollbar', methodsWrapper)}>
      <Tree
        treeData={treeDatas}
        selectable={false}
        checkable
        checkedKeys={value}
        onCheck={onChange}
        titleRender={renderNode}
        defaultExpandAll
      />
    </div>
  );
};

export default ApiList;
