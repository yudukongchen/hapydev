import { Suspense, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, ThemeConfig } from 'antd';
import { Provider, useSelector } from 'react-redux';
import Lazyloading from './components/bus/LazyLoading';
import store from './store/index';
import 'reset-css';
import AppPage from './pages/app';
import './locales';
import { getGlobalTheme } from './theme';
import './theme/style.less';
import zhCN from 'antd/locale/zh_CN';

const Application = () => {
  const text_color = useSelector((store: any) => store?.user?.settings?.base?.text_color);
  const program_theme = useSelector((store: any) => store?.user?.settings?.base?.program_theme);

  const globalTheme: ThemeConfig = useMemo(() => {
    return getGlobalTheme(text_color, program_theme);
  }, [text_color, program_theme]);

  return (
    <ConfigProvider locale={zhCN} theme={globalTheme}>
      <Suspense fallback={<Lazyloading />}>
        <AppPage />
      </Suspense>
    </ConfigProvider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Application />
  </Provider>
);
