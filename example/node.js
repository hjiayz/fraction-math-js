#!/usr/bin/env node --harmony --harmony_array_includes
"use strict"
let F = require("../").builder;
let x=F("1+2/3*5");
let y=F("1+",x);
let z=F("+",1,y);
let a=F(y,z,"+");
console.log(a.toString());//35/3
console.log(a.n.toString());//35
console.log(a.d.toString());//3
let b=F(a,"+",1.1);
console.log(b.toString());//383/30