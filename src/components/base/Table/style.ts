import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TableWrapper = styled.div<{ token: GlobalToken }>`
  & .table {
    table-layout: fixed;
    display: table;
    border-collapse: collapse;
    width: 100%;
  }

  .table-th {
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
    & td {
      font-weight: normal;
      position: relative;
    }
  }

  .table-tr {
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
    &:hover {
      background-color: ${({ token }) => token.colorFillQuaternary};
    }
  }

  .table-td {
    box-sizing: border-box;
    vertical-align: middle;
    position: relative;
    word-break: break-all;
    color: ${({ token }) => token.colorText};

    .table-sort {
      float: right;
      position: relative;
      top: -3px;
      margin-right: 10px;

      .table-sort-down {
        position: absolute;
        top: 12px;
        right: 0;
      }

      .table-sort-select {
        fill: ${({ token }) => token.colorBorderSecondary};
      }
    }
  }

  .td-mask {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    user-select: none;
  }

  .td-selection {
    white-space: nowrap;
    text-align: center;
  }

  .td-scale {
    position: absolute;
    top: 0;
    z-index: 101;
    width: 4px;
    height: 100%;
    cursor: col-resize;

    &.scaling {
      background-color: ${({ token }) => token.colorPrimary};
    }

    &:hover {
      background-color: ${({ token }) => token.colorPrimary};
    }
  }

  & .table-border {
    border: 1px solid ${({ token }) => token.colorBorderSecondary};

    td {
      border: 1px solid ${({ token }) => token.colorBorderSecondary};
    }
  }
`;
