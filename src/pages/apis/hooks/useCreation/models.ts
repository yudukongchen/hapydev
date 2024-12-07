import { DEFAULT_MODEL_DATA } from '@constants/models/data-model';
import { useGlobalSubject } from '@hooks/useSubject';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn } from 'ahooks';
import { isNull } from 'lodash';
import { useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

const useModelsCreation = () => {
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const getDefaultData = (type) => {
    if (type === 'CREATE_MODEL') {
      return DEFAULT_MODEL_DATA;
    }
  };

  const handleCreateNewItem = useMemoizedFn((data) => {
    const { type, id = uuidV4(), parent_id = '0' } = data;
    const defaultData = getDefaultData(type);
    const itemData = {
      node_type: 'model',
      ...defaultData,
      project_id: current_project_id,
      parent_id,
      id,
    };
    emitGlobal('APIS/OPENS/addOpensItem', itemData);
  });

  const handleCreateOpensItem = useMemoizedFn((apiData) => {
    if (isNull(apiData?.id)) {
      apiData.id = uuidV4();
    }
    const itemData = {
      node_type: 'model',
      ...apiData,
      project_id: current_project_id,
    };
    emitGlobal('APIS/OPENS/addOpensItem', itemData);
  });

  useGlobalSubject('models/createNewItem', handleCreateNewItem, []);

  //导入json-shema后调用
  useGlobalSubject('models/createOpensItem', handleCreateOpensItem, []);
};

export default useModelsCreation;
