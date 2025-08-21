import { app, protocol, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false     // 允许 ESM preload（Electron 20+）
            // preload: path.join(__dirname, 'preload.js') // 可选，预加载脚本
        },
    })

    // 开发环境加载 Vite 本地服务
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL('http://localhost:8000')
        win.webContents.openDevTools()
    } else {
        // 关键：自动打开 DevTools
        win.webContents.openDevTools();
        win.loadFile(path.join(__dirname, '../dist/index.html'))
    }
}
// 把 file:// 协议加入 fetch 白名单
protocol.registerSchemesAsPrivileged([
    { scheme: 'file', privileges: { bypassCSP: true, supportFetchAPI: true } },
]);

app.whenReady().then(() => {
    console.log('App path:', app.getAppPath())

    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
