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
           return false
        }
    }

    async function retrieveWordDictionaryAsDictionary(){
        if(fs.existsSync(BaseFolder + "/model/corpus_data/word_dictionary/corpusDictionary.json")){
            const arquivoLeitura = fs.createReadStream(BaseFolder + "/model/corpus_data/word_dictionary/corpusDictionary.json")
            return await new Promise(function(resolve, reject){
                let dictionary = ""
                arquivoLeitura.on("data", data=>{
                    dictionary = dictionary + data.toString()
                })
                arquivoLeitura.on("end", function(){
                    resolve(JSON.parse(dictionary))
                })
                arquivoLeitura.on("error", reject)
            })
        }else{
            return false
        }
    }

    function __generateIndexMap(vetor){
        let map = {}
        for(let i = 0; i < vetor.length; i++){
            map[vetor[i]] = i+1
        }
        return map
    }

    function __generateZeroMatrix(tamanho_linhas, tamanho_colunas){
        let matrix = Array(tamanho_linhas).fill().map(() => Array(tamanho_colunas).fill(e));
        return matrix
    }

    function generateTransformObject(vetor,dictionary){
        return {
            "adjacence": __generateZeroMatrix(vetor.length+1,Object.keys(dictionary).length),
            "dictionary": __generateIndexMap(vetor),
            "dictPalavras": dictionary
        }
    }

    async function generateEmissionMatrixFile(transformObject){
        if (fs.existsSync(BaseFolder + "/model/corpus_data/matrix")) {
            if (fs.existsSync(BaseFolder + "/model/corpus_data/matrix/emission_matrix.json")) {
                return true
            }else{
                const {executeTransformText} = require("./execute_transform/ExecuteTransformation")
                const exec = executeTransformText()
                const generateTuples = require("./generate_tuples/GenerateWordTagTuple")
                const transformInterface = require("./transform/TransformInterface")
                const transformFunction = new transformInterface(generateTuples,transformObject,e)
                const arquivoLeitura = fs.createReadStream(BaseFolder+"/model/corpus_data/normalized_corpus/normalized-train.txt")
                const arquivoSaida = fs.createWriteStream(BaseFolder+"/model/corpus_data/matrix/emission_matrix.json")
                return await exec(arquivoLeitura,arquivoSaida,transformFunction)
            }
        }else{
            await mkdirAsync(BaseFolder+"/model/corpus_data/matrix",{ recursive: true })
            return await generateEmissionMatrixFile(transformObject)
        }
    }

    async function execute(){
        const vetor = await retrieveTagsAsArray()
        const dictionary = await retrieveWordDictionaryAsDictionary()

        return generateEmissionMatrixFile(generateTransformObject(await vetor, await dictionary))
    }
    return execute()
}

module.exports =  createTransitionMatrix;
