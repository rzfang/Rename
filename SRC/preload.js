const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('test', {
  listFiles: async () => await ipcRenderer.invoke('listFiles')
});
