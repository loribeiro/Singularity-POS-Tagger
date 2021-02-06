const e = 0.0001 // constante para evitar que o denominador se torne zero

function teste(){

    const fs = require("fs")
    if(fs.existsSync("corpus_data/tagset/tagset.txt")){
        console.log("bbb")

        const arquivoLeitura = fs.createReadStream("corpus_data/tagset/tagset.txt")
        arquivoLeitura.pipe(process.stdout)
    }else{
        console.log("bbb")
        return
    }
}

module.exports =  teste;
