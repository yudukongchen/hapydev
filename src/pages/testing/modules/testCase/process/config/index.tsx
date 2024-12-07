import { Testing } from '#types/testing';
import { Button, Checkbox, Input, InputNumber, Select, Tooltip, theme } from 'antd';
import { OptionsWrapper } from './style';
import Enviroment from '@components/bus/Enviroment';
import React, { ChangeEvent, useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import SvgQuesstion from '@assets/icons/question-circle.svg?react';
import SvgArrowRight from '@assets/icons/arrow-right.svg?react';
import { EXCEPTION_HANDLER_OPTIONS } from './constants';
import { emitProxy } from '@subjects/proxy';
import { isUndefined } from 'lodash';

type Props = {
  value: Testing;
  onChange: (newVal: Testing) => void;
  onSave: () => void;
};
const Options: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;
  const { token } = theme.useToken();

  const testingConfig = value?.data?.config;

  const handleChangeName = useMemoizedFn((e: ChangeEvent<HTMLInputElement>) => {
    const result = produce(value, (draft) => {
      draft.name = e.target.value;
    });
    onChange(result);
  });

  const handleChangeConfig = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      if (isUndefined(draft.data.config)) {
        return;
      }
      draft.data.config[key] = newVal;
    });
    onChange(result);
  });

  const iterationDataOptions = useMemo(() => {
    const result = value?.data?.iteration_data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    const NULL_OPTION = { label: '不使用测试数据', value: null };
    return [NULL_OPTION].concat(result);
  }, [value.data.iteration_data]);

  //执行测试用例
  const handleExecute = useMemoizedFn(() => {
    emitProxy('PROXYS/sendTestingRequest', value);
  });

  return (
    <OptionsWrapper token={token} className="beautify-scrollbar">
      <div className="case-title">用例名称</div>
      <Input className="env-item" value={value.name} onChange={handleChangeName} />
      <div className="case-title">运行环境</div>
      <Enviroment
        className="env-item"
        value={testingConfig?.env_id}
        onChange={handleChangeConfig.bind(null, 'env_id')}
      />
      <div className="case-title">测试数据</div>
      <Select
        className="case-item"
        options={iterationDataOptions}
        value={testingConfig?.iteration_data_id}
        onChange={handleChangeConfig.bind(null, 'iteration_data_id')}
      />
      <div className="case-title">
        <span>遇到错误处理</span>
        <Tooltip title="包含断言错误、数据格式校验错误、服务器错误等情况">
          <Button type="text" shape="circle" size="small" icon={<SvgQuesstion />}></Button>
        </Tooltip>
      </div>
      <Select
        className="case-item"
        options={EXCEPTION_HANDLER_OPTIONS}
        value={testingConfig?.exception_handler}
        onChange={handleChangeConfig.bind(null, 'exception_handler')}
      />
      <div className="split-items">
        <div className="form-item">
          <div className="case-title">
            执行次数
            <Tooltip title="循环运行所有步骤的次数">
              <Button type="text" shape="circle" size="small" icon={<SvgQuesstion />}></Button>
            </Tooltip>
          </div>
          <InputNumber
            className="case-item"
            addonAfter="次"
            min={0}
            value={testingConfig?.execute_count}
            onChange={handleChangeConfig.bind(null, 'execute_count')}
          />
        </div>
        <div className="form-item">
          <div className="case-title">
            执行间隔
            <Tooltip title="一个步骤运行完后，停顿一段时间，再运行下一个步骤">
              <Button type="text" shape="circle" size="small" icon={<SvgQuesstion />}></Button>
            </Tooltip>
          </div>
          <InputNumber
            className="case-item"
            addonAfter="毫秒"
            min={0}
            value={testingConfig?.interval_time}
            onChange={handleChangeConfig.bind(null, 'interval_time')}
          />
        </div>
      </div>
      <div className="ckb-items">
        <Checkbox
          checked={testingConfig?.enable_sandbox === 1}
          onChange={(e) => {
            handleChangeConfig('enable_sandbox', e.target.checked === true ? 1 : -1);
          }}
        >
          沙盒模式
        </Checkbox>
        <Tooltip title="开启沙盒模式后，执行过程中不会影响环境中的变量和全局变量">
          <Button type="text" shape="circle" size="small" icon={<SvgQuesstion />}></Button>
        </Tooltip>
      </div>
      <div className="ckb-items">
        <Checkbox
          checked={testingConfig?.save_cookies === 1}
          onChange={(e) => {
            handleChangeConfig('save_cookies', e.target.checked === true ? 1 : -1);
          }}
        >
          保存cookies
        </Checkbox>
      </div>

      <div className="split-items">
        <Button
          onClick={handleExecute}
          className="form-item"
          type="primary"
          icon={<SvgArrowRight />}
        >
          运行
        </Button>
        <Button onClick={onSave} className="form-item">
          保存
        </Button>
      </div>
    </OptionsWrapper>
  );
};
export default Options;
