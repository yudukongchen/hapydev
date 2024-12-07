export type APIOptions = {
  selectedKeys: string[];
  rootParent: string;
  conflict: 'cover' | 'ignore' | 'create' | 'merge';
  keepPrefixUrl: 1 | -1;
};

export type DataModelOptions = {
  selectedKeys: string[];
  rootParent: string;
  conflict: 'cover' | 'ignore' | 'create' | 'merge';
};
