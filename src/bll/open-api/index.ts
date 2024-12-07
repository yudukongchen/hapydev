import {
  createOpenApiRequest,
  deleteOpenApiRequest,
  getOpenApiListRequest,
} from '@services/open-api';

export const createOpenApi = (data) => {
  return createOpenApiRequest(data);
};

export const deleteOpenApi = (id) => {
  return deleteOpenApiRequest(id);
};

export const getOpenApiList = () => {
  return getOpenApiListRequest();
};
