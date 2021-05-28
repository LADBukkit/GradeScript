const FS = require('fs')
const GradeFile = require('./gradefile.js').GradeFile
const PATH = require('path')

function processPath(path) {
    let stat = FS.lstatSync(path)
    if(stat.isDirectory()) {
        FS.readdirSync(path).forEach(f => processPath(PATH.join(path, f)))
    } else {
        if(PATH.extname(path) == '.gmd') {
            console.log(`Found file ${path}`)

            let gf = new GradeFile(path)
            gf.toHTML(html => {
                FS.writeFileSync(path + '.html', html)
                console.log(`Converted ${path} to HTML`)
            })
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
