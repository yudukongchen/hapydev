import { isFunction, isNull } from 'lodash';
import { parseOpenApiData } from './openapi';
import { prepareApisList } from '@bll/apis/import';
import { prepareModelsList } from '@bll/models/import';
import { concatMap, merge, reduce, tap } from 'rxjs';
import { batchSaveApis } from '@bll/apis';
import { emitGlobal } from '@subjects/global';
import { batchSaveModels } from '@bll/models';
import { updateLastImportTime } from '@bll/projects/auto-import';

export const handleImportTask = (taskInfo, current_project_id, callBack) => {
  fetch(taskInfo?.data_source_url)
    .then((response) => response.json())
    .then(async (data) => {
      let tempData = null;
      if (taskInfo.data_type === 'openapi') {
        tempData = parseOpenApiData(data);
      }
      if (isNull(tempData)) {
        callBack('操作失败');
        return;
      }
      const options = taskInfo?.options;

      const apiDataList = await prepareApisList(options?.apis, tempData?.apis, current_project_id);
      const modelDataList = await prepareModelsList(
        options?.models,
        tempData?.models,
        current_project_id
      );

      merge(
        batchSaveApis(current_project_id, apiDataList).pipe(
          tap((resp) => {
            if (resp?.code !== 10000) {
              return;
            }
            emitGlobal('APIS/loadApiDatas', current_project_id);
          })
        ),
        batchSaveModels(current_project_id, modelDataList).pipe(
          tap((resp) => {
            if (resp?.code !== 10000) {
              return;
            }
            emitGlobal('MODELS/loadModelDatas', current_project_id);
          })
        )
      )
        .pipe(
          reduce((a, b) => a.concat(b), []),
          concatMap(() => updateLastImportTime(current_project_id, taskInfo?.id))
        )
        .subscribe({
          next: () => {
            emitGlobal('PROJECTS/getAutoImportTasks', current_project_id);
            if (isFunction(callBack)) {
              callBack(true);
            }
          },
          error(err) {
            callBack(err.message);
          },
        });
    })
    .catch((err) => {
      callBack(err?.message);
    });
};
