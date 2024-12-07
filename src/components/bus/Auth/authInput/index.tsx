import { Input } from 'antd';
import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import cn from 'classnames';
import { txtAreaWrapper } from './style';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
  type?: 'input' | 'textarea';
  placeholder?: string;
  readonly?: boolean;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  size?: 'small' | 'middle' | 'large' | 'largex' | 'largexx' | 'largexxx';
};

const AuthInput: React.FC<Props> = (props) => {
  const {
    value,
    onChange,
    type = 'textarea',
    placeholder,
    readonly = false,
    onBlur,
    size = 'middle',
  } = props;

  const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  if (type === 'input') {
    return (
      <Input
        value={value}
        spellCheck={false}
        placeholder={placeholder}
        readOnly={readonly}
        onChange={handleChange}
        onBlur={onBlur}
      />
    );
  }

  return (
    <>
      <Input.TextArea
        value={value}
        spellCheck={false}
        placeholder={placeholder}
        readOnly={readonly}
        onChange={handleChange}
        onBlur={onBlur}
        className={cn(size, 'beautify-scrollbar', txtAreaWrapper)}
      />
    </>
  );
};

export default AuthInput;
