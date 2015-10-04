"use strict"
const BigNumber=require("bignumber.js");
const One=new BigNumber(1);
const BNaN=new BigNumber(NaN);
const gcd=function(a,b){
  let gcdsub=(p1,p2)=>p1.isZero()?p2:gcdsub(p2.mod(p1),p1);
  return gcdsub(a.abs(),b.abs());
}
const reduction=function(n,d){//reduction of a fraction
  let g=gcd(n,d);
  return [n.dividedBy(g),d.dividedBy(g)];
}
const nsign=(n,d)=>(d.isNegative())?[n.times(-1),d.abs()]:[n,d];//set negative sign
class Opt{
  constructor(opt){
    this.opt=opt;
    let getPriority=(opt)=>["+","-"].includes(opt)?1:["*","/"].includes(opt)?2:0;
    this.priority=getPriority(opt);
  }
  toString(){
    return this.opt;
  }
}
class F {
  constructor(...args){
    let isOpt=(i)=>(i instanceof Opt);
    let notOpt=(i)=>(!isOpt(i));
    let BracketOrNum=(i)=>!(notOpt(i)||(i.priority===0));
    let op=(opt)=>({
      "+":"plus",
      "-":"minus",
      "*":"times",
      "/":"dividedBy"
    }[opt]);
    let strp=(s,fst)=>s.match(/\S+/g).reduce((a,v,i)=>
      a.concat(((fst&&(i==0))||((a.length>0)&&(/[^0-9\.]$/.test(a[a.length-1]))))?
      v.match(/((^|[^0-9\.])-|)[0-9\.]+|[^0-9\.]/g):
      v.match(/([^0-9\.]-|)[0-9\.]+|[^0-9\.]/g)),[]).reduce(
        (a1,v1)=>a1.concat(v1.match(/(-|)[0-9\.]+|[^0-9\.]/g)),[]).map(
          (i)=>(/^(-|)[0-9\.]+$/.test(i)?i:new Opt(i)));//parse string
    let Infix2Postfix=function(e){//convert infix to postfix
      let s=[],r=[];
      let top=()=>s[s.length-1];
      let pop=function(o){
        while ((!!top())&&(o.priority<=top().priority)) {
          r.push(s.pop());
        }
      }
      let popb=function(){
        if (!top()){return;}
        while (top().opt!=="("){
          r.push(s.pop());
        }
        s.pop();
      }
      e.forEach(((i)=>((notOpt(i)?r.push(i):(i.opt=="(")?s.push(i):(i.opt==")")?popb():(pop(i),s.push(i))))));
      r=r.concat(s.reverse());
      return r;
    }
    let pack=function(v,d){//convert to fractional form
      if (v instanceof F)
        return v.value;
      let toBN=(n)=>(n instanceof BigNumber)?n:["string","number"].includes(typeof(n))?new BigNumber(n):BNaN;
      let toFrac=(n)=>n.toFraction().map((i)=>new BigNumber(i));
      if (!d){
        let n=toBN(v);
        if (n.isInt())
          return [n,One];
        return toFrac(n);
      }
      v=toBN(v);
      d=toBN(d);
      if (v.isInt()&&d.isInt())
        return reduction(...nsign(v,d));
      let toF=(n)=>new F(...toFrac(n));
      return toF(v).dividedBy(toF(d));
    }
    let evalPrefix=function(e){//prefix evaluate
      let s=[];
      e.reverse().forEach((i)=>isOpt(i)?s.push((new F(s.pop()))[op(i.opt)](new F(s.pop()))):s.push(i));
      return new F(s[0]).value;
    }
    let evalPostfix=function(e){//postfix evaluate
      let s=[];
      let ope=(o,a,b)=>(new F(b))[op(o)](new F(a));
      e.forEach((i)=>isOpt(i)?s.push(ope(i.opt,s.pop(),s.pop())):s.push(i));
      return new F(s[0]).value;
    }
    let ev=(a)=>((a.length===0)?[BNaN,BNaN]:
      (a.length===1)?pack(a[0]):
        (a.length===2)?pack(a[0],a[1]):
          BracketOrNum(a[0])?evalPrefix(a):
            BracketOrNum(a[a.length-1])?evalPostfix(a):
              evalPostfix(Infix2Postfix(a)));//evaluate
    let value;
    try {
      value=ev(args.reduce((a,v,i)=>typeof(v)==="string"?
        a.concat(strp(v,(i==0)||((a.length>0)&&isOpt(a[a.length-1])))):
        a.concat(v),[]));//get result.
    }
    catch (e){
      value=[BNaN,BNaN];
    }
    Object.defineProperties(this,{
      "n":{
        "value":value[0],//numerator
        "writable":false
      },
      "d":{
        "value":value[1],//denominator
        "writable":false
      }
    });
    //define closure function for read the value;
  }
  toString(){
    if (this.isNaN()) return BNaN.toString();
    if (this.isInt()) return this.n.toFixed();
    return [this.n.toFixed(),this.d.toFixed()].join("/");
  }
  toJSON(){
    return this.toString();
  }
  valueOf(){
    return this.toString();
  }
  toBigNumber(){
    return this.n.dividedBy(this.d);
  }
  plus(y){
    let x=this;
    let g=gcd(x.d,y.d);
    let px=y.d.dividedBy(g);
    let py=x.d.dividedBy(g);
    let d=px.times(x.d);
    let nx=px.times(x.n);
    let ny=py.times(y.n);
    let n=nx.plus(ny);
    let r=reduction(...nsign(n,d));
    return r;
  }
  minus(y){
    let x=this;
    return x.plus(new F(y.n.times(-1),y.d));
  }
  times(y){
    let x=this;
    if (x.d.isZero()||y.d.isZero())
      return [BNaN,BNaN];
    let g1=gcd(x.d,y.n);
    let g2=gcd(x.n,y.d);
    let d=x.d.dividedBy(g1).times(y.d.dividedBy(g2));
    let n=x.n.dividedBy(g2).times(y.n.dividedBy(g1));
    let r=nsign(n,d);
    return r;
  }
  dividedBy(y){
    let x=this;
    return x.times(new F(y.d,y.n));
  }
  isNaN(){
    return this.n.isNaN()||this.d.isNaN();
  }
  isInt(){
    return this.d.eq(1);
  }
  isNegative(){
    return this.n.isNegative();
  }
  get value(){
    return [this.n,this.d];//get value
  }
  static builder(...args){
    return new F(...args);
  }
}
module.exports=F;
//node --harmony --harmony_array_includes
