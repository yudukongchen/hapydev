import React, { useMemo } from 'react';
import { ItemListWrapper } from './style';
import ResizeObserver from 'rc-resize-observer';
import { useSafeState } from 'ahooks';
import useScroll from './hooks/useScroll';
import TabsList from './list';
import { emitGlobal } from '@subjects/global';

type Props = {
  opensData: any;
  tabsList: string[];
  activeId: string;
};

const ItemList: React.FC<Props> = (props) => {
  const { opensData, tabsList, activeId } = props;

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

  const handleClick = (new_active_id: string) => {
    emitGlobal('APIS/OPENS/updateTabIndex', new_active_id);
  };

  const handleCloseItem = (tabId) => {
    emitGlobal('APIS/OPENS/closeItem', tabId);
  };

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
              opensData={opensData}
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
