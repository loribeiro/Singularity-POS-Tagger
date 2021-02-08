const fs = require("fs");

async function generateBaseFiles(){
    const executeNormalization = require("./tratar_texto/index");
    const util = require('util');

    async function normalizeOrinalCorpus(){
        const readdir = util.promisify(fs.readdir);
        nomes = await readdir("corpus_data/original_corpus");
        const myPromises = []
        for (let i =0; i<nomes.length; i++){
            const arquivoSaida = nomes[i].replace("macmorpho", "normalized");
            myPromises.push(()=>executeNormalization(nomes[i], arquivoSaida))       
        }
        return await Promise.all([
            myPromises[0](),
            myPromises[1](),
            myPromises[2]()
        ]).catch(err=>console.log(err))
    }
    
    
    async function executeTagSetGenerator(){
        if(fs.existsSync("corpus_data/tagset/tagset.txt")){
            return true
        }else{
            const execute = require("./create_tagset/index")
            const arquivoLeitura = fs.createReadStream("corpus_data/normalized_corpus/normalized-train.txt")
            return await execute(arquivoLeitura)
        }
    }
    
    async function createTagSetFile(){
        if(!fs.existsSync("corpus_data/normalized_corpus/normalized-train.txt")){
            await normalizeOrinalCorpus()
    
            return await executeTagSetGenerator()
        }else{
          
            return await executeTagSetGenerator()
        }
    }
    async function createWordDictionary(){
        if(!fs.existsSync("corpus_data/word_dictionary/corpusDictionary.json")){  
            const createWordDictionaryFile = require("./create_corpus_word_dictionary/index")
            const arquivoLeitura = fs.createReadStream("corpus_data/normalized_corpus/normalized-train.txt")
            return await createWordDictionaryFile(arquivoLeitura)
        }else{
            return true
        }
    }
    async function executeRoutine(){
        const start = await createTagSetFile()
        const finish = await createWordDictionary()
        
        return (await finish && await start)
    }
    return executeRoutine()
}
 
async function main(){
    const createTransitionProbabilityMatrix = require("./transition_probability/index")
    const createEmissionProbabilityMatrix = require("./emission_probability/index")

    const a = await generateBaseFiles()
    const b = await createTransitionProbabilityMatrix()
    const c = await createEmissionProbabilityMatrix()
    
}
main()