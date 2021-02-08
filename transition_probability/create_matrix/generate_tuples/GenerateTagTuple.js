function generateTuples(chunk, dictionary){
    const lista_palavras = chunk.replace(/\r?\n|\r/g," ").split(" ")
    const tuples = []
    let classe_anterior = ""
    for(let i =1; i<lista_palavras.length; i++){
        let  classe = lista_palavras[i].split("_")[1]

        if(i===1 || classe_anterior === "PU"){
            if(classe in dictionary){

                tuples.push([0,dictionary[classe]])
                classe_anterior = classe
            }
        }else{
            if(typeof classe  !== "undefined" && classe  !== '' ){
                if(classe in dictionary){
                
                    tuples.push([dictionary[classe_anterior],dictionary[classe]])
                    classe_anterior = classe
                }
            }
        }
    }  
    return tuples
      
}
module.exports = generateTuples;