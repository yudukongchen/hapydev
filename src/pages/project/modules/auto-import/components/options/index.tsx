import { Tabs, theme } from 'antd';
import Apis from './api';
import Models from './models';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { isObject } from 'lodash';
import { OptionsWrapper } from './style';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};

const AutoImportOptions: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const { token } = theme.useToken();

  const handleChange = useMemoizedFn((key: string, newVal: any) => {
    const initValue = isObject(value) ? value : {};
    const result = produce(initValue, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  const items = [
    {
      key: 'apis',
      label: '接口',
      children: <Apis value={value?.apis} onChange={handleChange.bind(null, 'apis')} />,
    },
    {
      key: 'models',
      label: '数据模型',
      children: <Models value={value?.models} onChange={handleChange.bind(null, 'models')} />,
    },
  ];

  return (
    <OptionsWrapper token={token}>
      <Tabs animated={false} defaultActiveKey="apis" items={items} />
    </OptionsWrapper>
  );
};

export default AutoImportOptions;
