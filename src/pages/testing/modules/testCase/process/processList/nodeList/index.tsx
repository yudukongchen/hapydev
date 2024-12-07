import { ProcessItem } from '#types/testing';
import React from 'react';
import ItemNode from '../itemNode';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { isEmpty } from 'lodash';

type Props = {
  value: ProcessItem[];
  onChange: (newVal: ProcessItem[]) => void;
  isRoot: boolean;
};

const NodeList: React.FC<Props> = (props) => {
  const { value, onChange, isRoot = false } = props;

  const handleChange = useMemoizedFn((index, newVal) => {
    const result = produce(value, (draft) => {
      draft[index] = newVal;
    });
    onChange(result);
  });

  const handleDeleteItem = (index) => {
    const result = produce(value, (draft) => {
      draft.splice(index, 1);
    });
    onChange(result);
  };

  if (isEmpty(value)) {
    return null;
  }

  return (
    <>
      {value?.map((item, index) => (
        <ItemNode
          key={item.id}
          index={index}
          value={item}
          onChange={handleChange}
          onDelete={handleDeleteItem}
          showAppend={isRoot === true && index === value.length - 1}
        />
      ))}
    </>
  );
};
export default React.memo(NodeList);
