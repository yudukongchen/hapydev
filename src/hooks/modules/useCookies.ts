import { useSelector } from 'react-redux';

const useCookies = () => {
  const is_used = useSelector((store: any) => store?.cookies?.is_used);
  const list = useSelector((store: any) => store?.cookies?.list);
  return is_used === 1 ? list : [];
};

export default useCookies;
