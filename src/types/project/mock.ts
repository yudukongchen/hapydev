export type Mock = {
  project_id: string; //项目id
  mock_engine: number; //Mock引擎 1.默认mock.js
  default_mock_type: 1; //默认Mock方式 1.智能mock优先  2.响应示例优先
  use_cloud_mock: 1 | -1; //是否使用云端Mock      1.使用  -1 不使用
  use_built_in: 1 | -1; //是否使用内置Mock规则      1.使用  -1 不使用
};
