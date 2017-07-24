var path = require('path')
// var childProcess = require('child_process')
// var phantomjs = require('phantomjs-prebuilt')
// var binPath = phantomjs.path

// var childArgs = [
//     path.join(__dirname, 'simple.js'),
//     'some other argument (passed to phantomjs script)'
// ]

// childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
//     // handle results
//     console.log(err,stdout,stderr);

// })

var phantomjs = require('phantomjs-prebuilt')
var program = phantomjs.exec(path.join(__dirname, 'simple.js'))
program.stdout.pipe(process.stdout)
program.stderr.pipe(process.stderr)
program.on('exit', code => {
  // do something on end 
  console.log(`end ...`);
})
