import { Space } from 'antd';
import { columnWrapper } from './style';

export const ItemLabel = (props) => {
  const { value } = props;

  return (
    <Space.Compact className={columnWrapper}>
      <span className="label">{value}</span>
    </Space.Compact>
  );
};

export default ItemLabel;
