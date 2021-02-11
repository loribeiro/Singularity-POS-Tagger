
async function initialization(text){
    const retrieveObjects = await require("../retrieveObjects").catch(err=>console.log(err))
    
    function retrieveProbabilityEmissionMatrix(indexTags, indexPalavra, wordDictionary, vetorTags, emissionMatrix){
        let probability = emissionMatrix[indexTags][wordDictionary[indexPalavra]]
        if(typeof probability === "undefined"){
            if(vetorTags[indexTags-1] === "N" || vetorTags[indexTags-1] === "NPROP"){
                return 0.5
            }else{
                return 0.00001
            }
        }else{

            return probability
        }
    }
    
    async function matrixC(words, vetorTags, wordDictionary, emissionMatrix,transitionMatrix){
        const qtd_linhas = vetorTags.length
        const qtd_colunas = words.length
        let matrix = Array(qtd_linhas).fill()
                    .map((err,indexTags) => Array(qtd_colunas).fill(0));
        for(let i =0; i<qtd_linhas; i++){
            matrix[i][0] = retrieveProbabilityEmissionMatrix(i+1, words[0],
                wordDictionary, vetorTags, emissionMatrix) * transitionMatrix[0][i+1]
        }
        
        return matrix
    }
    
    async function matrixD(words, vetorTags){
        const qtd_linhas = vetorTags.length
        const qtd_colunas = words.length
        let matrix = Array(qtd_linhas).fill().map(() => Array(qtd_colunas).fill(0));
        return matrix
    }

    async function execute(text){
        const words = text.split(" ")
        const [ vetorTags, 
                wordDictionary,
                emissionMatrix, 
                transitionMatrix ] = retrieveObjects

        return {
            "matrixC": await matrixC(words,
                await vetorTags, 
                await wordDictionary, 
                await emissionMatrix,
                await transitionMatrix.transition_matrix),
            "matrixD":await matrixD(words, vetorTags),
            "wordDictionary": await wordDictionary,
            "emissionMatrix": await emissionMatrix,
            "transitionMatrix": await transitionMatrix.transition_matrix,
            "words": words,
            "tags": vetorTags,
        }
    }
    return execute(text)
}

module.exports = initialization;