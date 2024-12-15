import { Button, Dropdown, message, theme } from 'antd';
import SvgAdd from '@assets/icons/add.svg?react';
import SvgInfo from '@assets/icons/info.svg?react';
import SvgMore from '@assets/icons/more.svg?react';
import SvgLock from '@assets/icons/lock.svg?react';
import SvgUnLock from '@assets/icons/unlock.svg?react';
import { SHARE_ITEM_MENUS } from './constants';
import { ShareInfoWrapper } from './style';
import { emitGlobal } from '@subjects/global';
import useSharesData from './useSharesData';
import { isNull } from 'lodash';
import { format } from 'timeago.js';
import dayjs from 'dayjs';
import ModifyShare from '@modals/create-share/modify';
import { copyTextToClipboard } from '@utils/copy';
import { useSafeState } from 'ahooks';
import { deleteShares } from '@bll/projects/shares';
import { urljoins } from 'urljoins';
import { getDocHost } from '@utils/path';

const ShareInfo = () => {
  const { token } = theme.useToken();
  const { shareList } = useSharesData();
  const [modifyShareData, setModifyShareData] = useSafeState(null);

  const handleCreateShare = () => {
    emitGlobal('APIS/showShareModal', undefined);
  };

  const renderTime = (item) => {
    if (isNull(item?.expire_time)) {
      return <span className="access-info forever">永不过期</span>;
    }
    if (item?.is_expired === 1) {
      return <span className="access-info invalid">已过期</span>;
    }
    return (
      <span className="access-info">{format(dayjs(item?.expire_time).format(), 'zh_CN')}</span>
    );
  };

  const handleAction = (item, { key }) => {
    if (key === 'copy-link') {
      const url = urljoins(getDocHost(), item?.id);
      copyTextToClipboard(url);
      return;
    }
    if (key === 'edit') {
      setModifyShareData(item);
      return;
    }
    if (key === 'delete') {
      deleteShares(item?.project_id, item?.id).subscribe({
        next(resp) {
          if (resp?.code !== 10000) {
            message.error(resp?.message);
            return;
          }
          emitGlobal('PROJECTS/getShareList', item?.project_id);
        },
      });
      return;
    }
  };

  return (
    <ShareInfoWrapper token={token} className="container-box ">
      <ModifyShare
        open={modifyShareData !== null}
        data={modifyShareData}
        onClose={setModifyShareData.bind(null, null)}
      />
      <div className="info-head">
        <div className="head-left">
          <div className="big-title">分享列表</div>
          <div className="head-desc">
            <SvgInfo />
            <span>将接口文档以 URL 形式分享出去，方便外部团队在线查看</span>
          </div>
        </div>
        <div className="head-right">
          <Button icon={<SvgAdd />} onClick={handleCreateShare}>
            新建分享
          </Button>
        </div>
      </div>
      <div className="info-list">
        {shareList.map((item, index) => {
          if (index >= 5) {
            return null;
          }
          const isPublic = item?.auth_type === 1;
          return (
            <div className="info-item" key={index}>
              {isPublic ? (
                <div className="status public">
                  <SvgUnLock />
                  <span>公开</span>
                </div>
              ) : (
                <div className="status private">
                  <SvgLock />
                  <span>私有</span>
                </div>
              )}
              <div className="title">{item?.name}</div>
              <div className="more">
                {renderTime(item)}
                <Dropdown
                  menu={{
                    items: SHARE_ITEM_MENUS,
                    onClick: handleAction.bind(null, item),
                  }}
                >
                  <Button type="text" size="small" icon={<SvgMore />} />
                </Dropdown>
              </div>
            </div>
          );
        })}
      </div>
    </ShareInfoWrapper>
  );
};

export default ShareInfo;
