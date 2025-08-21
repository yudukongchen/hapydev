import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    // 示例：暴露一个方法给渲染进程
    hello: () => 'Hello from Electron!',
    // 如果需要文件操作，通过主进程处理
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath, data) => ipcRenderer.invoke('write-file', filePath, data)
})
