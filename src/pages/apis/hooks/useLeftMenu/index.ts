import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn, useSafeState } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import { PanelProps } from 'react-resizable-panels';

type Props = {
  defaultSize: PanelProps['defaultSize'];
};

const useLeftMenu = (props) => {
  const { defaultSize } = props;

  const [showMenu, setShowMenu] = useSafeState(true);

  const refLeftPanel = useRef(null);

  const handleCollapse = useMemoizedFn(() => {
    setShowMenu(false);
  });

  const handleExpand = useMemoizedFn(() => {
    setShowMenu(true);
  });

  const handleToggleShowLeftPanel = useMemoizedFn(() => {
    setShowMenu((val) => !val);
  });

  useEffect(() => {
    if (showMenu && !refLeftPanel?.current?.isExpanded()) {
      refLeftPanel.current?.resize(defaultSize);
    }
    if (showMenu !== true && !refLeftPanel?.current?.isCollapsed()) {
      refLeftPanel.current?.collapse();
    }
  }, [showMenu]);

  useGlobalSubject(`USER_EVENT/toggleShowLeftPanel`, handleToggleShowLeftPanel, []);

  return {
    refLeftPanel,
    handleCollapse,
    handleExpand,
  };
};

export default useLeftMenu;
