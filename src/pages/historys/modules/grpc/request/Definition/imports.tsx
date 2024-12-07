import { useSafeState } from 'ahooks';
import { Button, Checkbox, Input, Switch, Upload } from 'antd';

const Imports = () => {
  const [showmodal, setShowModal] = useSafeState<'import' | 'fetch' | null>(null);

  const [showInclude, setShowInclude] = useSafeState(false);

  return (
    <div className="imports-panel">
      <div className="chouse-file">
        <Button
          size="small"
          type="link"
          onClick={() => {
            setShowModal('import');
          }}
        >
          导入本地proto文件
        </Button>
        <span>或</span>
        <Button
          size="small"
          type="link"
          onClick={() => {
            setShowModal('fetch');
          }}
        >
          通过url引入
        </Button>
      </div>
      {showmodal === 'import' && (
        <div className="import-modal">
          <div className="import-item">
            <Upload multiple={false}>
              <Button size="small">选择proto文件</Button>
            </Upload>
            <Checkbox
              checked={showInclude}
              onChange={(e) => {
                setShowInclude(e.target.checked);
              }}
            >
              包含依赖项
            </Checkbox>
          </div>
          {showInclude && (
            <div className="depends-item">
              <Upload multiple directory showUploadList={false}>
                <Button size="small">依赖文件目录</Button>
              </Upload>
            </div>
          )}

          <div className="btns-item">
            <Button type="primary" size="small">
              确定
            </Button>
            <Button
              size="small"
              onClick={() => {
                setShowModal(null);
              }}
            >
              取消
            </Button>
          </div>
        </div>
      )}

      {showmodal === 'fetch' && (
        <div className="fetch-modal">
          <div className="import-item">
            <span>请输入在线URL</span>
            <Input.TextArea spellCheck={false} />
          </div>
          <div className="btns-item">
            <Button type="primary" size="small">
              确定
            </Button>
            <Button
              size="small"
              onClick={() => {
                setShowModal(null);
              }}
            >
              取消
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Imports;
