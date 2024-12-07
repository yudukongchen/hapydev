import React from 'react';
import renderProjectInfo from './modules/project_info';
import renderInterface from './modules/interface';
import renderModel from './modules/model';
import renderTemplate from './modules/template';
import renderTemplateDefault from './modules/template_default';
import renderEmpty from './modules/empty';
import { TabItemWrapper } from './style';
import { theme, Modal } from 'antd';
import SvgClose from '@assets/icons/close.svg?react';
import cn from 'classnames';
import { useSafeState } from 'ahooks';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { methodsWrapper } from '@theme/methods';
import { useSelector } from 'react-redux';

type Props = {
  tab_id: string;
  node_type: string;
  onClick: (value: any) => void;
  onCloseItem: (tabId) => void;
  selected: boolean;
  isChanged: boolean;
};

const renderNode = {
  project: renderProjectInfo,
  interface: renderInterface,
  model: renderModel,
  template: renderTemplate,
  template_default: renderTemplateDefault,
  empty: renderEmpty,
};
const TabItem: React.FC<Props> = (props) => {
  const { tab_id, node_type, onClick, onCloseItem, selected, isChanged } = props;
  const [isModalOpen, setIsModalOpen] = useSafeState(false);
  const { token } = theme.useToken();
  const value = useSelector((store: any) => store?.apis?.opens?.[tab_id]);
  const { setNodeRef, listeners, transform, transition, attributes, isSorting } = useSortable({
    id: `${tab_id}`,
  });

  const styles = {
    transform: CSS.Transform.toString(transform),
    ...(isSorting ? { transition } : {}),
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      onClick(value?.id);
      return;
    }
    if (e.button === 1) {
      onCloseItem(value?.id);
    }
  };

  const handleCloseItem = (
    state: boolean,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (state === true) {
      setIsModalOpen(state);
      return;
    }
    onCloseItem(value?.id);
  };

  return (
    <TabItemWrapper
      className={cn({
        selected: selected,
      })}
      token={token}
      ref={setNodeRef}
      style={styles}
      {...attributes}
      {...listeners}
    >
      <Modal
        title="有修改的内容未保存"
        width={400}
        open={isModalOpen}
        onOk={onCloseItem.bind(null, value?.id)}
        onCancel={setIsModalOpen.bind(null, false)}
        cancelText="取消"
        okText="确定"
      >
        <p>确定关闭？</p>
      </Modal>
      <div onMouseDown={handleMouseDown} className={cn('item-title', methodsWrapper, [node_type])}>
        {renderNode?.[node_type]?.(value)}
      </div>

      {isChanged === true ? (
        <div onClick={handleCloseItem.bind(null, true)} className="btn-comfirm-close">
          <SvgClose />
        </div>
      ) : (
        <div className="btn-close" onClick={handleCloseItem.bind(null, false)}>
          <SvgClose />
        </div>
      )}
    </TabItemWrapper>
  );
};

export default TabItem;
