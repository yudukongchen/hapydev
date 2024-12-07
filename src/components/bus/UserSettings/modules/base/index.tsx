import { Avatar, Button, Select, theme } from 'antd';
import { BaseWrapper } from './style';
import { TITLE_DATAS } from './constants';
import { useSelector } from 'react-redux';
import Avator from './avatar';
import Editbox from './editbox';
import { useSafeState } from 'ahooks';
import { isString } from 'lodash';
import useUserInfo from '@hooks/modules/useUserInfo';

type EditProps = {
  title: string;
  type: string;
  data: string;
  onClose?: () => void;
  template?: 'input' | 'textarea' | 'select';
};

const About = () => {
  const { token } = theme.useToken();
  const userInfo = useUserInfo();

  const [edit, setEdit] = useSafeState<EditProps>({
    title: null,
    type: null,
    data: null,
  });

  const handleClose = () => {
    setEdit({ title: null, type: null, data: null });
  };

  return (
    <BaseWrapper token={token}>
      <Editbox
        onClose={handleClose}
        title={edit?.title}
        type={edit?.type}
        data={edit?.data}
        template={edit?.template}
      />
      <Avator userInfo={userInfo} />
      <div className="form-item">
        <div className="case-title">昵称</div>
        <div className="case-value">{userInfo?.nick_name ?? '-'}</div>
        <div className="btns">
          <Button
            size="small"
            onClick={() => {
              setEdit({
                title: '修改昵称',
                type: 'nick_name',
                data: userInfo?.nick_name ?? '',
              });
            }}
          >
            修改
          </Button>
        </div>
      </div>
      <div className="form-item">
        <div className="case-title">联系电话</div>
        <div className="case-value">{userInfo?.contact_number ?? '-'}</div>
        <div className="btns">
          <Button
            size="small"
            onClick={() => {
              setEdit({
                title: '修改联系电话',
                type: 'contact_number',
                data: userInfo?.contact_number ?? '',
              });
            }}
          >
            修改
          </Button>
        </div>
      </div>
      <div className="form-item">
        <div className="case-title">所在地区</div>
        <div className="case-value">{userInfo?.location ?? '-'}</div>
        <div className="btns">
          <Button
            size="small"
            onClick={() => {
              setEdit({
                title: '修改所在地区',
                type: 'location',
                data: userInfo?.location ?? '',
              });
            }}
          >
            修改
          </Button>
        </div>
      </div>
      <div className="form-item">
        <div className="case-title">职业</div>
        <div className="case-value">
          {isString(userInfo?.profession) ? TITLE_DATAS?.[userInfo?.profession] : '-'}
        </div>
        <div className="btns">
          <Button
            size="small"
            onClick={() => {
              setEdit({
                title: '修改职业',
                type: 'profession',
                data: userInfo?.profession ?? '',
                template: 'select',
              });
            }}
          >
            修改
          </Button>
        </div>
      </div>
      <div className="form-item">
        <div className="case-title">个人简介</div>
        <div className="case-value">{userInfo?.description ?? '-'}</div>
        <div className="btns">
          <Button
            size="small"
            onClick={() => {
              setEdit({
                title: '修改个人简介',
                type: 'description',
                data: userInfo?.description ?? '',
                template: 'textarea',
              });
            }}
          >
            修改
          </Button>
        </div>
      </div>
    </BaseWrapper>
  );
};
export default About;
