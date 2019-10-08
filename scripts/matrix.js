class Matrix {
    constructor(r, c) {
        this.rows = r;
        this.columns = c;
        this.data = [];
        var i, j;
        for (i = 0; i < this.rows; i++) {
            this.data.push([]);
            for (j = 0; j < this.columns; j++) {
                this.data[i].push(0);
            }
        }
    }

    set values(v) {
        var i, j, idx;
        // v is already a 2d array with dims equal to rows and columns
        if (v instanceof Array && v.length === this.rows && 
            v[0] instanceof Array && v[0].length === this.columns) {
            this.data = v;
        }
        // not valid
        else {
            console.log("could not set values for " + this.rows + "x" + this.columns + " maxtrix");
        }
    }

    get values() {
        return this.data.slice();
    }

    // matrix multiplication (this * rhs)
    mult(rhs) {
        var result = null;
        // ensure multiplication is valid
        if (rhs instanceof Matrix && this.columns === rhs.rows) {
            //implement matrix multiplication here!
            var i,j,m,row_num, col_num, tot_sum = 0;
            result = new Matrix(this.data.length, rhs.data[0].length);
            for(i = 0; i < rhs.data[0].length; i++) { // loop through rhs rows
                for(j = 0; j < this.data.length; j++) { // loop through this columns
                    tot_sum = 0;
                    for(m = 0; m < rhs.data.length; m++) { // loop through rhs[i][m] and this[j][m]
                        row_num = rhs.data[m][i];
                        col_num = this.data[j][m];
                        tot_sum += row_num * col_num;
                        result.values[j][i] = tot_sum;
                    } 
                }
            }
        }
        else {
            console.log("could not multiply - row/column mismatch");
        }
        console.log(result.values);
        return result;
    }
}

Matrix.multiply = function(...args) {
    var i;
    var result = null;
    // ensure at least 2 matrices
    if (args.length >= 2 && args.every((item) => {return item instanceof Matrix;})) {
        result = args[0];
        i = 1;
        while (result !== null && i < args.length) {
            result = result.mult(args[i]);
            i++;
        }
    }
    else {
        console.log("could not multiply - requires at least 2 matrices");
    }
    return result;
}
