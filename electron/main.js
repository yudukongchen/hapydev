import { app, BrowserWindow } from 'electron';
import path from 'node:path';

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // 可选，预加载脚本
            nodeIntegration: false,
            contextIsolation: true,
        },
    })

    // 开发环境加载 Vite 本地服务
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL('http://localhost:8000')
        win.webContents.openDevTools()
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'))
    }
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
