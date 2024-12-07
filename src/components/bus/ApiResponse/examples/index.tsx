import { ApiResponse } from '#types/collection/api';
import { theme, Segmented, Button, Tooltip, message } from 'antd';
import React, { useMemo, useRef } from 'react';
import { ExampleWrapper } from './style';
import { cloneDeep, isArray, isPlainObject } from 'lodash';
import { useMemoizedFn, useSafeState } from 'ahooks';
import SvgAdd from '@assets/icons/add.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';
import SvgModify from '@assets/icons/modify.svg?react';
import SvgImport from '@assets/icons/link-data.svg?react';
import ExampleForm from './example-form';
import produce from 'immer';
import { Panel, PanelGroup } from 'react-resizable-panels';
import ResizeBar from '@components/bus/ResizeBar';
import JsonSchema from '@components/base/JsonSchema';
import { useSelector } from 'react-redux';
import { DEFAULT_HTTP_EXAMPLE } from '@constants/apis/http';
import MonacoEditor from '@components/base/MonacoEditor';
import { getRawBody } from '../utils/response';
import { isJSON } from 'class-validator';
import jsonToSchema from './utils/json-schema';

type Props = {
  api_id: string;
  value: ApiResponse[];
  onChange: (newVal: ApiResponse[]) => void;
};
const Examples: React.FC<Props> = (props) => {
  const { api_id, value, onChange } = props;

  const modelDatas = useSelector((store: any) => store?.models?.base_datas);
  const tempData = useSelector((store: any) => store?.tempDatas?.api?.[api_id]);

  const refMode = useRef(null);

  const panel_view_mode = useSelector((store: any) => store?.user?.settings?.base?.panel_view_mode);

  const [index, setIndex] = useSafeState(0);
  const [editValue, setEditValue] = useSafeState(null);
  const { token } = theme.useToken();
  const exampleTitleList = useMemo(() => {
    if (!isArray(value)) {
      return [];
    }
    return value?.map((item, index) => ({
      value: index,
      label: item.name,
    }));
  }, [value]);

  const mergedValue = isArray(value) && value.length > 0 ? value : [DEFAULT_HTTP_EXAMPLE];

  const direction = panel_view_mode !== 'horizontal' ? 'horizontal' : 'vertical';

  const handleSaveForm = useMemoizedFn(() => {
    if (refMode.current === 'add') {
      const newData = produce(mergedValue, (draft) => {
        draft.push(editValue);
      });
      setEditValue(null);
      onChange(newData);
    }
    if (refMode.current === 'edit') {
      const newData = produce(mergedValue, (draft) => {
        draft[index] = editValue;
      });
      setEditValue(null);
      onChange(newData);
    }
  });

  const handleShowAdd = useMemoizedFn(() => {
    refMode.current = 'add';
    const defaultData = cloneDeep(DEFAULT_HTTP_EXAMPLE);
    setEditValue(defaultData);
  });

  const handleDelete = useMemoizedFn(() => {
    if (mergedValue.length <= 1) {
      return;
    }
    const result = produce(mergedValue, (draft) => {
      if (!isPlainObject(mergedValue?.[index])) {
        return;
      }
      draft.splice(index, 1);
    });
    setIndex(0);
    onChange(result);
  });

  const handleShowEdit = useMemoizedFn(() => {
    refMode.current = 'edit';
    if (isPlainObject(value?.[index])) {
      setEditValue(value?.[index]);
    }
  });

  const handleChangeSchema = useMemoizedFn((newVal) => {
    const result = produce(mergedValue, (draft) => {
      if (!isPlainObject(mergedValue?.[index])) {
        return;
      }
      draft[index].schema = newVal;
    });

    onChange(result);
  });

  const handleChangeRaw = useMemoizedFn((newVal) => {
    const result = produce(mergedValue, (draft) => {
      if (!isPlainObject(mergedValue?.[index])) {
        return;
      }
      draft[index].raw = newVal;
    });
    onChange(result);
  });

  const handleUseResponse = useMemoizedFn(() => {
    if (!isPlainObject(tempData?.response)) {
      return;
    }
    const rawBody = getRawBody(tempData?.response);
    const result = produce(mergedValue, (draft) => {
      draft[index].raw = rawBody;
      draft[index].http_code = tempData?.response?.statusCode;
      if (isJSON(rawBody)) {
        try {
          const dataJson = JSON.parse(rawBody);
          const schema = jsonToSchema(dataJson);
          draft[index].schema = schema;
        } catch (ex) {
          message.info('引用的数据不是JSON格式，无法生成数据结构');
        }
      }
    });
    onChange(result);
  });

  return (
    <ExampleWrapper token={token}>
      <ExampleForm
        mode={refMode?.current}
        open={isPlainObject(editValue)}
        value={editValue}
        onChange={setEditValue}
        onClose={setEditValue.bind(null, null)}
        onSave={handleSaveForm}
      />
      <div className="example-header">
        <div className="left-panel">
          <Segmented size="small" value={index} onChange={setIndex} options={exampleTitleList} />
          <Tooltip title="添加响应">
            <Button onClick={handleShowAdd} size="small" type="text" icon={<SvgAdd />}></Button>
            <Button onClick={handleDelete} size="small" type="text" icon={<SvgDelete />}></Button>
          </Tooltip>
        </div>
        <div className="right-panel">
          <div>Http状态码：{mergedValue?.[index]?.http_code}</div>
          <div>内容格式:{mergedValue?.[index]?.content_type}</div>
          <div className="btns-list">
            <Tooltip title="从现有响应导入">
              <Button
                onClick={handleUseResponse}
                size="small"
                type="text"
                icon={<SvgImport />}
              ></Button>
            </Tooltip>
            <Tooltip title="编辑">
              <Button
                onClick={handleShowEdit}
                size="small"
                type="text"
                icon={<SvgModify />}
              ></Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="form-panel">
        <PanelGroup direction={direction}>
          <Panel minSize={15} collapsible defaultSize={50}>
            <div className="form-item">
              <div className="form-title">数据结构</div>
              <div className="form-content">
                <JsonSchema
                  models={modelDatas}
                  showMock={false}
                  value={mergedValue?.[index]?.schema}
                  onChange={handleChangeSchema}
                />
              </div>
            </div>
          </Panel>
          <ResizeBar direction={direction} />
          <Panel minSize={15} collapsible>
            <div className="form-item">
              <div className="form-title">示例数据</div>
              <div className="form-content">
                <MonacoEditor
                  language="json"
                  value={mergedValue?.[index]?.raw}
                  onChange={handleChangeRaw}
                />
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </ExampleWrapper>
  );
};

export default Examples;
