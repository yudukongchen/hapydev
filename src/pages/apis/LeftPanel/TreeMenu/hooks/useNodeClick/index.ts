import { useMemoizedFn } from 'ahooks';
import { isUndefined } from 'lodash';
import { useSelector } from 'react-redux';
import { emitGlobal } from '@subjects/global';

const useNodeClick = () => {
  const apiDatas = useSelector((store: any) => store.apis?.datas?.base_datas);
  const modelDatas = useSelector((store: any) => store.models?.base_datas);
  // const templateDatas = useSelector((store: any) => store.templates.template_datas);
  // const defaultTemplate = useSelector((store: any) => store.templates.default_template);

  const handleNodeClick = useMemoizedFn((item) => {
    const SOURCE_DATAS = {
      project: {
        project_info: {
          id: 'project_info',
          parent_id: '0',
          name: '项目概览',
        },
      },
      interface: apiDatas,
      model: modelDatas,
    };

    const itemData = SOURCE_DATAS?.[item?.node_type]?.[item.key];
    if (item?.node_type === 'model' && itemData?.data_type === 'folder') {
      return;
    }

    if (isUndefined(itemData)) {
      console.log('tab未定义');
      return;
    }
    emitGlobal('APIS/OPENS/addOpensItem', {
      ...itemData,
      node_type: item?.node_type,
    });
  });

  return handleNodeClick;
};
export default useNodeClick;
