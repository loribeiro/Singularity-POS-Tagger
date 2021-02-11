const removerAcentos = require("./lib/remove_acentos") 

function removerAcentosTexto(chunk){
  const lista_palavras = chunk.replace(/\r?\n|\r/g," ").split(" ")
  var texto_tratado = ""

  for(let i =0; i<lista_palavras.length; i++){
      let palavra = lista_palavras[i].split("_")[0]
      
      texto_tratado = (texto_tratado === "" ? "" : (texto_tratado + " ") ) 
                        + removerAcentos(palavra)
  }
  
  
  return texto_tratado.match(/\\[^]|\.{3}|\w+|[^\w\s]/g).join(" ") //.replace(/---/g,"\n")
  
}

module.exports = removerAcentosTexto;
