async function normalizeTextStream(inputStream, outputStream){
    const removeAccents = require("./remove_accents/index")
    const transformInterface= require("./transform/index")
    const transform = new transformInterface(removeAccents)
    const {executeTransformText} = require("./execute_transform/index")
    const execute = executeTransformText()
    
    return execute(inputStream,outputStream, transform)

}
exports.normalizeTextStream = normalizeTextStream;