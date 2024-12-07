import { getServersList } from '@bll/projects/servers';
import { useGlobalSubject } from '@hooks/useSubject';
import { mountServerDatas } from '@reducers/envs';
import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

const useServers = () => {
  const dispatch = useDispatch();
  const handleGetList = useMemoizedFn((project_id) => {
    getServersList(project_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        const servers = {};
        const server_list = [];
        resp.data?.forEach((item) => {
          servers[item?.server_id] = item.name;
          server_list.push(item?.server_id);
        });
        dispatch(
          mountServerDatas({
            servers,
            server_list,
          })
        );
      },
    });
  });

  useGlobalSubject('SERVERS/getdatalist', handleGetList, []);
};

export default useServers;
