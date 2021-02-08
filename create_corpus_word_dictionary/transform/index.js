const {Transform} = require("stream");


class ManipularTexto extends Transform{
    constructor(funcaoParaManipularTexto){
        super();
        this.manipularTexto = funcaoParaManipularTexto;
        this.words = new Set()
    }
    _transform(chunk,encoding,callback){
        const transformedChunk = this.manipularTexto(chunk.toString());
        transformedChunk.forEach(this.words.add,this.words)
        callback();
    }
    _flush(){
      
        let dictionary =  {}
        let index = 0
        this.words.forEach((value)=>{
            dictionary[value] = index
            ++index
        })
        this.push(JSON.stringify(dictionary))
    }
}

module.exports = ManipularTexto;
 
