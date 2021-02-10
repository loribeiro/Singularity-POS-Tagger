const retrieveObjects = require("../retrieveObjects")

async function initialization(text){
    
    function retrieveProbabilityEmissionMatrix(indexTags, indexPalavra, wordDictionary, emissionMatrix){
        return emissionMatrix[indexTags][wordDictionary[indexPalavra]]
    }
    
    function generateTagDictionary(vetorTags){
        function __generateIndexMap(vetor){
            let map = {}
            for(let i = 0; i < vetor.length; i++){
                map[vetor[i]] = i+1
            }
            return map
        }

        return __generateIndexMap(vetorTags)
    }
    async function matrixC(words, vetorTags, wordDictionary, emissionMatrix,transitionMatrix){
        const qtd_linhas = vetorTags.length
        const qtd_colunas = words.length
        let matrix = Array(qtd_linhas).fill()
                    .map((err,indexTags) => Array(qtd_colunas).fill(0));
        for(let i =0; i<qtd_linhas; i++){
            matrix[i][0] = retrieveProbabilityEmissionMatrix(i+1, words[0],
                wordDictionary, emissionMatrix) * transitionMatrix[0][i+1]
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
                transitionMatrix ] = await retrieveObjects()

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