const fs = require("fs")
const util = require('util');
const mkdirAsync = util.promisify(fs.mkdir);
const BaseFolder = require(__dirname + "/../baseFolder")

async function retrieveObjects(){

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

    async function retrieveWordDictionary(){
        if(fs.existsSync(BaseFolder + "/model/corpus_data/word_dictionary/corpusDictionary.json")){
            const arquivoLeitura = fs.createReadStream(BaseFolder + "/model/corpus_data/word_dictionary/corpusDictionary.json")
            return await new Promise(function(resolve, reject){
               let dictionary = {}
               let conteudo = ""
                arquivoLeitura.on("data",(data)=>{
                    conteudo = conteudo + data.toString()
                })
                arquivoLeitura.on("end",function(){
                    dictionary = JSON.parse(conteudo)
                    resolve(dictionary)
                })
                arquivoLeitura.on("error", reject)
            }) 
        }else{
            return new Promise(function(resolve, reject){reject})
        }
    }

    async function retrieveEmissionMatrix(){
        if(fs.existsSync(BaseFolder + "/model/corpus_data/matrix/emission_matrix.json")){
            const arquivoLeitura = fs.createReadStream(BaseFolder + "/model/corpus_data/matrix/emission_matrix.json")
            return await new Promise(function(resolve, reject){
                let dictionary = {}
                let conteudo = ""
                 arquivoLeitura.on("data",(data)=>{
                     conteudo = conteudo + data.toString()
                 })
                 arquivoLeitura.on("end",function(){
                     dictionary = JSON.parse(conteudo)
                     resolve(dictionary["emission_matrix"])
                 })
                 arquivoLeitura.on("error", reject)
             }) 

        }else{
            return new Promise(function(resolve, reject){reject})
        }
    }

    async function retrieveTransitionMatrix(){
        if(fs.existsSync(BaseFolder + "/model/corpus_data/matrix/transition_matrix.json")){
            const arquivoLeitura = fs.createReadStream(BaseFolder + "/model/corpus_data/matrix/transition_matrix.json")
            return await new Promise(function(resolve, reject){
                let dictionary = {}
                let conteudo = ""
                 arquivoLeitura.on("data",(data)=>{
                     conteudo = conteudo + data.toString()
                 })
                 arquivoLeitura.on("end",function(){
                     dictionary = JSON.parse(conteudo)
                     resolve(dictionary)
                 })
                 arquivoLeitura.on("error", reject)
             }) 

        }else{
            return new Promise(function(resolve, reject){reject})
        }
    }
    
    async function execute(){
        
        return Promise.all(
            [
                retrieveTagsAsArray(),
                retrieveWordDictionary(),
                retrieveEmissionMatrix(),
                retrieveTransitionMatrix()
            ]
        ).catch(err=>console.log(err))
    }
    return execute()
}

module.exports = retrieveObjects();