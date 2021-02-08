

async function gerarProbabilidadeEmissao(){
    const createMatrix = require("./create_matrix/index")
    return  await createMatrix()
}

module.exports = gerarProbabilidadeEmissao;