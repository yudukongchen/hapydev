import { ApiCollection } from '#types/collection/api';
import { DataModel } from '#types/data-model';
import { getTestCasesCount } from '@bll/testing/local';
import { getReportsCount } from '@bll/testing/reports/cache';
import { useSafeState } from 'ahooks';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ArticleInfo = () => {
  const apiDatas = useSelector((store: any) => store?.apis?.datas?.base_datas);
  const dataModels = useSelector((store: any) => store?.models?.base_datas);
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const apiCounts = useMemo(() => {
    let result = 0;
    Object.values(apiDatas).forEach((item: ApiCollection) => {
      if (
        ['http', 'websocket', 'socket_io', 'grpc', 'socket_client', ''].includes(item?.data_type)
      ) {
        result++;
      }
    });
    return result;
  }, [apiDatas]);

  const modelCounts = useMemo(() => {
    let result = 0;
    Object.values(dataModels).forEach((item: DataModel) => {
      if (item.data_type === 'model') {
        result++;
      }
    });

    return result;
  }, [dataModels]);

  const docCounts = useMemo(() => {
    let result = 0;
    Object.values(apiDatas).forEach((item: ApiCollection) => {
      if (item?.data_type === 'document') {
        result++;
      }
    });
    return result;
  }, [apiDatas]);

  const [testCasesCount, setTestCasesCount] = useSafeState(0);
  const [reportsCount, setReportsCount] = useSafeState(0);
  useEffect(() => {
    getTestCasesCount(current_project_id).then((count) => {
      setTestCasesCount(count);
    });
    getReportsCount(current_project_id).then((count) => {
      setReportsCount(count);
    });
  }, [current_project_id]);

  return (
    <div className="container-box">
      <div className="big-title">项目统计</div>
      <div className="article-items">
        <div className="case-item">
          <div className="item-count">{apiCounts}</div>
          <div className="item-title">接口数量</div>
        </div>
        <div className="case-item">
          <div className="item-count">{docCounts}</div>
          <div className="item-title">文档数量</div>
        </div>
        <div className="case-item">
          <div className="item-count">{modelCounts}</div>
          <div className="item-title">数据模型数量</div>
        </div>
        <div className="case-item">
          <div className="item-count">{testCasesCount}</div>
          <div className="item-title">测试用例数量</div>
        </div>
        <div className="case-item">
          <div className="item-count">{reportsCount}</div>
          <div className="item-title">测试报告数量</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleInfo;
