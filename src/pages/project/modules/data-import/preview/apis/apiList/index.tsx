import { BaseCollection } from '#types/collection/base';
import { Checkbox, Tree, theme } from 'antd';
import React from 'react';
import useApis from '../hooks/useApis';
import SvgFolder from '@assets/icons/folder.svg?react';
import SvgMarkdown from '@assets/icons/markdown.svg?react';
import cn from 'classnames';
import { methodsWrapper } from '@theme/methods';
import { getFullPathUrl } from '@utils/url';
import { useMemoizedFn } from 'ahooks';
import { ApiListWrapper } from './style';

type Props = {
  apiList: BaseCollection[];
  value: string[];
  onChange: (newIds: string[]) => void;
  keepPrefixUrl: 1 | -1;
};

const ApiList: React.FC<Props> = (props) => {
  const { apiList, value, onChange, keepPrefixUrl } = props;

  const { token } = theme.useToken();

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

  const handleChangeSelectAll = useMemoizedFn((e) => {
    if (e.target.checked === true) {
      const result = apiList?.map((item) => item.id);
      onChange(result);
      return;
    }
    onChange([]);
  });

  return (
    <ApiListWrapper token={token}>
      <div className="select-all-header">
        <Checkbox
          checked={apiList?.length === value?.length}
          onChange={handleChangeSelectAll}
          disabled={apiList?.length === 0}
        >
          选择全部
        </Checkbox>
      </div>
      <Tree
        className={cn('tree-list-panel', 'beautify-scrollbar', methodsWrapper)}
        treeData={treeDatas}
        selectable={false}
        checkable
        checkedKeys={value}
        onCheck={onChange}
        titleRender={renderNode}
        defaultExpandAll
        virtual
      />
    </ApiListWrapper>
  );
};

export default ApiList;
