var babel = require("babel");
var UglifyJS = require("uglify-js");
var fs=require("fs");
var r=babel.transformFileSync("index.js",{"sourceMaps":true});
var res = UglifyJS.minify(r.code, {
  fromString: true,
  inSourceMap:r.map,
  outSourceMap:"fraction-math-js-es5.map"
});
fs.writeFileSync("fraction-math-js-es5.min.js",res.code);
fs.writeFileSync("fraction-math-js-es5.map",res.map);