import { useEffect, useState, useContext } from 'react';
import SplitBar from '../SplitBar';
import { TableContext } from '../contexts';

const Column = (props) => {
  const { colItem, outerWidth, colIndex } = props;
  const { layouts, handleLayoutChange = () => undefined } = useContext(TableContext);

  const defaultLayout = layouts?.[colIndex];

  const [layout, setLayout] = useState({
    width: colItem.width !== undefined ? colItem.width : 0,
  });

  useEffect(() => {
    if (colItem.width < 1) {
      setLayout({
        width: outerWidth * colItem.width,
      });
    }
  }, [outerWidth]);

  useEffect(() => {
    if (defaultLayout !== undefined) {
      setLayout(defaultLayout);
    }
  }, [defaultLayout]);

  const onLayoutChange = (newLayout) => {
    if (newLayout.width < 30) {
      newLayout.width = 30;
    }
    setLayout(newLayout);
    handleLayoutChange(newLayout, colIndex);
  };

  return (
    <td
      className="table-td"
      style={{
        width: layout?.width > 0 ? `${layout?.width}px` : 'auto',
      }}
    >
      <span className="table-cell">{colItem.title || ''}</span>
      {colItem.enableResize && (
        <SplitBar layout={layout} tableHeight={33} onLayoutChange={onLayoutChange} />
      )}
    </td>
  );
};

export default Column;
