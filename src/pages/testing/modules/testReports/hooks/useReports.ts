import { deleteReports, getReportsList } from '@bll/testing/reports';
import { useMemoizedFn, useMount, useSafeState } from 'ahooks';
import { message } from 'antd';

type Props = {
  project_id: string;
  test_id: string;
};
const useReports = (props: Props) => {
  const { project_id, test_id } = props;
  const [reportList, setReportList] = useSafeState([]);

  const handleLoadList = useMemoizedFn(() => {
    getReportsList(project_id, test_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        setReportList(resp?.data);
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  useMount(() => {
    handleLoadList();
  });

  const onDeleteReport = useMemoizedFn((report_id) => {
    deleteReports(project_id, test_id, report_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        handleLoadList();
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  return {
    reportList,
    onDeleteReport,
  };
};

export default useReports;
