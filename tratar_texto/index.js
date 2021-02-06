const { prependListener } = require("process")

async function executeNormalization(nomeArquivoEntrada, nomeArquivoSaida){
    const fs = require("fs")
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
        fs.mkdir("corpus_data/normalized_corpus",{ recursive: true },(err)=>{
            if(err){
                return Promise.resolve(false)
            }
            const arquivoEscrita = fs.createWriteStream("corpus_data/normalized_corpus/"+ nomeArquivoSaida)
            const {normalizeTextStream} = require("./normalize_stream_text/index")
           return normalizeTextStream(arquivoLeitura,arquivoEscrita)
        })
    }
    
}
module.exports = executeNormalization;