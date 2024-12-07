import { getAssertsPath } from '@utils/utils';
import { Avatar, Button, message, Upload } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '@reducers/user/info';
import useFileUpload from '@hooks/useFileUpload';
import { updateMyProfile } from '@bll/users';

type Props = {
  userInfo: any;
};
const Avator: React.FC<Props> = (props) => {
  const { userInfo } = props;

  const dispatch = useDispatch();

  const { customRequest } = useFileUpload({
    file_name: userInfo.uid,
    onOk(url) {
      updateMyProfile(userInfo.uid, {
        avatar: url,
      }).subscribe((resp) => {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        dispatch(
          updateUserInfo({
            avatar: url,
          })
        );
      });
    },
  });

  return (
    <div className="form-item">
      <div className="case-title">头像</div>
      <div className="case-value">
        <Avatar src={getAssertsPath(userInfo?.avatar)}></Avatar>
      </div>
      <div className="btns">
        <Upload fileList={[]} customRequest={customRequest}>
          <Button size="small">修改</Button>
        </Upload>
      </div>
    </div>
  );
};

export default Avator;
