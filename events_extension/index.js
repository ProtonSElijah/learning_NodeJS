const Watcher = require('./watcher.js');
const fs = require('fs');

const watchDir = './old';
const processedDir = './new';

const watcher = new Watcher(watchDir, processedDir);

watcher.on('process', (file) => {
    const watchFile = `${watchDir}/${file}`;
    const processedFile = `${processedDir}/${file.toLowerCase()}`;
    fs.rename(watchFile, processedFile, err => {
        if (err) throw err;
    });
});

watcher.start();
