const fs = require("fs")

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
        fs.mkdir("corpus_data/tagset",{ recursive: true },(err)=>{
            if(err){
                throw err
            }
            createTagSetFile(arquivoLeitura)
            //const arquivoEscrita = fs.createWriteStream("corpus_data/tagset/tagset.txt")     
            //execute(arquivoLeitura, arquivoEscrita, transform)
        })
    }

    
}

module.exports = createTagSetFile;
