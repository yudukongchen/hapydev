import React from 'react';
import TabItem from './tabItem';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, useSensor, MouseSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { updateTabsList } from '@reducers/apis/tabs';
import { useMemoizedFn } from 'ahooks';

type Props = {
  tabsList: any[];
  activeId: string;
  onClickItem: (tab_id: string) => void;
  onCloseItem: (tab_id: string) => void;
  opensData: any;
};

const ListPage: React.FC<Props> = (props) => {
  const { tabsList, activeId, onClickItem, onCloseItem, opensData } = props;
  const diff_keys = useSelector<any, any>((store) => store?.apis?.tabs?.diffs);
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = useMemoizedFn((event) => {
    const { active, over } = event;
    if (active?.id === over?.id) {
      return;
    }
    const oldIndex = tabsList.findIndex((tabId) => tabId === active.id);
    const newIndex = tabsList.findIndex((tabId) => tabId === over.id);
    const newTabList = arrayMove(tabsList, oldIndex, newIndex);
    dispatch(updateTabsList(newTabList));
  });
  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext strategy={horizontalListSortingStrategy} items={tabsList}>
        {tabsList.map((tabId) => (
          <TabItem
            key={tabId}
            tab_id={tabId}
            onClick={onClickItem.bind(null, tabId)}
            onCloseItem={onCloseItem.bind(null, tabId)}
            isChanged={diff_keys?.[tabId] === true}
            selected={activeId === tabId}
            node_type={opensData?.[tabId]?.node_type}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default React.memo(ListPage);
