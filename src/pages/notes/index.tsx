import React from 'react';
import { theme } from 'antd';

const Historys = () => {
  const { token } = theme.useToken();

  return (
    <div style={{ height: '100%', overflow: 'auto', background: '#eeeeee' }}>
      {Object.entries(token).map((item, index) => {
        return (
          <div
            key={index}
            style={{
              float: 'left',
              margin: '10px',
              padding: '10px',
              background: item[1],
            }}
          >
            {item[0]}
          </div>
        );
      })}
    </div>
  );
};

export default Historys;
