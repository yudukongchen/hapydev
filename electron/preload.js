import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    // 示例：暴露一个方法给渲染进程
    hello: () => 'Hello from Electron!',
})
