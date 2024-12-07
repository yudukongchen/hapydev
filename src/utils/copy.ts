import { message } from 'antd';

export const copyTextToClipboard = (str: string, showMessage: Boolean = true) => {
  const clipboardObj = navigator.clipboard;
  // 不支持Clipboard对象直接报错
  if (clipboardObj) {
    // 读取内容到剪贴板
    clipboardObj.writeText(str).then(
      () => {
        showMessage && message.success('已成功将内容复制到剪贴板');
      },
      () => {
        try {
          const textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          // 隐藏此输入框
          textarea.style.position = 'fixed';
          textarea.style.clip = 'rect(0 0 0 0)';
          textarea.style.top = '10px';
          // 赋值
          textarea.value = str;
          // 选中
          textarea.select();
          // 复制
          document.execCommand('copy', true);
          // 移除输入框
          document.body.removeChild(textarea);
        } catch (error) {
          showMessage && message.error('复制失败');
        }
      }
    );

    return;
  }
  try {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = str;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
    if (str) {
      showMessage && message.success('已成功将内容复制到剪贴板');
    }
  } catch (error) {
    showMessage && message.error('复制失败');
  }
};
