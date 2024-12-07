import React, { useMemo } from 'react';
import { ItemListWrapper } from './style';
import ResizeObserver from 'rc-resize-observer';
import { useMemoizedFn, useSafeState } from 'ahooks';
import useScroll from './hooks/useScroll';
import { useDispatch } from 'react-redux';
import { removeTabsItem, updateActiveId } from '@reducers/historys/tabs';
import { removeOpensItem } from '@reducers/historys/opens';
import TabsList from './list';

type Props = {
  tabsList: string[];
  activeId: string;
};

const ItemList: React.FC<Props> = (props) => {
  const { tabsList, activeId } = props;

  const dispatch = useDispatch();
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
    dispatch(
      updateActiveId({
        id: tabId,
      })
    );
  });

  const handleCloseItem = useMemoizedFn((tabId) => {
    dispatch(
      removeTabsItem({
        id: tabId,
      })
    );
    dispatch(
      removeOpensItem({
        id: tabId,
      })
    );
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
