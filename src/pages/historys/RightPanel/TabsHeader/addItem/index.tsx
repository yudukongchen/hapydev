import { Button } from 'antd';
import SvgMore from '@assets/icons/more.svg?react';
import cn from 'classnames';
import { addItemWrapper } from './style';

const AddItem = () => {
  return (
    <div className={cn(addItemWrapper, 'add-item')}>
      <Button size="middle" icon={<SvgMore />} />
    </div>
  );
};
export default AddItem;
