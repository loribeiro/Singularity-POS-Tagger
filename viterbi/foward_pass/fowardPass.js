async function fowardPass(matC, matD, wordDict, emiMat, tranMat, word, vetorTags){
    let matrixC = matC
    let matrixD = matD
    let wordDictionary = wordDict
    let emissionMatrix = emiMat
    let transitionMatrix = tranMat
    let words = word
    let tags = vetorTags 

    function retrieveProbabilityEmissionMatrix(indexTags, indexPalavra){
        let probability = emissionMatrix[indexTags][wordDictionary[indexPalavra]]
        if(typeof probability ===  "undefined"){
            return 0.0001
        }else{

            return emissionMatrix[indexTags][wordDictionary[indexPalavra]]
        }
    }

    function max(w, i){
        for(let k = 0; k < tags.length; k++){
            let soma = matrixC[k][w-1] * transitionMatrix[k+1][i+1] * retrieveProbabilityEmissionMatrix(i+1, words[w])
            if(soma > matrixC[i][w]){
                matrixC[i][w] = soma
                matrixD[i][w] = k
            }
            if(words[w] ==="irara"){
                console.log(words[w],retrieveProbabilityEmissionMatrix(i+1, words[w]), soma)
            }
        }
    }

    async function foward(){
        return new Promise(function(resolve, reject){
            for(let word=1; word<words.length; word++){
                for(let i=0; i < tags.length; i++){
                   max(word, i)
                }
            }     
            resolve({
                "matrixC": matrixC,
                "matrixD": matrixD
            })
        })
    }
    
    async function execute(){
        return await foward()
    }

    return  execute()
}
module.exports = fowardPass;