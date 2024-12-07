import { useMemoizedFn, useSafeState } from 'ahooks';
import { TaskItem } from '#types/collection/task';
import ScriptBox from './scriptBox';
import produce from 'immer';

interface ScriptBoxProps {
  value: TaskItem[];
  onChange: (val: TaskItem[]) => void;
}

const PostTasks = (props: ScriptBoxProps) => {
  const { value, onChange } = props;

  const handleChangeScript = useMemoizedFn((newVal) => {
    const result = produce(value, (draft) => {
      draft[0].data = newVal;
    });

    onChange(result);
  });

  return <ScriptBox value={value?.[0]?.data} onChange={handleChangeScript} />;
};

export default PostTasks;
