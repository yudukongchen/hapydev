import { Input } from 'antd';
import { ChangeEventHandler } from 'react';

const AuthInput = (props: any) => {
  const { value, onChange, placeholder, readonly = false, onBlur } = props;

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <Input.TextArea
      value={value}
      spellCheck={false}
      placeholder={placeholder}
      readOnly={readonly}
      onChange={handleChange}
      onBlur={onBlur}
    />
  );
};

export default AuthInput;
