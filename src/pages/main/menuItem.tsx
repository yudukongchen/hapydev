import React from 'react';
import useFontSize from '@hooks/useFontSize';

const MenuItem: React.FC<any> = (props) => {
  const fontSize = useFontSize();

  return (
    <div className="tab-menu-item">
      <props.icon style={{ width: 18, height: 18 }} />
      <span className="item-title" style={{ fontSize: fontSize.font12 }}>
        {props.title}
      </span>
    </div>
  );
};

export default MenuItem;
