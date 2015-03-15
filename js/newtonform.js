/**
 * At least two points are needed to interpolate something
 * @class Newton divided differences polynomial.
 * @param {Array} x => x values of control points
 * @param {Array} y => y values of control points
 */
 var Newton = function(xs, ys){
    if (xs.length < 2 || ys.length < 2){
        console.error("(Newtonform.js) Error in line 9: points parameters passed are not an array or consist only as a single point");
    }
    if (xs.length != ys.length){
        console.error("(Newtonform.js) Error in line 12: must have an equal number of x and y points in the parameter");
    }
    this.n = xs.length-1;
    console.log("degree: " + n);
    this.xs = xs;
    this.ys = ys;
    this.c = ys;
    this._updateTable();
}

/**
 *
 * @param {Number} index : defines which control point to change its values
 * @param {Number} x : value of the control point from the canvas (must be normalized beforehand)
 * @param {Number} y : value of the control point from the canvas (must be normalized beforehand)
 * @example
 * var xs = [0,1,2]
 * var ys = [2,4,6]
 * var ni = new Newton(xs, ys) -> degree/n => 2
 * ni.changePoint(0, 1, 3) -> OK
 * ni.changePoint(3, 4, 7) -> ERROR
 *
 */
Newton.prototype.changePoint = function(index, x, y) {
    console.assert(index>n,"(Newton.changePoint) : Control point index cannot be greater than the polynomial degree !");

    this.xs[index] = x;
    this.ys[index] = y;
    this._updateTable();
}

/**
 * Create Newton 'Backward Divided Differences' Table
 * @memberof Newton
 * @see Algorithm 4.3 of Conte and de Boor's Elementary Numerical Analysis, second edition (page 204). "Calculation of the coefficients for the Newton form."
 *
 */
Newton.prototype._updateTable = function(){
    for(j=1;j<n;j++){
        for (i=0;i<n-j;i++){
            if (xs[i+j] == xs[i]){
                console.error("(Newtonform.js) Error in line ${linenumber}: duplicate x values encountered !\n\n");
                return;
            }
            this.c[i] = (ys[i+1]-ys[i])/(x[i+j]-x[i]);
        }
    }
    console.log("Newton form coefficients : " + c);
    this.c = this.combineCoefficients(c);
    console.log("Combined coefficients : " + c);
}

/**
 *
 * @param {Array} c : coefficients for the newton form
 * @returns {Array} c : combined coefficients in the form of c[0]x^n + c[1]x^n-1 + ... + c[n], with c[n] as the constant term
 * @see Jeff Stetekluh's method for combining the terms to form the coefficients of the polynomial.
 */
Newton.prototype.combineCoefficients = function(c){
    for(j=0; j<n; j++) {
        for(i=1; i<=n-j; i++) {
            c[i]=c[i]-xs[i+j]*c[i-1];
        }
    }
    return c;
}

/**
 *
 * Calculation for the y value, given x value, using the coefficients calculated before
 * @param {Number} x : value for the interpolation
 * @returns {Number} y : polynomial function calculation
 */
Newton.prototype.calculateY = function(x){
    fx = this.c[0];
    for(i=1; i<=n; i++) {
        fx=fx*x+this.c[i];
    }
    return fx;
}