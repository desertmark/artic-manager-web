var path = require('path');
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;

app.use('/dist', express.static('dist'));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../dist/index.html')));
});

app.listen(PORT, () => console.log('app running on port ', PORT, process.env.NODE_ENV));