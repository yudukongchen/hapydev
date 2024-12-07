import React, { useMemo } from 'react';
import { ItemListWrapper } from './style';
import ResizeObserver from 'rc-resize-observer';
import { useMemoizedFn, useSafeState } from 'ahooks';
import useScroll from './hooks/useScroll';
import { useDispatch } from 'react-redux';
import { updateActiveId } from '@reducers/testing/tabs';
import TabsList from './list';
import { emitGlobal } from '@subjects/global';

type Props = {
  tabsList: string[];
  activeId: string;
};

const ItemList: React.FC<Props> = (props) => {
  const { tabsList, activeId } = props;

  const [outerOffset, setOuterOffset] = useSafeState({ width: null });
  const [innerOffset, setInnerOffset] = useSafeState({ width: null });
  const [translateX, setTranslateX] = useSafeState(0);

  const activeIndex = useMemo(() => {
    return tabsList.indexOf(activeId);
  }, [activeId, tabsList]);

  const handleScroll = useScroll({
    translateX,
    setTranslateX,
    outerWidth: outerOffset?.width,
    innerWidth: innerOffset?.width,
    activeIndex,
    itemWidth: 160,
  });

  const handleClick = useMemoizedFn((tabId: any) => {
    emitGlobal('TESTING/OPENS/updateTabIndex', tabId);
  });

  const handleCloseItem = useMemoizedFn((tabId) => {
    emitGlobal('TESTING/OPENS/closeItem', tabId);
  });

  return (
    <ResizeObserver onResize={setOuterOffset}>
      <ItemListWrapper className="item-list" onWheel={handleScroll}>
        <ResizeObserver onResize={setInnerOffset}>
          <div
            className="list-inner"
            style={{
              transform: `translate3d(${translateX}px,0,0)`,
            }}
          >
            <TabsList
              tabsList={tabsList}
              activeId={activeId}
              onClickItem={handleClick}
              onCloseItem={handleCloseItem}
            />
          </div>
        </ResizeObserver>
      </ItemListWrapper>
    </ResizeObserver>
  );
};
export default ItemList;
