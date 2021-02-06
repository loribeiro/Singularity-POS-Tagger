async function normalizeTextStream(streamEntrada, streamSaida){
    const removeAccents = require("./remove_accents/index")
    const transformInterface= require("./transform/index")
    const transform = new transformInterface(removeAccents)
    const {executeTransformText} = require("./execute_transform/index")
    const execute = executeTransformText()
    
    return execute(streamEntrada,streamSaida, transform)

}
exports.normalizeTextStream = normalizeTextStream;