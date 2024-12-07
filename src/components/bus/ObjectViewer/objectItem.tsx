import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button } from 'antd';
import React from 'react';
import CaretRightSvg from '@assets/icons/arrow-right.svg?react';
import CaretDownSvg from '@assets/icons/arrow-down.svg?react';

type Props = {
  itemKey: string | number;
  itemValue: any;
  renderData: any;
};
const ObjectItem: React.FC<Props> = (props) => {
  const { itemKey, itemValue, renderData } = props;

  const [showContent, setShowContent] = useSafeState(false);

  const handleToggleShowData = useMemoizedFn(() => {
    setShowContent(!showContent);
  });

  return (
    <div className="key-item object">
      <div className="object-key" onClick={handleToggleShowData}>
        {showContent ? <CaretDownSvg /> : <CaretRightSvg />}
        {itemKey}
      </div>
      {showContent && renderData(itemValue)}
    </div>
  );
};

export default ObjectItem;
