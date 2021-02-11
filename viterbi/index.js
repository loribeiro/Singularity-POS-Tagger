const initialization = require("./initialization/initialization")
const fowardPass = require("./foward_pass/fowardPass")
const backwardPass = require("./backward_pass/backwardPass")
async function viterbi(text){
    const a = await initialization(text)
    const b = await fowardPass(a.matrixC, a.matrixD, a.wordDictionary, a.emissionMatrix, a.transitionMatrix, a.words, a.tags)
    const c = await backwardPass(a.words,a.tags, b.matrixC, b.matrixD)
    console.log(await c)
    return await c

}
module.exports = viterbi;