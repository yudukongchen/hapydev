import SvgApi from '@assets/icons/api1.svg?react';
import React from 'react';
import SvgArrowDown from '@assets/icons/angle-down.svg?react';

type Props = {
  expanded: boolean;
  onToggleExpand: () => void;
};

const ApiRoot: React.FC<Props> = (props) => {
  const { expanded, onToggleExpand } = props;
  return (
    <>
      <div className="menu-tree-node-title" onClick={onToggleExpand}>
        <SvgApi className="root-node-icon" />
        <span className="root-node-title">接口</span>
      </div>
      <div className="menu-tree-node-indent">
        <span className="foldbtn" onClick={onToggleExpand}>
          {expanded === true ? (
            <SvgArrowDown />
          ) : (
            <SvgArrowDown style={{ transform: 'rotate(-90deg)' }} />
          )}
        </span>
      </div>
    </>
  );
};

export default ApiRoot;
