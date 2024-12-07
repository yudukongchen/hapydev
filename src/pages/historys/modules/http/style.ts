import styled from '@emotion/styled';

export const ApiPanelWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  & > .url-panel {
    padding: 5px;
  }

  .api-request-warpper {
    padding: 0 5px;
  }

  .api-scale-bar {
    width: 100%;
    height: 10px;
    background-color: none;
  }
  .scale-panel-wrapper {
    flex: 1;
    height: 0;
    overflow: hidden;
  }
`;
