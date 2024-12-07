import { Project } from '#types/project';

export const DEFAULT_DATA: Project & { create_example_datas: 1 | -1 } = {
  create_example_datas: 1,
  name: '',
  logo: '',
  description: '',
  role: 6,
  project_id: '',
};
