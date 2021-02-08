const { prependListener } = require("process")
const fs = require("fs")
const util = require('util');
const mkdirAsync = util.promisify(fs.mkdir);
async function executeNormalization(nomeArquivoEntrada, nomeArquivoSaida){
    const arquivoLeitura = fs.createReadStream("corpus_data/original_corpus/" + nomeArquivoEntrada)
    if(fs.existsSync("corpus_data/normalized_corpus")){
        if(fs.existsSync("corpus_data/normalized_corpus/" + nomeArquivoSaida)){
            return Promise.resolve(true)
        }else{
            const arquivoEscrita = fs.createWriteStream("corpus_data/normalized_corpus/" + nomeArquivoSaida)
            const {normalizeTextStream} = require("./normalize_stream_text/index")
            return normalizeTextStream(arquivoLeitura,arquivoEscrita)
        }

    }else{
        await mkdirAsync("corpus_data/normalized_corpus",{ recursive: true }).catch(err=>console.log(err))
        const arquivoEscrita = fs.createWriteStream("corpus_data/normalized_corpus/"+ nomeArquivoSaida)
        const {normalizeTextStream} = require("./normalize_stream_text/index")
       return await normalizeTextStream(arquivoLeitura,arquivoEscrita)
    }
    
}
module.exports = executeNormalization;