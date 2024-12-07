import { theme } from 'antd';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './register-form';
import ForgetPassword from './forget-password';
import NewPassword from './new-password';

const RegisterMain = () => {
  const { token } = theme.useToken();

  return (
    <>
      <Routes>
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="new-password" element={<NewPassword />} />
        <Route path="*" element={<RegisterForm />} />
      </Routes>
    </>
  );
};
export default RegisterMain;
