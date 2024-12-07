import { Input, Select, Space } from 'antd';
import { DATA_TYPE_LIST } from '@constants/request';
import { columnWrapper, filedTypesWrapper } from './style';

export const ItemValue = (props) => {
  const { value, rowData, onChange, onDeleteRow, ...resetProps } = props;

  const handleChangeItem = (key: string, newVal: string | number) => {
    const newData = {
      ...rowData,
      [key]: newVal,
    };
    onChange(newData, true);
  };

  return (
    <Space.Compact className={columnWrapper}>
      <Input
        placeholder=""
        spellCheck={false}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...resetProps}
      />
      <Select
        variant="borderless"
        popupClassName={filedTypesWrapper}
        placement="bottomRight"
        value={
          DATA_TYPE_LIST.includes(`${rowData?.data_type}`.toLowerCase())
            ? rowData?.data_type
            : 'String'
        }
        onChange={handleChangeItem.bind(null, 'data_type')}
      >
        {DATA_TYPE_LIST.map((item) => (
          <Select.Option key={item} value={item}>
            <span>{item}</span>
          </Select.Option>
        ))}
      </Select>
    </Space.Compact>
  );
};

export default ItemValue;
