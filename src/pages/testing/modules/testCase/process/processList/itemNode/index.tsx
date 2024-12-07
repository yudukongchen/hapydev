import { theme } from 'antd';
import { ItemNodeWrapper } from './style';
import SvgDrag from '@assets/icons/drag.svg?react';
import { useMemoizedFn } from 'ahooks';
import { ProcessItem } from '#types/testing';
import React, { Suspense } from 'react';
import { NODE_TYPES } from './constants';
import { isUndefined } from 'lodash';
import { useDraggable } from '@dnd-kit/core';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { addExpandKey, removeExpandKey } from '@reducers/testing/expands';
import NoSupport from './modules/nosupport';
import SortLine from '../sortLine';
import LazyLoading from '@components/bus/LazyLoading';

type Props = {
  value: ProcessItem;
  index: number;
  onChange?: (index: number, newVal: ProcessItem) => void;
  onDelete?: (index: number) => void;
  showAppend?: boolean;
};

const ItemNode: React.FC<Props> = (props) => {
  const { value, index, onChange, onDelete, showAppend } = props;
  const { token } = theme.useToken();
  const expand = useSelector((store: any) => store?.testing?.expands?.[value?.id] === true);
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: value.id,
  });
  const handleExpandChange = useMemoizedFn((status) => {
    if (status === true) {
      dispatch(addExpandKey(value?.id));
    } else {
      dispatch(removeExpandKey(value?.id));
    }
  });

  const handleChange = useMemoizedFn((newVal) => {
    onChange(index, newVal);
  });

  const handleDelete = () => {
    onDelete(index);
  };
  const Element: any = NODE_TYPES?.[value?.type];
  const isModuleUndefined = isUndefined(NODE_TYPES?.[value?.type]);
  return (
    <Suspense fallback={<LazyLoading />}>
      <ItemNodeWrapper token={token} ref={setNodeRef}>
        <SortLine id={`${value.id}|before`} />
        <div
          className={cn('node-inner', {
            draging: isDragging,
          })}
        >
          <div className="drag-icon" {...listeners} {...attributes}>
            <SvgDrag />
          </div>

          {!isModuleUndefined ? (
            <Element
              value={value}
              onChange={handleChange}
              expand={expand === true}
              onChangeExpand={handleExpandChange}
              onDelete={handleDelete}
            />
          ) : (
            <NoSupport onDelete={handleDelete} />
          )}
        </div>
        {showAppend === true && <SortLine id={`${value.id}|after`} />}
      </ItemNodeWrapper>
    </Suspense>
  );
};

export default React.memo(ItemNode);
