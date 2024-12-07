import { Testing, TestingFolder } from '#types/testing';

export const DEFAULT_TEST_CASE: Testing = {
  test_id: null,
  project_id: null,
  parent_id: '0',
  type: 'test_case',
  name: '新建用例',
  sort: -1,
  status: 1,
  data: {
    iteration_data: [],
    config: {
      env_id: null,
      execute_count: 1,
      interval_time: 1,
      iteration_data_id: null,
      enable_sandbox: 1,
      save_cookies: 1,
      exception_handler: 'ingore',
    },
    process: [],
  },
};

export const DEFAULT_TESTING_FOLDER: TestingFolder = {
  test_id: null,
  project_id: null,
  parent_id: '0',
  type: 'folder',
  name: '',
  sort: -1,
  status: 1,
  data: null,
};
