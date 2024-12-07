import { Button } from 'antd';
import EnvModal from './modal';
import React, { useMemo } from 'react';
import { useSafeState } from 'ahooks';
import useEnvs from '@hooks/modules/useEnvs';
import { isPlainObject } from 'lodash';

type Props = {
  value: any;
  onChange: (newVal) => void;
};
const Envs: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const [open, setOpen] = useSafeState(false);
  const { envDatas } = useEnvs();

  const computedEnvNames = useMemo(() => {
    const result = [];
    value?.env_ids.forEach((env_id) => {
      result.push(envDatas?.[env_id]?.name);
    });
    return result;
  }, [envDatas, value?.env_ids]);

  const handleClose = (result) => {
    if (isPlainObject(result)) {
      onChange(result);
    }
    setOpen(false);
  };
  return (
    <>
      <EnvModal value={value} open={open} onClose={handleClose} />
      <div className="item-case">
        <div className="item-left">
          <div className="case-name">运行环境</div>
          <div className="case-desc">{computedEnvNames?.join(',')}</div>
        </div>
        <div className="item-right">
          <Button onClick={setOpen.bind(null, true)}>编辑</Button>
        </div>
      </div>
    </>
  );
};

export default Envs;
