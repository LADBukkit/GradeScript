const FS = require('fs')
const SHOWDOWN = require('showdown')
const PUG = require('pug')
const PATH = require('path')

const converter = new SHOWDOWN.Converter()
const pugCompiled = PUG.compileFile(PATH.join(__dirname, 'assets/grade.pug'))

class GradeFile {
    constructor(path) {
        this.points = []
        this.student = ''
        this.criteria = ''
        this.style = ''
        this.template = ''
        this.path = path
        this.directory = PATH.dirname(path)
        this.content = ''
        this.error = false
        this.exception = ''

        this.parseFile()
    }

    parseFile() {
        let content = FS.readFileSync(this.path).toString()
        let split = content.split("===")
        let meta = {}
        split[0].split("\n").forEach(s => {
            let m = s.split(/:\s*(.+)/)
            if(m[0]) meta[m[0]] = m[1]
        })

        if(!meta['points']) throw `No 'points' defined in ${this.path}!`
        if(!meta['student']) throw `No 'student' defined in ${this.path}!`
        if(!meta['corrector']) throw `No 'corrector' defined in ${this.path}!`
        if(!meta['criteria']) throw `No 'criteria' defined in ${this.path}!`

        this.points = JSON.parse(meta['points'])
        this.student = meta['student']
        this.corrector = meta['corrector']
        this.criteria = JSON.parse(FS.readFileSync(this.directory + meta['criteria']).toString())
        this.error = !!meta['error']
    
        this.content = converter.makeHtml(split[1])
        if(this.error) {
            this.exception = split[2] || ''
        }
    }

    toHTML() {
        let data = {
            student: this.student,
            corrector: this.corrector,
            content: this.content,
            points: this.points,
            criteria: this.criteria,
            error: this.error,
            exception: this.exception
        }
        let html = ''
        if(this.template) {
            let temp = PUG.compileFile(PATH.join(this.directory, this.template))
            html = temp(data)
        } else {
            html = pugCompiled(data)
        }

        let style = FS.readFileSync(this.style || PATH.join(__dirname, 'assets/style.css')).toString()

        return `<style>\n${style}\n</style>\n${html}`
    }
}

module.exports = {
    GradeFile: GradeFile
}