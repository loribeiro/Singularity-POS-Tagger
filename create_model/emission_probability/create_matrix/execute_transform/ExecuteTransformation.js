
function executeTransformText(){
    
    async function treatText(streamEntrada, streamSaida, transformFunction){

        return await new Promise(function(resolve,reject){
                streamEntrada.pipe(transformFunction).pipe(streamSaida) 
                streamEntrada.on("end",()=>{
                    resolve(true)
                })
                streamEntrada.on("error", reject)
             })
    }

    function execute(streamEntrada, streamSaida, transformFunction){   
        return treatText(streamEntrada,streamSaida, transformFunction)
    }
    
    return execute
}

exports.executeTransformText = executeTransformText;