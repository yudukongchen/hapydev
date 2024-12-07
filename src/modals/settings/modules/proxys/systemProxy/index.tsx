import { useMemoizedFn } from 'ahooks';
import { Switch } from 'antd';
import produce from 'immer';
import Auth from './auth';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};
const SystemProxy: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });

    onChange(result);
  });

  return (
    <>
      <Auth value={value?.auth} onChange={handleChange.bind(null, 'auth')} />
      <div className="cate-title mtop-20">接口请求代理配置</div>
      <div className="cate-title-desc">仅应用于发送接口请求，不会应用于连接 Hapydev 服务器。</div>
      <div className="case-item">
        <div className="item-name">是否使用系统代理</div>
        <div className="item-values">
          <Switch
            value={value?.is_used === 1}
            onChange={(checked) => {
              handleChange('is_used', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
      {value?.is_used === 1 && (
        <div className="case-item">
          <div className="item-name">使用HTTP_PROXY、HTTPS_PROXY和NO_PROXY环境变量</div>
          <div className="item-values">
            <Switch
              value={value?.env_first === 1}
              onChange={(checked) => {
                handleChange('env_first', checked ? 1 : -1);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SystemProxy;
