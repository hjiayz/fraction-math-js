#!/usr/bin/env node --harmony --harmony_array_includes
"use strict"
let F = require("../");
let x=new F("1+2/3*5");
let y=new F("1+",x);
let z=new F("+",1,y);
let a=new F(y,z,"+");
console.log(a.toString());//35/3
console.log(a.n.toString());//35
console.log(a.d.toString());//3
let b=new F(a,"+",1.1);
console.log(b.toString());//383/30