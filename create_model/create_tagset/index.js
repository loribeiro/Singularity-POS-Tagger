const fs = require("fs")
const util = require('util');
const mkdirAsync = util.promisify(fs.mkdir);

async function createTagSetFile(arquivoLeitura){
    const getTaggs = require("./retrieve_tagset/index")
    const transformInterface = require("./transform/index")
    const transform = new transformInterface(getTaggs)
    const {executeTransformText} = require("./execute_transform/index")
    const execute = executeTransformText()
    
    if (fs.existsSync("corpus_data/tagset")) {
        const arquivoEscrita = fs.createWriteStream("corpus_data/tagset/tagset.txt")     
       return await execute(arquivoLeitura, arquivoEscrita, transform)
    }else{
        await mkdirAsync("corpus_data/tagset",{ recursive: true }).catch((err)=>console.log(err))
        return createTagSetFile(arquivoLeitura)
    }

    
}

module.exports = createTagSetFile;
