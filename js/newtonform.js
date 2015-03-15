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
    this.xs = xs;
    this.ys = ys;
    console.log("xs => " + xs);
    console.log("ys => " + ys);
    this.c = ys;
    this._updateTable();
}

/**
 * Adds a new point to the polynomial Pn(x) = y
 * @param {number} x The normalized new 'x' point
 * @param {number} y The normalized new 'y' point
 * @returns {number} The index of the added point, used for changing points in the graph/chart
 */
Newton.prototype.addNewPoint = function(x,y){
    this.xs.push(x);
    this.xs.push(y);
    this._updateTable();
    return this.xs.length-1;
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
    for(j=1;j<=this.n;j++){
        for (i=0;i<=this.n-j;i++){
            if (this.xs[i+j] == this.xs[i]){
                console.error("(Newtonform.js) Error in line ${linenumber}: duplicate x values encountered !\n\n");
                return;
            }
            this.c[i] = (ys[i+1]-ys[i])/(this.xs[i+j]-xs[i]);

        }
    }
    console.log("Newton form coefficients : " + this.c);
    //this.c = this.combineCoefficients(this.ys);
    console.log("Combined coefficients : " + this.c);
    console.log("Power form : " + this.getPowerForm());
}

/**
 *
 * @returns {string} power form representation of the computed newton interpolation coefficients
 * can be modified to return the TeX form or any other formatted math texts
 */
Newton.prototype.getPowerForm = function(){
    var str = "\\(y="; N = this.n; C = this.c;

    console.log("C => " + C + ", c=>" +this.c);
    console.log(ys);
    for(j=0; j<this.n; j++) {
        for(i=1; i<=this.n-j; i++) {
            C[i]=C[i]-xs[i+j]*C[i-1];
        }
    }
    for (i=0; i<=this.n;i++){
        temp = N-i;
        if (temp>0)
            str = str+C[i]+"x^"+temp + "+";
        else
            str = str+C[i];
    }
    str+="\\)";
    return str;
}

/**
 * @deprecated use getPowerForm() or getNewtonForm() instead
 * @param {Array} c : coefficients for the newton form
 * @returns {Array} c : combined coefficients in the form of c[0]x^n + c[1]x^n-1 + ... + c[n], with c[n] as the constant term
 * @see Jeff Stetekluh's method for combining the terms to form the coefficients of the polynomial.
 */
Newton.prototype.combineCoefficients = function(c){
    for(j=0; j<this.n; j++) {
        for(i=1; i<=this.n-j; i++) {
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
    for(i=1; i<=this.n; i++) {
        fx=fx*(x-xs[i])+this.c[i];
    }
    return fx;
}

/**
 *
 * @returns {Array} coefficients of the newton backward divided differences table
 */
Newton.prototype.getNewtonCoefficients = function(){
    return this.c;
}

/**
 * @deprecated Use the getPowerForm() instead, because this function will be depended on the the time of the
 * function call, made it to be unrealiable
 * @returns {Array} coefficients are depended on the time of function call
 */
Newton.prototype.getCoefficients = function(){
    return this.c;
}