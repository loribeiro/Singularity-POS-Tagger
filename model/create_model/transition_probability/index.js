

async function gerarProbabilidadeTransicao(BaseFolder){
    const createMatrix = require("./create_matrix/index")
    return  await createMatrix(BaseFolder)
}

module.exports = gerarProbabilidadeTransicao;