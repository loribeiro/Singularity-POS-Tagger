
function generateTuples(chunk, dictTags, dictPalavras, matrix, countPalavra){
    const lista_palavras = chunk.replace(/\r?\n|\r/g," ").split(" ")
    
    for(let i =1; i<lista_palavras.length; i++){
        let  classe = lista_palavras[i].split("_")[1]
        let palavra = lista_palavras[i].split("_")[0]
        if(classe in dictTags && palavra in dictPalavras){
             ++matrix[dictTags[classe]][dictPalavras[palavra]]
             if(dictPalavras[palavra] in countPalavra){
                 ++countPalavra[dictPalavras[palavra]]
             }else{
                countPalavra[dictPalavras[palavra]] = 1
             }
        }        
    }  
    return {"matrix": matrix, "countPalavra": countPalavra}
      
}
module.exports = generateTuples;