import { emitGlobal } from '@subjects/global';
import { useMemoizedFn } from 'ahooks';
import { InputNumber, Switch } from 'antd';
import produce from 'immer';
import { useSelector } from 'react-redux';

const Http = () => {
  const http = useSelector((store: any) => store?.user?.settings?.http);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(http, (draft) => {
      draft[key] = newVal;
    });
    emitGlobal('USER/SETTINGS/updateSettings', {
      key: 'http',
      value: result,
    });
  });
  return (
    <div>
      <div className="case-item">
        <div className="item-name">接口默认请求超时时间</div>
        <div className="item-values">
          <InputNumber
            style={{ width: 120 }}
            spellCheck={false}
            value={http?.timeout ?? '0'}
            onChange={handleChange.bind(null, 'timeout')}
            addonAfter="ms"
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">自动跟随重定向</div>
        <div className="item-values">
          <Switch
            value={http?.follow_redirect === 1}
            onChange={(checked) => {
              handleChange('follow_redirect', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">最大自动跟随重定向次数</div>
        <div className="item-values">
          <InputNumber
            style={{ width: 60 }}
            spellCheck={false}
            value={http?.max_requst_loop ?? '0'}
            min={0}
            step={1}
            onChange={handleChange.bind(null, 'max_requst_loop')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">是否自动将参数转换成Mock变量</div>
        <div className="item-values">
          <Switch
            value={http?.auto_convert_field_to_mock === 1}
            onChange={(checked) => {
              handleChange('auto_convert_field_to_mock', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">发送数据JSON化</div>
        <div className="item-values">
          <Switch
            value={http?.auto_request_param_to_json === 1}
            onChange={(checked) => {
              handleChange('auto_request_param_to_json', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Http;
