import { deleteAccount } from '@services/users';
import { emitGlobal } from '@subjects/global';
import { removeCookie } from '@utils/cookies';
import { Button, message, Popconfirm, theme } from 'antd';

const DeleteItem = (props) => {
  const { onClose } = props;
  const { token } = theme.useToken();

  const handleDeleteAccount = () => {
    deleteAccount().subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        message.success('账户注销成功');
        removeCookie('uid');
        removeCookie('accessToken');
        removeCookie('refreshToken');
        emitGlobal('initApplication');
        onClose();
      },
    });
  };

  return (
    <div className="form-item">
      <div className="case-title">
        <p>删除账户</p>
        <p style={{ fontSize: 12, color: token.colorWarningText }}>(危险操作)</p>
      </div>
      <div className="case-value">
        <div className="warning">将进行以下操作(包括但不限于)</div>
        <div className="desc">
          <p>删除我创建的团队</p>
          <p>删除我创建的项目</p>
          <p>删除我发布的文档</p>
          <p>删除我创建的数据模型</p>
          <p>删除我创建的测试用例</p>
        </div>
      </div>
      <div className="btns">
        <Popconfirm
          placement="topRight"
          title="重要提示"
          description={
            <>
              <p>删除账户后所有个人数据将会被清空，</p>
              <p> 且无法恢复，确定删除？</p>
            </>
          }
          onConfirm={handleDeleteAccount}
        >
          <Button size="small">删除</Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default DeleteItem;
