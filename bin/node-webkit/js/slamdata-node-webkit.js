var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    var Unit = {
        create: function (value) {
            return value;
        }
    };
    function LT() {

    };
    LT.value = new LT();
    function GT() {

    };
    GT.value = new GT();
    function EQ() {

    };
    EQ.value = new EQ();
    function Semigroupoid($less$less$less) {
        this["<<<"] = $less$less$less;
    };
    function Category(__superclass_Prelude$dotSemigroupoid_0, id) {
        this["__superclass_Prelude.Semigroupoid_0"] = __superclass_Prelude$dotSemigroupoid_0;
        this.id = id;
    };
    function Show(show) {
        this.show = show;
    };
    function Functor($less$dollar$greater) {
        this["<$>"] = $less$dollar$greater;
    };
    function Apply($less$times$greater, __superclass_Prelude$dotFunctor_0) {
        this["<*>"] = $less$times$greater;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
    };
    function Applicative(__superclass_Prelude$dotApply_0, pure) {
        this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
        this.pure = pure;
    };
    function Alternative($less$bar$greater, empty) {
        this["<|>"] = $less$bar$greater;
        this.empty = empty;
    };
    function Bind($greater$greater$eq, __superclass_Prelude$dotApply_0) {
        this[">>="] = $greater$greater$eq;
        this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
    };
    function Monad(__superclass_Prelude$dotApplicative_0, __superclass_Prelude$dotBind_1) {
        this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
        this["__superclass_Prelude.Bind_1"] = __superclass_Prelude$dotBind_1;
    };
    function Num($percent, $times, $plus, $minus, $div, negate) {
        this["%"] = $percent;
        this["*"] = $times;
        this["+"] = $plus;
        this["-"] = $minus;
        this["/"] = $div;
        this.negate = negate;
    };
    function Eq($div$eq, $eq$eq) {
        this["/="] = $div$eq;
        this["=="] = $eq$eq;
    };
    function Ord(__superclass_Prelude$dotEq_0, compare) {
        this["__superclass_Prelude.Eq_0"] = __superclass_Prelude$dotEq_0;
        this.compare = compare;
    };
    function Bits($amp, $up, complement, shl, shr, zshr, $bar) {
        this["&"] = $amp;
        this["^"] = $up;
        this.complement = complement;
        this.shl = shl;
        this.shr = shr;
        this.zshr = zshr;
        this["|"] = $bar;
    };
    function BoolLike($amp$amp, not, $bar$bar) {
        this["&&"] = $amp$amp;
        this.not = not;
        this["||"] = $bar$bar;
    };
    function Semigroup($less$greater) {
        this["<>"] = $less$greater;
    };
    function cons(e) {  return function (l) {    return [e].concat(l);  };};
    function showStringImpl(s) {  return JSON.stringify(s);};
    function showNumberImpl(n) {  return n.toString();};
    function showArrayImpl (f) {  return function (xs) {    var ss = [];    for (var i = 0, l = xs.length; i < l; i++) {      ss[i] = f(xs[i]);    }    return '[' + ss.join(',') + ']';  };};
    function numAdd(n1) {  return function(n2) {    return n1 + n2;  };};
    function numSub(n1) {  return function(n2) {    return n1 - n2;  };};
    function numMul(n1) {  return function(n2) {    return n1 * n2;  };};
    function numDiv(n1) {  return function(n2) {    return n1 / n2;  };};
    function numMod(n1) {  return function(n2) {    return n1 % n2;  };};
    function numNegate(n) {  return -n;};
    function refEq(r1) {  return function(r2) {    return r1 === r2;  };};
    function refIneq(r1) {  return function(r2) {    return r1 !== r2;  };};
    function eqArrayImpl(f) {  return function(xs) {    return function(ys) {      if (xs.length !== ys.length) return false;      for (var i = 0; i < xs.length; i++) {        if (!f(xs[i])(ys[i])) return false;      }      return true;    };  };};
    function unsafeCompareImpl(lt) {  return function (eq) {    return function (gt) {      return function (x) {        return function (y) {          return x < y ? lt : x > y ? gt : eq;        };      };    };  };};
    function numShl(n1) {  return function(n2) {    return n1 << n2;  };};
    function numShr(n1) {  return function(n2) {    return n1 >> n2;  };};
    function numZshr(n1) {  return function(n2) {    return n1 >>> n2;  };};
    function numAnd(n1) {  return function(n2) {    return n1 & n2;  };};
    function numOr(n1) {  return function(n2) {    return n1 | n2;  };};
    function numXor(n1) {  return function(n2) {    return n1 ^ n2;  };};
    function numComplement(n) {  return ~n;};
    function boolAnd(b1) {  return function(b2) {    return b1 && b2;  };};
    function boolOr(b1) {  return function(b2) {    return b1 || b2;  };};
    function boolNot(b) {  return !b;};
    function concatString(s1) {  return function(s2) {    return s1 + s2;  };};
    var $bar$bar = function (dict) {
        return dict["||"];
    };
    var $bar = function (dict) {
        return dict["|"];
    };
    var $up = function (dict) {
        return dict["^"];
    };
    var $greater$greater$eq = function (dict) {
        return dict[">>="];
    };
    var $eq$eq = function (dict) {
        return dict["=="];
    };
    var $less$bar$greater = function (dict) {
        return dict["<|>"];
    };
    var $less$greater = function (dict) {
        return dict["<>"];
    };
    var $less$less$less = function (dict) {
        return dict["<<<"];
    };
    var $greater$greater$greater = function (__dict_Semigroupoid_0) {
        return function (f) {
            return function (g) {
                return $less$less$less(__dict_Semigroupoid_0)(g)(f);
            };
        };
    };
    var $less$times$greater = function (dict) {
        return dict["<*>"];
    };
    var $less$dollar$greater = function (dict) {
        return dict["<$>"];
    };
    var $colon = cons;
    var $div$eq = function (dict) {
        return dict["/="];
    };
    var $div = function (dict) {
        return dict["/"];
    };
    var $minus = function (dict) {
        return dict["-"];
    };
    var $plus$plus = function (__dict_Semigroup_1) {
        return $less$greater(__dict_Semigroup_1);
    };
    var $plus = function (dict) {
        return dict["+"];
    };
    var $times = function (dict) {
        return dict["*"];
    };
    var $amp$amp = function (dict) {
        return dict["&&"];
    };
    var $amp = function (dict) {
        return dict["&"];
    };
    var $percent = function (dict) {
        return dict["%"];
    };
    var $dollar = function (f) {
        return function (x) {
            return f(x);
        };
    };
    var $hash = function (x) {
        return function (f) {
            return f(x);
        };
    };
    var zshr = function (dict) {
        return dict.zshr;
    };
    var unsafeCompare = unsafeCompareImpl(LT.value)(EQ.value)(GT.value);
    var unit = {};
    var shr = function (dict) {
        return dict.shr;
    };
    var showUnit = function (_) {
        return new Show(function (_126) {
            return "Unit {}";
        });
    };
    var showString = function (_) {
        return new Show(showStringImpl);
    };
    var showOrdering = function (_) {
        return new Show(function (_134) {
            if (_134 instanceof LT) {
                return "LT";
            };
            if (_134 instanceof GT) {
                return "GT";
            };
            if (_134 instanceof EQ) {
                return "EQ";
            };
            throw new Error("Failed pattern match");
        });
    };
    var showNumber = function (_) {
        return new Show(showNumberImpl);
    };
    var showBoolean = function (_) {
        return new Show(function (_127) {
            if (_127) {
                return "true";
            };
            if (!_127) {
                return "false";
            };
            throw new Error("Failed pattern match");
        });
    };
    var show = function (dict) {
        return dict.show;
    };
    var showArray = function (__dict_Show_2) {
        return new Show(showArrayImpl(show(__dict_Show_2)));
    };
    var shl = function (dict) {
        return dict.shl;
    };
    var semigroupoidArr = function (_) {
        return new Semigroupoid(function (f) {
            return function (g) {
                return function (x) {
                    return f(g(x));
                };
            };
        });
    };
    var semigroupUnit = function (_) {
        return new Semigroup(function (_141) {
            return function (_142) {
                return {};
            };
        });
    };
    var semigroupString = function (_) {
        return new Semigroup(concatString);
    };
    var semigroupArr = function (__dict_Semigroup_3) {
        return new Semigroup(function (f) {
            return function (g) {
                return function (x) {
                    return $less$greater(__dict_Semigroup_3)(f(x))(g(x));
                };
            };
        });
    };
    var pure = function (dict) {
        return dict.pure;
    };
    var $$return = function (__dict_Monad_4) {
        return pure(__dict_Monad_4["__superclass_Prelude.Applicative_0"]({}));
    };
    var numNumber = function (_) {
        return new Num(numMod, numMul, numAdd, numSub, numDiv, numNegate);
    };
    var not = function (dict) {
        return dict.not;
    };
    var negate = function (dict) {
        return dict.negate;
    };
    var liftM1 = function (__dict_Monad_5) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_5["__superclass_Prelude.Bind_1"]({}))(a)(function (_0) {
                    return $$return(__dict_Monad_5)(f(_0));
                });
            };
        };
    };
    var liftA1 = function (__dict_Applicative_6) {
        return function (f) {
            return function (a) {
                return $less$times$greater(__dict_Applicative_6["__superclass_Prelude.Apply_0"]({}))(pure(__dict_Applicative_6)(f))(a);
            };
        };
    };
    var id = function (dict) {
        return dict.id;
    };
    var functorArr = function (_) {
        return new Functor($less$less$less(semigroupoidArr({})));
    };
    var flip = function (f) {
        return function (b) {
            return function (a) {
                return f(a)(b);
            };
        };
    };
    var eqUnit = function (_) {
        return new Eq(function (_130) {
            return function (_131) {
                return false;
            };
        }, function (_128) {
            return function (_129) {
                return true;
            };
        });
    };
    var ordUnit = function (_) {
        return new Ord(function (__1) {
            return eqUnit({});
        }, function (_135) {
            return function (_136) {
                return EQ.value;
            };
        });
    };
    var eqString = function (_) {
        return new Eq(refIneq, refEq);
    };
    var ordString = function (_) {
        return new Ord(function (__1) {
            return eqString({});
        }, unsafeCompare);
    };
    var eqNumber = function (_) {
        return new Eq(refIneq, refEq);
    };
    var ordNumber = function (_) {
        return new Ord(function (__1) {
            return eqNumber({});
        }, unsafeCompare);
    };
    var eqBoolean = function (_) {
        return new Eq(refIneq, refEq);
    };
    var ordBoolean = function (_) {
        return new Ord(function (__1) {
            return eqBoolean({});
        }, function (_137) {
            return function (_138) {
                if (!_137 && !_138) {
                    return EQ.value;
                };
                if (!_137 && _138) {
                    return LT.value;
                };
                if (_137 && _138) {
                    return EQ.value;
                };
                if (_137 && !_138) {
                    return GT.value;
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var empty = function (dict) {
        return dict.empty;
    };
    var $$const = function (_122) {
        return function (_123) {
            return _122;
        };
    };
    var $$void = function (__dict_Functor_8) {
        return function (fa) {
            return $less$dollar$greater(__dict_Functor_8)($$const(unit))(fa);
        };
    };
    var complement = function (dict) {
        return dict.complement;
    };
    var compare = function (dict) {
        return dict.compare;
    };
    var $less = function (__dict_Ord_10) {
        return function (a1) {
            return function (a2) {
                return (function (_661) {
                    if (_661 instanceof LT) {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_10)(a1)(a2));
            };
        };
    };
    var $less$eq = function (__dict_Ord_11) {
        return function (a1) {
            return function (a2) {
                return (function (_662) {
                    if (_662 instanceof GT) {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_11)(a1)(a2));
            };
        };
    };
    var $greater = function (__dict_Ord_12) {
        return function (a1) {
            return function (a2) {
                return (function (_663) {
                    if (_663 instanceof GT) {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_12)(a1)(a2));
            };
        };
    };
    var $greater$eq = function (__dict_Ord_13) {
        return function (a1) {
            return function (a2) {
                return (function (_664) {
                    if (_664 instanceof LT) {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_13)(a1)(a2));
            };
        };
    };
    var categoryArr = function (_) {
        return new Category(function (__1) {
            return semigroupoidArr({});
        }, function (x) {
            return x;
        });
    };
    var boolLikeBoolean = function (_) {
        return new BoolLike(boolAnd, boolNot, boolOr);
    };
    var eqArray = function (__dict_Eq_7) {
        return new Eq(function (xs) {
            return function (ys) {
                return not(boolLikeBoolean({}))($eq$eq(eqArray(__dict_Eq_7))(xs)(ys));
            };
        }, function (xs) {
            return function (ys) {
                return eqArrayImpl($eq$eq(__dict_Eq_7))(xs)(ys);
            };
        });
    };
    var ordArray = function (__dict_Ord_9) {
        return new Ord(function (_) {
            return eqArray(__dict_Ord_9["__superclass_Prelude.Eq_0"]({}));
        }, function (_139) {
            return function (_140) {
                if (_139.length === 0 && _140.length === 0) {
                    return EQ.value;
                };
                if (_139.length === 0) {
                    return LT.value;
                };
                if (_140.length === 0) {
                    return GT.value;
                };
                if (_139.length > 0) {
                    var _671 = _139.slice(1);
                    if (_140.length > 0) {
                        var _669 = _140.slice(1);
                        return (function (_667) {
                            if (_667 instanceof EQ) {
                                return compare(ordArray(__dict_Ord_9))(_671)(_669);
                            };
                            return _667;
                        })(compare(__dict_Ord_9)(_139[0])(_140[0]));
                    };
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var eqOrdering = function (_) {
        return new Eq(function (x) {
            return function (y) {
                return not(boolLikeBoolean({}))($eq$eq(eqOrdering({}))(x)(y));
            };
        }, function (_132) {
            return function (_133) {
                if (_132 instanceof LT && _133 instanceof LT) {
                    return true;
                };
                if (_132 instanceof GT && _133 instanceof GT) {
                    return true;
                };
                if (_132 instanceof EQ && _133 instanceof EQ) {
                    return true;
                };
                return false;
            };
        });
    };
    var bitsNumber = function (_) {
        return new Bits(numAnd, numXor, numComplement, numShl, numShr, numZshr, numOr);
    };
    var asTypeOf = function (_124) {
        return function (_125) {
            return _124;
        };
    };
    var applyArr = function (_) {
        return new Apply(function (f) {
            return function (g) {
                return function (x) {
                    return f(x)(g(x));
                };
            };
        }, function (__1) {
            return functorArr({});
        });
    };
    var bindArr = function (_) {
        return new Bind(function (m) {
            return function (f) {
                return function (x) {
                    return f(m(x))(x);
                };
            };
        }, function (__1) {
            return applyArr({});
        });
    };
    var applicativeArr = function (_) {
        return new Applicative(function (__1) {
            return applyArr({});
        }, $$const);
    };
    var monadArr = function (_) {
        return new Monad(function (__1) {
            return applicativeArr({});
        }, function (__1) {
            return bindArr({});
        });
    };
    var ap = function (__dict_Monad_14) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_14["__superclass_Prelude.Bind_1"]({}))(f)(function (_2) {
                    return $greater$greater$eq(__dict_Monad_14["__superclass_Prelude.Bind_1"]({}))(a)(function (_1) {
                        return $$return(__dict_Monad_14)(_2(_1));
                    });
                });
            };
        };
    };
    return {
        Unit: Unit, 
        LT: LT, 
        GT: GT, 
        EQ: EQ, 
        Semigroup: Semigroup, 
        BoolLike: BoolLike, 
        Bits: Bits, 
        Ord: Ord, 
        Eq: Eq, 
        Num: Num, 
        Monad: Monad, 
        Bind: Bind, 
        Alternative: Alternative, 
        Applicative: Applicative, 
        Apply: Apply, 
        Functor: Functor, 
        Show: Show, 
        Category: Category, 
        Semigroupoid: Semigroupoid, 
        unit: unit, 
        "++": $plus$plus, 
        "<>": $less$greater, 
        not: not, 
        "||": $bar$bar, 
        "&&": $amp$amp, 
        complement: complement, 
        zshr: zshr, 
        shr: shr, 
        shl: shl, 
        "^": $up, 
        "|": $bar, 
        "&": $amp, 
        ">=": $greater$eq, 
        "<=": $less$eq, 
        ">": $greater, 
        "<": $less, 
        compare: compare, 
        refIneq: refIneq, 
        refEq: refEq, 
        "/=": $div$eq, 
        "==": $eq$eq, 
        negate: negate, 
        "%": $percent, 
        "/": $div, 
        "*": $times, 
        "-": $minus, 
        "+": $plus, 
        ap: ap, 
        liftM1: liftM1, 
        "return": $$return, 
        ">>=": $greater$greater$eq, 
        "<|>": $less$bar$greater, 
        empty: empty, 
        liftA1: liftA1, 
        pure: pure, 
        "<*>": $less$times$greater, 
        "void": $$void, 
        "<$>": $less$dollar$greater, 
        show: show, 
        cons: cons, 
        ":": $colon, 
        "#": $hash, 
        "$": $dollar, 
        id: id, 
        ">>>": $greater$greater$greater, 
        "<<<": $less$less$less, 
        asTypeOf: asTypeOf, 
        "const": $$const, 
        flip: flip, 
        semigroupoidArr: semigroupoidArr, 
        categoryArr: categoryArr, 
        showUnit: showUnit, 
        showString: showString, 
        showBoolean: showBoolean, 
        showNumber: showNumber, 
        showArray: showArray, 
        functorArr: functorArr, 
        applyArr: applyArr, 
        applicativeArr: applicativeArr, 
        bindArr: bindArr, 
        monadArr: monadArr, 
        numNumber: numNumber, 
        eqUnit: eqUnit, 
        eqString: eqString, 
        eqNumber: eqNumber, 
        eqBoolean: eqBoolean, 
        eqArray: eqArray, 
        eqOrdering: eqOrdering, 
        showOrdering: showOrdering, 
        ordUnit: ordUnit, 
        ordBoolean: ordBoolean, 
        ordNumber: ordNumber, 
        ordString: ordString, 
        ordArray: ordArray, 
        bitsNumber: bitsNumber, 
        boolLikeBoolean: boolLikeBoolean, 
        semigroupUnit: semigroupUnit, 
        semigroupString: semigroupString, 
        semigroupArr: semigroupArr
    };
})();
var PS = PS || {};
PS.Prelude_Unsafe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function unsafeIndex(xs) {  return function(n) {    return xs[n];  };};
    return {
        unsafeIndex: unsafeIndex
    };
})();
var PS = PS || {};
PS.Showdown = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function converter(options) {  return function(markdown) {    var converter = new Showdown.converter(options);    return converter.makeHtml(markdown);  };};
    var makeHtml = converter({});
    return {
        converter: converter, 
        makeHtml: makeHtml
    };
})();
var PS = PS || {};
PS.Node_Path = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var normalize = require('path').normalize;;
    var join = function (segments) {   return require('path').join.apply(this, segments); };
    var resolve = function (from) {   return function (to) {     return require('path').resolve.apply(this, from.concat([to]));   }; };;
    var relative = function (from) {   return function (to) {     return require('path').relative(from, to);   }; };
    var dirname = function (path) {   var p = require('path');   return p.normalize(p.dirname(path)); };
    var basename = require('path').basename;;
    var basenameWithoutExt = function (path) {   return function (ext) {     return require('path').basename(path, ext);   }; };
    var extname = require('path').extname;;
    var sep = require('path').sep;;
    var delimiter = require('path').delimiter;;
    return {
        delimiter: delimiter, 
        sep: sep, 
        extname: extname, 
        basenameWithoutExt: basenameWithoutExt, 
        basename: basename, 
        dirname: dirname, 
        relative: relative, 
        resolve: resolve, 
        join: join, 
        normalize: normalize
    };
})();
var PS = PS || {};
PS.Node_FS = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function FileLink() {

    };
    FileLink.value = new FileLink();
    function DirLink() {

    };
    DirLink.value = new DirLink();
    function JunctionLink() {

    };
    JunctionLink.value = new JunctionLink();
    var showSymlinkType = function (_) {
        return new Prelude.Show(function (_143) {
            if (_143 instanceof FileLink) {
                return "file";
            };
            if (_143 instanceof DirLink) {
                return "dir";
            };
            if (_143 instanceof JunctionLink) {
                return "junction";
            };
            throw new Error("Failed pattern match");
        });
    };
    var eqSymlinkType = function (_) {
        return new Prelude.Eq(function (x) {
            return function (y) {
                return !Prelude["=="](eqSymlinkType({}))(x)(y);
            };
        }, function (_144) {
            return function (_145) {
                if (_144 instanceof FileLink && _145 instanceof FileLink) {
                    return true;
                };
                if (_144 instanceof DirLink && _145 instanceof DirLink) {
                    return true;
                };
                if (_144 instanceof JunctionLink && _145 instanceof JunctionLink) {
                    return true;
                };
                return false;
            };
        });
    };
    return {
        FileLink: FileLink, 
        DirLink: DirLink, 
        JunctionLink: JunctionLink, 
        showSymlinkType: showSymlinkType, 
        eqSymlinkType: eqSymlinkType
    };
})();
var PS = PS || {};
PS.Node_Encoding = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function ASCII() {

    };
    ASCII.value = new ASCII();
    function UTF8() {

    };
    UTF8.value = new UTF8();
    function UTF16LE() {

    };
    UTF16LE.value = new UTF16LE();
    function UCS2() {

    };
    UCS2.value = new UCS2();
    function Base64() {

    };
    Base64.value = new Base64();
    function Binary() {

    };
    Binary.value = new Binary();
    function Hex() {

    };
    Hex.value = new Hex();
    function byteLength (str) {   return function (enc) {     return Buffer.byteLength(str, enc);   } };
    var showEncoding = function (_) {
        return new Prelude.Show(function (_146) {
            if (_146 instanceof ASCII) {
                return "ascii";
            };
            if (_146 instanceof UTF8) {
                return "utf8";
            };
            if (_146 instanceof UTF16LE) {
                return "utf16le";
            };
            if (_146 instanceof UCS2) {
                return "ucs2";
            };
            if (_146 instanceof Base64) {
                return "base64";
            };
            if (_146 instanceof Binary) {
                return "binary";
            };
            if (_146 instanceof Hex) {
                return "hex";
            };
            throw new Error("Failed pattern match");
        });
    };
    var byteLength = function (str) {
        return function (enc) {
            return byteLengthImpl(str)(Prelude.show(showEncoding({}))(enc));
        };
    };
    return {
        ASCII: ASCII, 
        UTF8: UTF8, 
        UTF16LE: UTF16LE, 
        UCS2: UCS2, 
        Base64: Base64, 
        Binary: Binary, 
        Hex: Hex, 
        byteLength: byteLength, 
        showEncoding: showEncoding
    };
})();
var PS = PS || {};
PS.Node_ChildProcess_Signal = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Signal = {
        create: function (value) {
            return value;
        }
    };
    var sigxfsz = "SIGXFSZ";
    var sigxcpu = "SIGXCPU";
    var sigwinch = "SIGWINCH";
    var sigvtalrm = "SIGVTALRM";
    var sigusr2 = "SIGUSR2";
    var sigusr1 = "SIGUSR1";
    var sigurg = "SIGURG";
    var sigunused = "SIGUNUSED";
    var sigttou = "SIGTTOU";
    var sigttin = "SIGTTIN";
    var sigtstp = "SIGTSTP";
    var sigtrap = "SIGTRAP";
    var sigterm = "SIGTERM";
    var sigsys = "SIGSYS";
    var sigstop = "SIGSTOP";
    var sigstkflt = "SIGSTKFLT";
    var sigsegv = "SIGSEGV";
    var sigquit = "SIGQUIT";
    var sigpwr = "SIGPWR";
    var sigprof = "SIGPROF";
    var sigpoll = "SIGPOLL";
    var sigpipe = "SIGPIPE";
    var siglost = "SIGLOST";
    var sigkill = "SIGKILL";
    var sigiot = "SIGIOT";
    var sigio = "SIGIO";
    var sigint = "SIGINT";
    var siginfo = "SIGINFO";
    var sigill = "SIGILL";
    var sighup = "SIGHUP";
    var sigfpe = "SIGFPE";
    var sigemt = "SIGEMT";
    var sigcont = "SIGCONT";
    var sigcld = "SIGCLD";
    var sigchld = "SIGCHLD";
    var sigbus = "SIGBUS";
    var sigalrm = "SIGALRM";
    var sigabrt = "SIGABRT";
    var showSignal = function (_) {
        return new Prelude.Show(function (_147) {
            return _147;
        });
    };
    return {
        sigxfsz: sigxfsz, 
        sigxcpu: sigxcpu, 
        sigwinch: sigwinch, 
        sigvtalrm: sigvtalrm, 
        sigusr2: sigusr2, 
        sigusr1: sigusr1, 
        sigurg: sigurg, 
        sigunused: sigunused, 
        sigttou: sigttou, 
        sigttin: sigttin, 
        sigtstp: sigtstp, 
        sigtrap: sigtrap, 
        sigterm: sigterm, 
        sigsys: sigsys, 
        sigstop: sigstop, 
        sigstkflt: sigstkflt, 
        sigsegv: sigsegv, 
        sigquit: sigquit, 
        sigpwr: sigpwr, 
        sigprof: sigprof, 
        sigpoll: sigpoll, 
        sigpipe: sigpipe, 
        siglost: siglost, 
        sigkill: sigkill, 
        sigiot: sigiot, 
        sigio: sigio, 
        sigint: sigint, 
        siginfo: siginfo, 
        sigill: sigill, 
        sighup: sighup, 
        sigfpe: sigfpe, 
        sigemt: sigemt, 
        sigcont: sigcont, 
        sigcld: sigcld, 
        sigchld: sigchld, 
        sigbus: sigbus, 
        sigalrm: sigalrm, 
        sigabrt: sigabrt, 
        showSignal: showSignal
    };
})();
var PS = PS || {};
PS.Math = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var abs = Math.abs;;
    var acos = Math.acos;;
    var asin = Math.asin;;
    var atan = Math.atan;;
    function atan2(y){  return function (x) {    return Math.atan2(y, x);  };};
    var ceil = Math.ceil;;
    var cos = Math.cos;;
    var exp = Math.exp;;
    var floor = Math.floor;;
    var log = Math.log;;
    function max(n1){  return function(n2) {    return Math.max(n1, n2);  }};
    function min(n1){  return function(n2) {    return Math.min(n1, n2);  }};
    function pow(n){  return function(p) {    return Math.pow(n, p);  }};
    var round = Math.round;;
    var sin = Math.sin;;
    var sqrt = Math.sqrt;;
    var tan = Math.tan;;
    var e       = Math.E;;
    var ln2     = Math.LN2;;
    var ln10    = Math.LN10;;
    var log2e   = Math.LOG2E;;
    var log10e  = Math.LOG10E;;
    var pi      = Math.PI;;
    var sqrt1_2 = Math.SQRT1_2;;
    var sqrt2   = Math.SQRT2;;
    return {
        sqrt2: sqrt2, 
        sqrt1_2: sqrt1_2, 
        pi: pi, 
        log10e: log10e, 
        log2e: log2e, 
        ln10: ln10, 
        ln2: ln2, 
        e: e, 
        tan: tan, 
        sqrt: sqrt, 
        sin: sin, 
        round: round, 
        pow: pow, 
        min: min, 
        max: max, 
        log: log, 
        floor: floor, 
        exp: exp, 
        cos: cos, 
        ceil: ceil, 
        atan2: atan2, 
        atan: atan, 
        asin: asin, 
        acos: acos, 
        abs: abs
    };
})();
var PS = PS || {};
PS.Global = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var nan = NaN;;
    var infinity = Infinity;;
    function readInt(radix) {  return function(n) {    return parseInt(n, radix);  };};
    var readFloat = parseFloat;;
    return {
        readFloat: readFloat, 
        readInt: readInt, 
        isFinite: isFinite, 
        infinity: infinity, 
        isNaN: isNaN, 
        nan: nan
    };
})();
var PS = PS || {};
PS.Data_String_Regex = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function regex(s1) {  return function(s2) {    return new RegExp(s1, s2);  };};
    function test(r) {  return function (s) {    return r.test(s);  };};
    function match(r) {  return function (s) {    return s.match(r);   };};
    function replace(r) {  return function(s1) {    return function(s2) {      return s2.replace(r, s1);    };  };};
    function replace$prime(r) {  return function(f) {    return function(s2) {      return s2.replace(r, function (match) {        return f(match)(Array.prototype.splice.call(arguments, 1, arguments.length - 3));      });    };  };};
    function search(r) {  return function (s) {    return s.search(r);  };};
    return {
        search: search, 
        "replace'": replace$prime, 
        replace: replace, 
        match: match, 
        test: test, 
        regex: regex
    };
})();
var PS = PS || {};
PS.Data_String = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function charAt(i) {  return function(s) {    return s.charAt(i);   };};
    function charCodeAt(i) {  return function(s) {    return s.charCodeAt(i);   };};
    function fromCharCode(n) {  return String.fromCharCode(n);};
    function indexOf(x) {  return function(s) {    return s.indexOf(x);  }; };
    function indexOf$prime(x) {  return function(startAt) {    return function(s) {      return s.indexOf(x, startAt);    };   }; };
    function lastIndexOf(x) {  return function(s) {    return s.lastIndexOf(x);  };};
    function lastIndexOf$prime(x) {  return function(startAt) {    return function(s) {      return s.lastIndexOf(x, startAt);    };   }; };
    function length(s) {  return s.length;};
    function localeCompare(s1) {  return function(s2) {    return s1.localeCompare(s2);  };};
    function replace(s1) {  return function(s2) {    return function(s3) {      return s3.replace(s1, s2);    };  };};
    function take(n) {  return function(s) {    return s.substr(0, n);  };};
    function drop(n) {  return function(s) {    return s.substr(n);  };};
    function split(sep) {  return function(s) {    return s.split(sep);  };};
    function toLower(s) {  return s.toLowerCase();};
    function toUpper(s) {  return s.toUpperCase();};
    function trim(s) {  return s.trim();};
    function joinWith (s) {  return function (xs) {    return xs.join(s);  };};
    return {
        joinWith: joinWith, 
        trim: trim, 
        toUpper: toUpper, 
        toLower: toLower, 
        split: split, 
        drop: drop, 
        take: take, 
        replace: replace, 
        localeCompare: localeCompare, 
        length: length, 
        "lastIndexOf'": lastIndexOf$prime, 
        lastIndexOf: lastIndexOf, 
        "indexOf'": indexOf$prime, 
        indexOf: indexOf, 
        fromCharCode: fromCharCode, 
        charCodeAt: charCodeAt, 
        charAt: charAt
    };
})();
var PS = PS || {};
PS.Data_Profunctor = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Profunctor(dimap) {
        this.dimap = dimap;
    };
    var profunctorArr = function (_) {
        return new Profunctor(function (a2b) {
            return function (c2d) {
                return function (b2c) {
                    return Prelude[">>>"](Prelude.semigroupoidArr({}))(a2b)(Prelude[">>>"](Prelude.semigroupoidArr({}))(b2c)(c2d));
                };
            };
        });
    };
    var dimap = function (dict) {
        return dict.dimap;
    };
    var lmap = function (__dict_Profunctor_15) {
        return function (a2b) {
            return dimap(__dict_Profunctor_15)(a2b)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var rmap = function (__dict_Profunctor_16) {
        return function (b2c) {
            return dimap(__dict_Profunctor_16)(Prelude.id(Prelude.categoryArr({})))(b2c);
        };
    };
    return {
        Profunctor: Profunctor, 
        rmap: rmap, 
        lmap: lmap, 
        dimap: dimap, 
        profunctorArr: profunctorArr
    };
})();
var PS = PS || {};
PS.Data_Maybe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Nothing() {

    };
    Nothing.value = new Nothing();
    function Just(value0) {
        this.value0 = value0;
    };
    Just.create = function (value0) {
        return new Just(value0);
    };
    var showMaybe = function (__dict_Show_17) {
        return new Prelude.Show(function (_159) {
            if (_159 instanceof Just) {
                return "Just (" + Prelude.show(__dict_Show_17)(_159.value0) + ")";
            };
            if (_159 instanceof Nothing) {
                return "Nothing";
            };
            throw new Error("Failed pattern match");
        });
    };
    var maybe = function (_148) {
        return function (_149) {
            return function (_150) {
                if (_150 instanceof Nothing) {
                    return _148;
                };
                if (_150 instanceof Just) {
                    return _149(_150.value0);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var isNothing = maybe(true)(Prelude["const"](false));
    var isJust = maybe(false)(Prelude["const"](true));
    var functorMaybe = function (_) {
        return new Prelude.Functor(function (_151) {
            return function (_152) {
                if (_152 instanceof Just) {
                    return new Just(_151(_152.value0));
                };
                return Nothing.value;
            };
        });
    };
    var fromMaybe = function (a) {
        return maybe(a)(Prelude.id(Prelude.categoryArr({})));
    };
    var eqMaybe = function (__dict_Eq_19) {
        return new Prelude.Eq(function (a) {
            return function (b) {
                return !Prelude["=="](eqMaybe(__dict_Eq_19))(a)(b);
            };
        }, function (_160) {
            return function (_161) {
                if (_160 instanceof Nothing && _161 instanceof Nothing) {
                    return true;
                };
                if (_160 instanceof Just && _161 instanceof Just) {
                    return Prelude["=="](__dict_Eq_19)(_160.value0)(_161.value0);
                };
                return false;
            };
        });
    };
    var ordMaybe = function (__dict_Ord_18) {
        return new Prelude.Ord(function (_) {
            return eqMaybe(__dict_Ord_18["__superclass_Prelude.Eq_0"]({}));
        }, function (_162) {
            return function (_163) {
                if (_162 instanceof Just && _163 instanceof Just) {
                    return Prelude.compare(__dict_Ord_18)(_162.value0)(_163.value0);
                };
                if (_162 instanceof Nothing && _163 instanceof Nothing) {
                    return Prelude.EQ.value;
                };
                if (_162 instanceof Nothing) {
                    return Prelude.LT.value;
                };
                if (_163 instanceof Nothing) {
                    return Prelude.GT.value;
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var applyMaybe = function (_) {
        return new Prelude.Apply(function (_153) {
            return function (_154) {
                if (_153 instanceof Just) {
                    return Prelude["<$>"](functorMaybe({}))(_153.value0)(_154);
                };
                if (_153 instanceof Nothing) {
                    return Nothing.value;
                };
                throw new Error("Failed pattern match");
            };
        }, function (__1) {
            return functorMaybe({});
        });
    };
    var bindMaybe = function (_) {
        return new Prelude.Bind(function (_157) {
            return function (_158) {
                if (_157 instanceof Just) {
                    return _158(_157.value0);
                };
                if (_157 instanceof Nothing) {
                    return Nothing.value;
                };
                throw new Error("Failed pattern match");
            };
        }, function (__1) {
            return applyMaybe({});
        });
    };
    var applicativeMaybe = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyMaybe({});
        }, Just.create);
    };
    var monadMaybe = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeMaybe({});
        }, function (__1) {
            return bindMaybe({});
        });
    };
    var alternativeMaybe = function (_) {
        return new Prelude.Alternative(function (_155) {
            return function (_156) {
                if (_155 instanceof Nothing) {
                    return _156;
                };
                return _155;
            };
        }, Nothing.value);
    };
    return {
        Nothing: Nothing, 
        Just: Just, 
        isNothing: isNothing, 
        isJust: isJust, 
        fromMaybe: fromMaybe, 
        maybe: maybe, 
        functorMaybe: functorMaybe, 
        applyMaybe: applyMaybe, 
        applicativeMaybe: applicativeMaybe, 
        alternativeMaybe: alternativeMaybe, 
        bindMaybe: bindMaybe, 
        monadMaybe: monadMaybe, 
        showMaybe: showMaybe, 
        eqMaybe: eqMaybe, 
        ordMaybe: ordMaybe
    };
})();
var PS = PS || {};
PS.Data_Maybe_Unsafe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var fromJust = function (_164) {
        if (_164 instanceof Data_Maybe.Just) {
            return _164.value0;
        };
        throw new Error("Failed pattern match");
    };
    return {
        fromJust: fromJust
    };
})();
var PS = PS || {};
PS.Data_Function = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function mkFn0(fn) {  return function() {    return fn({});  };};
    function mkFn1(fn) {  return function(a) {    return fn(a);  };};
    function mkFn2(fn) {  return function(a, b) {    return fn(a)(b);  };};
    function mkFn3(fn) {  return function(a, b, c) {    return fn(a)(b)(c);  };};
    function mkFn4(fn) {  return function(a, b, c, d) {    return fn(a)(b)(c)(d);  };};
    function mkFn5(fn) {  return function(a, b, c, d, e) {    return fn(a)(b)(c)(d)(e);  };};
    function mkFn6(fn) {  return function(a, b, c, d, e, f) {    return fn(a)(b)(c)(d)(e)(f);  };};
    function mkFn7(fn) {  return function(a, b, c, d, e, f, g) {    return fn(a)(b)(c)(d)(e)(f)(g);  };};
    function mkFn8(fn) {  return function(a, b, c, d, e, f, g, h) {    return fn(a)(b)(c)(d)(e)(f)(g)(h);  };};
    function mkFn9(fn) {  return function(a, b, c, d, e, f, g, h, i) {    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i);  };};
    function mkFn10(fn) {  return function(a, b, c, d, e, f, g, h, i, j) {    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i)(j);  };};
    function runFn0(fn) {  return fn();};
    function runFn1(fn) {  return function(a) {    return fn(a);  };};
    function runFn2(fn) {  return function(a) {    return function(b) {      return fn(a, b);    };  };};
    function runFn3(fn) {  return function(a) {    return function(b) {      return function(c) {        return fn(a, b, c);      };    };  };};
    function runFn4(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return fn(a, b, c, d);        };      };    };  };};
    function runFn5(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return fn(a, b, c, d, e);          };        };      };    };  };};
    function runFn6(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return fn(a, b, c, d, e, f);            };          };        };      };    };  };};
    function runFn7(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return function(g) {                return fn(a, b, c, d, e, f, g);              };            };          };        };      };    };  };};
    function runFn8(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return function(g) {                return function(h) {                  return fn(a, b, c, d, e, f, g, h);                };              };            };          };        };      };    };  };};
    function runFn9(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return function(g) {                return function(h) {                  return function(i) {                    return fn(a, b, c, d, e, f, g, h, i);                  };                };              };            };          };        };      };    };  };};
    function runFn10(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return function(g) {                return function(h) {                  return function(i) {                    return function(j) {                      return fn(a, b, c, d, e, f, g, h, i, j);                    };                  };                };              };            };          };        };      };    };  };};
    var on = function (f) {
        return function (g) {
            return function (x) {
                return function (y) {
                    return f(g(x))(g(y));
                };
            };
        };
    };
    return {
        runFn10: runFn10, 
        runFn9: runFn9, 
        runFn8: runFn8, 
        runFn7: runFn7, 
        runFn6: runFn6, 
        runFn5: runFn5, 
        runFn4: runFn4, 
        runFn3: runFn3, 
        runFn2: runFn2, 
        runFn1: runFn1, 
        runFn0: runFn0, 
        mkFn10: mkFn10, 
        mkFn9: mkFn9, 
        mkFn8: mkFn8, 
        mkFn7: mkFn7, 
        mkFn6: mkFn6, 
        mkFn5: mkFn5, 
        mkFn4: mkFn4, 
        mkFn3: mkFn3, 
        mkFn2: mkFn2, 
        mkFn1: mkFn1, 
        mkFn0: mkFn0, 
        on: on
    };
})();
var PS = PS || {};
PS.Data_Foreign_EasyFFI = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function unsafeForeignProcedure(args) {  return function (stmt) {    return Function(wrap(args.slice()))();    function wrap() {      return !args.length ? stmt : 'return function (' + args.shift() + ') { ' + wrap() + ' };';    }  };};
    var unsafeForeignFunction = function (args) {
        return function (expr) {
            return unsafeForeignProcedure(args)("return " + expr + ";");
        };
    };
    return {
        unsafeForeignProcedure: unsafeForeignProcedure, 
        unsafeForeignFunction: unsafeForeignFunction
    };
})();
var PS = PS || {};
PS.Data_Eq = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Ref = {
        create: function (value) {
            return value;
        }
    };
    var liftRef = function (_165) {
        return function (_166) {
            return function (_167) {
                return _165(_166)(_167);
            };
        };
    };
    var functorRef = function (_) {
        return new Prelude.Functor(function (_168) {
            return function (_169) {
                return _168(_169);
            };
        });
    };
    var eqRef = function (_) {
        return new Prelude.Eq(liftRef(Prelude.refIneq), liftRef(Prelude.refEq));
    };
    return {
        Ref: Ref, 
        liftRef: liftRef, 
        eqRef: eqRef, 
        functorRef: functorRef
    };
})();
var PS = PS || {};
PS.Data_Enum = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Enum(fromEnum, toEnum) {
        this.fromEnum = fromEnum;
        this.toEnum = toEnum;
    };
    var toEnum = function (dict) {
        return dict.toEnum;
    };
    var fromEnum = function (dict) {
        return dict.fromEnum;
    };
    var pred = function (__dict_Enum_20) {
        return function (x) {
            return toEnum(__dict_Enum_20)(fromEnum(__dict_Enum_20)(x) - 1);
        };
    };
    var succ = function (__dict_Enum_21) {
        return function (x) {
            return toEnum(__dict_Enum_21)(fromEnum(__dict_Enum_21)(x) + 1);
        };
    };
    return {
        Enum: Enum, 
        pred: pred, 
        succ: succ, 
        fromEnum: fromEnum, 
        toEnum: toEnum
    };
})();
var PS = PS || {};
PS.Data_Either = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Left(value0) {
        this.value0 = value0;
    };
    Left.create = function (value0) {
        return new Left(value0);
    };
    function Right(value0) {
        this.value0 = value0;
    };
    Right.create = function (value0) {
        return new Right(value0);
    };
    var showEither = function (__dict_Show_22) {
        return function (__dict_Show_23) {
            return new Prelude.Show(function (_177) {
                if (_177 instanceof Left) {
                    return "Left (" + Prelude.show(__dict_Show_22)(_177.value0) + ")";
                };
                if (_177 instanceof Right) {
                    return "Right (" + Prelude.show(__dict_Show_23)(_177.value0) + ")";
                };
                throw new Error("Failed pattern match");
            });
        };
    };
    var functorEither = function (_) {
        return new Prelude.Functor(function (_173) {
            return function (_174) {
                if (_174 instanceof Left) {
                    return new Left(_174.value0);
                };
                if (_174 instanceof Right) {
                    return new Right(_173(_174.value0));
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var eqEither = function (__dict_Eq_26) {
        return function (__dict_Eq_27) {
            return new Prelude.Eq(function (a) {
                return function (b) {
                    return !Prelude["=="](eqEither(__dict_Eq_26)(__dict_Eq_27))(a)(b);
                };
            }, function (_178) {
                return function (_179) {
                    if (_178 instanceof Left && _179 instanceof Left) {
                        return Prelude["=="](__dict_Eq_26)(_178.value0)(_179.value0);
                    };
                    if (_178 instanceof Right && _179 instanceof Right) {
                        return Prelude["=="](__dict_Eq_27)(_178.value0)(_179.value0);
                    };
                    return false;
                };
            });
        };
    };
    var ordEither = function (__dict_Ord_24) {
        return function (__dict_Ord_25) {
            return new Prelude.Ord(function (_) {
                return eqEither(__dict_Ord_24["__superclass_Prelude.Eq_0"]({}))(__dict_Ord_25["__superclass_Prelude.Eq_0"]({}));
            }, function (_180) {
                return function (_181) {
                    if (_180 instanceof Left && _181 instanceof Left) {
                        return Prelude.compare(__dict_Ord_24)(_180.value0)(_181.value0);
                    };
                    if (_180 instanceof Right && _181 instanceof Right) {
                        return Prelude.compare(__dict_Ord_25)(_180.value0)(_181.value0);
                    };
                    if (_180 instanceof Left) {
                        return Prelude.LT.value;
                    };
                    if (_181 instanceof Left) {
                        return Prelude.GT.value;
                    };
                    throw new Error("Failed pattern match");
                };
            });
        };
    };
    var either = function (_170) {
        return function (_171) {
            return function (_172) {
                if (_172 instanceof Left) {
                    return _170(_172.value0);
                };
                if (_172 instanceof Right) {
                    return _171(_172.value0);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var isLeft = either(Prelude["const"](true))(Prelude["const"](false));
    var isRight = either(Prelude["const"](false))(Prelude["const"](true));
    var applyEither = function (_) {
        return new Prelude.Apply(function (_175) {
            return function (_176) {
                if (_175 instanceof Left) {
                    return new Left(_175.value0);
                };
                if (_175 instanceof Right) {
                    return Prelude["<$>"](functorEither({}))(_175.value0)(_176);
                };
                throw new Error("Failed pattern match");
            };
        }, function (__1) {
            return functorEither({});
        });
    };
    var bindEither = function (_) {
        return new Prelude.Bind(either(function (e) {
            return function (__1) {
                return new Left(e);
            };
        })(function (a) {
            return function (f) {
                return f(a);
            };
        }), function (__1) {
            return applyEither({});
        });
    };
    var applicativeEither = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyEither({});
        }, Right.create);
    };
    var monadEither = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeEither({});
        }, function (__1) {
            return bindEither({});
        });
    };
    return {
        Left: Left, 
        Right: Right, 
        isRight: isRight, 
        isLeft: isLeft, 
        either: either, 
        functorEither: functorEither, 
        applyEither: applyEither, 
        applicativeEither: applicativeEither, 
        bindEither: bindEither, 
        monadEither: monadEither, 
        showEither: showEither, 
        eqEither: eqEither, 
        ordEither: ordEither
    };
})();
var PS = PS || {};
PS.Data_Profunctor_Choice = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Data_Profunctor = PS.Data_Profunctor;
    function Choice(__superclass_Data$dotProfunctor$dotProfunctor_0, left$prime, right$prime) {
        this["__superclass_Data.Profunctor.Profunctor_0"] = __superclass_Data$dotProfunctor$dotProfunctor_0;
        this["left'"] = left$prime;
        this["right'"] = right$prime;
    };
    var right$prime = function (dict) {
        return dict["right'"];
    };
    var left$prime = function (dict) {
        return dict["left'"];
    };
    var choiceArr = function (_) {
        return new Choice(function (__1) {
            return Data_Profunctor.profunctorArr({});
        }, function (_182) {
            return function (_183) {
                if (_183 instanceof Data_Either.Left) {
                    return Data_Either.Left.create(_182(_183.value0));
                };
                if (_183 instanceof Data_Either.Right) {
                    return new Data_Either.Right(_183.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, Prelude["<$>"](Data_Either.functorEither({})));
    };
    return {
        Choice: Choice, 
        "right'": right$prime, 
        "left'": left$prime, 
        choiceArr: choiceArr
    };
})();
var PS = PS || {};
PS.Data_Contravariant = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Contravariant($greater$dollar$less) {
        this[">$<"] = $greater$dollar$less;
    };
    var $greater$dollar$less = function (dict) {
        return dict[">$<"];
    };
    return {
        Contravariant: Contravariant, 
        ">$<": $greater$dollar$less
    };
})();
var PS = PS || {};
PS.Data_Const = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Contravariant = PS.Data_Contravariant;
    function Const(value0) {
        this.value0 = value0;
    };
    Const.create = function (value0) {
        return new Const(value0);
    };
    var showConst = function (__dict_Show_28) {
        return new Prelude.Show(function (_187) {
            return Prelude.show(__dict_Show_28)(_187.value0);
        });
    };
    var getConst = function (_184) {
        return _184.value0;
    };
    var functorConst = function (_) {
        return new Prelude.Functor(function (_190) {
            return function (_191) {
                return new Const(_191.value0);
            };
        });
    };
    var eqConst = function (__dict_Eq_30) {
        return new Prelude.Eq(function (c) {
            return function (c$prime) {
                return !Prelude["=="](eqConst(__dict_Eq_30))(c)(c$prime);
            };
        }, function (_185) {
            return function (_186) {
                return Prelude["=="](__dict_Eq_30)(_185.value0)(_186.value0);
            };
        });
    };
    var ordConst = function (__dict_Ord_29) {
        return new Prelude.Ord(function (_) {
            return eqConst(__dict_Ord_29["__superclass_Prelude.Eq_0"]({}));
        }, function (_188) {
            return function (_189) {
                return Prelude.compare(__dict_Ord_29)(_188.value0)(_189.value0);
            };
        });
    };
    var contravariantConst = function (_) {
        return new Data_Contravariant.Contravariant(function (_192) {
            return function (_193) {
                return new Const(_193.value0);
            };
        });
    };
    return {
        Const: Const, 
        getConst: getConst, 
        eqConst: eqConst, 
        showConst: showConst, 
        ordConst: ordConst, 
        functorConst: functorConst, 
        contravariantConst: contravariantConst
    };
})();
var PS = PS || {};
PS.Data_Array = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    function snoc(l) {  return function (e) {    var l1 = l.slice();    l1.push(e);     return l1;  };};
    function length (xs) {  return xs.length;};
    function findIndex (f) {  return function (arr) {    for (var i = 0, l = arr.length; i < l; i++) {      if (f(arr[i])) {        return i;      }    }    return -1;  };};
    function findLastIndex (f) {  return function (arr) {    for (var i = arr.length - 1; i >= 0; i--) {      if (f(arr[i])) {        return i;      }    }    return -1;  };};
    function append (l1) {  return function (l2) {    return l1.concat(l2);  };};
    function concat (xss) {  var result = [];  for (var i = 0, l = xss.length; i < l; i++) {    result.push.apply(result, xss[i]);  }  return result;};
    function reverse (l) {  return l.slice().reverse();};
    function drop (n) {  return function (l) {    return l.slice(n);  };};
    function slice (s) {  return function (e) {    return function (l) {      return l.slice(s, e);    };  };};
    function insertAt (index) {  return function (a) {    return function (l) {      var l1 = l.slice();      l1.splice(index, 0, a);      return l1;    };   };};
    function deleteAt (index) {  return function (n) {    return function (l) {      var l1 = l.slice();      l1.splice(index, n);      return l1;    };   };};
    function updateAt (index) {  return function (a) {    return function (l) {      var i = ~~index;      if (i < 0 || i >= l.length) return l;      var l1 = l.slice();      l1[i] = a;      return l1;    };   };};
    function concatMap (f) {  return function (arr) {    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      Array.prototype.push.apply(result, f(arr[i]));    }    return result;  };};
    function map (f) {  return function (arr) {    var l = arr.length;    var result = new Array(l);    for (var i = 0; i < l; i++) {      result[i] = f(arr[i]);    }    return result;  };};
    function filter (f) {  return function (arr) {    var n = 0;    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      if (f(arr[i])) {        result[n++] = arr[i];      }    }    return result;  };};
    function range (start) {  return function (end) {    var i = ~~start, e = ~~end;    var step = i > e ? -1 : 1;    var result = [i], n = 1;    while (i !== e) {      i += step;      result[n++] = i;    }    return result;  };};
    function zipWith (f) {  return function (xs) {    return function (ys) {      var l = xs.length < ys.length ? xs.length : ys.length;      var result = new Array(l);      for (var i = 0; i < l; i++) {        result[i] = f(xs[i])(ys[i]);      }      return result;    };  };};
    function sortJS (f) {  return function (l) {    return l.slice().sort(function (x, y) {      return f(x)(y);    });  };};
    var $bang$bang = function (xs) {
        return function (n) {
            var isInt = function (n_1) {
                return n_1 !== ~~n_1;
            };
            return n < 0 || n >= length(xs) || isInt(n) ? Data_Maybe.Nothing.value : new Data_Maybe.Just(xs[n]);
        };
    };
    var take = function (n) {
        return slice(0)(n);
    };
    var tail = function (_196) {
        if (_196.length > 0) {
            var _769 = _196.slice(1);
            return new Data_Maybe.Just(_769);
        };
        return Data_Maybe.Nothing.value;
    };
    var span = (function () {
        var go = function (__copy__212) {
            return function (__copy__213) {
                return function (__copy__214) {
                    var _212 = __copy__212;
                    var _213 = __copy__213;
                    var _214 = __copy__214;
                    tco: while (true) {
                        if (_214.length > 0) {
                            var _774 = _214.slice(1);
                            if (_213(_214[0])) {
                                var __tco__212 = Prelude[":"](_214[0])(_212);
                                var __tco__213 = _213;
                                _212 = __tco__212;
                                _213 = __tco__213;
                                _214 = _774;
                                continue tco;
                            };
                        };
                        return {
                            init: reverse(_212), 
                            rest: _214
                        };
                    };
                };
            };
        };
        return go([  ]);
    })();
    var sortBy = function (comp) {
        return function (xs) {
            var comp$prime = function (x) {
                return function (y) {
                    return (function (_775) {
                        if (_775 instanceof Prelude.GT) {
                            return 1;
                        };
                        if (_775 instanceof Prelude.EQ) {
                            return 0;
                        };
                        if (_775 instanceof Prelude.LT) {
                            return -1;
                        };
                        throw new Error("Failed pattern match");
                    })(comp(x)(y));
                };
            };
            return sortJS(comp$prime)(xs);
        };
    };
    var sort = function (__dict_Ord_31) {
        return function (xs) {
            return sortBy(Prelude.compare(__dict_Ord_31))(xs);
        };
    };
    var singleton = function (a) {
        return [ a ];
    };
    var semigroupArray = function (_) {
        return new Prelude.Semigroup(append);
    };
    var $$null = function (_198) {
        if (_198.length === 0) {
            return true;
        };
        return false;
    };
    var nubBy = function (_205) {
        return function (_206) {
            if (_206.length === 0) {
                return [  ];
            };
            if (_206.length > 0) {
                var _780 = _206.slice(1);
                return Prelude[":"](_206[0])(nubBy(_205)(filter(function (y) {
                    return !_205(_206[0])(y);
                })(_780)));
            };
            throw new Error("Failed pattern match");
        };
    };
    var nub = function (__dict_Eq_32) {
        return nubBy(Prelude["=="](__dict_Eq_32));
    };
    var mapMaybe = function (f) {
        return concatMap(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe.maybe([  ])(singleton))(f));
    };
    var last = function (__copy__195) {
        var _195 = __copy__195;
        tco: while (true) {
            if (_195.length > 0) {
                var _783 = _195.slice(1);
                if (_783.length === 0) {
                    return new Data_Maybe.Just(_195[0]);
                };
            };
            if (_195.length > 0) {
                var _785 = _195.slice(1);
                _195 = _785;
                continue tco;
            };
            return Data_Maybe.Nothing.value;
        };
    };
    var intersectBy = function (_202) {
        return function (_203) {
            return function (_204) {
                if (_203.length === 0) {
                    return [  ];
                };
                if (_204.length === 0) {
                    return [  ];
                };
                var el = function (x) {
                    return findIndex(_202(x))(_204) >= 0;
                };
                return filter(el)(_203);
            };
        };
    };
    var intersect = function (__dict_Eq_33) {
        return intersectBy(Prelude["=="](__dict_Eq_33));
    };
    var init = function (_197) {
        if (_197.length === 0) {
            return Data_Maybe.Nothing.value;
        };
        return new Data_Maybe.Just(slice(0)(length(_197) - 1)(_197));
    };
    var head = function (_194) {
        if (_194.length > 0) {
            var _792 = _194.slice(1);
            return new Data_Maybe.Just(_194[0]);
        };
        return Data_Maybe.Nothing.value;
    };
    var groupBy = (function () {
        var go = function (__copy__209) {
            return function (__copy__210) {
                return function (__copy__211) {
                    var _209 = __copy__209;
                    var _210 = __copy__210;
                    var _211 = __copy__211;
                    tco: while (true) {
                        if (_211.length === 0) {
                            return reverse(_209);
                        };
                        if (_211.length > 0) {
                            var _797 = _211.slice(1);
                            var sp = span(_210(_211[0]))(_797);
                            var __tco__209 = Prelude[":"](Prelude[":"](_211[0])(sp.init))(_209);
                            var __tco__210 = _210;
                            _209 = __tco__209;
                            _210 = __tco__210;
                            _211 = sp.rest;
                            continue tco;
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        return go([  ]);
    })();
    var group = function (__dict_Eq_34) {
        return function (xs) {
            return groupBy(Prelude["=="](__dict_Eq_34))(xs);
        };
    };
    var group$prime = function (__dict_Ord_35) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(group(__dict_Ord_35["__superclass_Prelude.Eq_0"]({})))(sort(__dict_Ord_35));
    };
    var functorArray = function (_) {
        return new Prelude.Functor(map);
    };
    var elemLastIndex = function (__dict_Eq_36) {
        return function (x) {
            return findLastIndex(Prelude["=="](__dict_Eq_36)(x));
        };
    };
    var elemIndex = function (__dict_Eq_37) {
        return function (x) {
            return findIndex(Prelude["=="](__dict_Eq_37)(x));
        };
    };
    var deleteBy = function (_199) {
        return function (_200) {
            return function (_201) {
                if (_201.length === 0) {
                    return [  ];
                };
                return (function (_801) {
                    if (_801 < 0) {
                        return _201;
                    };
                    return deleteAt(_801)(1)(_201);
                })(findIndex(_199(_200))(_201));
            };
        };
    };
    var $$delete = function (__dict_Eq_38) {
        return deleteBy(Prelude["=="](__dict_Eq_38));
    };
    var $bslash$bslash = function (__dict_Eq_39) {
        return function (xs) {
            return function (ys) {
                var go = function (__copy__207) {
                    return function (__copy__208) {
                        var _207 = __copy__207;
                        var _208 = __copy__208;
                        tco: while (true) {
                            if (_208.length === 0) {
                                return _207;
                            };
                            if (_207.length === 0) {
                                return [  ];
                            };
                            if (_208.length > 0) {
                                var _805 = _208.slice(1);
                                var __tco__207 = $$delete(__dict_Eq_39)(_208[0])(_207);
                                _207 = __tco__207;
                                _208 = _805;
                                continue tco;
                            };
                            throw new Error("Failed pattern match");
                        };
                    };
                };
                return go(xs)(ys);
            };
        };
    };
    var catMaybes = concatMap(Data_Maybe.maybe([  ])(singleton));
    var applicativeArray = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyArray({});
        }, singleton);
    };
    var applyArray = function (_) {
        return new Prelude.Apply(Prelude.ap(monadArray({})), function (__1) {
            return functorArray({});
        });
    };
    var monadArray = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeArray({});
        }, function (__1) {
            return bindArray({});
        });
    };
    var bindArray = function (_) {
        return new Prelude.Bind(Prelude.flip(concatMap), function (__1) {
            return applyArray({});
        });
    };
    var alternativeArray = function (_) {
        return new Prelude.Alternative(append, [  ]);
    };
    return {
        span: span, 
        groupBy: groupBy, 
        "group'": group$prime, 
        group: group, 
        sortBy: sortBy, 
        sort: sort, 
        nubBy: nubBy, 
        nub: nub, 
        zipWith: zipWith, 
        range: range, 
        filter: filter, 
        concatMap: concatMap, 
        intersect: intersect, 
        intersectBy: intersectBy, 
        "\\\\": $bslash$bslash, 
        "delete": $$delete, 
        deleteBy: deleteBy, 
        updateAt: updateAt, 
        deleteAt: deleteAt, 
        insertAt: insertAt, 
        take: take, 
        drop: drop, 
        reverse: reverse, 
        concat: concat, 
        append: append, 
        elemLastIndex: elemLastIndex, 
        elemIndex: elemIndex, 
        findLastIndex: findLastIndex, 
        findIndex: findIndex, 
        length: length, 
        catMaybes: catMaybes, 
        mapMaybe: mapMaybe, 
        map: map, 
        "null": $$null, 
        init: init, 
        tail: tail, 
        last: last, 
        head: head, 
        singleton: singleton, 
        snoc: snoc, 
        "!!": $bang$bang, 
        functorArray: functorArray, 
        applyArray: applyArray, 
        applicativeArray: applicativeArray, 
        bindArray: bindArray, 
        monadArray: monadArray, 
        semigroupArray: semigroupArray, 
        alternativeArray: alternativeArray
    };
})();
var PS = PS || {};
PS.Data_Array_Unsafe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    var Data_Array = PS.Data_Array;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var tail = function (_216) {
        if (_216.length > 0) {
            var _808 = _216.slice(1);
            return _808;
        };
        throw new Error("Failed pattern match");
    };
    var last = function (xs) {
        return xs[Data_Array.length(xs) - 1];
    };
    var init = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Data_Array.init);
    var head = function (_215) {
        if (_215.length > 0) {
            var _811 = _215.slice(1);
            return _215[0];
        };
        throw new Error("Failed pattern match");
    };
    return {
        init: init, 
        last: last, 
        tail: tail, 
        head: head
    };
})();
var PS = PS || {};
PS.Data_Monoid = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    function Monoid(__superclass_Prelude$dotSemigroup_0, mempty) {
        this["__superclass_Prelude.Semigroup_0"] = __superclass_Prelude$dotSemigroup_0;
        this.mempty = mempty;
    };
    var monoidString = function (_) {
        return new Monoid(function (__1) {
            return Prelude.semigroupString({});
        }, "");
    };
    var monoidArray = function (_) {
        return new Monoid(function (__1) {
            return Data_Array.semigroupArray({});
        }, [  ]);
    };
    var mempty = function (dict) {
        return dict.mempty;
    };
    return {
        Monoid: Monoid, 
        mempty: mempty, 
        monoidString: monoidString, 
        monoidArray: monoidArray
    };
})();
var PS = PS || {};
PS.Data_Monoid_All = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    function All(value0) {
        this.value0 = value0;
    };
    All.create = function (value0) {
        return new All(value0);
    };
    var showAll = function (_) {
        return new Prelude.Show(function (_222) {
            return "All " + Prelude.show(Prelude.showBoolean({}))(_222.value0);
        });
    };
    var semigroupAll = function (_) {
        return new Prelude.Semigroup(function (_223) {
            return function (_224) {
                return new All(_223.value0 && _224.value0);
            };
        });
    };
    var runAll = function (_217) {
        return _217.value0;
    };
    var monoidAll = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupAll({});
        }, new All(true));
    };
    var eqAll = function (_) {
        return new Prelude.Eq(function (_220) {
            return function (_221) {
                return _220.value0 !== _221.value0;
            };
        }, function (_218) {
            return function (_219) {
                return _218.value0 === _219.value0;
            };
        });
    };
    return {
        All: All, 
        runAll: runAll, 
        eqAll: eqAll, 
        showAll: showAll, 
        semigroupAll: semigroupAll, 
        monoidAll: monoidAll
    };
})();
var PS = PS || {};
PS.Data_Monoid_Any = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    function Any(value0) {
        this.value0 = value0;
    };
    Any.create = function (value0) {
        return new Any(value0);
    };
    var showAny = function (_) {
        return new Prelude.Show(function (_230) {
            return "Any " + Prelude.show(Prelude.showBoolean({}))(_230.value0);
        });
    };
    var semigroupAny = function (_) {
        return new Prelude.Semigroup(function (_231) {
            return function (_232) {
                return new Any(_231.value0 || _232.value0);
            };
        });
    };
    var runAny = function (_225) {
        return _225.value0;
    };
    var monoidAny = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupAny({});
        }, new Any(false));
    };
    var eqAny = function (_) {
        return new Prelude.Eq(function (_228) {
            return function (_229) {
                return _228.value0 !== _229.value0;
            };
        }, function (_226) {
            return function (_227) {
                return _226.value0 === _227.value0;
            };
        });
    };
    return {
        Any: Any, 
        runAny: runAny, 
        eqAny: eqAny, 
        showAny: showAny, 
        semigroupAny: semigroupAny, 
        monoidAny: monoidAny
    };
})();
var PS = PS || {};
PS.Data_Monoid_Dual = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    function Dual(value0) {
        this.value0 = value0;
    };
    Dual.create = function (value0) {
        return new Dual(value0);
    };
    var showDual = function (__dict_Show_40) {
        return new Prelude.Show(function (_240) {
            return "Dual " + Prelude.show(__dict_Show_40)(_240.value0);
        });
    };
    var semigroupDual = function (__dict_Semigroup_41) {
        return new Prelude.Semigroup(function (_241) {
            return function (_242) {
                return new Dual(Prelude["<>"](__dict_Semigroup_41)(_242.value0)(_241.value0));
            };
        });
    };
    var runDual = function (_233) {
        return _233.value0;
    };
    var monoidDual = function (__dict_Monoid_43) {
        return new Data_Monoid.Monoid(function (_) {
            return semigroupDual(__dict_Monoid_43["__superclass_Prelude.Semigroup_0"]({}));
        }, new Dual(Data_Monoid.mempty(__dict_Monoid_43)));
    };
    var eqDual = function (__dict_Eq_44) {
        return new Prelude.Eq(function (_236) {
            return function (_237) {
                return Prelude["/="](__dict_Eq_44)(_236.value0)(_237.value0);
            };
        }, function (_234) {
            return function (_235) {
                return Prelude["=="](__dict_Eq_44)(_234.value0)(_235.value0);
            };
        });
    };
    var ordDual = function (__dict_Ord_42) {
        return new Prelude.Ord(function (_) {
            return eqDual(__dict_Ord_42["__superclass_Prelude.Eq_0"]({}));
        }, function (_238) {
            return function (_239) {
                return Prelude.compare(__dict_Ord_42)(_238.value0)(_239.value0);
            };
        });
    };
    return {
        Dual: Dual, 
        runDual: runDual, 
        eqDual: eqDual, 
        ordDual: ordDual, 
        showDual: showDual, 
        semigroupDual: semigroupDual, 
        monoidDual: monoidDual
    };
})();
var PS = PS || {};
PS.Data_Monoid_Endo = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    function Endo(value0) {
        this.value0 = value0;
    };
    Endo.create = function (value0) {
        return new Endo(value0);
    };
    var semigroupEndo = function (_) {
        return new Prelude.Semigroup(function (_244) {
            return function (_245) {
                return new Endo(Prelude["<<<"](Prelude.semigroupoidArr({}))(_244.value0)(_245.value0));
            };
        });
    };
    var runEndo = function (_243) {
        return _243.value0;
    };
    var monoidEndo = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupEndo({});
        }, new Endo(Prelude.id(Prelude.categoryArr({}))));
    };
    return {
        Endo: Endo, 
        runEndo: runEndo, 
        semigroupEndo: semigroupEndo, 
        monoidEndo: monoidEndo
    };
})();
var PS = PS || {};
PS.Data_Monoid_First = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Monoid = PS.Data_Monoid;
    function First(value0) {
        this.value0 = value0;
    };
    First.create = function (value0) {
        return new First(value0);
    };
    var showFirst = function (__dict_Show_45) {
        return new Prelude.Show(function (_253) {
            return "First (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_45))(_253.value0) + ")";
        });
    };
    var semigroupFirst = function (_) {
        return new Prelude.Semigroup(function (_254) {
            return function (_255) {
                if (_254.value0 instanceof Data_Maybe.Just) {
                    return _254;
                };
                return _255;
            };
        });
    };
    var runFirst = function (_246) {
        return _246.value0;
    };
    var monoidFirst = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupFirst({});
        }, new First(Data_Maybe.Nothing.value));
    };
    var eqFirst = function (__dict_Eq_47) {
        return new Prelude.Eq(function (_249) {
            return function (_250) {
                return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_47))(_249.value0)(_250.value0);
            };
        }, function (_247) {
            return function (_248) {
                return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_47))(_247.value0)(_248.value0);
            };
        });
    };
    var ordFirst = function (__dict_Ord_46) {
        return new Prelude.Ord(function (_) {
            return eqFirst(__dict_Ord_46["__superclass_Prelude.Eq_0"]({}));
        }, function (_251) {
            return function (_252) {
                return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_46))(_251.value0)(_252.value0);
            };
        });
    };
    return {
        First: First, 
        runFirst: runFirst, 
        eqFirst: eqFirst, 
        ordFirst: ordFirst, 
        showFirst: showFirst, 
        semigroupFirst: semigroupFirst, 
        monoidFirst: monoidFirst
    };
})();
var PS = PS || {};
PS.Data_Monoid_Last = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Monoid = PS.Data_Monoid;
    function Last(value0) {
        this.value0 = value0;
    };
    Last.create = function (value0) {
        return new Last(value0);
    };
    var showLast = function (__dict_Show_48) {
        return new Prelude.Show(function (_263) {
            return "Last (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_48))(_263.value0) + ")";
        });
    };
    var semigroupLast = function (_) {
        return new Prelude.Semigroup(function (_264) {
            return function (_265) {
                if (_265.value0 instanceof Data_Maybe.Just) {
                    return _265;
                };
                if (_265.value0 instanceof Data_Maybe.Nothing) {
                    return _264;
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var runLast = function (_256) {
        return _256.value0;
    };
    var monoidLast = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupLast({});
        }, new Last(Data_Maybe.Nothing.value));
    };
    var eqLast = function (__dict_Eq_50) {
        return new Prelude.Eq(function (_259) {
            return function (_260) {
                return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_50))(_259.value0)(_260.value0);
            };
        }, function (_257) {
            return function (_258) {
                return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_50))(_257.value0)(_258.value0);
            };
        });
    };
    var ordLast = function (__dict_Ord_49) {
        return new Prelude.Ord(function (_) {
            return eqLast(__dict_Ord_49["__superclass_Prelude.Eq_0"]({}));
        }, function (_261) {
            return function (_262) {
                return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_49))(_261.value0)(_262.value0);
            };
        });
    };
    return {
        Last: Last, 
        runLast: runLast, 
        eqLast: eqLast, 
        ordLast: ordLast, 
        showLast: showLast, 
        semigroupLast: semigroupLast, 
        monoidLast: monoidLast
    };
})();
var PS = PS || {};
PS.Data_Monoid_Product = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    function Product(value0) {
        this.value0 = value0;
    };
    Product.create = function (value0) {
        return new Product(value0);
    };
    var showProduct = function (_) {
        return new Prelude.Show(function (_273) {
            return "Product " + Prelude.show(Prelude.showNumber({}))(_273.value0);
        });
    };
    var semigroupProduct = function (_) {
        return new Prelude.Semigroup(function (_274) {
            return function (_275) {
                return new Product(_274.value0 * _275.value0);
            };
        });
    };
    var runProduct = function (_266) {
        return _266.value0;
    };
    var monoidProduct = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupProduct({});
        }, new Product(1));
    };
    var eqProduct = function (_) {
        return new Prelude.Eq(function (_269) {
            return function (_270) {
                return _269.value0 !== _270.value0;
            };
        }, function (_267) {
            return function (_268) {
                return _267.value0 === _268.value0;
            };
        });
    };
    var ordProduct = function (_) {
        return new Prelude.Ord(function (__1) {
            return eqProduct({});
        }, function (_271) {
            return function (_272) {
                return Prelude.compare(Prelude.ordNumber({}))(_271.value0)(_272.value0);
            };
        });
    };
    return {
        Product: Product, 
        runProduct: runProduct, 
        eqProduct: eqProduct, 
        ordProduct: ordProduct, 
        showProduct: showProduct, 
        semigroupProduct: semigroupProduct, 
        monoidProduct: monoidProduct
    };
})();
var PS = PS || {};
PS.Data_Monoid_Sum = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    function Sum(value0) {
        this.value0 = value0;
    };
    Sum.create = function (value0) {
        return new Sum(value0);
    };
    var showSum = function (_) {
        return new Prelude.Show(function (_283) {
            return "Sum " + Prelude.show(Prelude.showNumber({}))(_283.value0);
        });
    };
    var semigroupSum = function (_) {
        return new Prelude.Semigroup(function (_284) {
            return function (_285) {
                return new Sum(_284.value0 + _285.value0);
            };
        });
    };
    var runSum = function (_276) {
        return _276.value0;
    };
    var monoidSum = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupSum({});
        }, new Sum(0));
    };
    var eqSum = function (_) {
        return new Prelude.Eq(function (_279) {
            return function (_280) {
                return _279.value0 !== _280.value0;
            };
        }, function (_277) {
            return function (_278) {
                return _277.value0 === _278.value0;
            };
        });
    };
    var ordSum = function (_) {
        return new Prelude.Ord(function (__1) {
            return eqSum({});
        }, function (_281) {
            return function (_282) {
                return Prelude.compare(Prelude.ordNumber({}))(_281.value0)(_282.value0);
            };
        });
    };
    return {
        Sum: Sum, 
        runSum: runSum, 
        eqSum: eqSum, 
        ordSum: ordSum, 
        showSum: showSum, 
        semigroupSum: semigroupSum, 
        monoidSum: monoidSum
    };
})();
var PS = PS || {};
PS.Data_Tuple = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var Data_Monoid = PS.Data_Monoid;
    function Tuple(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Tuple.create = function (value0) {
        return function (value1) {
            return new Tuple(value0, value1);
        };
    };
    var zip = Data_Array.zipWith(Tuple.create);
    var unzip = function (_290) {
        if (_290.length > 0) {
            var _956 = _290.slice(1);
            return (function (_952) {
                return new Tuple(Prelude[":"]((_290[0]).value0)(_952.value0), Prelude[":"]((_290[0]).value1)(_952.value1));
            })(unzip(_956));
        };
        if (_290.length === 0) {
            return new Tuple([  ], [  ]);
        };
        throw new Error("Failed pattern match");
    };
    var uncurry = function (_288) {
        return function (_289) {
            return _288(_289.value0)(_289.value1);
        };
    };
    var swap = function (_291) {
        return new Tuple(_291.value1, _291.value0);
    };
    var snd = function (_287) {
        return _287.value1;
    };
    var showTuple = function (__dict_Show_51) {
        return function (__dict_Show_52) {
            return new Prelude.Show(function (_292) {
                return "Tuple (" + Prelude.show(__dict_Show_51)(_292.value0) + ") (" + Prelude.show(__dict_Show_52)(_292.value1) + ")";
            });
        };
    };
    var functorTuple = function (_) {
        return new Prelude.Functor(function (_297) {
            return function (_298) {
                return new Tuple(_298.value0, _297(_298.value1));
            };
        });
    };
    var fst = function (_286) {
        return _286.value0;
    };
    var eqTuple = function (__dict_Eq_56) {
        return function (__dict_Eq_57) {
            return new Prelude.Eq(function (t1) {
                return function (t2) {
                    return !Prelude["=="](eqTuple(__dict_Eq_56)(__dict_Eq_57))(t1)(t2);
                };
            }, function (_293) {
                return function (_294) {
                    return Prelude["=="](__dict_Eq_56)(_293.value0)(_294.value0) && Prelude["=="](__dict_Eq_57)(_293.value1)(_294.value1);
                };
            });
        };
    };
    var ordTuple = function (__dict_Ord_53) {
        return function (__dict_Ord_54) {
            return new Prelude.Ord(function (_) {
                return eqTuple(__dict_Ord_53["__superclass_Prelude.Eq_0"]({}))(__dict_Ord_54["__superclass_Prelude.Eq_0"]({}));
            }, function (_295) {
                return function (_296) {
                    return (function (_987) {
                        if (_987 instanceof Prelude.EQ) {
                            return Prelude.compare(__dict_Ord_54)(_295.value1)(_296.value1);
                        };
                        return _987;
                    })(Prelude.compare(__dict_Ord_53)(_295.value0)(_296.value0));
                };
            });
        };
    };
    var curry = function (f) {
        return function (a) {
            return function (b) {
                return f(new Tuple(a, b));
            };
        };
    };
    var applyTuple = function (__dict_Semigroup_59) {
        return new Prelude.Apply(function (_299) {
            return function (_300) {
                return new Tuple(Prelude["<>"](__dict_Semigroup_59)(_299.value0)(_300.value0), _299.value1(_300.value1));
            };
        }, functorTuple);
    };
    var bindTuple = function (__dict_Semigroup_58) {
        return new Prelude.Bind(function (_301) {
            return function (_302) {
                return (function (_1000) {
                    return new Tuple(Prelude["<>"](__dict_Semigroup_58)(_301.value0)(_1000.value0), _1000.value1);
                })(_302(_301.value1));
            };
        }, function (_) {
            return applyTuple(__dict_Semigroup_58);
        });
    };
    var applicativeTuple = function (__dict_Monoid_60) {
        return new Prelude.Applicative(function (_) {
            return applyTuple(__dict_Monoid_60["__superclass_Prelude.Semigroup_0"]({}));
        }, Tuple.create(Data_Monoid.mempty(__dict_Monoid_60)));
    };
    var monadTuple = function (__dict_Monoid_55) {
        return new Prelude.Monad(function (_) {
            return applicativeTuple(__dict_Monoid_55);
        }, function (_) {
            return bindTuple(__dict_Monoid_55["__superclass_Prelude.Semigroup_0"]({}));
        });
    };
    return {
        Tuple: Tuple, 
        swap: swap, 
        unzip: unzip, 
        zip: zip, 
        uncurry: uncurry, 
        curry: curry, 
        snd: snd, 
        fst: fst, 
        showTuple: showTuple, 
        eqTuple: eqTuple, 
        ordTuple: ordTuple, 
        functorTuple: functorTuple, 
        applyTuple: applyTuple, 
        applicativeTuple: applicativeTuple, 
        bindTuple: bindTuple, 
        monadTuple: monadTuple
    };
})();
var PS = PS || {};
PS.Data_Profunctor_Strong = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Profunctor = PS.Data_Profunctor;
    function Strong(__superclass_Data$dotProfunctor$dotProfunctor_0, first$prime, second$prime) {
        this["__superclass_Data.Profunctor.Profunctor_0"] = __superclass_Data$dotProfunctor$dotProfunctor_0;
        this["first'"] = first$prime;
        this["second'"] = second$prime;
    };
    var strongArr = function (_) {
        return new Strong(function (__1) {
            return Data_Profunctor.profunctorArr({});
        }, function (_303) {
            return function (_304) {
                return new Data_Tuple.Tuple(_303(_304.value0), _304.value1);
            };
        }, Prelude["<$>"](Data_Tuple.functorTuple({})));
    };
    var second$prime = function (dict) {
        return dict["second'"];
    };
    var first$prime = function (dict) {
        return dict["first'"];
    };
    return {
        Strong: Strong, 
        "second'": second$prime, 
        "first'": first$prime, 
        strongArr: strongArr
    };
})();
var PS = PS || {};
PS.Control_Monad_Trans = (function () {
    "use strict";
    function MonadTrans(lift) {
        this.lift = lift;
    };
    var lift = function (dict) {
        return dict.lift;
    };
    return {
        MonadTrans: MonadTrans, 
        lift: lift
    };
})();
var PS = PS || {};
PS.Control_Monad_Writer_Trans = (function () {
    "use strict";
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Monoid = PS.Data_Monoid;
    var WriterT = {
        create: function (value) {
            return value;
        }
    };
    var runWriterT = function (_306) {
        return _306;
    };
    var monadTransWriterT = function (__dict_Monoid_63) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_64) {
            return function (m) {
                return WriterT.create(Prelude[">>="](__dict_Monad_64["__superclass_Prelude.Bind_1"]({}))(m)(function (_5) {
                    return Prelude["return"](__dict_Monad_64)(new Data_Tuple.Tuple(_5, Data_Monoid.mempty(__dict_Monoid_63)));
                }));
            };
        });
    };
    var mapWriterT = function (f) {
        return function (m) {
            return WriterT.create(f(runWriterT(m)));
        };
    };
    var liftCatchWriter = function ($$catch) {
        return function (m) {
            return function (h) {
                return WriterT.create($$catch(runWriterT(m))(function (e) {
                    return runWriterT(h(e));
                }));
            };
        };
    };
    var liftCallCCWriter = function (__dict_Monoid_65) {
        return function (callCC) {
            return function (f) {
                return WriterT.create(callCC(function (c) {
                    return runWriterT(f(function (a) {
                        return WriterT.create(c(new Data_Tuple.Tuple(a, Data_Monoid.mempty(__dict_Monoid_65))));
                    }));
                }));
            };
        };
    };
    var functorWriterT = function (__dict_Functor_66) {
        return new Prelude.Functor(function (f) {
            return mapWriterT(Prelude["<$>"](__dict_Functor_66)(function (_305) {
                return new Data_Tuple.Tuple(f(_305.value0), _305.value1);
            }));
        });
    };
    var applyWriterT = function (__dict_Monoid_69) {
        return function (__dict_Functor_70) {
            return function (__dict_Applicative_71) {
                return new Prelude.Apply(function (f) {
                    return function (v) {
                        return WriterT.create((function () {
                            var k = function (_307) {
                                return function (_308) {
                                    return new Data_Tuple.Tuple(_307.value0(_308.value0), Prelude["<>"](__dict_Monoid_69["__superclass_Prelude.Semigroup_0"]({}))(_307.value1)(_308.value1));
                                };
                            };
                            return Prelude["<*>"](__dict_Applicative_71["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"](__dict_Functor_70)(k)(runWriterT(f)))(runWriterT(v));
                        })());
                    };
                }, function (_) {
                    return functorWriterT(__dict_Functor_70);
                });
            };
        };
    };
    var bindWriterT = function (__dict_Monoid_67) {
        return function (__dict_Monad_68) {
            return new Prelude.Bind(function (m) {
                return function (k) {
                    return WriterT.create(Prelude[">>="](__dict_Monad_68["__superclass_Prelude.Bind_1"]({}))(runWriterT(m))(function (_4) {
                        return Prelude[">>="](__dict_Monad_68["__superclass_Prelude.Bind_1"]({}))(runWriterT(k(_4.value0)))(function (_3) {
                            return Prelude["return"](__dict_Monad_68)(new Data_Tuple.Tuple(_3.value0, Prelude["<>"](__dict_Monoid_67["__superclass_Prelude.Semigroup_0"]({}))(_4.value1)(_3.value1)));
                        });
                    }));
                };
            }, function (_) {
                return applyWriterT(__dict_Monoid_67)(((__dict_Monad_68["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_68["__superclass_Prelude.Applicative_0"]({}));
            });
        };
    };
    var applicativeWriterT = function (__dict_Monoid_72) {
        return function (__dict_Functor_73) {
            return function (__dict_Applicative_74) {
                return new Prelude.Applicative(function (_) {
                    return applyWriterT(__dict_Monoid_72)(__dict_Functor_73)(__dict_Applicative_74);
                }, function (a) {
                    return WriterT.create(Prelude.pure(__dict_Applicative_74)(new Data_Tuple.Tuple(a, Data_Monoid.mempty(__dict_Monoid_72))));
                });
            };
        };
    };
    var monadWriterT = function (__dict_Monoid_61) {
        return function (__dict_Monad_62) {
            return new Prelude.Monad(function (_) {
                return applicativeWriterT(__dict_Monoid_61)(((__dict_Monad_62["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_62["__superclass_Prelude.Applicative_0"]({}));
            }, function (_) {
                return bindWriterT(__dict_Monoid_61)(__dict_Monad_62);
            });
        };
    };
    var alternativeWriterT = function (__dict_Monoid_75) {
        return function (__dict_Alternative_76) {
            return new Prelude.Alternative(function (m) {
                return function (n) {
                    return WriterT.create(Prelude["<|>"](__dict_Alternative_76)(runWriterT(m))(runWriterT(n)));
                };
            }, Prelude.empty(__dict_Alternative_76));
        };
    };
    return {
        WriterT: WriterT, 
        liftCallCCWriter: liftCallCCWriter, 
        liftCatchWriter: liftCatchWriter, 
        mapWriterT: mapWriterT, 
        runWriterT: runWriterT, 
        functorWriterT: functorWriterT, 
        applyWriterT: applyWriterT, 
        applicativeWriterT: applicativeWriterT, 
        alternativeWriterT: alternativeWriterT, 
        bindWriterT: bindWriterT, 
        monadWriterT: monadWriterT, 
        monadTransWriterT: monadTransWriterT
    };
})();
var PS = PS || {};
PS.Control_Monad_State_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Data_Tuple = PS.Data_Tuple;
    var StateT = {
        create: function (value) {
            return value;
        }
    };
    var runStateT = function (_311) {
        return _311;
    };
    var withStateT = function (f) {
        return function (s) {
            return StateT.create(Prelude["<<<"](Prelude.semigroupoidArr({}))(runStateT(s))(f));
        };
    };
    var monadTransStateT = function (_) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_77) {
            return function (m) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_77["__superclass_Prelude.Bind_1"]({}))(m)(function (_7) {
                        return Prelude["return"](__dict_Monad_77)(new Data_Tuple.Tuple(_7, s));
                    });
                };
            };
        });
    };
    var mapStateT = function (f) {
        return function (m) {
            return StateT.create(Prelude["<<<"](Prelude.semigroupoidArr({}))(f)(runStateT(m)));
        };
    };
    var liftPassState = function (__dict_Monad_79) {
        return function (pass) {
            return function (m) {
                return StateT.create(function (s) {
                    return pass(Prelude[">>="](__dict_Monad_79["__superclass_Prelude.Bind_1"]({}))(runStateT(m)(s))(function (_9) {
                        return Prelude["return"](__dict_Monad_79)(new Data_Tuple.Tuple(new Data_Tuple.Tuple(_9.value0.value0, _9.value1), _9.value0.value1));
                    }));
                });
            };
        };
    };
    var liftListenState = function (__dict_Monad_80) {
        return function (listen) {
            return function (m) {
                return StateT.create(function (s) {
                    return Prelude[">>="](__dict_Monad_80["__superclass_Prelude.Bind_1"]({}))(listen(runStateT(m)(s)))(function (_8) {
                        return Prelude["return"](__dict_Monad_80)(new Data_Tuple.Tuple(new Data_Tuple.Tuple(_8.value0.value0, _8.value1), _8.value0.value1));
                    });
                });
            };
        };
    };
    var liftCatchState = function ($$catch) {
        return function (m) {
            return function (h) {
                return StateT.create(function (s) {
                    return $$catch(runStateT(m)(s))(function (e) {
                        return runStateT(h(e))(s);
                    });
                });
            };
        };
    };
    var liftCallCCState$prime = function (callCC) {
        return function (f) {
            return StateT.create(function (s) {
                return callCC(function (c) {
                    return runStateT(f(function (a) {
                        return StateT.create(function (s$prime) {
                            return c(new Data_Tuple.Tuple(a, s$prime));
                        });
                    }))(s);
                });
            });
        };
    };
    var liftCallCCState = function (callCC) {
        return function (f) {
            return StateT.create(function (s) {
                return callCC(function (c) {
                    return runStateT(f(function (a) {
                        return StateT.create(function (_) {
                            return c(new Data_Tuple.Tuple(a, s));
                        });
                    }))(s);
                });
            });
        };
    };
    var execStateT = function (__dict_Monad_82) {
        return function (m) {
            return function (s) {
                return Prelude[">>="](__dict_Monad_82["__superclass_Prelude.Bind_1"]({}))(runStateT(m)(s))(function (_310) {
                    return Prelude["return"](__dict_Monad_82)(_310.value1);
                });
            };
        };
    };
    var evalStateT = function (__dict_Monad_83) {
        return function (m) {
            return function (s) {
                return Prelude[">>="](__dict_Monad_83["__superclass_Prelude.Bind_1"]({}))(runStateT(m)(s))(function (_309) {
                    return Prelude["return"](__dict_Monad_83)(_309.value0);
                });
            };
        };
    };
    var applicativeStateT = function (__dict_Monad_86) {
        return new Prelude.Applicative(function (_) {
            return applyStateT(__dict_Monad_86);
        }, function (a) {
            return StateT.create(function (s) {
                return Prelude["return"](__dict_Monad_86)(new Data_Tuple.Tuple(a, s));
            });
        });
    };
    var applyStateT = function (__dict_Monad_85) {
        return new Prelude.Apply(Prelude.ap(monadStateT(__dict_Monad_85)), function (_) {
            return functorStateT(__dict_Monad_85);
        });
    };
    var monadStateT = function (__dict_Monad_78) {
        return new Prelude.Monad(function (_) {
            return applicativeStateT(__dict_Monad_78);
        }, function (_) {
            return bindStateT(__dict_Monad_78);
        });
    };
    var bindStateT = function (__dict_Monad_84) {
        return new Prelude.Bind(function (_312) {
            return function (_313) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_84["__superclass_Prelude.Bind_1"]({}))(_312(s))(function (_6) {
                        return runStateT(_313(_6.value0))(_6.value1);
                    });
                };
            };
        }, function (_) {
            return applyStateT(__dict_Monad_84);
        });
    };
    var functorStateT = function (__dict_Monad_81) {
        return new Prelude.Functor(Prelude.liftM1(monadStateT(__dict_Monad_81)));
    };
    var alternativeStateT = function (__dict_Alternative_87) {
        return new Prelude.Alternative(function (x) {
            return function (y) {
                return StateT.create(function (s) {
                    return Prelude["<|>"](__dict_Alternative_87)(runStateT(x)(s))(runStateT(y)(s));
                });
            };
        }, StateT.create(function (_) {
            return Prelude.empty(__dict_Alternative_87);
        }));
    };
    return {
        StateT: StateT, 
        "liftCallCCState'": liftCallCCState$prime, 
        liftCallCCState: liftCallCCState, 
        liftPassState: liftPassState, 
        liftListenState: liftListenState, 
        liftCatchState: liftCatchState, 
        withStateT: withStateT, 
        mapStateT: mapStateT, 
        execStateT: execStateT, 
        evalStateT: evalStateT, 
        runStateT: runStateT, 
        functorStateT: functorStateT, 
        applyStateT: applyStateT, 
        applicativeStateT: applicativeStateT, 
        alternativeStateT: alternativeStateT, 
        bindStateT: bindStateT, 
        monadStateT: monadStateT, 
        monadTransStateT: monadTransStateT
    };
})();
var PS = PS || {};
PS.Control_Monad_Reader_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var ReaderT = {
        create: function (value) {
            return value;
        }
    };
    var runReaderT = function (_314) {
        return _314;
    };
    var withReaderT = function (f) {
        return function (m) {
            return ReaderT.create(Prelude["<<<"](Prelude.semigroupoidArr({}))(runReaderT(m))(f));
        };
    };
    var mapReaderT = function (f) {
        return function (m) {
            return ReaderT.create(Prelude["<<<"](Prelude.semigroupoidArr({}))(f)(runReaderT(m)));
        };
    };
    var liftReaderT = function (m) {
        return Prelude["const"](m);
    };
    var monadTransReaderT = function (_) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_89) {
            return liftReaderT;
        });
    };
    var liftCatchReader = function ($$catch) {
        return function (m) {
            return function (h) {
                return ReaderT.create(function (r) {
                    return $$catch(runReaderT(m)(r))(function (e) {
                        return runReaderT(h(e))(r);
                    });
                });
            };
        };
    };
    var liftCallCCReader = function (callCC) {
        return function (f) {
            return ReaderT.create(function (r) {
                return callCC(function (c) {
                    return runReaderT(f(function (a) {
                        return ReaderT.create(Prelude["const"](c(a)));
                    }))(r);
                });
            });
        };
    };
    var functorReaderT = function (__dict_Functor_90) {
        return new Prelude.Functor(function (f) {
            return mapReaderT(Prelude["<$>"](__dict_Functor_90)(f));
        });
    };
    var applyReaderT = function (__dict_Applicative_92) {
        return new Prelude.Apply(function (f) {
            return function (v) {
                return function (r) {
                    return Prelude["<*>"](__dict_Applicative_92["__superclass_Prelude.Apply_0"]({}))(runReaderT(f)(r))(runReaderT(v)(r));
                };
            };
        }, function (_) {
            return functorReaderT((__dict_Applicative_92["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}));
        });
    };
    var bindReaderT = function (__dict_Monad_91) {
        return new Prelude.Bind(function (m) {
            return function (k) {
                return function (r) {
                    return Prelude[">>="](__dict_Monad_91["__superclass_Prelude.Bind_1"]({}))(runReaderT(m)(r))(function (_10) {
                        return runReaderT(k(_10))(r);
                    });
                };
            };
        }, function (_) {
            return applyReaderT(__dict_Monad_91["__superclass_Prelude.Applicative_0"]({}));
        });
    };
    var applicativeReaderT = function (__dict_Applicative_93) {
        return new Prelude.Applicative(function (_) {
            return applyReaderT(__dict_Applicative_93);
        }, Prelude["<<<"](Prelude.semigroupoidArr({}))(liftReaderT)(Prelude.pure(__dict_Applicative_93)));
    };
    var monadReaderT = function (__dict_Monad_88) {
        return new Prelude.Monad(function (_) {
            return applicativeReaderT(__dict_Monad_88["__superclass_Prelude.Applicative_0"]({}));
        }, function (_) {
            return bindReaderT(__dict_Monad_88);
        });
    };
    var alternativeReaderT = function (__dict_Alternative_94) {
        return new Prelude.Alternative(function (m) {
            return function (n) {
                return function (r) {
                    return Prelude["<|>"](__dict_Alternative_94)(runReaderT(m)(r))(runReaderT(n)(r));
                };
            };
        }, liftReaderT(Prelude.empty(__dict_Alternative_94)));
    };
    return {
        ReaderT: ReaderT, 
        liftCallCCReader: liftCallCCReader, 
        liftCatchReader: liftCatchReader, 
        liftReaderT: liftReaderT, 
        mapReaderT: mapReaderT, 
        withReaderT: withReaderT, 
        runReaderT: runReaderT, 
        functorReaderT: functorReaderT, 
        applyReaderT: applyReaderT, 
        applicativeReaderT: applicativeReaderT, 
        alternativeReaderT: alternativeReaderT, 
        bindReaderT: bindReaderT, 
        monadReaderT: monadReaderT, 
        monadTransReaderT: monadTransReaderT
    };
})();
var PS = PS || {};
PS.Control_Monad_RWS_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Data_Monoid = PS.Data_Monoid;
    var RWST = {
        create: function (value) {
            return value;
        }
    };
    var runRWST = function (_317) {
        return _317;
    };
    var withRWST = function (f) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Data_Tuple.uncurry(runRWST(m))(f(r)(s));
                };
            };
        };
    };
    var mkSee = function (__dict_Monoid_97) {
        return function (s) {
            return function (a) {
                return function (w) {
                    return {
                        state: s, 
                        result: a, 
                        log: w
                    };
                };
            };
        };
    };
    var monadTransRWST = function (__dict_Monoid_98) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_99) {
            return function (m) {
                return function (_) {
                    return function (s) {
                        return Prelude[">>="](__dict_Monad_99["__superclass_Prelude.Bind_1"]({}))(m)(function (a) {
                            return Prelude["return"](__dict_Monad_99)(mkSee(__dict_Monoid_98)(s)(a)(Data_Monoid.mempty(__dict_Monoid_98)));
                        });
                    };
                };
            };
        });
    };
    var mapRWST = function (f) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return f(runRWST(m)(r)(s));
                };
            };
        };
    };
    var functorRWST = function (__dict_Functor_100) {
        return new Prelude.Functor(function (f) {
            return function (m) {
                return function (r) {
                    return function (s) {
                        return Prelude["<$>"](__dict_Functor_100)(function (see) {
                            var _1052 = {};
                            for (var _1053 in see) {
                                if (see.hasOwnProperty(_1053)) {
                                    _1052[_1053] = see[_1053];
                                };
                            };
                            _1052.result = f(see.result);
                            return _1052;
                        })(runRWST(m)(r)(s));
                    };
                };
            };
        });
    };
    var execRWST = function (__dict_Monad_101) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_101["__superclass_Prelude.Bind_1"]({}))(runRWST(m)(r)(s))(function (see) {
                        return Prelude["return"](__dict_Monad_101)(new Data_Tuple.Tuple(see.state, see.log));
                    });
                };
            };
        };
    };
    var evalRWST = function (__dict_Monad_102) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_102["__superclass_Prelude.Bind_1"]({}))(runRWST(m)(r)(s))(function (see) {
                        return Prelude["return"](__dict_Monad_102)(new Data_Tuple.Tuple(see.result, see.log));
                    });
                };
            };
        };
    };
    var applyRWST = function (__dict_Apply_105) {
        return function (__dict_Semigroup_106) {
            return new Prelude.Apply(function (f) {
                return function (m) {
                    return function (r) {
                        return function (s) {
                            return Prelude["<*>"](__dict_Apply_105)(Prelude["<$>"](__dict_Apply_105["__superclass_Prelude.Functor_0"]({}))(function (_315) {
                                return function (see) {
                                    var _1055 = {};
                                    for (var _1056 in see) {
                                        if (see.hasOwnProperty(_1056)) {
                                            _1055[_1056] = see[_1056];
                                        };
                                    };
                                    _1055.result = _315.result(see.result);
                                    _1055.log = Prelude["<>"](__dict_Semigroup_106)(_315.log)(see.log);
                                    return _1055;
                                };
                            })(runRWST(f)(r)(s)))(runRWST(m)(r)(s));
                        };
                    };
                };
            }, function (_) {
                return functorRWST(__dict_Apply_105["__superclass_Prelude.Functor_0"]({}));
            });
        };
    };
    var bindRWST = function (__dict_Bind_103) {
        return function (__dict_Semigroup_104) {
            return new Prelude.Bind(function (m) {
                return function (f) {
                    return function (r) {
                        return function (s) {
                            return Prelude[">>="](__dict_Bind_103)(runRWST(m)(r)(s))(function (_316) {
                                return Prelude["<$>"]((__dict_Bind_103["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(function (see$prime) {
                                    var _1060 = {};
                                    for (var _1061 in see$prime) {
                                        if (see$prime.hasOwnProperty(_1061)) {
                                            _1060[_1061] = see$prime[_1061];
                                        };
                                    };
                                    _1060.log = Prelude["<>"](__dict_Semigroup_104)(_316.log)(see$prime.log);
                                    return _1060;
                                })(runRWST(f(_316.result))(r)(_316.state));
                            });
                        };
                    };
                };
            }, function (_) {
                return applyRWST(__dict_Bind_103["__superclass_Prelude.Apply_0"]({}))(__dict_Semigroup_104);
            });
        };
    };
    var applicativeRWST = function (__dict_Applicative_107) {
        return function (__dict_Monoid_108) {
            return new Prelude.Applicative(function (_) {
                return applyRWST(__dict_Applicative_107["__superclass_Prelude.Apply_0"]({}))(__dict_Monoid_108["__superclass_Prelude.Semigroup_0"]({}));
            }, function (a) {
                return function (_) {
                    return function (s) {
                        return Prelude.pure(__dict_Applicative_107)(mkSee(__dict_Monoid_108)(s)(a)(Data_Monoid.mempty(__dict_Monoid_108)));
                    };
                };
            });
        };
    };
    var monadRWST = function (__dict_Monad_95) {
        return function (__dict_Monoid_96) {
            return new Prelude.Monad(function (_) {
                return applicativeRWST(__dict_Monad_95["__superclass_Prelude.Applicative_0"]({}))(__dict_Monoid_96);
            }, function (_) {
                return bindRWST(__dict_Monad_95["__superclass_Prelude.Bind_1"]({}))(__dict_Monoid_96["__superclass_Prelude.Semigroup_0"]({}));
            });
        };
    };
    return {
        RWST: RWST, 
        withRWST: withRWST, 
        mapRWST: mapRWST, 
        execRWST: execRWST, 
        evalRWST: evalRWST, 
        runRWST: runRWST, 
        mkSee: mkSee, 
        functorRWST: functorRWST, 
        applyRWST: applyRWST, 
        bindRWST: bindRWST, 
        applicativeRWST: applicativeRWST, 
        monadRWST: monadRWST, 
        monadTransRWST: monadTransRWST
    };
})();
var PS = PS || {};
PS.Control_Monad_Identity = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Identity = {
        create: function (value) {
            return value;
        }
    };
    var runIdentity = function (_318) {
        return _318;
    };
    var functorIdentity = function (_) {
        return new Prelude.Functor(function (f) {
            return function (m) {
                return Identity.create(f(runIdentity(m)));
            };
        });
    };
    var applyIdentity = function (_) {
        return new Prelude.Apply(function (_319) {
            return function (_320) {
                return Identity.create(_319(_320));
            };
        }, function (__1) {
            return functorIdentity({});
        });
    };
    var bindIdentity = function (_) {
        return new Prelude.Bind(function (m) {
            return function (f) {
                return f(runIdentity(m));
            };
        }, function (__1) {
            return applyIdentity({});
        });
    };
    var applicativeIdentity = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyIdentity({});
        }, Identity.create);
    };
    var monadIdentity = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeIdentity({});
        }, function (__1) {
            return bindIdentity({});
        });
    };
    return {
        Identity: Identity, 
        runIdentity: runIdentity, 
        functorIdentity: functorIdentity, 
        applyIdentity: applyIdentity, 
        applicativeIdentity: applicativeIdentity, 
        bindIdentity: bindIdentity, 
        monadIdentity: monadIdentity
    };
})();
var PS = PS || {};
PS.Control_Monad_RWS = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Monad_RWS_Trans = PS.Control_Monad_RWS_Trans;
    var Data_Monoid = PS.Data_Monoid;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var writer = function (__dict_Applicative_109) {
        return function (_324) {
            return function (_) {
                return function (s) {
                    return Prelude.pure(__dict_Applicative_109)({
                        state: s, 
                        result: _324.value0, 
                        log: _324.value1
                    });
                };
            };
        };
    };
    var withRWS = Control_Monad_RWS_Trans.withRWST;
    var tell = function (__dict_Applicative_110) {
        return function (w) {
            return writer(__dict_Applicative_110)(new Data_Tuple.Tuple(Prelude.unit, w));
        };
    };
    var state = function (__dict_Applicative_111) {
        return function (__dict_Monoid_112) {
            return function (f) {
                return function (_) {
                    return function (s) {
                        return (function (_1071) {
                            return Prelude.pure(__dict_Applicative_111)(Control_Monad_RWS_Trans.mkSee(__dict_Monoid_112)(_1071.value1)(_1071.value0)(Data_Monoid.mempty(__dict_Monoid_112)));
                        })(f(s));
                    };
                };
            };
        };
    };
    var rws = function (f) {
        return function (r) {
            return function (s) {
                return Prelude["return"](Control_Monad_Identity.monadIdentity({}))(f(r)(s));
            };
        };
    };
    var runRWS = function (m) {
        return function (r) {
            return function (s) {
                return Control_Monad_Identity.runIdentity(Control_Monad_RWS_Trans.runRWST(m)(r)(s));
            };
        };
    };
    var reader = function (__dict_Applicative_113) {
        return function (__dict_Monoid_114) {
            return function (f) {
                return function (r) {
                    return function (s) {
                        return Prelude.pure(__dict_Applicative_113)(Control_Monad_RWS_Trans.mkSee(__dict_Monoid_114)(s)(f(r))(Data_Monoid.mempty(__dict_Monoid_114)));
                    };
                };
            };
        };
    };
    var put = function (__dict_Applicative_115) {
        return function (__dict_Monoid_116) {
            return function (s) {
                return state(__dict_Applicative_115)(__dict_Monoid_116)(function (_) {
                    return new Data_Tuple.Tuple(Prelude.unit, s);
                });
            };
        };
    };
    var pass = function (__dict_Monad_117) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_117["__superclass_Prelude.Bind_1"]({}))(Control_Monad_RWS_Trans.runRWST(m)(r)(s))(function (_322) {
                        return Prelude.pure(__dict_Monad_117["__superclass_Prelude.Applicative_0"]({}))({
                            state: _322.state, 
                            result: _322.result.value0, 
                            log: _322.result.value1(_322.log)
                        });
                    });
                };
            };
        };
    };
    var modify = function (__dict_Applicative_118) {
        return function (__dict_Monoid_119) {
            return function (f) {
                return state(__dict_Applicative_118)(__dict_Monoid_119)(function (s) {
                    return new Data_Tuple.Tuple(Prelude.unit, f(s));
                });
            };
        };
    };
    var mapRWS = function (f) {
        return Control_Monad_RWS_Trans.mapRWST(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Prelude[">>>"](Prelude.semigroupoidArr({}))(f)(Control_Monad_Identity.Identity.create)));
    };
    var local = function (f) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Control_Monad_RWS_Trans.runRWST(m)(f(r))(s);
                };
            };
        };
    };
    var listens = function (__dict_Monad_120) {
        return function (f) {
            return function (m) {
                return function (r) {
                    return function (s) {
                        return Prelude[">>="](__dict_Monad_120["__superclass_Prelude.Bind_1"]({}))(Control_Monad_RWS_Trans.runRWST(m)(r)(s))(function (_323) {
                            return Prelude.pure(__dict_Monad_120["__superclass_Prelude.Applicative_0"]({}))({
                                state: _323.state, 
                                result: new Data_Tuple.Tuple(_323.result, f(_323.log)), 
                                log: _323.log
                            });
                        });
                    };
                };
            };
        };
    };
    var listen = function (__dict_Monad_121) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_121["__superclass_Prelude.Bind_1"]({}))(Control_Monad_RWS_Trans.runRWST(m)(r)(s))(function (_321) {
                        return Prelude.pure(__dict_Monad_121["__superclass_Prelude.Applicative_0"]({}))({
                            state: _321.state, 
                            result: new Data_Tuple.Tuple(_321.result, _321.log), 
                            log: _321.log
                        });
                    });
                };
            };
        };
    };
    var gets = function (__dict_Applicative_122) {
        return function (__dict_Monoid_123) {
            return function (f) {
                return state(__dict_Applicative_122)(__dict_Monoid_123)(function (s) {
                    return new Data_Tuple.Tuple(f(s), s);
                });
            };
        };
    };
    var get = function (__dict_Applicative_124) {
        return function (__dict_Monoid_125) {
            return state(__dict_Applicative_124)(__dict_Monoid_125)(function (s) {
                return new Data_Tuple.Tuple(s, s);
            });
        };
    };
    var execRWS = function (m) {
        return function (r) {
            return function (s) {
                return Control_Monad_Identity.runIdentity(Control_Monad_RWS_Trans.execRWST(Control_Monad_Identity.monadIdentity({}))(m)(r)(s));
            };
        };
    };
    var evalRWS = function (m) {
        return function (r) {
            return function (s) {
                return Control_Monad_Identity.runIdentity(Control_Monad_RWS_Trans.evalRWST(Control_Monad_Identity.monadIdentity({}))(m)(r)(s));
            };
        };
    };
    var censor = function (__dict_Monad_126) {
        return function (f) {
            return function (m) {
                return function (r) {
                    return function (s) {
                        return Prelude[">>="](__dict_Monad_126["__superclass_Prelude.Bind_1"]({}))(Control_Monad_RWS_Trans.runRWST(m)(r)(s))(function (see) {
                            return Prelude.pure(__dict_Monad_126["__superclass_Prelude.Applicative_0"]({}))((function () {
                                var _1088 = {};
                                for (var _1089 in see) {
                                    if (see.hasOwnProperty(_1089)) {
                                        _1088[_1089] = see[_1089];
                                    };
                                };
                                _1088.log = f(see.log);
                                return _1088;
                            })());
                        });
                    };
                };
            };
        };
    };
    var ask = function (__dict_Applicative_127) {
        return function (__dict_Monoid_128) {
            return function (r) {
                return function (s) {
                    return Prelude.pure(__dict_Applicative_127)(Control_Monad_RWS_Trans.mkSee(__dict_Monoid_128)(s)(r)(Data_Monoid.mempty(__dict_Monoid_128)));
                };
            };
        };
    };
    return {
        modify: modify, 
        put: put, 
        gets: gets, 
        get: get, 
        state: state, 
        censor: censor, 
        listens: listens, 
        tell: tell, 
        pass: pass, 
        listen: listen, 
        writer: writer, 
        reader: reader, 
        local: local, 
        ask: ask, 
        withRWS: withRWS, 
        mapRWS: mapRWS, 
        execRWS: execRWS, 
        evalRWS: evalRWS, 
        runRWS: runRWS, 
        rws: rws
    };
})();
var PS = PS || {};
PS.Control_Monad_Reader = (function () {
    "use strict";
    var Control_Monad_Reader_Trans = PS.Control_Monad_Reader_Trans;
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var withReader = Control_Monad_Reader_Trans.withReaderT;
    var runReader = function (m) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Control_Monad_Reader_Trans.runReaderT(m));
    };
    var mapReader = function (f) {
        return Control_Monad_Reader_Trans.mapReaderT(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.Identity.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(f)(Control_Monad_Identity.runIdentity)));
    };
    return {
        mapReader: mapReader, 
        withReader: withReader, 
        runReader: runReader
    };
})();
var PS = PS || {};
PS.Control_Monad_State = (function () {
    "use strict";
    var Control_Monad_State_Trans = PS.Control_Monad_State_Trans;
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Tuple = PS.Data_Tuple;
    var withState = Control_Monad_State_Trans.withStateT;
    var runState = function (s) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Control_Monad_State_Trans.runStateT(s));
    };
    var mapState = function (f) {
        return Control_Monad_State_Trans.mapStateT(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.Identity.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(f)(Control_Monad_Identity.runIdentity)));
    };
    var execState = function (m) {
        return function (s) {
            return Data_Tuple.snd(runState(m)(s));
        };
    };
    var evalState = function (m) {
        return function (s) {
            return Data_Tuple.fst(runState(m)(s));
        };
    };
    return {
        withState: withState, 
        mapState: mapState, 
        execState: execState, 
        evalState: evalState, 
        runState: runState
    };
})();
var PS = PS || {};
PS.Control_Monad_Writer = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Control_Monad_Writer_Trans = PS.Control_Monad_Writer_Trans;
    var Data_Tuple = PS.Data_Tuple;
    var runWriter = Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Control_Monad_Writer_Trans.runWriterT);
    var mapWriter = function (f) {
        return Control_Monad_Writer_Trans.mapWriterT(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.Identity.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(f)(Control_Monad_Identity.runIdentity)));
    };
    var execWriter = function (m) {
        return Data_Tuple.snd(runWriter(m));
    };
    return {
        mapWriter: mapWriter, 
        execWriter: execWriter, 
        runWriter: runWriter
    };
})();
var PS = PS || {};
PS.Data_Distributive = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    function Distributive(__superclass_Prelude$dotFunctor_0, collect, distribute) {
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
        this.collect = collect;
        this.distribute = distribute;
    };
    var distributiveIdentity = function (_) {
        return new Distributive(function (__1) {
            return Control_Monad_Identity.functorIdentity({});
        }, function (__dict_Functor_130) {
            return function (a2Idb) {
                return function (ga) {
                    return Prelude["<$>"](__dict_Functor_130)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(a2Idb))(ga);
                };
            };
        }, function (__dict_Functor_129) {
            return function (gIdb) {
                return Prelude["<$>"](__dict_Functor_129)(Control_Monad_Identity.runIdentity)(gIdb);
            };
        });
    };
    var distribute = function (dict) {
        return dict.distribute;
    };
    var cotraverse = function (__dict_Distributive_131) {
        return function (__dict_Functor_132) {
            return function (ga2b) {
                return function (gfa) {
                    return Prelude["<$>"](__dict_Distributive_131["__superclass_Prelude.Functor_0"]({}))(ga2b)(distribute(__dict_Distributive_131)(__dict_Functor_132)(gfa));
                };
            };
        };
    };
    var collect = function (dict) {
        return dict.collect;
    };
    return {
        Distributive: Distributive, 
        cotraverse: cotraverse, 
        collect: collect, 
        distribute: distribute, 
        distributiveIdentity: distributiveIdentity
    };
})();
var PS = PS || {};
PS.Data_Profunctor_Rep = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Profunctor = PS.Data_Profunctor;
    function Representable(__superclass_Data$dotProfunctor$dotProfunctor_1, __superclass_Prelude$dotFunctor_0, rep, tabulate) {
        this["__superclass_Data.Profunctor.Profunctor_1"] = __superclass_Data$dotProfunctor$dotProfunctor_1;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
        this.rep = rep;
        this.tabulate = tabulate;
    };
    function Corepresentable(__superclass_Data$dotProfunctor$dotProfunctor_1, __superclass_Prelude$dotFunctor_0, corep, cotabulate) {
        this["__superclass_Data.Profunctor.Profunctor_1"] = __superclass_Data$dotProfunctor$dotProfunctor_1;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
        this.corep = corep;
        this.cotabulate = cotabulate;
    };
    var tabulate = function (dict) {
        return dict.tabulate;
    };
    var representableArrIdentity = function (_) {
        return new Representable(function (__1) {
            return Data_Profunctor.profunctorArr({});
        }, function (__1) {
            return Control_Monad_Identity.functorIdentity({});
        }, function (d2c) {
            return Prelude[">>>"](Prelude.semigroupoidArr({}))(d2c)(Control_Monad_Identity.Identity.create);
        }, function (d2Ic) {
            return Prelude[">>>"](Prelude.semigroupoidArr({}))(d2Ic)(Control_Monad_Identity.runIdentity);
        });
    };
    var rep = function (dict) {
        return dict.rep;
    };
    var cotabulate = function (dict) {
        return dict.cotabulate;
    };
    var corepresentableArrIdentity = function (_) {
        return new Corepresentable(function (__1) {
            return Data_Profunctor.profunctorArr({});
        }, function (__1) {
            return Control_Monad_Identity.functorIdentity({});
        }, function (d2c) {
            return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(d2c);
        }, function (id2c) {
            return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.Identity.create)(id2c);
        });
    };
    var corep = function (dict) {
        return dict.corep;
    };
    return {
        Corepresentable: Corepresentable, 
        Representable: Representable, 
        corep: corep, 
        cotabulate: cotabulate, 
        rep: rep, 
        tabulate: tabulate, 
        representableArrIdentity: representableArrIdentity, 
        corepresentableArrIdentity: corepresentableArrIdentity
    };
})();
var PS = PS || {};
PS.Control_Monad_Error = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    function Error(noMsg, strMsg) {
        this.noMsg = noMsg;
        this.strMsg = strMsg;
    };
    var strMsg = function (dict) {
        return dict.strMsg;
    };
    var noMsg = function (dict) {
        return dict.noMsg;
    };
    var errorString = function (_) {
        return new Error("", Prelude.id(Prelude.categoryArr({})));
    };
    var errorEitherAlternative = function (__dict_Error_133) {
        return new Prelude.Alternative(function (_325) {
            return function (_326) {
                if (_325 instanceof Data_Either.Left) {
                    return _326;
                };
                return _325;
            };
        }, new Data_Either.Left(noMsg(__dict_Error_133)));
    };
    return {
        Error: Error, 
        strMsg: strMsg, 
        noMsg: noMsg, 
        errorString: errorString, 
        errorEitherAlternative: errorEitherAlternative
    };
})();
var PS = PS || {};
PS.Control_Monad_Error_Trans = (function () {
    "use strict";
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Monad_Error = PS.Control_Monad_Error;
    var ErrorT = {
        create: function (value) {
            return value;
        }
    };
    var runErrorT = function (_327) {
        return _327;
    };
    var monadTransErrorT = function (__dict_Error_134) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_135) {
            return function (m) {
                return ErrorT.create(Prelude[">>="](__dict_Monad_135["__superclass_Prelude.Bind_1"]({}))(m)(function (_14) {
                    return Prelude["return"](__dict_Monad_135)(new Data_Either.Right(_14));
                }));
            };
        });
    };
    var mapErrorT = function (f) {
        return function (m) {
            return ErrorT.create(f(runErrorT(m)));
        };
    };
    var liftPassError = function (__dict_Monad_138) {
        return function (pass) {
            return mapErrorT(function (m) {
                return pass(Prelude[">>="](__dict_Monad_138["__superclass_Prelude.Bind_1"]({}))(m)(function (_16) {
                    return Prelude["return"](__dict_Monad_138)((function (_1096) {
                        if (_1096 instanceof Data_Either.Left) {
                            return new Data_Tuple.Tuple(new Data_Either.Left(_1096.value0), Prelude.id(Prelude.categoryArr({})));
                        };
                        if (_1096 instanceof Data_Either.Right) {
                            return new Data_Tuple.Tuple(new Data_Either.Right(_1096.value0.value0), _1096.value0.value1);
                        };
                        throw new Error("Failed pattern match");
                    })(_16));
                }));
            });
        };
    };
    var liftListenError = function (__dict_Monad_139) {
        return function (listen) {
            return mapErrorT(function (m) {
                return Prelude[">>="](__dict_Monad_139["__superclass_Prelude.Bind_1"]({}))(listen(m))(function (_15) {
                    return Prelude["return"](__dict_Monad_139)(Prelude["<$>"](Data_Either.functorEither({}))(function (r) {
                        return new Data_Tuple.Tuple(r, _15.value1);
                    })(_15.value0));
                });
            });
        };
    };
    var liftCallCCError = function (callCC) {
        return function (f) {
            return ErrorT.create(callCC(function (c) {
                return runErrorT(f(function (a) {
                    return ErrorT.create(c(new Data_Either.Right(a)));
                }));
            }));
        };
    };
    var functorErrorT = function (__dict_Functor_140) {
        return new Prelude.Functor(function (f) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(ErrorT.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"](__dict_Functor_140)(Prelude["<$>"](Data_Either.functorEither({}))(f)))(runErrorT));
        });
    };
    var applyErrorT = function (__dict_Functor_143) {
        return function (__dict_Monad_144) {
            return new Prelude.Apply(function (f) {
                return function (v) {
                    return ErrorT.create(Prelude[">>="](__dict_Monad_144["__superclass_Prelude.Bind_1"]({}))(runErrorT(f))(function (_12) {
                        if (_12 instanceof Data_Either.Left) {
                            return Prelude["return"](__dict_Monad_144)(new Data_Either.Left(_12.value0));
                        };
                        if (_12 instanceof Data_Either.Right) {
                            return Prelude[">>="](__dict_Monad_144["__superclass_Prelude.Bind_1"]({}))(runErrorT(v))(function (_11) {
                                return Prelude["return"](__dict_Monad_144)((function (_1108) {
                                    if (_1108 instanceof Data_Either.Left) {
                                        return new Data_Either.Left(_1108.value0);
                                    };
                                    if (_1108 instanceof Data_Either.Right) {
                                        return new Data_Either.Right(_12.value0(_1108.value0));
                                    };
                                    throw new Error("Failed pattern match");
                                })(_11));
                            });
                        };
                        throw new Error("Failed pattern match");
                    }));
                };
            }, function (_) {
                return functorErrorT(__dict_Functor_143);
            });
        };
    };
    var bindErrorT = function (__dict_Monad_141) {
        return function (__dict_Error_142) {
            return new Prelude.Bind(function (m) {
                return function (f) {
                    return ErrorT.create(Prelude[">>="](__dict_Monad_141["__superclass_Prelude.Bind_1"]({}))(runErrorT(m))(function (_13) {
                        if (_13 instanceof Data_Either.Left) {
                            return Prelude["return"](__dict_Monad_141)(new Data_Either.Left(_13.value0));
                        };
                        if (_13 instanceof Data_Either.Right) {
                            return runErrorT(f(_13.value0));
                        };
                        throw new Error("Failed pattern match");
                    }));
                };
            }, function (_) {
                return applyErrorT(((__dict_Monad_141["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_141);
            });
        };
    };
    var applicativeErrorT = function (__dict_Functor_145) {
        return function (__dict_Monad_146) {
            return new Prelude.Applicative(function (_) {
                return applyErrorT(__dict_Functor_145)(__dict_Monad_146);
            }, function (a) {
                return ErrorT.create(Prelude.pure(__dict_Monad_146["__superclass_Prelude.Applicative_0"]({}))(new Data_Either.Right(a)));
            });
        };
    };
    var monadErrorT = function (__dict_Monad_136) {
        return function (__dict_Error_137) {
            return new Prelude.Monad(function (_) {
                return applicativeErrorT(((__dict_Monad_136["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_136);
            }, function (_) {
                return bindErrorT(__dict_Monad_136)(__dict_Error_137);
            });
        };
    };
    var alternativeErrorT = function (__dict_Monad_147) {
        return function (__dict_Error_148) {
            return new Prelude.Alternative(function (x) {
                return function (y) {
                    return ErrorT.create(Prelude[">>="](__dict_Monad_147["__superclass_Prelude.Bind_1"]({}))(runErrorT(x))(function (e) {
                        if (e instanceof Data_Either.Left) {
                            return runErrorT(y);
                        };
                        return Prelude["return"](__dict_Monad_147)(e);
                    }));
                };
            }, Prelude["return"](__dict_Monad_147)(Data_Either.Left.create(Control_Monad_Error.strMsg(__dict_Error_148)("No alternative"))));
        };
    };
    return {
        ErrorT: ErrorT, 
        liftCallCCError: liftCallCCError, 
        liftPassError: liftPassError, 
        liftListenError: liftListenError, 
        mapErrorT: mapErrorT, 
        runErrorT: runErrorT, 
        functorErrorT: functorErrorT, 
        applyErrorT: applyErrorT, 
        applicativeErrorT: applicativeErrorT, 
        alternativeErrorT: alternativeErrorT, 
        bindErrorT: bindErrorT, 
        monadErrorT: monadErrorT, 
        monadTransErrorT: monadTransErrorT
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function returnE(a) {  return function() {    return a;  };};
    function bindE(a) {  return function(f) {    return function() {      return f(a())();    };  };};
    function runPure(f) {  return f();};
    function untilE(f) {  return function() {    while (!f()) { }    return {};  };};
    function whileE(f) {  return function(a) {    return function() {      while (f()) {        a();      }      return {};    };  };};
    function forE(lo) {  return function(hi) {    return function(f) {      return function() {        for (var i = lo; i < hi; i++) {          f(i)();        }      };    };  };};
    function foreachE(as) {  return function(f) {    return function() {      for (var i = 0; i < as.length; i++) {        f(as[i])();      }    };  };};
    var applicativeEff = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyEff({});
        }, returnE);
    };
    var applyEff = function (_) {
        return new Prelude.Apply(Prelude.ap(monadEff({})), function (__1) {
            return functorEff({});
        });
    };
    var monadEff = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeEff({});
        }, function (__1) {
            return bindEff({});
        });
    };
    var bindEff = function (_) {
        return new Prelude.Bind(bindE, function (__1) {
            return applyEff({});
        });
    };
    var functorEff = function (_) {
        return new Prelude.Functor(Prelude.liftA1(applicativeEff({})));
    };
    return {
        foreachE: foreachE, 
        forE: forE, 
        whileE: whileE, 
        untilE: untilE, 
        runPure: runPure, 
        bindE: bindE, 
        returnE: returnE, 
        functorEff: functorEff, 
        applyEff: applyEff, 
        applicativeEff: applicativeEff, 
        bindEff: bindEff, 
        monadEff: monadEff
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff_Exception = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function showErrorImpl(err) {  return err.stack ? err.stack : err.toString();};
    function error(msg) {  return new Error(msg);};;
    function message(e) {  return e.message;};
    function throwException(e) {  return function() {    throw e;  };};
    function catchException(c) {  return function(t) {    return function() {      try {        return t();      } catch(e) {        if (e instanceof Error) {          return c(e)();        } else {          throw e;        }      }    };  };};
    var showError = function (_) {
        return new Prelude.Show(showErrorImpl);
    };
    return {
        catchException: catchException, 
        throwException: throwException, 
        message: message, 
        error: error, 
        showErrorImpl: showErrorImpl, 
        showError: showError
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff_Unsafe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function unsafeInterleaveEff(f) {  return f;};
    return {
        unsafeInterleaveEff: unsafeInterleaveEff
    };
})();
var PS = PS || {};
PS.Control_Monad_Free = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Data_Function = PS.Data_Function;
    function Pure(value0) {
        this.value0 = value0;
    };
    Pure.create = function (value0) {
        return new Pure(value0);
    };
    function Free(value0) {
        this.value0 = value0;
    };
    Free.create = function (value0) {
        return new Free(value0);
    };
    function Gosub(value0) {
        this.value0 = value0;
    };
    Gosub.create = function (value0) {
        return new Gosub(value0);
    };
    function MonadFree(wrap) {
        this.wrap = wrap;
    };
    function resumeImpl(isGosub, isLeft, toEither, fromRight, resumeGosub, value) {  while (true) {    if (!isGosub(value)) return toEither(value);    var x = resumeGosub(value);    if (isLeft(x)) return x;    else value = fromRight(x);  }};
    function goImpl(resume, isRight, fromLeft, fromRight, fn, value) {  while (true) {    var r = resume(value);    if (isRight(r)) return fromRight(r);    value = fn(fromLeft(r));  }};
    function goEffImpl(resume, isRight, fromLeft, fromRight, fn, value) {  return function(){    while (true) {      var r = resume(value);      if (isRight(r)) {        var x = fromRight(r);        return function() { return x; };      }      value = fn(fromLeft(r))();    }  };};
    var wrap = function (dict) {
        return dict.wrap;
    };
    var unsafeRight = function (_334) {
        if (_334 instanceof Data_Either.Right) {
            return _334.value0;
        };
        throw new Error("Failed pattern match");
    };
    var unsafeLeft = function (_333) {
        if (_333 instanceof Data_Either.Left) {
            return _333.value0;
        };
        throw new Error("Failed pattern match");
    };
    var unsafeFreeToEither = function (_332) {
        if (_332 instanceof Pure) {
            return new Data_Either.Right(_332.value0);
        };
        if (_332 instanceof Free) {
            return new Data_Either.Left(_332.value0);
        };
        throw new Error("Failed pattern match");
    };
    var pureF = function (__dict_Applicative_150) {
        return function (a) {
            return new Free(Prelude.pure(__dict_Applicative_150)(new Pure(a)));
        };
    };
    var monadTransFree = function (_) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_151) {
            return function (f) {
                return Free.create(Prelude[">>="](__dict_Monad_151["__superclass_Prelude.Bind_1"]({}))(f)(function (_17) {
                    return Prelude["return"](__dict_Monad_151)(new Pure(_17));
                }));
            };
        });
    };
    var monadFreeFree = function (__dict_Functor_152) {
        return new MonadFree(Free.create);
    };
    var liftF = function (__dict_Functor_154) {
        return function (__dict_Monad_155) {
            return function (__dict_MonadFree_156) {
                return function (fa) {
                    return wrap(__dict_MonadFree_156)(Prelude["<$>"](__dict_Functor_154)(Prelude["return"](__dict_Monad_155))(fa));
                };
            };
        };
    };
    var iterM = function (__dict_Functor_157) {
        return function (__dict_Monad_158) {
            return function (_328) {
                return function (_329) {
                    if (_329 instanceof Pure) {
                        return Prelude["return"](__dict_Monad_158)(_329.value0);
                    };
                    if (_329 instanceof Free) {
                        return _328(Prelude["<$>"](__dict_Functor_157)(iterM(__dict_Functor_157)(__dict_Monad_158)(_328))(_329.value0));
                    };
                    if (_329 instanceof Gosub) {
                        return _329.value0(function (req) {
                            return function (recv) {
                                return Prelude[">>="](__dict_Monad_158["__superclass_Prelude.Bind_1"]({}))(iterM(__dict_Functor_157)(__dict_Monad_158)(_328)(req(Prelude.unit)))(Prelude["<<<"](Prelude.semigroupoidArr({}))(iterM(__dict_Functor_157)(__dict_Monad_158)(_328))(recv));
                            };
                        });
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    var isGosub = function (_331) {
        if (_331 instanceof Gosub) {
            return true;
        };
        return false;
    };
    var applicativeFree = function (__dict_Functor_167) {
        return new Prelude.Applicative(function (_) {
            return applyFree(__dict_Functor_167);
        }, Pure.create);
    };
    var applyFree = function (__dict_Functor_166) {
        return new Prelude.Apply(Prelude.ap(monadFree(__dict_Functor_166)), function (_) {
            return functorFree(__dict_Functor_166);
        });
    };
    var monadFree = function (__dict_Functor_153) {
        return new Prelude.Monad(function (_) {
            return applicativeFree(__dict_Functor_153);
        }, function (_) {
            return bindFree(__dict_Functor_153);
        });
    };
    var bindFree = function (__dict_Functor_165) {
        return new Prelude.Bind(function (_337) {
            return function (_338) {
                if (_337 instanceof Gosub) {
                    return new Gosub(function (h) {
                        return _337.value0(function (a) {
                            return function (i) {
                                return h(a)(function (x) {
                                    return new Gosub(function (j) {
                                        return j(Prelude["const"](i(x)))(_338);
                                    });
                                });
                            };
                        });
                    });
                };
                return new Gosub(function (h) {
                    return h(Prelude["const"](_337))(_338);
                });
            };
        }, function (_) {
            return applyFree(__dict_Functor_165);
        });
    };
    var functorFree = function (__dict_Functor_164) {
        return new Prelude.Functor(function (_335) {
            return function (_336) {
                if (_336 instanceof Pure) {
                    return new Pure(_335(_336.value0));
                };
                return Prelude.liftA1(applicativeFree(__dict_Functor_164))(_335)(_336);
            };
        });
    };
    var resumeGosub = function (__dict_Functor_149) {
        return function (_330) {
            if (_330 instanceof Gosub) {
                return _330.value0(function (a) {
                    return function (g) {
                        return (function (_1140) {
                            if (_1140 instanceof Pure) {
                                return new Data_Either.Right(g(_1140.value0));
                            };
                            if (_1140 instanceof Free) {
                                return new Data_Either.Left(Prelude["<$>"](__dict_Functor_149)(function (h) {
                                    return Prelude[">>="](bindFree(__dict_Functor_149))(h)(g);
                                })(_1140.value0));
                            };
                            if (_1140 instanceof Gosub) {
                                return new Data_Either.Right(_1140.value0(function (b) {
                                    return function (i) {
                                        return Prelude[">>="](bindFree(__dict_Functor_149))(b(Prelude.unit))(function (x) {
                                            return Prelude[">>="](bindFree(__dict_Functor_149))(i(x))(g);
                                        });
                                    };
                                }));
                            };
                            throw new Error("Failed pattern match");
                        })(a(Prelude.unit));
                    };
                });
            };
            throw new Error("Failed pattern match");
        };
    };
    var resume = function (__dict_Functor_159) {
        return function (f) {
            return resumeImpl(isGosub, Data_Either.isLeft, unsafeFreeToEither, unsafeRight, resumeGosub(__dict_Functor_159), f);
        };
    };
    var go = function (__dict_Functor_163) {
        return function (fn) {
            return function (f) {
                return goImpl(resume(__dict_Functor_163), Data_Either.isRight, unsafeLeft, unsafeRight, fn, f);
            };
        };
    };
    var goEff = function (__dict_Functor_162) {
        return function (fn) {
            return function (f) {
                return goEffImpl(resume(__dict_Functor_162), Data_Either.isRight, unsafeLeft, unsafeRight, fn, f);
            };
        };
    };
    var goM = function (__dict_Functor_160) {
        return function (__dict_Monad_161) {
            return function (k) {
                return function (f) {
                    return (function (_1145) {
                        if (_1145 instanceof Data_Either.Left) {
                            return Prelude[">>="](__dict_Monad_161["__superclass_Prelude.Bind_1"]({}))(k(_1145.value0))(goM(__dict_Functor_160)(__dict_Monad_161)(k));
                        };
                        if (_1145 instanceof Data_Either.Right) {
                            return Prelude["return"](__dict_Monad_161)(_1145.value0);
                        };
                        throw new Error("Failed pattern match");
                    })(resume(__dict_Functor_160)(f));
                };
            };
        };
    };
    return {
        Pure: Pure, 
        Free: Free, 
        Gosub: Gosub, 
        MonadFree: MonadFree, 
        goEff: goEff, 
        go: go, 
        goM: goM, 
        iterM: iterM, 
        pureF: pureF, 
        liftF: liftF, 
        wrap: wrap, 
        functorFree: functorFree, 
        applyFree: applyFree, 
        applicativeFree: applicativeFree, 
        bindFree: bindFree, 
        monadFree: monadFree, 
        monadTransFree: monadTransFree, 
        monadFreeFree: monadFreeFree
    };
})();
var PS = PS || {};
PS.Control_Monad_Trampoline = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Free = PS.Control_Monad_Free;
    var Delay = {
        create: function (value) {
            return value;
        }
    };
    var suspend = function (a) {
        return new Control_Monad_Free.Free(Prelude["const"](a));
    };
    var done = Control_Monad_Free.Pure.create;
    var delayFunctor = function (_) {
        return new Prelude.Functor(function (_340) {
            return function (_341) {
                return Prelude["const"](_340(_341(Prelude.unit)));
            };
        });
    };
    var runTrampoline = Control_Monad_Free.go(delayFunctor({}))(function (_339) {
        return _339(Prelude.unit);
    });
    var delayApply = function (_) {
        return new Prelude.Apply(function (_342) {
            return function (_343) {
                return function (__1) {
                    return _342(Prelude.unit)(_343(Prelude.unit));
                };
            };
        }, function (__1) {
            return delayFunctor({});
        });
    };
    var delayApplicative = function (_) {
        return new Prelude.Applicative(function (__1) {
            return delayApply({});
        }, function (a) {
            return Prelude["const"](a);
        });
    };
    var delay = function (a) {
        return new Control_Monad_Free.Free(Prelude["<$>"](delayFunctor({}))(done)(a));
    };
    return {
        Delay: Delay, 
        runTrampoline: runTrampoline, 
        delay: delay, 
        suspend: suspend, 
        done: done, 
        delayFunctor: delayFunctor, 
        delayApply: delayApply, 
        delayApplicative: delayApplicative
    };
})();
var PS = PS || {};
PS.Control_Monad_ST = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function newSTRef(val) {  return function () {    return { value: val };  };};
    function readSTRef(ref) {  return function() {    return ref.value;  };};
    function modifySTRef(ref) {  return function(f) {    return function() {      return ref.value = f(ref.value);    };  };};
    function writeSTRef(ref) {  return function(a) {    return function() {      return ref.value = a;    };  };};
    function newSTArray(len) {  return function(a) {    return function() {      var arr = [];      for (var i = 0; i < len; i++) {        arr[i] = a;      };      return arr;    };  };};
    function peekSTArray(arr) {  return function(i) {    return function() {      return arr[i];    };  };};
    function pokeSTArray(arr) {  return function(i) {    return function(a) {      return function() {        return arr[i] = a;      };    };  };};
    function runST(f) {  return f;};
    function runSTArray(f) {  return f;};
    return {
        runSTArray: runSTArray, 
        runST: runST, 
        pokeSTArray: pokeSTArray, 
        peekSTArray: peekSTArray, 
        newSTArray: newSTArray, 
        writeSTRef: writeSTRef, 
        modifySTRef: modifySTRef, 
        readSTRef: readSTRef, 
        newSTRef: newSTRef
    };
})();
var PS = PS || {};
PS.Data_Date = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Global = PS.Global;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Enum = PS.Data_Enum;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    function January() {

    };
    January.value = new January();
    function February() {

    };
    February.value = new February();
    function March() {

    };
    March.value = new March();
    function April() {

    };
    April.value = new April();
    function May() {

    };
    May.value = new May();
    function June() {

    };
    June.value = new June();
    function July() {

    };
    July.value = new July();
    function August() {

    };
    August.value = new August();
    function September() {

    };
    September.value = new September();
    function October() {

    };
    October.value = new October();
    function November() {

    };
    November.value = new November();
    function December() {

    };
    December.value = new December();
    function Sunday() {

    };
    Sunday.value = new Sunday();
    function Monday() {

    };
    Monday.value = new Monday();
    function Tuesday() {

    };
    Tuesday.value = new Tuesday();
    function Wednesday() {

    };
    Wednesday.value = new Wednesday();
    function Thursday() {

    };
    Thursday.value = new Thursday();
    function Friday() {

    };
    Friday.value = new Friday();
    function Saturday() {

    };
    Saturday.value = new Saturday();
    function DateTime(value0) {
        this.value0 = value0;
    };
    DateTime.create = function (value0) {
        return new DateTime(value0);
    };
    function jsDateMethod(method) {   return function(date) {     return date[method]();   }; };
    function jsDateConstructor(x) {   return new Date(x); };
    function jsDateFromRecord(r) {  return new Date(r.year, r.month, r.day, r.hours, r.minutes, r.seconds, r.milliseconds); };
    function nowImpl(f) {   return f(new Date()); };
    var toJSDate = function (_344) {
        return _344.value0;
    };
    var showMonth = function (_) {
        return new Prelude.Show(function (_349) {
            if (_349 instanceof January) {
                return "January";
            };
            if (_349 instanceof February) {
                return "February";
            };
            if (_349 instanceof March) {
                return "March";
            };
            if (_349 instanceof April) {
                return "April";
            };
            if (_349 instanceof May) {
                return "May";
            };
            if (_349 instanceof June) {
                return "June";
            };
            if (_349 instanceof July) {
                return "July";
            };
            if (_349 instanceof August) {
                return "August";
            };
            if (_349 instanceof September) {
                return "September";
            };
            if (_349 instanceof October) {
                return "October";
            };
            if (_349 instanceof November) {
                return "November";
            };
            if (_349 instanceof December) {
                return "December";
            };
            throw new Error("Failed pattern match");
        });
    };
    var showDayOfWeek = function (_) {
        return new Prelude.Show(function (_352) {
            if (_352 instanceof Sunday) {
                return "Sunday";
            };
            if (_352 instanceof Monday) {
                return "Monday";
            };
            if (_352 instanceof Tuesday) {
                return "Tuesday";
            };
            if (_352 instanceof Wednesday) {
                return "Wednesday";
            };
            if (_352 instanceof Thursday) {
                return "Thursday";
            };
            if (_352 instanceof Friday) {
                return "Friday";
            };
            if (_352 instanceof Saturday) {
                return "Saturday";
            };
            throw new Error("Failed pattern match");
        });
    };
    var now = nowImpl(DateTime.create);
    var liftDate = function (_345) {
        return function (_346) {
            return _345(_346.value0);
        };
    };
    var millisecond = liftDate(jsDateMethod("getMilliseconds"));
    var millisecondUTC = liftDate(jsDateMethod("getUTCMilliseconds"));
    var minute = liftDate(jsDateMethod("getMinutes"));
    var minuteUTC = liftDate(jsDateMethod("getUTCMinutes"));
    var second = liftDate(jsDateMethod("getSeconds"));
    var secondUTC = liftDate(jsDateMethod("getUTCSeconds"));
    var showDate = function (_) {
        return new Prelude.Show(liftDate(jsDateMethod("toString")));
    };
    var timezoneOffset = liftDate(jsDateMethod("getTimezoneOffset"));
    var toEpochMilliseconds = liftDate(jsDateMethod("getTime"));
    var liftOp = function (op) {
        return function (x) {
            return function (y) {
                return op(toEpochMilliseconds(x))(toEpochMilliseconds(y));
            };
        };
    };
    var year = liftDate(jsDateMethod("getFullYear"));
    var yearUTC = liftDate(jsDateMethod("getUTCFullYear"));
    var hourUTC = liftDate(jsDateMethod("getUTCHours"));
    var hour = liftDate(jsDateMethod("getHours"));
    var fromJSDate = function (d) {
        return Global.isNaN(jsDateMethod("getTime")(d)) ? Data_Maybe.Nothing.value : Data_Maybe.Just.create(new DateTime(d));
    };
    var fromString = Prelude["<<<"](Prelude.semigroupoidArr({}))(fromJSDate)(jsDateConstructor);
    var fromEpochMilliseconds = Prelude["<<<"](Prelude.semigroupoidArr({}))(fromJSDate)(jsDateConstructor);
    var eqDate = function (_) {
        return new Prelude.Eq(liftOp(Prelude["/="](Prelude.eqNumber({}))), liftOp(Prelude["=="](Prelude.eqNumber({}))));
    };
    var ordDate = function (_) {
        return new Prelude.Ord(function (__1) {
            return eqDate({});
        }, liftOp(Prelude.compare(Prelude.ordNumber({}))));
    };
    var enumMonth = function (_) {
        return new Data_Enum.Enum(function (_348) {
            if (_348 instanceof January) {
                return 0;
            };
            if (_348 instanceof February) {
                return 1;
            };
            if (_348 instanceof March) {
                return 2;
            };
            if (_348 instanceof April) {
                return 3;
            };
            if (_348 instanceof May) {
                return 4;
            };
            if (_348 instanceof June) {
                return 5;
            };
            if (_348 instanceof July) {
                return 6;
            };
            if (_348 instanceof August) {
                return 7;
            };
            if (_348 instanceof September) {
                return 8;
            };
            if (_348 instanceof October) {
                return 9;
            };
            if (_348 instanceof November) {
                return 10;
            };
            if (_348 instanceof December) {
                return 11;
            };
            throw new Error("Failed pattern match");
        }, function (_347) {
            if (_347 === 0) {
                return new Data_Maybe.Just(January.value);
            };
            if (_347 === 1) {
                return new Data_Maybe.Just(February.value);
            };
            if (_347 === 2) {
                return new Data_Maybe.Just(March.value);
            };
            if (_347 === 3) {
                return new Data_Maybe.Just(April.value);
            };
            if (_347 === 4) {
                return new Data_Maybe.Just(May.value);
            };
            if (_347 === 5) {
                return new Data_Maybe.Just(June.value);
            };
            if (_347 === 6) {
                return new Data_Maybe.Just(July.value);
            };
            if (_347 === 7) {
                return new Data_Maybe.Just(August.value);
            };
            if (_347 === 8) {
                return new Data_Maybe.Just(September.value);
            };
            if (_347 === 8) {
                return new Data_Maybe.Just(October.value);
            };
            if (_347 === 10) {
                return new Data_Maybe.Just(November.value);
            };
            if (_347 === 11) {
                return new Data_Maybe.Just(December.value);
            };
            return Data_Maybe.Nothing.value;
        });
    };
    var month = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Enum.toEnum(enumMonth({})))(liftDate(jsDateMethod("getMonth"))));
    var monthUTC = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Enum.toEnum(enumMonth({})))(liftDate(jsDateMethod("getUTCMonth"))));
    var enumDayOfWeek = function (_) {
        return new Data_Enum.Enum(function (_351) {
            if (_351 instanceof Sunday) {
                return 0;
            };
            if (_351 instanceof Monday) {
                return 1;
            };
            if (_351 instanceof Tuesday) {
                return 2;
            };
            if (_351 instanceof Wednesday) {
                return 3;
            };
            if (_351 instanceof Thursday) {
                return 4;
            };
            if (_351 instanceof Friday) {
                return 5;
            };
            if (_351 instanceof Saturday) {
                return 6;
            };
            throw new Error("Failed pattern match");
        }, function (_350) {
            if (_350 === 0) {
                return new Data_Maybe.Just(Sunday.value);
            };
            if (_350 === 1) {
                return new Data_Maybe.Just(Monday.value);
            };
            if (_350 === 2) {
                return new Data_Maybe.Just(Tuesday.value);
            };
            if (_350 === 3) {
                return new Data_Maybe.Just(Wednesday.value);
            };
            if (_350 === 4) {
                return new Data_Maybe.Just(Thursday.value);
            };
            if (_350 === 5) {
                return new Data_Maybe.Just(Friday.value);
            };
            if (_350 === 6) {
                return new Data_Maybe.Just(Saturday.value);
            };
            return Data_Maybe.Nothing.value;
        });
    };
    var dayUTC = liftDate(jsDateMethod("getUTCDate"));
    var dayOfWeekUTC = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Enum.toEnum(enumDayOfWeek({})))(liftDate(jsDateMethod("getUTCDay"))));
    var dayOfWeek = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Enum.toEnum(enumDayOfWeek({})))(liftDate(jsDateMethod("getDay"))));
    var day = liftDate(jsDateMethod("getDate"));
    var dateTime = function (y) {
        return function (m) {
            return function (d) {
                return function (h) {
                    return function (n) {
                        return function (s) {
                            return function (ms) {
                                return fromJSDate(jsDateFromRecord({
                                    year: y, 
                                    month: Data_Enum.fromEnum(enumMonth({}))(m), 
                                    day: d, 
                                    hours: h, 
                                    minutes: n, 
                                    seconds: s, 
                                    milliseconds: ms
                                }));
                            };
                        };
                    };
                };
            };
        };
    };
    var date = function (y) {
        return function (m) {
            return function (d) {
                return dateTime(y)(m)(d)(0)(0)(0)(0);
            };
        };
    };
    return {
        January: January, 
        February: February, 
        March: March, 
        April: April, 
        May: May, 
        June: June, 
        July: July, 
        August: August, 
        September: September, 
        October: October, 
        November: November, 
        December: December, 
        fromString: fromString, 
        fromEpochMilliseconds: fromEpochMilliseconds, 
        toEpochMilliseconds: toEpochMilliseconds, 
        timezoneOffset: timezoneOffset, 
        millisecondUTC: millisecondUTC, 
        millisecond: millisecond, 
        secondUTC: secondUTC, 
        second: second, 
        minuteUTC: minuteUTC, 
        minute: minute, 
        hourUTC: hourUTC, 
        hour: hour, 
        dayOfWeekUTC: dayOfWeekUTC, 
        dayOfWeek: dayOfWeek, 
        dayUTC: dayUTC, 
        day: day, 
        monthUTC: monthUTC, 
        month: month, 
        yearUTC: yearUTC, 
        year: year, 
        date: date, 
        dateTime: dateTime, 
        now: now, 
        toJSDate: toJSDate, 
        fromJSDate: fromJSDate, 
        eqDate: eqDate, 
        ordDate: ordDate, 
        enumMonth: enumMonth, 
        showMonth: showMonth, 
        enumDayOfWeek: enumDayOfWeek, 
        showDayOfWeek: showDayOfWeek, 
        showDate: showDate
    };
})();
var PS = PS || {};
PS.Node_FS_Stats = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var Data_Date = PS.Data_Date;
    var Data_Function = PS.Data_Function;
    function Stats(value0) {
        this.value0 = value0;
    };
    Stats.create = function (value0) {
        return new Stats(value0);
    };
    function showStatsObj (obj) {  return require('util').inspect(obj);};
    function statsMethod(m, s) {  return s[m]();};
    var statusChangedTime = function (_362) {
        return Data_Maybe_Unsafe.fromJust(Data_Date.fromJSDate(_362.value0.ctime));
    };
    var showStats = function (_) {
        return new Prelude.Show(function (_363) {
            return "Stats " + showStatsObj(_363.value0);
        });
    };
    var modifiedTime = function (_361) {
        return Data_Maybe_Unsafe.fromJust(Data_Date.fromJSDate(_361.value0.mtime));
    };
    var isSymbolicLink = function (_359) {
        return statsMethod("isSymbolicLink", _359.value0);
    };
    var isSocket = function (_358) {
        return statsMethod("isSocket", _358.value0);
    };
    var isFile = function (_353) {
        return statsMethod("isFile", _353.value0);
    };
    var isFIFO = function (_357) {
        return statsMethod("isFIFO", _357.value0);
    };
    var isDirectory = function (_354) {
        return statsMethod("isDirectory", _354.value0);
    };
    var isCharacterDevice = function (_356) {
        return statsMethod("isCharacterDevice", _356.value0);
    };
    var isBlockDevice = function (_355) {
        return statsMethod("isBlockDevice", _355.value0);
    };
    var accessedTime = function (_360) {
        return Data_Maybe_Unsafe.fromJust(Data_Date.fromJSDate(_360.value0.atime));
    };
    return {
        Stats: Stats, 
        statusChangedTime: statusChangedTime, 
        modifiedTime: modifiedTime, 
        accessedTime: accessedTime, 
        isSymbolicLink: isSymbolicLink, 
        isSocket: isSocket, 
        isFIFO: isFIFO, 
        isCharacterDevice: isCharacterDevice, 
        isBlockDevice: isBlockDevice, 
        isDirectory: isDirectory, 
        isFile: isFile, 
        showStats: showStats
    };
})();
var PS = PS || {};
PS.Debug_Trace = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function trace(s) {  return function() {    console.log(s);    return {};  };};
    var print = function (__dict_Show_168) {
        return function (o) {
            return trace(Prelude.show(__dict_Show_168)(o));
        };
    };
    return {
        print: print, 
        trace: trace
    };
})();
var PS = PS || {};
PS.Graphics_C3 = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function YDim() {

    };
    YDim.value = new YDim();
    function XDim() {

    };
    XDim.value = new XDim();
    function Bar() {

    };
    Bar.value = new Bar();
    function Line() {

    };
    Line.value = new Line();
    function Pie() {

    };
    Pie.value = new Pie();
    function Axis(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    Axis.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new Axis(value0, value1, value2);
            };
        };
    };
    function generate(opts) {  return function() {    return c3.generate(actualOptions(opts));  }};
    function actualOptions(opts) {  var obj = {};  obj.bindto = opts.bindto;  obj.data = {    columns: opts.c3Data.map(function(d) {      return [d.name].concat(d.values);    }),    types: c3Types(opts)  };  if (axisName(opts.xAxis) !== '') {    obj = insertAxis(obj)(opts.xAxis);  }  if (axisName(opts.yAxis) !== '') {    obj = insertAxis(obj)(opts.yAxis);  }  return obj;};
    function insertAxis(opts) {  return function(axis) {    var xData = axisData(axis);    opts.data.x = axisName(axis);    opts.data.columns.unshift([opts.data.x].concat(xData));    opts.axis = opts.axis || {};    opts.axis.x = {      type: 'category',      tick: {        format: function(i) {          return xData[i];        }      }    };    return opts;  }};
    function c3Types(opts) {  var obj = {};  opts.c3Data.forEach(function(d) {    obj[d.name] = showC3Type_(d.c3Type);  });  return obj;};
    var yAxis = Axis.create("y");
    var xAxis = Axis.create("x");
    var showC3Type = function (_) {
        return new Prelude.Show(function (_366) {
            if (_366 instanceof Bar) {
                return "bar";
            };
            if (_366 instanceof Line) {
                return "line";
            };
            if (_366 instanceof Pie) {
                return "pie";
            };
            throw new Error("Failed pattern match");
        });
    };
    var showC3Type_ = Prelude.show(showC3Type({}));
    var options = {
        bindto: "", 
        c3Data: [  ], 
        xAxis: xAxis("")([  ]), 
        yAxis: yAxis("")([  ])
    };
    var eqC3Type = function (_) {
        return new Prelude.Eq(function (t) {
            return function (t$prime) {
                return !Prelude["=="](eqC3Type({}))(t)(t$prime);
            };
        }, function (_367) {
            return function (_368) {
                if (_367 instanceof Bar && _368 instanceof Bar) {
                    return true;
                };
                if (_367 instanceof Line && _368 instanceof Line) {
                    return true;
                };
                if (_367 instanceof Pie && _368 instanceof Pie) {
                    return true;
                };
                return false;
            };
        });
    };
    var c3Data = {
        c3Type: Bar.value, 
        name: "", 
        values: [  ]
    };
    var axisName = function (_364) {
        return _364.value1;
    };
    var axisData = function (_365) {
        return _365.value2;
    };
    return {
        Bar: Bar, 
        Line: Line, 
        Pie: Pie, 
        yAxis: yAxis, 
        xAxis: xAxis, 
        options: options, 
        c3Data: c3Data, 
        generate: generate, 
        showC3Type: showC3Type, 
        eqC3Type: eqC3Type
    };
})();
var PS = PS || {};
PS.Node_Buffer = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Node_Encoding = PS.Node_Encoding;
    function UInt8() {

    };
    UInt8.value = new UInt8();
    function UInt16LE() {

    };
    UInt16LE.value = new UInt16LE();
    function UInt16BE() {

    };
    UInt16BE.value = new UInt16BE();
    function UInt32LE() {

    };
    UInt32LE.value = new UInt32LE();
    function UInt32BE() {

    };
    UInt32BE.value = new UInt32BE();
    function Int8() {

    };
    Int8.value = new Int8();
    function Int16LE() {

    };
    Int16LE.value = new Int16LE();
    function Int16BE() {

    };
    Int16BE.value = new Int16BE();
    function Int32LE() {

    };
    Int32LE.value = new Int32LE();
    function Int32BE() {

    };
    Int32BE.value = new Int32BE();
    function FloatLE() {

    };
    FloatLE.value = new FloatLE();
    function FloatBE() {

    };
    FloatBE.value = new FloatBE();
    function DoubleLE() {

    };
    DoubleLE.value = new DoubleLE();
    function DoubleBE() {

    };
    DoubleBE.value = new DoubleBE();
    var showImpl = require('util').inspect;;
    function create (size) {   return new Buffer(size); };
    function fromArray (octets) {   return new Buffer(octets); };
    function fromStringImpl (str) {   return function (encoding) {     return new Buffer(str, encoding);   }; };
    function readImpl (ty) {   return function (offset) {     return function (buf) {       return buf['read' + ty](offset);     };   }; };
    function readStringImpl (enc) {   return function (start) {     return function (end) {       return function (buff) {         return buff.toString(enc, start, end);       }     }   } };
    function toStringImpl (enc) {   return function (buff) {     return buff.toString(enc);   } };
    function writeImpl (ty) {   return function (value) {     return function (offset) {       return function (buf) {         buf['write' + ty](value, offset);         return {};       };     };   }; };
    function writeStringImpl (enc) {   return function (offset) {       return function (length) {         return function (value) {           return function (buff) {             return buff.write(value, offset, length, encoding);           };         };       };   }; };
    function toArray (buff) {   return buff.toJSON(); };
    function getAtOffset (buff) {   return function (offset) {     var octet = buff[offset];     return octet == null ? _ps.Data_Maybe.Nothing                          : _ps.Data_Maybe.Just(buff[i]);   } };
    function setAtOffset (value) {   return function (offset) {     return function (buff) {       buff[offset] = value;       return {};     }   } };
    function size (buff) {   return buff.length; };
    function concat (buffs) {   return Buffer.concat(buffs); };
    function concat$prime (buffs) {   return function (totalLength) {     return Buffer.concat(buffs, totalLength);   } };
    function copy (srcStart) {   return function (srcEnd) {     return function (src) {       return function (targStart) {         return function (targ) {           return src.copy(targ, targStart, srcStart, strcEnd);         }       }     }   } };
    function fill (buff) {   return function (octet) {     return function (start) {       return function (end) {         buff.fill(octet, start, end);         return {};       }     }   } };
    var writeString = Prelude["<<<"](Prelude.semigroupoidArr({}))(writeStringImpl)(Prelude.show(Node_Encoding.showEncoding({})));
    var toString = Prelude["<<<"](Prelude.semigroupoidArr({}))(toStringImpl)(Prelude.show(Node_Encoding.showEncoding({})));
    var showBufferValueType = function (_) {
        return new Prelude.Show(function (_369) {
            if (_369 instanceof UInt8) {
                return "UInt8";
            };
            if (_369 instanceof UInt16LE) {
                return "UInt16LE";
            };
            if (_369 instanceof UInt16BE) {
                return "UInt16BE";
            };
            if (_369 instanceof UInt32LE) {
                return "UInt32LE";
            };
            if (_369 instanceof UInt32BE) {
                return "UInt32BE";
            };
            if (_369 instanceof Int8) {
                return "Int8";
            };
            if (_369 instanceof Int16LE) {
                return "Int16LE";
            };
            if (_369 instanceof Int16BE) {
                return "Int16BE";
            };
            if (_369 instanceof Int32LE) {
                return "Int32LE";
            };
            if (_369 instanceof Int32BE) {
                return "Int32BE";
            };
            if (_369 instanceof FloatLE) {
                return "FloatLE";
            };
            if (_369 instanceof FloatBE) {
                return "FloatBE";
            };
            if (_369 instanceof DoubleLE) {
                return "DoubleLE";
            };
            if (_369 instanceof DoubleBE) {
                return "DoubleBE";
            };
            throw new Error("Failed pattern match");
        });
    };
    var write = Prelude["<<<"](Prelude.semigroupoidArr({}))(writeImpl)(Prelude.show(showBufferValueType({})));
    var showBuffer = function (_) {
        return new Prelude.Show(showImpl);
    };
    var readString = Prelude["<<<"](Prelude.semigroupoidArr({}))(readStringImpl)(Prelude.show(Node_Encoding.showEncoding({})));
    var read = Prelude["<<<"](Prelude.semigroupoidArr({}))(readImpl)(Prelude.show(showBufferValueType({})));
    var fromString = function (str) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(fromStringImpl(str))(Prelude.show(Node_Encoding.showEncoding({})));
    };
    return {
        UInt8: UInt8, 
        UInt16LE: UInt16LE, 
        UInt16BE: UInt16BE, 
        UInt32LE: UInt32LE, 
        UInt32BE: UInt32BE, 
        Int8: Int8, 
        Int16LE: Int16LE, 
        Int16BE: Int16BE, 
        Int32LE: Int32LE, 
        Int32BE: Int32BE, 
        FloatLE: FloatLE, 
        FloatBE: FloatBE, 
        DoubleLE: DoubleLE, 
        DoubleBE: DoubleBE, 
        fill: fill, 
        copy: copy, 
        "concat'": concat$prime, 
        concat: concat, 
        size: size, 
        setAtOffset: setAtOffset, 
        getAtOffset: getAtOffset, 
        toArray: toArray, 
        writeString: writeString, 
        write: write, 
        toString: toString, 
        readString: readString, 
        read: read, 
        fromString: fromString, 
        fromArray: fromArray, 
        create: create, 
        showBuffer: showBuffer, 
        showBufferValueType: showBufferValueType
    };
})();
var PS = PS || {};
PS.Node_Buffer_Unsafe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function slice (start) {   return function (end) {     return function (buff) {       return buff.slice(start, end);     }   } };
    return {
        slice: slice
    };
})();
var PS = PS || {};
PS.Node_Events = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Event = {
        create: function (value) {
            return value;
        }
    };
    function EventEmitter() {

    };
    function Variadic() {

    };
    function emitter () {  var EE = require('events').EventEmitter;  return new EE()};
    function emitterHelper1(__dict) {  return function(method) {    return function(event) {      return function(emitter) {        return function() {          return emitter[method](event);        }      }    }  }};
    function emitterHelper2(__emitter) {  return function(__variadic) {    return function(method) {      return function(event) {        return function(cb) {          return function(emitter) {            return function() {              return emitter[method](event, function() {                return cb.apply(this, arguments)();              }.bind(this));            }          }        }      }    }  }};
    var variadicFn9 = function (_) {
        return new Variadic();
    };
    var variadicFn8 = function (_) {
        return new Variadic();
    };
    var variadicFn7 = function (_) {
        return new Variadic();
    };
    var variadicFn6 = function (_) {
        return new Variadic();
    };
    var variadicFn5 = function (_) {
        return new Variadic();
    };
    var variadicFn4 = function (_) {
        return new Variadic();
    };
    var variadicFn3 = function (_) {
        return new Variadic();
    };
    var variadicFn2 = function (_) {
        return new Variadic();
    };
    var variadicFn10 = function (_) {
        return new Variadic();
    };
    var variadicFn1 = function (_) {
        return new Variadic();
    };
    var variadicFn0 = function (_) {
        return new Variadic();
    };
    var variadicArr = function (_) {
        return new Variadic();
    };
    var setMaxListeners = function (__dict_EventEmitter_169) {
        return emitterHelper1(__dict_EventEmitter_169)("setMaxListeners");
    };
    var removeListenerEvent = "removeListener";
    var removeListener = function (__dict_EventEmitter_170) {
        return function (__dict_Variadic_171) {
            return emitterHelper2(__dict_EventEmitter_170)(__dict_Variadic_171)("removeListener");
        };
    };
    var removeAllListeners = function (__dict_EventEmitter_172) {
        return emitterHelper1(__dict_EventEmitter_172)("removeAllListeners");
    };
    var once = function (__dict_EventEmitter_173) {
        return function (__dict_Variadic_174) {
            return emitterHelper2(__dict_EventEmitter_173)(__dict_Variadic_174)("once");
        };
    };
    var on = function (__dict_EventEmitter_175) {
        return function (__dict_Variadic_176) {
            return emitterHelper2(__dict_EventEmitter_175)(__dict_Variadic_176)("on");
        };
    };
    var newListenerEvent = "newListener";
    var listeners = function (__dict_EventEmitter_177) {
        return emitterHelper1(__dict_EventEmitter_177)("listeners");
    };
    var eventEmitterEmitter = function (_) {
        return new EventEmitter();
    };
    var addListener = function (__dict_EventEmitter_178) {
        return function (__dict_Variadic_179) {
            return emitterHelper2(__dict_EventEmitter_178)(__dict_Variadic_179)("addListener");
        };
    };
    return {
        Event: Event, 
        Variadic: Variadic, 
        EventEmitter: EventEmitter, 
        removeListenerEvent: removeListenerEvent, 
        newListenerEvent: newListenerEvent, 
        setMaxListeners: setMaxListeners, 
        removeListener: removeListener, 
        removeAllListeners: removeAllListeners, 
        once: once, 
        on: on, 
        listeners: listeners, 
        addListener: addListener, 
        emitter: emitter, 
        eventEmitterEmitter: eventEmitterEmitter, 
        variadicArr: variadicArr, 
        variadicFn0: variadicFn0, 
        variadicFn1: variadicFn1, 
        variadicFn2: variadicFn2, 
        variadicFn3: variadicFn3, 
        variadicFn4: variadicFn4, 
        variadicFn5: variadicFn5, 
        variadicFn6: variadicFn6, 
        variadicFn7: variadicFn7, 
        variadicFn8: variadicFn8, 
        variadicFn9: variadicFn9, 
        variadicFn10: variadicFn10
    };
})();
var PS = PS || {};
PS.Node_ChildProcess = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Node_Events = PS.Node_Events;
    var ChildProcess = {
        create: function (value) {
            return value;
        }
    };
    function spawn(command) {  return function(args) {    return function(opts) {      return function() {        return require('child_process').spawn(command, args, opts);      }    }  }};
    var messageEvent = "message";
    var exitEvent = "exit";
    var eventEmitterStreamStdout = function (_) {
        return new Node_Events.EventEmitter();
    };
    var eventEmitterStreamStdin = function (_) {
        return new Node_Events.EventEmitter();
    };
    var eventEmitterStreamStderr = function (_) {
        return new Node_Events.EventEmitter();
    };
    var eventEmitterChildProcess = function (_) {
        return new Node_Events.EventEmitter();
    };
    var errorEvent = "error";
    var disconnectEvent = "disconnect";
    var defaultSpawnOptions = {
        cwd: undefined, 
        stdio: [ "pipe", "pipe", "pipe" ], 
        env: process.env, 
        detached: false, 
        uid: undefined, 
        gid: undefined
    };
    var closeEvent = "close";
    return {
        ChildProcess: ChildProcess, 
        process: process, 
        undefined: undefined, 
        defaultSpawnOptions: defaultSpawnOptions, 
        spawn: spawn, 
        messageEvent: messageEvent, 
        exitEvent: exitEvent, 
        errorEvent: errorEvent, 
        disconnectEvent: disconnectEvent, 
        closeEvent: closeEvent, 
        eventEmitterStreamStderr: eventEmitterStreamStderr, 
        eventEmitterStreamStdin: eventEmitterStreamStdin, 
        eventEmitterStreamStdout: eventEmitterStreamStdout, 
        eventEmitterChildProcess: eventEmitterChildProcess
    };
})();
var PS = PS || {};
PS.Node_FS_Sync = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Data_Function = PS.Data_Function;
    var Node_Encoding = PS.Node_Encoding;
    var Data_Date = PS.Data_Date;
    var Node_FS = PS.Node_FS;
    var Node_FS_Stats = PS.Node_FS_Stats;
    var fs = require('fs');;
    function mkFSAction(fail) {  return function (success) {    return function (f) {      return function () {        try {          return success(f());        } catch (e) {          return fail(e);        }      };    };  };};
    var writeTextFile = function (encoding) {
        return function (file) {
            return function (buff) {
                return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                    return fs.writeFileSync(file, buff, {
                        encoding: Prelude.show(Node_Encoding.showEncoding({}))(encoding)
                    });
                });
            };
        };
    };
    var writeFile = function (file) {
        return function (buff) {
            return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                return fs.writeFileSync(file, buff, {});
            });
        };
    };
    var utimes = function (file) {
        return function (atime) {
            return function (mtime) {
                return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                    return fs.utimesSync(file, Data_Date.toEpochMilliseconds(atime) / 1000, Data_Date.toEpochMilliseconds(mtime) / 1000);
                });
            };
        };
    };
    var unlink = function (file) {
        return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
            return fs.unlinkSync(file);
        });
    };
    var truncate = function (file) {
        return function (len) {
            return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                return fs.truncateSync(file, len);
            });
        };
    };
    var symlink = function (src) {
        return function (dst) {
            return function (ty) {
                return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                    return fs.symlinkSync(src, dst, Prelude.show(Node_FS.showSymlinkType({}))(ty));
                });
            };
        };
    };
    var stat = function (file) {
        return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
            return Node_FS_Stats.Stats.create(fs.statSync(file));
        });
    };
    var rmdir = function (file) {
        return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
            return fs.rmdirSync(file);
        });
    };
    var rename = function (oldFile) {
        return function (newFile) {
            return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                return fs.renameSync(oldFile, newFile);
            });
        };
    };
    var realpath$prime = function (path) {
        return function (cache) {
            return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                return fs.realpathSync(path, cache);
            });
        };
    };
    var realpath = function (path) {
        return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
            return fs.realpathSync(path, {});
        });
    };
    var readlink = function (path) {
        return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
            return fs.readlinkSync(path);
        });
    };
    var readdir = function (file) {
        return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
            return fs.readdirSync(file);
        });
    };
    var readTextFile = function (encoding) {
        return function (file) {
            return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                return fs.readFileSync(file, {
                    encoding: Prelude.show(Node_Encoding.showEncoding({}))(encoding)
                });
            });
        };
    };
    var readFile = function (file) {
        return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
            return fs.readFileSync(file, {});
        });
    };
    var mkdir$prime = function (file) {
        return function (mode) {
            return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                return fs.mkdirSync(file, mode);
            });
        };
    };
    var mkdir = Prelude.flip(mkdir$prime)(777);
    var link = function (src) {
        return function (dst) {
            return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                return fs.linkSync(src, dst);
            });
        };
    };
    var chown = function (file) {
        return function (uid) {
            return function (gid) {
                return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                    return fs.chownSync(file, uid, gid);
                });
            };
        };
    };
    var chmod = function (file) {
        return function (mode) {
            return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                return fs.chmodSync(file, mode);
            });
        };
    };
    var appendTextFile = function (encoding) {
        return function (file) {
            return function (buff) {
                return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                    return fs.appendFileSync(file, buff, {
                        encoding: Prelude.show(Node_Encoding.showEncoding({}))(encoding)
                    });
                });
            };
        };
    };
    var appendFile = function (file) {
        return function (buff) {
            return mkFSAction(Data_Either.Left.create)(Data_Either.Right.create)(function (_) {
                return fs.appendFileSync(file, buff, {});
            });
        };
    };
    return {
        appendTextFile: appendTextFile, 
        appendFile: appendFile, 
        writeTextFile: writeTextFile, 
        writeFile: writeFile, 
        readTextFile: readTextFile, 
        readFile: readFile, 
        utimes: utimes, 
        readdir: readdir, 
        "mkdir'": mkdir$prime, 
        mkdir: mkdir, 
        rmdir: rmdir, 
        unlink: unlink, 
        "realpath'": realpath$prime, 
        realpath: realpath, 
        readlink: readlink, 
        symlink: symlink, 
        link: link, 
        stat: stat, 
        chmod: chmod, 
        chown: chown, 
        truncate: truncate, 
        rename: rename
    };
})();
var PS = PS || {};
PS.Node_Webkit = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Node_Events = PS.Node_Events;
    function nwShell() {  return require('nw.gui').Shell;};
    function nwWindow() {  return require('nw.gui').Window;};
    function get(win) {  return function() {    return win.get();  }};
    function open(url) {  return function(opts) {    return function(win) {      return function() {        return win.open(url, opts);      }    }  }};
    function shellOpen(method) {  return function(url) {    return function(shell) {      return function() {        return shell[method](url);      }    }  }};
    function showDevTools(win) {  return function() {    return win.showDevTools();  }};
    function closeWindow(win) {  return function() {    return win.close(true);  }};
    function windowPolicy(method) {  return function(policy) {    return function() {      return policy[method]();    }  }};
    var showItemInFolder = shellOpen("showItemInFolder");
    var openItem = shellOpen("openItem");
    var openExternal = shellOpen("openExternal");
    var ignore = windowPolicy("ignore");
    var forceNewWindow = windowPolicy("forceNewWindow");
    var forceNewPopup = windowPolicy("forceNewPopup");
    var forceDownload = windowPolicy("forceDownload");
    var forceCurrent = windowPolicy("forceCurrent");
    var eventEmitterNWWindow = function (_) {
        return new Node_Events.EventEmitter();
    };
    var onBlur = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("blur");
    var onCapturepagedone = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn1({}))("capturepagedone");
    var onClose = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("close");
    var onClosed = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("closed");
    var onDevtoolsClosed = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("devtools-closed");
    var onDevtoolsOpened = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn1({}))("devtools-opened");
    var onDocumentEnd = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn1({}))("document-end");
    var onDocumentStart = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn1({}))("document-start");
    var onEnterFullscreen = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("enter-fullscreen");
    var onFocus = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("focus");
    var onLeaveFullscreen = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("leave-fullscreen");
    var onLoaded = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("loaded");
    var onLoading = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("loading");
    var onMaximize = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("maximize");
    var onMinimize = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("minimize");
    var onMove = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn2({}))("move");
    var onNewWinPolicy = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn3({}))("new-win-policy");
    var onResize = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn2({}))("resize");
    var onRestore = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("restore");
    var onUnmaximize = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn0({}))("unmaximize");
    var onZoom = Node_Events.on(eventEmitterNWWindow({}))(Node_Events.variadicFn1({}))("zoom");
    var defaultManifestWindow = {
        title: "", 
        width: 800, 
        height: 600, 
        toolbar: true, 
        icon: "", 
        position: "center", 
        min_width: 800, 
        min_height: 600, 
        max_width: 800, 
        max_height: 600, 
        as_desktop: false, 
        resizable: true, 
        "always-on-top": false, 
        fullscreen: false, 
        show_in_taskbar: true, 
        frame: true, 
        show: true, 
        kiosk: false
    };
    return {
        onZoom: onZoom, 
        onUnmaximize: onUnmaximize, 
        onRestore: onRestore, 
        onResize: onResize, 
        onNewWinPolicy: onNewWinPolicy, 
        onMove: onMove, 
        onMinimize: onMinimize, 
        onMaximize: onMaximize, 
        onLoading: onLoading, 
        onLoaded: onLoaded, 
        onLeaveFullscreen: onLeaveFullscreen, 
        onFocus: onFocus, 
        onEnterFullscreen: onEnterFullscreen, 
        onDocumentStart: onDocumentStart, 
        onDocumentEnd: onDocumentEnd, 
        onDevtoolsOpened: onDevtoolsOpened, 
        onDevtoolsClosed: onDevtoolsClosed, 
        onClosed: onClosed, 
        onClose: onClose, 
        onCapturepagedone: onCapturepagedone, 
        onBlur: onBlur, 
        forceNewPopup: forceNewPopup, 
        forceNewWindow: forceNewWindow, 
        forceDownload: forceDownload, 
        forceCurrent: forceCurrent, 
        ignore: ignore, 
        windowPolicy: windowPolicy, 
        closeWindow: closeWindow, 
        showDevTools: showDevTools, 
        showItemInFolder: showItemInFolder, 
        openItem: openItem, 
        openExternal: openExternal, 
        shellOpen: shellOpen, 
        open: open, 
        get: get, 
        nwWindow: nwWindow, 
        nwShell: nwShell, 
        defaultManifestWindow: defaultManifestWindow, 
        eventEmitterNWWindow: eventEmitterNWWindow
    };
})();
var PS = PS || {};
PS.React = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var spec = {};;
    function createClass(psSpec) {  var spec = {};  for (var fun in psSpec) {    if (psSpec.hasOwnProperty(fun)) {      (function(f) {        if (typeof psSpec[f] === 'function') {          spec[f] = function() {            return psSpec[f].apply(this, [this].concat([].slice.call(arguments)))() ;          }        } else {          spec[f] = psSpec[f];        }      })(fun);    }  }  return function(props) {    return function(children) {      return React.createClass(spec)(props, children);    }  }};
    function renderComponent(component) {  return function(element) {    return function() {      return React.renderComponent(component, element);    }  }};
    function eventHandler(that) {  return function(f) {    return function(e) {      return f(that)(e)();    }  }};
    var renderComponentById = function (component) {
        return function (id) {
            return renderComponent(component)(document.getElementById(id));
        };
    };
    return {
        renderComponentById: renderComponentById, 
        eventHandler: eventHandler, 
        renderComponent: renderComponent, 
        createClass: createClass, 
        spec: spec, 
        document: document
    };
})();
var PS = PS || {};
PS.React_DOM = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function dom(el) {  return function(props) {    return function(children) {      return React.DOM[el].apply(this, [props].concat(children));    }  }};
    function rawText(text) {  return text;};
    var wbr = dom("wbr");
    var video = dom("video");
    var $$var = dom("var");
    var ul = dom("ul");
    var u = dom("u");
    var tspan = dom("tspan");
    var track = dom("track");
    var tr = dom("tr");
    var title = dom("title");
    var time = dom("time");
    var thead = dom("thead");
    var th = dom("th");
    var tfoot = dom("tfoot");
    var textarea = dom("textarea");
    var text = dom("text");
    var td = dom("td");
    var tbody = dom("tbody");
    var table = dom("table");
    var svg = dom("svg");
    var sup = dom("sup");
    var summary = dom("summary");
    var sub = dom("sub");
    var style = dom("style");
    var strong = dom("strong");
    var stop = dom("stop");
    var span = dom("span");
    var source = dom("source");
    var small = dom("small");
    var select = dom("select");
    var section = dom("section");
    var script = dom("script");
    var samp = dom("samp");
    var s = dom("s");
    var ruby = dom("ruby");
    var rt = dom("rt");
    var rp = dom("rp");
    var rect = dom("rect");
    var radialGradient = dom("radialGradient");
    var q = dom("q");
    var progress = dom("progress");
    var pre = dom("pre");
    var polyline = dom("polyline");
    var polygon = dom("polygon");
    var pattern = dom("pattern");
    var path = dom("path");
    var param = dom("param");
    var p = dom("p");
    var output = dom("output");
    var option = dom("option");
    var optgroup = dom("optgroup");
    var ol = dom("ol");
    var object = dom("object");
    var noscript = dom("noscript");
    var nav = dom("nav");
    var meter = dom("meter");
    var meta = dom("meta");
    var menuitem = dom("menuitem");
    var menu = dom("menu");
    var mask = dom("mask");
    var mark = dom("mark");
    var map = dom("map");
    var main = dom("main");
    var link = dom("link");
    var linearGradient = dom("linearGradient");
    var line = dom("line");
    var li = dom("li");
    var legend = dom("legend");
    var label = dom("label");
    var keygen = dom("keygen");
    var kbd = dom("kbd");
    var ins = dom("ins");
    var input = dom("input");
    var img = dom("img");
    var iframe = dom("iframe");
    var i = dom("i");
    var html = dom("html");
    var hr = dom("hr");
    var header = dom("header");
    var head = dom("head");
    var h6 = dom("h6");
    var h5 = dom("h5");
    var h4 = dom("h4");
    var h3 = dom("h3");
    var h2 = dom("h2");
    var h1 = dom("h1");
    var g = dom("g");
    var form = dom("form");
    var footer = dom("footer");
    var figure = dom("figure");
    var figcaption = dom("figcaption");
    var fieldset = dom("fieldset");
    var embed = dom("embed");
    var em = dom("em");
    var ellipse = dom("ellipse");
    var dt = dom("dt");
    var dl = dom("dl");
    var div = dom("div");
    var dfn = dom("dfn");
    var details = dom("details");
    var del = dom("del");
    var defs = dom("defs");
    var dd = dom("dd");
    var datalist = dom("datalist");
    var dataDom = dom("data");
    var colgroup = dom("colgroup");
    var col = dom("col");
    var code = dom("code");
    var cite = dom("cite");
    var circle = dom("circle");
    var caption = dom("caption");
    var canvas = dom("canvas");
    var button = dom("button");
    var br = dom("br");
    var body = dom("body");
    var blockquote = dom("blockquote");
    var big = dom("big");
    var bdo = dom("bdo");
    var bdi = dom("bdi");
    var base = dom("base");
    var b = dom("b");
    var audio = dom("audio");
    var aside = dom("aside");
    var article = dom("article");
    var area = dom("area");
    var address = dom("address");
    var abbr = dom("abbr");
    var a = dom("a");
    return {
        wbr: wbr, 
        video: video, 
        "var": $$var, 
        ul: ul, 
        u: u, 
        tspan: tspan, 
        track: track, 
        tr: tr, 
        title: title, 
        time: time, 
        thead: thead, 
        th: th, 
        tfoot: tfoot, 
        textarea: textarea, 
        text: text, 
        td: td, 
        tbody: tbody, 
        table: table, 
        svg: svg, 
        sup: sup, 
        summary: summary, 
        sub: sub, 
        style: style, 
        strong: strong, 
        stop: stop, 
        span: span, 
        source: source, 
        small: small, 
        select: select, 
        section: section, 
        script: script, 
        samp: samp, 
        s: s, 
        ruby: ruby, 
        rt: rt, 
        rp: rp, 
        rect: rect, 
        radialGradient: radialGradient, 
        q: q, 
        progress: progress, 
        pre: pre, 
        polyline: polyline, 
        polygon: polygon, 
        pattern: pattern, 
        path: path, 
        param: param, 
        p: p, 
        output: output, 
        option: option, 
        optgroup: optgroup, 
        ol: ol, 
        object: object, 
        noscript: noscript, 
        nav: nav, 
        meter: meter, 
        meta: meta, 
        menuitem: menuitem, 
        menu: menu, 
        mask: mask, 
        mark: mark, 
        map: map, 
        main: main, 
        link: link, 
        linearGradient: linearGradient, 
        line: line, 
        li: li, 
        legend: legend, 
        label: label, 
        keygen: keygen, 
        kbd: kbd, 
        ins: ins, 
        input: input, 
        img: img, 
        iframe: iframe, 
        i: i, 
        html: html, 
        hr: hr, 
        header: header, 
        head: head, 
        h6: h6, 
        h5: h5, 
        h4: h4, 
        h3: h3, 
        h2: h2, 
        h1: h1, 
        g: g, 
        form: form, 
        footer: footer, 
        figure: figure, 
        figcaption: figcaption, 
        fieldset: fieldset, 
        embed: embed, 
        em: em, 
        ellipse: ellipse, 
        dt: dt, 
        dl: dl, 
        div: div, 
        dfn: dfn, 
        details: details, 
        del: del, 
        defs: defs, 
        dd: dd, 
        datalist: datalist, 
        dataDom: dataDom, 
        colgroup: colgroup, 
        col: col, 
        code: code, 
        cite: cite, 
        circle: circle, 
        caption: caption, 
        canvas: canvas, 
        button: button, 
        br: br, 
        body: body, 
        blockquote: blockquote, 
        big: big, 
        bdo: bdo, 
        bdi: bdi, 
        base: base, 
        b: b, 
        audio: audio, 
        aside: aside, 
        article: article, 
        area: area, 
        address: address, 
        abbr: abbr, 
        a: a, 
        rawText: rawText, 
        dom: dom
    };
})();
var PS = PS || {};
PS.Control_Monad_Cont_Trans = (function () {
    "use strict";
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Prelude = PS.Prelude;
    var ContT = {
        create: function (value) {
            return value;
        }
    };
    var runContT = function (_370) {
        return function (_371) {
            return _370(_371);
        };
    };
    var withContT = function (f) {
        return function (m) {
            return function (k) {
                return runContT(m)(f(k));
            };
        };
    };
    var monadTransContT = function (_) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_180) {
            return function (m) {
                return function (k) {
                    return Prelude[">>="](__dict_Monad_180["__superclass_Prelude.Bind_1"]({}))(m)(k);
                };
            };
        });
    };
    var mapContT = function (f) {
        return function (m) {
            return function (k) {
                return f(runContT(m)(k));
            };
        };
    };
    var functorContT = function (__dict_Monad_182) {
        return new Prelude.Functor(function (f) {
            return function (m) {
                return function (k) {
                    return runContT(m)(function (a) {
                        return k(f(a));
                    });
                };
            };
        });
    };
    var callCC = function (f) {
        return function (k) {
            return runContT(f(function (a) {
                return function (_) {
                    return k(a);
                };
            }))(k);
        };
    };
    var appluContT = function (__dict_Functor_184) {
        return function (__dict_Monad_185) {
            return new Prelude.Apply(function (f) {
                return function (v) {
                    return function (k) {
                        return runContT(f)(function (g) {
                            return runContT(v)(function (a) {
                                return k(g(a));
                            });
                        });
                    };
                };
            }, function (_) {
                return functorContT(__dict_Monad_185);
            });
        };
    };
    var bindContT = function (__dict_Monad_183) {
        return new Prelude.Bind(function (m) {
            return function (k) {
                return function (k$prime) {
                    return runContT(m)(function (a) {
                        return runContT(k(a))(k$prime);
                    });
                };
            };
        }, function (_) {
            return appluContT(((__dict_Monad_183["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_183);
        });
    };
    var applicativeContT = function (__dict_Functor_186) {
        return function (__dict_Monad_187) {
            return new Prelude.Applicative(function (_) {
                return appluContT(__dict_Functor_186)(__dict_Monad_187);
            }, function (a) {
                return function (k) {
                    return k(a);
                };
            });
        };
    };
    var monadContT = function (__dict_Monad_181) {
        return new Prelude.Monad(function (_) {
            return applicativeContT(((__dict_Monad_181["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_181);
        }, function (_) {
            return bindContT(__dict_Monad_181);
        });
    };
    return {
        ContT: ContT, 
        callCC: callCC, 
        withContT: withContT, 
        mapContT: mapContT, 
        runContT: runContT, 
        functorContT: functorContT, 
        appluContT: appluContT, 
        applicativeContT: applicativeContT, 
        bindContT: bindContT, 
        monadContT: monadContT, 
        monadTransContT: monadTransContT
    };
})();
var PS = PS || {};
PS.Control_Monad = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var when = function (__dict_Monad_188) {
        return function (_377) {
            return function (_378) {
                if (_377) {
                    return _378;
                };
                if (!_377) {
                    return Prelude["return"](__dict_Monad_188)(Prelude.unit);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var unless = function (__dict_Monad_189) {
        return function (_379) {
            return function (_380) {
                if (!_379) {
                    return _380;
                };
                if (_379) {
                    return Prelude["return"](__dict_Monad_189)(Prelude.unit);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var replicateM = function (__dict_Monad_190) {
        return function (_372) {
            return function (_373) {
                if (_372 === 0) {
                    return Prelude["return"](__dict_Monad_190)([  ]);
                };
                return Prelude[">>="](__dict_Monad_190["__superclass_Prelude.Bind_1"]({}))(_373)(function (_19) {
                    return Prelude[">>="](__dict_Monad_190["__superclass_Prelude.Bind_1"]({}))(replicateM(__dict_Monad_190)(_372 - 1)(_373))(function (_18) {
                        return Prelude["return"](__dict_Monad_190)(Prelude[":"](_19)(_18));
                    });
                });
            };
        };
    };
    var foldM = function (__dict_Monad_191) {
        return function (_374) {
            return function (_375) {
                return function (_376) {
                    if (_376.length === 0) {
                        return Prelude["return"](__dict_Monad_191)(_375);
                    };
                    if (_376.length > 0) {
                        var _1212 = _376.slice(1);
                        return Prelude[">>="](__dict_Monad_191["__superclass_Prelude.Bind_1"]({}))(_374(_375)(_376[0]))(function (a$prime) {
                            return foldM(__dict_Monad_191)(_374)(a$prime)(_1212);
                        });
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    return {
        unless: unless, 
        when: when, 
        foldM: foldM, 
        replicateM: replicateM
    };
})();
var PS = PS || {};
PS.Control_Monad_Maybe_Trans = (function () {
    "use strict";
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Tuple = PS.Data_Tuple;
    var MaybeT = {
        create: function (value) {
            return value;
        }
    };
    var runMaybeT = function (_381) {
        return _381;
    };
    var monadTransMaybeT = function (_) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_192) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(MaybeT.create)(Prelude.liftM1(__dict_Monad_192)(Data_Maybe.Just.create));
        });
    };
    var mapMaybeT = function (f) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(MaybeT.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(f)(runMaybeT));
    };
    var liftPassMaybe = function (__dict_Monad_194) {
        return function (pass) {
            return mapMaybeT(function (m) {
                return pass(Prelude[">>="](__dict_Monad_194["__superclass_Prelude.Bind_1"]({}))(m)(function (_22) {
                    return Prelude["return"](__dict_Monad_194)((function (_1215) {
                        if (_1215 instanceof Data_Maybe.Nothing) {
                            return new Data_Tuple.Tuple(Data_Maybe.Nothing.value, Prelude.id(Prelude.categoryArr({})));
                        };
                        if (_1215 instanceof Data_Maybe.Just) {
                            return new Data_Tuple.Tuple(new Data_Maybe.Just(_1215.value0.value0), _1215.value0.value1);
                        };
                        throw new Error("Failed pattern match");
                    })(_22));
                }));
            });
        };
    };
    var liftListenMaybe = function (__dict_Monad_195) {
        return function (listen) {
            return mapMaybeT(function (m) {
                return Prelude[">>="](__dict_Monad_195["__superclass_Prelude.Bind_1"]({}))(listen(m))(function (_21) {
                    return Prelude["return"](__dict_Monad_195)(Prelude["<$>"](Data_Maybe.functorMaybe({}))(function (r) {
                        return new Data_Tuple.Tuple(r, _21.value1);
                    })(_21.value0));
                });
            });
        };
    };
    var liftCatchMaybe = function ($$catch) {
        return function (m) {
            return function (h) {
                return MaybeT.create($$catch(runMaybeT(m))(Prelude["<<<"](Prelude.semigroupoidArr({}))(runMaybeT)(h)));
            };
        };
    };
    var liftCallCCMaybe = function (callCC) {
        return function (f) {
            return MaybeT.create(callCC(function (c) {
                return runMaybeT(f(function (a) {
                    return MaybeT.create(c(new Data_Maybe.Just(a)));
                }));
            }));
        };
    };
    var applicativeMaybeT = function (__dict_Monad_199) {
        return new Prelude.Applicative(function (_) {
            return applyMaybeT(__dict_Monad_199);
        }, Prelude["<<<"](Prelude.semigroupoidArr({}))(MaybeT.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.pure(__dict_Monad_199["__superclass_Prelude.Applicative_0"]({})))(Data_Maybe.Just.create)));
    };
    var applyMaybeT = function (__dict_Monad_198) {
        return new Prelude.Apply(Prelude.ap(monadMaybeT(__dict_Monad_198)), function (_) {
            return functorMaybeT(__dict_Monad_198);
        });
    };
    var monadMaybeT = function (__dict_Monad_193) {
        return new Prelude.Monad(function (_) {
            return applicativeMaybeT(__dict_Monad_193);
        }, function (_) {
            return bindMaybeT(__dict_Monad_193);
        });
    };
    var bindMaybeT = function (__dict_Monad_197) {
        return new Prelude.Bind(function (x) {
            return function (f) {
                return MaybeT.create(Prelude[">>="](__dict_Monad_197["__superclass_Prelude.Bind_1"]({}))(runMaybeT(x))(function (_20) {
                    if (_20 instanceof Data_Maybe.Nothing) {
                        return Prelude["return"](__dict_Monad_197)(Data_Maybe.Nothing.value);
                    };
                    if (_20 instanceof Data_Maybe.Just) {
                        return runMaybeT(f(_20.value0));
                    };
                    throw new Error("Failed pattern match");
                }));
            };
        }, function (_) {
            return applyMaybeT(__dict_Monad_197);
        });
    };
    var functorMaybeT = function (__dict_Monad_196) {
        return new Prelude.Functor(Prelude.liftA1(applicativeMaybeT(__dict_Monad_196)));
    };
    return {
        MaybeT: MaybeT, 
        liftCallCCMaybe: liftCallCCMaybe, 
        liftPassMaybe: liftPassMaybe, 
        liftListenMaybe: liftListenMaybe, 
        liftCatchMaybe: liftCatchMaybe, 
        mapMaybeT: mapMaybeT, 
        runMaybeT: runMaybeT, 
        functorMaybeT: functorMaybeT, 
        applyMaybeT: applyMaybeT, 
        applicativeMaybeT: applicativeMaybeT, 
        bindMaybeT: bindMaybeT, 
        monadMaybeT: monadMaybeT, 
        monadTransMaybeT: monadTransMaybeT
    };
})();
var PS = PS || {};
PS.Control_Monad_Cont_Class = (function () {
    "use strict";
    var Control_Monad_Cont_Trans = PS.Control_Monad_Cont_Trans;
    var Control_Monad_Error_Trans = PS.Control_Monad_Error_Trans;
    var Control_Monad_Maybe_Trans = PS.Control_Monad_Maybe_Trans;
    var Control_Monad_Reader_Trans = PS.Control_Monad_Reader_Trans;
    var Control_Monad_State_Trans = PS.Control_Monad_State_Trans;
    var Control_Monad_Writer_Trans = PS.Control_Monad_Writer_Trans;
    function MonadCont(callCC) {
        this.callCC = callCC;
    };
    var monadContContT = function (__dict_Monad_200) {
        return new MonadCont(Control_Monad_Cont_Trans.callCC);
    };
    var callCC = function (dict) {
        return dict.callCC;
    };
    var monadContErrorT = function (__dict_Error_201) {
        return function (__dict_MonadCont_202) {
            return new MonadCont(Control_Monad_Error_Trans.liftCallCCError(callCC(__dict_MonadCont_202)));
        };
    };
    var monadContMaybeT = function (__dict_MonadCont_203) {
        return new MonadCont(Control_Monad_Maybe_Trans.liftCallCCMaybe(callCC(__dict_MonadCont_203)));
    };
    var monadContReaderT = function (__dict_MonadCont_204) {
        return new MonadCont(Control_Monad_Reader_Trans.liftCallCCReader(callCC(__dict_MonadCont_204)));
    };
    var monadContStateT = function (__dict_MonadCont_205) {
        return new MonadCont(Control_Monad_State_Trans["liftCallCCState'"](callCC(__dict_MonadCont_205)));
    };
    var monadWriterT = function (__dict_Monoid_206) {
        return function (__dict_MonadCont_207) {
            return new MonadCont(Control_Monad_Writer_Trans.liftCallCCWriter(__dict_Monoid_206)(callCC(__dict_MonadCont_207)));
        };
    };
    return {
        MonadCont: MonadCont, 
        callCC: callCC, 
        monadContContT: monadContContT, 
        monadContErrorT: monadContErrorT, 
        monadContMaybeT: monadContMaybeT, 
        monadContReaderT: monadContReaderT, 
        monadContStateT: monadContStateT, 
        monadWriterT: monadWriterT
    };
})();
var PS = PS || {};
PS.Control_Monad_Error_Class = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Error_Trans = PS.Control_Monad_Error_Trans;
    var Data_Either = PS.Data_Either;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Control_Monad_Maybe_Trans = PS.Control_Monad_Maybe_Trans;
    var Control_Monad_Reader_Trans = PS.Control_Monad_Reader_Trans;
    var Control_Monad_State_Trans = PS.Control_Monad_State_Trans;
    var Control_Monad_Writer_Trans = PS.Control_Monad_Writer_Trans;
    function MonadError(catchError, throwError) {
        this.catchError = catchError;
        this.throwError = throwError;
    };
    var throwError = function (dict) {
        return dict.throwError;
    };
    var monadErrorErrorT = function (__dict_Monad_208) {
        return function (__dict_Error_209) {
            return new MonadError(function (m) {
                return function (h) {
                    return Control_Monad_Error_Trans.ErrorT.create(Prelude[">>="](__dict_Monad_208["__superclass_Prelude.Bind_1"]({}))(Control_Monad_Error_Trans.runErrorT(m))(function (_23) {
                        if (_23 instanceof Data_Either.Left) {
                            return Control_Monad_Error_Trans.runErrorT(h(_23.value0));
                        };
                        if (_23 instanceof Data_Either.Right) {
                            return Prelude["return"](__dict_Monad_208)(new Data_Either.Right(_23.value0));
                        };
                        throw new Error("Failed pattern match");
                    }));
                };
            }, function (e) {
                return Control_Monad_Error_Trans.ErrorT.create(Prelude["return"](__dict_Monad_208)(new Data_Either.Left(e)));
            });
        };
    };
    var monadErrorError = function (__dict_Error_210) {
        return new MonadError(function (_382) {
            return function (_383) {
                if (_382 instanceof Data_Either.Left) {
                    return _383(_382.value0);
                };
                if (_382 instanceof Data_Either.Right) {
                    return new Data_Either.Right(_382.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, Data_Either.Left.create);
    };
    var catchError = function (dict) {
        return dict.catchError;
    };
    var monadErrorMaybeT = function (__dict_Monad_211) {
        return function (__dict_MonadError_212) {
            return new MonadError(Control_Monad_Maybe_Trans.liftCatchMaybe(catchError(__dict_MonadError_212)), function (e) {
                return Control_Monad_Trans.lift(Control_Monad_Maybe_Trans.monadTransMaybeT({}))(__dict_Monad_211)(throwError(__dict_MonadError_212)(e));
            });
        };
    };
    var monadErrorReaderT = function (__dict_Monad_213) {
        return function (__dict_MonadError_214) {
            return new MonadError(Control_Monad_Reader_Trans.liftCatchReader(catchError(__dict_MonadError_214)), function (e) {
                return Control_Monad_Trans.lift(Control_Monad_Reader_Trans.monadTransReaderT({}))(__dict_Monad_213)(throwError(__dict_MonadError_214)(e));
            });
        };
    };
    var monadErrorStateT = function (__dict_Monad_215) {
        return function (__dict_MonadError_216) {
            return new MonadError(Control_Monad_State_Trans.liftCatchState(catchError(__dict_MonadError_216)), function (e) {
                return Control_Monad_Trans.lift(Control_Monad_State_Trans.monadTransStateT({}))(__dict_Monad_215)(throwError(__dict_MonadError_216)(e));
            });
        };
    };
    var monadErrorWriterT = function (__dict_Monad_217) {
        return function (__dict_Monoid_218) {
            return function (__dict_MonadError_219) {
                return new MonadError(Control_Monad_Writer_Trans.liftCatchWriter(catchError(__dict_MonadError_219)), function (e) {
                    return Control_Monad_Trans.lift(Control_Monad_Writer_Trans.monadTransWriterT(__dict_Monoid_218))(__dict_Monad_217)(throwError(__dict_MonadError_219)(e));
                });
            };
        };
    };
    return {
        MonadError: MonadError, 
        catchError: catchError, 
        throwError: throwError, 
        monadErrorError: monadErrorError, 
        monadErrorErrorT: monadErrorErrorT, 
        monadErrorMaybeT: monadErrorMaybeT, 
        monadErrorReaderT: monadErrorReaderT, 
        monadErrorWriterT: monadErrorWriterT, 
        monadErrorStateT: monadErrorStateT
    };
})();
var PS = PS || {};
PS.Control_Monad_Reader_Class = (function () {
    "use strict";
    var Control_Monad_Reader_Trans = PS.Control_Monad_Reader_Trans;
    var Prelude = PS.Prelude;
    var Control_Monad_RWS = PS.Control_Monad_RWS;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Control_Monad_Error_Trans = PS.Control_Monad_Error_Trans;
    var Control_Monad_Maybe_Trans = PS.Control_Monad_Maybe_Trans;
    var Control_Monad_State_Trans = PS.Control_Monad_State_Trans;
    var Control_Monad_Writer_Trans = PS.Control_Monad_Writer_Trans;
    function MonadReader(ask, local) {
        this.ask = ask;
        this.local = local;
    };
    var monadReaderReaderT = function (__dict_Monad_220) {
        return new MonadReader(Prelude["return"](__dict_Monad_220), Control_Monad_Reader_Trans.withReaderT);
    };
    var monadReaderRWST = function (__dict_Monad_221) {
        return function (__dict_Monoid_222) {
            return new MonadReader(Control_Monad_RWS.ask(__dict_Monad_221["__superclass_Prelude.Applicative_0"]({}))(__dict_Monoid_222), Control_Monad_RWS.local);
        };
    };
    var monadReaderFun = function (_) {
        return new MonadReader(Prelude.id(Prelude.categoryArr({})), Prelude[">>>"](Prelude.semigroupoidArr({})));
    };
    var local = function (dict) {
        return dict.local;
    };
    var ask = function (dict) {
        return dict.ask;
    };
    var monadReaderErrorT = function (__dict_Monad_223) {
        return function (__dict_Error_224) {
            return function (__dict_MonadReader_225) {
                return new MonadReader(Control_Monad_Trans.lift(Control_Monad_Error_Trans.monadTransErrorT(__dict_Error_224))(__dict_Monad_223)(ask(__dict_MonadReader_225)), function (f) {
                    return Control_Monad_Error_Trans.mapErrorT(local(__dict_MonadReader_225)(f));
                });
            };
        };
    };
    var monadReaderMaybeT = function (__dict_Monad_226) {
        return function (__dict_MonadReader_227) {
            return new MonadReader(Control_Monad_Trans.lift(Control_Monad_Maybe_Trans.monadTransMaybeT({}))(__dict_Monad_226)(ask(__dict_MonadReader_227)), function (f) {
                return Control_Monad_Maybe_Trans.mapMaybeT(local(__dict_MonadReader_227)(f));
            });
        };
    };
    var monadReaderStateT = function (__dict_Monad_228) {
        return function (__dict_MonadReader_229) {
            return new MonadReader(Control_Monad_Trans.lift(Control_Monad_State_Trans.monadTransStateT({}))(__dict_Monad_228)(ask(__dict_MonadReader_229)), function (f) {
                return Control_Monad_State_Trans.mapStateT(local(__dict_MonadReader_229)(f));
            });
        };
    };
    var monadReaderWriterT = function (__dict_Monad_230) {
        return function (__dict_Monoid_231) {
            return function (__dict_MonadReader_232) {
                return new MonadReader(Control_Monad_Trans.lift(Control_Monad_Writer_Trans.monadTransWriterT(__dict_Monoid_231))(__dict_Monad_230)(ask(__dict_MonadReader_232)), function (f) {
                    return Control_Monad_Writer_Trans.mapWriterT(local(__dict_MonadReader_232)(f));
                });
            };
        };
    };
    var reader = function (__dict_Monad_233) {
        return function (__dict_MonadReader_234) {
            return function (f) {
                return Prelude[">>="](__dict_Monad_233["__superclass_Prelude.Bind_1"]({}))(ask(__dict_MonadReader_234))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](__dict_Monad_233))(f));
            };
        };
    };
    return {
        MonadReader: MonadReader, 
        reader: reader, 
        local: local, 
        ask: ask, 
        monadReaderFun: monadReaderFun, 
        monadReaderReaderT: monadReaderReaderT, 
        monadReaderErrorT: monadReaderErrorT, 
        monadReaderMaybeT: monadReaderMaybeT, 
        monadReaderWriterT: monadReaderWriterT, 
        monadReaderStateT: monadReaderStateT, 
        monadReaderRWST: monadReaderRWST
    };
})();
var PS = PS || {};
PS.Control_Monad_State_Class = (function () {
    "use strict";
    var Data_Tuple = PS.Data_Tuple;
    var Prelude = PS.Prelude;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Control_Monad_Writer_Trans = PS.Control_Monad_Writer_Trans;
    var Control_Monad_State_Trans = PS.Control_Monad_State_Trans;
    var Control_Monad_Reader_Trans = PS.Control_Monad_Reader_Trans;
    var Control_Monad_RWS = PS.Control_Monad_RWS;
    var Control_Monad_Maybe_Trans = PS.Control_Monad_Maybe_Trans;
    var Control_Monad_Error_Trans = PS.Control_Monad_Error_Trans;
    function MonadState(state) {
        this.state = state;
    };
    var state = function (dict) {
        return dict.state;
    };
    var put = function (__dict_Monad_235) {
        return function (__dict_MonadState_236) {
            return function (s) {
                return state(__dict_MonadState_236)(function (_) {
                    return new Data_Tuple.Tuple(Prelude.unit, s);
                });
            };
        };
    };
    var monadStateWriterT = function (__dict_Monad_237) {
        return function (__dict_Monoid_238) {
            return function (__dict_MonadState_239) {
                return new MonadState(function (f) {
                    return Control_Monad_Trans.lift(Control_Monad_Writer_Trans.monadTransWriterT(__dict_Monoid_238))(__dict_Monad_237)(state(__dict_MonadState_239)(f));
                });
            };
        };
    };
    var monadStateStateT1 = function (__dict_Monad_240) {
        return function (__dict_MonadState_241) {
            return new MonadState(function (f) {
                return Control_Monad_Trans.lift(Control_Monad_State_Trans.monadTransStateT({}))(__dict_Monad_240)(state(__dict_MonadState_241)(f));
            });
        };
    };
    var monadStateStateT = function (__dict_Monad_242) {
        return new MonadState(function (f) {
            return Control_Monad_State_Trans.StateT.create(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](__dict_Monad_242))(f));
        });
    };
    var monadStateReaderT = function (__dict_Monad_243) {
        return function (__dict_MonadState_244) {
            return new MonadState(function (f) {
                return Control_Monad_Trans.lift(Control_Monad_Reader_Trans.monadTransReaderT({}))(__dict_Monad_243)(state(__dict_MonadState_244)(f));
            });
        };
    };
    var monadStateRWST = function (__dict_Monad_245) {
        return function (__dict_Monoid_246) {
            return new MonadState(Control_Monad_RWS.state(__dict_Monad_245["__superclass_Prelude.Applicative_0"]({}))(__dict_Monoid_246));
        };
    };
    var monadStateMaybeT = function (__dict_Monad_247) {
        return function (__dict_MonadState_248) {
            return new MonadState(function (f) {
                return Control_Monad_Trans.lift(Control_Monad_Maybe_Trans.monadTransMaybeT({}))(__dict_Monad_247)(state(__dict_MonadState_248)(f));
            });
        };
    };
    var monadStateErrorT = function (__dict_Monad_249) {
        return function (__dict_Error_250) {
            return function (__dict_MonadState_251) {
                return new MonadState(function (f) {
                    return Control_Monad_Trans.lift(Control_Monad_Error_Trans.monadTransErrorT(__dict_Error_250))(__dict_Monad_249)(state(__dict_MonadState_251)(f));
                });
            };
        };
    };
    var modify = function (__dict_Monad_252) {
        return function (__dict_MonadState_253) {
            return function (f) {
                return state(__dict_MonadState_253)(function (s) {
                    return new Data_Tuple.Tuple(Prelude.unit, f(s));
                });
            };
        };
    };
    var gets = function (__dict_Monad_254) {
        return function (__dict_MonadState_255) {
            return function (f) {
                return state(__dict_MonadState_255)(function (s) {
                    return new Data_Tuple.Tuple(f(s), s);
                });
            };
        };
    };
    var get = function (__dict_Monad_256) {
        return function (__dict_MonadState_257) {
            return state(__dict_MonadState_257)(function (s) {
                return new Data_Tuple.Tuple(s, s);
            });
        };
    };
    return {
        MonadState: MonadState, 
        modify: modify, 
        put: put, 
        gets: gets, 
        get: get, 
        state: state, 
        monadStateStateT: monadStateStateT, 
        monadStateStateT1: monadStateStateT1, 
        monadStateErrorT: monadStateErrorT, 
        monadStateMaybeT: monadStateMaybeT, 
        monadStateReaderT: monadStateReaderT, 
        monadStateWriterT: monadStateWriterT, 
        monadStateRWST: monadStateRWST
    };
})();
var PS = PS || {};
PS.Control_Monad_Writer_Class = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Monad_Writer_Trans = PS.Control_Monad_Writer_Trans;
    var Control_Monad_RWS = PS.Control_Monad_RWS;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Control_Monad_Error_Trans = PS.Control_Monad_Error_Trans;
    var Control_Monad_Maybe_Trans = PS.Control_Monad_Maybe_Trans;
    var Control_Monad_Reader_Trans = PS.Control_Monad_Reader_Trans;
    var Control_Monad_State_Trans = PS.Control_Monad_State_Trans;
    function MonadWriter(listen, pass, writer) {
        this.listen = listen;
        this.pass = pass;
        this.writer = writer;
    };
    var writer = function (dict) {
        return dict.writer;
    };
    var tell = function (__dict_Monoid_258) {
        return function (__dict_Monad_259) {
            return function (__dict_MonadWriter_260) {
                return function (w) {
                    return writer(__dict_MonadWriter_260)(new Data_Tuple.Tuple(Prelude.unit, w));
                };
            };
        };
    };
    var pass = function (dict) {
        return dict.pass;
    };
    var monadWriterWriterT = function (__dict_Monoid_261) {
        return function (__dict_Monad_262) {
            return new MonadWriter(function (m) {
                return Control_Monad_Writer_Trans.WriterT.create(Prelude[">>="](__dict_Monad_262["__superclass_Prelude.Bind_1"]({}))(Control_Monad_Writer_Trans.runWriterT(m))(function (_26) {
                    return Prelude["return"](__dict_Monad_262)(new Data_Tuple.Tuple(new Data_Tuple.Tuple(_26.value0, _26.value1), _26.value1));
                }));
            }, function (m) {
                return Control_Monad_Writer_Trans.WriterT.create(Prelude[">>="](__dict_Monad_262["__superclass_Prelude.Bind_1"]({}))(Control_Monad_Writer_Trans.runWriterT(m))(function (_27) {
                    return Prelude["return"](__dict_Monad_262)(new Data_Tuple.Tuple(_27.value0.value0, _27.value0.value1(_27.value1)));
                }));
            }, Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Writer_Trans.WriterT.create)(Prelude["return"](__dict_Monad_262)));
        };
    };
    var monadWriterRWST = function (__dict_Monad_263) {
        return function (__dict_Monoid_264) {
            return new MonadWriter(Control_Monad_RWS.listen(__dict_Monad_263), Control_Monad_RWS.pass(__dict_Monad_263), Control_Monad_RWS.writer(__dict_Monad_263["__superclass_Prelude.Applicative_0"]({})));
        };
    };
    var listen = function (dict) {
        return dict.listen;
    };
    var listens = function (__dict_Monoid_265) {
        return function (__dict_Monad_266) {
            return function (__dict_MonadWriter_267) {
                return function (f) {
                    return function (m) {
                        return Prelude[">>="](__dict_Monad_266["__superclass_Prelude.Bind_1"]({}))(listen(__dict_MonadWriter_267)(m))(function (_24) {
                            return Prelude["return"](__dict_Monad_266)(new Data_Tuple.Tuple(_24.value0, f(_24.value1)));
                        });
                    };
                };
            };
        };
    };
    var monadWriterErrorT = function (__dict_Monad_268) {
        return function (__dict_Error_269) {
            return function (__dict_MonadWriter_270) {
                return new MonadWriter(Control_Monad_Error_Trans.liftListenError(__dict_Monad_268)(listen(__dict_MonadWriter_270)), Control_Monad_Error_Trans.liftPassError(__dict_Monad_268)(pass(__dict_MonadWriter_270)), function (wd) {
                    return Control_Monad_Trans.lift(Control_Monad_Error_Trans.monadTransErrorT(__dict_Error_269))(__dict_Monad_268)(writer(__dict_MonadWriter_270)(wd));
                });
            };
        };
    };
    var monadWriterMaybeT = function (__dict_Monad_271) {
        return function (__dict_MonadWriter_272) {
            return new MonadWriter(Control_Monad_Maybe_Trans.liftListenMaybe(__dict_Monad_271)(listen(__dict_MonadWriter_272)), Control_Monad_Maybe_Trans.liftPassMaybe(__dict_Monad_271)(pass(__dict_MonadWriter_272)), function (wd) {
                return Control_Monad_Trans.lift(Control_Monad_Maybe_Trans.monadTransMaybeT({}))(__dict_Monad_271)(writer(__dict_MonadWriter_272)(wd));
            });
        };
    };
    var monadWriterReaderT = function (__dict_Monad_273) {
        return function (__dict_MonadWriter_274) {
            return new MonadWriter(Control_Monad_Reader_Trans.mapReaderT(listen(__dict_MonadWriter_274)), Control_Monad_Reader_Trans.mapReaderT(pass(__dict_MonadWriter_274)), function (wd) {
                return Control_Monad_Trans.lift(Control_Monad_Reader_Trans.monadTransReaderT({}))(__dict_Monad_273)(writer(__dict_MonadWriter_274)(wd));
            });
        };
    };
    var monadWriterStateT = function (__dict_Monad_275) {
        return function (__dict_MonadWriter_276) {
            return new MonadWriter(Control_Monad_State_Trans.liftListenState(__dict_Monad_275)(listen(__dict_MonadWriter_276)), Control_Monad_State_Trans.liftPassState(__dict_Monad_275)(pass(__dict_MonadWriter_276)), function (wd) {
                return Control_Monad_Trans.lift(Control_Monad_State_Trans.monadTransStateT({}))(__dict_Monad_275)(writer(__dict_MonadWriter_276)(wd));
            });
        };
    };
    var censor = function (__dict_Monoid_277) {
        return function (__dict_Monad_278) {
            return function (__dict_MonadWriter_279) {
                return function (f) {
                    return function (m) {
                        return pass(__dict_MonadWriter_279)(Prelude[">>="](__dict_Monad_278["__superclass_Prelude.Bind_1"]({}))(m)(function (_25) {
                            return Prelude["return"](__dict_Monad_278)(new Data_Tuple.Tuple(_25, f));
                        }));
                    };
                };
            };
        };
    };
    return {
        MonadWriter: MonadWriter, 
        censor: censor, 
        listens: listens, 
        tell: tell, 
        pass: pass, 
        listen: listen, 
        writer: writer, 
        monadWriterWriterT: monadWriterWriterT, 
        monadWriterErrorT: monadWriterErrorT, 
        monadWriterMaybeT: monadWriterMaybeT, 
        monadWriterStateT: monadWriterStateT, 
        monadWriterReaderT: monadWriterReaderT, 
        monadWriterRWST: monadWriterRWST
    };
})();
var PS = PS || {};
PS.Control_Monad_RWS_Class = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_RWS_Trans = PS.Control_Monad_RWS_Trans;
    var Control_Monad_Reader_Class = PS.Control_Monad_Reader_Class;
    var Control_Monad_Writer_Class = PS.Control_Monad_Writer_Class;
    var Control_Monad_State_Class = PS.Control_Monad_State_Class;
    var Control_Monad_Maybe_Trans = PS.Control_Monad_Maybe_Trans;
    var Control_Monad_Error_Trans = PS.Control_Monad_Error_Trans;
    function MonadRWS(__superclass_Control$dotMonad$dotReader$dotClass$dotMonadReader_2, __superclass_Control$dotMonad$dotState$dotClass$dotMonadState_4, __superclass_Control$dotMonad$dotWriter$dotClass$dotMonadWriter_3, __superclass_Data$dotMonoid$dotMonoid_1, __superclass_Prelude$dotMonad_0) {
        this["__superclass_Control.Monad.Reader.Class.MonadReader_2"] = __superclass_Control$dotMonad$dotReader$dotClass$dotMonadReader_2;
        this["__superclass_Control.Monad.State.Class.MonadState_4"] = __superclass_Control$dotMonad$dotState$dotClass$dotMonadState_4;
        this["__superclass_Control.Monad.Writer.Class.MonadWriter_3"] = __superclass_Control$dotMonad$dotWriter$dotClass$dotMonadWriter_3;
        this["__superclass_Data.Monoid.Monoid_1"] = __superclass_Data$dotMonoid$dotMonoid_1;
        this["__superclass_Prelude.Monad_0"] = __superclass_Prelude$dotMonad_0;
    };
    var monadRWSRWST = function (__dict_Monad_280) {
        return function (__dict_Monoid_281) {
            return new MonadRWS(function (_) {
                return Control_Monad_Reader_Class.monadReaderRWST(__dict_Monad_280)(__dict_Monoid_281);
            }, function (_) {
                return Control_Monad_State_Class.monadStateRWST(__dict_Monad_280)(__dict_Monoid_281);
            }, function (_) {
                return Control_Monad_Writer_Class.monadWriterRWST(__dict_Monad_280)(__dict_Monoid_281);
            }, function (_) {
                return __dict_Monoid_281;
            }, function (_) {
                return Control_Monad_RWS_Trans.monadRWST(__dict_Monad_280)(__dict_Monoid_281);
            });
        };
    };
    var monadRWSMaybeT = function (__dict_Monad_282) {
        return function (__dict_Monoid_283) {
            return function (__dict_MonadRWS_284) {
                return function (__dict_MonadReader_285) {
                    return function (__dict_MonadWriter_286) {
                        return function (__dict_MonadState_287) {
                            return new MonadRWS(function (_) {
                                return Control_Monad_Reader_Class.monadReaderMaybeT(__dict_Monad_282)(__dict_MonadReader_285);
                            }, function (_) {
                                return Control_Monad_State_Class.monadStateMaybeT(__dict_Monad_282)(__dict_MonadState_287);
                            }, function (_) {
                                return Control_Monad_Writer_Class.monadWriterMaybeT(__dict_Monad_282)(__dict_MonadWriter_286);
                            }, function (_) {
                                return __dict_Monoid_283;
                            }, function (_) {
                                return Control_Monad_Maybe_Trans.monadMaybeT(__dict_Monad_282);
                            });
                        };
                    };
                };
            };
        };
    };
    var monadRWSErrorT = function (__dict_Monad_288) {
        return function (__dict_Monoid_289) {
            return function (__dict_MonadRWS_290) {
                return function (__dict_MonadReader_291) {
                    return function (__dict_MonadWriter_292) {
                        return function (__dict_MonadState_293) {
                            return function (__dict_Error_294) {
                                return new MonadRWS(function (_) {
                                    return Control_Monad_Reader_Class.monadReaderErrorT(__dict_Monad_288)(__dict_Error_294)(__dict_MonadReader_291);
                                }, function (_) {
                                    return Control_Monad_State_Class.monadStateErrorT(__dict_Monad_288)(__dict_Error_294)(__dict_MonadState_293);
                                }, function (_) {
                                    return Control_Monad_Writer_Class.monadWriterErrorT(__dict_Monad_288)(__dict_Error_294)(__dict_MonadWriter_292);
                                }, function (_) {
                                    return __dict_Monoid_289;
                                }, function (_) {
                                    return Control_Monad_Error_Trans.monadErrorT(__dict_Monad_288)(__dict_Error_294);
                                });
                            };
                        };
                    };
                };
            };
        };
    };
    return {
        MonadRWS: MonadRWS, 
        monadRWSRWST: monadRWSRWST, 
        monadRWSErrorT: monadRWSErrorT, 
        monadRWSMaybeT: monadRWSMaybeT
    };
})();
var PS = PS || {};
PS.Text_Parsing_Parser = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Data_Either = PS.Data_Either;
    var Control_Monad_State_Class = PS.Control_Monad_State_Class;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Monad_Error = PS.Control_Monad_Error;
    function ParseError(value0) {
        this.value0 = value0;
    };
    ParseError.create = function (value0) {
        return new ParseError(value0);
    };
    function ParserT(value0) {
        this.value0 = value0;
    };
    ParserT.create = function (value0) {
        return new ParserT(value0);
    };
    var unParserT = function (_384) {
        return _384.value0;
    };
    var runParserT = function (__dict_Monad_295) {
        return function (s) {
            return function (p) {
                return Prelude[">>="](__dict_Monad_295["__superclass_Prelude.Bind_1"]({}))(unParserT(p)(s))(function (_28) {
                    return Prelude["return"](__dict_Monad_295)(_28.result);
                });
            };
        };
    };
    var runParser = function (s) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(runParserT(Control_Monad_Identity.monadIdentity({}))(s));
    };
    var monadTransParserT = function (_) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_296) {
            return function (m) {
                return ParserT.create(function (s) {
                    return Prelude["<$>"](((__dict_Monad_296["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(function (a) {
                        return {
                            input: s, 
                            consumed: false, 
                            result: new Data_Either.Right(a)
                        };
                    })(m);
                });
            };
        });
    };
    var monadStateParserT = function (__dict_Monad_297) {
        return new Control_Monad_State_Class.MonadState(function (f) {
            return ParserT.create(function (s) {
                return Prelude["return"](__dict_Monad_297)((function (_1248) {
                    return {
                        input: _1248.value1, 
                        consumed: false, 
                        result: new Data_Either.Right(_1248.value0)
                    };
                })(f(s)));
            });
        });
    };
    var functorParserT = function (__dict_Functor_299) {
        return new Prelude.Functor(function (f) {
            return function (p) {
                var f$prime = function (o) {
                    return {
                        input: o.input, 
                        result: Prelude["<$>"](Data_Either.functorEither({}))(f)(o.result), 
                        consumed: o.consumed
                    };
                };
                return ParserT.create(function (s) {
                    return Prelude["<$>"](__dict_Functor_299)(f$prime)(unParserT(p)(s));
                });
            };
        });
    };
    var fail = function (__dict_Monad_300) {
        return function (message) {
            return ParserT.create(function (s) {
                return Prelude["return"](__dict_Monad_300)({
                    input: s, 
                    consumed: false, 
                    result: new Data_Either.Left(new ParseError({
                        message: message
                    }))
                });
            });
        };
    };
    var errorParseError = function (_) {
        return new Control_Monad_Error.Error(new ParseError({
            message: ""
        }), function (msg) {
            return new ParseError({
                message: msg
            });
        });
    };
    var consume = function (__dict_Monad_301) {
        return ParserT.create(function (s) {
            return Prelude["return"](__dict_Monad_301)({
                consumed: true, 
                input: s, 
                result: new Data_Either.Right({})
            });
        });
    };
    var applicativeParserT = function (__dict_Monad_304) {
        return new Prelude.Applicative(function (_) {
            return applyParserT(__dict_Monad_304);
        }, function (a) {
            return ParserT.create(function (s) {
                return Prelude.pure(__dict_Monad_304["__superclass_Prelude.Applicative_0"]({}))({
                    input: s, 
                    result: new Data_Either.Right(a), 
                    consumed: false
                });
            });
        });
    };
    var applyParserT = function (__dict_Monad_303) {
        return new Prelude.Apply(Prelude.ap(monadParserT(__dict_Monad_303)), function (_) {
            return functorParserT(((__dict_Monad_303["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}));
        });
    };
    var monadParserT = function (__dict_Monad_298) {
        return new Prelude.Monad(function (_) {
            return applicativeParserT(__dict_Monad_298);
        }, function (_) {
            return bindParserT(__dict_Monad_298);
        });
    };
    var bindParserT = function (__dict_Monad_302) {
        return new Prelude.Bind(function (p) {
            return function (f) {
                var updateConsumedFlag = function (c) {
                    return function (o) {
                        return {
                            input: o.input, 
                            consumed: c || o.consumed, 
                            result: o.result
                        };
                    };
                };
                return ParserT.create(function (s) {
                    return Prelude[">>="](__dict_Monad_302["__superclass_Prelude.Bind_1"]({}))(unParserT(p)(s))(function (o) {
                        if (o.result instanceof Data_Either.Left) {
                            return Prelude["return"](__dict_Monad_302)({
                                input: o.input, 
                                result: new Data_Either.Left(o.result.value0), 
                                consumed: o.consumed
                            });
                        };
                        if (o.result instanceof Data_Either.Right) {
                            return Prelude["<$>"](((__dict_Monad_302["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(updateConsumedFlag(o.consumed))(unParserT(f(o.result.value0))(o.input));
                        };
                        throw new Error("Failed pattern match");
                    });
                });
            };
        }, function (_) {
            return applyParserT(__dict_Monad_302);
        });
    };
    var alternativeParserT = function (__dict_Monad_305) {
        return new Prelude.Alternative(function (p1) {
            return function (p2) {
                return ParserT.create(function (s) {
                    return Prelude[">>="](__dict_Monad_305["__superclass_Prelude.Bind_1"]({}))(unParserT(p1)(s))(function (o) {
                        if (o.result instanceof Data_Either.Left && !o.consumed) {
                            return unParserT(p2)(s);
                        };
                        return Prelude["return"](__dict_Monad_305)(o);
                    });
                });
            };
        }, fail(__dict_Monad_305)("No alternative"));
    };
    return {
        ParserT: ParserT, 
        ParseError: ParseError, 
        fail: fail, 
        consume: consume, 
        runParser: runParser, 
        runParserT: runParserT, 
        unParserT: unParserT, 
        errorParseError: errorParseError, 
        functorParserT: functorParserT, 
        applyParserT: applyParserT, 
        applicativeParserT: applicativeParserT, 
        alternativeParserT: alternativeParserT, 
        bindParserT: bindParserT, 
        monadParserT: monadParserT, 
        monadTransParserT: monadTransParserT, 
        monadStateParserT: monadStateParserT
    };
})();
var PS = PS || {};
PS.Text_Parsing_Parser_Combinators = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Data_Either = PS.Data_Either;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Tuple = PS.Data_Tuple;
    var $less$qmark$greater = function (__dict_Monad_306) {
        return function (p) {
            return function (msg) {
                return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_306))(p)(Text_Parsing_Parser.fail(__dict_Monad_306)("Expected " + msg));
            };
        };
    };
    var $$try = function (__dict_Functor_307) {
        return function (p) {
            var try$prime = function (_386) {
                return function (_387) {
                    if (_387.result instanceof Data_Either.Left) {
                        return {
                            input: _386, 
                            result: _387.result, 
                            consumed: false
                        };
                    };
                    return _387;
                };
            };
            return Text_Parsing_Parser.ParserT.create(function (s) {
                return Prelude["<$>"](__dict_Functor_307)(try$prime(s))(Text_Parsing_Parser.unParserT(p)(s));
            });
        };
    };
    var sepEndBy = function (__dict_Monad_308) {
        return function (p) {
            return function (sep) {
                return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_308))(sepEndBy1(__dict_Monad_308)(p)(sep))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_308))([  ]));
            };
        };
    };
    var sepEndBy1 = function (__dict_Monad_309) {
        return function (p) {
            return function (sep) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_309))(p)(function (_35) {
                    return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_309))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_309))(sep)(function (_) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_309))(sepEndBy(__dict_Monad_309)(p)(sep))(function (_34) {
                            return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_309))(Prelude[":"](_35)(_34));
                        });
                    }))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_309))([ _35 ]));
                });
            };
        };
    };
    var optional = function (__dict_Monad_310) {
        return function (p) {
            return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_310))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_310))(p)(function (_) {
                return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_310))({});
            }))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_310))({}));
        };
    };
    var option = function (__dict_Monad_311) {
        return function (a) {
            return function (p) {
                return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_311))(p)(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_311))(a));
            };
        };
    };
    var optionMaybe = function (__dict_Functor_312) {
        return function (__dict_Monad_313) {
            return function (p) {
                return option(__dict_Monad_313)(Data_Maybe.Nothing.value)(Prelude["<$>"](Text_Parsing_Parser.functorParserT(__dict_Functor_312))(Data_Maybe.Just.create)(p));
            };
        };
    };
    var many = function (__dict_Monad_314) {
        return function (p) {
            return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_314))(many1(__dict_Monad_314)(p))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_314))([  ]));
        };
    };
    var many1 = function (__dict_Monad_315) {
        return function (p) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_315))(p)(function (_30) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_315))(many(__dict_Monad_315)(p))(function (_29) {
                    return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_315))(Prelude[":"](_30)(_29));
                });
            });
        };
    };
    var sepBy1 = function (__dict_Monad_316) {
        return function (p) {
            return function (sep) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_316))(p)(function (_33) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_316))(many(__dict_Monad_316)(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_316))(sep)(function (_) {
                        return p;
                    })))(function (_32) {
                        return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_316))(Prelude[":"](_33)(_32));
                    });
                });
            };
        };
    };
    var sepBy = function (__dict_Monad_317) {
        return function (p) {
            return function (sep) {
                return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_317))(sepBy1(__dict_Monad_317)(p)(sep))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_317))([  ]));
            };
        };
    };
    var fix2 = function (f) {
        return new Data_Tuple.Tuple(Text_Parsing_Parser.ParserT.create(function (s) {
            return Text_Parsing_Parser.unParserT(Data_Tuple.fst(f(fix2(f))))(s);
        }), Text_Parsing_Parser.ParserT.create(function (s) {
            return Text_Parsing_Parser.unParserT(Data_Tuple.snd(f(fix2(f))))(s);
        }));
    };
    var fix = function (f) {
        return Text_Parsing_Parser.ParserT.create(function (s) {
            return Text_Parsing_Parser.unParserT(f(fix(f)))(s);
        });
    };
    var endBy1 = function (__dict_Monad_318) {
        return function (p) {
            return function (sep) {
                return many1(__dict_Monad_318)(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_318))(p)(function (_36) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_318))(sep)(function (_) {
                        return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_318))(_36);
                    });
                }));
            };
        };
    };
    var endBy = function (__dict_Monad_319) {
        return function (p) {
            return function (sep) {
                return many(__dict_Monad_319)(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_319))(p)(function (_37) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_319))(sep)(function (_) {
                        return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_319))(_37);
                    });
                }));
            };
        };
    };
    var choice = function (__dict_Monad_320) {
        return function (_385) {
            if (_385.length === 0) {
                return Text_Parsing_Parser.fail(__dict_Monad_320)("Nothing to parse");
            };
            if (_385.length === 1) {
                return _385[0];
            };
            if (_385.length > 0) {
                var _1271 = _385.slice(1);
                return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_320))(_385[0])(choice(__dict_Monad_320)(_1271));
            };
            throw new Error("Failed pattern match");
        };
    };
    var chainr1 = function (__dict_Monad_321) {
        return function (p) {
            return function (f) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_321))(p)(function (_41) {
                    return chainr1$prime(__dict_Monad_321)(p)(f)(_41);
                });
            };
        };
    };
    var chainr1$prime = function (__dict_Monad_322) {
        return function (p) {
            return function (f) {
                return function (a) {
                    return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_322))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_322))(f)(function (_43) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_322))(chainr1(__dict_Monad_322)(p)(f))(function (_42) {
                            return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_322))(_43(a)(_42));
                        });
                    }))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_322))(a));
                };
            };
        };
    };
    var chainr = function (__dict_Monad_323) {
        return function (p) {
            return function (f) {
                return function (a) {
                    return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_323))(chainr1(__dict_Monad_323)(p)(f))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_323))(a));
                };
            };
        };
    };
    var chainl1$prime = function (__dict_Monad_324) {
        return function (p) {
            return function (f) {
                return function (a) {
                    return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_324))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_324))(f)(function (_40) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_324))(p)(function (_39) {
                            return chainl1$prime(__dict_Monad_324)(p)(f)(_40(a)(_39));
                        });
                    }))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_324))(a));
                };
            };
        };
    };
    var chainl1 = function (__dict_Monad_325) {
        return function (p) {
            return function (f) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_325))(p)(function (_38) {
                    return chainl1$prime(__dict_Monad_325)(p)(f)(_38);
                });
            };
        };
    };
    var chainl = function (__dict_Monad_326) {
        return function (p) {
            return function (f) {
                return function (a) {
                    return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_326))(chainl1(__dict_Monad_326)(p)(f))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_326))(a));
                };
            };
        };
    };
    var between = function (__dict_Monad_327) {
        return function (open) {
            return function (close) {
                return function (p) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_327))(open)(function (_) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_327))(p)(function (_31) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_327))(close)(function (__1) {
                                return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_327))(_31);
                            });
                        });
                    });
                };
            };
        };
    };
    return {
        choice: choice, 
        "chainr1'": chainr1$prime, 
        chainr1: chainr1, 
        "chainl1'": chainl1$prime, 
        chainl1: chainl1, 
        chainl: chainl, 
        chainr: chainr, 
        endBy: endBy, 
        endBy1: endBy1, 
        sepEndBy1: sepEndBy1, 
        sepEndBy: sepEndBy, 
        sepBy1: sepBy1, 
        sepBy: sepBy, 
        "try": $$try, 
        optionMaybe: optionMaybe, 
        optional: optional, 
        option: option, 
        between: between, 
        "<?>": $less$qmark$greater, 
        many1: many1, 
        many: many, 
        fix2: fix2, 
        fix: fix
    };
})();
var PS = PS || {};
PS.Control_Lens_Internal_Prism = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Profunctor = PS.Data_Profunctor;
    var Data_Either = PS.Data_Either;
    var Data_Profunctor_Choice = PS.Data_Profunctor_Choice;
    function Market(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Market.create = function (value0) {
        return function (value1) {
            return new Market(value0, value1);
        };
    };
    var profunctorMarket = function (_) {
        return new Data_Profunctor.Profunctor(function (_390) {
            return function (_391) {
                return function (_392) {
                    return new Market(Prelude[">>>"](Prelude.semigroupoidArr({}))(_392.value0)(_391), Prelude[">>>"](Prelude.semigroupoidArr({}))(_390)(Prelude[">>>"](Prelude.semigroupoidArr({}))(_392.value1)(Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(_391)(Data_Either.Left.create))(Data_Either.Right.create))));
                };
            };
        });
    };
    var functorMarket = function (_) {
        return new Prelude.Functor(function (_388) {
            return function (_389) {
                return new Market(Prelude[">>>"](Prelude.semigroupoidArr({}))(_389.value0)(_388), Prelude[">>>"](Prelude.semigroupoidArr({}))(_389.value1)(Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(_388)(Data_Either.Left.create))(Data_Either.Right.create)));
            };
        });
    };
    var choiceMarket = function (_) {
        return new Data_Profunctor_Choice.Choice(function (__1) {
            return profunctorMarket({});
        }, function (_393) {
            return new Market(Prelude[">>>"](Prelude.semigroupoidArr({}))(_393.value0)(Data_Either.Left.create), function (thing) {
                if (thing instanceof Data_Either.Left) {
                    return Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Either.Left.create)(Data_Either.Left.create))(Data_Either.Right.create)(_393.value1(thing.value0));
                };
                if (thing instanceof Data_Either.Right) {
                    return Data_Either.Left.create(new Data_Either.Right(thing.value0));
                };
                throw new Error("Failed pattern match");
            });
        }, function (_394) {
            return new Market(Prelude[">>>"](Prelude.semigroupoidArr({}))(_394.value0)(Data_Either.Right.create), function (thing) {
                if (thing instanceof Data_Either.Left) {
                    return Data_Either.Left.create(new Data_Either.Left(thing.value0));
                };
                if (thing instanceof Data_Either.Right) {
                    return Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Either.Right.create)(Data_Either.Left.create))(Data_Either.Right.create)(_394.value1(thing.value0));
                };
                throw new Error("Failed pattern match");
            });
        });
    };
    return {
        Market: Market, 
        functorMarket: functorMarket, 
        profunctorMarket: profunctorMarket, 
        choiceMarket: choiceMarket
    };
})();
var PS = PS || {};
PS.Control_Lens_Internal_Iso = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Profunctor = PS.Data_Profunctor;
    function Exchange(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Exchange.create = function (value0) {
        return function (value1) {
            return new Exchange(value0, value1);
        };
    };
    var profunctorExchange = function (_) {
        return new Data_Profunctor.Profunctor(function (_397) {
            return function (_398) {
                return function (_399) {
                    return new Exchange(Prelude[">>>"](Prelude.semigroupoidArr({}))(_397)(_399.value0), Prelude[">>>"](Prelude.semigroupoidArr({}))(_399.value1)(_398));
                };
            };
        });
    };
    var functorExchange = function (_) {
        return new Prelude.Functor(function (_395) {
            return function (_396) {
                return new Exchange(_396.value0, Prelude[">>>"](Prelude.semigroupoidArr({}))(_396.value1)(_395));
            };
        });
    };
    return {
        Exchange: Exchange, 
        functorExchange: functorExchange, 
        profunctorExchange: profunctorExchange
    };
})();
var PS = PS || {};
PS.Control_Lens_Internal_Action = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Effective(__superclass_Data$dotContravariant$dotContravariant_0, __superclass_Prelude$dotFunctor_1, __superclass_Prelude$dotMonad_2, effective, ineffective) {
        this["__superclass_Data.Contravariant.Contravariant_0"] = __superclass_Data$dotContravariant$dotContravariant_0;
        this["__superclass_Prelude.Functor_1"] = __superclass_Prelude$dotFunctor_1;
        this["__superclass_Prelude.Monad_2"] = __superclass_Prelude$dotMonad_2;
        this.effective = effective;
        this.ineffective = ineffective;
    };
    var ineffective = function (dict) {
        return dict.ineffective;
    };
    var effective = function (dict) {
        return dict.effective;
    };
    return {
        Effective: Effective, 
        ineffective: ineffective, 
        effective: effective
    };
})();
var PS = PS || {};
PS.Control_Extend = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    function Extend($eq$greater$greater, __superclass_Prelude$dotFunctor_0) {
        this["=>>"] = $eq$greater$greater;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
    };
    var $eq$greater$greater = function (dict) {
        return dict["=>>"];
    };
    var extendIdentity = function (_) {
        return new Extend(function (w) {
            return function (f) {
                return Control_Monad_Identity.Identity.create(f(w));
            };
        }, function (__1) {
            return Control_Monad_Identity.functorIdentity({});
        });
    };
    return {
        Extend: Extend, 
        "=>>": $eq$greater$greater, 
        extendIdentity: extendIdentity
    };
})();
var PS = PS || {};
PS.Control_Comonad = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Control_Extend = PS.Control_Extend;
    function Comonad(__superclass_Control$dotExtend$dotExtend_0, extract) {
        this["__superclass_Control.Extend.Extend_0"] = __superclass_Control$dotExtend$dotExtend_0;
        this.extract = extract;
    };
    var extract = function (dict) {
        return dict.extract;
    };
    var extendComonad = function (_) {
        return new Comonad(function (__1) {
            return Control_Extend.extendIdentity({});
        }, Control_Monad_Identity.runIdentity);
    };
    return {
        Comonad: Comonad, 
        extract: extract, 
        extendComonad: extendComonad
    };
})();
var PS = PS || {};
PS.Control_Bind = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $greater$eq$greater = function (__dict_Bind_328) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return Prelude[">>="](__dict_Bind_328)(f(a))(g);
                };
            };
        };
    };
    var $eq$less$less = function (__dict_Bind_329) {
        return function (f) {
            return function (m) {
                return Prelude[">>="](__dict_Bind_329)(m)(f);
            };
        };
    };
    var $less$eq$less = function (__dict_Bind_330) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return $eq$less$less(__dict_Bind_330)(f)(g(a));
                };
            };
        };
    };
    var join = function (__dict_Bind_331) {
        return function (m) {
            return Prelude[">>="](__dict_Bind_331)(m)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var ifM = function (__dict_Bind_332) {
        return function (cond) {
            return function (t) {
                return function (f) {
                    return Prelude[">>="](__dict_Bind_332)(cond)(function (cond$prime) {
                        return cond$prime ? t : f;
                    });
                };
            };
        };
    };
    return {
        ifM: ifM, 
        join: join, 
        "<=<": $less$eq$less, 
        ">=>": $greater$eq$greater, 
        "=<<": $eq$less$less
    };
})();
var PS = PS || {};
PS.Control_Arrow = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    function Arrow(__superclass_Prelude$dotCategory_0, arr, first) {
        this["__superclass_Prelude.Category_0"] = __superclass_Prelude$dotCategory_0;
        this.arr = arr;
        this.first = first;
    };
    function ArrowZero(azero) {
        this.azero = azero;
    };
    function ArrowPlus($less$plus$greater) {
        this["<+>"] = $less$plus$greater;
    };
    var $less$plus$greater = function (dict) {
        return dict["<+>"];
    };
    var first = function (dict) {
        return dict.first;
    };
    var azero = function (dict) {
        return dict.azero;
    };
    var arrowFunction = function (_) {
        return new Arrow(function (__1) {
            return Prelude.categoryArr({});
        }, function (f) {
            return f;
        }, function (_400) {
            return function (_401) {
                return new Data_Tuple.Tuple(_400(_401.value0), _401.value1);
            };
        });
    };
    var arr = function (dict) {
        return dict.arr;
    };
    var second = function (__dict_Arrow_333) {
        return function (f) {
            return Prelude[">>>"]((__dict_Arrow_333["__superclass_Prelude.Category_0"]({}))["__superclass_Prelude.Semigroupoid_0"]({}))(arr(__dict_Arrow_333)(Data_Tuple.swap))(Prelude[">>>"]((__dict_Arrow_333["__superclass_Prelude.Category_0"]({}))["__superclass_Prelude.Semigroupoid_0"]({}))(first(__dict_Arrow_333)(f))(arr(__dict_Arrow_333)(Data_Tuple.swap)));
        };
    };
    var $times$times$times = function (__dict_Arrow_334) {
        return function (f) {
            return function (g) {
                return Prelude[">>>"]((__dict_Arrow_334["__superclass_Prelude.Category_0"]({}))["__superclass_Prelude.Semigroupoid_0"]({}))(first(__dict_Arrow_334)(f))(second(__dict_Arrow_334)(g));
            };
        };
    };
    var $amp$amp$amp = function (__dict_Arrow_335) {
        return function (f) {
            return function (g) {
                return Prelude[">>>"]((__dict_Arrow_335["__superclass_Prelude.Category_0"]({}))["__superclass_Prelude.Semigroupoid_0"]({}))(arr(__dict_Arrow_335)(function (b) {
                    return new Data_Tuple.Tuple(b, b);
                }))($times$times$times(__dict_Arrow_335)(f)(g));
            };
        };
    };
    return {
        ArrowPlus: ArrowPlus, 
        ArrowZero: ArrowZero, 
        Arrow: Arrow, 
        "<+>": $less$plus$greater, 
        azero: azero, 
        "&&&": $amp$amp$amp, 
        "***": $times$times$times, 
        second: second, 
        first: first, 
        arr: arr, 
        arrowFunction: arrowFunction
    };
})();
var PS = PS || {};
PS.Control_Arrow_ArrowApply = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Arrow = PS.Control_Arrow;
    function ArrowApply(__superclass_Control$dotArrow$dotArrow_0, app) {
        this["__superclass_Control.Arrow.Arrow_0"] = __superclass_Control$dotArrow$dotArrow_0;
        this.app = app;
    };
    var arrowApplyArr = function (_) {
        return new ArrowApply(function (__1) {
            return Control_Arrow.arrowFunction({});
        }, function (_402) {
            return _402.value0(_402.value1);
        });
    };
    var app = function (dict) {
        return dict.app;
    };
    return {
        ArrowApply: ArrowApply, 
        app: app, 
        arrowApplyArr: arrowApplyArr
    };
})();
var PS = PS || {};
PS.Control_Arrow_ArrowChoice = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Control_Arrow = PS.Control_Arrow;
    function ArrowChoice(__superclass_Control$dotArrow$dotArrow_0, left) {
        this["__superclass_Control.Arrow.Arrow_0"] = __superclass_Control$dotArrow$dotArrow_0;
        this.left = left;
    };
    var left = function (dict) {
        return dict.left;
    };
    var arrowChoiceArr = function (_) {
        return new ArrowChoice(function (__1) {
            return Control_Arrow.arrowFunction({});
        }, function (_403) {
            return function (_404) {
                if (_404 instanceof Data_Either.Left) {
                    return Data_Either.Left.create(_403(_404.value0));
                };
                if (_404 instanceof Data_Either.Right) {
                    return new Data_Either.Right(_404.value0);
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    return {
        ArrowChoice: ArrowChoice, 
        left: left, 
        arrowChoiceArr: arrowChoiceArr
    };
})();
var PS = PS || {};
PS.Control_Arrow_ArrowLoop = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function ArrowLoop(__superclass_Control$dotArrow$dotArrow_0, loop) {
        this["__superclass_Control.Arrow.Arrow_0"] = __superclass_Control$dotArrow$dotArrow_0;
        this.loop = loop;
    };
    var loop = function (dict) {
        return dict.loop;
    };
    return {
        ArrowLoop: ArrowLoop, 
        loop: loop
    };
})();
var PS = PS || {};
PS.Control_Arrow_Kleisli = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Arrow = PS.Control_Arrow;
    var Data_Tuple = PS.Data_Tuple;
    function Kleisli(value0) {
        this.value0 = value0;
    };
    Kleisli.create = function (value0) {
        return new Kleisli(value0);
    };
    var semigroupoidKleisli = function (__dict_Monad_336) {
        return new Prelude.Semigroupoid(function (_407) {
            return function (_408) {
                return new Kleisli(function (b) {
                    return Prelude[">>="](__dict_Monad_336["__superclass_Prelude.Bind_1"]({}))(_408.value0(b))(_407.value0);
                });
            };
        });
    };
    var runKleisli = function (_406) {
        return _406.value0;
    };
    var categoryKleisli = function (__dict_Monad_337) {
        return new Prelude.Category(function (_) {
            return semigroupoidKleisli(__dict_Monad_337);
        }, new Kleisli(Prelude["return"](__dict_Monad_337)));
    };
    var arrowKleisli = function (__dict_Monad_338) {
        return new Control_Arrow.Arrow(function (_) {
            return categoryKleisli(__dict_Monad_338);
        }, function (f) {
            return new Kleisli(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](__dict_Monad_338))(f));
        }, function (_409) {
            return new Kleisli(function (_405) {
                return Prelude[">>="](__dict_Monad_338["__superclass_Prelude.Bind_1"]({}))(_409.value0(_405.value0))(function (c) {
                    return Prelude["return"](__dict_Monad_338)(new Data_Tuple.Tuple(c, _405.value1));
                });
            });
        });
    };
    return {
        Kleisli: Kleisli, 
        runKleisli: runKleisli, 
        semigroupoidKleisli: semigroupoidKleisli, 
        categoryKleisli: categoryKleisli, 
        arrowKleisli: arrowKleisli
    };
})();
var PS = PS || {};
PS.Control_Apply = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $less$times = function (__dict_Apply_339) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_339)(Prelude["<$>"](__dict_Apply_339["__superclass_Prelude.Functor_0"]({}))(Prelude["const"])(a))(b);
            };
        };
    };
    var $times$greater = function (__dict_Apply_340) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_340)(Prelude["<$>"](__dict_Apply_340["__superclass_Prelude.Functor_0"]({}))(Prelude["const"](Prelude.id(Prelude.categoryArr({}))))(a))(b);
            };
        };
    };
    var lift5 = function (__dict_Apply_341) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return function (e) {
                                return Prelude["<*>"](__dict_Apply_341)(Prelude["<*>"](__dict_Apply_341)(Prelude["<*>"](__dict_Apply_341)(Prelude["<*>"](__dict_Apply_341)(Prelude["<$>"](__dict_Apply_341["__superclass_Prelude.Functor_0"]({}))(f)(a))(b))(c))(d))(e);
                            };
                        };
                    };
                };
            };
        };
    };
    var lift4 = function (__dict_Apply_342) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return Prelude["<*>"](__dict_Apply_342)(Prelude["<*>"](__dict_Apply_342)(Prelude["<*>"](__dict_Apply_342)(Prelude["<$>"](__dict_Apply_342["__superclass_Prelude.Functor_0"]({}))(f)(a))(b))(c))(d);
                        };
                    };
                };
            };
        };
    };
    var lift3 = function (__dict_Apply_343) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return Prelude["<*>"](__dict_Apply_343)(Prelude["<*>"](__dict_Apply_343)(Prelude["<$>"](__dict_Apply_343["__superclass_Prelude.Functor_0"]({}))(f)(a))(b))(c);
                    };
                };
            };
        };
    };
    var lift2 = function (__dict_Apply_344) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return Prelude["<*>"](__dict_Apply_344)(Prelude["<$>"](__dict_Apply_344["__superclass_Prelude.Functor_0"]({}))(f)(a))(b);
                };
            };
        };
    };
    var forever = function (__dict_Apply_345) {
        return function (a) {
            return $times$greater(__dict_Apply_345)(a)(forever(__dict_Apply_345)(a));
        };
    };
    return {
        forever: forever, 
        lift5: lift5, 
        lift4: lift4, 
        lift3: lift3, 
        lift2: lift2, 
        "*>": $times$greater, 
        "<*": $less$times
    };
})();
var PS = PS || {};
PS.Data_Foldable = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Apply = PS.Control_Apply;
    var Data_Monoid = PS.Data_Monoid;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Eq = PS.Data_Eq;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var Data_Monoid_First = PS.Data_Monoid_First;
    function Foldable(foldMap, foldl, foldr) {
        this.foldMap = foldMap;
        this.foldl = foldl;
        this.foldr = foldr;
    };
    function foldrArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = xs.length - 1; i >= 0; --i) {        acc = f(xs[i])(acc);      }      return acc;    }  }};
    function foldlArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = 0, len = xs.length; i < len; ++i) {        acc = f(acc)(xs[i]);      }      return acc;    }  }};
    var foldr = function (dict) {
        return dict.foldr;
    };
    var traverse_ = function (__dict_Applicative_346) {
        return function (__dict_Foldable_347) {
            return function (f) {
                return foldr(__dict_Foldable_347)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Apply["*>"](__dict_Applicative_346["__superclass_Prelude.Apply_0"]({})))(f))(Prelude.pure(__dict_Applicative_346)(Prelude.unit));
            };
        };
    };
    var for_ = function (__dict_Applicative_348) {
        return function (__dict_Foldable_349) {
            return Prelude.flip(traverse_(__dict_Applicative_348)(__dict_Foldable_349));
        };
    };
    var sequence_ = function (__dict_Applicative_350) {
        return function (__dict_Foldable_351) {
            return traverse_(__dict_Applicative_350)(__dict_Foldable_351)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var foldl = function (dict) {
        return dict.foldl;
    };
    var mconcat = function (__dict_Foldable_352) {
        return function (__dict_Monoid_353) {
            return foldl(__dict_Foldable_352)(Prelude["<>"](__dict_Monoid_353["__superclass_Prelude.Semigroup_0"]({})))(Data_Monoid.mempty(__dict_Monoid_353));
        };
    };
    var or = function (__dict_Foldable_354) {
        return foldl(__dict_Foldable_354)(Prelude["||"](Prelude.boolLikeBoolean({})))(false);
    };
    var product = function (__dict_Foldable_355) {
        return foldl(__dict_Foldable_355)(Prelude["*"](Prelude.numNumber({})))(1);
    };
    var sum = function (__dict_Foldable_356) {
        return foldl(__dict_Foldable_356)(Prelude["+"](Prelude.numNumber({})))(0);
    };
    var foldableTuple = function (_) {
        return new Foldable(function (__dict_Monoid_357) {
            return function (_441) {
                return function (_442) {
                    return _441(_442.value1);
                };
            };
        }, function (_438) {
            return function (_439) {
                return function (_440) {
                    return _438(_439)(_440.value1);
                };
            };
        }, function (_435) {
            return function (_436) {
                return function (_437) {
                    return _435(_437.value1)(_436);
                };
            };
        });
    };
    var foldableRef = function (_) {
        return new Foldable(function (__dict_Monoid_358) {
            return function (_433) {
                return function (_434) {
                    return _433(_434);
                };
            };
        }, function (_430) {
            return function (_431) {
                return function (_432) {
                    return _430(_431)(_432);
                };
            };
        }, function (_427) {
            return function (_428) {
                return function (_429) {
                    return _427(_429)(_428);
                };
            };
        });
    };
    var foldableMaybe = function (_) {
        return new Foldable(function (__dict_Monoid_359) {
            return function (_425) {
                return function (_426) {
                    if (_426 instanceof Data_Maybe.Nothing) {
                        return Data_Monoid.mempty(__dict_Monoid_359);
                    };
                    if (_426 instanceof Data_Maybe.Just) {
                        return _425(_426.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_422) {
            return function (_423) {
                return function (_424) {
                    if (_424 instanceof Data_Maybe.Nothing) {
                        return _423;
                    };
                    if (_424 instanceof Data_Maybe.Just) {
                        return _422(_423)(_424.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_419) {
            return function (_420) {
                return function (_421) {
                    if (_421 instanceof Data_Maybe.Nothing) {
                        return _420;
                    };
                    if (_421 instanceof Data_Maybe.Just) {
                        return _419(_421.value0)(_420);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var foldableEither = function (_) {
        return new Foldable(function (__dict_Monoid_360) {
            return function (_417) {
                return function (_418) {
                    if (_418 instanceof Data_Either.Left) {
                        return Data_Monoid.mempty(__dict_Monoid_360);
                    };
                    if (_418 instanceof Data_Either.Right) {
                        return _417(_418.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_414) {
            return function (_415) {
                return function (_416) {
                    if (_416 instanceof Data_Either.Left) {
                        return _415;
                    };
                    if (_416 instanceof Data_Either.Right) {
                        return _414(_415)(_416.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_411) {
            return function (_412) {
                return function (_413) {
                    if (_413 instanceof Data_Either.Left) {
                        return _412;
                    };
                    if (_413 instanceof Data_Either.Right) {
                        return _411(_413.value0)(_412);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var foldableArray = function (_) {
        return new Foldable(function (__dict_Monoid_361) {
            return function (f) {
                return function (xs) {
                    return foldr(foldableArray({}))(function (x) {
                        return function (acc) {
                            return Prelude["<>"](__dict_Monoid_361["__superclass_Prelude.Semigroup_0"]({}))(f(x))(acc);
                        };
                    })(Data_Monoid.mempty(__dict_Monoid_361))(xs);
                };
            };
        }, function (f) {
            return function (z) {
                return function (xs) {
                    return foldlArray(f)(z)(xs);
                };
            };
        }, function (f) {
            return function (z) {
                return function (xs) {
                    return foldrArray(f)(z)(xs);
                };
            };
        });
    };
    var foldMap = function (dict) {
        return dict.foldMap;
    };
    var lookup = function (__dict_Eq_362) {
        return function (__dict_Foldable_363) {
            return function (a) {
                return function (f) {
                    return Data_Monoid_First.runFirst(foldMap(__dict_Foldable_363)(Data_Monoid_First.monoidFirst({}))(function (_410) {
                        return new Data_Monoid_First.First(Prelude["=="](__dict_Eq_362)(a)(_410.value0) ? new Data_Maybe.Just(_410.value1) : Data_Maybe.Nothing.value);
                    })(f));
                };
            };
        };
    };
    var fold = function (__dict_Foldable_364) {
        return function (__dict_Monoid_365) {
            return foldMap(__dict_Foldable_364)(__dict_Monoid_365)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var find = function (__dict_Foldable_366) {
        return function (p) {
            return function (f) {
                return (function (_1381) {
                    if (_1381.length > 0) {
                        var _1383 = _1381.slice(1);
                        return new Data_Maybe.Just(_1381[0]);
                    };
                    if (_1381.length === 0) {
                        return Data_Maybe.Nothing.value;
                    };
                    throw new Error("Failed pattern match");
                })(foldMap(__dict_Foldable_366)(Data_Monoid.monoidArray({}))(function (x) {
                    return p(x) ? [ x ] : [  ];
                })(f));
            };
        };
    };
    var any = function (__dict_Foldable_367) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(or(foldableArray({})))(foldMap(__dict_Foldable_367)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    var elem = function (__dict_Eq_368) {
        return function (__dict_Foldable_369) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(any(__dict_Foldable_369))(Prelude["=="](__dict_Eq_368));
        };
    };
    var notElem = function (__dict_Eq_370) {
        return function (__dict_Foldable_371) {
            return function (x) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.not(Prelude.boolLikeBoolean({})))(elem(__dict_Eq_370)(__dict_Foldable_371)(x));
            };
        };
    };
    var and = function (__dict_Foldable_372) {
        return foldl(__dict_Foldable_372)(Prelude["&&"](Prelude.boolLikeBoolean({})))(true);
    };
    var all = function (__dict_Foldable_373) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(and(foldableArray({})))(foldMap(__dict_Foldable_373)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    return {
        Foldable: Foldable, 
        foldlArray: foldlArray, 
        foldrArray: foldrArray, 
        lookup: lookup, 
        find: find, 
        notElem: notElem, 
        elem: elem, 
        product: product, 
        sum: sum, 
        all: all, 
        any: any, 
        or: or, 
        and: and, 
        mconcat: mconcat, 
        sequence_: sequence_, 
        for_: for_, 
        traverse_: traverse_, 
        fold: fold, 
        foldMap: foldMap, 
        foldl: foldl, 
        foldr: foldr, 
        foldableArray: foldableArray, 
        foldableEither: foldableEither, 
        foldableMaybe: foldableMaybe, 
        foldableRef: foldableRef, 
        foldableTuple: foldableTuple
    };
})();
var PS = PS || {};
PS.Data_Map = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Foldable = PS.Data_Foldable;
    function Leaf() {

    };
    Leaf.value = new Leaf();
    function Two(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    Two.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new Two(value0, value1, value2, value3);
                };
            };
        };
    };
    function Three(value0, value1, value2, value3, value4, value5, value6) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
        this.value6 = value6;
    };
    Three.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return function (value6) {
                                return new Three(value0, value1, value2, value3, value4, value5, value6);
                            };
                        };
                    };
                };
            };
        };
    };
    function TwoLeft(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    TwoLeft.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new TwoLeft(value0, value1, value2);
            };
        };
    };
    function TwoRight(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    TwoRight.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new TwoRight(value0, value1, value2);
            };
        };
    };
    function ThreeLeft(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeLeft.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeLeft(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    function ThreeMiddle(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeMiddle.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeMiddle(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    function ThreeRight(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeRight.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeRight(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    function KickUp(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    KickUp.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new KickUp(value0, value1, value2, value3);
                };
            };
        };
    };
    var values = function (_453) {
        if (_453 instanceof Leaf) {
            return [  ];
        };
        if (_453 instanceof Two) {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_453.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _453.value2 ])(values(_453.value3)));
        };
        if (_453 instanceof Three) {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_453.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _453.value2 ])(Prelude["++"](Data_Array.semigroupArray({}))(values(_453.value3))(Prelude["++"](Data_Array.semigroupArray({}))([ _453.value5 ])(values(_453.value6)))));
        };
        throw new Error("Failed pattern match");
    };
    var toList = function (_451) {
        if (_451 instanceof Leaf) {
            return [  ];
        };
        if (_451 instanceof Two) {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_451.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ new Data_Tuple.Tuple(_451.value1, _451.value2) ])(toList(_451.value3)));
        };
        if (_451 instanceof Three) {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_451.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ new Data_Tuple.Tuple(_451.value1, _451.value2) ])(Prelude["++"](Data_Array.semigroupArray({}))(toList(_451.value3))(Prelude["++"](Data_Array.semigroupArray({}))([ new Data_Tuple.Tuple(_451.value4, _451.value5) ])(toList(_451.value6)))));
        };
        throw new Error("Failed pattern match");
    };
    var singleton = function (k) {
        return function (v) {
            return new Two(Leaf.value, k, v, Leaf.value);
        };
    };
    var showTree = function (__dict_Show_374) {
        return function (__dict_Show_375) {
            return function (_445) {
                if (_445 instanceof Leaf) {
                    return "Leaf";
                };
                if (_445 instanceof Two) {
                    return "Two (" + showTree(__dict_Show_374)(__dict_Show_375)(_445.value0) + ") (" + Prelude.show(__dict_Show_374)(_445.value1) + ") (" + Prelude.show(__dict_Show_375)(_445.value2) + ") (" + showTree(__dict_Show_374)(__dict_Show_375)(_445.value3) + ")";
                };
                if (_445 instanceof Three) {
                    return "Three (" + showTree(__dict_Show_374)(__dict_Show_375)(_445.value0) + ") (" + Prelude.show(__dict_Show_374)(_445.value1) + ") (" + Prelude.show(__dict_Show_375)(_445.value2) + ") (" + showTree(__dict_Show_374)(__dict_Show_375)(_445.value3) + ") (" + Prelude.show(__dict_Show_374)(_445.value4) + ") (" + Prelude.show(__dict_Show_375)(_445.value5) + ") (" + showTree(__dict_Show_374)(__dict_Show_375)(_445.value6) + ")";
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var showMap = function (__dict_Show_376) {
        return function (__dict_Show_377) {
            return new Prelude.Show(function (m) {
                return "fromList " + Prelude.show(Prelude.showArray(Data_Tuple.showTuple(__dict_Show_376)(__dict_Show_377)))(toList(m));
            });
        };
    };
    var lookup = function (__copy___dict_Ord_378) {
        return function (__copy__447) {
            return function (__copy__448) {
                var __dict_Ord_378 = __copy___dict_Ord_378;
                var _447 = __copy__447;
                var _448 = __copy__448;
                tco: while (true) {
                    if (_448 instanceof Leaf) {
                        return Data_Maybe.Nothing.value;
                    };
                    if (_448 instanceof Two && Prelude["=="](__dict_Ord_378["__superclass_Prelude.Eq_0"]({}))(_447)(_448.value1)) {
                        return new Data_Maybe.Just(_448.value2);
                    };
                    if (_448 instanceof Two && Prelude["<"](__dict_Ord_378)(_447)(_448.value1)) {
                        var __tco___dict_Ord_378 = __dict_Ord_378;
                        var __tco__447 = _447;
                        var __tco__448 = _448.value0;
                        __dict_Ord_378 = __tco___dict_Ord_378;
                        _447 = __tco__447;
                        _448 = __tco__448;
                        continue tco;
                    };
                    if (_448 instanceof Two) {
                        var __tco___dict_Ord_378 = __dict_Ord_378;
                        var __tco__447 = _447;
                        var __tco__448 = _448.value3;
                        __dict_Ord_378 = __tco___dict_Ord_378;
                        _447 = __tco__447;
                        _448 = __tco__448;
                        continue tco;
                    };
                    if (_448 instanceof Three && Prelude["=="](__dict_Ord_378["__superclass_Prelude.Eq_0"]({}))(_447)(_448.value1)) {
                        return new Data_Maybe.Just(_448.value2);
                    };
                    if (_448 instanceof Three && Prelude["=="](__dict_Ord_378["__superclass_Prelude.Eq_0"]({}))(_447)(_448.value4)) {
                        return new Data_Maybe.Just(_448.value5);
                    };
                    if (_448 instanceof Three && Prelude["<"](__dict_Ord_378)(_447)(_448.value1)) {
                        var __tco___dict_Ord_378 = __dict_Ord_378;
                        var __tco__447 = _447;
                        var __tco__448 = _448.value0;
                        __dict_Ord_378 = __tco___dict_Ord_378;
                        _447 = __tco__447;
                        _448 = __tco__448;
                        continue tco;
                    };
                    if (_448 instanceof Three && Prelude["<"](__dict_Ord_378)(_448.value1)(_447) && Prelude["<="](__dict_Ord_378)(_447)(_448.value4)) {
                        var __tco___dict_Ord_378 = __dict_Ord_378;
                        var __tco__447 = _447;
                        var __tco__448 = _448.value3;
                        __dict_Ord_378 = __tco___dict_Ord_378;
                        _447 = __tco__447;
                        _448 = __tco__448;
                        continue tco;
                    };
                    if (_448 instanceof Three) {
                        var __tco___dict_Ord_378 = __dict_Ord_378;
                        var __tco__447 = _447;
                        var __tco__448 = _448.value6;
                        __dict_Ord_378 = __tco___dict_Ord_378;
                        _447 = __tco__447;
                        _448 = __tco__448;
                        continue tco;
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    var member = function (__dict_Ord_379) {
        return function (k) {
            return function (m) {
                return Data_Maybe.isJust(lookup(__dict_Ord_379)(k)(m));
            };
        };
    };
    var keys = function (_452) {
        if (_452 instanceof Leaf) {
            return [  ];
        };
        if (_452 instanceof Two) {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_452.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _452.value1 ])(keys(_452.value3)));
        };
        if (_452 instanceof Three) {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_452.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _452.value1 ])(Prelude["++"](Data_Array.semigroupArray({}))(keys(_452.value3))(Prelude["++"](Data_Array.semigroupArray({}))([ _452.value4 ])(keys(_452.value6)))));
        };
        throw new Error("Failed pattern match");
    };
    var isEmpty = function (_446) {
        if (_446 instanceof Leaf) {
            return true;
        };
        return false;
    };
    var functorMap = function (_) {
        return new Prelude.Functor(function (_454) {
            return function (_455) {
                if (_455 instanceof Leaf) {
                    return Leaf.value;
                };
                if (_455 instanceof Two) {
                    return new Two(Prelude["<$>"](functorMap({}))(_454)(_455.value0), _455.value1, _454(_455.value2), Prelude["<$>"](functorMap({}))(_454)(_455.value3));
                };
                if (_455 instanceof Three) {
                    return new Three(Prelude["<$>"](functorMap({}))(_454)(_455.value0), _455.value1, _454(_455.value2), Prelude["<$>"](functorMap({}))(_454)(_455.value3), _455.value4, _454(_455.value5), Prelude["<$>"](functorMap({}))(_454)(_455.value6));
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var map = Prelude["<$>"](functorMap({}));
    var fromZipper = function (__copy___dict_Ord_380) {
        return function (__copy__449) {
            return function (__copy__450) {
                var __dict_Ord_380 = __copy___dict_Ord_380;
                var _449 = __copy__449;
                var _450 = __copy__450;
                tco: while (true) {
                    if (_449.length === 0) {
                        return _450;
                    };
                    if (_449.length > 0) {
                        var _1498 = _449.slice(1);
                        if (_449[0] instanceof TwoLeft) {
                            var __tco___dict_Ord_380 = __dict_Ord_380;
                            var __tco__450 = new Two(_450, (_449[0]).value0, (_449[0]).value1, (_449[0]).value2);
                            __dict_Ord_380 = __tco___dict_Ord_380;
                            _449 = _1498;
                            _450 = __tco__450;
                            continue tco;
                        };
                    };
                    if (_449.length > 0) {
                        var _1503 = _449.slice(1);
                        if (_449[0] instanceof TwoRight) {
                            var __tco___dict_Ord_380 = __dict_Ord_380;
                            var __tco__450 = new Two((_449[0]).value0, (_449[0]).value1, (_449[0]).value2, _450);
                            __dict_Ord_380 = __tco___dict_Ord_380;
                            _449 = _1503;
                            _450 = __tco__450;
                            continue tco;
                        };
                    };
                    if (_449.length > 0) {
                        var _1508 = _449.slice(1);
                        if (_449[0] instanceof ThreeLeft) {
                            var __tco___dict_Ord_380 = __dict_Ord_380;
                            var __tco__450 = new Three(_450, (_449[0]).value0, (_449[0]).value1, (_449[0]).value2, (_449[0]).value3, (_449[0]).value4, (_449[0]).value5);
                            __dict_Ord_380 = __tco___dict_Ord_380;
                            _449 = _1508;
                            _450 = __tco__450;
                            continue tco;
                        };
                    };
                    if (_449.length > 0) {
                        var _1516 = _449.slice(1);
                        if (_449[0] instanceof ThreeMiddle) {
                            var __tco___dict_Ord_380 = __dict_Ord_380;
                            var __tco__450 = new Three((_449[0]).value0, (_449[0]).value1, (_449[0]).value2, _450, (_449[0]).value3, (_449[0]).value4, (_449[0]).value5);
                            __dict_Ord_380 = __tco___dict_Ord_380;
                            _449 = _1516;
                            _450 = __tco__450;
                            continue tco;
                        };
                    };
                    if (_449.length > 0) {
                        var _1524 = _449.slice(1);
                        if (_449[0] instanceof ThreeRight) {
                            var __tco___dict_Ord_380 = __dict_Ord_380;
                            var __tco__450 = new Three((_449[0]).value0, (_449[0]).value1, (_449[0]).value2, (_449[0]).value3, (_449[0]).value4, (_449[0]).value5, _450);
                            __dict_Ord_380 = __tco___dict_Ord_380;
                            _449 = _1524;
                            _450 = __tco__450;
                            continue tco;
                        };
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    var insert = function (__dict_Ord_381) {
        var up = function (__copy___dict_Ord_382) {
            return function (__copy__461) {
                return function (__copy__462) {
                    var __dict_Ord_382 = __copy___dict_Ord_382;
                    var _461 = __copy__461;
                    var _462 = __copy__462;
                    tco: while (true) {
                        if (_461.length === 0) {
                            return new Two(_462.value0, _462.value1, _462.value2, _462.value3);
                        };
                        if (_461.length > 0) {
                            var _1542 = _461.slice(1);
                            if (_461[0] instanceof TwoLeft) {
                                return fromZipper(__dict_Ord_382)(_1542)(new Three(_462.value0, _462.value1, _462.value2, _462.value3, (_461[0]).value0, (_461[0]).value1, (_461[0]).value2));
                            };
                        };
                        if (_461.length > 0) {
                            var _1551 = _461.slice(1);
                            if (_461[0] instanceof TwoRight) {
                                return fromZipper(__dict_Ord_382)(_1551)(new Three((_461[0]).value0, (_461[0]).value1, (_461[0]).value2, _462.value0, _462.value1, _462.value2, _462.value3));
                            };
                        };
                        if (_461.length > 0) {
                            var _1560 = _461.slice(1);
                            if (_461[0] instanceof ThreeLeft) {
                                var __tco___dict_Ord_382 = __dict_Ord_382;
                                var __tco__462 = new KickUp(new Two(_462.value0, _462.value1, _462.value2, _462.value3), (_461[0]).value0, (_461[0]).value1, new Two((_461[0]).value2, (_461[0]).value3, (_461[0]).value4, (_461[0]).value5));
                                __dict_Ord_382 = __tco___dict_Ord_382;
                                _461 = _1560;
                                _462 = __tco__462;
                                continue tco;
                            };
                        };
                        if (_461.length > 0) {
                            var _1572 = _461.slice(1);
                            if (_461[0] instanceof ThreeMiddle) {
                                var __tco___dict_Ord_382 = __dict_Ord_382;
                                var __tco__462 = new KickUp(new Two((_461[0]).value0, (_461[0]).value1, (_461[0]).value2, _462.value0), _462.value1, _462.value2, new Two(_462.value3, (_461[0]).value3, (_461[0]).value4, (_461[0]).value5));
                                __dict_Ord_382 = __tco___dict_Ord_382;
                                _461 = _1572;
                                _462 = __tco__462;
                                continue tco;
                            };
                        };
                        if (_461.length > 0) {
                            var _1584 = _461.slice(1);
                            if (_461[0] instanceof ThreeRight) {
                                var __tco___dict_Ord_382 = __dict_Ord_382;
                                var __tco__462 = new KickUp(new Two((_461[0]).value0, (_461[0]).value1, (_461[0]).value2, (_461[0]).value3), (_461[0]).value4, (_461[0]).value5, new Two(_462.value0, _462.value1, _462.value2, _462.value3));
                                __dict_Ord_382 = __tco___dict_Ord_382;
                                _461 = _1584;
                                _462 = __tco__462;
                                continue tco;
                            };
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        var down = function (__copy___dict_Ord_383) {
            return function (__copy__457) {
                return function (__copy__458) {
                    return function (__copy__459) {
                        return function (__copy__460) {
                            var __dict_Ord_383 = __copy___dict_Ord_383;
                            var _457 = __copy__457;
                            var _458 = __copy__458;
                            var _459 = __copy__459;
                            var _460 = __copy__460;
                            tco: while (true) {
                                if (_460 instanceof Leaf) {
                                    return up(__dict_Ord_383)(_457)(new KickUp(Leaf.value, _458, _459, Leaf.value));
                                };
                                if (_460 instanceof Two && Prelude["=="](__dict_Ord_383["__superclass_Prelude.Eq_0"]({}))(_458)(_460.value1)) {
                                    return fromZipper(__dict_Ord_383)(_457)(new Two(_460.value0, _458, _459, _460.value3));
                                };
                                if (_460 instanceof Two && Prelude["<"](__dict_Ord_383)(_458)(_460.value1)) {
                                    var __tco___dict_Ord_383 = __dict_Ord_383;
                                    var __tco__457 = Prelude[":"](new TwoLeft(_460.value1, _460.value2, _460.value3))(_457);
                                    var __tco__458 = _458;
                                    var __tco__459 = _459;
                                    var __tco__460 = _460.value0;
                                    __dict_Ord_383 = __tco___dict_Ord_383;
                                    _457 = __tco__457;
                                    _458 = __tco__458;
                                    _459 = __tco__459;
                                    _460 = __tco__460;
                                    continue tco;
                                };
                                if (_460 instanceof Two) {
                                    var __tco___dict_Ord_383 = __dict_Ord_383;
                                    var __tco__457 = Prelude[":"](new TwoRight(_460.value0, _460.value1, _460.value2))(_457);
                                    var __tco__458 = _458;
                                    var __tco__459 = _459;
                                    var __tco__460 = _460.value3;
                                    __dict_Ord_383 = __tco___dict_Ord_383;
                                    _457 = __tco__457;
                                    _458 = __tco__458;
                                    _459 = __tco__459;
                                    _460 = __tco__460;
                                    continue tco;
                                };
                                if (_460 instanceof Three && Prelude["=="](__dict_Ord_383["__superclass_Prelude.Eq_0"]({}))(_458)(_460.value1)) {
                                    return fromZipper(__dict_Ord_383)(_457)(new Three(_460.value0, _458, _459, _460.value3, _460.value4, _460.value5, _460.value6));
                                };
                                if (_460 instanceof Three && Prelude["=="](__dict_Ord_383["__superclass_Prelude.Eq_0"]({}))(_458)(_460.value4)) {
                                    return fromZipper(__dict_Ord_383)(_457)(new Three(_460.value0, _460.value1, _460.value2, _460.value3, _458, _459, _460.value6));
                                };
                                if (_460 instanceof Three && Prelude["<"](__dict_Ord_383)(_458)(_460.value1)) {
                                    var __tco___dict_Ord_383 = __dict_Ord_383;
                                    var __tco__457 = Prelude[":"](new ThreeLeft(_460.value1, _460.value2, _460.value3, _460.value4, _460.value5, _460.value6))(_457);
                                    var __tco__458 = _458;
                                    var __tco__459 = _459;
                                    var __tco__460 = _460.value0;
                                    __dict_Ord_383 = __tco___dict_Ord_383;
                                    _457 = __tco__457;
                                    _458 = __tco__458;
                                    _459 = __tco__459;
                                    _460 = __tco__460;
                                    continue tco;
                                };
                                if (_460 instanceof Three && Prelude["<"](__dict_Ord_383)(_460.value1)(_458) && Prelude["<="](__dict_Ord_383)(_458)(_460.value4)) {
                                    var __tco___dict_Ord_383 = __dict_Ord_383;
                                    var __tco__457 = Prelude[":"](new ThreeMiddle(_460.value0, _460.value1, _460.value2, _460.value4, _460.value5, _460.value6))(_457);
                                    var __tco__458 = _458;
                                    var __tco__459 = _459;
                                    var __tco__460 = _460.value3;
                                    __dict_Ord_383 = __tco___dict_Ord_383;
                                    _457 = __tco__457;
                                    _458 = __tco__458;
                                    _459 = __tco__459;
                                    _460 = __tco__460;
                                    continue tco;
                                };
                                if (_460 instanceof Three) {
                                    var __tco___dict_Ord_383 = __dict_Ord_383;
                                    var __tco__457 = Prelude[":"](new ThreeRight(_460.value0, _460.value1, _460.value2, _460.value3, _460.value4, _460.value5))(_457);
                                    var __tco__458 = _458;
                                    var __tco__459 = _459;
                                    var __tco__460 = _460.value6;
                                    __dict_Ord_383 = __tco___dict_Ord_383;
                                    _457 = __tco__457;
                                    _458 = __tco__458;
                                    _459 = __tco__459;
                                    _460 = __tco__460;
                                    continue tco;
                                };
                                throw new Error("Failed pattern match");
                            };
                        };
                    };
                };
            };
        };
        return down(__dict_Ord_381)([  ]);
    };
    var union = function (__dict_Ord_384) {
        return function (m1) {
            return function (m2) {
                return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
                    return function (_444) {
                        return insert(__dict_Ord_384)(_444.value0)(_444.value1)(m);
                    };
                })(m2)(toList(m1));
            };
        };
    };
    var eqMap = function (__dict_Eq_385) {
        return function (__dict_Eq_386) {
            return new Prelude.Eq(function (m1) {
                return function (m2) {
                    return !Prelude["=="](eqMap(__dict_Eq_385)(__dict_Eq_386))(m1)(m2);
                };
            }, function (m1) {
                return function (m2) {
                    return Prelude["=="](Prelude.eqArray(Data_Tuple.eqTuple(__dict_Eq_385)(__dict_Eq_386)))(toList(m1))(toList(m2));
                };
            });
        };
    };
    var empty = Leaf.value;
    var fromList = function (__dict_Ord_387) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
            return function (_443) {
                return insert(__dict_Ord_387)(_443.value0)(_443.value1)(m);
            };
        })(empty);
    };
    var unions = function (__dict_Ord_388) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(union(__dict_Ord_388))(empty);
    };
    var $$delete = function (__dict_Ord_389) {
        var up = function (__copy___dict_Ord_390) {
            return function (__copy__466) {
                return function (__copy__467) {
                    var __dict_Ord_390 = __copy___dict_Ord_390;
                    var _466 = __copy__466;
                    var _467 = __copy__467;
                    tco: while (true) {
                        if (_466.length === 0) {
                            return _467;
                        };
                        if (_466.length > 0) {
                            var _1651 = _466.slice(1);
                            if (_466[0] instanceof TwoLeft && (_466[0]).value2 instanceof Leaf && _467 instanceof Leaf) {
                                return fromZipper(__dict_Ord_390)(_1651)(new Two(Leaf.value, (_466[0]).value0, (_466[0]).value1, Leaf.value));
                            };
                        };
                        if (_466.length > 0) {
                            var _1656 = _466.slice(1);
                            if (_466[0] instanceof TwoRight && (_466[0]).value0 instanceof Leaf && _467 instanceof Leaf) {
                                return fromZipper(__dict_Ord_390)(_1656)(new Two(Leaf.value, (_466[0]).value1, (_466[0]).value2, Leaf.value));
                            };
                        };
                        if (_466.length > 0) {
                            var _1661 = _466.slice(1);
                            if (_466[0] instanceof TwoLeft && (_466[0]).value2 instanceof Two) {
                                var __tco___dict_Ord_390 = __dict_Ord_390;
                                var __tco__467 = new Three(_467, (_466[0]).value0, (_466[0]).value1, (_466[0]).value2.value0, (_466[0]).value2.value1, (_466[0]).value2.value2, (_466[0]).value2.value3);
                                __dict_Ord_390 = __tco___dict_Ord_390;
                                _466 = _1661;
                                _467 = __tco__467;
                                continue tco;
                            };
                        };
                        if (_466.length > 0) {
                            var _1670 = _466.slice(1);
                            if (_466[0] instanceof TwoRight && (_466[0]).value0 instanceof Two) {
                                var __tco___dict_Ord_390 = __dict_Ord_390;
                                var __tco__467 = new Three((_466[0]).value0.value0, (_466[0]).value0.value1, (_466[0]).value0.value2, (_466[0]).value0.value3, (_466[0]).value1, (_466[0]).value2, _467);
                                __dict_Ord_390 = __tco___dict_Ord_390;
                                _466 = _1670;
                                _467 = __tco__467;
                                continue tco;
                            };
                        };
                        if (_466.length > 0) {
                            var _1679 = _466.slice(1);
                            if (_466[0] instanceof TwoLeft && (_466[0]).value2 instanceof Three) {
                                return fromZipper(__dict_Ord_390)(_1679)(new Two(new Two(_467, (_466[0]).value0, (_466[0]).value1, (_466[0]).value2.value0), (_466[0]).value2.value1, (_466[0]).value2.value2, new Two((_466[0]).value2.value3, (_466[0]).value2.value4, (_466[0]).value2.value5, (_466[0]).value2.value6)));
                            };
                        };
                        if (_466.length > 0) {
                            var _1691 = _466.slice(1);
                            if (_466[0] instanceof TwoRight && (_466[0]).value0 instanceof Three) {
                                return fromZipper(__dict_Ord_390)(_1691)(new Two(new Two((_466[0]).value0.value0, (_466[0]).value0.value1, (_466[0]).value0.value2, (_466[0]).value0.value3), (_466[0]).value0.value4, (_466[0]).value0.value5, new Two((_466[0]).value0.value6, (_466[0]).value1, (_466[0]).value2, _467)));
                            };
                        };
                        if (_466.length > 0) {
                            var _1703 = _466.slice(1);
                            if (_466[0] instanceof ThreeLeft && (_466[0]).value2 instanceof Leaf && (_466[0]).value5 instanceof Leaf && _467 instanceof Leaf) {
                                return fromZipper(__dict_Ord_390)(_1703)(new Three(Leaf.value, (_466[0]).value0, (_466[0]).value1, Leaf.value, (_466[0]).value3, (_466[0]).value4, Leaf.value));
                            };
                        };
                        if (_466.length > 0) {
                            var _1711 = _466.slice(1);
                            if (_466[0] instanceof ThreeMiddle && (_466[0]).value0 instanceof Leaf && (_466[0]).value5 instanceof Leaf && _467 instanceof Leaf) {
                                return fromZipper(__dict_Ord_390)(_1711)(new Three(Leaf.value, (_466[0]).value1, (_466[0]).value2, Leaf.value, (_466[0]).value3, (_466[0]).value4, Leaf.value));
                            };
                        };
                        if (_466.length > 0) {
                            var _1719 = _466.slice(1);
                            if (_466[0] instanceof ThreeRight && (_466[0]).value0 instanceof Leaf && (_466[0]).value3 instanceof Leaf && _467 instanceof Leaf) {
                                return fromZipper(__dict_Ord_390)(_1719)(new Three(Leaf.value, (_466[0]).value1, (_466[0]).value2, Leaf.value, (_466[0]).value4, (_466[0]).value5, Leaf.value));
                            };
                        };
                        if (_466.length > 0) {
                            var _1727 = _466.slice(1);
                            if (_466[0] instanceof ThreeLeft && (_466[0]).value2 instanceof Two) {
                                return fromZipper(__dict_Ord_390)(_1727)(new Two(new Three(_467, (_466[0]).value0, (_466[0]).value1, (_466[0]).value2.value0, (_466[0]).value2.value1, (_466[0]).value2.value2, (_466[0]).value2.value3), (_466[0]).value3, (_466[0]).value4, (_466[0]).value5));
                            };
                        };
                        if (_466.length > 0) {
                            var _1739 = _466.slice(1);
                            if (_466[0] instanceof ThreeMiddle && (_466[0]).value0 instanceof Two) {
                                return fromZipper(__dict_Ord_390)(_1739)(new Two(new Three((_466[0]).value0.value0, (_466[0]).value0.value1, (_466[0]).value0.value2, (_466[0]).value0.value3, (_466[0]).value1, (_466[0]).value2, _467), (_466[0]).value3, (_466[0]).value4, (_466[0]).value5));
                            };
                        };
                        if (_466.length > 0) {
                            var _1751 = _466.slice(1);
                            if (_466[0] instanceof ThreeMiddle && (_466[0]).value5 instanceof Two) {
                                return fromZipper(__dict_Ord_390)(_1751)(new Two((_466[0]).value0, (_466[0]).value1, (_466[0]).value2, new Three(_467, (_466[0]).value3, (_466[0]).value4, (_466[0]).value5.value0, (_466[0]).value5.value1, (_466[0]).value5.value2, (_466[0]).value5.value3)));
                            };
                        };
                        if (_466.length > 0) {
                            var _1763 = _466.slice(1);
                            if (_466[0] instanceof ThreeRight && (_466[0]).value3 instanceof Two) {
                                return fromZipper(__dict_Ord_390)(_1763)(new Two((_466[0]).value0, (_466[0]).value1, (_466[0]).value2, new Three((_466[0]).value3.value0, (_466[0]).value3.value1, (_466[0]).value3.value2, (_466[0]).value3.value3, (_466[0]).value4, (_466[0]).value5, _467)));
                            };
                        };
                        if (_466.length > 0) {
                            var _1775 = _466.slice(1);
                            if (_466[0] instanceof ThreeLeft && (_466[0]).value2 instanceof Three) {
                                return fromZipper(__dict_Ord_390)(_1775)(new Three(new Two(_467, (_466[0]).value0, (_466[0]).value1, (_466[0]).value2.value0), (_466[0]).value2.value1, (_466[0]).value2.value2, new Two((_466[0]).value2.value3, (_466[0]).value2.value4, (_466[0]).value2.value5, (_466[0]).value2.value6), (_466[0]).value3, (_466[0]).value4, (_466[0]).value5));
                            };
                        };
                        if (_466.length > 0) {
                            var _1790 = _466.slice(1);
                            if (_466[0] instanceof ThreeMiddle && (_466[0]).value0 instanceof Three) {
                                return fromZipper(__dict_Ord_390)(_1790)(new Three(new Two((_466[0]).value0.value0, (_466[0]).value0.value1, (_466[0]).value0.value2, (_466[0]).value0.value3), (_466[0]).value0.value4, (_466[0]).value0.value5, new Two((_466[0]).value0.value6, (_466[0]).value1, (_466[0]).value2, _467), (_466[0]).value3, (_466[0]).value4, (_466[0]).value5));
                            };
                        };
                        if (_466.length > 0) {
                            var _1805 = _466.slice(1);
                            if (_466[0] instanceof ThreeMiddle && (_466[0]).value5 instanceof Three) {
                                return fromZipper(__dict_Ord_390)(_1805)(new Three((_466[0]).value0, (_466[0]).value1, (_466[0]).value2, new Two(_467, (_466[0]).value3, (_466[0]).value4, (_466[0]).value5.value0), (_466[0]).value5.value1, (_466[0]).value5.value2, new Two((_466[0]).value5.value3, (_466[0]).value5.value4, (_466[0]).value5.value5, (_466[0]).value5.value6)));
                            };
                        };
                        if (_466.length > 0) {
                            var _1820 = _466.slice(1);
                            if (_466[0] instanceof ThreeRight && (_466[0]).value3 instanceof Three) {
                                return fromZipper(__dict_Ord_390)(_1820)(new Three((_466[0]).value0, (_466[0]).value1, (_466[0]).value2, new Two((_466[0]).value3.value0, (_466[0]).value3.value1, (_466[0]).value3.value2, (_466[0]).value3.value3), (_466[0]).value3.value4, (_466[0]).value3.value5, new Two((_466[0]).value3.value6, (_466[0]).value4, (_466[0]).value5, _467)));
                            };
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        var removeMaxNode = function (__copy___dict_Ord_391) {
            return function (__copy__469) {
                return function (__copy__470) {
                    var __dict_Ord_391 = __copy___dict_Ord_391;
                    var _469 = __copy__469;
                    var _470 = __copy__470;
                    tco: while (true) {
                        if (_470 instanceof Two && _470.value0 instanceof Leaf && _470.value3 instanceof Leaf) {
                            return up(__dict_Ord_391)(_469)(Leaf.value);
                        };
                        if (_470 instanceof Two) {
                            var __tco___dict_Ord_391 = __dict_Ord_391;
                            var __tco__469 = Prelude[":"](new TwoRight(_470.value0, _470.value1, _470.value2))(_469);
                            var __tco__470 = _470.value3;
                            __dict_Ord_391 = __tco___dict_Ord_391;
                            _469 = __tco__469;
                            _470 = __tco__470;
                            continue tco;
                        };
                        if (_470 instanceof Three && _470.value0 instanceof Leaf && _470.value3 instanceof Leaf && _470.value6 instanceof Leaf) {
                            return up(__dict_Ord_391)(Prelude[":"](new TwoRight(Leaf.value, _470.value1, _470.value2))(_469))(Leaf.value);
                        };
                        if (_470 instanceof Three) {
                            var __tco___dict_Ord_391 = __dict_Ord_391;
                            var __tco__469 = Prelude[":"](new ThreeRight(_470.value0, _470.value1, _470.value2, _470.value3, _470.value4, _470.value5))(_469);
                            var __tco__470 = _470.value6;
                            __dict_Ord_391 = __tco___dict_Ord_391;
                            _469 = __tco__469;
                            _470 = __tco__470;
                            continue tco;
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        var maxNode = function (__copy___dict_Ord_392) {
            return function (__copy__468) {
                var __dict_Ord_392 = __copy___dict_Ord_392;
                var _468 = __copy__468;
                tco: while (true) {
                    if (_468 instanceof Two && _468.value3 instanceof Leaf) {
                        return {
                            key: _468.value1, 
                            value: _468.value2
                        };
                    };
                    if (_468 instanceof Two) {
                        var __tco___dict_Ord_392 = __dict_Ord_392;
                        var __tco__468 = _468.value3;
                        __dict_Ord_392 = __tco___dict_Ord_392;
                        _468 = __tco__468;
                        continue tco;
                    };
                    if (_468 instanceof Three && _468.value6 instanceof Leaf) {
                        return {
                            key: _468.value4, 
                            value: _468.value5
                        };
                    };
                    if (_468 instanceof Three) {
                        var __tco___dict_Ord_392 = __dict_Ord_392;
                        var __tco__468 = _468.value6;
                        __dict_Ord_392 = __tco___dict_Ord_392;
                        _468 = __tco__468;
                        continue tco;
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
        var down = function (__copy___dict_Ord_393) {
            return function (__copy__463) {
                return function (__copy__464) {
                    return function (__copy__465) {
                        var __dict_Ord_393 = __copy___dict_Ord_393;
                        var _463 = __copy__463;
                        var _464 = __copy__464;
                        var _465 = __copy__465;
                        tco: while (true) {
                            if (_465 instanceof Leaf) {
                                return fromZipper(__dict_Ord_393)(_463)(Leaf.value);
                            };
                            if (_465 instanceof Two && _465.value0 instanceof Leaf && _465.value3 instanceof Leaf && Prelude["=="](__dict_Ord_393["__superclass_Prelude.Eq_0"]({}))(_464)(_465.value1)) {
                                return up(__dict_Ord_393)(_463)(Leaf.value);
                            };
                            if (_465 instanceof Two && Prelude["=="](__dict_Ord_393["__superclass_Prelude.Eq_0"]({}))(_464)(_465.value1)) {
                                var max = maxNode(__dict_Ord_393)(_465.value0);
                                return removeMaxNode(__dict_Ord_393)(Prelude[":"](new TwoLeft(max.key, max.value, _465.value3))(_463))(_465.value0);
                            };
                            if (_465 instanceof Two && Prelude["<"](__dict_Ord_393)(_464)(_465.value1)) {
                                var __tco___dict_Ord_393 = __dict_Ord_393;
                                var __tco__463 = Prelude[":"](new TwoLeft(_465.value1, _465.value2, _465.value3))(_463);
                                var __tco__464 = _464;
                                var __tco__465 = _465.value0;
                                __dict_Ord_393 = __tco___dict_Ord_393;
                                _463 = __tco__463;
                                _464 = __tco__464;
                                _465 = __tco__465;
                                continue tco;
                            };
                            if (_465 instanceof Two) {
                                var __tco___dict_Ord_393 = __dict_Ord_393;
                                var __tco__463 = Prelude[":"](new TwoRight(_465.value0, _465.value1, _465.value2))(_463);
                                var __tco__464 = _464;
                                var __tco__465 = _465.value3;
                                __dict_Ord_393 = __tco___dict_Ord_393;
                                _463 = __tco__463;
                                _464 = __tco__464;
                                _465 = __tco__465;
                                continue tco;
                            };
                            if (_465 instanceof Three && _465.value0 instanceof Leaf && _465.value3 instanceof Leaf && _465.value6 instanceof Leaf && Prelude["=="](__dict_Ord_393["__superclass_Prelude.Eq_0"]({}))(_464)(_465.value1)) {
                                return fromZipper(__dict_Ord_393)(_463)(new Two(Leaf.value, _465.value4, _465.value5, Leaf.value));
                            };
                            if (_465 instanceof Three && _465.value0 instanceof Leaf && _465.value3 instanceof Leaf && _465.value6 instanceof Leaf && Prelude["=="](__dict_Ord_393["__superclass_Prelude.Eq_0"]({}))(_464)(_465.value4)) {
                                return fromZipper(__dict_Ord_393)(_463)(new Two(Leaf.value, _465.value1, _465.value2, Leaf.value));
                            };
                            if (_465 instanceof Three && Prelude["=="](__dict_Ord_393["__superclass_Prelude.Eq_0"]({}))(_464)(_465.value1)) {
                                var max = maxNode(__dict_Ord_393)(_465.value0);
                                return removeMaxNode(__dict_Ord_393)(Prelude[":"](new ThreeLeft(max.key, max.value, _465.value3, _465.value4, _465.value5, _465.value6))(_463))(_465.value0);
                            };
                            if (_465 instanceof Three && Prelude["=="](__dict_Ord_393["__superclass_Prelude.Eq_0"]({}))(_464)(_465.value4)) {
                                var max = maxNode(__dict_Ord_393)(_465.value3);
                                return removeMaxNode(__dict_Ord_393)(Prelude[":"](new ThreeMiddle(_465.value0, _465.value1, _465.value2, max.key, max.value, _465.value6))(_463))(_465.value3);
                            };
                            if (_465 instanceof Three && Prelude["<"](__dict_Ord_393)(_464)(_465.value1)) {
                                var __tco___dict_Ord_393 = __dict_Ord_393;
                                var __tco__463 = Prelude[":"](new ThreeLeft(_465.value1, _465.value2, _465.value3, _465.value4, _465.value5, _465.value6))(_463);
                                var __tco__464 = _464;
                                var __tco__465 = _465.value0;
                                __dict_Ord_393 = __tco___dict_Ord_393;
                                _463 = __tco__463;
                                _464 = __tco__464;
                                _465 = __tco__465;
                                continue tco;
                            };
                            if (_465 instanceof Three && Prelude["<"](__dict_Ord_393)(_465.value1)(_464) && Prelude["<"](__dict_Ord_393)(_464)(_465.value4)) {
                                var __tco___dict_Ord_393 = __dict_Ord_393;
                                var __tco__463 = Prelude[":"](new ThreeMiddle(_465.value0, _465.value1, _465.value2, _465.value4, _465.value5, _465.value6))(_463);
                                var __tco__464 = _464;
                                var __tco__465 = _465.value3;
                                __dict_Ord_393 = __tco___dict_Ord_393;
                                _463 = __tco__463;
                                _464 = __tco__464;
                                _465 = __tco__465;
                                continue tco;
                            };
                            if (_465 instanceof Three) {
                                var __tco___dict_Ord_393 = __dict_Ord_393;
                                var __tco__463 = Prelude[":"](new ThreeRight(_465.value0, _465.value1, _465.value2, _465.value3, _465.value4, _465.value5))(_463);
                                var __tco__464 = _464;
                                var __tco__465 = _465.value6;
                                __dict_Ord_393 = __tco___dict_Ord_393;
                                _463 = __tco__463;
                                _464 = __tco__464;
                                _465 = __tco__465;
                                continue tco;
                            };
                            throw new Error("Failed pattern match");
                        };
                    };
                };
            };
        };
        return down(__dict_Ord_389)([  ]);
    };
    var checkValid = function (tree) {
        var allHeights = function (_456) {
            if (_456 instanceof Leaf) {
                return [ 0 ];
            };
            if (_456 instanceof Two) {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_456.value0))(allHeights(_456.value3)));
            };
            if (_456 instanceof Three) {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_456.value0))(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_456.value3))(allHeights(_456.value6))));
            };
            throw new Error("Failed pattern match");
        };
        return Data_Array.length(Data_Array.nub(Prelude.eqNumber({}))(allHeights(tree))) === 1;
    };
    var alter = function (__dict_Ord_394) {
        return function (f) {
            return function (k) {
                return function (m) {
                    return (function (_1961) {
                        if (_1961 instanceof Data_Maybe.Nothing) {
                            return $$delete(__dict_Ord_394)(k)(m);
                        };
                        if (_1961 instanceof Data_Maybe.Just) {
                            return insert(__dict_Ord_394)(k)(_1961.value0)(m);
                        };
                        throw new Error("Failed pattern match");
                    })(f(lookup(__dict_Ord_394)(k)(m)));
                };
            };
        };
    };
    var update = function (__dict_Ord_395) {
        return function (f) {
            return function (k) {
                return function (m) {
                    return alter(__dict_Ord_395)(Data_Maybe.maybe(Data_Maybe.Nothing.value)(f))(k)(m);
                };
            };
        };
    };
    return {
        map: map, 
        unions: unions, 
        union: union, 
        values: values, 
        keys: keys, 
        update: update, 
        alter: alter, 
        member: member, 
        "delete": $$delete, 
        fromList: fromList, 
        toList: toList, 
        lookup: lookup, 
        insert: insert, 
        checkValid: checkValid, 
        singleton: singleton, 
        isEmpty: isEmpty, 
        empty: empty, 
        showTree: showTree, 
        eqMap: eqMap, 
        showMap: showMap, 
        functorMap: functorMap
    };
})();
var PS = PS || {};
PS.Data_Set = (function () {
    "use strict";
    var Data_Map = PS.Data_Map;
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    function Set(value0) {
        this.value0 = value0;
    };
    Set.create = function (value0) {
        return new Set(value0);
    };
    var union = function (__dict_Ord_396) {
        return function (_480) {
            return function (_481) {
                return new Set(Data_Map.union(__dict_Ord_396)(_480.value0)(_481.value0));
            };
        };
    };
    var toList = function (_479) {
        return Data_Array.map(Data_Tuple.fst)(Data_Map.toList(_479.value0));
    };
    var singleton = function (a) {
        return new Set(Data_Map.singleton(a)(Prelude.unit));
    };
    var showSet = function (__dict_Show_397) {
        return new Prelude.Show(function (s) {
            return "fromList " + Prelude.show(Prelude.showArray(__dict_Show_397))(toList(s));
        });
    };
    var member = function (__dict_Ord_398) {
        return function (_473) {
            return function (_474) {
                return Data_Map.member(__dict_Ord_398)(_473)(_474.value0);
            };
        };
    };
    var isEmpty = function (_471) {
        return Data_Map.isEmpty(_471.value0);
    };
    var insert = function (__dict_Ord_399) {
        return function (_475) {
            return function (_476) {
                return new Set(Data_Map.insert(__dict_Ord_399)(_475)(Prelude.unit)(_476.value0));
            };
        };
    };
    var eqSet = function (__dict_Eq_400) {
        return new Prelude.Eq(function (_484) {
            return function (_485) {
                return Prelude["/="](Data_Map.eqMap(__dict_Eq_400)(Prelude.eqUnit({})))(_484.value0)(_485.value0);
            };
        }, function (_482) {
            return function (_483) {
                return Prelude["=="](Data_Map.eqMap(__dict_Eq_400)(Prelude.eqUnit({})))(_482.value0)(_483.value0);
            };
        });
    };
    var empty = new Set(Data_Map.empty);
    var fromList = function (__dict_Ord_401) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
            return function (a) {
                return insert(__dict_Ord_401)(a)(m);
            };
        })(empty);
    };
    var unions = function (__dict_Ord_402) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(union(__dict_Ord_402))(empty);
    };
    var $$delete = function (__dict_Ord_403) {
        return function (_477) {
            return function (_478) {
                return new Set(Data_Map["delete"](__dict_Ord_403)(_477)(_478.value0));
            };
        };
    };
    var checkValid = function (_472) {
        return Data_Map.checkValid(_472.value0);
    };
    return {
        unions: unions, 
        union: union, 
        fromList: fromList, 
        toList: toList, 
        "delete": $$delete, 
        member: member, 
        insert: insert, 
        checkValid: checkValid, 
        singleton: singleton, 
        isEmpty: isEmpty, 
        empty: empty, 
        eqSet: eqSet, 
        showSet: showSet
    };
})();
var PS = PS || {};
PS.Data_Traversable = (function () {
    "use strict";
    var Data_Tuple = PS.Data_Tuple;
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Eq = PS.Data_Eq;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var Data_Array = PS.Data_Array;
    function Traversable(__superclass_Data$dotFoldable$dotFoldable_1, __superclass_Prelude$dotFunctor_0, sequence, traverse) {
        this["__superclass_Data.Foldable.Foldable_1"] = __superclass_Data$dotFoldable$dotFoldable_1;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
        this.sequence = sequence;
        this.traverse = traverse;
    };
    var traverse = function (dict) {
        return dict.traverse;
    };
    var traversableTuple = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableTuple({});
        }, function (__1) {
            return Data_Tuple.functorTuple({});
        }, function (__dict_Applicative_405) {
            return function (_500) {
                return Prelude["<$>"]((__dict_Applicative_405["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.Tuple.create(_500.value0))(_500.value1);
            };
        }, function (__dict_Applicative_404) {
            return function (_498) {
                return function (_499) {
                    return Prelude["<$>"]((__dict_Applicative_404["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.Tuple.create(_499.value0))(_498(_499.value1));
                };
            };
        });
    };
    var traversableRef = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableRef({});
        }, function (__1) {
            return Data_Eq.functorRef({});
        }, function (__dict_Applicative_407) {
            return function (_494) {
                return Prelude["<$>"]((__dict_Applicative_407["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Eq.Ref.create)(_494);
            };
        }, function (__dict_Applicative_406) {
            return function (_492) {
                return function (_493) {
                    return Prelude["<$>"]((__dict_Applicative_406["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Eq.Ref.create)(_492(_493));
                };
            };
        });
    };
    var traversableMaybe = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableMaybe({});
        }, function (__1) {
            return Data_Maybe.functorMaybe({});
        }, function (__dict_Applicative_409) {
            return function (_497) {
                if (_497 instanceof Data_Maybe.Nothing) {
                    return Prelude.pure(__dict_Applicative_409)(Data_Maybe.Nothing.value);
                };
                if (_497 instanceof Data_Maybe.Just) {
                    return Prelude["<$>"]((__dict_Applicative_409["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Maybe.Just.create)(_497.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_408) {
            return function (_495) {
                return function (_496) {
                    if (_496 instanceof Data_Maybe.Nothing) {
                        return Prelude.pure(__dict_Applicative_408)(Data_Maybe.Nothing.value);
                    };
                    if (_496 instanceof Data_Maybe.Just) {
                        return Prelude["<$>"]((__dict_Applicative_408["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Maybe.Just.create)(_495(_496.value0));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var traversableEither = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableEither({});
        }, function (__1) {
            return Data_Either.functorEither({});
        }, function (__dict_Applicative_411) {
            return function (_491) {
                if (_491 instanceof Data_Either.Left) {
                    return Prelude.pure(__dict_Applicative_411)(new Data_Either.Left(_491.value0));
                };
                if (_491 instanceof Data_Either.Right) {
                    return Prelude["<$>"]((__dict_Applicative_411["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Right.create)(_491.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_410) {
            return function (_489) {
                return function (_490) {
                    if (_490 instanceof Data_Either.Left) {
                        return Prelude.pure(__dict_Applicative_410)(new Data_Either.Left(_490.value0));
                    };
                    if (_490 instanceof Data_Either.Right) {
                        return Prelude["<$>"]((__dict_Applicative_410["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Right.create)(_489(_490.value0));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var sequence = function (dict) {
        return dict.sequence;
    };
    var traversableArray = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableArray({});
        }, function (__1) {
            return Data_Array.functorArray({});
        }, function (__dict_Applicative_413) {
            return function (_488) {
                if (_488.length === 0) {
                    return Prelude.pure(__dict_Applicative_413)([  ]);
                };
                if (_488.length > 0) {
                    var _2014 = _488.slice(1);
                    return Prelude["<*>"](__dict_Applicative_413["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_413["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"])(_488[0]))(sequence(traversableArray({}))(__dict_Applicative_413)(_2014));
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_412) {
            return function (_486) {
                return function (_487) {
                    if (_487.length === 0) {
                        return Prelude.pure(__dict_Applicative_412)([  ]);
                    };
                    if (_487.length > 0) {
                        var _2018 = _487.slice(1);
                        return Prelude["<*>"](__dict_Applicative_412["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_412["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"])(_486(_487[0])))(traverse(traversableArray({}))(__dict_Applicative_412)(_486)(_2018));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var zipWithA = function (__dict_Applicative_414) {
        return function (f) {
            return function (xs) {
                return function (ys) {
                    return sequence(traversableArray({}))(__dict_Applicative_414)(Data_Array.zipWith(f)(xs)(ys));
                };
            };
        };
    };
    var $$for = function (__dict_Applicative_415) {
        return function (__dict_Traversable_416) {
            return function (x) {
                return function (f) {
                    return traverse(__dict_Traversable_416)(__dict_Applicative_415)(f)(x);
                };
            };
        };
    };
    return {
        Traversable: Traversable, 
        zipWithA: zipWithA, 
        "for": $$for, 
        sequence: sequence, 
        traverse: traverse, 
        traversableArray: traversableArray, 
        traversableEither: traversableEither, 
        traversableRef: traversableRef, 
        traversableMaybe: traversableMaybe, 
        traversableTuple: traversableTuple
    };
})();
var PS = PS || {};
PS.Control_Lens_Internal_Indexed = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Profunctor_Choice = PS.Data_Profunctor_Choice;
    var Data_Profunctor_Rep = PS.Data_Profunctor_Rep;
    var Control_Comonad = PS.Control_Comonad;
    var Data_Profunctor_Strong = PS.Data_Profunctor_Strong;
    var Data_Distributive = PS.Data_Distributive;
    var Control_Arrow_ArrowChoice = PS.Control_Arrow_ArrowChoice;
    var Control_Arrow_ArrowApply = PS.Control_Arrow_ArrowApply;
    function Indexing(value0) {
        this.value0 = value0;
    };
    Indexing.create = function (value0) {
        return new Indexing(value0);
    };
    function Conjoined(__superclass_Control$dotArrow$dotArrowApply$dotArrowApply_9, __superclass_Control$dotArrow$dotArrowChoice$dotArrowChoice_8, __superclass_Control$dotComonad$dotComonad_2, __superclass_Data$dotDistributive$dotDistributive_7, __superclass_Data$dotProfunctor$dotChoice$dotChoice_0, __superclass_Data$dotProfunctor$dotRep$dotCorepresentable_1, __superclass_Data$dotProfunctor$dotRep$dotRepresentable_5, __superclass_Data$dotProfunctor$dotStrong$dotStrong_4, __superclass_Data$dotTraversable$dotTraversable_3, __superclass_Prelude$dotMonad_6, conjoined, distrib) {
        this["__superclass_Control.Arrow.ArrowApply.ArrowApply_9"] = __superclass_Control$dotArrow$dotArrowApply$dotArrowApply_9;
        this["__superclass_Control.Arrow.ArrowChoice.ArrowChoice_8"] = __superclass_Control$dotArrow$dotArrowChoice$dotArrowChoice_8;
        this["__superclass_Control.Comonad.Comonad_2"] = __superclass_Control$dotComonad$dotComonad_2;
        this["__superclass_Data.Distributive.Distributive_7"] = __superclass_Data$dotDistributive$dotDistributive_7;
        this["__superclass_Data.Profunctor.Choice.Choice_0"] = __superclass_Data$dotProfunctor$dotChoice$dotChoice_0;
        this["__superclass_Data.Profunctor.Rep.Corepresentable_1"] = __superclass_Data$dotProfunctor$dotRep$dotCorepresentable_1;
        this["__superclass_Data.Profunctor.Rep.Representable_5"] = __superclass_Data$dotProfunctor$dotRep$dotRepresentable_5;
        this["__superclass_Data.Profunctor.Strong.Strong_4"] = __superclass_Data$dotProfunctor$dotStrong$dotStrong_4;
        this["__superclass_Data.Traversable.Traversable_3"] = __superclass_Data$dotTraversable$dotTraversable_3;
        this["__superclass_Prelude.Monad_6"] = __superclass_Prelude$dotMonad_6;
        this.conjoined = conjoined;
        this.distrib = distrib;
    };
    function Indexable(__superclass_Control$dotLens$dotInternal$dotIndexed$dotConjoined_0, indexed) {
        this["__superclass_Control.Lens.Internal.Indexed.Conjoined_0"] = __superclass_Control$dotLens$dotInternal$dotIndexed$dotConjoined_0;
        this.indexed = indexed;
    };
    var runIndexing = function (_501) {
        return _501.value0;
    };
    var indexed = function (dict) {
        return dict.indexed;
    };
    var foldableIdentity = function (_) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_419) {
            return function (a2m) {
                return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(a2m);
            };
        }, function (f) {
            return function (z) {
                return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(f(z));
            };
        }, function (f) {
            return function (z) {
                return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Prelude.flip(f)(z));
            };
        });
    };
    var traversableIdentity = function (_) {
        return new Data_Traversable.Traversable(function (__1) {
            return foldableIdentity({});
        }, function (__1) {
            return Control_Monad_Identity.functorIdentity({});
        }, function (__dict_Applicative_418) {
            return function (_508) {
                return Prelude["<$>"]((__dict_Applicative_418["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_508);
            };
        }, function (__dict_Applicative_417) {
            return function (_506) {
                return function (_507) {
                    return Prelude["<$>"]((__dict_Applicative_417["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_506(_507));
                };
            };
        });
    };
    var distrib = function (dict) {
        return dict.distrib;
    };
    var conjoinedArr = function (_) {
        return new Conjoined(function (__1) {
            return Control_Arrow_ArrowApply.arrowApplyArr({});
        }, function (__1) {
            return Control_Arrow_ArrowChoice.arrowChoiceArr({});
        }, function (__1) {
            return Control_Comonad.extendComonad({});
        }, function (__1) {
            return Data_Distributive.distributiveIdentity({});
        }, function (__1) {
            return Data_Profunctor_Choice.choiceArr({});
        }, function (__1) {
            return Data_Profunctor_Rep.corepresentableArrIdentity({});
        }, function (__1) {
            return Data_Profunctor_Rep.representableArrIdentity({});
        }, function (__1) {
            return Data_Profunctor_Strong.strongArr({});
        }, function (__1) {
            return traversableIdentity({});
        }, function (__1) {
            return Control_Monad_Identity.monadIdentity({});
        }, function (_502) {
            return function (_503) {
                return _502;
            };
        }, function (__dict_Functor_420) {
            return Prelude["<$>"](__dict_Functor_420);
        });
    };
    var indexableArr = function (_) {
        return new Indexable(function (__1) {
            return conjoinedArr({});
        }, function (_504) {
            return function (_505) {
                return _504;
            };
        });
    };
    var conjoined = function (dict) {
        return dict.conjoined;
    };
    return {
        Indexing: Indexing, 
        Indexable: Indexable, 
        Conjoined: Conjoined, 
        runIndexing: runIndexing, 
        indexed: indexed, 
        conjoined: conjoined, 
        distrib: distrib, 
        conjoinedArr: conjoinedArr, 
        indexableArr: indexableArr, 
        traversableIdentity: traversableIdentity, 
        foldableIdentity: foldableIdentity
    };
})();
var PS = PS || {};
PS.Control_Lens_Internal_Setter = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Profunctor = PS.Data_Profunctor;
    var Data_Distributive = PS.Data_Distributive;
    function Settable(__superclass_Data$dotDistributive$dotDistributive_1, __superclass_Data$dotTraversable$dotTraversable_2, __superclass_Prelude$dotApplicative_0, taintedDot, untainted, untaintedDot) {
        this["__superclass_Data.Distributive.Distributive_1"] = __superclass_Data$dotDistributive$dotDistributive_1;
        this["__superclass_Data.Traversable.Traversable_2"] = __superclass_Data$dotTraversable$dotTraversable_2;
        this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
        this.taintedDot = taintedDot;
        this.untainted = untainted;
        this.untaintedDot = untaintedDot;
    };
    var untaintedDot = function (dict) {
        return dict.untaintedDot;
    };
    var untainted = function (dict) {
        return dict.untainted;
    };
    var taintedDot = function (dict) {
        return dict.taintedDot;
    };
    var foldableIdentity = function (_) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_425) {
            return function (_516) {
                return function (_517) {
                    return _516(_517);
                };
            };
        }, function (_513) {
            return function (_514) {
                return function (_515) {
                    return _513(_514)(_515);
                };
            };
        }, function (_510) {
            return function (_511) {
                return function (_512) {
                    return _510(_512)(_511);
                };
            };
        });
    };
    var traversableIdentity = function (_) {
        return new Data_Traversable.Traversable(function (__1) {
            return foldableIdentity({});
        }, function (__1) {
            return Control_Monad_Identity.functorIdentity({});
        }, function (__dict_Applicative_422) {
            return function (_520) {
                return Prelude["<$>"]((__dict_Applicative_422["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_520);
            };
        }, function (__dict_Applicative_421) {
            return function (_518) {
                return function (_519) {
                    return Prelude["<$>"]((__dict_Applicative_421["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_518(_519));
                };
            };
        });
    };
    var settableIdentity = function (_) {
        return new Settable(function (__1) {
            return Data_Distributive.distributiveIdentity({});
        }, function (__1) {
            return traversableIdentity({});
        }, function (__1) {
            return Control_Monad_Identity.applicativeIdentity({});
        }, function (__dict_Profunctor_424) {
            return Data_Profunctor.rmap(__dict_Profunctor_424)(Control_Monad_Identity.Identity.create);
        }, function (_509) {
            return _509;
        }, function (__dict_Profunctor_423) {
            return Data_Profunctor.rmap(__dict_Profunctor_423)(Control_Monad_Identity.runIdentity);
        });
    };
    return {
        Settable: Settable, 
        taintedDot: taintedDot, 
        untaintedDot: untaintedDot, 
        untainted: untainted, 
        settableIdentity: settableIdentity, 
        foldableIdentity: foldableIdentity, 
        traversableIdentity: traversableIdentity
    };
})();
var PS = PS || {};
PS.Control_Lens_At = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Map = PS.Data_Map;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    function Ixed(ix) {
        this.ix = ix;
    };
    var ixedMaybeUnit = function (_) {
        return new Ixed(function (_521) {
            return function (__dict_Applicative_426) {
                return function (_522) {
                    return function (_523) {
                        if (_523 instanceof Data_Maybe.Nothing) {
                            return Prelude.pure(__dict_Applicative_426)(Data_Maybe.Nothing.value);
                        };
                        if (_523 instanceof Data_Maybe.Just) {
                            return Prelude["<$>"]((__dict_Applicative_426["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Maybe.Just.create)(_522(_523.value0));
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        });
    };
    var ixedMapKV = function (__dict_Ord_427) {
        return new Ixed(function (k) {
            return function (__dict_Applicative_428) {
                return function (v2fv) {
                    return function (mapKV) {
                        return (function (_2044) {
                            if (_2044 instanceof Data_Maybe.Nothing) {
                                return Prelude.pure(__dict_Applicative_428)(mapKV);
                            };
                            if (_2044 instanceof Data_Maybe.Just) {
                                return Prelude["<$>"]((__dict_Applicative_428["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(function (v$prime) {
                                    return Data_Map.insert(__dict_Ord_427)(k)(v$prime)(mapKV);
                                })(v2fv(_2044.value0));
                            };
                            throw new Error("Failed pattern match");
                        })(Data_Map.lookup(__dict_Ord_427)(k)(mapKV));
                    };
                };
            };
        });
    };
    var ixedIdentityAA = function (_) {
        return new Ixed(function (_524) {
            return function (__dict_Applicative_429) {
                return function (_525) {
                    return function (_526) {
                        return Prelude["<$>"]((__dict_Applicative_429["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_525(_526));
                    };
                };
            };
        });
    };
    var ixedArrEA = function (__dict_Eq_430) {
        return new Ixed(function (e) {
            return function (__dict_Applicative_431) {
                return function (a2fa) {
                    return function (e2a) {
                        return Prelude["<$>"]((__dict_Applicative_431["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(function (a) {
                            return function (e$prime) {
                                return Prelude["=="](__dict_Eq_430)(e)(e$prime) ? a : e2a(e$prime);
                            };
                        })(a2fa(e2a(e)));
                    };
                };
            };
        });
    };
    var ix = function (dict) {
        return dict.ix;
    };
    var ixedArrayNumberA = function (_) {
        return new Ixed(function (_527) {
            return function (__dict_Applicative_432) {
                return function (_528) {
                    return function (_529) {
                        if (_527 < 0) {
                            return Prelude.pure(__dict_Applicative_432)(_529);
                        };
                        if (_529.length === 0) {
                            return Prelude.pure(__dict_Applicative_432)([  ]);
                        };
                        if (_527 === 0 && _529.length > 0) {
                            var _2053 = _529.slice(1);
                            return Prelude["<$>"]((__dict_Applicative_432["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude.flip(Prelude[":"])(_2053))(_528(_529[0]));
                        };
                        if (_529.length > 0) {
                            var _2055 = _529.slice(1);
                            return Prelude["<$>"]((__dict_Applicative_432["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"](_529[0]))(ix(ixedArrayNumberA({}))(_527 - 1)(__dict_Applicative_432)(_528)(_2055));
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        });
    };
    return {
        Ixed: Ixed, 
        ix: ix, 
        ixedArrEA: ixedArrEA, 
        ixedMaybeUnit: ixedMaybeUnit, 
        ixedIdentityAA: ixedIdentityAA, 
        ixedArrayNumberA: ixedArrayNumberA, 
        ixedMapKV: ixedMapKV
    };
})();
var PS = PS || {};
PS.Control_Lens_Fold = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Profunctor = PS.Data_Profunctor;
    var Data_Either = PS.Data_Either;
    var Data_Profunctor_Choice = PS.Data_Profunctor_Choice;
    var filtered = function (__dict_Applicative_433) {
        return function (__dict_Choice_434) {
            return function (p) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Profunctor.dimap(__dict_Choice_434["__superclass_Data.Profunctor.Profunctor_0"]({}))(function (x) {
                    return p(x) ? new Data_Either.Right(x) : new Data_Either.Left(x);
                })(Data_Either.either(Prelude.pure(__dict_Applicative_433))(Prelude.id(Prelude.categoryArr({})))))(Data_Profunctor_Choice["right'"](__dict_Choice_434));
            };
        };
    };
    return {
        filtered: filtered
    };
})();
var PS = PS || {};
PS.Control_Lens_Getter = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Const = PS.Data_Const;
    var Control_Monad_Reader_Class = PS.Control_Monad_Reader_Class;
    var Control_Monad_State_Class = PS.Control_Monad_State_Class;
    var $up$dot = function (s) {
        return function (asa) {
            return Data_Const.getConst(asa(Data_Const.Const.create)(s));
        };
    };
    var view = function (__dict_Monad_435) {
        return function (__dict_MonadReader_436) {
            return function (ara) {
                return Control_Monad_Reader_Class.reader(__dict_Monad_435)(__dict_MonadReader_436)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Const.getConst)(ara(Data_Const.Const.create)));
            };
        };
    };
    var use = function (__dict_Monad_437) {
        return function (__dict_MonadState_438) {
            return function (asa) {
                return Control_Monad_State_Class.gets(__dict_Monad_437)(__dict_MonadState_438)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Const.getConst)(asa(Data_Const.Const.create)));
            };
        };
    };
    return {
        view: view, 
        use: use, 
        "^.": $up$dot
    };
})();
var PS = PS || {};
PS.Control_Lens_Indexed = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function FunctorWithIndex(__superclass_Prelude$dotFunctor_0, imap) {
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
        this.imap = imap;
    };
    function FoldableWithIndex(__superclass_Data$dotFoldable$dotFoldable_0, ifoldMap) {
        this["__superclass_Data.Foldable.Foldable_0"] = __superclass_Data$dotFoldable$dotFoldable_0;
        this.ifoldMap = ifoldMap;
    };
    function TraversableWithIndex(__superclass_Control$dotLens$dotIndexed$dotFoldableWithIndex_1, __superclass_Control$dotLens$dotIndexed$dotFunctorWithIndex_0, __superclass_Data$dotTraversable$dotTraversable_2, itraverse, itraversed) {
        this["__superclass_Control.Lens.Indexed.FoldableWithIndex_1"] = __superclass_Control$dotLens$dotIndexed$dotFoldableWithIndex_1;
        this["__superclass_Control.Lens.Indexed.FunctorWithIndex_0"] = __superclass_Control$dotLens$dotIndexed$dotFunctorWithIndex_0;
        this["__superclass_Data.Traversable.Traversable_2"] = __superclass_Data$dotTraversable$dotTraversable_2;
        this.itraverse = itraverse;
        this.itraversed = itraversed;
    };
    var itraversed = function (dict) {
        return dict.itraversed;
    };
    var itraverse = function (dict) {
        return dict.itraverse;
    };
    var imap = function (dict) {
        return dict.imap;
    };
    var ifoldMap = function (dict) {
        return dict.ifoldMap;
    };
    return {
        TraversableWithIndex: TraversableWithIndex, 
        FunctorWithIndex: FunctorWithIndex, 
        FoldableWithIndex: FoldableWithIndex, 
        itraversed: itraversed, 
        itraverse: itraverse, 
        ifoldMap: ifoldMap, 
        imap: imap
    };
})();
var PS = PS || {};
PS.Control_Lens_Lens = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var lens = function (s2a) {
        return function (s2b2t) {
            return function (__dict_Functor_439) {
                return function (a2fb) {
                    return function (s) {
                        return Prelude["<$>"](__dict_Functor_439)(s2b2t(s))(a2fb(s2a(s)));
                    };
                };
            };
        };
    };
    return {
        lens: lens
    };
})();
var PS = PS || {};
PS.Control_Lens_Prism = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens_Internal_Prism = PS.Control_Lens_Internal_Prism;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Either = PS.Data_Either;
    var Data_Profunctor = PS.Data_Profunctor;
    var Data_Profunctor_Choice = PS.Data_Profunctor_Choice;
    var Data_Maybe = PS.Data_Maybe;
    var withPrism = function (stab) {
        return function (f) {
            return (function (_2056) {
                return f(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(_2056.value0))(Prelude[">>>"](Prelude.semigroupoidArr({}))(_2056.value1)(Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Data_Either.Left.create))(Data_Either.Right.create)));
            })(stab(new Control_Lens_Internal_Prism.Market(Control_Monad_Identity.Identity.create, Data_Either.Right.create)));
        };
    };
    var prism = function (__dict_Applicative_440) {
        return function (__dict_Choice_441) {
            return function (b2t) {
                return function (s2Eta) {
                    return function (pafb) {
                        return Data_Profunctor.dimap(__dict_Choice_441["__superclass_Data.Profunctor.Profunctor_0"]({}))(s2Eta)(Data_Either.either(Prelude.pure(__dict_Applicative_440))(Prelude["<$>"]((__dict_Applicative_440["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(b2t)))(Data_Profunctor_Choice["right'"](__dict_Choice_441)(pafb));
                    };
                };
            };
        };
    };
    var prism$prime = function (b2s) {
        return function (s2Ma) {
            return function (__dict_Applicative_442) {
                return function (__dict_Choice_443) {
                    return prism(__dict_Applicative_442)(__dict_Choice_443)(b2s)(function (s) {
                        return Data_Maybe.maybe(new Data_Either.Left(s))(Data_Either.Right.create)(s2Ma(s));
                    });
                };
            };
        };
    };
    var clonePrism = function (__dict_Applicative_444) {
        return function (__dict_Choice_445) {
            return function (stab) {
                return withPrism(stab)(prism(__dict_Applicative_444)(__dict_Choice_445));
            };
        };
    };
    var _Right = function (__dict_Applicative_446) {
        return function (__dict_Choice_447) {
            return prism(__dict_Applicative_446)(__dict_Choice_447)(Data_Either.Right.create)(Data_Either.either(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Either.Left.create)(Data_Either.Left.create))(Data_Either.Right.create));
        };
    };
    var _Nothing = function (__dict_Applicative_448) {
        return function (__dict_Choice_449) {
            return prism$prime(Prelude["const"](Data_Maybe.Nothing.value))(Data_Maybe.maybe(Data_Maybe.Nothing.value)(Prelude["const"](new Data_Maybe.Just(Prelude.unit))))(__dict_Applicative_448)(__dict_Choice_449);
        };
    };
    var _Left = function (__dict_Applicative_450) {
        return function (__dict_Choice_451) {
            return prism(__dict_Applicative_450)(__dict_Choice_451)(Data_Either.Left.create)(Data_Either.either(Data_Either.Right.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Either.Left.create)(Data_Either.Right.create)));
        };
    };
    var _Just = function (__dict_Applicative_452) {
        return function (__dict_Choice_453) {
            return prism(__dict_Applicative_452)(__dict_Choice_453)(Data_Maybe.Just.create)(Data_Maybe.maybe(new Data_Either.Left(Data_Maybe.Nothing.value))(Data_Either.Right.create));
        };
    };
    return {
        _Nothing: _Nothing, 
        _Just: _Just, 
        _Right: _Right, 
        _Left: _Left, 
        withPrism: withPrism, 
        "prism'": prism$prime, 
        prism: prism, 
        clonePrism: clonePrism
    };
})();
var PS = PS || {};
PS.Control_Lens_Iso = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens_Internal_Iso = PS.Control_Lens_Internal_Iso;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Profunctor = PS.Data_Profunctor;
    var Data_Enum = PS.Data_Enum;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Monoid = PS.Data_Monoid;
    var withIso = function (stab) {
        return function (f) {
            return (function (_2059) {
                return f(_2059.value0)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(_2059.value1));
            })(stab(new Control_Lens_Internal_Iso.Exchange(Prelude.id(Prelude.categoryArr({})), Control_Monad_Identity.Identity.create)));
        };
    };
    var under = function (stab) {
        return withIso(stab)(function (s2a) {
            return function (b2t) {
                return function (t2s) {
                    return Prelude[">>>"](Prelude.semigroupoidArr({}))(b2t)(Prelude[">>>"](Prelude.semigroupoidArr({}))(t2s)(s2a));
                };
            };
        });
    };
    var iso = function (__dict_Profunctor_454) {
        return function (__dict_Functor_455) {
            return function (s2a) {
                return function (b2t) {
                    return Data_Profunctor.dimap(__dict_Profunctor_454)(s2a)(Prelude["<$>"](__dict_Functor_455)(b2t));
                };
            };
        };
    };
    var mapping = function (__dict_Functor_456) {
        return function (__dict_Functor_457) {
            return function (__dict_Profunctor_458) {
                return function (stab) {
                    return withIso(stab)(function (s2a) {
                        return function (b2t) {
                            return iso(__dict_Profunctor_458)(__dict_Functor_456)(Prelude["<$>"](__dict_Functor_456)(s2a))(Prelude["<$>"](__dict_Functor_457)(b2t));
                        };
                    });
                };
            };
        };
    };
    var from = function (__dict_Profunctor_459) {
        return function (__dict_Functor_460) {
            return function (stab) {
                return withIso(stab)(function (s2a) {
                    return function (b2t) {
                        return iso(__dict_Profunctor_459)(__dict_Functor_460)(b2t)(s2a);
                    };
                });
            };
        };
    };
    var $$enum = function (__dict_Enum_461) {
        return function (__dict_Monoid_462) {
            return function (__dict_Functor_463) {
                return function (__dict_Profunctor_464) {
                    return iso(__dict_Profunctor_464)(__dict_Functor_463)(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Enum.toEnum(__dict_Enum_461))(Data_Maybe.maybe(Data_Monoid.mempty(__dict_Monoid_462))(Prelude.id(Prelude.categoryArr({})))))(Data_Enum.fromEnum(__dict_Enum_461));
                };
            };
        };
    };
    var cloneIso = function (__dict_Profunctor_465) {
        return function (__dict_Functor_466) {
            return function (stab) {
                return withIso(stab)(iso(__dict_Profunctor_465)(__dict_Functor_466));
            };
        };
    };
    var auf = function (__dict_Profunctor_467) {
        return function (stab) {
            return withIso(stab)(function (s2a) {
                return function (b2t) {
                    return function (f) {
                        return function (prs) {
                            return function (e) {
                                return b2t(f(Data_Profunctor.rmap(__dict_Profunctor_467)(s2a)(prs))(e));
                            };
                        };
                    };
                };
            });
        };
    };
    var au = function (stab) {
        return withIso(stab)(function (s2a) {
            return function (b2t) {
                return function (f) {
                    return function (e) {
                        return s2a(f(b2t)(e));
                    };
                };
            };
        });
    };
    return {
        withIso: withIso, 
        under: under, 
        mapping: mapping, 
        iso: iso, 
        from: from, 
        "enum": $$enum, 
        cloneIso: cloneIso, 
        auf: auf, 
        au: au
    };
})();
var PS = PS || {};
PS.Control_Lens_Setter = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens_Internal_Setter = PS.Control_Lens_Internal_Setter;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Profunctor = PS.Data_Profunctor;
    var Data_Contravariant = PS.Data_Contravariant;
    var sets = function (__dict_Profunctor_468) {
        return function (__dict_Profunctor_469) {
            return function (__dict_Settable_470) {
                return function (pab2qst) {
                    return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Lens_Internal_Setter.untaintedDot(__dict_Settable_470)(__dict_Profunctor_468))(Prelude[">>>"](Prelude.semigroupoidArr({}))(pab2qst)(Control_Lens_Internal_Setter.taintedDot(__dict_Settable_470)(__dict_Profunctor_469)));
                };
            };
        };
    };
    var set$prime = function (sa) {
        return function (a) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(sa(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.Identity.create)(Prelude["const"](a))));
        };
    };
    var set = function (stab) {
        return function (b) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(stab(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.Identity.create)(Prelude["const"](b))));
        };
    };
    var $dot$tilde = set;
    var $qmark$tilde = function (stab) {
        return function (a) {
            return set(stab)(new Data_Maybe.Just(a));
        };
    };
    var over = function (__dict_Profunctor_471) {
        return function (pstab) {
            return function (pab) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(pstab(Data_Profunctor.rmap(__dict_Profunctor_471)(Control_Monad_Identity.Identity.create)(pab)));
            };
        };
    };
    var $percent$tilde = function (__dict_Profunctor_472) {
        return over(__dict_Profunctor_472);
    };
    var $amp$amp$tilde = function (__dict_BoolLike_473) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["&&"](__dict_BoolLike_473)(a));
            };
        };
    };
    var $times$tilde = function (__dict_Num_474) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["*"](__dict_Num_474)(a));
            };
        };
    };
    var $plus$plus$tilde = function (__dict_Semigroup_475) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["++"](__dict_Semigroup_475)(a));
            };
        };
    };
    var $plus$tilde = function (__dict_Num_476) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["+"](__dict_Num_476)(a));
            };
        };
    };
    var $minus$tilde = function (__dict_Num_477) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["-"](__dict_Num_477)(a));
            };
        };
    };
    var $div$tilde = function (__dict_Num_478) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["/"](__dict_Num_478)(a));
            };
        };
    };
    var $less$greater$tilde = function (__dict_Semigroup_479) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["<>"](__dict_Semigroup_479)(a));
            };
        };
    };
    var $bar$bar$tilde = function (__dict_BoolLike_480) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["||"](__dict_BoolLike_480)(a));
            };
        };
    };
    var mapped = function (__dict_Functor_481) {
        return function (__dict_Settable_482) {
            return sets(Data_Profunctor.profunctorArr({}))(Data_Profunctor.profunctorArr({}))(__dict_Settable_482)(Prelude["<$>"](__dict_Functor_481));
        };
    };
    var contramapped = function (__dict_Contravariant_483) {
        return function (__dict_Settable_484) {
            return sets(Data_Profunctor.profunctorArr({}))(Data_Profunctor.profunctorArr({}))(__dict_Settable_484)(Data_Contravariant[">$<"](__dict_Contravariant_483));
        };
    };
    var argument = function (__dict_Profunctor_485) {
        return function (__dict_Settable_486) {
            return sets(Data_Profunctor.profunctorArr({}))(Data_Profunctor.profunctorArr({}))(__dict_Settable_486)(Data_Profunctor.lmap(__dict_Profunctor_485));
        };
    };
    return {
        sets: sets, 
        "set'": set$prime, 
        set: set, 
        over: over, 
        mapped: mapped, 
        contramapped: contramapped, 
        argument: argument, 
        "?~": $qmark$tilde, 
        "++~": $plus$plus$tilde, 
        "<>~": $less$greater$tilde, 
        "&&~": $amp$amp$tilde, 
        "||~": $bar$bar$tilde, 
        "/~": $div$tilde, 
        "*~": $times$tilde, 
        "-~": $minus$tilde, 
        "+~": $plus$tilde, 
        ".~": $dot$tilde, 
        "%~": $percent$tilde
    };
})();
var PS = PS || {};
PS.Control_Lens_Tuple = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var $tilde = Data_Tuple.Tuple.create;
    var _2 = function (__dict_Functor_487) {
        return function (_532) {
            return function (_533) {
                return Prelude["<$>"](__dict_Functor_487)(Data_Tuple.Tuple.create(_533.value0))(_532(_533.value1));
            };
        };
    };
    var _1 = function (__dict_Functor_488) {
        return function (_530) {
            return function (_531) {
                return Prelude["<$>"](__dict_Functor_488)(function (b) {
                    return new Data_Tuple.Tuple(b, _531.value1);
                })(_530(_531.value0));
            };
        };
    };
    return {
        _2: _2, 
        _1: _1, 
        "~": $tilde
    };
})();
var PS = PS || {};
PS.Control_Lens = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens_Tuple = PS.Control_Lens_Tuple;
    var Control_Lens_Setter = PS.Control_Lens_Setter;
    var Control_Lens_Getter = PS.Control_Lens_Getter;
    var Control_Lens_Prism = PS.Control_Lens_Prism;
    var Control_Lens_Iso = PS.Control_Lens_Iso;
    var Control_Lens_Lens = PS.Control_Lens_Lens;
    var Control_Lens_At = PS.Control_Lens_At;
    var Control_Lens_Indexed = PS.Control_Lens_Indexed;
    var Control_Lens_Fold = PS.Control_Lens_Fold;
    var $tilde = Control_Lens_Tuple["~"];
    var $bar$bar$tilde = Control_Lens_Setter["||~"];
    var $up$dot = Control_Lens_Getter["^."];
    var $qmark$tilde = Control_Lens_Setter["?~"];
    var $less$greater$tilde = Control_Lens_Setter["<>~"];
    var $div$tilde = Control_Lens_Setter["/~"];
    var $dot$tilde = Control_Lens_Setter[".~"];
    var $dot$dot = Prelude["<<<"];
    var $minus$tilde = Control_Lens_Setter["-~"];
    var $plus$tilde = Control_Lens_Setter["+~"];
    var $plus$plus$tilde = Control_Lens_Setter["++~"];
    var $times$tilde = Control_Lens_Setter["*~"];
    var $amp$amp$tilde = Control_Lens_Setter["&&~"];
    var $percent$tilde = Control_Lens_Setter["%~"];
    var withPrism = Control_Lens_Prism.withPrism;
    var withIso = Control_Lens_Iso.withIso;
    var view = Control_Lens_Getter.view;
    var use = Control_Lens_Getter.use;
    var under = Control_Lens_Iso.under;
    var sets = Control_Lens_Setter.sets;
    var set$prime = Control_Lens_Setter["set'"];
    var set = Control_Lens_Setter.set;
    var prism$prime = Control_Lens_Prism["prism'"];
    var prism = Control_Lens_Prism.prism;
    var over = Control_Lens_Setter.over;
    var mapping = Control_Lens_Iso.mapping;
    var mapped = Control_Lens_Setter.mapped;
    var lens = Control_Lens_Lens.lens;
    var ix = Control_Lens_At.ix;
    var itraversed = Control_Lens_Indexed.itraversed;
    var itraverse = Control_Lens_Indexed.itraverse;
    var iso = Control_Lens_Iso.iso;
    var imap = Control_Lens_Indexed.imap;
    var ifoldMap = Control_Lens_Indexed.ifoldMap;
    var from = Control_Lens_Iso.from;
    var filtered = Control_Lens_Fold.filtered;
    var $$enum = Control_Lens_Iso["enum"];
    var contramapped = Control_Lens_Setter.contramapped;
    var clonePrism = Control_Lens_Prism.clonePrism;
    var cloneIso = Control_Lens_Iso.cloneIso;
    var auf = Control_Lens_Iso.auf;
    var au = Control_Lens_Iso.au;
    var argument = Control_Lens_Setter.argument;
    var _Right = Control_Lens_Prism._Right;
    var _Nothing = Control_Lens_Prism._Nothing;
    var _Left = Control_Lens_Prism._Left;
    var _Just = Control_Lens_Prism._Just;
    var _2 = Control_Lens_Tuple._2;
    var _1 = Control_Lens_Tuple._1;
    return {
        _2: _2, 
        _1: _1, 
        "~": $tilde, 
        sets: sets, 
        "set'": set$prime, 
        set: set, 
        over: over, 
        mapped: mapped, 
        contramapped: contramapped, 
        argument: argument, 
        "?~": $qmark$tilde, 
        "++~": $plus$plus$tilde, 
        "<>~": $less$greater$tilde, 
        "&&~": $amp$amp$tilde, 
        "||~": $bar$bar$tilde, 
        "/~": $div$tilde, 
        "*~": $times$tilde, 
        "-~": $minus$tilde, 
        "+~": $plus$tilde, 
        ".~": $dot$tilde, 
        "%~": $percent$tilde, 
        _Nothing: _Nothing, 
        _Just: _Just, 
        _Right: _Right, 
        _Left: _Left, 
        withPrism: withPrism, 
        "prism'": prism$prime, 
        prism: prism, 
        clonePrism: clonePrism, 
        lens: lens, 
        withIso: withIso, 
        under: under, 
        mapping: mapping, 
        iso: iso, 
        from: from, 
        "enum": $$enum, 
        cloneIso: cloneIso, 
        auf: auf, 
        au: au, 
        itraversed: itraversed, 
        itraverse: itraverse, 
        ifoldMap: ifoldMap, 
        imap: imap, 
        view: view, 
        use: use, 
        "^.": $up$dot, 
        filtered: filtered, 
        ix: ix, 
        "..": $dot$dot
    };
})();
var PS = PS || {};
PS.Data_Argonaut_Core = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Map = PS.Data_Map;
    var Control_Lens = PS.Control_Lens;
    var Data_Profunctor_Choice = PS.Data_Profunctor_Choice;
    function JsonNull(value0) {
        this.value0 = value0;
    };
    JsonNull.create = function (value0) {
        return new JsonNull(value0);
    };
    function JsonBoolean(value0) {
        this.value0 = value0;
    };
    JsonBoolean.create = function (value0) {
        return new JsonBoolean(value0);
    };
    function JsonNumber(value0) {
        this.value0 = value0;
    };
    JsonNumber.create = function (value0) {
        return new JsonNumber(value0);
    };
    function JsonString(value0) {
        this.value0 = value0;
    };
    JsonString.create = function (value0) {
        return new JsonString(value0);
    };
    function JsonArray(value0) {
        this.value0 = value0;
    };
    JsonArray.create = function (value0) {
        return new JsonArray(value0);
    };
    function JsonObject(value0) {
        this.value0 = value0;
    };
    JsonObject.create = function (value0) {
        return new JsonObject(value0);
    };
    function Foo(value0) {
        this.value0 = value0;
    };
    Foo.create = function (value0) {
        return new Foo(value0);
    };
    var verbJsonType = function (def) {
        return function (f) {
            return function (fold) {
                return fold(def)(f);
            };
        };
    };
    var toJsonType = verbJsonType(Data_Maybe.Nothing.value)(Data_Maybe.Just.create);
    var isJsonType = verbJsonType(false)(Prelude["const"](true));
    var fromString = JsonString.create;
    var jsonEmptyString = fromString("");
    var fromObject = JsonObject.create;
    var jsonEmptyObject = fromObject(Data_Map.empty);
    var jsonSingletonObject = function (key) {
        return function (val) {
            return fromObject(Data_Map.singleton(key)(val));
        };
    };
    var fromNumber = JsonNumber.create;
    var jsonZero = fromNumber(0);
    var fromNull = JsonNull.create;
    var jsonNull = fromNull(Prelude.unit);
    var fromBoolean = JsonBoolean.create;
    var jsonFalse = fromBoolean(false);
    var jsonTrue = fromBoolean(true);
    var fromArray = JsonArray.create;
    var jsonEmptyArray = fromArray([  ]);
    var jsonSingletonArray = function (j) {
        return fromArray([ j ]);
    };
    var foldJsonString = function (_550) {
        return function (_551) {
            return function (_552) {
                if (_552 instanceof JsonString) {
                    return _551(_552.value0);
                };
                return _550;
            };
        };
    };
    var isString = isJsonType(foldJsonString);
    var jsonStringL = function (__dict_Applicative_489) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_489)(Data_Profunctor_Choice.choiceArr({}))(isString));
    };
    var toString = toJsonType(foldJsonString);
    var stringL = function (__dict_Applicative_490) {
        return function (__dict_Choice_491) {
            return Control_Lens["prism'"](fromString)(toString)(__dict_Applicative_490)(__dict_Choice_491);
        };
    };
    var foldJsonObject = function (_556) {
        return function (_557) {
            return function (_558) {
                if (_558 instanceof JsonObject) {
                    return _557(_558.value0);
                };
                return _556;
            };
        };
    };
    var isObject = isJsonType(foldJsonObject);
    var jsonObjectL = function (__dict_Applicative_492) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_492)(Data_Profunctor_Choice.choiceArr({}))(isObject));
    };
    var toObject = toJsonType(foldJsonObject);
    var objectL = function (__dict_Applicative_493) {
        return function (__dict_Choice_494) {
            return Control_Lens["prism'"](fromObject)(toObject)(__dict_Applicative_493)(__dict_Choice_494);
        };
    };
    var foldJsonNumber = function (_547) {
        return function (_548) {
            return function (_549) {
                if (_549 instanceof JsonNumber) {
                    return _548(_549.value0);
                };
                return _547;
            };
        };
    };
    var isNumber = isJsonType(foldJsonNumber);
    var jsonNumberL = function (__dict_Applicative_495) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_495)(Data_Profunctor_Choice.choiceArr({}))(isNumber));
    };
    var toNumber = toJsonType(foldJsonNumber);
    var numberL = function (__dict_Applicative_496) {
        return function (__dict_Choice_497) {
            return Control_Lens["prism'"](fromNumber)(toNumber)(__dict_Applicative_496)(__dict_Choice_497);
        };
    };
    var foldJsonNull = function (_541) {
        return function (_542) {
            return function (_543) {
                if (_543 instanceof JsonNull) {
                    return _542(Prelude.unit);
                };
                return _541;
            };
        };
    };
    var isNull = isJsonType(foldJsonNull);
    var jsonNullL = function (__dict_Applicative_498) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_498)(Data_Profunctor_Choice.choiceArr({}))(isNull));
    };
    var toNull = toJsonType(foldJsonNull);
    var nullL = function (__dict_Applicative_499) {
        return function (__dict_Choice_500) {
            return Control_Lens["prism'"](fromNull)(toNull)(__dict_Applicative_499)(__dict_Choice_500);
        };
    };
    var foldJsonBoolean = function (_544) {
        return function (_545) {
            return function (_546) {
                if (_546 instanceof JsonBoolean) {
                    return _545(_546.value0);
                };
                return _544;
            };
        };
    };
    var isBoolean = isJsonType(foldJsonBoolean);
    var jsonBooleanL = function (__dict_Applicative_501) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_501)(Data_Profunctor_Choice.choiceArr({}))(isBoolean));
    };
    var toBoolean = toJsonType(foldJsonBoolean);
    var foldJsonArray = function (_553) {
        return function (_554) {
            return function (_555) {
                if (_555 instanceof JsonArray) {
                    return _554(_555.value0);
                };
                return _553;
            };
        };
    };
    var isArray = isJsonType(foldJsonArray);
    var jsonArrayL = function (__dict_Applicative_502) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_502)(Data_Profunctor_Choice.choiceArr({}))(isArray));
    };
    var toArray = toJsonType(foldJsonArray);
    var foldJson = function (_534) {
        return function (_535) {
            return function (_536) {
                return function (_537) {
                    return function (_538) {
                        return function (_539) {
                            return function (_540) {
                                if (_540 instanceof JsonNull) {
                                    return _534(Prelude.unit);
                                };
                                if (_540 instanceof JsonBoolean) {
                                    return _535(_540.value0);
                                };
                                if (_540 instanceof JsonNumber) {
                                    return _536(_540.value0);
                                };
                                if (_540 instanceof JsonString) {
                                    return _537(_540.value0);
                                };
                                if (_540 instanceof JsonArray) {
                                    return _538(_540.value0);
                                };
                                if (_540 instanceof JsonObject) {
                                    return _539(_540.value0);
                                };
                                throw new Error("Failed pattern match");
                            };
                        };
                    };
                };
            };
        };
    };
    var eqJson = function (_) {
        return new Prelude.Eq(function (j) {
            return function (j$prime) {
                return !Prelude["=="](eqJson({}))(j)(j$prime);
            };
        }, function (_559) {
            return function (_560) {
                if (_559 instanceof JsonNull && _560 instanceof JsonNull) {
                    return true;
                };
                if (_559 instanceof JsonBoolean && _560 instanceof JsonBoolean) {
                    return _559.value0 === _560.value0;
                };
                if (_559 instanceof JsonNumber && _560 instanceof JsonNumber) {
                    return _559.value0 === _560.value0;
                };
                if (_559 instanceof JsonString && _560 instanceof JsonString) {
                    return _559.value0 === _560.value0;
                };
                if (_559 instanceof JsonArray && _560 instanceof JsonArray) {
                    return Prelude["=="](Prelude.eqArray(eqJson({})))(_559.value0)(_560.value0);
                };
                if (_559 instanceof JsonObject && _560 instanceof JsonObject) {
                    return Prelude["=="](Data_Map.eqMap(Prelude.eqString({}))(eqJson({})))(_559.value0)(_560.value0);
                };
                return false;
            };
        });
    };
    var booleanL = function (__dict_Applicative_503) {
        return function (__dict_Choice_504) {
            return Control_Lens["prism'"](fromBoolean)(toBoolean)(__dict_Applicative_503)(__dict_Choice_504);
        };
    };
    var arrayL = function (__dict_Applicative_505) {
        return function (__dict_Choice_506) {
            return Control_Lens["prism'"](fromArray)(toArray)(__dict_Applicative_505)(__dict_Choice_506);
        };
    };
    return {
        JsonNull: JsonNull, 
        JsonBoolean: JsonBoolean, 
        JsonNumber: JsonNumber, 
        JsonString: JsonString, 
        JsonArray: JsonArray, 
        JsonObject: JsonObject, 
        Foo: Foo, 
        jsonObjectL: jsonObjectL, 
        jsonArrayL: jsonArrayL, 
        jsonStringL: jsonStringL, 
        jsonNumberL: jsonNumberL, 
        jsonBooleanL: jsonBooleanL, 
        jsonNullL: jsonNullL, 
        objectL: objectL, 
        arrayL: arrayL, 
        stringL: stringL, 
        numberL: numberL, 
        booleanL: booleanL, 
        nullL: nullL, 
        jsonSingletonObject: jsonSingletonObject, 
        jsonSingletonArray: jsonSingletonArray, 
        jsonEmptyObject: jsonEmptyObject, 
        jsonEmptyArray: jsonEmptyArray, 
        jsonEmptyString: jsonEmptyString, 
        jsonNull: jsonNull, 
        jsonZero: jsonZero, 
        jsonFalse: jsonFalse, 
        jsonTrue: jsonTrue, 
        fromObject: fromObject, 
        fromArray: fromArray, 
        fromString: fromString, 
        fromNumber: fromNumber, 
        fromBoolean: fromBoolean, 
        fromNull: fromNull, 
        toObject: toObject, 
        toArray: toArray, 
        toString: toString, 
        toNumber: toNumber, 
        toBoolean: toBoolean, 
        toNull: toNull, 
        toJsonType: toJsonType, 
        isObject: isObject, 
        isArray: isArray, 
        isString: isString, 
        isNumber: isNumber, 
        isBoolean: isBoolean, 
        isNull: isNull, 
        isJsonType: isJsonType, 
        verbJsonType: verbJsonType, 
        foldJsonObject: foldJsonObject, 
        foldJsonArray: foldJsonArray, 
        foldJsonString: foldJsonString, 
        foldJsonNumber: foldJsonNumber, 
        foldJsonBoolean: foldJsonBoolean, 
        foldJsonNull: foldJsonNull, 
        foldJson: foldJson, 
        eqJson: eqJson
    };
})();
var PS = PS || {};
PS.Data_Argonaut_Encode = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Map = PS.Data_Map;
    var Data_Tuple = PS.Data_Tuple;
    function EncodeJson(encodeJson) {
        this.encodeJson = encodeJson;
    };
    var showFoo = function (_) {
        return new Prelude.Show(function (_561) {
            return "Foo(" + Prelude.show(Prelude.showString({}))(_561.value0.foo) + ", " + Prelude.show(Prelude.showNumber({}))(_561.value0.bar) + ")";
        });
    };
    var encodeJsonIdIdJson = function (_) {
        return new EncodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Control_Monad_Identity.Identity.create));
    };
    var encodeJsonIdIdJString = function (_) {
        return new EncodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Argonaut_Core.fromString)(Control_Monad_Identity.Identity.create)));
    };
    var encodeJsonIdIdJObject = function (_) {
        return new EncodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Argonaut_Core.fromObject)(Control_Monad_Identity.Identity.create)));
    };
    var encodeJsonIdIdJNumber = function (_) {
        return new EncodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Argonaut_Core.fromNumber)(Control_Monad_Identity.Identity.create)));
    };
    var encodeJsonIdIdJNull = function (_) {
        return new EncodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Argonaut_Core.fromNull)(Control_Monad_Identity.Identity.create)));
    };
    var encodeJsonIdIdJBoolean = function (_) {
        return new EncodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Argonaut_Core.fromBoolean)(Control_Monad_Identity.Identity.create)));
    };
    var encodeJsonIdIdJArray = function (_) {
        return new EncodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Argonaut_Core.fromArray)(Control_Monad_Identity.Identity.create)));
    };
    var encodeJson = function (dict) {
        return dict.encodeJson;
    };
    var encodeIdentity = function (__dict_EncodeJson_507) {
        return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.Identity.create)(Prelude[">>>"](Prelude.semigroupoidArr({}))(encodeJson(__dict_EncodeJson_507))(Control_Monad_Identity.runIdentity));
    };
    var encodeFoo = function (_) {
        return new EncodeJson(function (_562) {
            return Control_Monad_Identity.Identity.create(Data_Argonaut_Core.JsonObject.create(Data_Map.fromList(Prelude.ordString({}))([ Data_Tuple.Tuple.create("foo")(new Data_Argonaut_Core.JsonString(_562.value0.foo)), Data_Tuple.Tuple.create("bar")(new Data_Argonaut_Core.JsonNumber(_562.value0.bar)) ])));
        });
    };
    return {
        EncodeJson: EncodeJson, 
        encodeIdentity: encodeIdentity, 
        encodeJson: encodeJson, 
        encodeJsonIdIdJNull: encodeJsonIdIdJNull, 
        encodeJsonIdIdJBoolean: encodeJsonIdIdJBoolean, 
        encodeJsonIdIdJNumber: encodeJsonIdIdJNumber, 
        encodeJsonIdIdJString: encodeJsonIdIdJString, 
        encodeJsonIdIdJArray: encodeJsonIdIdJArray, 
        encodeJsonIdIdJObject: encodeJsonIdIdJObject, 
        encodeJsonIdIdJson: encodeJsonIdIdJson, 
        showFoo: showFoo, 
        encodeFoo: encodeFoo
    };
})();
var PS = PS || {};
PS.Data_Argonaut_Combinators = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Data_Map = PS.Data_Map;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var $tilde$greater = function (_563) {
        return Data_Argonaut_Core.foldJsonObject(Data_Argonaut_Core.jsonSingletonObject(_563.value0)(_563.value1))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Map.insert(Prelude.ordString({}))(_563.value0)(_563.value1))(Data_Argonaut_Core.fromObject));
    };
    var $colon$eq = function (__dict_EncodeJson_508) {
        return function (key) {
            return function (val) {
                return Data_Tuple.Tuple.create(key)(Data_Argonaut_Encode.encodeIdentity(__dict_EncodeJson_508)(val));
            };
        };
    };
    return {
        "~>": $tilde$greater, 
        ":=": $colon$eq
    };
})();
var PS = PS || {};
PS.Data_Argonaut_Printer = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Map = PS.Data_Map;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    function Printer(printJson) {
        this.printJson = printJson;
    };
    var stringifyString = Prelude.show(Prelude.showString({}));
    var stringifyNumber = Prelude.show(Prelude.showNumber({}));
    var stringifyNull = function (_564) {
        return "null";
    };
    var stringifyField = Prelude.show(Prelude.showString({}));
    var stringifyBoolean = function (_565) {
        if (_565) {
            return "true";
        };
        if (!_565) {
            return "false";
        };
        throw new Error("Failed pattern match");
    };
    var stringify = function (json) {
        return Data_Argonaut_Core.foldJson(stringifyNull)(stringifyBoolean)(stringifyNumber)(stringifyString)(stringifyArray)(stringifyObject)(json);
    };
    var stringifyArray = function (_566) {
        if (_566.length === 0) {
            return "[]";
        };
        if (_566.length > 0) {
            var _2134 = _566.slice(1);
            var withComma = function (x_1) {
                return function (acc) {
                    return ", " + stringify(x_1) + acc;
                };
            };
            return "[" + stringify(_566[0]) + Data_Foldable.foldr(Data_Foldable.foldableArray({}))(withComma)("]")(_2134);
        };
        throw new Error("Failed pattern match");
    };
    var stringifyObject = function (objMap) {
        var one = function (_567) {
            return Prelude.show(Prelude.showString({}))(_567.value0) + ": " + stringify(_567.value1);
        };
        var withComma = function (x) {
            return function (acc) {
                return ", " + one(x) + acc;
            };
        };
        return (function (_2138) {
            if (_2138.length > 0) {
                var _2140 = _2138.slice(1);
                return "{" + one(_2138[0]) + Data_Foldable.foldr(Data_Foldable.foldableArray({}))(withComma)("}")(_2140);
            };
            return "{}";
        })(Data_Map.toList(objMap));
    };
    var printerIdIdJNull = function (_) {
        return new Printer(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Prelude[">>>"](Prelude.semigroupoidArr({}))(stringify)(Control_Monad_Identity.Identity.create)));
    };
    var printJson = function (dict) {
        return dict.printJson;
    };
    var printTo = function (__dict_Printer_509) {
        return printJson(__dict_Printer_509);
    };
    var printIdentity = function (__dict_Printer_510) {
        return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.Identity.create)(Prelude[">>>"](Prelude.semigroupoidArr({}))(printTo(__dict_Printer_510))(Control_Monad_Identity.runIdentity));
    };
    var printToString = printIdentity(printerIdIdJNull({}));
    var showJson = function (_) {
        return new Prelude.Show(printToString);
    };
    return {
        Printer: Printer, 
        stringifyObject: stringifyObject, 
        stringifyArray: stringifyArray, 
        stringifyField: stringifyField, 
        stringifyString: stringifyString, 
        stringifyNumber: stringifyNumber, 
        stringifyBoolean: stringifyBoolean, 
        stringifyNull: stringifyNull, 
        stringify: stringify, 
        printToString: printToString, 
        printIdentity: printIdentity, 
        printTo: printTo, 
        printJson: printJson, 
        printerIdIdJNull: printerIdIdJNull, 
        showJson: showJson
    };
})();
var PS = PS || {};
PS.Data_Argonaut_Decode = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Data_Either = PS.Data_Either;
    var Data_Maybe = PS.Data_Maybe;
    var Control_Lens = PS.Control_Lens;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Data_Profunctor_Choice = PS.Data_Profunctor_Choice;
    var Control_Lens_At = PS.Control_Lens_At;
    var Data_Map = PS.Data_Map;
    function DecodeJson(decodeJson) {
        this.decodeJson = decodeJson;
    };
    var decodeJsonIdESDRString = function (_) {
        return new DecodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Data_Argonaut_Core.foldJsonString(new Data_Either.Left("Not a String."))(Data_Either.Right.create)));
    };
    var decodeJsonIdESDRObject = function (_) {
        return new DecodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Data_Argonaut_Core.foldJsonObject(new Data_Either.Left("Not a Object."))(Data_Either.Right.create)));
    };
    var decodeJsonIdESDRNumber = function (_) {
        return new DecodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Data_Argonaut_Core.foldJsonNumber(new Data_Either.Left("Not a Number."))(Data_Either.Right.create)));
    };
    var decodeJsonIdESDRNull = function (_) {
        return new DecodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Data_Argonaut_Core.foldJsonNull(new Data_Either.Left("Not null."))(Data_Either.Right.create)));
    };
    var decodeJsonIdESDRJson = function (_) {
        return new DecodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Data_Either.Right.create));
    };
    var decodeJsonIdESDRBoolean = function (_) {
        return new DecodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Data_Argonaut_Core.foldJsonBoolean(new Data_Either.Left("Not a Boolean."))(Data_Either.Right.create)));
    };
    var decodeJsonIdESDRArray = function (_) {
        return new DecodeJson(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Data_Argonaut_Core.foldJsonArray(new Data_Either.Left("Not a Array."))(Data_Either.Right.create)));
    };
    var decodeJson = function (dict) {
        return dict.decodeJson;
    };
    var decodeMaybe = function (__dict_DecodeJson_511) {
        return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.Identity.create)(Prelude[">>>"](Prelude.semigroupoidArr({}))(decodeJson(__dict_DecodeJson_511))(Data_Either.either(Prelude["const"](Data_Maybe.Nothing.value))(Data_Maybe.Just.create)));
    };
    var decodeL = function (__dict_DecodeJson_512) {
        return function (__dict_EncodeJson_513) {
            return function (__dict_Applicative_514) {
                return function (__dict_Choice_515) {
                    return Control_Lens["prism'"](Data_Argonaut_Encode.encodeIdentity(__dict_EncodeJson_513))(decodeMaybe(__dict_DecodeJson_512))(__dict_Applicative_514)(__dict_Choice_515);
                };
            };
        };
    };
    var objectFieldL = function (__dict_DecodeJson_516) {
        return function (__dict_EncodeJson_517) {
            return function (key) {
                return function (__dict_Applicative_518) {
                    return Prelude[">>>"](Prelude.semigroupoidArr({}))(decodeL(__dict_DecodeJson_516)(__dict_EncodeJson_517)(__dict_Applicative_518)(Data_Profunctor_Choice.choiceArr({})))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Lens.ix(Control_Lens_At.ixedMapKV(Prelude.ordString({})))(key)(__dict_Applicative_518))(Data_Argonaut_Core.objectL(__dict_Applicative_518)(Data_Profunctor_Choice.choiceArr({}))));
                };
            };
        };
    };
    var decodeFoo = function (_) {
        return new DecodeJson(function (_568) {
            return Data_Maybe.maybe(new Data_Either.Left("Not a Foo."))(Data_Either.Right.create)(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Core.toObject(_568))(function (_46) {
                return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("foo")(_46))(Data_Argonaut_Core.toString))(function (_45) {
                    return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("bar")(_46))(Data_Argonaut_Core.toNumber))(function (_44) {
                        return Prelude.pure(Data_Maybe.applicativeMaybe({}))(new Data_Argonaut_Core.Foo({
                            foo: _45, 
                            bar: _44
                        }));
                    });
                });
            }));
        });
    };
    var arrayIndexL = function (__dict_DecodeJson_519) {
        return function (__dict_EncodeJson_520) {
            return function (i) {
                return function (__dict_Applicative_521) {
                    return Prelude[">>>"](Prelude.semigroupoidArr({}))(decodeL(__dict_DecodeJson_519)(__dict_EncodeJson_520)(__dict_Applicative_521)(Data_Profunctor_Choice.choiceArr({})))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Lens.ix(Control_Lens_At.ixedArrayNumberA({}))(i)(__dict_Applicative_521))(Data_Argonaut_Core.arrayL(__dict_Applicative_521)(Data_Profunctor_Choice.choiceArr({}))));
                };
            };
        };
    };
    return {
        DecodeJson: DecodeJson, 
        objectFieldL: objectFieldL, 
        arrayIndexL: arrayIndexL, 
        decodeL: decodeL, 
        decodeMaybe: decodeMaybe, 
        decodeJson: decodeJson, 
        decodeJsonIdESDRNull: decodeJsonIdESDRNull, 
        decodeJsonIdESDRBoolean: decodeJsonIdESDRBoolean, 
        decodeJsonIdESDRNumber: decodeJsonIdESDRNumber, 
        decodeJsonIdESDRString: decodeJsonIdESDRString, 
        decodeJsonIdESDRArray: decodeJsonIdESDRArray, 
        decodeJsonIdESDRObject: decodeJsonIdESDRObject, 
        decodeJsonIdESDRJson: decodeJsonIdESDRJson, 
        decodeFoo: decodeFoo
    };
})();
var PS = PS || {};
PS.Data_Foreign = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Function = PS.Data_Function;
    var Data_Either = PS.Data_Either;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Array = PS.Data_Array;
    function ForeignParser(value0) {
        this.value0 = value0;
    };
    ForeignParser.create = function (value0) {
        return new ForeignParser(value0);
    };
    function ReadForeign(read) {
        this.read = read;
    };
    function fromStringImpl(left, right, str) {   try {     return right(JSON.parse(str));   } catch (e) {     return left(e.toString());   } };
    function readPrimTypeImpl(left, right, typeName, value) {   if (toString.call(value) == '[object ' + typeName + ']') {     return right(value);  }   return left('Value is not a ' + typeName + ''); };
    function readMaybeImpl(nothing, just, value) {   return value === undefined || value === null ? nothing : just(value); };
    function readPropImpl(k, obj) {     return obj == undefined ? undefined : obj[k];};
    function readKeysImpl(left, right, k, obj) {   if (obj == undefined) {     return left('cannot get a key from an undefined or null value');   } else if (obj[k] == undefined) {     return left('value is undefined or null');   } else if (Array.isArray(obj[k])) {     return left('value is an array');   } else if (typeof obj[k] !== 'object') {     return left('value is not an object');   }   return right(Object.keys(obj[k])); };
    var showForeignImpl = JSON.stringify;;
    var showForeign = function (_) {
        return new Prelude.Show(showForeignImpl);
    };
    var readPrimType = function (ty) {
        return function (x) {
            return readPrimTypeImpl(Data_Either.Left.create, Data_Either.Right.create, ty, x);
        };
    };
    var readString = function (_) {
        return new ReadForeign(ForeignParser.create(readPrimType("String")));
    };
    var readNumber = function (_) {
        return new ReadForeign(ForeignParser.create(readPrimType("Number")));
    };
    var readMaybeImpl$prime = function (x) {
        return readMaybeImpl(Data_Maybe.Nothing.value, Data_Maybe.Just.create, x);
    };
    var readError = function (_) {
        return new ReadForeign(ForeignParser.create(readPrimType("Error")));
    };
    var readBoolean = function (_) {
        return new ReadForeign(ForeignParser.create(readPrimType("Boolean")));
    };
    var read = function (dict) {
        return dict.read;
    };
    var parseForeign = function (_569) {
        return function (_570) {
            return _569.value0(_570);
        };
    };
    var functorForeignParser = function (_) {
        return new Prelude.Functor(function (_571) {
            return function (_572) {
                return new ForeignParser(function (x) {
                    return Prelude["<$>"](Data_Either.functorEither({}))(_571)(_572.value0(x));
                });
            };
        });
    };
    var fromString = function (s) {
        return fromStringImpl(Data_Either.Left.create, Data_Either.Right.create, s);
    };
    var parseJSON = function (__dict_ReadForeign_526) {
        return function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(fromString(json))(parseForeign(read(__dict_ReadForeign_526)));
        };
    };
    var applyForeignParser = function (_) {
        return new Prelude.Apply(function (_575) {
            return function (_576) {
                return new ForeignParser(function (x) {
                    return (function (_2153) {
                        if (_2153 instanceof Data_Either.Left) {
                            return new Data_Either.Left(_2153.value0);
                        };
                        if (_2153 instanceof Data_Either.Right) {
                            return Prelude["<$>"](Data_Either.functorEither({}))(_2153.value0)(_576.value0(x));
                        };
                        throw new Error("Failed pattern match");
                    })(_575.value0(x));
                });
            };
        }, function (__1) {
            return functorForeignParser({});
        });
    };
    var bindForeignParser = function (_) {
        return new Prelude.Bind(function (_573) {
            return function (_574) {
                return new ForeignParser(function (x) {
                    return (function (_2160) {
                        if (_2160 instanceof Data_Either.Left) {
                            return new Data_Either.Left(_2160.value0);
                        };
                        if (_2160 instanceof Data_Either.Right) {
                            return parseForeign(_574(_2160.value0))(x);
                        };
                        throw new Error("Failed pattern match");
                    })(_573.value0(x));
                });
            };
        }, function (__1) {
            return applyForeignParser({});
        });
    };
    var index = function (__dict_ReadForeign_525) {
        return function (i) {
            return Prelude[">>="](bindForeignParser({}))(new ForeignParser(function (x) {
                return Data_Either.Right.create(readIndexImpl$prime(i)(x));
            }))(function (x) {
                return new ForeignParser(function (_) {
                    return (function (_2164) {
                        if (_2164 instanceof Data_Either.Right) {
                            return new Data_Either.Right(_2164.value0);
                        };
                        if (_2164 instanceof Data_Either.Left) {
                            return Data_Either.Left.create("Error reading index '" + Prelude.show(Prelude.showNumber({}))(i) + "':\n" + _2164.value0);
                        };
                        throw new Error("Failed pattern match");
                    })(parseForeign(read(__dict_ReadForeign_525))(x));
                });
            });
        };
    };
    var readIndexImpl$prime = function (index_1) {
        return function (x) {
            return readPropImpl(index_1, x);
        };
    };
    var prop = function (__dict_ReadForeign_522) {
        return function (p) {
            return Prelude[">>="](bindForeignParser({}))(new ForeignParser(function (x) {
                return Data_Either.Right.create(readPropImpl$prime(p)(x));
            }))(function (x) {
                return new ForeignParser(function (_) {
                    return (function (_2167) {
                        if (_2167 instanceof Data_Either.Right) {
                            return new Data_Either.Right(_2167.value0);
                        };
                        if (_2167 instanceof Data_Either.Left) {
                            return Data_Either.Left.create("Error reading property '" + p + "':\n" + _2167.value0);
                        };
                        throw new Error("Failed pattern match");
                    })(parseForeign(read(__dict_ReadForeign_522))(x));
                });
            });
        };
    };
    var readPropImpl$prime = function (prop_1) {
        return function (x) {
            return readPropImpl(prop_1, x);
        };
    };
    var readKeysImpl$prime = function (prop_1) {
        return function (x) {
            return readKeysImpl(Data_Either.Left.create, Data_Either.Right.create, prop_1, x);
        };
    };
    var keys = function (p) {
        return new ForeignParser(function (x) {
            return (function (_2170) {
                if (_2170 instanceof Data_Either.Right) {
                    return new Data_Either.Right(_2170.value0);
                };
                if (_2170 instanceof Data_Either.Left) {
                    return Data_Either.Left.create("Error reading object keys of '" + p + "':\n" + _2170.value0);
                };
                throw new Error("Failed pattern match");
            })(readKeysImpl$prime(p)(x));
        });
    };
    var readArray = function (__dict_ReadForeign_523) {
        return new ReadForeign((function () {
            var arrayItem = function (_577) {
                return (function (_2174) {
                    if (_2174 instanceof Data_Either.Right) {
                        return new Data_Either.Right(_2174.value0);
                    };
                    if (_2174 instanceof Data_Either.Left) {
                        return Data_Either.Left.create("Error reading item at index " + Prelude.show(Prelude.showNumber({}))(_577.value0) + ":\n" + _2174.value0);
                    };
                    throw new Error("Failed pattern match");
                })(parseForeign(read(__dict_ReadForeign_523))(_577.value1));
            };
            return Prelude[">>="](bindForeignParser({}))(ForeignParser.create(readPrimType("Array")))(function (xs) {
                return new ForeignParser(function (_) {
                    return Data_Traversable.traverse(Data_Traversable.traversableArray({}))(Data_Either.applicativeEither({}))(arrayItem)(Data_Tuple.zip(Data_Array.range(0)(Data_Array.length(xs)))(xs));
                });
            });
        })());
    };
    var readMaybe = function (__dict_ReadForeign_524) {
        return new ReadForeign(Prelude[">>="](bindForeignParser({}))(ForeignParser.create(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Either.Right.create)(readMaybeImpl$prime)))(function (x) {
            return new ForeignParser(function (_) {
                if (x instanceof Data_Maybe.Just) {
                    return Prelude[">>="](Data_Either.bindEither({}))(parseForeign(read(__dict_ReadForeign_524))(x.value0))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](Data_Either.monadEither({})))(Data_Maybe.Just.create));
                };
                if (x instanceof Data_Maybe.Nothing) {
                    return Prelude["return"](Data_Either.monadEither({}))(Data_Maybe.Nothing.value);
                };
                throw new Error("Failed pattern match");
            });
        }));
    };
    var applicativeForeignParser = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyForeignParser({});
        }, function (x) {
            return new ForeignParser(function (__1) {
                return new Data_Either.Right(x);
            });
        });
    };
    var monadForeignParser = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeForeignParser({});
        }, function (__1) {
            return bindForeignParser({});
        });
    };
    return {
        ForeignParser: ForeignParser, 
        ReadForeign: ReadForeign, 
        keys: keys, 
        index: index, 
        prop: prop, 
        read: read, 
        parseJSON: parseJSON, 
        parseForeign: parseForeign, 
        showForeign: showForeign, 
        functorForeignParser: functorForeignParser, 
        bindForeignParser: bindForeignParser, 
        applyForeignParser: applyForeignParser, 
        applicativeForeignParser: applicativeForeignParser, 
        monadForeignParser: monadForeignParser, 
        readString: readString, 
        readNumber: readNumber, 
        readBoolean: readBoolean, 
        readError: readError, 
        readArray: readArray, 
        readMaybe: readMaybe
    };
})();
var PS = PS || {};
PS.Data_UUID = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foreign = PS.Data_Foreign;
    var Data_Either = PS.Data_Either;
    var uuid;try {  require;  uuid = require('node-uuid');} catch (e) {  uuid = window.uuid;};
    function showuuid(ident) {  return ident.toString();};
    function v1() {  return uuid.v1();};
    function v4() {  return uuid.v4();};
    function runUUID(UUID) {  return UUID();};
    function parse(str) {  return uuid.parse(str);};
    function unparse(buffer) {  return uuid.unparse(buffer);};
    var showUUID = function (_) {
        return new Prelude.Show(function (ident) {
            return showuuid(ident);
        });
    };
    var readUUID = function (_) {
        return new Data_Foreign.ReadForeign(new Data_Foreign.ForeignParser(function (x) {
            return Data_Either.Right.create(unparse(parse(Prelude.show(Data_Foreign.showForeign({}))(x))));
        }));
    };
    var eqUUID = function (_) {
        return new Prelude.Eq(function (ident) {
            return function (ident$prime) {
                return !Prelude["=="](eqUUID({}))(ident)(ident$prime);
            };
        }, function (ident) {
            return function (ident$prime) {
                return showuuid(ident) === showuuid(ident$prime);
            };
        });
    };
    return {
        unparse: unparse, 
        parse: parse, 
        runUUID: runUUID, 
        v4: v4, 
        v1: v1, 
        showuuid: showuuid, 
        uuid: uuid, 
        eqUUID: eqUUID, 
        showUUID: showUUID, 
        readUUID: readUUID
    };
})();
var PS = PS || {};
PS.Node_FS_Async = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Function = PS.Data_Function;
    var Data_Foreign = PS.Data_Foreign;
    var Data_Either = PS.Data_Either;
    var Control_Monad_Eff_Exception = PS.Control_Monad_Eff_Exception;
    var Data_Maybe = PS.Data_Maybe;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Node_Encoding = PS.Node_Encoding;
    var Node_FS_Stats = PS.Node_FS_Stats;
    var Node_FS = PS.Node_FS;
    var Data_Date = PS.Data_Date;
    function runCallbackEff (f) {  return f(); };
    var fs = require('fs');;
    var handleCallback = function (f) {
        return function (err, x) {
            return runCallbackEff(f((function (_2181) {
                if (_2181 instanceof Data_Either.Left) {
                    return Data_Either.Left.create(Control_Monad_Eff_Exception.error("handleCallback failed: " + Prelude.show(Prelude.showString({}))(_2181.value0)));
                };
                if (_2181 instanceof Data_Either.Right && _2181.value0 instanceof Data_Maybe.Just) {
                    return new Data_Either.Left(_2181.value0.value0);
                };
                if (_2181 instanceof Data_Either.Right && _2181.value0 instanceof Data_Maybe.Nothing) {
                    return new Data_Either.Right(x);
                };
                throw new Error("Failed pattern match");
            })(Data_Foreign.parseForeign(Data_Foreign.read(Data_Foreign.readMaybe(Data_Foreign.readError({}))))(err))));
        };
    };
    var link = function (src) {
        return function (dst) {
            return function (cb) {
                return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.link(src, dst, handleCallback(cb)));
            };
        };
    };
    var mkdir$prime = function (file) {
        return function (mode) {
            return function (cb) {
                return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.mkdir(file, mode, handleCallback(cb)));
            };
        };
    };
    var mkdir = Prelude.flip(mkdir$prime)(777);
    var readFile = function (file) {
        return function (cb) {
            return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.readFile(file, {}, handleCallback(cb)));
        };
    };
    var readTextFile = function (encoding) {
        return function (file) {
            return function (cb) {
                return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.readFile(file, {
                    encoding: Prelude.show(Node_Encoding.showEncoding({}))(encoding)
                }, handleCallback(cb)));
            };
        };
    };
    var readdir = function (file) {
        return function (cb) {
            return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.readdir(file, handleCallback(cb)));
        };
    };
    var readlink = function (path) {
        return function (cb) {
            return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.readlink(path, handleCallback(cb)));
        };
    };
    var realpath = function (path) {
        return function (cb) {
            return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.realpath(path, {}, handleCallback(cb)));
        };
    };
    var realpath$prime = function (path) {
        return function (cache) {
            return function (cb) {
                return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.realpath(path, cache, handleCallback(cb)));
            };
        };
    };
    var rename = function (oldFile) {
        return function (newFile) {
            return function (cb) {
                return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.rename(oldFile, newFile, handleCallback(cb)));
            };
        };
    };
    var rmdir = function (file) {
        return function (cb) {
            return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.rmdir(file, handleCallback(cb)));
        };
    };
    var stat = function (file) {
        return function (cb) {
            return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.stat(file, handleCallback(Prelude["<<<"](Prelude.semigroupoidArr({}))(cb)(Prelude["<$>"](Data_Either.functorEither({}))(Node_FS_Stats.Stats.create)))));
        };
    };
    var symlink = function (src) {
        return function (dest) {
            return function (ty) {
                return function (cb) {
                    return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.symlink(src, dest, Prelude.show(Node_FS.showSymlinkType({}))(ty), handleCallback(cb)));
                };
            };
        };
    };
    var truncate = function (file) {
        return function (len) {
            return function (cb) {
                return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.truncate(file, len, handleCallback(cb)));
            };
        };
    };
    var unlink = function (file) {
        return function (cb) {
            return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.unlink(file, handleCallback(cb)));
        };
    };
    var utimes = function (file) {
        return function (atime) {
            return function (mtime) {
                return function (cb) {
                    return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.utimes(file, Data_Date.toEpochMilliseconds(atime) / 1000, Data_Date.toEpochMilliseconds(mtime) / 1000, handleCallback(cb)));
                };
            };
        };
    };
    var writeFile = function (file) {
        return function (buff) {
            return function (cb) {
                return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.writeFile(file, buff, {}, handleCallback(cb)));
            };
        };
    };
    var writeTextFile = function (encoding) {
        return function (file) {
            return function (buff) {
                return function (cb) {
                    return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.writeFile(file, buff, {
                        encoding: Prelude.show(Node_Encoding.showEncoding({}))(encoding)
                    }, handleCallback(cb)));
                };
            };
        };
    };
    var chown = function (file) {
        return function (uid) {
            return function (gid) {
                return function (cb) {
                    return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.chown(file, uid, gid, handleCallback(cb)));
                };
            };
        };
    };
    var chmod = function (file) {
        return function (mode) {
            return function (cb) {
                return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.chmod(file, mode, handleCallback(cb)));
            };
        };
    };
    var appendTextFile = function (encoding) {
        return function (file) {
            return function (buff) {
                return function (cb) {
                    return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.appendFile(file, buff, {
                        encoding: Prelude.show(Node_Encoding.showEncoding({}))(encoding)
                    }, handleCallback(cb)));
                };
            };
        };
    };
    var appendFile = function (file) {
        return function (buff) {
            return function (cb) {
                return Prelude["return"](Control_Monad_Eff.monadEff({}))(fs.appendFile(file, buff, {}, handleCallback(cb)));
            };
        };
    };
    return {
        appendTextFile: appendTextFile, 
        appendFile: appendFile, 
        writeTextFile: writeTextFile, 
        writeFile: writeFile, 
        readTextFile: readTextFile, 
        readFile: readFile, 
        utimes: utimes, 
        readdir: readdir, 
        "mkdir'": mkdir$prime, 
        mkdir: mkdir, 
        rmdir: rmdir, 
        unlink: unlink, 
        "realpath'": realpath$prime, 
        realpath: realpath, 
        readlink: readlink, 
        symlink: symlink, 
        link: link, 
        stat: stat, 
        chmod: chmod, 
        chown: chown, 
        truncate: truncate, 
        rename: rename
    };
})();
var PS = PS || {};
PS.Data_Graph = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Math = PS.Math;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Control_Monad_ST = PS.Control_Monad_ST;
    var Data_Map = PS.Data_Map;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Traversable = PS.Data_Traversable;
    var Control_Monad = PS.Control_Monad;
    var Data_Array = PS.Data_Array;
    function AcyclicSCC(value0) {
        this.value0 = value0;
    };
    AcyclicSCC.create = function (value0) {
        return new AcyclicSCC(value0);
    };
    function CyclicSCC(value0) {
        this.value0 = value0;
    };
    CyclicSCC.create = function (value0) {
        return new CyclicSCC(value0);
    };
    function Edge(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Edge.create = function (value0) {
        return function (value1) {
            return new Edge(value0, value1);
        };
    };
    function Graph(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Graph.create = function (value0) {
        return function (value1) {
            return new Graph(value0, value1);
        };
    };
    var vertices = function (_580) {
        if (_580 instanceof AcyclicSCC) {
            return [ _580.value0 ];
        };
        if (_580 instanceof CyclicSCC) {
            return _580.value0;
        };
        throw new Error("Failed pattern match");
    };
    var showSCC = function (__dict_Show_527) {
        return new Prelude.Show(function (_590) {
            if (_590 instanceof AcyclicSCC) {
                return "AcyclicSCC (" + Prelude.show(__dict_Show_527)(_590.value0) + ")";
            };
            if (_590 instanceof CyclicSCC) {
                return "CyclicSCC " + Prelude.show(Prelude.showArray(__dict_Show_527))(_590.value0);
            };
            throw new Error("Failed pattern match");
        });
    };
    var popUntil = function (__copy___dict_Eq_528) {
        return function (__copy__584) {
            return function (__copy__585) {
                return function (__copy__586) {
                    return function (__copy__587) {
                        var __dict_Eq_528 = __copy___dict_Eq_528;
                        var _584 = __copy__584;
                        var _585 = __copy__585;
                        var _586 = __copy__586;
                        var _587 = __copy__587;
                        tco: while (true) {
                            if (_586.length === 0) {
                                return {
                                    path: [  ], 
                                    component: _587
                                };
                            };
                            if (_586.length > 0) {
                                var _2197 = _586.slice(1);
                                if (Prelude["=="](__dict_Eq_528)(_584(_585))(_584(_586[0]))) {
                                    return {
                                        path: _2197, 
                                        component: Prelude[":"](_586[0])(_587)
                                    };
                                };
                            };
                            if (_586.length > 0) {
                                var _2199 = _586.slice(1);
                                var __tco___dict_Eq_528 = __dict_Eq_528;
                                var __tco__584 = _584;
                                var __tco__585 = _585;
                                var __tco__587 = Prelude[":"](_586[0])(_587);
                                __dict_Eq_528 = __tco___dict_Eq_528;
                                _584 = __tco__584;
                                _585 = __tco__585;
                                _586 = _2199;
                                _587 = __tco__587;
                                continue tco;
                            };
                            throw new Error("Failed pattern match");
                        };
                    };
                };
            };
        };
    };
    var maybeMin = function (_588) {
        return function (_589) {
            if (_589 instanceof Data_Maybe.Nothing) {
                return new Data_Maybe.Just(_588);
            };
            if (_589 instanceof Data_Maybe.Just) {
                return Data_Maybe.Just.create(Math.min(_588)(_589.value0));
            };
            throw new Error("Failed pattern match");
        };
    };
    var scc$prime = function (__dict_Eq_529) {
        return function (__dict_Ord_530) {
            return function (_581) {
                return function (_582) {
                    return function (_583) {
                        return Control_Monad_Eff.runPure(Control_Monad_ST.runST(Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.newSTRef(0))(function (_62) {
                            return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.newSTRef([  ]))(function (_61) {
                                return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.newSTRef(Data_Map.empty))(function (_60) {
                                    return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.newSTRef(Data_Map.empty))(function (_59) {
                                        return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.newSTRef([  ]))(function (_58) {
                                            var lowlinkOfKey = function (k) {
                                                return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.readSTRef(_59))(function (_48) {
                                                    return Prelude["return"](Control_Monad_Eff.monadEff({}))(Data_Map.lookup(__dict_Ord_530)(k)(_48));
                                                });
                                            };
                                            var lowlinkOf = function (v) {
                                                return lowlinkOfKey(_581(v));
                                            };
                                            var isCycle = function (k) {
                                                return Data_Foldable.any(Data_Foldable.foldableArray({}))(function (_579) {
                                                    return Prelude["=="](__dict_Eq_529)(_579.value0)(k) && Prelude["=="](__dict_Eq_529)(_579.value1)(k);
                                                })(_583.value1);
                                            };
                                            var makeComponent = function (_594) {
                                                if (_594.length === 1 && !isCycle(_581(_594[0]))) {
                                                    return new AcyclicSCC(_594[0]);
                                                };
                                                return new CyclicSCC(_594);
                                            };
                                            var indexOfKey = function (k) {
                                                return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.readSTRef(_60))(function (_47) {
                                                    return Prelude["return"](Control_Monad_Eff.monadEff({}))(Data_Map.lookup(__dict_Ord_530)(k)(_47));
                                                });
                                            };
                                            var strongConnect = function (k) {
                                                var v = _582(k);
                                                return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.readSTRef(_62))(function (_57) {
                                                    return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.modifySTRef(_60)(Data_Map.insert(__dict_Ord_530)(k)(_57)))(function (_) {
                                                        return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.modifySTRef(_59)(Data_Map.insert(__dict_Ord_530)(k)(_57)))(function (__1) {
                                                            return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.writeSTRef(_62)(_57 + 1))(function (__2) {
                                                                return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.modifySTRef(_61)(Prelude[":"](v)))(function (__3) {
                                                                    return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Data_Traversable["for"](Control_Monad_Eff.applicativeEff({}))(Data_Traversable.traversableArray({}))(_583.value1)(function (_578) {
                                                                        return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Prelude["=="](__dict_Eq_529)(k)(_578.value0))(Prelude[">>="](Control_Monad_Eff.bindEff({}))(indexOfKey(_578.value1))(function (_53) {
                                                                            return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.readSTRef(_61))(function (_52) {
                                                                                if (_53 instanceof Data_Maybe.Nothing) {
                                                                                    var w = _582(_578.value1);
                                                                                    return Prelude[">>="](Control_Monad_Eff.bindEff({}))(strongConnect(_578.value1))(function (__4) {
                                                                                        return Prelude[">>="](Control_Monad_Eff.bindEff({}))(lowlinkOfKey(_578.value1))(function (_50) {
                                                                                            return Data_Foldable.for_(Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_50)(function (lowlink) {
                                                                                                return Control_Monad_ST.modifySTRef(_59)(Data_Map.alter(__dict_Ord_530)(maybeMin(lowlink))(k));
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                };
                                                                                return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Foldable.elem(__dict_Eq_529)(Data_Foldable.foldableArray({}))(_578.value1)(Data_Array.map(_581)(_52)))(Prelude[">>="](Control_Monad_Eff.bindEff({}))(indexOfKey(_578.value1))(function (_51) {
                                                                                    return Data_Foldable.for_(Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_51)(function (index_1) {
                                                                                        return Control_Monad_ST.modifySTRef(_59)(Data_Map.alter(__dict_Ord_530)(maybeMin(index_1))(k));
                                                                                    });
                                                                                }));
                                                                            });
                                                                        }));
                                                                    }))(function (__4) {
                                                                        return Prelude[">>="](Control_Monad_Eff.bindEff({}))(indexOfKey(k))(function (_56) {
                                                                            return Prelude[">>="](Control_Monad_Eff.bindEff({}))(lowlinkOfKey(k))(function (_55) {
                                                                                return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Prelude["=="](Data_Maybe.eqMaybe(Prelude.eqNumber({})))(_56)(_55))(Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.readSTRef(_61))(function (_54) {
                                                                                    var newPath = popUntil(__dict_Eq_529)(_581)(v)(_54)([  ]);
                                                                                    return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.modifySTRef(_58)(Prelude.flip(Prelude["++"](Data_Array.semigroupArray({})))([ makeComponent(newPath.component) ])))(function (__5) {
                                                                                        return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad_ST.writeSTRef(_61)(newPath.path))(function (__6) {
                                                                                            return Prelude["return"](Control_Monad_Eff.monadEff({}))(Prelude.unit);
                                                                                        });
                                                                                    });
                                                                                }));
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            };
                                            var indexOf = function (v) {
                                                return indexOfKey(_581(v));
                                            };
                                            var go = function (_593) {
                                                if (_593.length === 0) {
                                                    return Control_Monad_ST.readSTRef(_58);
                                                };
                                                if (_593.length > 0) {
                                                    var _2233 = _593.slice(1);
                                                    return Prelude[">>="](Control_Monad_Eff.bindEff({}))(indexOf(_593[0]))(function (_49) {
                                                        return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Maybe.isNothing(_49))(strongConnect(_581(_593[0]))))(function (_) {
                                                            return go(_2233);
                                                        });
                                                    });
                                                };
                                                throw new Error("Failed pattern match");
                                            };
                                            return go(_583.value0);
                                        });
                                    });
                                });
                            });
                        })));
                    };
                };
            };
        };
    };
    var scc = function (__dict_Eq_531) {
        return function (__dict_Ord_532) {
            return scc$prime(__dict_Eq_531)(__dict_Ord_532)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var topSort$prime = function (__dict_Eq_533) {
        return function (__dict_Ord_534) {
            return function (makeKey) {
                return function (makeVert) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Array.reverse)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Array.concatMap(vertices))(scc$prime(__dict_Eq_533)(__dict_Ord_534)(makeKey)(makeVert)));
                };
            };
        };
    };
    var topSort = function (__dict_Eq_535) {
        return function (__dict_Ord_536) {
            return topSort$prime(__dict_Eq_535)(__dict_Ord_536)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var eqSCC = function (__dict_Eq_537) {
        return new Prelude.Eq(function (scc1) {
            return function (scc2) {
                return !Prelude["=="](eqSCC(__dict_Eq_537))(scc1)(scc2);
            };
        }, function (_591) {
            return function (_592) {
                if (_591 instanceof AcyclicSCC && _592 instanceof AcyclicSCC) {
                    return Prelude["=="](__dict_Eq_537)(_591.value0)(_592.value0);
                };
                if (_591 instanceof CyclicSCC && _592 instanceof CyclicSCC) {
                    return Prelude["=="](Prelude.eqArray(__dict_Eq_537))(_591.value0)(_592.value0);
                };
                return false;
            };
        });
    };
    return {
        AcyclicSCC: AcyclicSCC, 
        CyclicSCC: CyclicSCC, 
        Graph: Graph, 
        Edge: Edge, 
        "topSort'": topSort$prime, 
        topSort: topSort, 
        "scc'": scc$prime, 
        scc: scc, 
        vertices: vertices, 
        showSCC: showSCC, 
        eqSCC: eqSCC
    };
})();
var PS = PS || {};
PS.SlamData_Types = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Map = PS.Data_Map;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Argonaut_Combinators = PS.Data_Argonaut_Combinators;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var SDConfig = {
        create: function (value) {
            return value;
        }
    };
    function MountMongo(value0) {
        this.value0 = value0;
    };
    MountMongo.create = function (value0) {
        return new MountMongo(value0);
    };
    var SEConfig = {
        create: function (value) {
            return value;
        }
    };
    function SaveSDConfig(value0) {
        this.value0 = value0;
    };
    SaveSDConfig.create = function (value0) {
        return new SaveSDConfig(value0);
    };
    function SaveSEConfig(value0) {
        this.value0 = value0;
    };
    SaveSEConfig.create = function (value0) {
        return new SaveSEConfig(value0);
    };
    var foldableMap = function (_) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_541) {
            return function (f) {
                return function (ms) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableArray({}))(__dict_Monoid_541)(f)(Data_Map.values(ms));
                };
            };
        }, function (f) {
            return function (z) {
                return function (ms) {
                    return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(f)(z)(Data_Map.values(ms));
                };
            };
        }, function (f) {
            return function (z) {
                return function (ms) {
                    return Data_Foldable.foldr(Data_Foldable.foldableArray({}))(f)(z)(Data_Map.values(ms));
                };
            };
        });
    };
    var traversableMap = function (__dict_Ord_538) {
        return new Data_Traversable.Traversable(foldableMap, function (_) {
            return Data_Map.functorMap({});
        }, function (__dict_Applicative_540) {
            return Data_Traversable.traverse(traversableMap(__dict_Ord_538))(__dict_Applicative_540)(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_539) {
            return function (f) {
                return function (ms) {
                    return Data_Foldable.foldr(Data_Foldable.foldableArray({}))(function (x) {
                        return function (acc) {
                            return Prelude["<*>"](__dict_Applicative_539["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_539["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Map.union(__dict_Ord_538))(x))(acc);
                        };
                    })(Prelude.pure(__dict_Applicative_539)(Data_Map.empty))(Prelude["<$>"](Data_Array.functorArray({}))(function (fs) {
                        return Prelude["<$>"]((__dict_Applicative_539["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.uncurry(Data_Map.singleton))(fs);
                    })(Prelude["<$>"](Data_Array.functorArray({}))(Data_Traversable.traverse(Data_Traversable.traversableTuple({}))(__dict_Applicative_539)(f))(Data_Map.toList(ms))));
                };
            };
        });
    };
    var encodeSDConfig = function (_) {
        return new Data_Argonaut_Encode.EncodeJson(function (_596) {
            return Control_Monad_Identity.Identity.create(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJson({}))("server")(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJString({}))("location")(_596.server.location))(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJNumber({}))("port")(_596.server.port))(Data_Argonaut_Core.jsonEmptyObject))))(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJson({}))("nodeWebkit")(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJString({}))("java")(_596.nodeWebkit.java))(Data_Argonaut_Core.jsonEmptyObject)))(Data_Argonaut_Core.jsonEmptyObject)));
        });
    };
    var encodeMounting = function (_) {
        return new Data_Argonaut_Encode.EncodeJson(function (_598) {
            return Control_Monad_Identity.Identity.create(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJson({}))("mongodb")(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJString({}))("connectionUri")(_598.value0.connectionUri))(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJString({}))("database")(_598.value0.database))(Data_Argonaut_Core.jsonEmptyObject))))(Data_Argonaut_Core.jsonEmptyObject));
        });
    };
    var encodeMounting$prime = function (_595) {
        return Data_Argonaut_Combinators[":="](encodeMounting({}))(_595.value0)(_595.value1);
    };
    var encodeSEConfig = function (_) {
        return new Data_Argonaut_Encode.EncodeJson(function (_600) {
            return Control_Monad_Identity.Identity.create(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJson({}))("server")(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJNumber({}))("port")(_600.server.port))(Data_Argonaut_Core.jsonEmptyObject)))(Data_Argonaut_Combinators["~>"](Data_Argonaut_Combinators[":="](Data_Argonaut_Encode.encodeJsonIdIdJson({}))("mountings")(Data_Foldable.foldr(Data_Foldable.foldableArray({}))(Data_Argonaut_Combinators["~>"])(Data_Argonaut_Core.jsonEmptyObject)(Prelude["<$>"](Data_Array.functorArray({}))(encodeMounting$prime)(Data_Map.toList(_600.mountings)))))(Data_Argonaut_Core.jsonEmptyObject)));
        });
    };
    var decodeSDConfig = function (_) {
        return new Data_Argonaut_Decode.DecodeJson(function (_597) {
            return Data_Maybe.maybe(new Data_Either.Left("Not SDConfig."))(Data_Either.Right.create)(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Core.toObject(_597))(function (_68) {
                return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("server")(_68))(Data_Argonaut_Core.toObject))(function (_67) {
                    return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("location")(_67))(Data_Argonaut_Core.toString))(function (_66) {
                        return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("port")(_67))(Data_Argonaut_Core.toNumber))(function (_65) {
                            return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("nodeWebkit")(_68))(Data_Argonaut_Core.toObject))(function (_64) {
                                return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("java")(_64))(Data_Argonaut_Core.toString))(function (_63) {
                                    return Prelude.pure(Data_Maybe.applicativeMaybe({}))({
                                        server: {
                                            location: _66, 
                                            port: _65
                                        }, 
                                        nodeWebkit: {
                                            java: _63
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            }));
        });
    };
    var decodeMounting = function (_) {
        return new Data_Argonaut_Decode.DecodeJson(function (_599) {
            return Data_Maybe.maybe(new Data_Either.Left("Not a MongoDB Mounting."))(Data_Either.Right.create)(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Core.toObject(_599))(function (_72) {
                return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("mongodb")(_72))(Data_Argonaut_Core.toObject))(function (_71) {
                    return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("connectionUri")(_71))(Data_Argonaut_Core.toString))(function (_70) {
                        return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("database")(_71))(Data_Argonaut_Core.toString))(function (_69) {
                            return Prelude.pure(Data_Maybe.applicativeMaybe({}))(new MountMongo({
                                connectionUri: _70, 
                                database: _69
                            }));
                        });
                    });
                });
            }));
        });
    };
    var decodeSEConfig = function (_) {
        return new Data_Argonaut_Decode.DecodeJson(function (_601) {
            return Data_Maybe.maybe(new Data_Either.Left("Not SEConfig."))(Data_Either.Right.create)(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Core.toObject(_601))(function (_77) {
                return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("server")(_77))(Data_Argonaut_Core.toObject))(function (_76) {
                    return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("port")(_76))(Data_Argonaut_Core.toNumber))(function (_75) {
                        return Prelude[">>="](Data_Maybe.bindMaybe({}))(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Map.lookup(Prelude.ordString({}))("mountings")(_77))(Data_Argonaut_Core.toObject))(function (_74) {
                            return Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Traversable.traverse(traversableMap(Prelude.ordString({})))(Data_Maybe.applicativeMaybe({}))(Data_Argonaut_Decode.decodeMaybe(decodeMounting({})))(_74))(function (_73) {
                                return Prelude.pure(Data_Maybe.applicativeMaybe({}))({
                                    server: {
                                        port: _75
                                    }, 
                                    mountings: _73
                                });
                            });
                        });
                    });
                });
            }));
        });
    };
    var decodeMap = function (__dict_DecodeJson_542) {
        return new Data_Argonaut_Decode.DecodeJson(function (_602) {
            return Data_Maybe.maybe(new Data_Either.Left("Couldn't decode."))(Data_Either.Right.create)(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Core.toObject(_602))(function (_78) {
                return Data_Traversable.traverse(traversableMap(Prelude.ordString({})))(Data_Maybe.applicativeMaybe({}))(Data_Argonaut_Decode.decodeMaybe(__dict_DecodeJson_542))(_78);
            }));
        });
    };
    return {
        SaveSDConfig: SaveSDConfig, 
        SaveSEConfig: SaveSEConfig, 
        MountMongo: MountMongo, 
        SEConfig: SEConfig, 
        SDConfig: SDConfig, 
        "encodeMounting'": encodeMounting$prime, 
        encodeSDConfig: encodeSDConfig, 
        decodeSDConfig: decodeSDConfig, 
        encodeMounting: encodeMounting, 
        decodeMounting: decodeMounting, 
        encodeSEConfig: encodeSEConfig, 
        decodeSEConfig: decodeSEConfig, 
        decodeMap: decodeMap, 
        foldableMap: foldableMap, 
        traversableMap: traversableMap
    };
})();
var PS = PS || {};
PS.SlamData_App_Menu = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var React_DOM = PS.React_DOM;
    var React = PS.React;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Data_Array = PS.Data_Array;
    var Data_Maybe = PS.Data_Maybe;
    var logo = React_DOM.li({})([ React_DOM.a({
        href: "http://slamdata.com/", 
        id: "slamdata-logo", 
        target: "_blank"
    })([ React_DOM.img({
        alt: "SlamData home page", 
        src: "imgs/slamdata-logo.png"
    })([  ]) ]) ]);
    var intersperse = function (_604) {
        return function (_605) {
            if (_605.length === 0) {
                return [  ];
            };
            if (_605.length === 1) {
                return [ _605[0] ];
            };
            if (_605.length > 0) {
                var _2273 = _605.slice(1);
                return Prelude[":"](_605[0])(Prelude[":"](_604)(intersperse(_604)(_2273)));
            };
            throw new Error("Failed pattern match");
        };
    };
    var divider = React_DOM.li({
        className: "divider"
    })([  ]);
    var menuSide = function (name) {
        return React.createClass((function () {
            var _2274 = {};
            for (var _2275 in React.spec) {
                if (React.spec.hasOwnProperty(_2275)) {
                    _2274[_2275] = React.spec[_2275];
                };
            };
            _2274.displayName = "MenuSide";
            _2274.render = function ($$this) {
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.ul({
                    className: name
                })(Prelude["++"](Data_Array.semigroupArray({}))(intersperse(divider)($$this.props.children))($$this.props.extra)));
            };
            return _2274;
        })());
    };
    var leftSide = menuSide("left");
    var rightSide = menuSide("right");
    var command = function (_603) {
        if (_603.action instanceof Data_Maybe.Nothing) {
            return React_DOM.li({})([ React_DOM.a({
                id: "menu-command-" + _603.name
            })([ React_DOM.rawText(_603.name) ]) ]);
        };
        if (_603.action instanceof Data_Maybe.Just) {
            return React_DOM.li({})([ React_DOM.a({
                id: "menu-command-" + _603.name, 
                onClick: function (_) {
                    return _603.action.value0;
                }
            })([ React_DOM.rawText(_603.name) ]) ]);
        };
        throw new Error("Failed pattern match");
    };
    var menuButton = React.createClass((function () {
        var _2282 = {};
        for (var _2283 in React.spec) {
            if (React.spec.hasOwnProperty(_2283)) {
                _2282[_2283] = React.spec[_2283];
            };
        };
        _2282.displayName = "MenuButton";
        _2282.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.li({
                className: "has-dropdown"
            })([ React_DOM.a({
                id: "menu-button-" + $$this.props.name
            })([ React_DOM.rawText($$this.props.name) ]), React_DOM.ul({
                className: "dropdown"
            })(Prelude["<$>"](Data_Array.functorArray({}))(command)($$this.props.commands)) ]));
        };
        return _2282;
    })());
    var editMenu = function (state) {
        return menuButton({
            name: "Edit", 
            commands: [ {
                name: "Settings", 
                action: Data_Maybe.Nothing.value
            } ]
        })([  ]);
    };
    var menuBar = function (state) {
        return React_DOM.section({
            className: "top-bar-section"
        })([ leftSide({
            extra: [ divider ]
        })([ editMenu(state) ]), rightSide({
            extra: [  ]
        })([ logo ]) ]);
    };
    var menu = function (state) {
        return React_DOM.nav({
            className: "top-bar"
        })([ menuBar(state) ]);
    };
    return {
        menu: menu
    };
})();
var PS = PS || {};
PS.SlamData_App = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var React = PS.React;
    var SlamData_App_Menu = PS.SlamData_App_Menu;
    var showSettings = function ($$this) {
        return function (bool) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))($$this.setState({
                settingsVisible: bool
            }));
        };
    };
    var app = React.createClass((function () {
        var _2284 = {};
        for (var _2285 in React.spec) {
            if (React.spec.hasOwnProperty(_2285)) {
                _2284[_2285] = React.spec[_2285];
            };
        };
        _2284.displayName = "App";
        _2284.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(SlamData_App_Menu.menu($$this.props.slamDataState));
        };
        return _2284;
    })());
    return {
        app: app
    };
})();
var PS = PS || {};
PS.SlamData = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Cont_Trans = PS.Control_Monad_Cont_Trans;
    var SlamData_App = PS.SlamData_App;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var React = PS.React;
    var state = {
        showSettings: false
    };
    var slamData = function (settings) {
        return function (handler) {
            var component = SlamData_App.app({
                slamDataState: state, 
                handler: handler, 
                settings: settings
            })([  ]);
            return Prelude[">>="](Control_Monad_Eff.bindEff({}))(React.renderComponentById(component)("content"))(function (_) {
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(Prelude.unit);
            });
        };
    };
    return {
        state: state, 
        slamData: slamData
    };
})();
var PS = PS || {};
PS.SlamData_Helpers = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var SlamData_Types = PS.SlamData_Types;
    var Data_Map = PS.Data_Map;
    var getOrElse = Prelude.flip(Data_Maybe.fromMaybe);
    var defaultServerPort = 8080;
    var defaultServerLocation = "http://localhost";
    var defaultServerURI = defaultServerLocation + ":" + Prelude.show(Prelude.showNumber({}))(defaultServerPort);
    var defaultSDConfig = {
        server: {
            location: defaultServerLocation, 
            port: defaultServerPort
        }, 
        nodeWebkit: {
            java: "java"
        }
    };
    var defaultMountPath = "/";
    var defaultMongoURI = "mongodb://localhost:27017";
    var defaultMongoDatabase = "test";
    var defaultSEConfig = {
        server: {
            port: defaultServerPort
        }, 
        mountings: Data_Map.singleton(defaultMountPath)(new SlamData_Types.MountMongo({
            connectionUri: defaultMongoURI, 
            database: defaultMongoDatabase
        }))
    };
    return {
        defaultSEConfig: defaultSEConfig, 
        defaultSDConfig: defaultSDConfig, 
        defaultServerURI: defaultServerURI, 
        defaultMongoDatabase: defaultMongoDatabase, 
        defaultMongoURI: defaultMongoURI, 
        defaultMountPath: defaultMountPath, 
        defaultServerPort: defaultServerPort, 
        defaultServerLocation: defaultServerLocation, 
        getOrElse: getOrElse
    };
})();
var PS = PS || {};
PS.SlamData_Lens = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Types = PS.SlamData_Types;
    var _settings = function (__dict_Functor_543) {
        return Control_Lens.lens(function (o) {
            return o.settings;
        })(function (o) {
            return function (x) {
                var _2286 = {};
                for (var _2287 in o) {
                    if (o.hasOwnProperty(_2287)) {
                        _2286[_2287] = o[_2287];
                    };
                };
                _2286.settings = x;
                return _2286;
            };
        })(__dict_Functor_543);
    };
    var _server = function (__dict_Functor_544) {
        return Control_Lens.lens(function (o) {
            return o.server;
        })(function (o) {
            return function (x) {
                var _2288 = {};
                for (var _2289 in o) {
                    if (o.hasOwnProperty(_2289)) {
                        _2288[_2289] = o[_2289];
                    };
                };
                _2288.server = x;
                return _2288;
            };
        })(__dict_Functor_544);
    };
    var _seConfigRec = function (__dict_Functor_545) {
        return Control_Lens.lens(function (_607) {
            return _607;
        })(function (_) {
            return function (rec) {
                return rec;
            };
        })(__dict_Functor_545);
    };
    var _seConfig = function (__dict_Functor_546) {
        return Control_Lens.lens(function (o) {
            return o.seConfig;
        })(function (o) {
            return function (x) {
                var _2291 = {};
                for (var _2292 in o) {
                    if (o.hasOwnProperty(_2292)) {
                        _2291[_2292] = o[_2292];
                    };
                };
                _2291.seConfig = x;
                return _2291;
            };
        })(__dict_Functor_546);
    };
    var _sdConfigRec = function (__dict_Functor_547) {
        return Control_Lens.lens(function (_606) {
            return _606;
        })(function (_) {
            return function (rec) {
                return rec;
            };
        })(__dict_Functor_547);
    };
    var _sdConfig = function (__dict_Functor_548) {
        return Control_Lens.lens(function (o) {
            return o.sdConfig;
        })(function (o) {
            return function (x) {
                var _2294 = {};
                for (var _2295 in o) {
                    if (o.hasOwnProperty(_2295)) {
                        _2294[_2295] = o[_2295];
                    };
                };
                _2294.sdConfig = x;
                return _2294;
            };
        })(__dict_Functor_548);
    };
    var _port = function (__dict_Functor_549) {
        return Control_Lens.lens(function (o) {
            return o.port;
        })(function (o) {
            return function (x) {
                var _2296 = {};
                for (var _2297 in o) {
                    if (o.hasOwnProperty(_2297)) {
                        _2296[_2297] = o[_2297];
                    };
                };
                _2296.port = x;
                return _2296;
            };
        })(__dict_Functor_549);
    };
    var _nodeWebkit = function (__dict_Functor_550) {
        return Control_Lens.lens(function (o) {
            return o.nodeWebkit;
        })(function (o) {
            return function (x) {
                var _2298 = {};
                for (var _2299 in o) {
                    if (o.hasOwnProperty(_2299)) {
                        _2298[_2299] = o[_2299];
                    };
                };
                _2298.nodeWebkit = x;
                return _2298;
            };
        })(__dict_Functor_550);
    };
    var _mountings = function (__dict_Functor_551) {
        return Control_Lens.lens(function (o) {
            return o.mountings;
        })(function (o) {
            return function (x) {
                var _2300 = {};
                for (var _2301 in o) {
                    if (o.hasOwnProperty(_2301)) {
                        _2300[_2301] = o[_2301];
                    };
                };
                _2300.mountings = x;
                return _2300;
            };
        })(__dict_Functor_551);
    };
    var _mountingRec = function (__dict_Functor_552) {
        return Control_Lens.lens(function (_608) {
            return _608.value0;
        })(function (_) {
            return function (rec) {
                return new SlamData_Types.MountMongo(rec);
            };
        })(__dict_Functor_552);
    };
    var _location = function (__dict_Functor_553) {
        return Control_Lens.lens(function (o) {
            return o.location;
        })(function (o) {
            return function (x) {
                var _2304 = {};
                for (var _2305 in o) {
                    if (o.hasOwnProperty(_2305)) {
                        _2304[_2305] = o[_2305];
                    };
                };
                _2304.location = x;
                return _2304;
            };
        })(__dict_Functor_553);
    };
    var _java = function (__dict_Functor_554) {
        return Control_Lens.lens(function (o) {
            return o.java;
        })(function (o) {
            return function (x) {
                var _2306 = {};
                for (var _2307 in o) {
                    if (o.hasOwnProperty(_2307)) {
                        _2306[_2307] = o[_2307];
                    };
                };
                _2306.java = x;
                return _2306;
            };
        })(__dict_Functor_554);
    };
    var _database = function (__dict_Functor_555) {
        return Control_Lens.lens(function (o) {
            return o.database;
        })(function (o) {
            return function (x) {
                var _2308 = {};
                for (var _2309 in o) {
                    if (o.hasOwnProperty(_2309)) {
                        _2308[_2309] = o[_2309];
                    };
                };
                _2308.database = x;
                return _2308;
            };
        })(__dict_Functor_555);
    };
    var _connectionUri = function (__dict_Functor_556) {
        return Control_Lens.lens(function (o) {
            return o.connectionUri;
        })(function (o) {
            return function (x) {
                var _2310 = {};
                for (var _2311 in o) {
                    if (o.hasOwnProperty(_2311)) {
                        _2310[_2311] = o[_2311];
                    };
                };
                _2310.connectionUri = x;
                return _2310;
            };
        })(__dict_Functor_556);
    };
    return {
        _settings: _settings, 
        _database: _database, 
        _connectionUri: _connectionUri, 
        _mountings: _mountings, 
        _java: _java, 
        _nodeWebkit: _nodeWebkit, 
        _port: _port, 
        _location: _location, 
        _server: _server, 
        _seConfig: _seConfig, 
        _sdConfig: _sdConfig, 
        _mountingRec: _mountingRec, 
        _seConfigRec: _seConfigRec, 
        _sdConfigRec: _sdConfigRec
    };
})();
var PS = PS || {};
PS.Text_Parsing_Parser_Expr = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Data_Foldable = PS.Data_Foldable;
    var Text_Parsing_Parser_Combinators = PS.Text_Parsing_Parser_Combinators;
    function AssocNone() {

    };
    AssocNone.value = new AssocNone();
    function AssocLeft() {

    };
    AssocLeft.value = new AssocLeft();
    function AssocRight() {

    };
    AssocRight.value = new AssocRight();
    function Infix(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Infix.create = function (value0) {
        return function (value1) {
            return new Infix(value0, value1);
        };
    };
    function Prefix(value0) {
        this.value0 = value0;
    };
    Prefix.create = function (value0) {
        return new Prefix(value0);
    };
    function Postfix(value0) {
        this.value0 = value0;
    };
    Postfix.create = function (value0) {
        return new Postfix(value0);
    };
    var termP = function (__dict_Monad_557) {
        return function (prefixP) {
            return function (term) {
                return function (postfixP) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_557))(prefixP)(function (_88) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_557))(term)(function (_87) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_557))(postfixP)(function (_86) {
                                return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_557))(_86(_88(_87)));
                            });
                        });
                    });
                };
            };
        };
    };
    var splitOp = function (_609) {
        return function (_610) {
            if (_609 instanceof Infix && _609.value1 instanceof AssocNone) {
                var _2317 = {};
                for (var _2318 in _610) {
                    if (_610.hasOwnProperty(_2318)) {
                        _2317[_2318] = _610[_2318];
                    };
                };
                _2317.nassoc = Prelude[":"](_609.value0)(_610.nassoc);
                return _2317;
            };
            if (_609 instanceof Infix && _609.value1 instanceof AssocLeft) {
                var _2321 = {};
                for (var _2322 in _610) {
                    if (_610.hasOwnProperty(_2322)) {
                        _2321[_2322] = _610[_2322];
                    };
                };
                _2321.lassoc = Prelude[":"](_609.value0)(_610.lassoc);
                return _2321;
            };
            if (_609 instanceof Infix && _609.value1 instanceof AssocRight) {
                var _2325 = {};
                for (var _2326 in _610) {
                    if (_610.hasOwnProperty(_2326)) {
                        _2325[_2326] = _610[_2326];
                    };
                };
                _2325.rassoc = Prelude[":"](_609.value0)(_610.rassoc);
                return _2325;
            };
            if (_609 instanceof Prefix) {
                var _2329 = {};
                for (var _2330 in _610) {
                    if (_610.hasOwnProperty(_2330)) {
                        _2329[_2330] = _610[_2330];
                    };
                };
                _2329.prefix = Prelude[":"](_609.value0)(_610.prefix);
                return _2329;
            };
            if (_609 instanceof Postfix) {
                var _2332 = {};
                for (var _2333 in _610) {
                    if (_610.hasOwnProperty(_2333)) {
                        _2332[_2333] = _610[_2333];
                    };
                };
                _2332.postfix = Prelude[":"](_609.value0)(_610.postfix);
                return _2332;
            };
            throw new Error("Failed pattern match");
        };
    };
    var rassocP = function (__dict_Monad_558) {
        return function (x) {
            return function (rassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_558))(rassocOp)(function (_81) {
                                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_558))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_558))(termP(__dict_Monad_558)(prefixP)(term)(postfixP))(function (_79) {
                                    return rassocP1(__dict_Monad_558)(_79)(rassocOp)(prefixP)(term)(postfixP);
                                }))(function (_80) {
                                    return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_558))(_81(x)(_80));
                                });
                            });
                        };
                    };
                };
            };
        };
    };
    var rassocP1 = function (__dict_Monad_559) {
        return function (x) {
            return function (rassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_559))(rassocP(__dict_Monad_559)(x)(rassocOp)(prefixP)(term)(postfixP))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_559))(x));
                        };
                    };
                };
            };
        };
    };
    var nassocP = function (__dict_Monad_560) {
        return function (x) {
            return function (nassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_560))(nassocOp)(function (_85) {
                                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_560))(termP(__dict_Monad_560)(prefixP)(term)(postfixP))(function (_84) {
                                    return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_560))(_85(x)(_84));
                                });
                            });
                        };
                    };
                };
            };
        };
    };
    var lassocP = function (__dict_Monad_561) {
        return function (x) {
            return function (lassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_561))(lassocOp)(function (_83) {
                                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_561))(termP(__dict_Monad_561)(prefixP)(term)(postfixP))(function (_82) {
                                    return lassocP1(__dict_Monad_561)(_83(x)(_82))(lassocOp)(prefixP)(term)(postfixP);
                                });
                            });
                        };
                    };
                };
            };
        };
    };
    var lassocP1 = function (__dict_Monad_562) {
        return function (x) {
            return function (lassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_562))(lassocP(__dict_Monad_562)(x)(lassocOp)(prefixP)(term)(postfixP))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_562))(x));
                        };
                    };
                };
            };
        };
    };
    var buildExprParser = function (__dict_Monad_563) {
        return function (operators) {
            return function (simpleExpr) {
                var makeParser = function (term) {
                    return function (ops) {
                        var accum = Data_Foldable.foldr(Data_Foldable.foldableArray({}))(splitOp)({
                            rassoc: [  ], 
                            lassoc: [  ], 
                            nassoc: [  ], 
                            prefix: [  ], 
                            postfix: [  ]
                        })(ops);
                        var rassocOp = Text_Parsing_Parser_Combinators.choice(__dict_Monad_563)(accum.rassoc);
                        var lassocOp = Text_Parsing_Parser_Combinators.choice(__dict_Monad_563)(accum.lassoc);
                        var nassocOp = Text_Parsing_Parser_Combinators.choice(__dict_Monad_563)(accum.nassoc);
                        var prefixOp = Text_Parsing_Parser_Combinators["<?>"](__dict_Monad_563)(Text_Parsing_Parser_Combinators.choice(__dict_Monad_563)(accum.prefix))("");
                        var postfixOp = Text_Parsing_Parser_Combinators["<?>"](__dict_Monad_563)(Text_Parsing_Parser_Combinators.choice(__dict_Monad_563)(accum.postfix))("");
                        var postfixP = Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_563))(postfixOp)(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_563))(Prelude.id(Prelude.categoryArr({}))));
                        var prefixP = Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_563))(prefixOp)(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_563))(Prelude.id(Prelude.categoryArr({}))));
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_563))(termP(__dict_Monad_563)(prefixP)(term)(postfixP))(function (_89) {
                            return Text_Parsing_Parser_Combinators["<?>"](__dict_Monad_563)(Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_563))(Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_563))(Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_563))(rassocP(__dict_Monad_563)(_89)(rassocOp)(prefixP)(term)(postfixP))(lassocP(__dict_Monad_563)(_89)(lassocOp)(prefixP)(term)(postfixP)))(nassocP(__dict_Monad_563)(_89)(nassocOp)(prefixP)(term)(postfixP)))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_563))(_89)))("operator");
                        });
                    };
                };
                return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(makeParser)(simpleExpr)(operators);
            };
        };
    };
    return {
        Infix: Infix, 
        Prefix: Prefix, 
        Postfix: Postfix, 
        AssocNone: AssocNone, 
        AssocLeft: AssocLeft, 
        AssocRight: AssocRight, 
        buildExprParser: buildExprParser, 
        termP: termP, 
        nassocP: nassocP, 
        lassocP1: lassocP1, 
        lassocP: lassocP, 
        rassocP1: rassocP1, 
        rassocP: rassocP, 
        splitOp: splitOp
    };
})();
var PS = PS || {};
PS.Text_Parsing_Parser_String = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Data_String = PS.Data_String;
    var Data_Either = PS.Data_Either;
    var Control_Monad_Error = PS.Control_Monad_Error;
    var Text_Parsing_Parser_Combinators = PS.Text_Parsing_Parser_Combinators;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Monoid = PS.Data_Monoid;
    var string = function (__dict_Monad_564) {
        return function (s) {
            return Text_Parsing_Parser.ParserT.create(function (s$prime) {
                return Prelude["return"](__dict_Monad_564)((function (_2343) {
                    if (_2343 === 0) {
                        return {
                            consumed: true, 
                            input: Data_String.drop(Data_String.length(s))(s$prime), 
                            result: new Data_Either.Right(s)
                        };
                    };
                    return {
                        consumed: false, 
                        input: s$prime, 
                        result: new Data_Either.Left(Control_Monad_Error.strMsg(Text_Parsing_Parser.errorParseError({}))("Expected " + Prelude.show(Prelude.showString({}))(s)))
                    };
                })(Data_String.indexOf(s)(s$prime)));
            });
        };
    };
    var whiteSpace = function (__dict_Monad_565) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_565))(Text_Parsing_Parser_Combinators.many(__dict_Monad_565)(Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_565))(Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_565))(Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_565))(string(__dict_Monad_565)("\n"))(string(__dict_Monad_565)("\r")))(string(__dict_Monad_565)(" ")))(string(__dict_Monad_565)("\t"))))(function (_91) {
            return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_565))(Data_Foldable.foldMap(Data_Foldable.foldableArray({}))(Data_Monoid.monoidString({}))(Prelude.id(Prelude.categoryArr({})))(_91));
        });
    };
    var eof = function (__dict_Monad_566) {
        return Text_Parsing_Parser.ParserT.create(function (s) {
            return Prelude["return"](__dict_Monad_566)((function (_2345) {
                if (_2345 === "") {
                    return {
                        consumed: false, 
                        input: s, 
                        result: new Data_Either.Right({})
                    };
                };
                return {
                    consumed: false, 
                    input: s, 
                    result: new Data_Either.Left(Control_Monad_Error.strMsg(Text_Parsing_Parser.errorParseError({}))("Expected EOF"))
                };
            })(s));
        });
    };
    var $$char = function (__dict_Monad_567) {
        return Text_Parsing_Parser.ParserT.create(function (s$prime) {
            return Prelude["return"](__dict_Monad_567)((function (_2346) {
                if (_2346 === "") {
                    return {
                        consumed: false, 
                        input: s$prime, 
                        result: new Data_Either.Left(Control_Monad_Error.strMsg(Text_Parsing_Parser.errorParseError({}))("Unexpected EOF"))
                    };
                };
                return {
                    consumed: true, 
                    input: Data_String.drop(1)(s$prime), 
                    result: new Data_Either.Right(Data_String.charAt(0)(s$prime))
                };
            })(s$prime));
        });
    };
    var satisfy = function (__dict_Monad_568) {
        return function (f) {
            return Text_Parsing_Parser_Combinators["try"](((__dict_Monad_568["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_568))($$char(__dict_Monad_568))(function (_90) {
                return f(_90) ? Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_568))(_90) : Text_Parsing_Parser.fail(__dict_Monad_568)("Character did not satisfy predicate");
            }));
        };
    };
    return {
        whiteSpace: whiteSpace, 
        satisfy: satisfy, 
        "char": $$char, 
        string: string, 
        eof: eof
    };
})();
var PS = PS || {};
PS.Data_Argonaut_Parser = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Control_Apply = PS.Control_Apply;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Text_Parsing_Parser_String = PS.Text_Parsing_Parser_String;
    var Data_Maybe = PS.Data_Maybe;
    var Data_String = PS.Data_String;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Data_Foldable = PS.Data_Foldable;
    var Text_Parsing_Parser_Combinators = PS.Text_Parsing_Parser_Combinators;
    var Control_Lens = PS.Control_Lens;
    var Global = PS.Global;
    var Data_Array = PS.Data_Array;
    var Data_Map = PS.Data_Map;
    var Data_Tuple = PS.Data_Tuple;
    function ParseFailure(value0) {
        this.value0 = value0;
    };
    ParseFailure.create = function (value0) {
        return new ParseFailure(value0);
    };
    function ParseSuccess(value0) {
        this.value0 = value0;
    };
    ParseSuccess.create = function (value0) {
        return new ParseSuccess(value0);
    };
    function Parser(parseJson) {
        this.parseJson = parseJson;
    };
    var toEither = function (_619) {
        if (_619 instanceof ParseFailure) {
            return new Data_Either.Left(_619.value0);
        };
        if (_619 instanceof ParseSuccess) {
            return new Data_Either.Right(_619.value0);
        };
        throw new Error("Failed pattern match");
    };
    var solidus = "/";
    var skipSpaces = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.whiteSpace(Control_Monad_Identity.monadIdentity({})))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))({}));
    var skipMany = function (__dict_Monad_569) {
        return function (p) {
            return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_569))(skipMany1(__dict_Monad_569)(p))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_569))({}));
        };
    };
    var skipMany1 = function (__dict_Monad_570) {
        return function (p) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_570))(p)(function (_114) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_570))(skipMany(__dict_Monad_570)(p))(function (_113) {
                    return Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_570))({});
                });
            });
        };
    };
    var showParseResult = function (__dict_Show_571) {
        return new Prelude.Show(function (_623) {
            if (_623 instanceof ParseFailure) {
                return _623.value0;
            };
            if (_623 instanceof ParseSuccess) {
                return Prelude.show(__dict_Show_571)(_623.value0);
            };
            throw new Error("Failed pattern match");
        });
    };
    var showParseError = function (_) {
        return new Prelude.Show(function (_625) {
            return _625.value0.message;
        });
    };
    var reverseSolidus = "\\";
    var parseJson = function (dict) {
        return dict.parseJson;
    };
    var parseMaybe = function (__dict_Parser_572) {
        return function (x) {
            return (function (_2358) {
                if (_2358 instanceof ParseFailure) {
                    return Data_Maybe.Nothing.value;
                };
                if (_2358 instanceof ParseSuccess) {
                    return new Data_Maybe.Just(_2358.value0);
                };
                throw new Error("Failed pattern match");
            })(parseJson(__dict_Parser_572)(x));
        };
    };
    var parseFrom = function (__dict_Parser_573) {
        return parseJson(__dict_Parser_573);
    };
    var ord = Data_String.charCodeAt(0);
    var openBracket = "[";
    var openBrace = "{";
    var nullParser = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("null")))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonNull));
    var noneOf = function (__dict_Monad_574) {
        return function (ss) {
            return Text_Parsing_Parser_String.satisfy(__dict_Monad_574)(Prelude.flip(Data_Foldable.notElem(Prelude.eqString({}))(Data_Foldable.foldableArray({})))(ss));
        };
    };
    var newline = "n";
    var manyTill = function (__dict_Monad_575) {
        return function (p) {
            return function (end) {
                var scan = Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(__dict_Monad_575))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_575))(end)(function (_) {
                    return Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_575))([  ]);
                }))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_575))(p)(function (_117) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_575))(scan)(function (_116) {
                        return Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_575))(Prelude[":"](_117)(_116));
                    });
                }));
                return scan;
            };
        };
    };
    var many1Till = function (__dict_Monad_576) {
        return function (p) {
            return function (end) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_576))(p)(function (_119) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_576))(manyTill(__dict_Monad_576)(p)(end))(function (_118) {
                        return Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_576))(Prelude[":"](_119)(_118));
                    });
                });
            };
        };
    };
    var lookAhead = function (__dict_Monad_577) {
        return function (_618) {
            return new Text_Parsing_Parser.ParserT(function (s) {
                return Prelude[">>="](__dict_Monad_577["__superclass_Prelude.Bind_1"]({}))(_618.value0(s))(function (_115) {
                    return Prelude.pure(__dict_Monad_577["__superclass_Prelude.Applicative_0"]({}))((function () {
                        var _2367 = {};
                        for (var _2368 in _115) {
                            if (_115.hasOwnProperty(_2368)) {
                                _2367[_2368] = _115[_2368];
                            };
                        };
                        _2367.input = s;
                        _2367.consumed = false;
                        return _2367;
                    })());
                });
            });
        };
    };
    var isHexAlpha = function (str) {
        var n = ord(str);
        return 65 <= n && n <= 70 || 97 <= n && n <= 102;
    };
    var isDigit = function (_617) {
        if (48 <= ord(_617) && ord(_617) <= 57) {
            return true;
        };
        return false;
    };
    var isHex = Prelude["<*>"](Prelude.applyArr({}))(Prelude["<$>"](Prelude.functorArr({}))(Prelude["||"](Prelude.boolLikeBoolean({})))(isDigit))(isHexAlpha);
    var oneToNine = function (str) {
        return isDigit(str) && str !== "0";
    };
    var invalidJson = function (expected) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators.many(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (s) {
            return Text_Parsing_Parser.fail(Control_Monad_Identity.monadIdentity({}))("Invalid JSON:\n\t" + "Expected " + expected + ".\n\t" + "Found: " + Data_String.joinWith("")(s));
        });
    };
    var normalChar = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_105) {
        if (_105 === "\"") {
            return invalidJson("unicode character");
        };
        if (_105 === "\\") {
            return invalidJson("unicode character");
        };
        return Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}));
    });
    var horizontalTab = "t";
    var hexDigit = Text_Parsing_Parser_String.satisfy(Control_Monad_Identity.monadIdentity({}))(isHex);
    var unicodeParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("u"))(function (_112) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(hexDigit)(function (_111) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(hexDigit)(function (_110) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(hexDigit)(function (_109) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(hexDigit)(function (_108) {
                        return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(_112 + _111 + _110 + _109 + _108);
                    });
                });
            });
        });
    });
    var fromEither = function (_620) {
        if (_620 instanceof Data_Either.Left) {
            return new ParseFailure(_620.value0);
        };
        if (_620 instanceof Data_Either.Right) {
            return new ParseSuccess(_620.value0);
        };
        throw new Error("Failed pattern match");
    };
    var functorParseResult = function (_) {
        return new Prelude.Functor(function (f) {
            return function (x) {
                return fromEither(Prelude["<$>"](Data_Either.functorEither({}))(f)(toEither(x)));
            };
        });
    };
    var isoParseEither = function (__dict_Functor_578) {
        return function (__dict_Profunctor_579) {
            return Control_Lens.iso(__dict_Profunctor_579)(__dict_Functor_578)(toEither)(fromEither);
        };
    };
    var formfeed = "f";
    var eqParseResult = function (__dict_Eq_580) {
        return new Prelude.Eq(function (pr) {
            return function (pr$prime) {
                return !Prelude["=="](eqParseResult(__dict_Eq_580))(pr)(pr$prime);
            };
        }, function (_621) {
            return function (_622) {
                if (_621 instanceof ParseFailure && _622 instanceof ParseFailure) {
                    return _621.value0 === _622.value0;
                };
                if (_621 instanceof ParseSuccess && _622 instanceof ParseSuccess) {
                    return Prelude["=="](__dict_Eq_580)(_621.value0)(_622.value0);
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var doubleQuote = "\"";
    var quoted = function (__dict_Monad_581) {
        return Text_Parsing_Parser_Combinators.between(__dict_Monad_581)(Text_Parsing_Parser_String.string(__dict_Monad_581)(doubleQuote))(Text_Parsing_Parser_String.string(__dict_Monad_581)(doubleQuote));
    };
    var emptyStringParser = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(quoted(Control_Monad_Identity.monadIdentity({}))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))("")));
    var digit = Text_Parsing_Parser_String.satisfy(Control_Monad_Identity.monadIdentity({}))(isDigit);
    var digits = Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Data_String.joinWith(""))(manyTill(Control_Monad_Identity.monadIdentity({}))(digit)(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String.satisfy(Control_Monad_Identity.monadIdentity({}))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.not(Prelude.boolLikeBoolean({})))(isDigit)))));
    var expParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("e")))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("E")))(function (_104) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators.option(Control_Monad_Identity.monadIdentity({}))("")(Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("+")))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("-")))))(function (_103) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(digits)(function (_102) {
                return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(_104 + _103 + _102);
            });
        });
    });
    var fracParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("."))(function (_) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(digits)(function (_101) {
            return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))("." + _101);
        });
    });
    var numberParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (_) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators.option(Control_Monad_Identity.monadIdentity({}))("")(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("-")))(function (_100) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_99) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))((function (_2393) {
                    if (_2393 === "0") {
                        return Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}));
                    };
                    if (oneToNine(_99)) {
                        return digits;
                    };
                    return invalidJson("digit");
                })(_99))(function (_98) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators.option(Control_Monad_Identity.monadIdentity({}))("")(fracParser))(function (_97) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators.option(Control_Monad_Identity.monadIdentity({}))("")(expParser))(function (_96) {
                            return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.fromNumber(Global.readFloat(_100 + _98 + _97 + _96)));
                        });
                    });
                });
            });
        });
    });
    var controlChar = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_107) {
        if (_107 === "\\") {
            return Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({})))(Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_106) {
                return Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}));
            }));
        };
        return invalidJson("control character");
    });
    var nonEmptyStringParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (_) {
        return Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Data_String.joinWith(""))(quoted(Control_Monad_Identity.monadIdentity({}))(manyTill(Control_Monad_Identity.monadIdentity({}))(Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(normalChar))(controlChar))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))(doubleQuote)))));
    });
    var rawStringParser = Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(emptyStringParser))(nonEmptyStringParser);
    var stringParser = Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Data_Argonaut_Core.fromString)(rawStringParser);
    var comma = ",";
    var closeBracket = "]";
    var closeBrace = "}";
    var carriageReturn = "r";
    var brackets = function (__dict_Monad_582) {
        return Text_Parsing_Parser_Combinators.between(__dict_Monad_582)(Text_Parsing_Parser_String.string(__dict_Monad_582)(openBracket))(Text_Parsing_Parser_String.string(__dict_Monad_582)(closeBracket));
    };
    var emptyArrayParser = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(brackets(Control_Monad_Identity.monadIdentity({}))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonEmptyArray))));
    var braces = function (__dict_Monad_583) {
        return Text_Parsing_Parser_Combinators.between(__dict_Monad_583)(Text_Parsing_Parser_String.string(__dict_Monad_583)(openBrace))(Text_Parsing_Parser_String.string(__dict_Monad_583)(closeBrace));
    };
    var emptyObjectParser = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(braces(Control_Monad_Identity.monadIdentity({}))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonEmptyObject))));
    var booleanParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (_) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_95) {
            if (_95 === "t") {
                return Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("true"))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonTrue));
            };
            if (_95 === "f") {
                return Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("false"))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonFalse));
            };
            return invalidJson("one of 'true' or 'false'");
        });
    });
    var backspace = "b";
    var arrayParser = function (_612) {
        return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(emptyArrayParser))(nonEmptyArrayParser);
    };
    var nonEmptyArrayParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (_) {
        return Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Data_Argonaut_Core.fromArray)(brackets(Control_Monad_Identity.monadIdentity({}))(Control_Apply["<*"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(Text_Parsing_Parser_Combinators.sepBy(Control_Monad_Identity.monadIdentity({}))(valueParser(Prelude.unit))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))(comma))))(skipSpaces)));
    });
    var valueParser = function (_616) {
        return Text_Parsing_Parser_Combinators.choice(Control_Monad_Identity.monadIdentity({}))(Prelude["<$>"](Data_Array.functorArray({}))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({})))([ nullParser, booleanParser, stringParser, objectParser(Prelude.unit), arrayParser(Prelude.unit), numberParser ]));
    };
    var objectParser = function (_611) {
        return Prelude["<|>"](Text_Parsing_Parser.alternativeParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(emptyObjectParser))(nonEmptyObjectParser(Prelude.unit));
    };
    var nonEmptyObjectParser = function (_613) {
        return Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(braces(Control_Monad_Identity.monadIdentity({}))(Control_Apply["<*"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(membersParser(Prelude.unit)))(skipSpaces)));
    };
    var membersParser = function (_614) {
        return Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Map.fromList(Prelude.ordString({})))(Data_Argonaut_Core.fromObject))(Text_Parsing_Parser_Combinators.sepBy1(Control_Monad_Identity.monadIdentity({}))(memberParser(Prelude.unit))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))(comma)));
    };
    var memberParser = function (_615) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (_) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(rawStringParser)(function (_94) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__1) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))(":"))(function (__2) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__3) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(valueParser(Prelude.unit))(function (_93) {
                                return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(new Data_Tuple.Tuple(_94, _93));
                            });
                        });
                    });
                });
            });
        });
    };
    var jsonParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (_) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_92) {
            if (_92 === "{") {
                return objectParser(Prelude.unit);
            };
            if (_92 === "[") {
                return arrayParser(Prelude.unit);
            };
            return invalidJson("object or array");
        });
    });
    var parseString = function (str) {
        return (function (_2413) {
            if (_2413 instanceof Data_Either.Left) {
                return new ParseFailure(_2413.value0.value0.message);
            };
            if (_2413 instanceof Data_Either.Right) {
                return new ParseSuccess(_2413.value0);
            };
            throw new Error("Failed pattern match");
        })(Text_Parsing_Parser.runParser(str)(jsonParser));
    };
    var parserIdParseResultString = function (_) {
        return new Parser(function (_624) {
            return parseString(_624);
        });
    };
    var applyParseResult = function (_) {
        return new Prelude.Apply(function (f) {
            return function (x) {
                return fromEither(Prelude["<*>"](Data_Either.applyEither({}))(toEither(f))(toEither(x)));
            };
        }, function (__1) {
            return functorParseResult({});
        });
    };
    var bindParseResult = function (_) {
        return new Prelude.Bind(function (m) {
            return function (f) {
                return fromEither(Prelude[">>="](Data_Either.bindEither({}))(toEither(m))(Prelude[">>>"](Prelude.semigroupoidArr({}))(f)(toEither)));
            };
        }, function (__1) {
            return applyParseResult({});
        });
    };
    var applicativeParseResult = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyParseResult({});
        }, ParseSuccess.create);
    };
    var monadParseResult = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeParseResult({});
        }, function (__1) {
            return bindParseResult({});
        });
    };
    return {
        ParseFailure: ParseFailure, 
        ParseSuccess: ParseSuccess, 
        Parser: Parser, 
        fromEither: fromEither, 
        toEither: toEither, 
        isoParseEither: isoParseEither, 
        quoted: quoted, 
        brackets: brackets, 
        braces: braces, 
        many1Till: many1Till, 
        manyTill: manyTill, 
        noneOf: noneOf, 
        lookAhead: lookAhead, 
        skipMany1: skipMany1, 
        skipMany: skipMany, 
        skipSpaces: skipSpaces, 
        oneToNine: oneToNine, 
        isDigit: isDigit, 
        ord: ord, 
        invalidJson: invalidJson, 
        valueParser: valueParser, 
        isHexAlpha: isHexAlpha, 
        isHex: isHex, 
        hexDigit: hexDigit, 
        unicodeParser: unicodeParser, 
        controlChar: controlChar, 
        normalChar: normalChar, 
        nonEmptyStringParser: nonEmptyStringParser, 
        emptyStringParser: emptyStringParser, 
        rawStringParser: rawStringParser, 
        stringParser: stringParser, 
        expParser: expParser, 
        fracParser: fracParser, 
        digit: digit, 
        digits: digits, 
        numberParser: numberParser, 
        booleanParser: booleanParser, 
        nullParser: nullParser, 
        nonEmptyArrayParser: nonEmptyArrayParser, 
        emptyArrayParser: emptyArrayParser, 
        memberParser: memberParser, 
        membersParser: membersParser, 
        nonEmptyObjectParser: nonEmptyObjectParser, 
        emptyObjectParser: emptyObjectParser, 
        arrayParser: arrayParser, 
        objectParser: objectParser, 
        jsonParser: jsonParser, 
        parseString: parseString, 
        parseMaybe: parseMaybe, 
        solidus: solidus, 
        reverseSolidus: reverseSolidus, 
        openBracket: openBracket, 
        openBrace: openBrace, 
        newline: newline, 
        horizontalTab: horizontalTab, 
        formfeed: formfeed, 
        doubleQuote: doubleQuote, 
        comma: comma, 
        closeBracket: closeBracket, 
        closeBrace: closeBrace, 
        carriageReturn: carriageReturn, 
        backspace: backspace, 
        parseFrom: parseFrom, 
        parseJson: parseJson, 
        undefined: undefined, 
        eqParseResult: eqParseResult, 
        showParseResult: showParseResult, 
        functorParseResult: functorParseResult, 
        applyParseResult: applyParseResult, 
        bindParseResult: bindParseResult, 
        applicativeParseResult: applicativeParseResult, 
        monadParseResult: monadParseResult, 
        parserIdParseResultString: parserIdParseResultString, 
        showParseError: showParseError
    };
})();
var PS = PS || {};
PS.SlamData_NodeWebkit = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Node_Path = PS.Node_Path;
    var Data_Either = PS.Data_Either;
    var Debug_Trace = PS.Debug_Trace;
    var Control_Monad_Eff_Exception = PS.Control_Monad_Eff_Exception;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Data_Argonaut_Printer = PS.Data_Argonaut_Printer;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Argonaut_Parser = PS.Data_Argonaut_Parser;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var Node_Events = PS.Node_Events;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var SlamData_Types = PS.SlamData_Types;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Lens = PS.SlamData_Lens;
    var Data_Const = PS.Data_Const;
    var Control_Monad_Cont_Trans = PS.Control_Monad_Cont_Trans;
    var SlamData = PS.SlamData;
    var platform = process.platform;;
    function unsafeEnv(nothing) {  return function(just) {    return function(key) {      var val = process.env[key];      return val == null ? nothing : just(val);    }  }};
    function requireConfig(location) {  return JSON.stringify(require(location));};
    var $less$div$greater = function (fp) {
        return function (fp$prime) {
            return Node_Path.join([ fp, fp$prime ]);
        };
    };
    var showError = Data_Either.either(Debug_Trace.print(Control_Monad_Eff_Exception.showError({})))(Prelude.pure(Control_Monad_Eff.applicativeEff({})));
    var showConfig = function (__dict_EncodeJson_584) {
        return Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Argonaut_Encode.encodeIdentity(__dict_EncodeJson_584))(Data_Argonaut_Printer.printToString);
    };
    var seJar = $less$div$greater("jar")("slamengine_2.10-0.1-SNAPSHOT-one-jar.jar");
    var parseConfig = function (__dict_DecodeJson_585) {
        return function (config) {
            return Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Parser.parseMaybe(Data_Argonaut_Parser.parserIdParseResultString({}))(requireConfig(config)))(Data_Argonaut_Decode.decodeMaybe(__dict_DecodeJson_585));
        };
    };
    var onData = function (__dict_EventEmitter_586) {
        return Node_Events.on(__dict_EventEmitter_586)(Node_Events.variadicFn1({}))("data");
    };
    var env = unsafeEnv(Data_Maybe.Nothing.value)(Data_Maybe.Just.create);
    var linuxConfigHome = Prelude["<|>"](Data_Maybe.alternativeMaybe({}))(env("XDG_CONFIG_HOME"))(Prelude["<$>"](Data_Maybe.functorMaybe({}))(function (home) {
        return $less$div$greater(home)(".config");
    })(env("HOME")));
    var resolveConfigDir = (function (_2419) {
        if (_2419 === "darwin") {
            return $less$div$greater($less$div$greater($less$div$greater(Data_Maybe_Unsafe.fromJust(env("HOME")))("Library"))("Application Support"))("slamdata");
        };
        if (_2419 === "linux") {
            return $less$div$greater(Data_Maybe_Unsafe.fromJust(linuxConfigHome))("slamdata");
        };
        if (_2419 === "win32") {
            return $less$div$greater(Data_Maybe_Unsafe.fromJust(env("LOCALAPPDATA")))("slamdata");
        };
        throw new Error("Failed pattern match");
    })(platform);
    var sdConfigFile = $less$div$greater(resolveConfigDir)("slamdata-config.json");
    var seConfigFile = $less$div$greater(resolveConfigDir)("slamengine-config.json");
    var main$prime = (function () {
        var sdConfig = SlamData_Helpers.getOrElse(parseConfig(SlamData_Types.decodeSDConfig({}))(sdConfigFile))(SlamData_Helpers.defaultSDConfig);
        var seConfig = SlamData_Helpers.getOrElse(parseConfig(SlamData_Types.decodeSEConfig({}))(seConfigFile))(SlamData_Helpers.defaultSEConfig);
        var java = Control_Lens["^."](sdConfig)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._sdConfigRec(Data_Const.functorConst({})))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._nodeWebkit(Data_Const.functorConst({})))(SlamData_Lens._java(Data_Const.functorConst({})))));
        return Control_Monad_Cont_Trans.runContT(SlamData.slamData({
            sdConfig: sdConfig, 
            seConfig: seConfig
        }))(function (event) {
            if (event instanceof SlamData_Types.SaveSDConfig) {
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(Prelude.unit);
            };
            if (event instanceof SlamData_Types.SaveSEConfig) {
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(Prelude.unit);
            };
            throw new Error("Failed pattern match");
        });
    })();
    return {
        "main'": main$prime, 
        showError: showError, 
        parseConfig: parseConfig, 
        showConfig: showConfig, 
        seJar: seJar, 
        seConfigFile: seConfigFile, 
        sdConfigFile: sdConfigFile, 
        resolveConfigDir: resolveConfigDir, 
        linuxConfigHome: linuxConfigHome, 
        requireConfig: requireConfig, 
        onData: onData, 
        "</>": $less$div$greater, 
        env: env, 
        unsafeEnv: unsafeEnv, 
        platform: platform
    };
})();
var PS = PS || {};
PS.Network_HTTP = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Text_Parsing_Parser_Combinators = PS.Text_Parsing_Parser_Combinators;
    var Text_Parsing_Parser_String = PS.Text_Parsing_Parser_String;
    var Control_Apply = PS.Control_Apply;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Data_Maybe = PS.Data_Maybe;
    var Data_String = PS.Data_String;
    function DELETE() {

    };
    DELETE.value = new DELETE();
    function GET() {

    };
    GET.value = new GET();
    function HEAD() {

    };
    HEAD.value = new HEAD();
    function OPTIONS() {

    };
    OPTIONS.value = new OPTIONS();
    function PATCH() {

    };
    PATCH.value = new PATCH();
    function POST() {

    };
    POST.value = new POST();
    function PUT() {

    };
    PUT.value = new PUT();
    function NoStatus() {

    };
    NoStatus.value = new NoStatus();
    function Accepted() {

    };
    Accepted.value = new Accepted();
    function BadGateway() {

    };
    BadGateway.value = new BadGateway();
    function BadRequest() {

    };
    BadRequest.value = new BadRequest();
    function Continue() {

    };
    Continue.value = new Continue();
    function Created() {

    };
    Created.value = new Created();
    function ExpectationFailed() {

    };
    ExpectationFailed.value = new ExpectationFailed();
    function Forbidden() {

    };
    Forbidden.value = new Forbidden();
    function Found() {

    };
    Found.value = new Found();
    function GatewayTimeout() {

    };
    GatewayTimeout.value = new GatewayTimeout();
    function Gone() {

    };
    Gone.value = new Gone();
    function HTTPVersionNotSupported() {

    };
    HTTPVersionNotSupported.value = new HTTPVersionNotSupported();
    function InternalServerError() {

    };
    InternalServerError.value = new InternalServerError();
    function LengthRequired() {

    };
    LengthRequired.value = new LengthRequired();
    function MethodNotAllowed() {

    };
    MethodNotAllowed.value = new MethodNotAllowed();
    function MovedPermanently() {

    };
    MovedPermanently.value = new MovedPermanently();
    function MultipleChoices() {

    };
    MultipleChoices.value = new MultipleChoices();
    function NoContent() {

    };
    NoContent.value = new NoContent();
    function NonAuthoritativeInformation() {

    };
    NonAuthoritativeInformation.value = new NonAuthoritativeInformation();
    function NotAcceptable() {

    };
    NotAcceptable.value = new NotAcceptable();
    function NotFound() {

    };
    NotFound.value = new NotFound();
    function NotImplemented() {

    };
    NotImplemented.value = new NotImplemented();
    function NotModified() {

    };
    NotModified.value = new NotModified();
    function Ok() {

    };
    Ok.value = new Ok();
    function PartialContent() {

    };
    PartialContent.value = new PartialContent();
    function PaymentRequired() {

    };
    PaymentRequired.value = new PaymentRequired();
    function PreconditionFailed() {

    };
    PreconditionFailed.value = new PreconditionFailed();
    function ProxyAuthenticationRequired() {

    };
    ProxyAuthenticationRequired.value = new ProxyAuthenticationRequired();
    function RequestedRangeNotSatisfiable() {

    };
    RequestedRangeNotSatisfiable.value = new RequestedRangeNotSatisfiable();
    function RequestEntityTooLarge() {

    };
    RequestEntityTooLarge.value = new RequestEntityTooLarge();
    function RequestTimeout() {

    };
    RequestTimeout.value = new RequestTimeout();
    function RequestURITooLong() {

    };
    RequestURITooLong.value = new RequestURITooLong();
    function ResetContent() {

    };
    ResetContent.value = new ResetContent();
    function SeeOther() {

    };
    SeeOther.value = new SeeOther();
    function ServiceUnavailable() {

    };
    ServiceUnavailable.value = new ServiceUnavailable();
    function SwitchingProtocols() {

    };
    SwitchingProtocols.value = new SwitchingProtocols();
    function TemporaryRedirect() {

    };
    TemporaryRedirect.value = new TemporaryRedirect();
    function Unauthorized() {

    };
    Unauthorized.value = new Unauthorized();
    function UnsupportedMediaType() {

    };
    UnsupportedMediaType.value = new UnsupportedMediaType();
    function UseProxy() {

    };
    UseProxy.value = new UseProxy();
    function Accept() {

    };
    Accept.value = new Accept();
    function AcceptCharset() {

    };
    AcceptCharset.value = new AcceptCharset();
    function AcceptEncoding() {

    };
    AcceptEncoding.value = new AcceptEncoding();
    function AcceptLanguage() {

    };
    AcceptLanguage.value = new AcceptLanguage();
    function Allow() {

    };
    Allow.value = new Allow();
    function Authorization() {

    };
    Authorization.value = new Authorization();
    function CacheControl() {

    };
    CacheControl.value = new CacheControl();
    function Connection() {

    };
    Connection.value = new Connection();
    function ContentEncoding() {

    };
    ContentEncoding.value = new ContentEncoding();
    function ContentLanguage() {

    };
    ContentLanguage.value = new ContentLanguage();
    function ContentLength() {

    };
    ContentLength.value = new ContentLength();
    function ContentLocation() {

    };
    ContentLocation.value = new ContentLocation();
    function ContentMD5() {

    };
    ContentMD5.value = new ContentMD5();
    function ContentRange() {

    };
    ContentRange.value = new ContentRange();
    function ContentType() {

    };
    ContentType.value = new ContentType();
    function Date() {

    };
    Date.value = new Date();
    function Expect() {

    };
    Expect.value = new Expect();
    function Expires() {

    };
    Expires.value = new Expires();
    function From() {

    };
    From.value = new From();
    function Host() {

    };
    Host.value = new Host();
    function IfMatch() {

    };
    IfMatch.value = new IfMatch();
    function IfModifiedSince() {

    };
    IfModifiedSince.value = new IfModifiedSince();
    function IfNoneMatch() {

    };
    IfNoneMatch.value = new IfNoneMatch();
    function IfRange() {

    };
    IfRange.value = new IfRange();
    function IfUnmodifiedSince() {

    };
    IfUnmodifiedSince.value = new IfUnmodifiedSince();
    function LastModified() {

    };
    LastModified.value = new LastModified();
    function MaxForwards() {

    };
    MaxForwards.value = new MaxForwards();
    function Pragma() {

    };
    Pragma.value = new Pragma();
    function ProxyAuthorization() {

    };
    ProxyAuthorization.value = new ProxyAuthorization();
    function Range() {

    };
    Range.value = new Range();
    function Referer() {

    };
    Referer.value = new Referer();
    function TE() {

    };
    TE.value = new TE();
    function Trailer() {

    };
    Trailer.value = new Trailer();
    function TransferEncoding() {

    };
    TransferEncoding.value = new TransferEncoding();
    function Upgrade() {

    };
    Upgrade.value = new Upgrade();
    function UserAgent() {

    };
    UserAgent.value = new UserAgent();
    function Via() {

    };
    Via.value = new Via();
    function Warning() {

    };
    Warning.value = new Warning();
    function Custom(value0) {
        this.value0 = value0;
    };
    Custom.create = function (value0) {
        return new Custom(value0);
    };
    function Header(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Header.create = function (value0) {
        return function (value1) {
            return new Header(value0, value1);
        };
    };
    var string2Head = function (_626) {
        if (_626 === "Accept") {
            return Accept.value;
        };
        if (_626 === "Accept-Charset") {
            return AcceptCharset.value;
        };
        if (_626 === "Accept-Encoding") {
            return AcceptEncoding.value;
        };
        if (_626 === "Accept-Language") {
            return AcceptLanguage.value;
        };
        if (_626 === "Allow") {
            return Allow.value;
        };
        if (_626 === "Authorization") {
            return Authorization.value;
        };
        if (_626 === "Cache-Control") {
            return CacheControl.value;
        };
        if (_626 === "Connection") {
            return Connection.value;
        };
        if (_626 === "Content-Encoding") {
            return ContentEncoding.value;
        };
        if (_626 === "Content-Language") {
            return ContentLanguage.value;
        };
        if (_626 === "Content-Length") {
            return ContentLength.value;
        };
        if (_626 === "Content-Location") {
            return ContentLocation.value;
        };
        if (_626 === "Content-MD5") {
            return ContentMD5.value;
        };
        if (_626 === "Content-Range") {
            return ContentRange.value;
        };
        if (_626 === "Content-Type") {
            return ContentType.value;
        };
        if (_626 === "Date") {
            return Date.value;
        };
        if (_626 === "Expect") {
            return Expect.value;
        };
        if (_626 === "Expires") {
            return Expires.value;
        };
        if (_626 === "From") {
            return From.value;
        };
        if (_626 === "Host") {
            return Host.value;
        };
        if (_626 === "If-Match") {
            return IfMatch.value;
        };
        if (_626 === "If-Modified-Since") {
            return IfModifiedSince.value;
        };
        if (_626 === "If-None-Match") {
            return IfNoneMatch.value;
        };
        if (_626 === "If-Range") {
            return IfRange.value;
        };
        if (_626 === "If-Unmodified-Since") {
            return IfUnmodifiedSince.value;
        };
        if (_626 === "Last-Modified") {
            return LastModified.value;
        };
        if (_626 === "Max-Forwards") {
            return MaxForwards.value;
        };
        if (_626 === "Pragma") {
            return Pragma.value;
        };
        if (_626 === "Proxy-Authorization") {
            return ProxyAuthorization.value;
        };
        if (_626 === "Range") {
            return Range.value;
        };
        if (_626 === "Referer") {
            return Referer.value;
        };
        if (_626 === "Te") {
            return TE.value;
        };
        if (_626 === "Trailer") {
            return Trailer.value;
        };
        if (_626 === "Transfer-Encoding") {
            return TransferEncoding.value;
        };
        if (_626 === "Upgrade") {
            return Upgrade.value;
        };
        if (_626 === "User-Agent") {
            return UserAgent.value;
        };
        if (_626 === "Via") {
            return Via.value;
        };
        if (_626 === "Warning") {
            return Warning.value;
        };
        return new Custom(_626);
    };
    var status2Number = function (_627) {
        if (_627 instanceof NoStatus) {
            return 0;
        };
        if (_627 instanceof Continue) {
            return 100;
        };
        if (_627 instanceof SwitchingProtocols) {
            return 101;
        };
        if (_627 instanceof Ok) {
            return 200;
        };
        if (_627 instanceof Created) {
            return 201;
        };
        if (_627 instanceof Accepted) {
            return 202;
        };
        if (_627 instanceof NonAuthoritativeInformation) {
            return 203;
        };
        if (_627 instanceof NoContent) {
            return 204;
        };
        if (_627 instanceof ResetContent) {
            return 205;
        };
        if (_627 instanceof PartialContent) {
            return 206;
        };
        if (_627 instanceof MultipleChoices) {
            return 300;
        };
        if (_627 instanceof MovedPermanently) {
            return 301;
        };
        if (_627 instanceof Found) {
            return 302;
        };
        if (_627 instanceof SeeOther) {
            return 303;
        };
        if (_627 instanceof NotModified) {
            return 304;
        };
        if (_627 instanceof UseProxy) {
            return 305;
        };
        if (_627 instanceof TemporaryRedirect) {
            return 307;
        };
        if (_627 instanceof BadRequest) {
            return 400;
        };
        if (_627 instanceof Unauthorized) {
            return 401;
        };
        if (_627 instanceof PaymentRequired) {
            return 402;
        };
        if (_627 instanceof Forbidden) {
            return 403;
        };
        if (_627 instanceof NotFound) {
            return 404;
        };
        if (_627 instanceof MethodNotAllowed) {
            return 405;
        };
        if (_627 instanceof NotAcceptable) {
            return 406;
        };
        if (_627 instanceof ProxyAuthenticationRequired) {
            return 407;
        };
        if (_627 instanceof RequestTimeout) {
            return 408;
        };
        if (_627 instanceof Gone) {
            return 410;
        };
        if (_627 instanceof LengthRequired) {
            return 411;
        };
        if (_627 instanceof PreconditionFailed) {
            return 412;
        };
        if (_627 instanceof RequestEntityTooLarge) {
            return 413;
        };
        if (_627 instanceof RequestURITooLong) {
            return 414;
        };
        if (_627 instanceof UnsupportedMediaType) {
            return 415;
        };
        if (_627 instanceof RequestedRangeNotSatisfiable) {
            return 416;
        };
        if (_627 instanceof ExpectationFailed) {
            return 417;
        };
        if (_627 instanceof InternalServerError) {
            return 500;
        };
        if (_627 instanceof NotImplemented) {
            return 501;
        };
        if (_627 instanceof BadGateway) {
            return 502;
        };
        if (_627 instanceof ServiceUnavailable) {
            return 503;
        };
        if (_627 instanceof GatewayTimeout) {
            return 504;
        };
        if (_627 instanceof HTTPVersionNotSupported) {
            return 505;
        };
        throw new Error("Failed pattern match");
    };
    var space = function (__dict_Monad_587) {
        return Text_Parsing_Parser_Combinators.choice(__dict_Monad_587)([ Text_Parsing_Parser_String.string(__dict_Monad_587)(" "), Text_Parsing_Parser_String.string(__dict_Monad_587)("\t") ]);
    };
    var skipMany = function (__dict_Monad_588) {
        return function (s) {
            return Control_Apply["*>"](Text_Parsing_Parser.applyParserT(__dict_Monad_588))(Text_Parsing_Parser_Combinators.many(__dict_Monad_588)(s))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_588))({}));
        };
    };
    var skipSpaces = function (__dict_Monad_589) {
        return skipMany(__dict_Monad_589)(space(__dict_Monad_589));
    };
    var showHeaderHead = function (_) {
        return new Prelude.Show(function (_631) {
            if (_631 instanceof Accept) {
                return "Accept";
            };
            if (_631 instanceof AcceptCharset) {
                return "Accept-Charset";
            };
            if (_631 instanceof AcceptEncoding) {
                return "Accept-Encoding";
            };
            if (_631 instanceof AcceptLanguage) {
                return "Accept-Language";
            };
            if (_631 instanceof Allow) {
                return "Allow";
            };
            if (_631 instanceof Authorization) {
                return "Authorization";
            };
            if (_631 instanceof CacheControl) {
                return "Cache-Control";
            };
            if (_631 instanceof Connection) {
                return "Connection";
            };
            if (_631 instanceof ContentEncoding) {
                return "Content-Encoding";
            };
            if (_631 instanceof ContentLanguage) {
                return "Content-Language";
            };
            if (_631 instanceof ContentLength) {
                return "Content-Length";
            };
            if (_631 instanceof ContentLocation) {
                return "Content-Location";
            };
            if (_631 instanceof ContentMD5) {
                return "Content-MD5";
            };
            if (_631 instanceof ContentRange) {
                return "Content-Range";
            };
            if (_631 instanceof ContentType) {
                return "Content-Type";
            };
            if (_631 instanceof Date) {
                return "Date";
            };
            if (_631 instanceof Expect) {
                return "Expect";
            };
            if (_631 instanceof Expires) {
                return "Expires";
            };
            if (_631 instanceof From) {
                return "From";
            };
            if (_631 instanceof Host) {
                return "Host";
            };
            if (_631 instanceof IfMatch) {
                return "If-Match";
            };
            if (_631 instanceof IfModifiedSince) {
                return "If-Modified-Since";
            };
            if (_631 instanceof IfNoneMatch) {
                return "If-None-Match";
            };
            if (_631 instanceof IfRange) {
                return "If-Range";
            };
            if (_631 instanceof IfUnmodifiedSince) {
                return "If-Unmodified-Since";
            };
            if (_631 instanceof LastModified) {
                return "Last-Modified";
            };
            if (_631 instanceof MaxForwards) {
                return "Max-Forwards";
            };
            if (_631 instanceof Pragma) {
                return "Pragma";
            };
            if (_631 instanceof ProxyAuthorization) {
                return "Proxy-Authorization";
            };
            if (_631 instanceof Range) {
                return "Range";
            };
            if (_631 instanceof Referer) {
                return "Referer";
            };
            if (_631 instanceof TE) {
                return "Te";
            };
            if (_631 instanceof Trailer) {
                return "Trailer";
            };
            if (_631 instanceof TransferEncoding) {
                return "Transfer-Encoding";
            };
            if (_631 instanceof Upgrade) {
                return "Upgrade";
            };
            if (_631 instanceof UserAgent) {
                return "User-Agent";
            };
            if (_631 instanceof Via) {
                return "Via";
            };
            if (_631 instanceof Warning) {
                return "Warning";
            };
            if (_631 instanceof Custom) {
                return _631.value0;
            };
            throw new Error("Failed pattern match");
        });
    };
    var showHeader = function (_) {
        return new Prelude.Show(function (_630) {
            return Prelude.show(showHeaderHead({}))(_630.value0) + ": " + _630.value1;
        });
    };
    var showHTTPVerb = function (_) {
        return new Prelude.Show(function (_629) {
            if (_629 instanceof DELETE) {
                return "DELETE";
            };
            if (_629 instanceof GET) {
                return "GET";
            };
            if (_629 instanceof HEAD) {
                return "HEAD";
            };
            if (_629 instanceof OPTIONS) {
                return "OPTIONS";
            };
            if (_629 instanceof PATCH) {
                return "PATCH";
            };
            if (_629 instanceof POST) {
                return "POST";
            };
            if (_629 instanceof PUT) {
                return "PUT";
            };
            throw new Error("Failed pattern match");
        });
    };
    var number2Status = function (_628) {
        if (_628 === 0) {
            return new Data_Maybe.Just(NoStatus.value);
        };
        if (_628 === 100) {
            return new Data_Maybe.Just(Continue.value);
        };
        if (_628 === 101) {
            return new Data_Maybe.Just(SwitchingProtocols.value);
        };
        if (_628 === 200) {
            return new Data_Maybe.Just(Ok.value);
        };
        if (_628 === 201) {
            return new Data_Maybe.Just(Created.value);
        };
        if (_628 === 202) {
            return new Data_Maybe.Just(Accepted.value);
        };
        if (_628 === 203) {
            return new Data_Maybe.Just(NonAuthoritativeInformation.value);
        };
        if (_628 === 204) {
            return new Data_Maybe.Just(NoContent.value);
        };
        if (_628 === 205) {
            return new Data_Maybe.Just(ResetContent.value);
        };
        if (_628 === 206) {
            return new Data_Maybe.Just(PartialContent.value);
        };
        if (_628 === 300) {
            return new Data_Maybe.Just(MultipleChoices.value);
        };
        if (_628 === 301) {
            return new Data_Maybe.Just(MovedPermanently.value);
        };
        if (_628 === 302) {
            return new Data_Maybe.Just(Found.value);
        };
        if (_628 === 303) {
            return new Data_Maybe.Just(SeeOther.value);
        };
        if (_628 === 304) {
            return new Data_Maybe.Just(NotModified.value);
        };
        if (_628 === 305) {
            return new Data_Maybe.Just(UseProxy.value);
        };
        if (_628 === 307) {
            return new Data_Maybe.Just(TemporaryRedirect.value);
        };
        if (_628 === 400) {
            return new Data_Maybe.Just(BadRequest.value);
        };
        if (_628 === 401) {
            return new Data_Maybe.Just(Unauthorized.value);
        };
        if (_628 === 402) {
            return new Data_Maybe.Just(PaymentRequired.value);
        };
        if (_628 === 403) {
            return new Data_Maybe.Just(Forbidden.value);
        };
        if (_628 === 404) {
            return new Data_Maybe.Just(NotFound.value);
        };
        if (_628 === 405) {
            return new Data_Maybe.Just(MethodNotAllowed.value);
        };
        if (_628 === 406) {
            return new Data_Maybe.Just(NotAcceptable.value);
        };
        if (_628 === 407) {
            return new Data_Maybe.Just(ProxyAuthenticationRequired.value);
        };
        if (_628 === 408) {
            return new Data_Maybe.Just(RequestTimeout.value);
        };
        if (_628 === 410) {
            return new Data_Maybe.Just(Gone.value);
        };
        if (_628 === 411) {
            return new Data_Maybe.Just(LengthRequired.value);
        };
        if (_628 === 412) {
            return new Data_Maybe.Just(PreconditionFailed.value);
        };
        if (_628 === 413) {
            return new Data_Maybe.Just(RequestEntityTooLarge.value);
        };
        if (_628 === 414) {
            return new Data_Maybe.Just(RequestURITooLong.value);
        };
        if (_628 === 415) {
            return new Data_Maybe.Just(UnsupportedMediaType.value);
        };
        if (_628 === 416) {
            return new Data_Maybe.Just(RequestedRangeNotSatisfiable.value);
        };
        if (_628 === 417) {
            return new Data_Maybe.Just(ExpectationFailed.value);
        };
        if (_628 === 500) {
            return new Data_Maybe.Just(InternalServerError.value);
        };
        if (_628 === 501) {
            return new Data_Maybe.Just(NotImplemented.value);
        };
        if (_628 === 502) {
            return new Data_Maybe.Just(BadGateway.value);
        };
        if (_628 === 503) {
            return new Data_Maybe.Just(ServiceUnavailable.value);
        };
        if (_628 === 504) {
            return new Data_Maybe.Just(GatewayTimeout.value);
        };
        if (_628 === 505) {
            return new Data_Maybe.Just(HTTPVersionNotSupported.value);
        };
        return Data_Maybe.Nothing.value;
    };
    var eol = function (__dict_Monad_590) {
        return Text_Parsing_Parser_String.string(__dict_Monad_590)("\n");
    };
    var parseHeader = function (__dict_Monad_591) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_591))(Control_Apply["<*"](Text_Parsing_Parser.applyParserT(__dict_Monad_591))(Control_Apply["<*"](Text_Parsing_Parser.applyParserT(__dict_Monad_591))(Text_Parsing_Parser_Combinators.many1(__dict_Monad_591)(Text_Parsing_Parser_String["char"](__dict_Monad_591)))(Text_Parsing_Parser_String.string(__dict_Monad_591)(":")))(skipSpaces(__dict_Monad_591)))(function (_121) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_591))(Control_Apply["<*"](Text_Parsing_Parser.applyParserT(__dict_Monad_591))(Text_Parsing_Parser_Combinators.many1(__dict_Monad_591)(Text_Parsing_Parser_String["char"](__dict_Monad_591)))(eol(__dict_Monad_591)))(function (_120) {
                var head$prime = string2Head(Data_String.joinWith("")(_121));
                var values$prime = Data_String.joinWith("")(_120);
                return Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_591))(new Header(head$prime, values$prime));
            });
        });
    };
    return {
        Accept: Accept, 
        AcceptCharset: AcceptCharset, 
        AcceptEncoding: AcceptEncoding, 
        AcceptLanguage: AcceptLanguage, 
        Allow: Allow, 
        Authorization: Authorization, 
        CacheControl: CacheControl, 
        Connection: Connection, 
        ContentEncoding: ContentEncoding, 
        ContentLanguage: ContentLanguage, 
        ContentLength: ContentLength, 
        ContentLocation: ContentLocation, 
        ContentMD5: ContentMD5, 
        ContentRange: ContentRange, 
        ContentType: ContentType, 
        Date: Date, 
        Expect: Expect, 
        Expires: Expires, 
        From: From, 
        Host: Host, 
        IfMatch: IfMatch, 
        IfModifiedSince: IfModifiedSince, 
        IfNoneMatch: IfNoneMatch, 
        IfRange: IfRange, 
        IfUnmodifiedSince: IfUnmodifiedSince, 
        LastModified: LastModified, 
        MaxForwards: MaxForwards, 
        Pragma: Pragma, 
        ProxyAuthorization: ProxyAuthorization, 
        Range: Range, 
        Referer: Referer, 
        TE: TE, 
        Trailer: Trailer, 
        TransferEncoding: TransferEncoding, 
        Upgrade: Upgrade, 
        UserAgent: UserAgent, 
        Via: Via, 
        Warning: Warning, 
        Custom: Custom, 
        Header: Header, 
        NoStatus: NoStatus, 
        Accepted: Accepted, 
        BadGateway: BadGateway, 
        BadRequest: BadRequest, 
        Continue: Continue, 
        Created: Created, 
        ExpectationFailed: ExpectationFailed, 
        Forbidden: Forbidden, 
        Found: Found, 
        GatewayTimeout: GatewayTimeout, 
        Gone: Gone, 
        HTTPVersionNotSupported: HTTPVersionNotSupported, 
        InternalServerError: InternalServerError, 
        LengthRequired: LengthRequired, 
        MethodNotAllowed: MethodNotAllowed, 
        MovedPermanently: MovedPermanently, 
        MultipleChoices: MultipleChoices, 
        NoContent: NoContent, 
        NonAuthoritativeInformation: NonAuthoritativeInformation, 
        NotAcceptable: NotAcceptable, 
        NotFound: NotFound, 
        NotImplemented: NotImplemented, 
        NotModified: NotModified, 
        Ok: Ok, 
        PartialContent: PartialContent, 
        PaymentRequired: PaymentRequired, 
        PreconditionFailed: PreconditionFailed, 
        ProxyAuthenticationRequired: ProxyAuthenticationRequired, 
        RequestedRangeNotSatisfiable: RequestedRangeNotSatisfiable, 
        RequestEntityTooLarge: RequestEntityTooLarge, 
        RequestTimeout: RequestTimeout, 
        RequestURITooLong: RequestURITooLong, 
        ResetContent: ResetContent, 
        SeeOther: SeeOther, 
        ServiceUnavailable: ServiceUnavailable, 
        SwitchingProtocols: SwitchingProtocols, 
        TemporaryRedirect: TemporaryRedirect, 
        Unauthorized: Unauthorized, 
        UnsupportedMediaType: UnsupportedMediaType, 
        UseProxy: UseProxy, 
        DELETE: DELETE, 
        GET: GET, 
        HEAD: HEAD, 
        OPTIONS: OPTIONS, 
        PATCH: PATCH, 
        POST: POST, 
        PUT: PUT, 
        parseHeader: parseHeader, 
        skipSpaces: skipSpaces, 
        space: space, 
        skipMany: skipMany, 
        eol: eol, 
        number2Status: number2Status, 
        status2Number: status2Number, 
        string2Head: string2Head, 
        showHTTPVerb: showHTTPVerb, 
        showHeader: showHeader, 
        showHeaderHead: showHeaderHead
    };
})();
var PS = PS || {};
PS.Network_Oboe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Network_HTTP = PS.Network_HTTP;
    var Data_Function = PS.Data_Function;
    function showJSONImpl(json) {  if (toString.call(json).slice(8, -1) === 'String') {    return json;  } else {    return JSON.stringify(json);  }};
    function node(o) {  return function(n) {    return function(f) {      return function() {        return o.node(n, function(x,y,z){return f(x)(y)(z)();});      }    }  }};
    function path(o) {  return function(n) {    return function(f) {      return function() {        return o.path(n, function(x,y,z){return f(x)(y)(z)();});      }    }  }};
    function done(o) {  return function(f) {    return function() {      return o.done(function(x){return f(x)();});    }  }};
    function start(o) {  return function(f) {    return function() {      return o.start(function(x,y){return f(x)(y)();});    }  }};
    function fail(o) {  return function(f) {    return function() {      return o.fail(function(x){return f(x)();});    }  }};
    var oboe_;try {  oboe_ = require('oboe');} catch (e) {  oboe_ = window.oboe;};
    function oboe(obj) {  return function() {      var headers = {};      obj.headers.map(header2Obj).forEach(function(header) {        headers[header.head] = header.value;      });      return oboe_({        url: obj.url,        method: showVerb(obj.method),        headers: headers,        body: obj.body,        cached: obj.cached,        withCredentials: obj.withCredentials      });  }};
    var showVerb = Prelude.show(Network_HTTP.showHTTPVerb({}));
    var showJSON = function (_) {
        return new Prelude.Show(showJSONImpl);
    };
    var oboeOptions = {
        url: "", 
        method: Network_HTTP.GET.value, 
        headers: [  ], 
        body: "", 
        cached: true, 
        withCredentials: false
    };
    var oboeGet = function (url) {
        return oboe((function () {
            var _2434 = {};
            for (var _2435 in oboeOptions) {
                if (oboeOptions.hasOwnProperty(_2435)) {
                    _2434[_2435] = oboeOptions[_2435];
                };
            };
            _2434.url = url;
            return _2434;
        })());
    };
    var mkFn3_ = Data_Function.mkFn3;
    var mkFn2_ = Data_Function.mkFn2;
    var mkFn1_ = Data_Function.mkFn1;
    var header2Obj = function (_632) {
        return {
            head: Prelude.show(Network_HTTP.showHeaderHead({}))(_632.value0), 
            value: _632.value1
        };
    };
    return {
        fail: fail, 
        start: start, 
        done: done, 
        path: path, 
        node: node, 
        oboeGet: oboeGet, 
        oboe: oboe, 
        oboeOptions: oboeOptions, 
        showJSON: showJSON
    };
})();
var PS = PS || {};
PS.Browser_WebStorage = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    function Storage(clear, getItem, key, length, removeItem, setItem) {
        this.clear = clear;
        this.getItem = getItem;
        this.key = key;
        this.length = length;
        this.removeItem = removeItem;
        this.setItem = setItem;
    };
    var localStorage = window.localStorage;
    var sessionStorage = window.sessionStorage;
    function unsafeLength(storage) {  return storage.length;};
    function unsafeKey(storage) {  return function(num) {    return num >= storage.length ? nothing : just(storage.key(num));  }};
    function unsafeGetItem(storage) {  return function(str) {    var item = storage.getItem(str);    return item == null ? nothing : just(item);  }};
    function unsafeSetItem(storage) {  return function(str) {    return function(val) {      storage.setItem(str, val);      return storage;    }  }};
    function unsafeRemoveItem(storage) {  return function(str) {    storage.removeItem(str);    return storage;  }};
    function unsafeClear(storage) {  storage.clear();  return storage;};
    function null2Maybe(n) {  return n == null ? nothing : just(n);};
    var storageSessionStorage = function (_) {
        return new Storage(function (_644) {
            return unsafeClear(sessionStorage);
        }, function (_641) {
            return unsafeGetItem(sessionStorage);
        }, function (_640) {
            return unsafeKey(sessionStorage);
        }, function (_639) {
            return unsafeLength(sessionStorage);
        }, function (_643) {
            return unsafeRemoveItem(sessionStorage);
        }, function (_642) {
            return unsafeSetItem(sessionStorage);
        });
    };
    var storageLocalStorage = function (_) {
        return new Storage(function (_638) {
            return unsafeClear(localStorage);
        }, function (_635) {
            return unsafeGetItem(localStorage);
        }, function (_634) {
            return unsafeKey(localStorage);
        }, function (_633) {
            return unsafeLength(localStorage);
        }, function (_637) {
            return unsafeRemoveItem(localStorage);
        }, function (_636) {
            return unsafeSetItem(localStorage);
        });
    };
    var setItem = function (dict) {
        return dict.setItem;
    };
    var removeItem = function (dict) {
        return dict.removeItem;
    };
    var nothing = Data_Maybe.Nothing.value;
    var length = function (dict) {
        return dict.length;
    };
    var key = function (dict) {
        return dict.key;
    };
    var just = Data_Maybe.Just.create;
    var getItem = function (dict) {
        return dict.getItem;
    };
    var clear = function (dict) {
        return dict.clear;
    };
    return {
        Storage: Storage, 
        setItem: setItem, 
        removeItem: removeItem, 
        length: length, 
        key: key, 
        getItem: getItem, 
        clear: clear, 
        sessionStorage: sessionStorage, 
        localStorage: localStorage, 
        storageLocalStorage: storageLocalStorage, 
        storageSessionStorage: storageSessionStorage
    };
})();
