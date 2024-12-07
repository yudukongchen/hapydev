import { BaseCollection } from '#types/collection/base';
import { Tree } from 'antd';
import React from 'react';
import useApis from './hooks/useApis';
import SvgFolder from '@assets/icons/folder.svg?react';
import SvgMarkdown from '@assets/icons/markdown.svg?react';
import cn from 'classnames';
import { methodsWrapper } from '@theme/methods';
import { getFullPathUrl } from '@utils/url';
import { useMemoizedFn } from 'ahooks';

type Props = {
  apiList: BaseCollection[];
  value: string[];
  onChange: (newIds: string[]) => void;
  keepPrefixUrl: 1 | -1;
};

const ApiList: React.FC<Props> = (props) => {
  const { apiList, value, onChange, keepPrefixUrl } = props;

  const treeDatas = useApis({ apiList });

  const renderNode = useMemoizedFn((item) => {
    return (
      <>
        {item.data_type === 'document' && <SvgMarkdown />}
        {item.data_type === 'folder' && <SvgFolder />}
        {item.data_type === 'http' && (
          <span className={cn('method', item?.method)}>{item?.method}</span>
        )}
        <span className="name">{item?.title}</span>
        <span className="url">{keepPrefixUrl === 1 ? item?.url : getFullPathUrl(item?.url)}</span>
      </>
    );
  });

  return (
    <Tree
      className={cn('left-tree-panel', 'beautify-scrollbar', methodsWrapper)}
      height={480}
      treeData={treeDatas}
      selectable={false}
      checkable
      checkedKeys={value}
      onCheck={onChange}
      titleRender={renderNode}
      defaultExpandAll
      virtual
    />
  );
};

export default ApiList;
