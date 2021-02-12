
function getWords(chunk){
  const lista_palavras = chunk.replace(/\r?\n|\r/g," ").split(" ")
  const words = new Set()
  for(let i =0; i<lista_palavras.length; i++){
        let palavra = lista_palavras[i].split("_")[0]
        let  classe = lista_palavras[i].split("_")[1]
        if(typeof palavra  !== "undefined" &&  typeof classe !=="undefined" && classe !== "" && palavra  !== ''){
            words.add(palavra)
        }
    }  
    return words
}
module.exports = getWords