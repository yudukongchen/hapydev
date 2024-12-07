import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './main';
import InvitePage from './invite';
import RegisterPage from './register';

const MainWrapperPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route key="invite" path="invite" element={<InvitePage />} />
        <Route key="register" path="register/*" element={<RegisterPage />} />
        <Route key="project" path="project/:project_id" element={<MainPage />} />
        <Route key="init" path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainWrapperPage;
