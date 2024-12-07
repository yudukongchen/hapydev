import { Radio } from 'antd';

const OPTIONS = [
  { value: '3.1', label: 'OpenAPI 3.1' },
  { value: '3.0', label: 'OpenAPI 3.0' },
  { value: '2.0', label: 'Swagger 2.0' },
];

const OpenApi = () => {
  return (
    <>
      <div className="sec-title">选择OpenApi版本</div>
      <div className="version-panel">
        <Radio.Group options={OPTIONS}></Radio.Group>
      </div>
    </>
  );
};

export default OpenApi;
