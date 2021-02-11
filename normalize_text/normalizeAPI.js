const normalizeFunction = require("./normalize_string/normalizeString")
const {executeTransformText} = require("./viterbi_stream/execute_transform/index")
const transformInterfaceNormalize = require("./normalize_stream_text/transform/index")
const transformInterfaceViterbi= require("./viterbi_stream/transform/index")

async function normalizeText(isText = false){
    let _isText = isText

    async function executeText(text){
        return new Promise(function(resolve, reject){
            const resposta = normalizeFunction(text)
            resolve(resposta)
        })
    }
    async function executeStream(streamInput, streamOutput, viterbi){
       
        const transformNormalize = new transformInterfaceNormalize(normalizeFunction)
        const transformViterbi = new transformInterfaceViterbi(viterbi)
        const execute = executeTransformText()

        return execute(streamInput, streamOutput, transformNormalize, transformViterbi)
    }
    async function execute(){
        if(_isText === true){
            return executeText
        }else{
            return executeStream
        }
    }
    return execute()
}

module.exports = normalizeText;