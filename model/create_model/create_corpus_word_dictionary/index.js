const fs = require("fs")
const util = require('util');
const mkdirAsync = util.promisify(fs.mkdir);

async function createWordDictionaryFile(arquivoLeitura){
    const getWords = require("./retrieve_words/index")
    const transformInterface = require("./transform/index")
    const transform = new transformInterface(getWords)
    const {executeTransformText} = require("./execute_transform/index")
    const execute = executeTransformText()
    
    if (fs.existsSync("model/corpus_data/word_dictionary")) {
        const arquivoEscrita = fs.createWriteStream("model/corpus_data/word_dictionary/corpusDictionary.json")     
       return await execute(arquivoLeitura, arquivoEscrita, transform)
    }else{
        await mkdirAsync("model/corpus_data/word_dictionary",{ recursive: true }).catch(err=>console.log(err))
        return await createWordDictionaryFile(arquivoLeitura)
    }

    
}

module.exports = createWordDictionaryFile;
