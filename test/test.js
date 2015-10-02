"use strict"
let Frac=require("../")
let assert=require('assert');
assert.ok((new Frac("-1 + ( 2 + 3 ) * 5").toString())==="24","-1 + ( 2 + 3 ) * 5 = 24");//Infix -1+(2+3)*5=-1+5*5=-1+25=24
assert.ok(new Frac("1 / 2").toString()==="1/2","1 / 2 = 1/2");//Infix 1/2=(1/2)
assert.ok(new Frac("-1.1 + 1.1").toString()==="0","-1.1 + 1.1 = 0");//decimal -1.1+1.1=0
assert.ok(new Frac("1.1","1.1").toString()==="1","1.1 , 1.1 = 1");//decimal 1.1/1.1=1
assert.ok(new Frac("2",-6).toString()==="-1/3","2 , -6 = -1/3");//decimal 2,-6 = -1/3
assert.ok(new Frac("1 1 1 + +").toString()==="3","1 1 1 + +  =  3");//Postfix 1 1 1 + + = 1 2 + = 3
assert.ok(new Frac("- * 3 2 1").toString()==="5","- * 3 2 1  =  5");//Prefix - * 3 2 1 = - 6 1 = 5
assert.ok(new Frac("1 / 0").toString()==="NaN","1 / 0  =  NaN");// 1/0=NaN
assert.ok(new Frac("ABC").toString()==="NaN","ABC  =  NaN");// ABC=NaN
assert.ok(new Frac("-","*",new Frac(3),new Frac("2"),"1").toString()==="5"," - , * , frac(3) , Frac(\"2\") , 1   =  5");//Prefix - * 3 2 1 = - 6 1 = 5
assert.ok(new Frac("0 * ( -2 ) - ( 2 / 3 ) + 3").toString()==="7/3","0 * ( -2 ) - ( 2 / 3 ) + 3  =  7/3");
assert.ok(new Frac("0*(-2)-(2/3)+3").toString()==="7/3","0*(-2)-(2/3)+3 = 7/3");
assert.ok(new Frac("-1+-2-2").toString()==="-5","-1+-2-2=-5");
assert.ok(new Frac("-1","+","-2-2").toString()==="-5","-1,+,-2-2=-5");//-1+-2-2=-5
let x=new Frac("123");
let m=x.value;
m[0]=555;
assert.ok(x.toString()==="123","not constant");
assert.ok(new Frac("0.99999999999999999999999999999999999999999999999999999999999999999999999999999999").toString()==="99999999999999999999999999999999999999999999999999999999999999999999999999999999/100000000000000000000000000000000000000000000000000000000000000000000000000000000","0.99999999999999999999999999999999999999999999999999999999999999999999999999999999 = 99999999999999999999999999999999999999999999999999999999999999999999999999999999/100000000000000000000000000000000000000000000000000000000000000000000000000000000");