##fraction-math-js##
bignumber fraction calculator and node module.
###need ES6 support!###
	node4.1.1 arguments:
		--harmony --harmony_array_includes
###Install###
npm install fraction-math-js -g
###REPL###
	> fcalc
######input expression,like:######
	fcalc> (1+1)*2/12
	(1+1)*2/12  =  1/3
###Load###
	"use strict"
    let F = require('fraction-math-js');
###Use###
    let x=new F("1+2/3*5");//1+2/3*5 = 13/3
    let y=new F("1+",x);//1+x = 16/3
    let z=new F("+",1,y);//1+y = 19/3
    let a=new F(y,z,"+");//y+z = 35/3
    console.log(a.toString());//35/3
    console.log(a.n.toString());//35
    console.log(a.d.toString());//3
###Run###
	//save to sample.js and
	> node --harmony --harmony_array_includes sample.js