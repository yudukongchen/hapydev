import SvgArrowDown from '@assets/icons/angle-down.svg?react';

const Indent = (props: any) => {
  const { rootIndex = 0, prefixCls, level, isLeaf, onToggleExpand } = props;
  const renderIndents = () => {
    const list = [];
    for (let i = 0; i <= level; i++) {
      if (i === level) {
        if (!isLeaf) {
          list.push(
            <div key={`${i}expand`} className={`${prefixCls}-notleaf`}>
              <span className="foldbtn" onClick={onToggleExpand}>
                {props.expanded === true ? (
                  <SvgArrowDown />
                ) : (
                  <SvgArrowDown style={{ transform: 'rotate(-90deg)' }} />
                )}
              </span>
            </div>
          );
        } else {
          list.push(<div key={i} className={`${prefixCls}-indent ${prefixCls}-indent-unit`} />);
        }
        return list;
      }
      if (i < level && i >= rootIndex) {
        list.push(<div key={i} className={`${prefixCls}-indent ${prefixCls}-indent-unit`} />);
      }
    }
    return list;
  };

  return <div className={`${prefixCls}-indent`}>{renderIndents()}</div>;
};

export default Indent;
