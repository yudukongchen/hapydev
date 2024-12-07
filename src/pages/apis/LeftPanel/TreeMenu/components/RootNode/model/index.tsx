import SvgModelStore from '@assets/icons/model-store.svg?react';
import SvgArrowDown from '@assets/icons/angle-down.svg?react';
import { Button, Dropdown } from 'antd';
import SvgAdd from '@assets/icons/add.svg?react';
import { MODEL_MENUS } from './constants';
import { handlePrevDefaultClick } from '@utils/prevdefault';
import React from 'react';
import { emitGlobal } from '@subjects/global';
import { DEFAULT_MODEL_FOLDER } from '@constants/models/folder';
import { cloneDeep } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

type Props = {
  expanded: boolean;
  onToggleExpand: () => void;
};
const ModelRoot: React.FC<Props> = (props) => {
  const { expanded, onToggleExpand } = props;

  const handleCreateModel = ({ key }) => {
    if (key === 'CREATE_MODEL_FOLDER') {
      const modelData = cloneDeep(DEFAULT_MODEL_FOLDER);
      modelData.parent_id = '0';
      modelData.id = uuidV4();
      emitGlobal('ApisMenu/updateModal', {
        modal: 'modelFolder',
        value: modelData,
      });
      return;
    }
    if (key === 'IMPORT_JSON_SCHEMA') {
      emitGlobal('ApisMenu/updateModal', {
        modal: 'importSchema',
        value: '0',
      });
      return;
    }
    emitGlobal('models/createNewItem', {
      type: key,
    });
  };

  return (
    <>
      <div className="menu-tree-node-title" onClick={onToggleExpand}>
        <SvgModelStore className="root-node-icon" />
        <span className="root-node-title">数据模型</span>
      </div>
      <div className="menu-tree-node-indent" onClick={onToggleExpand}>
        <span className="foldbtn">
          {expanded === true ? (
            <SvgArrowDown />
          ) : (
            <SvgArrowDown style={{ transform: 'rotate(-90deg)' }} />
          )}
        </span>
      </div>
      <div className="more-actions">
        <Dropdown
          trigger={['click']}
          menu={{
            items: MODEL_MENUS,
            onClick: handleCreateModel,
          }}
        >
          <Button
            size="small"
            type="text"
            icon={<SvgAdd />}
            onClick={handlePrevDefaultClick}
          ></Button>
        </Dropdown>
      </div>
    </>
  );
};

export default ModelRoot;
