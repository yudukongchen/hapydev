import { getTestingItem } from '@bll/testing';
import { useMemoizedFn } from 'ahooks';
import { emitGlobal } from '@subjects/global';

const useNodeClick = () => {
  const handleNodeClick = useMemoizedFn((item) => {
    if (item.type === 'folder') {
      return;
    }
    //从本地库中读取数据
    getTestingItem(item.test_id).then((data) => {
      emitGlobal('TESTING/OPENS/addOpensItem', data);
    });
  });

  return handleNodeClick;
};
export default useNodeClick;
