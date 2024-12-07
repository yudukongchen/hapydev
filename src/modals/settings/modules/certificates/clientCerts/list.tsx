import { Button, Popconfirm } from 'antd';
import React from 'react';
import SvgDelete from '@assets/icons/delete.svg?react';
import SvgModify from '@assets/icons/modify.svg?react';

type Props = {
  value: any;
  onCreate: () => void;
  onModify: (index: number) => void;
  onDelete: (index: number) => void;
};
const ClientCerts: React.FC<Props> = (props) => {
  const { value, onCreate, onModify, onDelete } = props;

  return (
    <>
      <div className="case-item">
        <div className="item-name">
          <div>客户端证书</div>
          <div className="item-name-desc">按域添加和管理SSL证书</div>
        </div>
        <div className="item-values">
          <Button onClick={onCreate}>添加证书</Button>
        </div>
      </div>
      <div className="cert-list-panel">
        {value.map((item, index) => (
          <div key={index} className="cert-item">
            <div className="cert-item-name">证书域名：{item.host}</div>
            <div className="cert-item-action">
              <Button
                type="text"
                onClick={onModify.bind(null, index)}
                size="small"
                icon={<SvgModify />}
              />
              <Popconfirm
                title="删除证书"
                placement="topRight"
                description="确定要删除该客户端证书吗，将不可恢复"
                onConfirm={onDelete.bind(null, index)}
                okText="确定删除"
                cancelText="取消"
              >
                <Button type="text" size="small" icon={<SvgDelete />} />
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClientCerts;
