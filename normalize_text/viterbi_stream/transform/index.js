const {Transform} = require("stream");


class ManipularTexto extends Transform{
    constructor(funcaoParaManipularTexto){
        super();
        this.manipularTexto = funcaoParaManipularTexto;
    }
   async _transform(chunk,encoding,callback){
        const transformChunk = await this.manipularTexto(chunk.toString());
        //console.log( await transformChunk.join(" "))
        this.push(await transformChunk.join(" "));
        callback();
    }
}

module.exports = ManipularTexto;
 
