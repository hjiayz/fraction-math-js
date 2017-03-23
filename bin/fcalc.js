#!/usr/bin/env node
"use strict"
let readline = require('readline');
let Frac=require("../").builder;
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);
rl.setPrompt("fcalc> ");
rl.prompt();
rl.on('line', function (e) {
  console.log(e," = ",Frac(e).toString());
  rl.prompt();
}).on('close', function() {
  console.log('byebye');
  process.exit(0);
});
