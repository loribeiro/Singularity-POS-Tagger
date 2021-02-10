async function backwardPass(word, tags, matC, matD){
    let words = word
    let tagsVector = tags
    let matrixC = matC
    let matrixD = matD
    async function backward(){
        return new Promise(function(resolve, reject){
            let max = -Infinity
            let index = 0
            let actualPosition = words.length -1
            for(let i = 0; i<tagsVector.length; i++){
                if(matrixC[i][words.length-1]> max){
                    max = matrixC[i][words.length-1]
                    index = i
                }
            }
            let saida = []
            saida.unshift(words[actualPosition]+"_"+tagsVector[index])
            while(actualPosition>0){
                index = matrixD[index][actualPosition]
                actualPosition = actualPosition - 1
                saida.unshift(words[actualPosition]+"_"+tagsVector[index])
            }
            resolve(saida)

        })
        //console.log(saida)
    }
    async function execute(){
        //console.log(matrixC)
        return await backward()
    }
    return execute()
}

module.exports = backwardPass;