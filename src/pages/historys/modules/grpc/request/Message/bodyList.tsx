import React, { useRef } from 'react';
import { BodyListWarpper } from './style';
import cn from 'classnames';
import { Button, Dropdown, Input, theme } from 'antd';
import SvgAdd from '@assets/icons/add.svg?react';
import SvgRight from '@assets/icons/angle-right.svg?react';
import SvgMore from '@assets/icons/more.svg?react';
import { ACTION_LIST } from './constants';
import { useMemoizedFn, useSafeState } from 'ahooks';
import produce from 'immer';
import { isObject } from 'lodash';
import { GrpcMessage } from '#types/collection/grpc';

type Props = {
  value: GrpcMessage[];
  onChange: (newVal: GrpcMessage[]) => void;
  activeIndex: number;
  onActiveChange: (index: number) => void;
  onCollapse: () => void;
};

const BodyList: React.FC<Props> = (props) => {
  const { value, onChange, activeIndex, onActiveChange, onCollapse } = props;

  const [editIndex, setEditIndex] = useSafeState(null);
  const refInput = useRef(null);
  const { token } = theme.useToken();

  const handleChangeTitle = useMemoizedFn((index) => {
    const newTitle = refInput.current?.input?.value ?? '';
    const result = produce(value, (draft) => {
      draft[index].title = newTitle;
    });
    onChange(result);
    setTimeout(() => {
      setEditIndex(null);
    }, 0);
  });

  const handleCreateNewBody = () => {
    const data: GrpcMessage = {
      title: '新建消息',
      mode: 'text',
      raw: '',
    };
    const result = produce(value, (draft) => {
      draft.push(data);
    });
    onChange(result);
    setEditIndex(result.length - 1);
    setTimeout(() => {
      refInput.current.input.value = '新建消息';
      refInput.current.focus();
      onActiveChange(result.length - 1);
    }, 0);
  };

  const handleDelete = useMemoizedFn((index) => {
    const result = produce(value, (draft) => {
      draft.splice(index, 1);
    });
    if (result.length === 0) {
      return;
    }
    if (activeIndex === index) {
      setTimeout(() => {
        onActiveChange(0);
      }, 0);
    }
    onChange(result);
  });

  const handleCopy = useMemoizedFn((index) => {
    const cpItem = value?.[index];
    if (!isObject(cpItem)) {
      return;
    }
    const result = produce(value, (draft) => {
      draft.push(cpItem);
    });
    onChange(result);
    setEditIndex(result.length - 1);
    setTimeout(() => {
      refInput.current.input.value = cpItem.title;
      refInput.current.focus();
    }, 0);
  });

  const handleClick = useMemoizedFn((index: number, { key, domEvent }) => {
    if (key === 'modify') {
      setTimeout(() => {
        setEditIndex(index);
        const title = value?.[index]?.title;
        refInput.current.input.value = title ?? '';
        refInput.current.focus();
      }, 0);
      return;
    }
    if (key === 'delete') {
      handleDelete(index);
      return;
    }
    if (key === 'copy') {
      handleCopy(index);
      return;
    }
  });

  return (
    <BodyListWarpper token={token}>
      <div className="body-headers">
        <div className="header-title">消息模版</div>
        <div className="btns-panel">
          <Button icon={<SvgAdd />} type="text" size="small" onClick={handleCreateNewBody} />
          <Button icon={<SvgRight />} type="text" size="small" onClick={onCollapse} />
        </div>
      </div>
      <div className="list-panel beautify-scrollbar">
        {value.map((item, index) => (
          <div
            key={index}
            className={cn('list-item', {
              active: activeIndex === index,
            })}
          >
            {editIndex === index ? (
              <Input
                spellCheck={false}
                className="txt-box"
                size="small"
                defaultValue={item?.title}
                onBlur={handleChangeTitle.bind(null, index)}
                ref={refInput}
              />
            ) : (
              <div
                onClick={() => {
                  onActiveChange(index);
                }}
                className="title"
              >
                {item?.title}
              </div>
            )}
            <Dropdown
              menu={{
                onClick: handleClick.bind(null, index),
                items: ACTION_LIST,
              }}
            >
              <Button icon={<SvgMore />} type="text" size="small" />
            </Dropdown>
          </div>
        ))}
      </div>
    </BodyListWarpper>
  );
};
export default BodyList;
