const createTransitionProbabilityMatrix = require("./model/create_model/transition_probability/index")
const createEmissionProbabilityMatrix = require("./model/create_model/emission_probability/index")
const generateBaseFiles = require("./model/generateBaseFiles")
const viterbi = require("./viterbi/index")
const normalizeText = require("./normalize_text/normalizeAPI")
const BaseFolder = require("./baseFolder")

async function generateModel(){
    const a = await generateBaseFiles().catch(err=>console.log(err))
    const b = await createTransitionProbabilityMatrix(BaseFolder)
    const c = await createEmissionProbabilityMatrix(BaseFolder)
    
    return (await a && await b && await c)
}

async function PosTagger(){
    const tagger = await constructor().catch(err=> console.log(err))

    async function constructor(){
        const model = await generateModel().catch(err=> console.log(err))

        if(await model){
            return {
                "analyze": (text)=> viterbi(text).catch(err=>console.log(err))
            }
        }else{
            return false
        }
    }

    async function executeStringAnalyzer(text){
        const normalized = await normalizeText(true)
        return await tagger.analyze(await normalized(text)).catch(err => console.log(err))
    }

    async function executeStreamAnalyzer(streamInput, streamOutput){
        const normalized = await normalizeText()

        return await normalized(streamInput, streamOutput, await tagger.analyze).catch(err => console.log(err))
    }

    return {
        "analyzeString": executeStringAnalyzer,
        "analyzeStream": executeStreamAnalyzer,
    }
}

module.exports = PosTagger;

