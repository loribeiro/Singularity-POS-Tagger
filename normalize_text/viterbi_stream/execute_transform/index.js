
function executeTransformText(){
    
    async function treatText(streamEntrada, streamSaida, transformFunction, transformViterbi){
        
        return await new Promise(function(resolve, reject){
            streamEntrada.pipe(transformFunction).pipe(transformViterbi).pipe(streamSaida)
            streamEntrada.on("end",()=>{
                resolve(true)
            })
            streamEntrada.on("error", reject)
        })
    }

    function execute(streamEntrada, streamSaida, transformFunction, transformViterbi){   
        return treatText(streamEntrada,streamSaida, transformFunction, transformViterbi)
    }
    
    return execute
}

exports.executeTransformText = executeTransformText;