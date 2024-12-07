import LeftPanel from './LeftPanel';
import { Panel, PanelGroup, PanelProps } from 'react-resizable-panels';
import ResizeBar from '@components/bus/ResizeBar';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useMemoizedFn, useMount, useSafeState } from 'ahooks';
import { useGlobalSubject } from '@hooks/useSubject';
import RightPanel from './RightPanel';
import { TestingWrapper } from './style';
import { isNumber } from 'lodash';
import useTestingData from './hooks/useTestingData';
import { useSelector } from 'react-redux';
import { emitGlobal } from '@subjects/global';

const Testing = () => {
  const [showMenu, setShowMenu] = useSafeState(true);
  const [defaultSize, setDefaultSize] = useSafeState<PanelProps['defaultSize']>();
  const [minSize, setMinSize] = useSafeState<PanelProps['minSize']>();
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const { testingList } = useTestingData();

  useMount(() => {
    emitGlobal('TESTING/getTestingList', current_project_id);
  });

  const refContainer = useRef(null);
  const refPanel = useRef(null);

  const handleCollapse = useMemoizedFn(() => {
    setShowMenu(false);
  });

  const handleExpand = useMemoizedFn(() => {
    setShowMenu(true);
  });

  const handleToggleShowLeftPanel = useMemoizedFn(() => {
    setShowMenu((val) => !val);
  });

  useLayoutEffect(() => {
    const panelGroup = refContainer.current;
    if (panelGroup instanceof HTMLElement) {
      setDefaultSize((320 / panelGroup.offsetWidth) * 100);
      setMinSize((200 / panelGroup.offsetWidth) * 100);
    }
  }, []);

  useEffect(() => {
    if (showMenu && !refPanel?.current?.isExpanded()) {
      refPanel.current?.resize(defaultSize);
    }
    if (showMenu !== true && !refPanel?.current?.isCollapsed()) {
      refPanel.current?.collapse();
    }
  }, [showMenu]);

  useGlobalSubject(`USER_EVENT/toggleShowLeftPanel`, handleToggleShowLeftPanel, []);

  return (
    <TestingWrapper ref={refContainer}>
      <PanelGroup direction="horizontal" style={{ height: '100%' }}>
        {isNumber(defaultSize) && (
          <Panel
            onCollapse={handleCollapse}
            onExpand={handleExpand}
            ref={refPanel}
            defaultSize={defaultSize}
            minSize={minSize}
            maxSize={45}
            collapsible
            order={1}
          >
            <LeftPanel dataList={testingList} />
          </Panel>
        )}

        <ResizeBar direction="horizontal" />
        <Panel order={2}>
          <RightPanel />
        </Panel>
      </PanelGroup>
    </TestingWrapper>
  );
};

export default Testing;
