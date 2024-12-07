import { Input } from 'antd';
import { ChangeEventHandler } from 'react';

const TextBox = (props: any) => {
  const { value, onChange, ...restProps } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return <Input {...restProps} value={value} onChange={handleChange} spellCheck={false} />;
};

export default TextBox;
