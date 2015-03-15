/**
 * Created by samiunn on 16/3/15.
 */

var NewtonPoly = function(xs,ys) {
    if (xs.length < 2 || ys.length < 2) {
        console.error("(Newtonform.js) Error in line 9: points parameters passed are not an array or consist only as a single point");
    }
    if (xs.length != ys.length) {
        console.error("(Newtonform.js) Error in line 12: must have an equal number of x and y points in the parameter");
    }

    n = xs.length-1;
    c = ys;

    this._updateTable();

    console.log("c => " + c);
    for (var i=0;i<10;i++) {
        console.log("calcy(" + i + ") => " + this.calculateY(i));
    }
    console.log(this.getPowerForm());
}

NewtonPoly.prototype._updateTable = function(){
    for(var j=1; j<=n; j++) {
        for(var i=0; i<=n-j; i++) {
            if(xs[i+j]==xs[i]) {
                fprintf(stderr,"\nError *** duplicate x values encountered\n\n");
                return;
            }
            c[i]=(c[i+1]-c[i])/(xs[i+j]-xs[i]);
        }
    }
}

NewtonPoly.prototype.getPowerForm = function(){
    var fa=c[0];
    var tc = c;
    for(var j=0; j<n; j++) {
        for(var i=1; i<=n-j; i++) {
            tc[i]=tc[i]-xs[i+j]*tc[i-1];
        }
    }
    return tc;
    //console.log(tc);
}

NewtonPoly.prototype.getCoef = function(){
    return c;
}

NewtonPoly.prototype.calculateY = function(a){
    var fa=c[0];
    for(var i=1; i<=n; i++) {
        fa=fa*(a-xs[i])+c[i];
    }
    return fa;
}