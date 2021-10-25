
function executeTransformText(){
    
    async function modifyText(inputStream, outputStream, transformFunction, transformViterbi){
        
        return await new Promise(function(resolve, reject){
            inputStream.pipe(transformFunction).pipe(transformViterbi).pipe(outputStream)
            inputStream.on("end",()=>{
                resolve(true)
            })
            inputStream.on("error", reject)
        })
    }

    function execute(inputStream, outputStream, transformFunction, transformViterbi){   
        return modifyText(inputStream,outputStream, transformFunction, transformViterbi)
    }
    
    return execute
}

exports.executeTransformText = executeTransformText;