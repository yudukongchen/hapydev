import MonacoEditor from '@components/base/MonacoEditor';
import produce from 'immer';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};

const RawModes: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = (attr, newVal: any) => {
    const newData = produce(value, (draft) => {
      draft[attr] = newVal;
    });
    onChange(newData);
  };

  return (
    <div style={{ height: 'calc(100% - 44px)' }}>
      <MonacoEditor
        value={value?.raw}
        language={value?.mode ?? 'json'}
        onChange={handleChange.bind(null, 'raw')}
      />
    </div>
  );
};

export default RawModes;
