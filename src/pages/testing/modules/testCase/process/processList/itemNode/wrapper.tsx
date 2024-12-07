import { Button, Checkbox } from 'antd';
import SvgDelete from '@assets/icons/delete.svg?react';
import NodeList from '../nodeList';
import AddItem from './addItem';
import React from 'react';
import { ProcessItem } from '#types/testing';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import cn from 'classnames';

type Props = {
  value: ProcessItem;
  onChange?: (newVal: ProcessItem) => void;
  expand: boolean;
  onDelete: () => void;
  children: any;
  className?: string;
};

const Wrapper: React.FC<Props> = (props) => {
  const { value, onChange, expand, onDelete, children, className } = props;
  const handleChangeItem = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <div className={cn('item-node', className)}>
      <div className="item-node-header">
        <Checkbox
          checked={value?.is_used === 1}
          onChange={(e) => {
            handleChangeItem('is_used', e.target?.checked === true ? 1 : -1);
          }}
        />
        {children}
        <Button onClick={onDelete} size="small" type="text" icon={<SvgDelete />} />
      </div>
      {expand === true && (
        <div className="item-node-content">
          <NodeList
            isRoot={false}
            value={value?.children}
            onChange={handleChangeItem.bind(null, 'children')}
          />
          <AddItem value={value} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default Wrapper;
