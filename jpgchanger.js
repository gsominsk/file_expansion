var fs = require('fs');
var path = require('path');
// var logtext = require('./logtext');


setInterval(function () {
    getFiles(`${__dirname}/test`);
}, 10000);

var getFiles = function (dir){
    var files = fs.readdirSync(dir);

    for (var i in files){
        var file = dir + '/' + files[i];
        fs.statSync(file).isDirectory() ?
            getFiles(file)
            : getFileType(file).match(/jpeg/ig) ?
                changeFileType(file)
                : 0;
    }
};

function changeFileType (file) {
    fs.rename(file, file.substr(0, file.lastIndexOf(".")) + ".jpg", function(err) {
        if ( err ) logtext.log('ERROR: ' + err);
        else console.log("file has changed - ", file);
    });
}

function getFileType (file) {
    return file.substring(file.lastIndexOf('.') + 1, file.length);
}