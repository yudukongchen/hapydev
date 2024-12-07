import Table from '@components/base/Table';
import { DndContext, useSensor, MouseSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import DragHandle from './dragHandle';
import { useMemoizedFn } from 'ahooks';

const SortTable = (props) => {
  const { columns, data, onSortEnd = () => undefined } = props;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const sortColumns = [
    {
      name: null,
      width: 30,
      element: DragHandle,
    },
    ...columns,
  ];

  const handleDragEnd = useMemoizedFn((event) => {
    const { active, over } = event;

    if (active?.id === over?.id) {
      return;
    }
    const oldIndex = Number(active?.id);
    const newIndex = Number(over?.id);

    onSortEnd({ oldIndex, newIndex });
  });

  const sortTableItems = data.map((d, index) => `${index}`);

  const renderSortRows = useMemoizedFn((dataList, renderItem) => {
    return <>{dataList.map(renderItem)}</>;
  });

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext strategy={verticalListSortingStrategy} items={sortTableItems}>
        <Table {...props} columns={sortColumns} renderRow={renderSortRows} />
      </SortableContext>
    </DndContext>
  );
};

export default SortTable;
