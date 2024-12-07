import { Select, Switch } from 'antd';
import { REQUEST_METHOD } from '@constants/request';
import { useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import { css } from '@emotion/css';
import produce from 'immer';
import { emitGlobal } from '@subjects/global';

const Universal = () => {
  const universal = useSelector((store: any) => store?.user?.settings?.universal);
  const computedMethods = Object.keys(REQUEST_METHOD).map((item) => ({ label: item, value: item }));
  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(universal, (draft) => {
      draft[key] = newVal;
    });
    emitGlobal('USER/SETTINGS/updateSettings', {
      key: 'universal',
      value: result,
    });
  });

  return (
    <div>
      <div className="case-item">
        <div className="item-name">新建接口默认请求Method</div>
        <div className="item-values">
          <Select
            value={universal?.default_createn_method}
            options={computedMethods}
            placement="bottomRight"
            popupClassName={css`
              width: 110px !important;
            `}
            onChange={handleChange.bind(null, 'default_createn_method')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">鼠标中箭点击自动关闭页签</div>
        <div className="item-values">
          <Switch
            value={universal?.use_quick_close === 1}
            onChange={(checked) => {
              handleChange('use_quick_close', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">是否自动下载最新补丁</div>
        <div className="item-values">
          <Switch
            value={universal?.auto_download_updates === 1}
            onChange={(checked) => {
              handleChange('auto_download_updates', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">
          <div>是否加入开发体验计划</div>
          <span className="item-name-desc">协助我们收集异常数据，以便为您提供更友好的使用体验</span>
        </div>
        <div className="item-values">
          <Switch
            value={universal?.auto_send_err_message === 1}
            onChange={(checked) => {
              handleChange('auto_send_err_message', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">未保存的页签关闭时是否需要二次确认</div>
        <div className="item-values">
          <Switch
            value={universal?.ask_closing_unsaved_tabs === 1}
            onChange={(checked) => {
              handleChange('ask_closing_unsaved_tabs', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Universal;
