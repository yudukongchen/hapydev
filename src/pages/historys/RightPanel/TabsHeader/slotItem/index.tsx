import cn from 'classnames';
import { slotWrapper } from './style';
import Enviroment from '@components/bus/Enviroment';
import { useDispatch, useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import { emitGlobal } from '@subjects/global';

const SlotItem = () => {
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);

  const handleChangeEnvId = useMemoizedFn((env_id) => {
    emitGlobal('ENVS/switchEnv', env_id);
  });

  return (
    <div className={cn(slotWrapper, 'slot-item')}>
      <Enviroment value={current_env_id} onChange={handleChangeEnvId} />
    </div>
  );
};
export default SlotItem;
