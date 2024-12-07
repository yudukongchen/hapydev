import { theme } from 'antd';
import { BaseWrapper } from './style';
import { useSelector } from 'react-redux';
import PhoneItem from './phone';
import EmailItem from './email';
import PasswordItem from './password';
import DeleteItem from './delete';
import useUserInfo from '@hooks/modules/useUserInfo';

const About = (props) => {
  const { onClose } = props;
  const { token } = theme.useToken();

  const userInfo = useUserInfo();

  return (
    <BaseWrapper token={token}>
      <PhoneItem userInfo={userInfo} />
      <EmailItem userInfo={userInfo} />
      <PasswordItem userInfo={userInfo} />
      <DeleteItem onClose={onClose} />
    </BaseWrapper>
  );
};
export default About;
