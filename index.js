const FS = require('fs')
const GradeFile = require('./gradefile.js').GradeFile
const PATH = require('path')

function processPath(path) {
    let stat = FS.lstatSync(path)
    if(stat.isDirectory()) {
        FS.readdirSync(path).forEach(f => processPath(path + '/' + f))
    } else {
        if(PATH.extname(path) == '.gmd') {
            console.log('Found file ' + path)

            let gf = new GradeFile(path)
            FS.writeFileSync(path + '.html', gf.toHTML())
            console.log('Converted to HTML')
        }
    }
}

// Main
if(process.argv.length <= 2) {
    console.log('Parses .gmd files to html')
    console.log('Usage:')
    console.log('\tgradescript <file...>')
    return
}

for(let argi = 2; argi < process.argv.length; argi++) {
    let arg = process.argv[argi]
    processPath(arg)
}
