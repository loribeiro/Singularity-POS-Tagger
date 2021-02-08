const fs = require("fs")
const util = require('util');
const mkdirAsync = util.promisify(fs.mkdir);

function createTransitionMatrix(){
    const e = 0.0001 // constante para evitar que o denominador se torne zero
    async function retrieveTagsAsArray(){
        if(fs.existsSync("corpus_data/tagset/tagset.txt")){
            const arquivoLeitura = fs.createReadStream("corpus_data/tagset/tagset.txt")
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
            throw "Arquivo tagset.txt inexistente"
        }
    }

    async function retrieveWordDictionaryAsDictionary(){
        if(fs.existsSync("corpus_data/word_dictionary/corpusDictionary.json")){
            const arquivoLeitura = fs.createReadStream("corpus_data/word_dictionary/corpusDictionary.json")
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
            throw "Arquivo corpusDictionary.json inexistente"
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
        const dimensions = [ matrix.length, matrix[0].length ];
        console.log(dimensions)
        return matrix
    }

    function generateTransformObject(vetor,dictionary){
        return {
            "adjacence": __generateZeroMatrix(vetor.length+1,Object.keys(dictionary).length),
            "dictionary": __generateIndexMap(vetor)
        }
    }

    async function generateEmissionMatrixFile(transformObject){
        const {executeTransformText} = require("./execute_transform/ExecuteTransformation")
        const exec = executeTransformText()
        const generateTuples = require("./generate_tuples/GenerateWordTagTuple")
        const transformInterface = require("./transform/TransformInterface")
        const transformFunction = new transformInterface(generateTuples,transformObject,e)
        const arquivoLeitura = fs.createReadStream("corpus_data/normalized_corpus/normalized-train.txt")
        if (fs.existsSync("corpus_data/matrix")) {
            if (fs.existsSync("corpus_data/matrix/emission_matrix.json")) {
                return true
            }else{
                const arquivoSaida = fs.createWriteStream("corpus_data/matrix/emission_matrix.json")
                return await exec(arquivoLeitura,arquivoSaida,transformFunction)
            }
        }else{
            await mkdirAsync("corpus_data/matrix",{ recursive: true })
            return await generateTransitionMatrixFile(transformObject)
        }
    }

    async function execute(){
        const vetor = await retrieveTagsAsArray()
        const dictionary = await retrieveWordDictionaryAsDictionary()
        console.log(Object.keys(await  dictionary).length)
        
        return generateEmissionMatrixFile(generateTransformObject(await vetor, await dictionary))
    }
    return execute()
}

module.exports =  createTransitionMatrix;
