import LeftPanel from './LeftPanel';
import { Panel, PanelGroup, PanelProps } from 'react-resizable-panels';
import ResizeBar from '@components/bus/ResizeBar';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import RightPanel from './RightPanel';
import { useGlobalSubject } from '@hooks/useSubject';
import { ShareWrapper } from './style';
import { isNumber } from 'lodash';

const TeamPanel = () => {
  const [showMenu, setShowMenu] = useSafeState(true);

  const [activeTeamId, setActiveTeamId] = useSafeState(null);

  const [defaultSize, setDefaultSize] = useSafeState<PanelProps['defaultSize']>();
  const [minSize, setMinSize] = useSafeState<PanelProps['minSize']>();

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
    <ShareWrapper ref={refContainer}>
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
            <LeftPanel activeTeamId={activeTeamId} onActiveChange={setActiveTeamId} />
          </Panel>
        )}
        <ResizeBar direction="horizontal" />
        <Panel order={2}>
          <RightPanel activeTeamId={activeTeamId} />
        </Panel>
      </PanelGroup>
    </ShareWrapper>
  );
};

export default TeamPanel;
