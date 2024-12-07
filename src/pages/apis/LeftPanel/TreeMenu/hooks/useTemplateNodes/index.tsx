import { useSelector } from 'react-redux';
import { NodeType, TreeNode } from '../../types';
import SvgTemplate from '@assets/icons/template.svg?react';
import SvgDefaultTemplate from '@assets/icons/default-template.svg?react';
import SvgTemplateRootFolder from '@assets/icons/template-root-folder.svg?react';
import { renderFolder } from './models/Folder';
import { renderTemplate } from './models/Template';
import { useMemo } from 'react';
import { cloneDeep, isEmpty, isUndefined } from 'lodash';

const TEMPLATE_ROOT_KEY = 'template_root';
const TEMPLATE_ROOT_FOLDER_KEY = TEMPLATE_ROOT_KEY + '_folder';

const renderNode = {
  template: renderTemplate,
  folder: renderFolder,
};
type Props = {
  filter: any;
};

const useTemplateNodes = (props: Props) => {
  const { filter } = props;
  const templateDatas = useSelector((store: any) => store.templates.template_datas);

  const filteredDatas = useMemo(() => {
    if (isUndefined(templateDatas)) {
      return {};
    }
    const newDatas = {};
    const sourceData = cloneDeep(templateDatas);
    Object.entries(sourceData).forEach(([id, data]: [string, any]) => {
      const filterKey = filter?.name?.toLowerCase();

      //是否包含名称
      const isIncludeName = `${data?.name}`.toLowerCase().indexOf(filterKey) !== -1;
      if (isEmpty(filterKey) || isIncludeName) {
        newDatas[id] = data;
        let parent = sourceData[data.parent_id];
        //父节点也要放进来
        while (!isUndefined(parent) && newDatas?.[parent?.id] !== parent) {
          newDatas[parent.id] = parent;
          parent = sourceData[parent.parent_id];
        }
      }
    });
    return newDatas;
  }, [templateDatas, filter]);

  const templatesDataList: TreeNode[] = Object.values(filteredDatas).map((item: any) => {
    return {
      id: item.id,
      parent: item.parent_id === '0' ? TEMPLATE_ROOT_FOLDER_KEY : item.parent_id,
      title: renderNode?.[item?.data?.template_type]?.(item) ?? null,
      sort: item.sort,
      node_type: 'template',
    };
  });

  const defaultNode = {
    id: 'template_default',
    parent: TEMPLATE_ROOT_KEY,
    title: (
      <>
        <SvgDefaultTemplate className="root-node-icon" />
        <span className="root-node-title">默认响应模版</span>
      </>
    ),
    node_type: 'template_default' as NodeType,
    sort: -1,
    enableDrag: false,
    //isRoot: true,
  };

  const templateRootNode = {
    id: TEMPLATE_ROOT_FOLDER_KEY,
    parent: TEMPLATE_ROOT_KEY,
    title: (
      <>
        <SvgTemplateRootFolder className="root-node-icon" />
        <span className="root-node-title">响应组件</span>
      </>
    ),
    node_type: 'template_root_folder' as NodeType,
    sort: -1,
    enableDrag: false,
  };

  const templateNodes: TreeNode[] = [
    {
      id: TEMPLATE_ROOT_KEY,
      parent: '0',
      title: (
        <>
          <SvgTemplate className="root-node-icon" />
          <span className="root-node-title">组件库</span>
        </>
      ),
      node_type: 'template' as NodeType,
      sort: 3,
      isRoot: true,
    } as TreeNode,
    defaultNode,
    templateRootNode,
  ].concat(templatesDataList);

  return templateNodes;
};

export default useTemplateNodes;
