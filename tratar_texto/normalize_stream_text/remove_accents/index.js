

function removerAcentosStream(chunk){
  const removerAcentos = require("./lib/remove_acentos") 
  const lista_palavras = chunk.replace(/\r?\n|\r/g," ").split(" ")
  var texto_tratado = ""

  for(let i =0; i<lista_palavras.length; i++){
      let palavra = lista_palavras[i].split("_")[0]
      let  classe =  lista_palavras[i].split("_")[1]
      texto_tratado = (texto_tratado === "" ? " " : (texto_tratado + " ") ) 
                        + removerAcentos(palavra) + (classe === undefined ? "" : ("_" + classe.toUpperCase())) 
  }  
  
  return texto_tratado //.replace(/---/g,"\n")
  
}

module.exports = removerAcentosStream;
