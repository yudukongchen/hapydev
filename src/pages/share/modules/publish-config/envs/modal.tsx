import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Checkbox, Modal, theme } from 'antd';
import produce from 'immer';
import React, { useEffect, useMemo } from 'react';
import { EnvSelectWrapper } from './style';
import cn from 'classnames';
import { isNull, isPlainObject, isUndefined } from 'lodash';
import { PublishConfig } from '#types/share';
import useEnvs from '@hooks/modules/useEnvs';

type Props = {
  value: PublishConfig;

  open: boolean;
  onClose: (result: null | PublishConfig) => void;
};
const EnvSelect: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;

  const { token } = theme.useToken();
  const { envList, envDatas } = useEnvs();
  const [checkeds, setCkeckeds] = useSafeState({});
  const [defaultId, setDefaultId] = useSafeState(null);

  useEffect(() => {
    const result = {};
    value?.env_ids.forEach((key) => {
      if (isPlainObject(envDatas?.[key])) {
        result[key] = true;
      }
    });
    setCkeckeds(result);
    setDefaultId(value?.default_env_id);
  }, [value]);

  const handleChangeCkecked = useMemoizedFn((id, ckd) => {
    const result = produce(checkeds, (draft) => {
      if (ckd === true) {
        draft[id] = true;
      } else {
        delete draft[id];
      }
    });
    setCkeckeds(result);
  });

  const computedDefaultEnvId = useMemo(() => {
    if (isNull(defaultId) || checkeds?.[defaultId] !== true) {
      return 'default';
    }
    return defaultId;
  }, [checkeds, defaultId]);

  const handleSetDefault = useMemoizedFn((id) => {
    setDefaultId(id);
    if (isUndefined(checkeds[id])) {
      const result = produce(checkeds, (draft) => {
        draft[id] = true;
      });
      setCkeckeds(result);
    }
  });

  const handleOk = useMemoizedFn(() => {
    const result = produce(value, (draft) => {
      draft.env_ids = Object.keys(checkeds);
      draft.default_env_id = defaultId;
    });
    onClose(result);
  });

  return (
    <Modal
      destroyOnClose
      width={450}
      title="运行环境"
      open={open}
      onCancel={onClose.bind(null, null)}
      onOk={handleOk}
    >
      <EnvSelectWrapper token={token} className="beautify-scrollbar">
        {envList?.map((item, index) => (
          <div className="env-item" key={index}>
            <Checkbox
              value={item?.env_id}
              checked={checkeds?.[item?.env_id] === true}
              onChange={(e) => {
                handleChangeCkecked(item?.env_id, e.target.checked);
              }}
            >
              {item?.name}
            </Checkbox>
            <Button
              className={cn('btn', {
                default: item?.env_id === computedDefaultEnvId,
              })}
              size="small"
              type="text"
              onClick={handleSetDefault.bind(null, item?.env_id)}
            >
              默认
            </Button>
          </div>
        ))}
      </EnvSelectWrapper>
    </Modal>
  );
};

export default EnvSelect;
