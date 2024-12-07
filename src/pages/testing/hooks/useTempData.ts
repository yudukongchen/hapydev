import { useSelector } from 'react-redux';

const useTempData = (test_id) => {
  const tempData = useSelector((store: any) => store?.tempDatas?.testing?.[test_id]);
  return tempData;
};

export default useTempData;
