import styled from "@emotion/styled";
import { GlobalToken } from "antd";

export const NodeWarpper = styled.div`
  display: inline-flex;
  flex: 1;
  align-items: center;

  .type-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    vertical-align: top;
    overflow: hidden;
    margin-right: 4px;
    & > svg {
      width: 1.2em;
      height: 1.2em;
      margin-top: 0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    &.template > svg {
      color: #9373ee;
    }
  }

  .node-title {
    flex: 1;
    width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    align-items: center;
  }
  .node-more {
    display: none;
  }
`;
