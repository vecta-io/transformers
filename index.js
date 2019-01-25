var DEF = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

function Transformers () {
    this.matrix = Object.assign({}, DEF);
}

Transformers.prototype = {
    multiply: function (mat) {
        var matrix = Object.assign({}, DEF);

        if (mat instanceof Transformers) { mat = mat.matrix; }
        if (Array.isArray(mat)) { mat = array2Matrix(mat); }

        matrix.a = this.matrix.a * mat.a + this.matrix.c * mat.b;
        matrix.b = this.matrix.b * mat.a + this.matrix.d * mat.b;
        matrix.c = this.matrix.a * mat.c + this.matrix.c * mat.d;
        matrix.d = this.matrix.b * mat.c + this.matrix.d * mat.d;
        matrix.e = this.matrix.a * mat.e + this.matrix.c * mat.f + this.matrix.e;
        matrix.f = this.matrix.b * mat.e + this.matrix.d * mat.f + this.matrix.f;

        this.matrix = matrix;

        return this;

        function array2Matrix(arr) {
            return {
                a: arr[0],
                b: arr[1],
                c: arr[2],
                d: arr[3],
                e: arr[4],
                f: arr[5]
            }
        }
    },
    parse: function (str) {
        var matrix,
            regex = /([translate|rotate|scale|shear|skew|matrix]+)\((.*?)\)/g,
            match,
            tran,
            vals = [];

        if (typeof str === 'string') {
            while (match = regex.exec(str)) {
                tran = match[1];
                vals = (match[2] || '').match(/-?\d*(\.\d+)?(e-?\d+)?/g).map(parseFloat).filter(str => !isNaN(str) );

                switch (tran) {
                    case 'translate': this.translate(vals[0], vals[1]); break;
                    case 'rotate': this.rotate(vals[0], vals[1], vals[2]); break;
                    case 'scale': this.scale(vals[0], vals[1]); break;
                    case 'shear': this.shear(vals[0], vals[1]); break;
                    case 'skew': this.skew(vals[0], vals[1]); break;
                    case 'matrix': this.multiply({ a: vals[0], b: vals[1], c: vals[2], d: vals[3], e: vals[4], f: vals[5] }); break;
                }
            }
        }

        return this;
    },
    translate: function (x = 0, y = 0) {
        var mat = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: x,
            f: y
        };

        return this.multiply(mat);
    },
    rotate: function (angle, x, y) {
        var cosAngle = Math.cos(angle),
            sinAngle = Math.sin(angle),
            mat = {
                a: cosAngle,
                b: sinAngle,
                c: -sinAngle,
                d: cosAngle,
                e: 0,
                f: 0
            };

        if (x === undefined || y === undefined) {
            this.multiply(mat);
        }
        else {
            this.translate(x, y);
            this.multiply(mat);
            this.translate(-x, -y);
        }

        return this;
    },
    scale: function (x, y) {
        var mat;

        if (y === undefined) { y = x; }

        mat = {
            a: x,
            b: 0,
            c: 0,
            d: y,
            e: 0,
            f: 0
        };

        return this.multiply(mat);
    },
    shear: function (x, y) {
        var mat = {
            a: 1,
            b: y,
            c: x,
            d: 1,
            e: 0,
            f: 0
        }
        
        return this.multiply(mat);
    },
    skew: function (x, y) {
        var mat = {
            a: 1,
            b: Math.tan(y),
            c: Math.tan(x),
            d: 1,
            e: 0,
            f: 0
        }

        return this.multiply(mat);
    },
    inverse: function () {
        var {a, b, c, d, e, f} = this.matrix,
            den = a * d - b * c,
            mat = {
                a: d / den,
                b: b / den,
                c: c / den,
                d: a / den,
                e: (d * e - c * f) / -den,
                f: (b * e - a * f) / den
            };

        return this.multiply(den);
    },
    pointTo: function (x, y) {
        var mat = this.matrix;

        return {
            a: mat.a * x + mat.c * y + e,
            b: mat.b * x + mat.d * y + f
        };
    }
}

module.exports = {
    create: function () {
        return new Transformers();
    }
}