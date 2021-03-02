import fs = require('fs');
import { parse } from 'node-html-parser';

interface opts {
    path: string,
    files?: Array<string>
}

const get_all_files = function(opts: opts): Array<string> {
    let files: Array<string> = opts.files || [];
    let path: string = opts.path;
    let newFiles = fs.readdirSync(path)

    newFiles.forEach(file=>{
        if (fs.statSync(`${path}/${file}`).isDirectory()) {
            files = get_all_files({
                path: `${path}/${file}`, 
                files: files
            })
        } else files.push(`${path}/${file}`)
    })
    return files
}

export default async function html_ts_remover(path: string) {
    let files: Array<string> = [];
    get_all_files({ path: path }).forEach((file: string) => {
        let reg: RegExp = /.html$/;
        if (reg.test(file)) {
            files.push(file)
        }
    })
    files.forEach((file: string) => {
        let document = fs.readFileSync(file, { encoding: `utf8` });
        let root = parse(document);
        let handle_node = function (node: any) {
            if (node.childNodes) {
                node.childNodes.forEach(handle_node);
            }
            if (node.rawAttrs) {
                //console.log(node.rawAttrs)
                let parsed_attributes = /(?<=href=")(.*)(?=")/.exec(node.rawAttrs);
                if (parsed_attributes) {
                    let fileName = parsed_attributes[0]
                    if (/.ts$/.test(fileName)) {
                        node.rawAttrs = node.rawAttrs.replace(fileName, fileName.replace(/.ts/g, '.js'))
                    }
                }
            }
        }
        root.childNodes.forEach(handle_node)
        fs.writeFileSync(file, root.toString(), {encoding:'utf8'})
    })
}