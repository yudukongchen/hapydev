import React from 'react';
import TabItem from './tabItem';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, useSensor, MouseSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { updateTabsList } from '@reducers/historys/tabs';
import { useMemoizedFn } from 'ahooks';

type Props = {
  tabsList: any[];
  activeId: string;
  onClickItem: (tab_id: string) => void;
  onCloseItem: (tab_id: string) => void;
};

const ListPage: React.FC<Props> = (props) => {
  const { tabsList, activeId, onClickItem, onCloseItem } = props;
  const history_datas = useSelector<any, any>((store) => store?.historys?.datas?.base_datas);
  const diff_keys = useSelector<any, any>((store) => store?.historys?.tabs?.diffs);

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
            value={history_datas?.[tabId]}
            onClick={onClickItem.bind(null, tabId)}
            onCloseItem={onCloseItem.bind(null, tabId)}
            isChanged={diff_keys?.[tabId] === true}
            selected={activeId === tabId}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default React.memo(ListPage);
