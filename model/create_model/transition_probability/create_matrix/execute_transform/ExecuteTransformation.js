
function executeTransformText(){
    
    async function modifyText(inputStream, outputStream, transformFunction){

        return await new Promise(function(resolve,reject){
                inputStream.pipe(transformFunction).pipe(outputStream) 
                inputStream.on("end",()=>{
                    resolve(true)
                })
                inputStream.on("error", reject)
             })
    }

    function execute(inputStream, outputStream, transformFunction){   
        return modifyText(inputStream,outputStream, transformFunction)
    }
    
    return execute
}

exports.executeTransformText = executeTransformText;