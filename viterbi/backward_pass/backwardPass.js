async function backwardPass(word, tags, matC, matD){
    let words = word
    let tagsVector = tags
    let matrixC = matC
    let matrixD = matD
    async function backward(){
        return new Promise(function(resolve, reject){
            let max = -Infinity
            let index = 0
            let currentlyPosition = words.length -1
            for(let i = 0; i<tagsVector.length; i++){
                if(matrixC[i][words.length-1]> max){
                    max = matrixC[i][words.length-1]
                    index = i
                }
            }
            let output = []
            output.unshift(words[currentlyPosition]+"_"+tagsVector[index])
            while(currentlyPosition>0){
                index = matrixD[index][currentlyPosition]
                currentlyPosition = currentlyPosition - 1
                output.unshift(words[currentlyPosition]+"_"+tagsVector[index])
            }
            resolve(output)

        })
       
    }
    async function execute(){
        
        return await backward()
    }
    return execute()
}

module.exports = backwardPass;
