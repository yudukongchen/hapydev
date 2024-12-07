import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn } from 'ahooks';
import { DEFAULT_SETTINGS } from '@constants/user/settings';
import { getSettings, saveSettings } from '@bll/users/settings';
import { useDispatch, useSelector } from 'react-redux';
import { initSettings, updateSettings } from '@reducers/user/settings';
import { isNull } from 'lodash';
import produce from 'immer';

const useSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((store: any) => store?.user?.settings);

  const handleInitSettings = useMemoizedFn((user_id: string) => {
    getSettings(user_id).then(async (settings) => {
      if (isNull(settings)) {
        await saveSettings(user_id, DEFAULT_SETTINGS);
        dispatch(initSettings(DEFAULT_SETTINGS));
        return;
      }
      dispatch(initSettings(settings));
    });
  });

  const handleUpdateSettings = useMemoizedFn((params) => {
    const { key, value } = params;
    dispatch(
      updateSettings({
        key,
        value,
      })
    );
    const result = produce(settings, (draft) => {
      draft[key] = value;
    });
    saveSettings(settings?.user_id, result);
  });

  useGlobalSubject('USER/SETTINGS/initSettings', handleInitSettings, []);
  useGlobalSubject('USER/SETTINGS/updateSettings', handleUpdateSettings, []);
};

export default useSettings;
