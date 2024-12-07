import { Button, Drawer, Popconfirm, Table, TableProps, Tooltip, message, theme } from 'antd';
import { TestReportsWrapper } from './style';
import SvgDelete from '@assets/icons/delete.svg?react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExportOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { format } from 'timeago.js';
import cn from 'classnames';
import { useMemoizedFn, useSafeState } from 'ahooks';
import ReportInfo from '../runInfo';
import { isNumber } from 'lodash';
import { css } from '@emotion/css';
import useReports from './hooks/useReports';
import React from 'react';
import { getReportsDetail } from '@bll/testing/reports';

type Props = {
  project_id: string;
  test_id: string;
};
const TestReportsPanel: React.FC<Props> = (props) => {
  const { project_id, test_id } = props;
  const { token } = theme.useToken();

  const [reportInfo, setReportInfo] = useSafeState(null);

  const { reportList, onDeleteReport } = useReports({ project_id, test_id });

  const handleShowDetail = useMemoizedFn((report_id) => {
    getReportsDetail(project_id, test_id, report_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        setReportInfo(resp?.data);
      },
    });
  });

  const handleDelete = useMemoizedFn((id) => {
    onDeleteReport(id);
  });

  const columns: TableProps<any>['columns'] = [
    {
      title: '报告信息',
      dataIndex: 'report_id',
      className: 'base-info',
      render(id, data: any) {
        return (
          <div>
            <div className="report-name">
              <FileTextOutlined />
              <span onClick={handleShowDetail.bind(null, id)} className="title">
                {data?.name}
              </span>
            </div>
            <div className="info-item">
              <span>{data?.env_name}</span>
              <span>{data?.user_name}</span>
              <span>{format(data?.create_time, 'zh_CN')}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: '结果',
      dataIndex: 'report_id',
      className: 'result-info',
      render(id, data: any) {
        // const apiRates = getApiRates(data);
        return (
          <div>
            {data?.status === 'running' && (
              <div className="case-item">
                <div className="item-name">测试进度: </div>
                <div className="item-value">{data?.progress?.toFixed(2)}%</div>
              </div>
            )}
            {['completed'].includes(data?.status) && (
              <>
                <div className="case-item">
                  <div className="item-name">接口通过率: </div>
                  <div className="item-value">{data?.api_success_rate?.toFixed(2)}%</div>
                </div>
                <div className="case-item">
                  <div className="item-name">断言通过率: </div>
                  <div className="item-value">
                    {isNumber(data?.assert_success_rate)
                      ? `${data?.assert_success_rate?.toFixed(2)}%`
                      : '-'}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      },
    },
    {
      title: '状态',
      className: 'status-info',
      dataIndex: 'status',
      render(status) {
        return (
          <div
            className={cn({
              progressing: status === 'running',
              completed: status === 'completed',
              terminated: status === 'stoped',
            })}
          >
            {status === 'running' && (
              <>
                <ClockCircleOutlined />
                <span>进行中</span>
              </>
            )}
            {status === 'completed' && (
              <>
                <CheckCircleOutlined />
                <span>已完成</span>
              </>
            )}
            {status === 'stoped' && (
              <>
                <CloseCircleOutlined />
                <span>已终止</span>
              </>
            )}
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'report_id',
      align: 'center',
      className: 'more-info',
      render: (id) => {
        return (
          <>
            <Tooltip title="导出测试报告">
              <Button icon={<ExportOutlined />} type="text" size="small" />
            </Tooltip>
            <Tooltip title="删除">
              <Popconfirm
                placement="topRight"
                title="删除提示"
                description="确定要删除吗？将不可恢复！"
                onConfirm={handleDelete.bind(null, id)}
              >
                <Button icon={<SvgDelete />} type="text" size="small" />
              </Popconfirm>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <TestReportsWrapper token={token} className="beautify-scrollbar">
      <ReportInfo
        open={reportInfo !== null}
        onClose={setReportInfo.bind(null, null)}
        tempData={reportInfo}
      />
      <Table
        className="data-list"
        columns={columns}
        dataSource={reportList}
        size="small"
        rowKey={'report_id'}
      />
    </TestReportsWrapper>
  );
};

export default React.memo(TestReportsPanel);
