const fs = require("fs")
const util = require('util');
const mkdirAsync = util.promisify(fs.mkdir);


async function createWordDictionaryFile(arquivoLeitura,BaseFolder){
    const getWords = require("./retrieve_words/index")
    const transformInterface = require("./transform/index")
    const transform = new transformInterface(getWords)
    const {executeTransformText} = require("./execute_transform/index")
    const execute = executeTransformText()
    
    if (fs.existsSync(BaseFolder + "/model/corpus_data/word_dictionary")) {
        const arquivoEscrita = fs.createWriteStream(BaseFolder + "/model/corpus_data/word_dictionary/corpusDictionary.json")     
       return await execute(arquivoLeitura, arquivoEscrita, transform)
    }else{
        await mkdirAsync(BaseFolder + "/model/corpus_data/word_dictionary",{ recursive: true }).catch(err=>console.log(err))
        return await createWordDictionaryFile(arquivoLeitura, BaseFolder)
    }

    
}

module.exports = createWordDictionaryFile;
