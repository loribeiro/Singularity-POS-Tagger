const {Transform} = require("stream");


class ManipularTexto extends Transform{
    constructor(funcaoParaManipularTexto,matrix, normalizeValue){
        super();
        this.manipularTexto = funcaoParaManipularTexto;
        this.adjacence = matrix.adjacence
        this.dictTags = matrix.dictionary
        this.normalizeValue = normalizeValue
        this.dictPalavras = matrix.dictPalavras
        this.countPalavra = {}
    }
    _transform(chunk,encoding,callback){
        const transformChunk = this.manipularTexto(chunk.toString(), this.dictTags, this.dictPalavras, this.adjacence, this.countPalavra);
        this.adjacence = transformChunk.matrix
        this.countPalavra = transformChunk.countPalavra
        
        callback();
    } 
    _flush(){
        this.adjacence.forEach((element,index)=>{
            
            for(let i = 0; i<element.length;i++){
                this.adjacence[index][i]= this.adjacence[index][i]/(this.countPalavra[i] + (this.normalizeValue * this.countPalavra[i]))
            }
           
        })
        
        
        this.push(JSON.stringify({"emission_matrix": this.adjacence}))
    }
}

module.exports = ManipularTexto;
 
