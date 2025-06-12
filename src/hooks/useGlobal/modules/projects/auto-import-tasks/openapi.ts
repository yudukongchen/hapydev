import { parseApiList } from '@utils/data-parse/openapi/apis';
import { parseEnvList } from '@utils/data-parse/openapi/envs';
import { parseDefinitions, parseModelList } from '@utils/data-parse/openapi/models';
import { isObject } from 'lodash';

export const parseOpenApiData = (openApiData) => {
  const apiList = parseApiList(openApiData?.paths);
  let modelList = [];
  if (isObject(openApiData?.definitions)) {
    modelList = parseDefinitions(openApiData?.definitions);
  } else if (isObject(openApiData?.components)) {
    modelList = parseModelList(openApiData?.components);
  }

  const envList = parseEnvList(openApiData?.servers);

  return {
    apis: apiList,
    models: modelList,
    envs: envList,
  };
};
