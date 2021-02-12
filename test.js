const PosTagger = require("./index.js")
async function a(){
	const tagger = await PosTagger()
	const a = tagger.analyzeString("Lucas foi la")
	console.log(await a)
}
a() 
