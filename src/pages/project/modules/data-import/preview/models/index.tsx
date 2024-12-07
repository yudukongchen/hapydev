import { theme } from 'antd';
import { ModelsWrapper } from './style';
import ModelListPanel from './modelList';
import OptionsPanel from './options';
import { DataModel } from '#types/data-model';
import { DataModelOptions } from '../type';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';

type Props = {
  modelList: DataModel[];
  value: DataModelOptions;
  onChange: (newVal: DataModelOptions) => void;
};

const Models = (props) => {
  const {} = props;

  const { modelList, value, onChange } = props;
  const { token } = theme.useToken();

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <ModelsWrapper token={token}>
      <ModelListPanel
        modelList={modelList}
        value={value?.selectedKeys}
        onChange={handleChange.bind(null, 'selectedKeys')}
      />
      <OptionsPanel value={value} handleChange={handleChange} />
    </ModelsWrapper>
  );
};

export default Models;
