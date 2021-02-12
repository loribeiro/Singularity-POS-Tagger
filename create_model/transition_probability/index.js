

async function gerarProbabilidadeTransicao(){
    const createMatrix = require("./create_matrix/index")
    return  await createMatrix()
}

module.exports = gerarProbabilidadeTransicao;