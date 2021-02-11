const {Transform} = require("stream");


class ManipularTexto extends Transform{
    constructor(funcaoParaManipularTexto){
        super();
        this.manipularTexto = funcaoParaManipularTexto;
    }
   async _transform(chunk,encoding,callback){
       const sentences  = chunk.toString().split(" , ")
       
       for (let i = 0; i < sentences.length; i++){
           let transformedChunk = await this.manipularTexto(sentences[i])
           this.push(await transformedChunk.join(" ") + " ,_PU ");

       }

        //console.log( chunk.toString().split(", "))//"? "||"! "||
       // this.push(transformedChunk.join(" "));
        callback();
    }
}

module.exports = ManipularTexto;
 
