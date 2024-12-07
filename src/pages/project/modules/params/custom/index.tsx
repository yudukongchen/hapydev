import { Button, Input, message, theme } from 'antd';
import SvgSearch from '@assets/icons/search.svg?react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import DataList from './datalist';
import { CustomWrapper } from './style';
import { ImportOutlined, ExportOutlined } from '@ant-design/icons';
import Import from '../import';
import Export from '../export';
import { Params } from '#types/params';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUndefined } from 'lodash';
import { clearTempItems, removeTempItem } from '@reducers/projects/params';
import { batchSaveParams, deleteParams } from '@bll/projects/params';
import { emitGlobal } from '@subjects/global';
import { v4 as uuidV4 } from 'uuid';
import useProjectInfo from '@hooks/useProjectInfo';

type Props = {
  dataList: Params[];
  project_id: string;
};

const CustomParams: React.FC<Props> = (props) => {
  const { dataList, project_id } = props;

  const projectInfo = useProjectInfo();

  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const tempList: Params[] = useSelector((store: any) => store?.projects?.params?.temp_list);
  const [modelType, setModelType] = useSafeState(null);
  const [search, setSearch] = useSafeState('');
  const [loading, setLoading] = useSafeState(false);

  const mixedDataList = useMemo(() => {
    const newList = [...tempList, ...dataList];
    if (search.length === 0) {
      return newList;
    }
    const result = newList.filter(
      (item) => item?.name?.indexOf(search) !== -1 || item?.description?.indexOf(search) !== -1
    );
    return result;
  }, [search, tempList, dataList]);

  const handleSaveAllTemps = useMemoizedFn(() => {
    if (tempList.length === 0) {
      message.error('暂无需要保存的临时描述');
      return;
    }
    const saveList = tempList.map((item) => ({
      ...item,
      id: uuidV4(),
    }));

    setLoading(true);
    batchSaveParams(project_id, saveList).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('PARAMS/getdatalist', project_id);
        dispatch(clearTempItems());
      },
      error(err) {
        setLoading(false);
        message.error(err?.message);
      },
      complete() {
        setLoading(false);
      },
    });
  });

  const handleSaveTempData = useMemoizedFn((data) => {
    const saveData = {
      ...data,
      id: uuidV4(),
    };
    setLoading(true);
    batchSaveParams(project_id, [saveData]).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('PARAMS/getdatalist', project_id);
        dispatch(clearTempItems());
      },
      error(err) {
        setLoading(false);
        message.error(err?.message);
      },
      complete() {
        setLoading(false);
      },
    });
  });

  const handleDelete = useMemoizedFn((id, index) => {
    if (isUndefined(id)) {
      dispatch(removeTempItem(index));
      return;
    }

    deleteParams(project_id, id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('PARAMS/getdatalist', project_id);
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  return (
    <>
      <Import
        title="导入参数描述"
        headerFields={['name', 'description']}
        open={modelType === 'import'}
        onClose={setModelType.bind(null, null)}
      />
      <Export
        open={modelType === 'export'}
        onCancel={setModelType.bind(null, null)}
        listData={mixedDataList}
      />
      <div className="case-title">
        <div className="title">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            prefix={<SvgSearch />}
            placeholder="搜索"
            spellCheck={false}
          />
        </div>
        <div className="slot-item">
          <Button onClick={setModelType.bind(null, 'import')} icon={<ImportOutlined />}>
            导入
          </Button>
          <Button onClick={setModelType.bind(null, 'export')} icon={<ExportOutlined />}>
            导出
          </Button>
          <Button type="primary" onClick={handleSaveAllTemps}>
            保存全部
          </Button>
        </div>
      </div>
      <CustomWrapper token={token}>
        <DataList
          loading={loading}
          dataList={mixedDataList}
          onSave={handleSaveTempData}
          onDelete={handleDelete}
        />
      </CustomWrapper>
    </>
  );
};

export default CustomParams;
