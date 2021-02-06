const {Transform} = require("stream");


class ManipularTexto extends Transform{
    constructor(funcaoParaManipularTexto){
        super();
        this.manipularTexto = funcaoParaManipularTexto;
        this.tagSet = new Set()
    }
    _transform(chunk,encoding,callback){
        const transformChunk = this.manipularTexto(chunk.toString());
        transformChunk.forEach(this.tagSet.add,this.tagSet)
        callback();
    }
    _flush(){
        this.tagSet.delete(undefined)
        this.tagSet.delete('')
        this.tagSet.delete("PREP+")
        let setArrStr = Array.from(this.tagSet).toString();
        console.log(setArrStr)
        this.push(setArrStr)
    }
}

module.exports = ManipularTexto;
 
