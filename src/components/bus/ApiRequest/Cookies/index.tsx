import React from 'react';
import DataTable from '../DataTable';
import { cookiesWrapper } from './style';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};

const Cookies: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  return (
    <div className={cookiesWrapper}>
      <div className="case-title">
        <span>Cookies</span>
      </div>
      <DataTable value={value} onChange={onChange} />
    </div>
  );
};

export default Cookies;
