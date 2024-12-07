import { ProcessItem } from '#types/testing';
import { Button, Checkbox, Drawer, theme, Tooltip } from 'antd';
import React, { useEffect, useMemo } from 'react';
import Header from './header';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { DEFAULT_FILTER } from './constants';
import ApiList from './api-list';
import useTreeDatas from './hooks/useTreeDatas';
import { ApiSelectWrapper, FooterWrapper } from './style';
import SvgQuesstion from '@assets/icons/question-circle.svg?react';
import { cloneDeep, isArray, isPlainObject, isUndefined } from 'lodash';
import produce from 'immer';
import { DEFAULT_API_DATA } from '../constants';
import { v4 as uuidV4 } from 'uuid';
import { ApiCollection } from '#types/collection/api';

type Props = {
  parent_id: string;
  open: boolean;
  onClose: () => void;
  value: ProcessItem[];
  onChange: (newVal: ProcessItem[]) => void;
};
const ApiSelect: React.FC<Props> = (props) => {
  const { token } = theme.useToken();
  const { parent_id = '0', open, onClose, value, onChange } = props;
  const [filter, setFilter] = useSafeState(DEFAULT_FILTER);
  const [ckeckeds, setCheckeds] = useSafeState([]);
  const { treeDatas, apiDatas } = useTreeDatas({ filter });

  const computedSelectCount = useMemo(() => {
    const result = [];
    ckeckeds.forEach((item) => {
      if (!isUndefined(apiDatas[item])) {
        result.push(true);
      }
    });
    return result.length;
  }, [apiDatas, ckeckeds]);

  const handleCheckAll = useMemoizedFn(() => {
    const allKeys = Object.keys(apiDatas);
    setCheckeds(allKeys);
  });
  const handleChangeFilter = (newData) => {
    setCheckeds([]);
    setTimeout(() => {
      setFilter(newData);
    }, 0);
  };

  useEffect(() => {
    if (!open) {
      return;
    }
    setFilter(DEFAULT_FILTER);
    setCheckeds([]);
  }, [open]);

  const handleCopyItems = useMemoizedFn(() => {
    const selectedList: ApiCollection[] = ckeckeds
      ?.map((key) => apiDatas?.[key])
      ?.filter((item) => isPlainObject(item));
    if (!isArray(selectedList)) {
      return;
    }
    const result = produce(value, (draft) => {
      selectedList.forEach((item) => {
        const newItem = cloneDeep(DEFAULT_API_DATA);
        newItem.id = uuidV4();
        newItem.parent_id = parent_id;
        newItem.data.api_id = item.id;
        newItem.data.is_link = -1;
        newItem.data.request = item?.data?.request;
        draft.push(newItem);
      });
    });
    onChange(result);
    onClose();
  });

  const handleLinkItems = useMemoizedFn(() => {
    const selectedList: ApiCollection[] = ckeckeds
      .map((key) => apiDatas?.[key])
      .filter((item) => isPlainObject(item));
    if (!isArray(selectedList)) {
      return;
    }

    const result = produce(value, (draft) => {
      selectedList.forEach((item) => {
        const newItem = cloneDeep(DEFAULT_API_DATA);
        newItem.id = uuidV4();
        newItem.parent_id = parent_id;
        newItem.data.api_id = item.id;
        draft.push(newItem);
      });
    });
    onChange(result);
    onClose();
  });

  return (
    <Drawer
      destroyOnClose
      width={500}
      open={open}
      title="从接口导入"
      onClose={onClose}
      footer={
        <FooterWrapper>
          <Tooltip
            title={
              <ul>
                <li>1. 复制添加后，接口管理的数据跟自动化测试的数据保持互相独立</li>
                <li>2. 引用添加后，接口管理的数据跟自动化测试的数据保持一致</li>
              </ul>
            }
          >
            <Button icon={<SvgQuesstion />} type="link"></Button>
          </Tooltip>
          <Button onClick={handleCopyItems}>复制添加</Button>
          <Button onClick={handleLinkItems} type="primary">
            引用添加
          </Button>
        </FooterWrapper>
      }
    >
      <ApiSelectWrapper token={token}>
        <Header value={filter} onChange={handleChangeFilter} />
        <div className="check-panel">
          <Checkbox
            onChange={(e) => {
              if (e.target.checked === true) {
                handleCheckAll();
                return;
              }
              setCheckeds([]);
            }}
            checked={
              computedSelectCount > 0 && computedSelectCount === Object.keys(apiDatas).length
            }
          >
            已选择<span className="count">{computedSelectCount}</span>条接口数据
          </Checkbox>
        </div>
        <ApiList treeDatas={treeDatas} ckeckeds={ckeckeds} setCheckeds={setCheckeds} />
      </ApiSelectWrapper>
    </Drawer>
  );
};

export default ApiSelect;
