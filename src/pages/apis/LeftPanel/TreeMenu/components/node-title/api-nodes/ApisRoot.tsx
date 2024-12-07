import SvgAdd from '@assets/icons/add.svg?react';
import { Button, Dropdown } from 'antd';
import { ROOT_ADD_ITEMS } from './constants/root';
import { handlePrevDefaultClick } from '../utils';

const ApisRoot = (props) => {
  const { item, onMenuClick } = props;

  return (
    <>
      <Dropdown
        trigger={['click']}
        destroyPopupOnHide
        menu={{ items: ROOT_ADD_ITEMS, onClick: onMenuClick.bind(null, item) }}
      >
        <Button size="small" type="text" icon={<SvgAdd />} onClick={handlePrevDefaultClick} />
      </Dropdown>
    </>
  );
};

export default ApisRoot;
