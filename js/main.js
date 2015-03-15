//var b = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-5, 2, 5, -2]});
//var p1 = b.create('point',[-1,1], {name:'A',size:4});
//var p2 = b.create('point',[2,-1], {name:'B',size:4});

var xs = [-1.0, 0.0, 1.0, 2.0];
var ys = [3.0, -4.0, 5.0, -6.0];
var ni = new Newton(xs, ys);
const step = 0.1;
var i = 0;

var tc = [-6,8,7,1];
var c = ni.getCoefficients();
console.assert(c[0]==tc[0] && c[1]==tc[1] && c[2]==tc[2] && c[3]==tc[3], "Fuuuuck this shit !!! => " + c + "\n\n" +
        "It's supposed to be => " + tc);

console.log("f("+0+") = " + ni.calculateY(-1.0));
console.log("f("+1+") = " + ni.calculateY(0.0));
console.log("f("+2+") = " + ni.calculateY(1.0));
console.log("f("+3+") = " + ni.calculateY(2.0));

//var t = ni.calculateY(xs[0.0]);
//console.assert(t==ys[0], "What the fuck !!! (" + t + ")");
//console.log(ni.calculateY(2.0));
//do {
//    console.log("f("+i+") = " + ni.calculateY(i));
//    i = i + step;
//}while(i<=t)