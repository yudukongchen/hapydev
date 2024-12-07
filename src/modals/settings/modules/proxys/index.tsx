import { theme } from 'antd';
import { ProxysWrapper } from './style';
import { useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import SystemProxy from './systemProxy';
import CustomProxy from './customProxy';
import produce from 'immer';
import { emitGlobal } from '@subjects/global';

const Proxys = () => {
  const proxy = useSelector((store: any) => store?.user?.settings?.proxy);

  const { token } = theme.useToken();

  const handleChange = useMemoizedFn((key, newVal) => {
    const newProxy = produce(proxy, (draft) => {
      draft[key] = newVal;
    });
    emitGlobal('USER/SETTINGS/updateSettings', {
      key: 'proxy',
      value: newProxy,
    });
  });

  return (
    <ProxysWrapper token={token}>
      <div className="cate-title">默认代理配置</div>
      <div className="cate-title-desc">
        默认情况下使用系统的代理配置来连接到任何在线服务，或发送API请求
      </div>
      <SystemProxy value={proxy?.system} onChange={handleChange.bind(null, 'system')} />
      <CustomProxy value={proxy?.custom} onChange={handleChange.bind(null, 'custom')} />
    </ProxysWrapper>
  );
};
export default Proxys;
