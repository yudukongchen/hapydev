import React from 'react';
import { LOGO_IMAGES } from './constants';
import { Avatar } from 'antd';
import { getAssertsPath } from '@utils/utils';
import cn from 'classnames';

type Props = {
  url: string;
  onCheck: (url: string) => void;
};
const LogoList: React.FC<Props> = (props) => {
  const { url, onCheck } = props;
  return (
    <div className="logo-list">
      {LOGO_IMAGES.map((item, index) => (
        <Avatar
          shape="square"
          onClick={onCheck.bind(null, item)}
          key={index}
          src={getAssertsPath(item)}
          className={cn('pic-item', {
            selected: url === item,
          })}
          size="small"
        />
      ))}
    </div>
  );
};

export default LogoList;
