import { useMemoizedFn } from 'ahooks';
import { Checkbox, Input, InputNumber, Space, Switch } from 'antd';
import produce from 'immer';
import ProxyAuth from './proxyAuth';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};
const CustomProxy: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });

    onChange(result);
  });

  return (
    <>
      <div className="case-item">
        <div className="item-name">是否使用自定义代理</div>
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
        <>
          <div className="case-item">
            <div className="item-name">代理类型</div>
            <div className="item-values">
              <Checkbox.Group
                options={['HTTP', 'HTTPS']}
                value={value?.proxy_type ?? []}
                onChange={handleChange.bind(null, 'proxy_type')}
              ></Checkbox.Group>
            </div>
          </div>
          <div className="case-item">
            <div className="item-name">代理地址</div>
            <div className="item-values">
              <Space direction="horizontal">
                <Input
                  size="small"
                  spellCheck={false}
                  value={value?.proxy_url ?? ''}
                  onChange={(e) => {
                    handleChange('proxy_url', e.target.value);
                  }}
                />
                <span>:</span>
                <InputNumber
                  spellCheck={false}
                  size="small"
                  style={{ width: 80 }}
                  value={value?.proxy_port ?? ''}
                  onChange={(port) => {
                    handleChange('proxy_port', port);
                  }}
                />
              </Space>
            </div>
          </div>
          <div className="case-item">
            <div className="item-name">
              <div>Proxy bypass</div>
              <span className="item-name-desc">输入逗号分隔的主机以绕过代理设置。</span>
            </div>
            <div className="item-values">
              <Input.TextArea
                spellCheck={false}
                style={{ width: 200 }}
                value={value?.proxy_bypass ?? ''}
                onChange={(e) => {
                  handleChange('proxy_bypass', e.target.value);
                }}
              />
            </div>
          </div>
          <ProxyAuth value={value?.auth} onChange={handleChange.bind(null, 'auth')} />
        </>
      )}
    </>
  );
};

export default CustomProxy;
