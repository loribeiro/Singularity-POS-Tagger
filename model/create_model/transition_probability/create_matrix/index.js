
const fs = require("fs")
const util = require('util');
const mkdirAsync = util.promisify(fs.mkdir);


function createTransitionMatrix(BaseFolder){
    const e = 0.0001 // constante para evitar que o denominador se torne zero
    async function retrieveTagsAsArray(){
        if(fs.existsSync(BaseFolder + "/model/corpus_data/tagset/tagset.txt")){
            const arquivoLeitura = fs.createReadStream(BaseFolder + "/model/corpus_data/tagset/tagset.txt")
            return await new Promise(function(resolve, reject){
               let vetor = []
               let tags = ""
                arquivoLeitura.on("data",(data)=>{
                    tags = tags + data.toString()
                })
                arquivoLeitura.on("end",function(){
                    vetor = tags.split(",")
                    resolve(vetor)
                })
                arquivoLeitura.on("error", reject)
            }) 
        }else{
            return new Promise(function(resolve, reject){reject})
        }
    }

    function __generateIndexMap(vetor){
        let map = {}
        for(let i = 0; i < vetor.length; i++){
            map[vetor[i]] = i+1
        }
        return map
    }

    function __generateZeroMatrix(tamanho){
        let matrix = Array(tamanho).fill().map(() => Array(tamanho).fill(e));
        matrix[0].fill(0) // zerar primeira linha do vetor para evitar que uma frase possa começar com qualquer tag
        return matrix
    }

    function generateTransformObject(vetor){
        return {
            "adjacence": __generateZeroMatrix(vetor.length+1),
            "dictionary": __generateIndexMap(vetor)
        }
    }

    async function generateTransitionMatrixFile(transformObject){
        const {executeTransformText} = require("./execute_transform/ExecuteTransformation")
        const exec = executeTransformText()
        const generateTuples = require("./generate_tuples/GenerateTagTuple")
        const transformInterface = require("./transform/TransformInterface")
        const transformFunction = new transformInterface(generateTuples,transformObject,e)
        const arquivoLeitura = fs.createReadStream(BaseFolder + "/model/corpus_data/normalized_corpus/normalized-train.txt")
        if (fs.existsSync(BaseFolder + "/model/corpus_data/matrix")) {
            if(fs.existsSync(BaseFolder + "/model/corpus_data/matrix/transition_matrix.json")){
                return true
            }else{
                const arquivoSaida = fs.createWriteStream(BaseFolder + "/model/corpus_data/matrix/transition_matrix.json")
                return await exec(arquivoLeitura,arquivoSaida,transformFunction)
            }
        }else{
            await mkdirAsync(BaseFolder + "/model/corpus_data/matrix",{ recursive: true }).catch(err=>console.log(err))
            return await generateTransitionMatrixFile(transformObject)
        }
    }

    async function execute(){
        const vetor = await retrieveTagsAsArray()
        return generateTransitionMatrixFile(generateTransformObject(await vetor))
    }
    return execute()
}

module.exports =  createTransitionMatrix;
