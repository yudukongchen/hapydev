import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const InviteUsersWrapper = styled.div<{ token: GlobalToken }>`
  .urlbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    .txt-url {
      flex: 1;
      resize: none;
      word-break: break-all;
    }
  }
  .url-desc {
    margin-top: 5px;
    color: ${({ token }) => token.colorTextDescription};

    .btn-regen {
      margin-left: 10px;
      color: ${({ token }) => token.colorInfoText};
      cursor: pointer;
    }
  }
  .form-item {
    padding: 5px 0;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    .sel {
      flex: 1;
    }
  }
  .btns {
    width: 100%;
    margin-top: 15px;
  }
`;
