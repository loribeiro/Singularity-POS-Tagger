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
            if(tags[indexTags-1] === "NUM" && !isNaN(indexPalavra)){
                return 0.9
            }else{
                return 0.00001
            }
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
        //console.log(matrixC)   

        return await foward()
    }

    return  execute()
}
module.exports = fowardPass;