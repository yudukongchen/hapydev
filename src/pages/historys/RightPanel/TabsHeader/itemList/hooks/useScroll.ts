import { useMemoizedFn } from 'ahooks';
import React, { useEffect } from 'react';
import { throttle } from 'lodash';

type Props = {
  translateX: number;
  setTranslateX: (val: number) => void;
  outerWidth: number;
  innerWidth: number;
  activeIndex: number;
  itemWidth: number;
};

const useScroll = (props: Props) => {
  const { translateX, setTranslateX, outerWidth, innerWidth, activeIndex, itemWidth = 160 } = props;

  useEffect(() => {
    if (activeIndex <= 0) {
      setTranslateX(0);
      return;
    }
    const leftOffset = -activeIndex * itemWidth;
    let newTranslateX = null;
    if (leftOffset > translateX) {
      newTranslateX = leftOffset;
    }
    const rightOffset = (activeIndex + 1) * itemWidth;

    if (outerWidth === 0) {
      return;
    }

    if (rightOffset > outerWidth && translateX >= outerWidth - rightOffset) {
      newTranslateX = outerWidth - rightOffset;
    }
    // 右侧有空间时
    if (translateX < outerWidth - innerWidth) {
      if (outerWidth >= innerWidth) {
        newTranslateX = 0;
      } else {
        newTranslateX = outerWidth - innerWidth;
      }
    }
    if (newTranslateX !== null) {
      setTranslateX(newTranslateX);
    }
  }, [outerWidth, innerWidth, activeIndex]);

  const handleScroll: React.WheelEventHandler<HTMLDivElement> = useMemoizedFn(
    throttle((e) => {
      const moveStepX = e.nativeEvent.deltaY;
      let movedWidth = 0;
      if (innerWidth <= outerWidth) {
        setTranslateX(0);
        return;
      }
      if (e.nativeEvent.deltaY > 0) {
        movedWidth = translateX - moveStepX;
        if (movedWidth < outerWidth - innerWidth) {
          movedWidth = outerWidth - innerWidth;
        }
      } else {
        movedWidth = translateX - moveStepX;
      }
      if (movedWidth > 0) {
        movedWidth = 0;
      }
      setTranslateX(movedWidth);
    }, 20)
  );

  return handleScroll;
};

export default useScroll;
