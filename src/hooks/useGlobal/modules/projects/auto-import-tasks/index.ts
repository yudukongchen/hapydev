import { getTaskList } from '@bll/projects/auto-import';
import { getUserID } from '@utils/uid';
import { useMemoizedFn } from 'ahooks';
import { isArray, isString } from 'lodash';
import dayjs from 'dayjs';
import { useGlobalSubject } from '@hooks/useSubject';
import { emitGlobal } from '@subjects/global';
import { isElectron } from '@utils/is';
import { FREQUENCY_CRON_SETTINGS } from '@constants/projects/auto-import-tasks';
import { handleImportTask } from './utils';

const AUTO_IMPORT_JOBS: any = {};

// 这里处理定时任务相关逻辑
const updateTasks = async (taskList, project_id) => {
  if (!isElectron()) {
    return;
  }
  //取消掉原来的作业
  await window?.app?.schedule.gracefulShutdown();

  if (isArray(taskList)) {
    taskList?.forEach((item) => {
      if (item.is_used === 1) {
        const cronOptions = FREQUENCY_CRON_SETTINGS?.[item?.frequency];
        if (!isString(cronOptions)) {
          return;
        }
        AUTO_IMPORT_JOBS[item.id] = window?.app?.schedule?.scheduleJob(
          cronOptions,
          handleImportTask.bind(null, item, project_id)
        );
      }
    });
  }
};

const useAutoImportTasks = () => {
  const handleGetAutoImportTasks = useMemoizedFn((project_id) => {
    const uid = getUserID();

    getTaskList(project_id, uid).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          return;
        }
        if (!isArray(resp?.data)) {
          return;
        }
        const resultList = resp?.data.sort(
          (a, b) => dayjs(a?.create_time).unix() - dayjs(b?.create_time).unix()
        );

        updateTasks(resultList, project_id);
        emitGlobal('PROJECTS/getAutoImportTasks/callback', resultList);
      },
    });
  });

  useGlobalSubject('PROJECTS/getAutoImportTasks', handleGetAutoImportTasks, []);
};

export default useAutoImportTasks;
