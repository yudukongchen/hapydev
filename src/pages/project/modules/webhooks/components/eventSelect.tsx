import { WebHookTriggers } from '@constants/webhooks';
import { TreeSelect } from 'antd';
import { isArray, isPlainObject } from 'lodash';
import { useMemo } from 'react';

type Props = {
  value: string[];
  onChange: (newVal: string[]) => void;
};

const EventSelect = (props) => {
  const { value, onChange } = props;

  const computedOptions = useMemo(() => {
    const sourceList = WebHookTriggers.map((item) => ({ ...item, value: item.key }));

    const treeDatas = {};
    sourceList.forEach((item) => {
      treeDatas[item.key] = item;
    });
    const rootList = [];
    for (const item of sourceList) {
      const parentData = treeDatas?.[item?.parent];
      if (item.parent === null) {
        rootList.push(item);
      }
      if (!isPlainObject(parentData)) {
        continue;
      }
      if (!isArray(parentData?.children)) {
        parentData.children = [];
      }
      parentData.children.push(item);
    }

    return rootList;
  }, [WebHookTriggers]);
  return (
    <TreeSelect
      allowClear
      maxTagCount={4}
      treeData={computedOptions}
      onChange={onChange}
      value={value}
      treeCheckable={true}
      placeholder="请选择触发事件"
    />
  );
};

export default EventSelect;
