//var xs = [-1.0, 0.0, 1.0]
//var ys = [1, 1, 1]
var xs = [-1.0, 0.0, 1.0, 2.0];
var ys = [3.0, -4.0, 5.0, -6.0];
var ni = new Newton(xs, ys);
const step = 0.1;
var i = 0.0;

do{
    console.log(i+"," + ni.calculateY(i));
    i+=step;
} while(i<xs[xs.length-1])

console.log(ni.getPowerForm());
console.log(ni.getPowerForm());
console.log(ni.getPowerForm());
console.log(ni.getNewtonCoefficients());
console.log(ni.getNewtonCoefficients());