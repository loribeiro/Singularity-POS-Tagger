const createTransitionProbabilityMatrix = require("./transition_probability/index")
const createEmissionProbabilityMatrix = require("./emission_probability/index")
const generateBaseFiles = require("./generateBaseFiles")
const viterbi = require("./viterbi/index")
const normalizeText = require("./normalize_text/normalizeAPI")

async function generateModel(){
    const a = await generateBaseFiles()
    const b = await createTransitionProbabilityMatrix()
    const c = await createEmissionProbabilityMatrix()
    
    return (await a && await b && await c)
}

async function PosTagger(){
    const tagger = await constructor()

    async function constructor(){
        const model = await generateModel()

        if(await model){
            return {
                "analyze": (text)=> viterbi(text)
            }
        }else{
            return false
        }
    }

    async function executeStringAnalyzer(text){
        const normalized = await normalizeText(true)
        return await tagger.analyze(await normalized(text))
    }

    async function executeStreamAnalyzer(streamInput, streamOutput){
        const normalized = await normalizeText()

        return await normalized(streamInput, streamOutput, await tagger.analyze)
    }

    return {
        "analyzeString": executeStringAnalyzer,
        "analyzeStream": executeStreamAnalyzer,
    }
}

const fs = require("fs")
async function whatever(){
    const tagger = await PosTagger()
    const arquivoLeitura = fs.createReadStream("corpus_data/normalized_corpus/normalized-train.txt")
    const arquivoEscrita = fs.createWriteStream("corpus_data/teste")
    //await tagger.analyzeString("lucas e doido")
    await tagger.analyzeStream(arquivoLeitura,arquivoEscrita)
    
}
whatever()
