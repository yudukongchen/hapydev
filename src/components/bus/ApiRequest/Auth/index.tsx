import React from 'react';
import cn from 'classnames';
import { authWrapper } from './style';
import Auth from '@components/bus/Auth';
import { IAuth } from '#types/auth';

type Props = {
  value: IAuth;
  onChange: (newVal: IAuth) => void;
};

const AuthPage: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  return (
    <Auth value={value} onChange={onChange} className={cn('beautify-scrollbar', authWrapper)} />
  );
};

export default AuthPage;
