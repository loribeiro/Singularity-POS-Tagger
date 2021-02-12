
function getTags(chunk){
  const lista_palavras = chunk.replace(/\r?\n|\r/g," ").split(" ")
  const tagset = new Set()
  for(let i =0; i<lista_palavras.length; i++){
        let palavra = lista_palavras[i].split("_")[0]
        let  classe = lista_palavras[i].split("_")[1]
        if(typeof classe  !== "undefined" || classe  !== ''){

            tagset.add(classe)
        }
    }  
    return tagset
}
module.exports = getTags