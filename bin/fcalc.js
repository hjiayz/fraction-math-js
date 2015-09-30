#!/usr/bin/env node --harmony --harmony_array_includes
"use strict"
let readline = require('readline');
let Frac=require("../");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);
rl.setPrompt("fcalc> ");
rl.prompt();
rl.on('line', function (e) {
  console.log(e," = ",new Frac(e).toString());
  rl.prompt();
}).on('close', function() {
  console.log('byebye');
  process.exit(0);
});