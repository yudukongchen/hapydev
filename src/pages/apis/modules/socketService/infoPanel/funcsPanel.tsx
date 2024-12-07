import React from 'react';
import { Input, Select, InputNumber, AutoComplete } from 'antd';
import { useMemoizedFn } from 'ahooks';
import {
  END_CHAR_LIST,
  SYS_SOCKET_SERVICE_FUNCS,
  SYS_SOCKET_SERVICE_OPTION_NAMES,
} from './constants';
import produce from 'immer';
import { isPlainObject } from 'lodash';
import { SocketServiceRequest } from '#types/collection/socketService';
import { IFunction } from '#types/collection/socketClient';

type Props = {
  value: SocketServiceRequest;
  onChange: (newVal: SocketServiceRequest) => void;
};

const FuncsPanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const funcDatas: { [key: string]: IFunction } = { ...SYS_SOCKET_SERVICE_FUNCS };
  const handleChangeFunc = useMemoizedFn((key: 'name' | 'params', newVal: any) => {
    const newData = produce(value, (draft) => {
      if (!isPlainObject(draft?.receive_complete_func)) {
        draft.receive_complete_func = {
          name: 'none',
          params: undefined,
        };
      }
      if (key === 'name') {
        draft.receive_complete_func.name = newVal;
        draft.receive_complete_func.params = funcDatas?.[newVal]?.params;
      }
      if (key === 'params') {
        draft.receive_complete_func.params = newVal;
      }
    });
    onChange(newData);
  });

  const renderOptionItem = (optionInfo) => {
    if (optionInfo === 'endedChar') {
      return (
        <>
          <div className="info-item">
            <span className="info-title">{SYS_SOCKET_SERVICE_OPTION_NAMES?.[optionInfo]}</span>
            <AutoComplete
              options={END_CHAR_LIST}
              value={value?.receive_complete_func?.params}
              onChange={handleChangeFunc.bind(null, 'params')}
            />
          </div>
        </>
      );
    } else if (['endedHexChar'].includes(optionInfo)) {
      return (
        <>
          <div className="info-item">
            <span className="info-title">{SYS_SOCKET_SERVICE_OPTION_NAMES?.[optionInfo]}</span>
            <Input
              className="txtbox-item"
              spellCheck={false}
              value={value?.receive_complete_func?.params}
              maxLength={200}
              onChange={(e) => {
                handleChangeFunc('params', e.target.value);
              }}
            />
          </div>
        </>
      );
    } else if (['endedHeaderByteLength', 'endedContentByteLength'].includes(optionInfo)) {
      return (
        <>
          <div className="info-item">
            <span className="info-title">{SYS_SOCKET_SERVICE_OPTION_NAMES?.[optionInfo]}</span>
            <InputNumber
              className="txtbox-item"
              spellCheck={false}
              value={value?.receive_complete_func?.params}
              maxLength={200}
              onChange={handleChangeFunc.bind(null, 'params')}
            />
          </div>
        </>
      );
    }
    return null;
    //  return <div className="info-item"></div>;
  };

  const Options = Object.values(SYS_SOCKET_SERVICE_FUNCS).map((item) => ({
    label: item.title,
    value: item.id,
  }));

  return (
    <>
      <div className="info-item">
        <span className="info-title">判断报文接收完成</span>
        <Select
          className="select-item"
          options={Options}
          value={value?.receive_complete_func?.name || 'none'}
          onChange={handleChangeFunc.bind(null, 'name')}
        ></Select>
      </div>
      {renderOptionItem(value?.receive_complete_func?.name || 'none')}
    </>
  );
};

export default FuncsPanel;
