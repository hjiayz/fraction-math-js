## fraction-math-js

bignumber fraction calculator and node module.

### need ES6 support!

	node4.1.1 arguments:
		--harmony --harmony_array_includes
    
### Install

npm install fraction-math-js -g

### REPL

	> fcalc
  
###### input expression,like:

	fcalc> (1+1)*2/12
  
	(1+1)*2/12  =  1/3
  
### Load

	"use strict"
  
    let F = require('fraction-math-js').builder;
    
### Use
    let x=F("1+2/3*5");//1+2/3*5 = 13/3 Infix
    
    let y=F("1+",x);//1+x = 16/3
    
    let z=F("+",1,y);//1+y = 19/3 Prefix
    
    let a=F(y,z,"+");//y+z = 35/3 Postfix
    
    console.log("%s",F("+ 1 1"));//1+1=2 postfix and prefix need space
    
    console.log(a.toString());//35/3
    
    console.log(a.n.toString());//35
    
    console.log(a.d.toString());//3
    
    let b=F(a,"+",1.1);//a+1.1 = 383/30
	
    console.log(b.toString());//383/30
    
    console.log(b.toBigNumber().toNumber());//12.766666666666667
    
### Run

	//save to sample.js and
  
	> node --harmony --harmony_array_includes sample.js

### browser(AMD)[view demo](http://hjiayz.github.io/fraction-math-js/example/amd.html)

	<!--write to amd.html-->
  
	<script src="./lib/browser-polyfill.min.js" ></script>
  
	<script src="./lib/require.js"></script>
  
	<!--load babel-polyfill and require.js for es6 and AMD-->
  
	<script>
  
	//load bignumber

	define("bignumber.js",["./lib/bignumber.min.js"],function(b){return b;});

	//load fraction-math-js
  
	require(["../fraction-math-js-es5.min.js"],function(fraction){
 
    	var F=fraction.builder;
    
    	document.write(F("1 + 1 / 3").toString());
  
	});
  
	</script>
  
### browser(global)[view demo](http://hjiayz.github.io/fraction-math-js/example/global.html)

	<!--write to global.html-->
  
	<script src="./lib/browser-polyfill.min.js" ></script>

	<script src="./lib/bignumber.min.js"></script>

	<script src="../fraction-math-js-es5.min.js"></script>
  
	<!--load babel-polyfill , bignumber.js and fraction-math-js-->
  
	<!--fraction-math-js bind to window.FractionMathJs-->
  
	<script>

	var F=window.FractionMathJs.builder;
  
	document.write(F("1 + 1 / 3").toString());
  
	</script>