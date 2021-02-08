const {Transform} = require("stream");


class ManipularTexto extends Transform{
    constructor(funcaoParaManipularTexto,matrix, normalizeValue){
        super();
        this.manipularTexto = funcaoParaManipularTexto;
        this.adjacence = matrix.adjacence
        this.dictionary = matrix.dictionary
        this.normalizeValue = normalizeValue
    }
    _transform(chunk,encoding,callback){
        const transformChunk = this.manipularTexto(chunk.toString(), this.dictionary);
        transformChunk.forEach(element => {
            ++this.adjacence[element[0]][element[1]]
            if(typeof element[0] !== "number" || typeof element[0] !== "number"){

                console.log(typeof element[0])
            }
        });
        //console.log(transformChunk)
        callback();
    } 
    _flush(){
        
        this.adjacence.forEach((element,index)=>{
            let soma = element.reduce((a, b) => a + b, 0)
            for(let i = 0; i<element.length;i++){
               this.adjacence[index][i]=element[i]/soma
            }
           
        })
        /* this.adjacence.forEach(element=>{
            let soma = element.reduce((a, b) => a + b, 0)
            console.log(soma)
        })  */
        
        this.push(JSON.stringify({"dictionary": this.dictionary, "transition_matrix": this.adjacence}))
    }
}

module.exports = ManipularTexto;
 
