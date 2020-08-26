const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url == '/') {
        getTitles(res);
    }
}).listen(3010, '127.0.0.1', () => {console.log("Connect");});

const getTitles = (res) => {
    fs.readFile('./titles.json', (err, data) => {
        if (err) return hadError(err, res);
        getTemplate(JSON.parse(data.toString()), res);
    });
}

const getTemplate = (titles, res) => {
    fs.readFile('./template.html', (err, data) => {
        if (err) return hadError(err, res);
        formatHtml(titles, data.toString(), res);
    });
}

const formatHtml = (titles, tmpl, res) => {
    const html = tmpl.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(html);
}

const hadError = (err, res) => {
    console.log(err);
    res.end("Server error");
}
