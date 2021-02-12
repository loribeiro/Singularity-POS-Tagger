# Singularity-POS-Tagger
Portuguese POS-Tagger writen in core Node.JS, without any external modules. 

# Implementation 
- Model trained on Mac-Morpho's anotated corpus available on: http://nilc.icmc.usp.br/macmorpho/
- Stochastic algorithm used: 
  * Hidden Markov Model (HMM) with Viterbi Algorithm
  

- Algorithm implemented based on Stanford's document available on: https://web.stanford.edu/~jurafsky/slp3/8.pdf
  
# How to use
*__Singularity__* is designed to be used on async functions or as ECMS6 promise.
There are two main methods available:
- __analyzeString__
    * receive as parameter one string and returns an array with the words normalized 
    along side the tags of the string
- __analyzeStream__
    * receive as parameter an input stream and output stream and returns to the output stream the normalized text along side the tags
## Code example
- __Inside Asyncronous functions__:
    * analyzeString:
      * > const PosTagger = require("singularity-tagger") 
        >
        >...
        >
        > const tagger = await PosTagger()
        >
        > const taggedArray = await tagger.analyzeString(string)
        >
        > console.log(await taggedArray)
    * analyzeStream:
      * > const PosTagger = require("singularity-tagger") 
        >
        >...
        >
        > const tagger = await PosTagger()
        >
        > await tagger.analyzeStream(process.stdin, process.stdout) // can be any stream interface
- __Inside Syncronous functions__:
    * analyzeString:
      * > const PosTagger = require("singularity-tagger") 
        >
        >...
        >
        > PosTagger().then((tagger)=> tagger.analyzeString(string)).then(resp=> console.log()).catch(err=>console.log(err))
    * analyzeStream:
      * > const PosTagger = require("singularity-tagger") 
        >
        >...
        >
        > PosTagger().then((tagger)=> tagger.analyzeStream(inputStream, outputStream)).catch(err=>console.log(err))