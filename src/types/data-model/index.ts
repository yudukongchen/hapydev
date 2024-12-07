export type DataModelType = 'model' | 'folder';

export type DataModel = {
  id: string;
  project_id: string;
  parent_id: string;
  name: string;
  data_type: DataModelType;
  sort: number;
  version: number; //版本号
  create_time?: Date; //创建时间戳
  update_time?: Date; //最后更新时间戳
  creator_id: string; //创建人id
  updater_id: string; //最后更新人id
  status: 1 | 2 | -1 | -2; // 1.正常 2.已锁定  -1.逻辑删除 -2.物理删除
  data: {
    description: string; //模型详细描述
    schema: object; //模型Schema对象
  };
};
