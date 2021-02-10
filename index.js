const createTransitionProbabilityMatrix = require("./transition_probability/index")
const createEmissionProbabilityMatrix = require("./emission_probability/index")
const generateBaseFiles = require("./generateBaseFiles")
const viterbi = require("./viterbi/index")
async function main(){
    const a = await generateBaseFiles()
    const b = await createTransitionProbabilityMatrix()
    const c = await createEmissionProbabilityMatrix()
    const d = await viterbi()
}
main()