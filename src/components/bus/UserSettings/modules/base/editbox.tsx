import { useMemoizedFn, useSafeState } from 'ahooks';
import { Input, message, Modal, Select } from 'antd';
import { isString } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '@reducers/user/info';
import { TITLE_DATAS } from './constants';
import { css } from '@emotion/css';
import { getUserID } from '@utils/uid';
import { updateMyProfile } from '@bll/users';

type Props = {
  title: string;
  type: string;
  data: string;
  onClose: () => void;
  template?: 'input' | 'textarea' | 'select';
};

const EditBox: React.FC<Props> = (props) => {
  const { title, type, data, onClose, template = 'input' } = props;
  const dispatch = useDispatch();

  const [text, setText] = useSafeState(null);

  useEffect(() => {
    setText(data);
  }, [data]);

  const handleSave = useMemoizedFn(() => {
    const user_id = getUserID();
    updateMyProfile(user_id, {
      [type]: text,
    }).subscribe((resp) => {
      if (resp.code !== 10000) {
        message.error(resp.message);
        return;
      }
      dispatch(updateUserInfo({ [type]: text }));
      onClose();
    });
  });

  const computedTitleOptions = useMemo(() => {
    return Object.entries(TITLE_DATAS).map(([value, label]) => ({ value, label }));
  }, [TITLE_DATAS]);

  return (
    <Modal
      width={300}
      title={title}
      open={isString(type)}
      onClose={onClose}
      onCancel={onClose}
      onOk={handleSave}
    >
      {template === 'input' && (
        <Input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      )}
      {template === 'textarea' && (
        <Input.TextArea
          value={text}
          style={{ resize: 'none' }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      )}
      {template === 'select' && (
        <Select
          className={css({
            width: '100% !important',
          })}
          options={computedTitleOptions}
          value={text}
          style={{ resize: 'none' }}
          onChange={(e) => {
            setText(e);
          }}
        />
      )}
    </Modal>
  );
};

export default EditBox;
