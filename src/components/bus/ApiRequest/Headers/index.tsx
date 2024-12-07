import React from 'react';
import DataTable from '../DataTable';
import { useMemoizedFn, useSafeState } from 'ahooks';
import produce from 'immer';
import { headersWrapper } from './style';
import SysHeaders from './SysHeaders';
import { Button } from 'antd';
import SvgEye from '@assets/icons/eye.svg?react';
import SvgEyeSlash from '@assets/icons/eye-slash.svg?react';
import useProjectInfo from '@hooks/useProjectInfo';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};

const Header: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const [showSysHeader, setShowSysHeader] = useSafeState(false);
  const projectInfo = useProjectInfo();
  const handleChange = useMemoizedFn((key, newVal) => {
    if (projectInfo?.role !== 6) {
      return;
    }
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <div className={headersWrapper}>
      <div className="case-title">
        <span>Headers</span>
        <Button
          type="text"
          size="small"
          style={{ marginLeft: 20, fontSize: 12, float: 'right' }}
          icon={showSysHeader ? <SvgEye /> : <SvgEyeSlash />}
          onClick={() => {
            setShowSysHeader(!showSysHeader);
          }}
        >
          系统Header
        </Button>
      </div>
      {showSysHeader && (
        <div style={{ marginBottom: 10 }}>
          <SysHeaders value={value?.sys_header} onChange={handleChange.bind(null, 'sys_header')} />
        </div>
      )}
      <DataTable value={value?.parameter} onChange={handleChange.bind(null, 'parameter')} />
    </div>
  );
};

export default React.memo(Header);
