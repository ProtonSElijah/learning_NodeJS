const fs = require("fs");
const events = require('events');

class Watcher extends events.EventEmitter {
    constructor(watchDir, processDir) {
        super();
        this.watchDir = watchDir;
        this.processDir = processDir;
    }

    watch() {
        fs.readdir(this.watchDir, (err, files) => {
            if (err) throw err;
            for (let index in files) {
                this.emit('process', files[index]);
            }
        });
    }

    start() {
        console.log('start');
        fs.watchFile(this.watchDir, () => {
            this.watch();
        })
    }
}

module.exports = Watcher;
