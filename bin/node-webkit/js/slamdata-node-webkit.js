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
    var showUnit = function (__unused) {
        return new Show(function (_134) {
            return "Unit {}";
        });
    };
    var showString = function (__unused) {
        return new Show(showStringImpl);
    };
    var showOrdering = function (__unused) {
        return new Show(function (_142) {
            if (_142 instanceof LT) {
                return "LT";
            };
            if (_142 instanceof GT) {
                return "GT";
            };
            if (_142 instanceof EQ) {
                return "EQ";
            };
            throw new Error("Failed pattern match");
        });
    };
    var showNumber = function (__unused) {
        return new Show(showNumberImpl);
    };
    var showBoolean = function (__unused) {
        return new Show(function (_135) {
            if (_135) {
                return "true";
            };
            if (!_135) {
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
    var semigroupoidArr = function (__unused) {
        return new Semigroupoid(function (f) {
            return function (g) {
                return function (x) {
                    return f(g(x));
                };
            };
        });
    };
    var semigroupUnit = function (__unused) {
        return new Semigroup(function (_149) {
            return function (_150) {
                return {};
            };
        });
    };
    var semigroupString = function (__unused) {
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
    var numNumber = function (__unused) {
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
    var functorArr = function (__unused) {
        return new Functor($less$less$less(semigroupoidArr({})));
    };
    var flip = function (f) {
        return function (b) {
            return function (a) {
                return f(a)(b);
            };
        };
    };
    var eqUnit = function (__unused) {
        return new Eq(function (_138) {
            return function (_139) {
                return false;
            };
        }, function (_136) {
            return function (_137) {
                return true;
            };
        });
    };
    var ordUnit = function (__unused) {
        return new Ord(eqUnit, function (_143) {
            return function (_144) {
                return EQ.value;
            };
        });
    };
    var eqString = function (__unused) {
        return new Eq(refIneq, refEq);
    };
    var ordString = function (__unused) {
        return new Ord(eqString, unsafeCompare);
    };
    var eqNumber = function (__unused) {
        return new Eq(refIneq, refEq);
    };
    var ordNumber = function (__unused) {
        return new Ord(eqNumber, unsafeCompare);
    };
    var eqBoolean = function (__unused) {
        return new Eq(refIneq, refEq);
    };
    var ordBoolean = function (__unused) {
        return new Ord(eqBoolean, function (_145) {
            return function (_146) {
                if (!_145 && !_146) {
                    return EQ.value;
                };
                if (!_145 && _146) {
                    return LT.value;
                };
                if (_145 && _146) {
                    return EQ.value;
                };
                if (_145 && !_146) {
                    return GT.value;
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var $$const = function (_130) {
        return function (_131) {
            return _130;
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
                var _875 = compare(__dict_Ord_10)(a1)(a2);
                if (_875 instanceof LT) {
                    return true;
                };
                return false;
            };
        };
    };
    var $less$eq = function (__dict_Ord_11) {
        return function (a1) {
            return function (a2) {
                var _876 = compare(__dict_Ord_11)(a1)(a2);
                if (_876 instanceof GT) {
                    return false;
                };
                return true;
            };
        };
    };
    var $greater = function (__dict_Ord_12) {
        return function (a1) {
            return function (a2) {
                var _877 = compare(__dict_Ord_12)(a1)(a2);
                if (_877 instanceof GT) {
                    return true;
                };
                return false;
            };
        };
    };
    var $greater$eq = function (__dict_Ord_13) {
        return function (a1) {
            return function (a2) {
                var _878 = compare(__dict_Ord_13)(a1)(a2);
                if (_878 instanceof LT) {
                    return false;
                };
                return true;
            };
        };
    };
    var categoryArr = function (__unused) {
        return new Category(semigroupoidArr, function (x) {
            return x;
        });
    };
    var boolLikeBoolean = function (__unused) {
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
        return new Ord(function (__unused) {
            return eqArray(__dict_Ord_9["__superclass_Prelude.Eq_0"]({}));
        }, function (_147) {
            return function (_148) {
                if (_147.length === 0 && _148.length === 0) {
                    return EQ.value;
                };
                if (_147.length === 0) {
                    return LT.value;
                };
                if (_148.length === 0) {
                    return GT.value;
                };
                if (_147.length > 0) {
                    var _885 = _147.slice(1);
                    if (_148.length > 0) {
                        var _883 = _148.slice(1);
                        var _881 = compare(__dict_Ord_9)(_147[0])(_148[0]);
                        if (_881 instanceof EQ) {
                            return compare(ordArray(__dict_Ord_9))(_885)(_883);
                        };
                        return _881;
                    };
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var eqOrdering = function (__unused) {
        return new Eq(function (x) {
            return function (y) {
                return not(boolLikeBoolean({}))($eq$eq(eqOrdering({}))(x)(y));
            };
        }, function (_140) {
            return function (_141) {
                if (_140 instanceof LT && _141 instanceof LT) {
                    return true;
                };
                if (_140 instanceof GT && _141 instanceof GT) {
                    return true;
                };
                if (_140 instanceof EQ && _141 instanceof EQ) {
                    return true;
                };
                return false;
            };
        });
    };
    var bitsNumber = function (__unused) {
        return new Bits(numAnd, numXor, numComplement, numShl, numShr, numZshr, numOr);
    };
    var asTypeOf = function (_132) {
        return function (_133) {
            return _132;
        };
    };
    var applyArr = function (__unused) {
        return new Apply(function (f) {
            return function (g) {
                return function (x) {
                    return f(x)(g(x));
                };
            };
        }, functorArr);
    };
    var bindArr = function (__unused) {
        return new Bind(function (m) {
            return function (f) {
                return function (x) {
                    return f(m(x))(x);
                };
            };
        }, applyArr);
    };
    var applicativeArr = function (__unused) {
        return new Applicative(applyArr, $$const);
    };
    var monadArr = function (__unused) {
        return new Monad(applicativeArr, bindArr);
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
    var showSymlinkType = function (__unused) {
        return new Prelude.Show(function (_151) {
            if (_151 instanceof FileLink) {
                return "file";
            };
            if (_151 instanceof DirLink) {
                return "dir";
            };
            if (_151 instanceof JunctionLink) {
                return "junction";
            };
            throw new Error("Failed pattern match");
        });
    };
    var eqSymlinkType = function (__unused) {
        return new Prelude.Eq(function (x) {
            return function (y) {
                return !Prelude["=="](eqSymlinkType({}))(x)(y);
            };
        }, function (_152) {
            return function (_153) {
                if (_152 instanceof FileLink && _153 instanceof FileLink) {
                    return true;
                };
                if (_152 instanceof DirLink && _153 instanceof DirLink) {
                    return true;
                };
                if (_152 instanceof JunctionLink && _153 instanceof JunctionLink) {
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
    var showEncoding = function (__unused) {
        return new Prelude.Show(function (_154) {
            if (_154 instanceof ASCII) {
                return "ascii";
            };
            if (_154 instanceof UTF8) {
                return "utf8";
            };
            if (_154 instanceof UTF16LE) {
                return "utf16le";
            };
            if (_154 instanceof UCS2) {
                return "ucs2";
            };
            if (_154 instanceof Base64) {
                return "base64";
            };
            if (_154 instanceof Binary) {
                return "binary";
            };
            if (_154 instanceof Hex) {
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
    var showSignal = function (__unused) {
        return new Prelude.Show(function (_155) {
            return _155;
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
PS.Data_String_Regex = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_String = PS.Data_String;
    function showRegex$prime(r){  return '' + r;};
    function regex$prime(s1) {  return function(s2) {    return new RegExp(s1, s2);  };};
    function source(r) {  return r.source;};
    function flags(r) {  return {    multiline: r.multiline,    ignoreCase: r.ignoreCase,    global: r.global,    sticky: !!r.sticky,    unicode: !!r.unicode  };};
    function test(r) {  return function (s) {    return r.test(s);  };};
    function match(r) {  return function (s) {    return s.match(r);   };};
    function replace(r) {  return function(s1) {    return function(s2) {      return s2.replace(r, s1);    };  };};
    function replace$prime(r) {  return function(f) {    return function(s2) {      return s2.replace(r, function (match) {        return f(match)(Array.prototype.splice.call(arguments, 1, arguments.length - 3));      });    };  };};
    function search(r) {  return function (s) {    return s.search(r);  };};
    var showRegex = function (__unused) {
        return new Prelude.Show(showRegex$prime);
    };
    var renderFlags = function (flags_1) {
        return (flags_1.global ? "g" : "") + (flags_1.ignoreCase ? "i" : "") + (flags_1.multiline ? "m" : "") + (flags_1.sticky ? "y" : "") + (flags_1.unicode ? "u" : "");
    };
    var regex = function (source_1) {
        return function (flags_1) {
            return regex$prime(source_1)(renderFlags(flags_1));
        };
    };
    var parseFlags = function (s) {
        return {
            global: Data_String.indexOf("g")(s) >= 0, 
            ignoreCase: Data_String.indexOf("i")(s) >= 0, 
            multiline: Data_String.indexOf("m")(s) >= 0, 
            sticky: Data_String.indexOf("y")(s) >= 0, 
            unicode: Data_String.indexOf("u")(s) >= 0
        };
    };
    return {
        search: search, 
        "replace'": replace$prime, 
        replace: replace, 
        match: match, 
        test: test, 
        parseFlags: parseFlags, 
        renderFlags: renderFlags, 
        flags: flags, 
        source: source, 
        regex: regex, 
        showRegex: showRegex
    };
})();
var PS = PS || {};
PS.Data_Profunctor = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Profunctor(dimap) {
        this.dimap = dimap;
    };
    var profunctorArr = function (__unused) {
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
    var liftRef = function (_156) {
        return function (_157) {
            return function (_158) {
                return _156(_157)(_158);
            };
        };
    };
    var functorRef = function (__unused) {
        return new Prelude.Functor(function (_159) {
            return function (_160) {
                return _159(_160);
            };
        });
    };
    var eqRef = function (__unused) {
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
    var showEither = function (__dict_Show_17) {
        return function (__dict_Show_18) {
            return new Prelude.Show(function (_168) {
                if (_168 instanceof Left) {
                    return "Left (" + Prelude.show(__dict_Show_17)(_168.value0) + ")";
                };
                if (_168 instanceof Right) {
                    return "Right (" + Prelude.show(__dict_Show_18)(_168.value0) + ")";
                };
                throw new Error("Failed pattern match");
            });
        };
    };
    var functorEither = function (__unused) {
        return new Prelude.Functor(function (_164) {
            return function (_165) {
                if (_165 instanceof Left) {
                    return new Left(_165.value0);
                };
                if (_165 instanceof Right) {
                    return new Right(_164(_165.value0));
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var eqEither = function (__dict_Eq_21) {
        return function (__dict_Eq_22) {
            return new Prelude.Eq(function (a) {
                return function (b) {
                    return !Prelude["=="](eqEither(__dict_Eq_21)(__dict_Eq_22))(a)(b);
                };
            }, function (_169) {
                return function (_170) {
                    if (_169 instanceof Left && _170 instanceof Left) {
                        return Prelude["=="](__dict_Eq_21)(_169.value0)(_170.value0);
                    };
                    if (_169 instanceof Right && _170 instanceof Right) {
                        return Prelude["=="](__dict_Eq_22)(_169.value0)(_170.value0);
                    };
                    return false;
                };
            });
        };
    };
    var ordEither = function (__dict_Ord_19) {
        return function (__dict_Ord_20) {
            return new Prelude.Ord(function (__unused) {
                return eqEither(__dict_Ord_19["__superclass_Prelude.Eq_0"]({}))(__dict_Ord_20["__superclass_Prelude.Eq_0"]({}));
            }, function (_171) {
                return function (_172) {
                    if (_171 instanceof Left && _172 instanceof Left) {
                        return Prelude.compare(__dict_Ord_19)(_171.value0)(_172.value0);
                    };
                    if (_171 instanceof Right && _172 instanceof Right) {
                        return Prelude.compare(__dict_Ord_20)(_171.value0)(_172.value0);
                    };
                    if (_171 instanceof Left) {
                        return Prelude.LT.value;
                    };
                    if (_172 instanceof Left) {
                        return Prelude.GT.value;
                    };
                    throw new Error("Failed pattern match");
                };
            });
        };
    };
    var either = function (_161) {
        return function (_162) {
            return function (_163) {
                if (_163 instanceof Left) {
                    return _161(_163.value0);
                };
                if (_163 instanceof Right) {
                    return _162(_163.value0);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var isLeft = either(Prelude["const"](true))(Prelude["const"](false));
    var isRight = either(Prelude["const"](false))(Prelude["const"](true));
    var applyEither = function (__unused) {
        return new Prelude.Apply(function (_166) {
            return function (_167) {
                if (_166 instanceof Left) {
                    return new Left(_166.value0);
                };
                if (_166 instanceof Right) {
                    return Prelude["<$>"](functorEither({}))(_166.value0)(_167);
                };
                throw new Error("Failed pattern match");
            };
        }, functorEither);
    };
    var bindEither = function (__unused) {
        return new Prelude.Bind(either(function (e) {
            return function (_) {
                return new Left(e);
            };
        })(function (a) {
            return function (f) {
                return f(a);
            };
        }), applyEither);
    };
    var applicativeEither = function (__unused) {
        return new Prelude.Applicative(applyEither, Right.create);
    };
    var monadEither = function (__unused) {
        return new Prelude.Monad(applicativeEither, bindEither);
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
    var choiceArr = function (__unused) {
        return new Choice(function (__unused) {
            return Data_Profunctor.profunctorArr({});
        }, function (_173) {
            return function (_174) {
                if (_174 instanceof Data_Either.Left) {
                    return Data_Either.Left.create(_173(_174.value0));
                };
                if (_174 instanceof Data_Either.Right) {
                    return new Data_Either.Right(_174.value0);
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
PS.DOM = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    return {};
})();
var PS = PS || {};
PS.Control_Monad_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
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
PS.Control_Monad_Identity = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Identity = {
        create: function (value) {
            return value;
        }
    };
    var runIdentity = function (_175) {
        return _175;
    };
    var functorIdentity = function (__unused) {
        return new Prelude.Functor(function (f) {
            return function (m) {
                return Identity.create(f(runIdentity(m)));
            };
        });
    };
    var applyIdentity = function (__unused) {
        return new Prelude.Apply(function (_176) {
            return function (_177) {
                return Identity.create(_176(_177));
            };
        }, functorIdentity);
    };
    var bindIdentity = function (__unused) {
        return new Prelude.Bind(function (m) {
            return function (f) {
                return f(runIdentity(m));
            };
        }, applyIdentity);
    };
    var applicativeIdentity = function (__unused) {
        return new Prelude.Applicative(applyIdentity, Identity.create);
    };
    var monadIdentity = function (__unused) {
        return new Prelude.Monad(applicativeIdentity, bindIdentity);
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
PS.Data_Distributive = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    function Distributive(__superclass_Prelude$dotFunctor_0, collect, distribute) {
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
        this.collect = collect;
        this.distribute = distribute;
    };
    var distributiveIdentity = function (__unused) {
        return new Distributive(function (__unused) {
            return Control_Monad_Identity.functorIdentity({});
        }, function (__dict_Functor_24) {
            return function (a2Idb) {
                return function (ga) {
                    return Prelude["<$>"](__dict_Functor_24)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(a2Idb))(ga);
                };
            };
        }, function (__dict_Functor_23) {
            return function (gIdb) {
                return Prelude["<$>"](__dict_Functor_23)(Control_Monad_Identity.runIdentity)(gIdb);
            };
        });
    };
    var distribute = function (dict) {
        return dict.distribute;
    };
    var cotraverse = function (__dict_Distributive_25) {
        return function (__dict_Functor_26) {
            return function (ga2b) {
                return function (gfa) {
                    return Prelude["<$>"](__dict_Distributive_25["__superclass_Prelude.Functor_0"]({}))(ga2b)(distribute(__dict_Distributive_25)(__dict_Functor_26)(gfa));
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
    var representableArrIdentity = function (__unused) {
        return new Representable(function (__unused) {
            return Data_Profunctor.profunctorArr({});
        }, function (__unused) {
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
    var corepresentableArrIdentity = function (__unused) {
        return new Corepresentable(function (__unused) {
            return Data_Profunctor.profunctorArr({});
        }, function (__unused) {
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
    var applicativeEff = function (__unused) {
        return new Prelude.Applicative(applyEff, returnE);
    };
    var applyEff = function (__unused) {
        return new Prelude.Apply(Prelude.ap(monadEff({})), functorEff);
    };
    var monadEff = function (__unused) {
        return new Prelude.Monad(applicativeEff, bindEff);
    };
    var bindEff = function (__unused) {
        return new Prelude.Bind(bindE, applyEff);
    };
    var functorEff = function (__unused) {
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
    var showError = function (__unused) {
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
    var unsafeRight = function (_184) {
        if (_184 instanceof Data_Either.Right) {
            return _184.value0;
        };
        throw new Error("Failed pattern match");
    };
    var unsafeLeft = function (_183) {
        if (_183 instanceof Data_Either.Left) {
            return _183.value0;
        };
        throw new Error("Failed pattern match");
    };
    var unsafeFreeToEither = function (_182) {
        if (_182 instanceof Pure) {
            return new Data_Either.Right(_182.value0);
        };
        if (_182 instanceof Free) {
            return new Data_Either.Left(_182.value0);
        };
        throw new Error("Failed pattern match");
    };
    var pureF = function (__dict_Applicative_28) {
        return function (a) {
            return new Free(Prelude.pure(__dict_Applicative_28)(new Pure(a)));
        };
    };
    var monadTransFree = function (__unused) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_29) {
            return function (f) {
                return Free.create(Prelude[">>="](__dict_Monad_29["__superclass_Prelude.Bind_1"]({}))(f)(function (_3) {
                    return Prelude["return"](__dict_Monad_29)(new Pure(_3));
                }));
            };
        });
    };
    var monadFreeFree = function (__dict_Functor_30) {
        return new MonadFree(Free.create);
    };
    var liftF = function (__dict_Functor_32) {
        return function (__dict_Monad_33) {
            return function (__dict_MonadFree_34) {
                return function (fa) {
                    return wrap(__dict_MonadFree_34)(Prelude["<$>"](__dict_Functor_32)(Prelude["return"](__dict_Monad_33))(fa));
                };
            };
        };
    };
    var iterM = function (__dict_Functor_35) {
        return function (__dict_Monad_36) {
            return function (_178) {
                return function (_179) {
                    if (_179 instanceof Pure) {
                        return Prelude["return"](__dict_Monad_36)(_179.value0);
                    };
                    if (_179 instanceof Free) {
                        return _178(Prelude["<$>"](__dict_Functor_35)(iterM(__dict_Functor_35)(__dict_Monad_36)(_178))(_179.value0));
                    };
                    if (_179 instanceof Gosub) {
                        return _179.value0(function (req) {
                            return function (recv) {
                                return Prelude[">>="](__dict_Monad_36["__superclass_Prelude.Bind_1"]({}))(iterM(__dict_Functor_35)(__dict_Monad_36)(_178)(req(Prelude.unit)))(Prelude["<<<"](Prelude.semigroupoidArr({}))(iterM(__dict_Functor_35)(__dict_Monad_36)(_178))(recv));
                            };
                        });
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    var isGosub = function (_181) {
        if (_181 instanceof Gosub) {
            return true;
        };
        return false;
    };
    var applicativeFree = function (__dict_Functor_45) {
        return new Prelude.Applicative(function (__unused) {
            return applyFree(__dict_Functor_45);
        }, Pure.create);
    };
    var applyFree = function (__dict_Functor_44) {
        return new Prelude.Apply(Prelude.ap(monadFree(__dict_Functor_44)), function (__unused) {
            return functorFree(__dict_Functor_44);
        });
    };
    var monadFree = function (__dict_Functor_31) {
        return new Prelude.Monad(function (__unused) {
            return applicativeFree(__dict_Functor_31);
        }, function (__unused) {
            return bindFree(__dict_Functor_31);
        });
    };
    var bindFree = function (__dict_Functor_43) {
        return new Prelude.Bind(function (_187) {
            return function (_188) {
                if (_187 instanceof Gosub) {
                    return new Gosub(function (h) {
                        return _187.value0(function (a) {
                            return function (i) {
                                return h(a)(function (x) {
                                    return new Gosub(function (j) {
                                        return j(Prelude["const"](i(x)))(_188);
                                    });
                                });
                            };
                        });
                    });
                };
                return new Gosub(function (h) {
                    return h(Prelude["const"](_187))(_188);
                });
            };
        }, function (__unused) {
            return applyFree(__dict_Functor_43);
        });
    };
    var functorFree = function (__dict_Functor_42) {
        return new Prelude.Functor(function (_185) {
            return function (_186) {
                if (_186 instanceof Pure) {
                    return new Pure(_185(_186.value0));
                };
                return Prelude.liftA1(applicativeFree(__dict_Functor_42))(_185)(_186);
            };
        });
    };
    var resumeGosub = function (__dict_Functor_27) {
        return function (_180) {
            if (_180 instanceof Gosub) {
                return _180.value0(function (a) {
                    return function (g) {
                        var _961 = a(Prelude.unit);
                        if (_961 instanceof Pure) {
                            return new Data_Either.Right(g(_961.value0));
                        };
                        if (_961 instanceof Free) {
                            return new Data_Either.Left(Prelude["<$>"](__dict_Functor_27)(function (h) {
                                return Prelude[">>="](bindFree(__dict_Functor_27))(h)(g);
                            })(_961.value0));
                        };
                        if (_961 instanceof Gosub) {
                            return new Data_Either.Right(_961.value0(function (b) {
                                return function (i) {
                                    return Prelude[">>="](bindFree(__dict_Functor_27))(b(Prelude.unit))(function (x) {
                                        return Prelude[">>="](bindFree(__dict_Functor_27))(i(x))(g);
                                    });
                                };
                            }));
                        };
                        throw new Error("Failed pattern match");
                    };
                });
            };
            throw new Error("Failed pattern match");
        };
    };
    var resume = function (__dict_Functor_37) {
        return function (f) {
            return resumeImpl(isGosub, Data_Either.isLeft, unsafeFreeToEither, unsafeRight, resumeGosub(__dict_Functor_37), f);
        };
    };
    var go = function (__dict_Functor_41) {
        return function (fn) {
            return function (f) {
                return goImpl(resume(__dict_Functor_41), Data_Either.isRight, unsafeLeft, unsafeRight, fn, f);
            };
        };
    };
    var goEff = function (__dict_Functor_40) {
        return function (fn) {
            return function (f) {
                return goEffImpl(resume(__dict_Functor_40), Data_Either.isRight, unsafeLeft, unsafeRight, fn, f);
            };
        };
    };
    var goM = function (__dict_Functor_38) {
        return function (__dict_Monad_39) {
            return function (k) {
                return function (f) {
                    var _966 = resume(__dict_Functor_38)(f);
                    if (_966 instanceof Data_Either.Left) {
                        return Prelude[">>="](__dict_Monad_39["__superclass_Prelude.Bind_1"]({}))(k(_966.value0))(goM(__dict_Functor_38)(__dict_Monad_39)(k));
                    };
                    if (_966 instanceof Data_Either.Right) {
                        return Prelude["return"](__dict_Monad_39)(_966.value0);
                    };
                    throw new Error("Failed pattern match");
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
    var delayFunctor = function (__unused) {
        return new Prelude.Functor(function (_190) {
            return function (_191) {
                return Prelude["const"](_190(_191(Prelude.unit)));
            };
        });
    };
    var runTrampoline = Control_Monad_Free.go(delayFunctor({}))(function (_189) {
        return _189(Prelude.unit);
    });
    var delayApply = function (__unused) {
        return new Prelude.Apply(function (_192) {
            return function (_193) {
                return function (_) {
                    return _192(Prelude.unit)(_193(Prelude.unit));
                };
            };
        }, delayFunctor);
    };
    var delayApplicative = function (__unused) {
        return new Prelude.Applicative(delayApply, function (a) {
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
PS.Control_Reactive_Timer = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function timeout(time){                        return function(fn){                          return function(){                            return window.setTimeout(function(){          fn();                                     }, time);                                 };                                        };                                        };
    function clearTimeout(timer){   return function(){     return window.clearTimeout(timer);   }; };
    function interval(time){                        return function(fn){                           return function(){                             return window.setInterval(function(){          fn();                                      }, time);                                  };                                         };                                         };
    function clearInterval(timer){   return function(){     return window.clearInterval(timer);   }; };
    return {
        clearInterval: clearInterval, 
        interval: interval, 
        clearTimeout: clearTimeout, 
        timeout: timeout
    };
})();
var PS = PS || {};
PS.Debug_Trace = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function trace(s) {  return function() {    console.log(s);    return {};  };};
    var print = function (__dict_Show_46) {
        return function (o) {
            return trace(Prelude.show(__dict_Show_46)(o));
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
    var showC3Type = function (__unused) {
        return new Prelude.Show(function (_196) {
            if (_196 instanceof Bar) {
                return "bar";
            };
            if (_196 instanceof Line) {
                return "line";
            };
            if (_196 instanceof Pie) {
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
    var eqC3Type = function (__unused) {
        return new Prelude.Eq(function (t) {
            return function (t$prime) {
                return !Prelude["=="](eqC3Type({}))(t)(t$prime);
            };
        }, function (_197) {
            return function (_198) {
                if (_197 instanceof Bar && _198 instanceof Bar) {
                    return true;
                };
                if (_197 instanceof Line && _198 instanceof Line) {
                    return true;
                };
                if (_197 instanceof Pie && _198 instanceof Pie) {
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
    var axisName = function (_194) {
        return _194.value1;
    };
    var axisData = function (_195) {
        return _195.value2;
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
PS.SlamData_Types_Workspace_Notebook_Block_Visual = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var VisualData = {
        create: function (value) {
            return value;
        }
    };
    return {
        VisualData: VisualData
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
    function emit(__dict) {  return function(event) {    return function(arg) {      return function(emitter) {        return function() {          return emitter.emit(event, arg);        }      }    }  }};
    var variadicFn9 = function (__unused) {
        return new Variadic();
    };
    var variadicFn8 = function (__unused) {
        return new Variadic();
    };
    var variadicFn7 = function (__unused) {
        return new Variadic();
    };
    var variadicFn6 = function (__unused) {
        return new Variadic();
    };
    var variadicFn5 = function (__unused) {
        return new Variadic();
    };
    var variadicFn4 = function (__unused) {
        return new Variadic();
    };
    var variadicFn3 = function (__unused) {
        return new Variadic();
    };
    var variadicFn2 = function (__unused) {
        return new Variadic();
    };
    var variadicFn10 = function (__unused) {
        return new Variadic();
    };
    var variadicFn1 = function (__unused) {
        return new Variadic();
    };
    var variadicFn0 = function (__unused) {
        return new Variadic();
    };
    var variadicArr = function (__unused) {
        return new Variadic();
    };
    var setMaxListeners = function (__dict_EventEmitter_47) {
        return emitterHelper1(__dict_EventEmitter_47)("setMaxListeners");
    };
    var removeListenerEvent = "removeListener";
    var removeListener = function (__dict_EventEmitter_48) {
        return function (__dict_Variadic_49) {
            return emitterHelper2(__dict_EventEmitter_48)(__dict_Variadic_49)("removeListener");
        };
    };
    var removeAllListeners = function (__dict_EventEmitter_50) {
        return emitterHelper1(__dict_EventEmitter_50)("removeAllListeners");
    };
    var once = function (__dict_EventEmitter_51) {
        return function (__dict_Variadic_52) {
            return emitterHelper2(__dict_EventEmitter_51)(__dict_Variadic_52)("once");
        };
    };
    var on = function (__dict_EventEmitter_53) {
        return function (__dict_Variadic_54) {
            return emitterHelper2(__dict_EventEmitter_53)(__dict_Variadic_54)("on");
        };
    };
    var newListenerEvent = "newListener";
    var listeners = function (__dict_EventEmitter_55) {
        return emitterHelper1(__dict_EventEmitter_55)("listeners");
    };
    var eventEmitterEmitter = function (__unused) {
        return new EventEmitter();
    };
    var addListener = function (__dict_EventEmitter_56) {
        return function (__dict_Variadic_57) {
            return emitterHelper2(__dict_EventEmitter_56)(__dict_Variadic_57)("addListener");
        };
    };
    return {
        Event: Event, 
        Variadic: Variadic, 
        EventEmitter: EventEmitter, 
        removeListenerEvent: removeListenerEvent, 
        newListenerEvent: newListenerEvent, 
        emit: emit, 
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
    var eventEmitterStreamStdout = function (__unused) {
        return new Node_Events.EventEmitter();
    };
    var eventEmitterStreamStdin = function (__unused) {
        return new Node_Events.EventEmitter();
    };
    var eventEmitterStreamStderr = function (__unused) {
        return new Node_Events.EventEmitter();
    };
    var eventEmitterChildProcess = function (__unused) {
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
PS.React_Types = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    return {};
})();
var PS = PS || {};
PS.React = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var spec = {};;
    function coerceThis(t) {  return t;};
    function createClass(psSpec) {  var spec = {};  for (var fun in psSpec) {    if (psSpec.hasOwnProperty(fun)) {      (function(f) {        if (typeof psSpec[f] === 'function') {          spec[f] = function() {            return psSpec[f].apply(this, [this].concat([].slice.call(arguments)))() ;          }        } else {          spec[f] = psSpec[f];        }      })(fun);    }  }  var Class = React.createClass(spec);  return function(props) {    return function(children) {      return Class(props, children);    }  }};
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
        coerceThis: coerceThis, 
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
PS.React_TreeView = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function treeView(props) {  return function(children) {    return TreeView(props, children);  }};
    return {
        treeView: treeView
    };
})();
var PS = PS || {};
PS.SlamData_App_Workspace_Notebook_Block_Common = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var React = PS.React;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var React_DOM = PS.React_DOM;
    var blockRow = React.createClass((function () {
        var _991 = {};
        for (var _992 in React.spec) {
            if (React.spec.hasOwnProperty(_992)) {
                _991[_992] = React.spec[_992];
            };
        };
        _991.displayName = "BlockRow";
        _991.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.div({
                className: $$this.props.styles + " row"
            })((function () {
                if ($$this.props.children.length > 0) {
                    var _987 = $$this.props.children.slice(1);
                    if (_987.length > 0) {
                        var _989 = _987.slice(1);
                        return [ React_DOM.div({
                            className: "large-1  columns"
                        })([ $$this.props.children[0] ]), React_DOM.div({
                            className: "large-11 columns right-side"
                        })([ _987[0] ]) ];
                    };
                };
                if ($$this.props.children.length === 1) {
                    return [ React_DOM.div({
                        className: "large-1  columns"
                    })([  ]), React_DOM.div({
                        className: "large-11 columns right-side"
                    })([ $$this.props.children[0] ]) ];
                };
                if ($$this.props.children.length === 0) {
                    return [  ];
                };
                throw new Error("Failed pattern match");
            })()));
        };
        return _991;
    })());
    return {
        blockRow: blockRow
    };
})();
var PS = PS || {};
PS.Control_Monad_Cont_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var ContT = {
        create: function (value) {
            return value;
        }
    };
    var runContT = function (_199) {
        return function (_200) {
            return _199(_200);
        };
    };
    var withContT = function (f) {
        return function (m) {
            return function (k) {
                return runContT(m)(f(k));
            };
        };
    };
    var monadTransContT = function (__unused) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_58) {
            return function (m) {
                return function (k) {
                    return Prelude[">>="](__dict_Monad_58["__superclass_Prelude.Bind_1"]({}))(m)(k);
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
    var functorContT = function (__dict_Monad_60) {
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
    var appluContT = function (__dict_Functor_62) {
        return function (__dict_Monad_63) {
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
            }, function (__unused) {
                return functorContT(__dict_Monad_63);
            });
        };
    };
    var bindContT = function (__dict_Monad_61) {
        return new Prelude.Bind(function (m) {
            return function (k) {
                return function (k$prime) {
                    return runContT(m)(function (a) {
                        return runContT(k(a))(k$prime);
                    });
                };
            };
        }, function (__unused) {
            return appluContT(((__dict_Monad_61["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_61);
        });
    };
    var applicativeContT = function (__dict_Functor_64) {
        return function (__dict_Monad_65) {
            return new Prelude.Applicative(function (__unused) {
                return appluContT(__dict_Functor_64)(__dict_Monad_65);
            }, function (a) {
                return function (k) {
                    return k(a);
                };
            });
        };
    };
    var monadContT = function (__dict_Monad_59) {
        return new Prelude.Monad(function (__unused) {
            return applicativeContT(((__dict_Monad_59["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_59);
        }, function (__unused) {
            return bindContT(__dict_Monad_59);
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
    var when = function (__dict_Monad_66) {
        return function (_206) {
            return function (_207) {
                if (_206) {
                    return _207;
                };
                if (!_206) {
                    return Prelude["return"](__dict_Monad_66)(Prelude.unit);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var unless = function (__dict_Monad_67) {
        return function (_208) {
            return function (_209) {
                if (!_208) {
                    return _209;
                };
                if (_208) {
                    return Prelude["return"](__dict_Monad_67)(Prelude.unit);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var replicateM = function (__dict_Monad_68) {
        return function (_201) {
            return function (_202) {
                if (_201 === 0) {
                    return Prelude["return"](__dict_Monad_68)([  ]);
                };
                return Prelude[">>="](__dict_Monad_68["__superclass_Prelude.Bind_1"]({}))(_202)(function (_5) {
                    return Prelude[">>="](__dict_Monad_68["__superclass_Prelude.Bind_1"]({}))(replicateM(__dict_Monad_68)(_201 - 1)(_202))(function (_4) {
                        return Prelude["return"](__dict_Monad_68)(Prelude[":"](_5)(_4));
                    });
                });
            };
        };
    };
    var foldM = function (__dict_Monad_69) {
        return function (_203) {
            return function (_204) {
                return function (_205) {
                    if (_205.length === 0) {
                        return Prelude["return"](__dict_Monad_69)(_204);
                    };
                    if (_205.length > 0) {
                        var _1007 = _205.slice(1);
                        return Prelude[">>="](__dict_Monad_69["__superclass_Prelude.Bind_1"]({}))(_203(_204)(_205[0]))(function (a$prime) {
                            return foldM(__dict_Monad_69)(_203)(a$prime)(_1007);
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
    var profunctorMarket = function (__unused) {
        return new Data_Profunctor.Profunctor(function (_212) {
            return function (_213) {
                return function (_214) {
                    return new Market(Prelude[">>>"](Prelude.semigroupoidArr({}))(_214.value0)(_213), Prelude[">>>"](Prelude.semigroupoidArr({}))(_212)(Prelude[">>>"](Prelude.semigroupoidArr({}))(_214.value1)(Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(_213)(Data_Either.Left.create))(Data_Either.Right.create))));
                };
            };
        });
    };
    var functorMarket = function (__unused) {
        return new Prelude.Functor(function (_210) {
            return function (_211) {
                return new Market(Prelude[">>>"](Prelude.semigroupoidArr({}))(_211.value0)(_210), Prelude[">>>"](Prelude.semigroupoidArr({}))(_211.value1)(Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(_210)(Data_Either.Left.create))(Data_Either.Right.create)));
            };
        });
    };
    var choiceMarket = function (__unused) {
        return new Data_Profunctor_Choice.Choice(profunctorMarket, function (_215) {
            return new Market(Prelude[">>>"](Prelude.semigroupoidArr({}))(_215.value0)(Data_Either.Left.create), function (thing) {
                if (thing instanceof Data_Either.Left) {
                    return Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Either.Left.create)(Data_Either.Left.create))(Data_Either.Right.create)(_215.value1(thing.value0));
                };
                if (thing instanceof Data_Either.Right) {
                    return Data_Either.Left.create(new Data_Either.Right(thing.value0));
                };
                throw new Error("Failed pattern match");
            });
        }, function (_216) {
            return new Market(Prelude[">>>"](Prelude.semigroupoidArr({}))(_216.value0)(Data_Either.Right.create), function (thing) {
                if (thing instanceof Data_Either.Left) {
                    return Data_Either.Left.create(new Data_Either.Left(thing.value0));
                };
                if (thing instanceof Data_Either.Right) {
                    return Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Either.Right.create)(Data_Either.Left.create))(Data_Either.Right.create)(_216.value1(thing.value0));
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
    var profunctorExchange = function (__unused) {
        return new Data_Profunctor.Profunctor(function (_219) {
            return function (_220) {
                return function (_221) {
                    return new Exchange(Prelude[">>>"](Prelude.semigroupoidArr({}))(_219)(_221.value0), Prelude[">>>"](Prelude.semigroupoidArr({}))(_221.value1)(_220));
                };
            };
        });
    };
    var functorExchange = function (__unused) {
        return new Prelude.Functor(function (_217) {
            return function (_218) {
                return new Exchange(_218.value0, Prelude[">>>"](Prelude.semigroupoidArr({}))(_218.value1)(_217));
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
PS.Control_Lazy = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Lazy(defer) {
        this.defer = defer;
    };
    function Lazy1(defer1) {
        this.defer1 = defer1;
    };
    function Lazy2(defer2) {
        this.defer2 = defer2;
    };
    var defer2 = function (dict) {
        return dict.defer2;
    };
    var fix2 = function (__dict_Lazy2_70) {
        return function (f) {
            return defer2(__dict_Lazy2_70)(function (_) {
                return f(fix2(__dict_Lazy2_70)(f));
            });
        };
    };
    var defer1 = function (dict) {
        return dict.defer1;
    };
    var fix1 = function (__dict_Lazy1_71) {
        return function (f) {
            return defer1(__dict_Lazy1_71)(function (_) {
                return f(fix1(__dict_Lazy1_71)(f));
            });
        };
    };
    var defer = function (dict) {
        return dict.defer;
    };
    var fix = function (__dict_Lazy_72) {
        return function (f) {
            return defer(__dict_Lazy_72)(function (_) {
                return f(fix(__dict_Lazy_72)(f));
            });
        };
    };
    return {
        Lazy2: Lazy2, 
        Lazy1: Lazy1, 
        Lazy: Lazy, 
        fix2: fix2, 
        fix1: fix1, 
        fix: fix, 
        defer2: defer2, 
        defer1: defer1, 
        defer: defer
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
    var extendIdentity = function (__unused) {
        return new Extend(function (w) {
            return function (f) {
                return Control_Monad_Identity.Identity.create(f(w));
            };
        }, function (__unused) {
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
    var extendComonad = function (__unused) {
        return new Comonad(function (__unused) {
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
    var $greater$eq$greater = function (__dict_Bind_73) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return Prelude[">>="](__dict_Bind_73)(f(a))(g);
                };
            };
        };
    };
    var $eq$less$less = function (__dict_Bind_74) {
        return function (f) {
            return function (m) {
                return Prelude[">>="](__dict_Bind_74)(m)(f);
            };
        };
    };
    var $less$eq$less = function (__dict_Bind_75) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return $eq$less$less(__dict_Bind_75)(f)(g(a));
                };
            };
        };
    };
    var join = function (__dict_Bind_76) {
        return function (m) {
            return Prelude[">>="](__dict_Bind_76)(m)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var ifM = function (__dict_Bind_77) {
        return function (cond) {
            return function (t) {
                return function (f) {
                    return Prelude[">>="](__dict_Bind_77)(cond)(function (cond$prime) {
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
PS.Control_Apply = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $less$times = function (__dict_Apply_78) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_78)(Prelude["<$>"](__dict_Apply_78["__superclass_Prelude.Functor_0"]({}))(Prelude["const"])(a))(b);
            };
        };
    };
    var $times$greater = function (__dict_Apply_79) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_79)(Prelude["<$>"](__dict_Apply_79["__superclass_Prelude.Functor_0"]({}))(Prelude["const"](Prelude.id(Prelude.categoryArr({}))))(a))(b);
            };
        };
    };
    var lift5 = function (__dict_Apply_80) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return function (e) {
                                return Prelude["<*>"](__dict_Apply_80)(Prelude["<*>"](__dict_Apply_80)(Prelude["<*>"](__dict_Apply_80)(Prelude["<*>"](__dict_Apply_80)(Prelude["<$>"](__dict_Apply_80["__superclass_Prelude.Functor_0"]({}))(f)(a))(b))(c))(d))(e);
                            };
                        };
                    };
                };
            };
        };
    };
    var lift4 = function (__dict_Apply_81) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return Prelude["<*>"](__dict_Apply_81)(Prelude["<*>"](__dict_Apply_81)(Prelude["<*>"](__dict_Apply_81)(Prelude["<$>"](__dict_Apply_81["__superclass_Prelude.Functor_0"]({}))(f)(a))(b))(c))(d);
                        };
                    };
                };
            };
        };
    };
    var lift3 = function (__dict_Apply_82) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return Prelude["<*>"](__dict_Apply_82)(Prelude["<*>"](__dict_Apply_82)(Prelude["<$>"](__dict_Apply_82["__superclass_Prelude.Functor_0"]({}))(f)(a))(b))(c);
                    };
                };
            };
        };
    };
    var lift2 = function (__dict_Apply_83) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return Prelude["<*>"](__dict_Apply_83)(Prelude["<$>"](__dict_Apply_83["__superclass_Prelude.Functor_0"]({}))(f)(a))(b);
                };
            };
        };
    };
    var forever = function (__dict_Apply_84) {
        return function (a) {
            return $times$greater(__dict_Apply_84)(a)(forever(__dict_Apply_84)(a));
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
PS.Control_Alt = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Alt($less$bar$greater, __superclass_Prelude$dotFunctor_0) {
        this["<|>"] = $less$bar$greater;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
    };
    var $less$bar$greater = function (dict) {
        return dict["<|>"];
    };
    return {
        Alt: Alt, 
        "<|>": $less$bar$greater
    };
})();
var PS = PS || {};
PS.Control_Plus = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Plus(__superclass_Control$dotAlt$dotAlt_0, empty) {
        this["__superclass_Control.Alt.Alt_0"] = __superclass_Control$dotAlt$dotAlt_0;
        this.empty = empty;
    };
    var empty = function (dict) {
        return dict.empty;
    };
    return {
        Plus: Plus, 
        empty: empty
    };
})();
var PS = PS || {};
PS.Control_Alternative = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Alt = PS.Control_Alt;
    var Control_Lazy = PS.Control_Lazy;
    function Alternative(__superclass_Control$dotPlus$dotPlus_1, __superclass_Prelude$dotApplicative_0) {
        this["__superclass_Control.Plus.Plus_1"] = __superclass_Control$dotPlus$dotPlus_1;
        this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
    };
    var many = function (__dict_Alternative_85) {
        return function (__dict_Lazy1_86) {
            return function (v) {
                return Control_Alt["<|>"]((__dict_Alternative_85["__superclass_Control.Plus.Plus_1"]({}))["__superclass_Control.Alt.Alt_0"]({}))(some(__dict_Alternative_85)(__dict_Lazy1_86)(v))(Prelude.pure(__dict_Alternative_85["__superclass_Prelude.Applicative_0"]({}))([  ]));
            };
        };
    };
    var some = function (__dict_Alternative_87) {
        return function (__dict_Lazy1_88) {
            return function (v) {
                return Prelude["<*>"]((__dict_Alternative_87["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"](((__dict_Alternative_87["__superclass_Control.Plus.Plus_1"]({}))["__superclass_Control.Alt.Alt_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"])(v))(Control_Lazy.defer1(__dict_Lazy1_88)(function (_) {
                    return many(__dict_Alternative_87)(__dict_Lazy1_88)(v);
                }));
            };
        };
    };
    return {
        Alternative: Alternative, 
        many: many, 
        some: some
    };
})();
var PS = PS || {};
PS.Control_Monad_Error = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Alt = PS.Control_Alt;
    var Data_Either = PS.Data_Either;
    var Control_Plus = PS.Control_Plus;
    var Control_Alternative = PS.Control_Alternative;
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
    var errorString = function (__unused) {
        return new Error("", Prelude.id(Prelude.categoryArr({})));
    };
    var errorEitherAlt = function (__dict_Error_91) {
        return new Control_Alt.Alt(function (_222) {
            return function (_223) {
                if (_222 instanceof Data_Either.Left) {
                    return _223;
                };
                return _222;
            };
        }, function (__unused) {
            return Data_Either.functorEither({});
        });
    };
    var errorEitherPlus = function (__dict_Error_89) {
        return new Control_Plus.Plus(function (__unused) {
            return errorEitherAlt(__dict_Error_89);
        }, new Data_Either.Left(noMsg(__dict_Error_89)));
    };
    var errorEitherAlternative = function (__dict_Error_90) {
        return new Control_Alternative.Alternative(function (__unused) {
            return errorEitherPlus(__dict_Error_90);
        }, function (__unused) {
            return Data_Either.applicativeEither({});
        });
    };
    return {
        Error: Error, 
        strMsg: strMsg, 
        noMsg: noMsg, 
        errorString: errorString, 
        errorEitherAlt: errorEitherAlt, 
        errorEitherPlus: errorEitherPlus, 
        errorEitherAlternative: errorEitherAlternative
    };
})();
var PS = PS || {};
PS.Control_MonadPlus = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Plus = PS.Control_Plus;
    function MonadPlus(__superclass_Control$dotAlternative$dotAlternative_1, __superclass_Prelude$dotMonad_0) {
        this["__superclass_Control.Alternative.Alternative_1"] = __superclass_Control$dotAlternative$dotAlternative_1;
        this["__superclass_Prelude.Monad_0"] = __superclass_Prelude$dotMonad_0;
    };
    var guard = function (__dict_MonadPlus_92) {
        return function (_224) {
            if (_224) {
                return Prelude["return"](__dict_MonadPlus_92["__superclass_Prelude.Monad_0"]({}))(Prelude.unit);
            };
            if (!_224) {
                return Control_Plus.empty((__dict_MonadPlus_92["__superclass_Control.Alternative.Alternative_1"]({}))["__superclass_Control.Plus.Plus_1"]({}));
            };
            throw new Error("Failed pattern match");
        };
    };
    return {
        MonadPlus: MonadPlus, 
        guard: guard
    };
})();
var PS = PS || {};
PS.Control_Monad_Reader_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Control_Alt = PS.Control_Alt;
    var Control_Plus = PS.Control_Plus;
    var Control_Alternative = PS.Control_Alternative;
    var Control_MonadPlus = PS.Control_MonadPlus;
    var ReaderT = {
        create: function (value) {
            return value;
        }
    };
    var runReaderT = function (_225) {
        return _225;
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
    var monadTransReaderT = function (__unused) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_95) {
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
    var functorReaderT = function (__dict_Functor_97) {
        return new Prelude.Functor(function (f) {
            return mapReaderT(Prelude["<$>"](__dict_Functor_97)(f));
        });
    };
    var applyReaderT = function (__dict_Applicative_99) {
        return new Prelude.Apply(function (f) {
            return function (v) {
                return function (r) {
                    return Prelude["<*>"](__dict_Applicative_99["__superclass_Prelude.Apply_0"]({}))(runReaderT(f)(r))(runReaderT(v)(r));
                };
            };
        }, function (__unused) {
            return functorReaderT((__dict_Applicative_99["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}));
        });
    };
    var bindReaderT = function (__dict_Monad_98) {
        return new Prelude.Bind(function (m) {
            return function (k) {
                return function (r) {
                    return Prelude[">>="](__dict_Monad_98["__superclass_Prelude.Bind_1"]({}))(runReaderT(m)(r))(function (_6) {
                        return runReaderT(k(_6))(r);
                    });
                };
            };
        }, function (__unused) {
            return applyReaderT(__dict_Monad_98["__superclass_Prelude.Applicative_0"]({}));
        });
    };
    var applicativeReaderT = function (__dict_Applicative_100) {
        return new Prelude.Applicative(function (__unused) {
            return applyReaderT(__dict_Applicative_100);
        }, Prelude["<<<"](Prelude.semigroupoidArr({}))(liftReaderT)(Prelude.pure(__dict_Applicative_100)));
    };
    var monadReaderT = function (__dict_Monad_93) {
        return new Prelude.Monad(function (__unused) {
            return applicativeReaderT(__dict_Monad_93["__superclass_Prelude.Applicative_0"]({}));
        }, function (__unused) {
            return bindReaderT(__dict_Monad_93);
        });
    };
    var altReaderT = function (__dict_Alt_102) {
        return new Control_Alt.Alt(function (m) {
            return function (n) {
                return function (r) {
                    return Control_Alt["<|>"](__dict_Alt_102)(runReaderT(m)(r))(runReaderT(n)(r));
                };
            };
        }, function (__unused) {
            return functorReaderT(__dict_Alt_102["__superclass_Prelude.Functor_0"]({}));
        });
    };
    var plusReaderT = function (__dict_Plus_96) {
        return new Control_Plus.Plus(function (__unused) {
            return altReaderT(__dict_Plus_96["__superclass_Control.Alt.Alt_0"]({}));
        }, liftReaderT(Control_Plus.empty(__dict_Plus_96)));
    };
    var alternativeReaderT = function (__dict_Alternative_101) {
        return new Control_Alternative.Alternative(function (__unused) {
            return plusReaderT(__dict_Alternative_101["__superclass_Control.Plus.Plus_1"]({}));
        }, function (__unused) {
            return applicativeReaderT(__dict_Alternative_101["__superclass_Prelude.Applicative_0"]({}));
        });
    };
    var monadPlusReaderT = function (__dict_MonadPlus_94) {
        return new Control_MonadPlus.MonadPlus(function (__unused) {
            return alternativeReaderT(__dict_MonadPlus_94["__superclass_Control.Alternative.Alternative_1"]({}));
        }, function (__unused) {
            return monadReaderT(__dict_MonadPlus_94["__superclass_Prelude.Monad_0"]({}));
        });
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
        altReaderT: altReaderT, 
        plusReaderT: plusReaderT, 
        alternativeReaderT: alternativeReaderT, 
        bindReaderT: bindReaderT, 
        monadReaderT: monadReaderT, 
        monadPlusReaderT: monadPlusReaderT, 
        monadTransReaderT: monadTransReaderT
    };
})();
var PS = PS || {};
PS.Control_Monad_Reader = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Reader_Trans = PS.Control_Monad_Reader_Trans;
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
PS.Data_Maybe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Alt = PS.Control_Alt;
    var Control_Plus = PS.Control_Plus;
    var Control_Alternative = PS.Control_Alternative;
    var Control_MonadPlus = PS.Control_MonadPlus;
    function Nothing() {

    };
    Nothing.value = new Nothing();
    function Just(value0) {
        this.value0 = value0;
    };
    Just.create = function (value0) {
        return new Just(value0);
    };
    var showMaybe = function (__dict_Show_103) {
        return new Prelude.Show(function (_237) {
            if (_237 instanceof Just) {
                return "Just (" + Prelude.show(__dict_Show_103)(_237.value0) + ")";
            };
            if (_237 instanceof Nothing) {
                return "Nothing";
            };
            throw new Error("Failed pattern match");
        });
    };
    var maybe = function (_226) {
        return function (_227) {
            return function (_228) {
                if (_228 instanceof Nothing) {
                    return _226;
                };
                if (_228 instanceof Just) {
                    return _227(_228.value0);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var isNothing = maybe(true)(Prelude["const"](false));
    var isJust = maybe(false)(Prelude["const"](true));
    var functorMaybe = function (__unused) {
        return new Prelude.Functor(function (_229) {
            return function (_230) {
                if (_230 instanceof Just) {
                    return new Just(_229(_230.value0));
                };
                return Nothing.value;
            };
        });
    };
    var fromMaybe = function (a) {
        return maybe(a)(Prelude.id(Prelude.categoryArr({})));
    };
    var eqMaybe = function (__dict_Eq_105) {
        return new Prelude.Eq(function (a) {
            return function (b) {
                return !Prelude["=="](eqMaybe(__dict_Eq_105))(a)(b);
            };
        }, function (_238) {
            return function (_239) {
                if (_238 instanceof Nothing && _239 instanceof Nothing) {
                    return true;
                };
                if (_238 instanceof Just && _239 instanceof Just) {
                    return Prelude["=="](__dict_Eq_105)(_238.value0)(_239.value0);
                };
                return false;
            };
        });
    };
    var ordMaybe = function (__dict_Ord_104) {
        return new Prelude.Ord(function (__unused) {
            return eqMaybe(__dict_Ord_104["__superclass_Prelude.Eq_0"]({}));
        }, function (_240) {
            return function (_241) {
                if (_240 instanceof Just && _241 instanceof Just) {
                    return Prelude.compare(__dict_Ord_104)(_240.value0)(_241.value0);
                };
                if (_240 instanceof Nothing && _241 instanceof Nothing) {
                    return Prelude.EQ.value;
                };
                if (_240 instanceof Nothing) {
                    return Prelude.LT.value;
                };
                if (_241 instanceof Nothing) {
                    return Prelude.GT.value;
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var applyMaybe = function (__unused) {
        return new Prelude.Apply(function (_231) {
            return function (_232) {
                if (_231 instanceof Just) {
                    return Prelude["<$>"](functorMaybe({}))(_231.value0)(_232);
                };
                if (_231 instanceof Nothing) {
                    return Nothing.value;
                };
                throw new Error("Failed pattern match");
            };
        }, functorMaybe);
    };
    var bindMaybe = function (__unused) {
        return new Prelude.Bind(function (_235) {
            return function (_236) {
                if (_235 instanceof Just) {
                    return _236(_235.value0);
                };
                if (_235 instanceof Nothing) {
                    return Nothing.value;
                };
                throw new Error("Failed pattern match");
            };
        }, applyMaybe);
    };
    var applicativeMaybe = function (__unused) {
        return new Prelude.Applicative(applyMaybe, Just.create);
    };
    var monadMaybe = function (__unused) {
        return new Prelude.Monad(applicativeMaybe, bindMaybe);
    };
    var altMaybe = function (__unused) {
        return new Control_Alt.Alt(function (_233) {
            return function (_234) {
                if (_233 instanceof Nothing) {
                    return _234;
                };
                return _233;
            };
        }, functorMaybe);
    };
    var plusMaybe = function (__unused) {
        return new Control_Plus.Plus(altMaybe, Nothing.value);
    };
    var alternativeMaybe = function (__unused) {
        return new Control_Alternative.Alternative(plusMaybe, applicativeMaybe);
    };
    var monadPlusMaybe = function (__unused) {
        return new Control_MonadPlus.MonadPlus(alternativeMaybe, monadMaybe);
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
        altMaybe: altMaybe, 
        plusMaybe: plusMaybe, 
        alternativeMaybe: alternativeMaybe, 
        bindMaybe: bindMaybe, 
        monadMaybe: monadMaybe, 
        monadPlusMaybe: monadPlusMaybe, 
        showMaybe: showMaybe, 
        eqMaybe: eqMaybe, 
        ordMaybe: ordMaybe
    };
})();
var PS = PS || {};
PS.Data_Array = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    var Control_Alt = PS.Control_Alt;
    var Control_Plus = PS.Control_Plus;
    var Control_Alternative = PS.Control_Alternative;
    var Control_MonadPlus = PS.Control_MonadPlus;
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
    var tail = function (_244) {
        if (_244.length > 0) {
            var _1071 = _244.slice(1);
            return new Data_Maybe.Just(_1071);
        };
        return Data_Maybe.Nothing.value;
    };
    var span = (function () {
        var go = function (__copy__260) {
            return function (__copy__261) {
                return function (__copy__262) {
                    var _260 = __copy__260;
                    var _261 = __copy__261;
                    var _262 = __copy__262;
                    tco: while (true) {
                        if (_262.length > 0) {
                            var _1076 = _262.slice(1);
                            if (_261(_262[0])) {
                                var __tco__260 = Prelude[":"](_262[0])(_260);
                                var __tco__261 = _261;
                                _260 = __tco__260;
                                _261 = __tco__261;
                                _262 = _1076;
                                continue tco;
                            };
                        };
                        return {
                            init: reverse(_260), 
                            rest: _262
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
                    var _1077 = comp(x)(y);
                    if (_1077 instanceof Prelude.GT) {
                        return 1;
                    };
                    if (_1077 instanceof Prelude.EQ) {
                        return 0;
                    };
                    if (_1077 instanceof Prelude.LT) {
                        return -1;
                    };
                    throw new Error("Failed pattern match");
                };
            };
            return sortJS(comp$prime)(xs);
        };
    };
    var sort = function (__dict_Ord_106) {
        return function (xs) {
            return sortBy(Prelude.compare(__dict_Ord_106))(xs);
        };
    };
    var singleton = function (a) {
        return [ a ];
    };
    var semigroupArray = function (__unused) {
        return new Prelude.Semigroup(append);
    };
    var $$null = function (_246) {
        if (_246.length === 0) {
            return true;
        };
        return false;
    };
    var nubBy = function (_253) {
        return function (_254) {
            if (_254.length === 0) {
                return [  ];
            };
            if (_254.length > 0) {
                var _1082 = _254.slice(1);
                return Prelude[":"](_254[0])(nubBy(_253)(filter(function (y) {
                    return !_253(_254[0])(y);
                })(_1082)));
            };
            throw new Error("Failed pattern match");
        };
    };
    var nub = function (__dict_Eq_107) {
        return nubBy(Prelude["=="](__dict_Eq_107));
    };
    var mapMaybe = function (f) {
        return concatMap(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe.maybe([  ])(singleton))(f));
    };
    var last = function (__copy__243) {
        var _243 = __copy__243;
        tco: while (true) {
            if (_243.length > 0) {
                var _1085 = _243.slice(1);
                if (_1085.length === 0) {
                    return new Data_Maybe.Just(_243[0]);
                };
            };
            if (_243.length > 0) {
                var _1087 = _243.slice(1);
                _243 = _1087;
                continue tco;
            };
            return Data_Maybe.Nothing.value;
        };
    };
    var intersectBy = function (_250) {
        return function (_251) {
            return function (_252) {
                if (_251.length === 0) {
                    return [  ];
                };
                if (_252.length === 0) {
                    return [  ];
                };
                var el = function (x) {
                    return findIndex(_250(x))(_252) >= 0;
                };
                return filter(el)(_251);
            };
        };
    };
    var intersect = function (__dict_Eq_108) {
        return intersectBy(Prelude["=="](__dict_Eq_108));
    };
    var init = function (_245) {
        if (_245.length === 0) {
            return Data_Maybe.Nothing.value;
        };
        return new Data_Maybe.Just(slice(0)(length(_245) - 1)(_245));
    };
    var head = function (_242) {
        if (_242.length > 0) {
            var _1094 = _242.slice(1);
            return new Data_Maybe.Just(_242[0]);
        };
        return Data_Maybe.Nothing.value;
    };
    var groupBy = (function () {
        var go = function (__copy__257) {
            return function (__copy__258) {
                return function (__copy__259) {
                    var _257 = __copy__257;
                    var _258 = __copy__258;
                    var _259 = __copy__259;
                    tco: while (true) {
                        if (_259.length === 0) {
                            return reverse(_257);
                        };
                        if (_259.length > 0) {
                            var _1099 = _259.slice(1);
                            var sp = span(_258(_259[0]))(_1099);
                            var __tco__257 = Prelude[":"](Prelude[":"](_259[0])(sp.init))(_257);
                            var __tco__258 = _258;
                            _257 = __tco__257;
                            _258 = __tco__258;
                            _259 = sp.rest;
                            continue tco;
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        return go([  ]);
    })();
    var group = function (__dict_Eq_109) {
        return function (xs) {
            return groupBy(Prelude["=="](__dict_Eq_109))(xs);
        };
    };
    var group$prime = function (__dict_Ord_110) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(group(__dict_Ord_110["__superclass_Prelude.Eq_0"]({})))(sort(__dict_Ord_110));
    };
    var functorArray = function (__unused) {
        return new Prelude.Functor(map);
    };
    var elemLastIndex = function (__dict_Eq_111) {
        return function (x) {
            return findLastIndex(Prelude["=="](__dict_Eq_111)(x));
        };
    };
    var elemIndex = function (__dict_Eq_112) {
        return function (x) {
            return findIndex(Prelude["=="](__dict_Eq_112)(x));
        };
    };
    var deleteBy = function (_247) {
        return function (_248) {
            return function (_249) {
                if (_249.length === 0) {
                    return [  ];
                };
                var _1103 = findIndex(_247(_248))(_249);
                if (_1103 < 0) {
                    return _249;
                };
                return deleteAt(_1103)(1)(_249);
            };
        };
    };
    var $$delete = function (__dict_Eq_113) {
        return deleteBy(Prelude["=="](__dict_Eq_113));
    };
    var $bslash$bslash = function (__dict_Eq_114) {
        return function (xs) {
            return function (ys) {
                var go = function (__copy__255) {
                    return function (__copy__256) {
                        var _255 = __copy__255;
                        var _256 = __copy__256;
                        tco: while (true) {
                            if (_256.length === 0) {
                                return _255;
                            };
                            if (_255.length === 0) {
                                return [  ];
                            };
                            if (_256.length > 0) {
                                var _1107 = _256.slice(1);
                                var __tco__255 = $$delete(__dict_Eq_114)(_256[0])(_255);
                                _255 = __tco__255;
                                _256 = _1107;
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
    var applicativeArray = function (__unused) {
        return new Prelude.Applicative(applyArray, singleton);
    };
    var applyArray = function (__unused) {
        return new Prelude.Apply(Prelude.ap(monadArray({})), functorArray);
    };
    var monadArray = function (__unused) {
        return new Prelude.Monad(applicativeArray, bindArray);
    };
    var bindArray = function (__unused) {
        return new Prelude.Bind(Prelude.flip(concatMap), applyArray);
    };
    var altArray = function (__unused) {
        return new Control_Alt.Alt(append, functorArray);
    };
    var plusArray = function (__unused) {
        return new Control_Plus.Plus(altArray, [  ]);
    };
    var alternativeArray = function (__unused) {
        return new Control_Alternative.Alternative(plusArray, applicativeArray);
    };
    var monadPlusArray = function (__unused) {
        return new Control_MonadPlus.MonadPlus(alternativeArray, monadArray);
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
        altArray: altArray, 
        plusArray: plusArray, 
        alternativeArray: alternativeArray, 
        monadPlusArray: monadPlusArray
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
    var monoidUnit = function (__unused) {
        return new Monoid(function (__unused) {
            return Prelude.semigroupUnit({});
        }, Prelude.unit);
    };
    var monoidString = function (__unused) {
        return new Monoid(function (__unused) {
            return Prelude.semigroupString({});
        }, "");
    };
    var monoidArray = function (__unused) {
        return new Monoid(function (__unused) {
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
        monoidArray: monoidArray, 
        monoidUnit: monoidUnit
    };
})();
var PS = PS || {};
PS.Data_Const = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var Data_Contravariant = PS.Data_Contravariant;
    var Const = {
        create: function (value) {
            return value;
        }
    };
    var showConst = function (__dict_Show_115) {
        return new Prelude.Show(function (_266) {
            return Prelude.show(__dict_Show_115)(_266);
        });
    };
    var semigroupoidConst = function (__unused) {
        return new Prelude.Semigroupoid(function (_269) {
            return function (_270) {
                return _270;
            };
        });
    };
    var semigroupConst = function (__dict_Semigroup_116) {
        return new Prelude.Semigroup(function (_271) {
            return function (_272) {
                return Prelude["<>"](__dict_Semigroup_116)(_271)(_272);
            };
        });
    };
    var monoidConst = function (__dict_Monoid_118) {
        return new Data_Monoid.Monoid(function (__unused) {
            return semigroupConst(__dict_Monoid_118["__superclass_Prelude.Semigroup_0"]({}));
        }, Data_Monoid.mempty(__dict_Monoid_118));
    };
    var getConst = function (_263) {
        return _263;
    };
    var functorConst = function (__unused) {
        return new Prelude.Functor(function (_273) {
            return function (_274) {
                return _274;
            };
        });
    };
    var eqConst = function (__dict_Eq_119) {
        return new Prelude.Eq(function (c) {
            return function (c$prime) {
                return !Prelude["=="](eqConst(__dict_Eq_119))(c)(c$prime);
            };
        }, function (_264) {
            return function (_265) {
                return Prelude["=="](__dict_Eq_119)(_264)(_265);
            };
        });
    };
    var ordConst = function (__dict_Ord_117) {
        return new Prelude.Ord(function (__unused) {
            return eqConst(__dict_Ord_117["__superclass_Prelude.Eq_0"]({}));
        }, function (_267) {
            return function (_268) {
                return Prelude.compare(__dict_Ord_117)(_267)(_268);
            };
        });
    };
    var contravariantConst = function (__unused) {
        return new Data_Contravariant.Contravariant(function (_280) {
            return function (_281) {
                return _281;
            };
        });
    };
    var applyConst = function (__dict_Semigroup_121) {
        return new Prelude.Apply(function (_275) {
            return function (_276) {
                return Prelude["<>"](__dict_Semigroup_121)(_275)(_276);
            };
        }, functorConst);
    };
    var bindConst = function (__dict_Semigroup_120) {
        return new Prelude.Bind(function (_277) {
            return function (_278) {
                return _277;
            };
        }, function (__unused) {
            return applyConst(__dict_Semigroup_120);
        });
    };
    var applicativeConst = function (__dict_Monoid_122) {
        return new Prelude.Applicative(function (__unused) {
            return applyConst(__dict_Monoid_122["__superclass_Prelude.Semigroup_0"]({}));
        }, function (_279) {
            return Data_Monoid.mempty(__dict_Monoid_122);
        });
    };
    return {
        Const: Const, 
        getConst: getConst, 
        eqConst: eqConst, 
        showConst: showConst, 
        ordConst: ordConst, 
        semigroupoidConst: semigroupoidConst, 
        semigroupConst: semigroupConst, 
        monoidConst: monoidConst, 
        functorConst: functorConst, 
        applyConst: applyConst, 
        bindConst: bindConst, 
        applicativeConst: applicativeConst, 
        contravariantConst: contravariantConst
    };
})();
var PS = PS || {};
PS.Data_Monoid_All = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var All = {
        create: function (value) {
            return value;
        }
    };
    var showAll = function (__unused) {
        return new Prelude.Show(function (_287) {
            return "All (" + Prelude.show(Prelude.showBoolean({}))(_287) + ")";
        });
    };
    var semigroupAll = function (__unused) {
        return new Prelude.Semigroup(function (_288) {
            return function (_289) {
                return _288 && _289;
            };
        });
    };
    var runAll = function (_282) {
        return _282;
    };
    var monoidAll = function (__unused) {
        return new Data_Monoid.Monoid(semigroupAll, true);
    };
    var eqAll = function (__unused) {
        return new Prelude.Eq(function (_285) {
            return function (_286) {
                return _285 !== _286;
            };
        }, function (_283) {
            return function (_284) {
                return _283 === _284;
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
    var Any = {
        create: function (value) {
            return value;
        }
    };
    var showAny = function (__unused) {
        return new Prelude.Show(function (_295) {
            return "Any (" + Prelude.show(Prelude.showBoolean({}))(_295) + ")";
        });
    };
    var semigroupAny = function (__unused) {
        return new Prelude.Semigroup(function (_296) {
            return function (_297) {
                return _296 || _297;
            };
        });
    };
    var runAny = function (_290) {
        return _290;
    };
    var monoidAny = function (__unused) {
        return new Data_Monoid.Monoid(semigroupAny, false);
    };
    var eqAny = function (__unused) {
        return new Prelude.Eq(function (_293) {
            return function (_294) {
                return _293 !== _294;
            };
        }, function (_291) {
            return function (_292) {
                return _291 === _292;
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
    var Dual = {
        create: function (value) {
            return value;
        }
    };
    var showDual = function (__dict_Show_123) {
        return new Prelude.Show(function (_305) {
            return "Dual (" + Prelude.show(__dict_Show_123)(_305) + ")";
        });
    };
    var semigroupDual = function (__dict_Semigroup_124) {
        return new Prelude.Semigroup(function (_306) {
            return function (_307) {
                return Prelude["<>"](__dict_Semigroup_124)(_307)(_306);
            };
        });
    };
    var runDual = function (_298) {
        return _298;
    };
    var monoidDual = function (__dict_Monoid_126) {
        return new Data_Monoid.Monoid(function (__unused) {
            return semigroupDual(__dict_Monoid_126["__superclass_Prelude.Semigroup_0"]({}));
        }, Data_Monoid.mempty(__dict_Monoid_126));
    };
    var eqDual = function (__dict_Eq_127) {
        return new Prelude.Eq(function (_301) {
            return function (_302) {
                return Prelude["/="](__dict_Eq_127)(_301)(_302);
            };
        }, function (_299) {
            return function (_300) {
                return Prelude["=="](__dict_Eq_127)(_299)(_300);
            };
        });
    };
    var ordDual = function (__dict_Ord_125) {
        return new Prelude.Ord(function (__unused) {
            return eqDual(__dict_Ord_125["__superclass_Prelude.Eq_0"]({}));
        }, function (_303) {
            return function (_304) {
                return Prelude.compare(__dict_Ord_125)(_303)(_304);
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
    var Endo = {
        create: function (value) {
            return value;
        }
    };
    var semigroupEndo = function (__unused) {
        return new Prelude.Semigroup(function (_309) {
            return function (_310) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(_309)(_310);
            };
        });
    };
    var runEndo = function (_308) {
        return _308;
    };
    var monoidEndo = function (__unused) {
        return new Data_Monoid.Monoid(semigroupEndo, Prelude.id(Prelude.categoryArr({})));
    };
    return {
        Endo: Endo, 
        runEndo: runEndo, 
        semigroupEndo: semigroupEndo, 
        monoidEndo: monoidEndo
    };
})();
var PS = PS || {};
PS.Data_Monoid_Product = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var Product = {
        create: function (value) {
            return value;
        }
    };
    var showProduct = function (__unused) {
        return new Prelude.Show(function (_318) {
            return "Product (" + Prelude.show(Prelude.showNumber({}))(_318) + ")";
        });
    };
    var semigroupProduct = function (__unused) {
        return new Prelude.Semigroup(function (_319) {
            return function (_320) {
                return _319 * _320;
            };
        });
    };
    var runProduct = function (_311) {
        return _311;
    };
    var monoidProduct = function (__unused) {
        return new Data_Monoid.Monoid(semigroupProduct, 1);
    };
    var eqProduct = function (__unused) {
        return new Prelude.Eq(function (_314) {
            return function (_315) {
                return _314 !== _315;
            };
        }, function (_312) {
            return function (_313) {
                return _312 === _313;
            };
        });
    };
    var ordProduct = function (__unused) {
        return new Prelude.Ord(eqProduct, function (_316) {
            return function (_317) {
                return Prelude.compare(Prelude.ordNumber({}))(_316)(_317);
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
    var Sum = {
        create: function (value) {
            return value;
        }
    };
    var showSum = function (__unused) {
        return new Prelude.Show(function (_328) {
            return "Sum (" + Prelude.show(Prelude.showNumber({}))(_328) + ")";
        });
    };
    var semigroupSum = function (__unused) {
        return new Prelude.Semigroup(function (_329) {
            return function (_330) {
                return _329 + _330;
            };
        });
    };
    var runSum = function (_321) {
        return _321;
    };
    var monoidSum = function (__unused) {
        return new Data_Monoid.Monoid(semigroupSum, 0);
    };
    var eqSum = function (__unused) {
        return new Prelude.Eq(function (_324) {
            return function (_325) {
                return _324 !== _325;
            };
        }, function (_322) {
            return function (_323) {
                return _322 === _323;
            };
        });
    };
    var ordSum = function (__unused) {
        return new Prelude.Ord(eqSum, function (_326) {
            return function (_327) {
                return Prelude.compare(Prelude.ordNumber({}))(_326)(_327);
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
    var Control_Lazy = PS.Control_Lazy;
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
    var unzip = function (_335) {
        if (_335.length > 0) {
            var _1181 = _335.slice(1);
            var _1177 = unzip(_1181);
            return new Tuple(Prelude[":"]((_335[0]).value0)(_1177.value0), Prelude[":"]((_335[0]).value1)(_1177.value1));
        };
        if (_335.length === 0) {
            return new Tuple([  ], [  ]);
        };
        throw new Error("Failed pattern match");
    };
    var uncurry = function (_333) {
        return function (_334) {
            return _333(_334.value0)(_334.value1);
        };
    };
    var swap = function (_336) {
        return new Tuple(_336.value1, _336.value0);
    };
    var snd = function (_332) {
        return _332.value1;
    };
    var showTuple = function (__dict_Show_128) {
        return function (__dict_Show_129) {
            return new Prelude.Show(function (_337) {
                return "Tuple (" + Prelude.show(__dict_Show_128)(_337.value0) + ") (" + Prelude.show(__dict_Show_129)(_337.value1) + ")";
            });
        };
    };
    var functorTuple = function (__unused) {
        return new Prelude.Functor(function (_342) {
            return function (_343) {
                return new Tuple(_343.value0, _342(_343.value1));
            };
        });
    };
    var fst = function (_331) {
        return _331.value0;
    };
    var lazyLazy1Tuple = function (__dict_Lazy1_133) {
        return function (__dict_Lazy1_134) {
            return new Control_Lazy.Lazy(function (f) {
                return new Tuple(Control_Lazy.defer1(__dict_Lazy1_133)(function (_) {
                    return fst(f(Prelude.unit));
                }), Control_Lazy.defer1(__dict_Lazy1_134)(function (_) {
                    return snd(f(Prelude.unit));
                }));
            });
        };
    };
    var lazyLazy2Tuple = function (__dict_Lazy2_135) {
        return function (__dict_Lazy2_136) {
            return new Control_Lazy.Lazy(function (f) {
                return new Tuple(Control_Lazy.defer2(__dict_Lazy2_135)(function (_) {
                    return fst(f(Prelude.unit));
                }), Control_Lazy.defer2(__dict_Lazy2_136)(function (_) {
                    return snd(f(Prelude.unit));
                }));
            });
        };
    };
    var lazyTuple = function (__dict_Lazy_137) {
        return function (__dict_Lazy_138) {
            return new Control_Lazy.Lazy(function (f) {
                return new Tuple(Control_Lazy.defer(__dict_Lazy_137)(function (_) {
                    return fst(f(Prelude.unit));
                }), Control_Lazy.defer(__dict_Lazy_138)(function (_) {
                    return snd(f(Prelude.unit));
                }));
            });
        };
    };
    var eqTuple = function (__dict_Eq_139) {
        return function (__dict_Eq_140) {
            return new Prelude.Eq(function (t1) {
                return function (t2) {
                    return !Prelude["=="](eqTuple(__dict_Eq_139)(__dict_Eq_140))(t1)(t2);
                };
            }, function (_338) {
                return function (_339) {
                    return Prelude["=="](__dict_Eq_139)(_338.value0)(_339.value0) && Prelude["=="](__dict_Eq_140)(_338.value1)(_339.value1);
                };
            });
        };
    };
    var ordTuple = function (__dict_Ord_130) {
        return function (__dict_Ord_131) {
            return new Prelude.Ord(function (__unused) {
                return eqTuple(__dict_Ord_130["__superclass_Prelude.Eq_0"]({}))(__dict_Ord_131["__superclass_Prelude.Eq_0"]({}));
            }, function (_340) {
                return function (_341) {
                    var _1212 = Prelude.compare(__dict_Ord_130)(_340.value0)(_341.value0);
                    if (_1212 instanceof Prelude.EQ) {
                        return Prelude.compare(__dict_Ord_131)(_340.value1)(_341.value1);
                    };
                    return _1212;
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
    var applyTuple = function (__dict_Semigroup_142) {
        return new Prelude.Apply(function (_344) {
            return function (_345) {
                return new Tuple(Prelude["<>"](__dict_Semigroup_142)(_344.value0)(_345.value0), _344.value1(_345.value1));
            };
        }, functorTuple);
    };
    var bindTuple = function (__dict_Semigroup_141) {
        return new Prelude.Bind(function (_346) {
            return function (_347) {
                var _1225 = _347(_346.value1);
                return new Tuple(Prelude["<>"](__dict_Semigroup_141)(_346.value0)(_1225.value0), _1225.value1);
            };
        }, function (__unused) {
            return applyTuple(__dict_Semigroup_141);
        });
    };
    var applicativeTuple = function (__dict_Monoid_143) {
        return new Prelude.Applicative(function (__unused) {
            return applyTuple(__dict_Monoid_143["__superclass_Prelude.Semigroup_0"]({}));
        }, Tuple.create(Data_Monoid.mempty(__dict_Monoid_143)));
    };
    var monadTuple = function (__dict_Monoid_132) {
        return new Prelude.Monad(function (__unused) {
            return applicativeTuple(__dict_Monoid_132);
        }, function (__unused) {
            return bindTuple(__dict_Monoid_132["__superclass_Prelude.Semigroup_0"]({}));
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
        monadTuple: monadTuple, 
        lazyTuple: lazyTuple, 
        lazyLazy1Tuple: lazyLazy1Tuple, 
        lazyLazy2Tuple: lazyLazy2Tuple
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
    var arrowFunction = function (__unused) {
        return new Arrow(function (__unused) {
            return Prelude.categoryArr({});
        }, function (f) {
            return f;
        }, function (_348) {
            return function (_349) {
                return new Data_Tuple.Tuple(_348(_349.value0), _349.value1);
            };
        });
    };
    var arr = function (dict) {
        return dict.arr;
    };
    var second = function (__dict_Arrow_144) {
        return function (f) {
            return Prelude[">>>"]((__dict_Arrow_144["__superclass_Prelude.Category_0"]({}))["__superclass_Prelude.Semigroupoid_0"]({}))(arr(__dict_Arrow_144)(Data_Tuple.swap))(Prelude[">>>"]((__dict_Arrow_144["__superclass_Prelude.Category_0"]({}))["__superclass_Prelude.Semigroupoid_0"]({}))(first(__dict_Arrow_144)(f))(arr(__dict_Arrow_144)(Data_Tuple.swap)));
        };
    };
    var $times$times$times = function (__dict_Arrow_145) {
        return function (f) {
            return function (g) {
                return Prelude[">>>"]((__dict_Arrow_145["__superclass_Prelude.Category_0"]({}))["__superclass_Prelude.Semigroupoid_0"]({}))(first(__dict_Arrow_145)(f))(second(__dict_Arrow_145)(g));
            };
        };
    };
    var $amp$amp$amp = function (__dict_Arrow_146) {
        return function (f) {
            return function (g) {
                return Prelude[">>>"]((__dict_Arrow_146["__superclass_Prelude.Category_0"]({}))["__superclass_Prelude.Semigroupoid_0"]({}))(arr(__dict_Arrow_146)(function (b) {
                    return new Data_Tuple.Tuple(b, b);
                }))($times$times$times(__dict_Arrow_146)(f)(g));
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
    var arrowChoiceArr = function (__unused) {
        return new ArrowChoice(function (__unused) {
            return Control_Arrow.arrowFunction({});
        }, function (_350) {
            return function (_351) {
                if (_351 instanceof Data_Either.Left) {
                    return Data_Either.Left.create(_350(_351.value0));
                };
                if (_351 instanceof Data_Either.Right) {
                    return new Data_Either.Right(_351.value0);
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
PS.Control_Arrow_ArrowApply = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Arrow = PS.Control_Arrow;
    function ArrowApply(__superclass_Control$dotArrow$dotArrow_0, app) {
        this["__superclass_Control.Arrow.Arrow_0"] = __superclass_Control$dotArrow$dotArrow_0;
        this.app = app;
    };
    var arrowApplyArr = function (__unused) {
        return new ArrowApply(function (__unused) {
            return Control_Arrow.arrowFunction({});
        }, function (_352) {
            return _352.value0(_352.value1);
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
    var semigroupoidKleisli = function (__dict_Monad_147) {
        return new Prelude.Semigroupoid(function (_355) {
            return function (_356) {
                return new Kleisli(function (b) {
                    return Prelude[">>="](__dict_Monad_147["__superclass_Prelude.Bind_1"]({}))(_356.value0(b))(_355.value0);
                });
            };
        });
    };
    var runKleisli = function (_354) {
        return _354.value0;
    };
    var categoryKleisli = function (__dict_Monad_148) {
        return new Prelude.Category(function (__unused) {
            return semigroupoidKleisli(__dict_Monad_148);
        }, new Kleisli(Prelude["return"](__dict_Monad_148)));
    };
    var arrowKleisli = function (__dict_Monad_149) {
        return new Control_Arrow.Arrow(function (__unused) {
            return categoryKleisli(__dict_Monad_149);
        }, function (f) {
            return new Kleisli(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](__dict_Monad_149))(f));
        }, function (_357) {
            return new Kleisli(function (_353) {
                return Prelude[">>="](__dict_Monad_149["__superclass_Prelude.Bind_1"]({}))(_357.value0(_353.value0))(function (c) {
                    return Prelude["return"](__dict_Monad_149)(new Data_Tuple.Tuple(c, _353.value1));
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
PS.Control_Monad_Error_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Data_Either = PS.Data_Either;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Alt = PS.Control_Alt;
    var Control_Plus = PS.Control_Plus;
    var Control_Monad_Error = PS.Control_Monad_Error;
    var Control_Alternative = PS.Control_Alternative;
    var Control_MonadPlus = PS.Control_MonadPlus;
    var ErrorT = {
        create: function (value) {
            return value;
        }
    };
    var runErrorT = function (_358) {
        return _358;
    };
    var monadTransErrorT = function (__dict_Error_152) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_153) {
            return function (m) {
                return ErrorT.create(Prelude[">>="](__dict_Monad_153["__superclass_Prelude.Bind_1"]({}))(m)(function (_10) {
                    return Prelude["return"](__dict_Monad_153)(new Data_Either.Right(_10));
                }));
            };
        });
    };
    var mapErrorT = function (f) {
        return function (m) {
            return ErrorT.create(f(runErrorT(m)));
        };
    };
    var liftPassError = function (__dict_Monad_158) {
        return function (pass) {
            return mapErrorT(function (m) {
                return pass(Prelude[">>="](__dict_Monad_158["__superclass_Prelude.Bind_1"]({}))(m)(function (_12) {
                    return Prelude["return"](__dict_Monad_158)((function () {
                        if (_12 instanceof Data_Either.Left) {
                            return new Data_Tuple.Tuple(new Data_Either.Left(_12.value0), Prelude.id(Prelude.categoryArr({})));
                        };
                        if (_12 instanceof Data_Either.Right) {
                            return new Data_Tuple.Tuple(new Data_Either.Right(_12.value0.value0), _12.value0.value1);
                        };
                        throw new Error("Failed pattern match");
                    })());
                }));
            });
        };
    };
    var liftListenError = function (__dict_Monad_159) {
        return function (listen) {
            return mapErrorT(function (m) {
                return Prelude[">>="](__dict_Monad_159["__superclass_Prelude.Bind_1"]({}))(listen(m))(function (_11) {
                    return Prelude["return"](__dict_Monad_159)(Prelude["<$>"](Data_Either.functorEither({}))(function (r) {
                        return new Data_Tuple.Tuple(r, _11.value1);
                    })(_11.value0));
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
    var functorErrorT = function (__dict_Functor_160) {
        return new Prelude.Functor(function (f) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(ErrorT.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"](__dict_Functor_160)(Prelude["<$>"](Data_Either.functorEither({}))(f)))(runErrorT));
        });
    };
    var applyErrorT = function (__dict_Functor_163) {
        return function (__dict_Monad_164) {
            return new Prelude.Apply(function (f) {
                return function (v) {
                    return ErrorT.create(Prelude[">>="](__dict_Monad_164["__superclass_Prelude.Bind_1"]({}))(runErrorT(f))(function (_8) {
                        if (_8 instanceof Data_Either.Left) {
                            return Prelude["return"](__dict_Monad_164)(new Data_Either.Left(_8.value0));
                        };
                        if (_8 instanceof Data_Either.Right) {
                            return Prelude[">>="](__dict_Monad_164["__superclass_Prelude.Bind_1"]({}))(runErrorT(v))(function (_7) {
                                return Prelude["return"](__dict_Monad_164)((function () {
                                    if (_7 instanceof Data_Either.Left) {
                                        return new Data_Either.Left(_7.value0);
                                    };
                                    if (_7 instanceof Data_Either.Right) {
                                        return new Data_Either.Right(_8.value0(_7.value0));
                                    };
                                    throw new Error("Failed pattern match");
                                })());
                            });
                        };
                        throw new Error("Failed pattern match");
                    }));
                };
            }, function (__unused) {
                return functorErrorT(__dict_Functor_163);
            });
        };
    };
    var bindErrorT = function (__dict_Monad_161) {
        return function (__dict_Error_162) {
            return new Prelude.Bind(function (m) {
                return function (f) {
                    return ErrorT.create(Prelude[">>="](__dict_Monad_161["__superclass_Prelude.Bind_1"]({}))(runErrorT(m))(function (_9) {
                        if (_9 instanceof Data_Either.Left) {
                            return Prelude["return"](__dict_Monad_161)(new Data_Either.Left(_9.value0));
                        };
                        if (_9 instanceof Data_Either.Right) {
                            return runErrorT(f(_9.value0));
                        };
                        throw new Error("Failed pattern match");
                    }));
                };
            }, function (__unused) {
                return applyErrorT(((__dict_Monad_161["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_161);
            });
        };
    };
    var applicativeErrorT = function (__dict_Functor_165) {
        return function (__dict_Monad_166) {
            return new Prelude.Applicative(function (__unused) {
                return applyErrorT(__dict_Functor_165)(__dict_Monad_166);
            }, function (a) {
                return ErrorT.create(Prelude.pure(__dict_Monad_166["__superclass_Prelude.Applicative_0"]({}))(new Data_Either.Right(a)));
            });
        };
    };
    var monadErrorT = function (__dict_Monad_156) {
        return function (__dict_Error_157) {
            return new Prelude.Monad(function (__unused) {
                return applicativeErrorT(((__dict_Monad_156["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_156);
            }, function (__unused) {
                return bindErrorT(__dict_Monad_156)(__dict_Error_157);
            });
        };
    };
    var altErrorT = function (__dict_Monad_169) {
        return function (__dict_Error_170) {
            return new Control_Alt.Alt(function (x) {
                return function (y) {
                    return ErrorT.create(Prelude[">>="](__dict_Monad_169["__superclass_Prelude.Bind_1"]({}))(runErrorT(x))(function (e) {
                        if (e instanceof Data_Either.Left) {
                            return runErrorT(y);
                        };
                        return Prelude["return"](__dict_Monad_169)(e);
                    }));
                };
            }, function (__unused) {
                return functorErrorT(((__dict_Monad_169["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}));
            });
        };
    };
    var plusErrorT = function (__dict_Monad_150) {
        return function (__dict_Error_151) {
            return new Control_Plus.Plus(function (__unused) {
                return altErrorT(__dict_Monad_150)(__dict_Error_151);
            }, Prelude["return"](__dict_Monad_150)(Data_Either.Left.create(Control_Monad_Error.strMsg(__dict_Error_151)("No alternative"))));
        };
    };
    var alternativeErrorT = function (__dict_Monad_167) {
        return function (__dict_Error_168) {
            return new Control_Alternative.Alternative(function (__unused) {
                return plusErrorT(__dict_Monad_167)(__dict_Error_168);
            }, function (__unused) {
                return applicativeErrorT(((__dict_Monad_167["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(__dict_Monad_167);
            });
        };
    };
    var monadPlusErrorT = function (__dict_Monad_154) {
        return function (__dict_Error_155) {
            return new Control_MonadPlus.MonadPlus(function (__unused) {
                return alternativeErrorT(__dict_Monad_154)(__dict_Error_155);
            }, function (__unused) {
                return monadErrorT(__dict_Monad_154)(__dict_Error_155);
            });
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
        altErrorT: altErrorT, 
        plusErrorT: plusErrorT, 
        alternativeErrorT: alternativeErrorT, 
        bindErrorT: bindErrorT, 
        monadErrorT: monadErrorT, 
        monadPlusErrorT: monadPlusErrorT, 
        monadTransErrorT: monadTransErrorT
    };
})();
var PS = PS || {};
PS.Control_Monad_Maybe_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Tuple = PS.Data_Tuple;
    var MaybeT = {
        create: function (value) {
            return value;
        }
    };
    var runMaybeT = function (_359) {
        return _359;
    };
    var monadTransMaybeT = function (__unused) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_171) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(MaybeT.create)(Prelude.liftM1(__dict_Monad_171)(Data_Maybe.Just.create));
        });
    };
    var mapMaybeT = function (f) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(MaybeT.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(f)(runMaybeT));
    };
    var liftPassMaybe = function (__dict_Monad_173) {
        return function (pass) {
            return mapMaybeT(function (m) {
                return pass(Prelude[">>="](__dict_Monad_173["__superclass_Prelude.Bind_1"]({}))(m)(function (_15) {
                    return Prelude["return"](__dict_Monad_173)((function () {
                        if (_15 instanceof Data_Maybe.Nothing) {
                            return new Data_Tuple.Tuple(Data_Maybe.Nothing.value, Prelude.id(Prelude.categoryArr({})));
                        };
                        if (_15 instanceof Data_Maybe.Just) {
                            return new Data_Tuple.Tuple(new Data_Maybe.Just(_15.value0.value0), _15.value0.value1);
                        };
                        throw new Error("Failed pattern match");
                    })());
                }));
            });
        };
    };
    var liftListenMaybe = function (__dict_Monad_174) {
        return function (listen) {
            return mapMaybeT(function (m) {
                return Prelude[">>="](__dict_Monad_174["__superclass_Prelude.Bind_1"]({}))(listen(m))(function (_14) {
                    return Prelude["return"](__dict_Monad_174)(Prelude["<$>"](Data_Maybe.functorMaybe({}))(function (r) {
                        return new Data_Tuple.Tuple(r, _14.value1);
                    })(_14.value0));
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
    var applicativeMaybeT = function (__dict_Monad_178) {
        return new Prelude.Applicative(function (__unused) {
            return applyMaybeT(__dict_Monad_178);
        }, Prelude["<<<"](Prelude.semigroupoidArr({}))(MaybeT.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.pure(__dict_Monad_178["__superclass_Prelude.Applicative_0"]({})))(Data_Maybe.Just.create)));
    };
    var applyMaybeT = function (__dict_Monad_177) {
        return new Prelude.Apply(Prelude.ap(monadMaybeT(__dict_Monad_177)), function (__unused) {
            return functorMaybeT(__dict_Monad_177);
        });
    };
    var monadMaybeT = function (__dict_Monad_172) {
        return new Prelude.Monad(function (__unused) {
            return applicativeMaybeT(__dict_Monad_172);
        }, function (__unused) {
            return bindMaybeT(__dict_Monad_172);
        });
    };
    var bindMaybeT = function (__dict_Monad_176) {
        return new Prelude.Bind(function (x) {
            return function (f) {
                return MaybeT.create(Prelude[">>="](__dict_Monad_176["__superclass_Prelude.Bind_1"]({}))(runMaybeT(x))(function (_13) {
                    if (_13 instanceof Data_Maybe.Nothing) {
                        return Prelude["return"](__dict_Monad_176)(Data_Maybe.Nothing.value);
                    };
                    if (_13 instanceof Data_Maybe.Just) {
                        return runMaybeT(f(_13.value0));
                    };
                    throw new Error("Failed pattern match");
                }));
            };
        }, function (__unused) {
            return applyMaybeT(__dict_Monad_176);
        });
    };
    var functorMaybeT = function (__dict_Monad_175) {
        return new Prelude.Functor(Prelude.liftA1(applicativeMaybeT(__dict_Monad_175)));
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
    var runRWST = function (_362) {
        return _362;
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
    var mkSee = function (__dict_Monoid_181) {
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
    var monadTransRWST = function (__dict_Monoid_182) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_183) {
            return function (m) {
                return function (_) {
                    return function (s) {
                        return Prelude[">>="](__dict_Monad_183["__superclass_Prelude.Bind_1"]({}))(m)(function (a) {
                            return Prelude["return"](__dict_Monad_183)(mkSee(__dict_Monoid_182)(s)(a)(Data_Monoid.mempty(__dict_Monoid_182)));
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
    var functorRWST = function (__dict_Functor_184) {
        return new Prelude.Functor(function (f) {
            return function (m) {
                return function (r) {
                    return function (s) {
                        return Prelude["<$>"](__dict_Functor_184)(function (see) {
                            var _1290 = {};
                            for (var _1291 in see) {
                                if (see.hasOwnProperty(_1291)) {
                                    _1290[_1291] = see[_1291];
                                };
                            };
                            _1290.result = f(see.result);
                            return _1290;
                        })(runRWST(m)(r)(s));
                    };
                };
            };
        });
    };
    var execRWST = function (__dict_Monad_185) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_185["__superclass_Prelude.Bind_1"]({}))(runRWST(m)(r)(s))(function (see) {
                        return Prelude["return"](__dict_Monad_185)(new Data_Tuple.Tuple(see.state, see.log));
                    });
                };
            };
        };
    };
    var evalRWST = function (__dict_Monad_186) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_186["__superclass_Prelude.Bind_1"]({}))(runRWST(m)(r)(s))(function (see) {
                        return Prelude["return"](__dict_Monad_186)(new Data_Tuple.Tuple(see.result, see.log));
                    });
                };
            };
        };
    };
    var applyRWST = function (__dict_Apply_189) {
        return function (__dict_Semigroup_190) {
            return new Prelude.Apply(function (f) {
                return function (m) {
                    return function (r) {
                        return function (s) {
                            return Prelude["<*>"](__dict_Apply_189)(Prelude["<$>"](__dict_Apply_189["__superclass_Prelude.Functor_0"]({}))(function (_360) {
                                return function (see) {
                                    var _1293 = {};
                                    for (var _1294 in see) {
                                        if (see.hasOwnProperty(_1294)) {
                                            _1293[_1294] = see[_1294];
                                        };
                                    };
                                    _1293.result = _360.result(see.result);
                                    _1293.log = Prelude["<>"](__dict_Semigroup_190)(_360.log)(see.log);
                                    return _1293;
                                };
                            })(runRWST(f)(r)(s)))(runRWST(m)(r)(s));
                        };
                    };
                };
            }, function (__unused) {
                return functorRWST(__dict_Apply_189["__superclass_Prelude.Functor_0"]({}));
            });
        };
    };
    var bindRWST = function (__dict_Bind_187) {
        return function (__dict_Semigroup_188) {
            return new Prelude.Bind(function (m) {
                return function (f) {
                    return function (r) {
                        return function (s) {
                            return Prelude[">>="](__dict_Bind_187)(runRWST(m)(r)(s))(function (_361) {
                                return Prelude["<$>"]((__dict_Bind_187["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(function (see$prime) {
                                    var _1298 = {};
                                    for (var _1299 in see$prime) {
                                        if (see$prime.hasOwnProperty(_1299)) {
                                            _1298[_1299] = see$prime[_1299];
                                        };
                                    };
                                    _1298.log = Prelude["<>"](__dict_Semigroup_188)(_361.log)(see$prime.log);
                                    return _1298;
                                })(runRWST(f(_361.result))(r)(_361.state));
                            });
                        };
                    };
                };
            }, function (__unused) {
                return applyRWST(__dict_Bind_187["__superclass_Prelude.Apply_0"]({}))(__dict_Semigroup_188);
            });
        };
    };
    var applicativeRWST = function (__dict_Applicative_191) {
        return function (__dict_Monoid_192) {
            return new Prelude.Applicative(function (__unused) {
                return applyRWST(__dict_Applicative_191["__superclass_Prelude.Apply_0"]({}))(__dict_Monoid_192["__superclass_Prelude.Semigroup_0"]({}));
            }, function (a) {
                return function (_) {
                    return function (s) {
                        return Prelude.pure(__dict_Applicative_191)(mkSee(__dict_Monoid_192)(s)(a)(Data_Monoid.mempty(__dict_Monoid_192)));
                    };
                };
            });
        };
    };
    var monadRWST = function (__dict_Monad_179) {
        return function (__dict_Monoid_180) {
            return new Prelude.Monad(function (__unused) {
                return applicativeRWST(__dict_Monad_179["__superclass_Prelude.Applicative_0"]({}))(__dict_Monoid_180);
            }, function (__unused) {
                return bindRWST(__dict_Monad_179["__superclass_Prelude.Bind_1"]({}))(__dict_Monoid_180["__superclass_Prelude.Semigroup_0"]({}));
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
PS.Control_Monad_RWS = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Monad_RWS_Trans = PS.Control_Monad_RWS_Trans;
    var Data_Monoid = PS.Data_Monoid;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var writer = function (__dict_Applicative_193) {
        return function (_366) {
            return function (_) {
                return function (s) {
                    return Prelude.pure(__dict_Applicative_193)({
                        state: s, 
                        result: _366.value0, 
                        log: _366.value1
                    });
                };
            };
        };
    };
    var withRWS = Control_Monad_RWS_Trans.withRWST;
    var tell = function (__dict_Applicative_194) {
        return function (w) {
            return writer(__dict_Applicative_194)(new Data_Tuple.Tuple(Prelude.unit, w));
        };
    };
    var state = function (__dict_Applicative_195) {
        return function (__dict_Monoid_196) {
            return function (f) {
                return function (_) {
                    return function (s) {
                        var _1306 = f(s);
                        return Prelude.pure(__dict_Applicative_195)(Control_Monad_RWS_Trans.mkSee(__dict_Monoid_196)(_1306.value1)(_1306.value0)(Data_Monoid.mempty(__dict_Monoid_196)));
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
    var reader = function (__dict_Applicative_197) {
        return function (__dict_Monoid_198) {
            return function (f) {
                return function (r) {
                    return function (s) {
                        return Prelude.pure(__dict_Applicative_197)(Control_Monad_RWS_Trans.mkSee(__dict_Monoid_198)(s)(f(r))(Data_Monoid.mempty(__dict_Monoid_198)));
                    };
                };
            };
        };
    };
    var put = function (__dict_Applicative_199) {
        return function (__dict_Monoid_200) {
            return function (s) {
                return state(__dict_Applicative_199)(__dict_Monoid_200)(function (_) {
                    return new Data_Tuple.Tuple(Prelude.unit, s);
                });
            };
        };
    };
    var pass = function (__dict_Monad_201) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_201["__superclass_Prelude.Bind_1"]({}))(Control_Monad_RWS_Trans.runRWST(m)(r)(s))(function (_364) {
                        return Prelude.pure(__dict_Monad_201["__superclass_Prelude.Applicative_0"]({}))({
                            state: _364.state, 
                            result: _364.result.value0, 
                            log: _364.result.value1(_364.log)
                        });
                    });
                };
            };
        };
    };
    var modify = function (__dict_Applicative_202) {
        return function (__dict_Monoid_203) {
            return function (f) {
                return state(__dict_Applicative_202)(__dict_Monoid_203)(function (s) {
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
    var listens = function (__dict_Monad_204) {
        return function (f) {
            return function (m) {
                return function (r) {
                    return function (s) {
                        return Prelude[">>="](__dict_Monad_204["__superclass_Prelude.Bind_1"]({}))(Control_Monad_RWS_Trans.runRWST(m)(r)(s))(function (_365) {
                            return Prelude.pure(__dict_Monad_204["__superclass_Prelude.Applicative_0"]({}))({
                                state: _365.state, 
                                result: new Data_Tuple.Tuple(_365.result, f(_365.log)), 
                                log: _365.log
                            });
                        });
                    };
                };
            };
        };
    };
    var listen = function (__dict_Monad_205) {
        return function (m) {
            return function (r) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_205["__superclass_Prelude.Bind_1"]({}))(Control_Monad_RWS_Trans.runRWST(m)(r)(s))(function (_363) {
                        return Prelude.pure(__dict_Monad_205["__superclass_Prelude.Applicative_0"]({}))({
                            state: _363.state, 
                            result: new Data_Tuple.Tuple(_363.result, _363.log), 
                            log: _363.log
                        });
                    });
                };
            };
        };
    };
    var gets = function (__dict_Applicative_206) {
        return function (__dict_Monoid_207) {
            return function (f) {
                return state(__dict_Applicative_206)(__dict_Monoid_207)(function (s) {
                    return new Data_Tuple.Tuple(f(s), s);
                });
            };
        };
    };
    var get = function (__dict_Applicative_208) {
        return function (__dict_Monoid_209) {
            return state(__dict_Applicative_208)(__dict_Monoid_209)(function (s) {
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
    var censor = function (__dict_Monad_210) {
        return function (f) {
            return function (m) {
                return function (r) {
                    return function (s) {
                        return Prelude[">>="](__dict_Monad_210["__superclass_Prelude.Bind_1"]({}))(Control_Monad_RWS_Trans.runRWST(m)(r)(s))(function (see) {
                            return Prelude.pure(__dict_Monad_210["__superclass_Prelude.Applicative_0"]({}))((function () {
                                var _1323 = {};
                                for (var _1324 in see) {
                                    if (see.hasOwnProperty(_1324)) {
                                        _1323[_1324] = see[_1324];
                                    };
                                };
                                _1323.log = f(see.log);
                                return _1323;
                            })());
                        });
                    };
                };
            };
        };
    };
    var ask = function (__dict_Applicative_211) {
        return function (__dict_Monoid_212) {
            return function (r) {
                return function (s) {
                    return Prelude.pure(__dict_Applicative_211)(Control_Monad_RWS_Trans.mkSee(__dict_Monoid_212)(s)(r)(Data_Monoid.mempty(__dict_Monoid_212)));
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
PS.Control_Monad_State_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Alt = PS.Control_Alt;
    var Control_Plus = PS.Control_Plus;
    var Control_Alternative = PS.Control_Alternative;
    var Control_MonadPlus = PS.Control_MonadPlus;
    var StateT = {
        create: function (value) {
            return value;
        }
    };
    var runStateT = function (_369) {
        return _369;
    };
    var withStateT = function (f) {
        return function (s) {
            return StateT.create(Prelude["<<<"](Prelude.semigroupoidArr({}))(runStateT(s))(f));
        };
    };
    var monadTransStateT = function (__unused) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_215) {
            return function (m) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_215["__superclass_Prelude.Bind_1"]({}))(m)(function (_17) {
                        return Prelude["return"](__dict_Monad_215)(new Data_Tuple.Tuple(_17, s));
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
    var liftPassState = function (__dict_Monad_218) {
        return function (pass) {
            return function (m) {
                return StateT.create(function (s) {
                    return pass(Prelude[">>="](__dict_Monad_218["__superclass_Prelude.Bind_1"]({}))(runStateT(m)(s))(function (_19) {
                        return Prelude["return"](__dict_Monad_218)(new Data_Tuple.Tuple(new Data_Tuple.Tuple(_19.value0.value0, _19.value1), _19.value0.value1));
                    }));
                });
            };
        };
    };
    var liftListenState = function (__dict_Monad_219) {
        return function (listen) {
            return function (m) {
                return StateT.create(function (s) {
                    return Prelude[">>="](__dict_Monad_219["__superclass_Prelude.Bind_1"]({}))(listen(runStateT(m)(s)))(function (_18) {
                        return Prelude["return"](__dict_Monad_219)(new Data_Tuple.Tuple(new Data_Tuple.Tuple(_18.value0.value0, _18.value1), _18.value0.value1));
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
    var execStateT = function (__dict_Monad_221) {
        return function (m) {
            return function (s) {
                return Prelude[">>="](__dict_Monad_221["__superclass_Prelude.Bind_1"]({}))(runStateT(m)(s))(function (_368) {
                    return Prelude["return"](__dict_Monad_221)(_368.value1);
                });
            };
        };
    };
    var evalStateT = function (__dict_Monad_222) {
        return function (m) {
            return function (s) {
                return Prelude[">>="](__dict_Monad_222["__superclass_Prelude.Bind_1"]({}))(runStateT(m)(s))(function (_367) {
                    return Prelude["return"](__dict_Monad_222)(_367.value0);
                });
            };
        };
    };
    var applicativeStateT = function (__dict_Monad_225) {
        return new Prelude.Applicative(function (__unused) {
            return applyStateT(__dict_Monad_225);
        }, function (a) {
            return StateT.create(function (s) {
                return Prelude["return"](__dict_Monad_225)(new Data_Tuple.Tuple(a, s));
            });
        });
    };
    var applyStateT = function (__dict_Monad_224) {
        return new Prelude.Apply(Prelude.ap(monadStateT(__dict_Monad_224)), function (__unused) {
            return functorStateT(__dict_Monad_224);
        });
    };
    var monadStateT = function (__dict_Monad_216) {
        return new Prelude.Monad(function (__unused) {
            return applicativeStateT(__dict_Monad_216);
        }, function (__unused) {
            return bindStateT(__dict_Monad_216);
        });
    };
    var bindStateT = function (__dict_Monad_223) {
        return new Prelude.Bind(function (_370) {
            return function (_371) {
                return function (s) {
                    return Prelude[">>="](__dict_Monad_223["__superclass_Prelude.Bind_1"]({}))(_370(s))(function (_16) {
                        return runStateT(_371(_16.value0))(_16.value1);
                    });
                };
            };
        }, function (__unused) {
            return applyStateT(__dict_Monad_223);
        });
    };
    var functorStateT = function (__dict_Monad_220) {
        return new Prelude.Functor(Prelude.liftM1(monadStateT(__dict_Monad_220)));
    };
    var altStateT = function (__dict_Monad_228) {
        return function (__dict_Alt_229) {
            return new Control_Alt.Alt(function (x) {
                return function (y) {
                    return StateT.create(function (s) {
                        return Control_Alt["<|>"](__dict_Alt_229)(runStateT(x)(s))(runStateT(y)(s));
                    });
                };
            }, function (__unused) {
                return functorStateT(__dict_Monad_228);
            });
        };
    };
    var plusStateT = function (__dict_Monad_213) {
        return function (__dict_Plus_214) {
            return new Control_Plus.Plus(function (__unused) {
                return altStateT(__dict_Monad_213)(__dict_Plus_214["__superclass_Control.Alt.Alt_0"]({}));
            }, StateT.create(function (_) {
                return Control_Plus.empty(__dict_Plus_214);
            }));
        };
    };
    var alternativeStateT = function (__dict_Monad_226) {
        return function (__dict_Alternative_227) {
            return new Control_Alternative.Alternative(function (__unused) {
                return plusStateT(__dict_Monad_226)(__dict_Alternative_227["__superclass_Control.Plus.Plus_1"]({}));
            }, function (__unused) {
                return applicativeStateT(__dict_Monad_226);
            });
        };
    };
    var monadPlusStateT = function (__dict_MonadPlus_217) {
        return new Control_MonadPlus.MonadPlus(function (__unused) {
            return alternativeStateT(__dict_MonadPlus_217["__superclass_Prelude.Monad_0"]({}))(__dict_MonadPlus_217["__superclass_Control.Alternative.Alternative_1"]({}));
        }, function (__unused) {
            return monadStateT(__dict_MonadPlus_217["__superclass_Prelude.Monad_0"]({}));
        });
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
        altStateT: altStateT, 
        plusStateT: plusStateT, 
        alternativeStateT: alternativeStateT, 
        bindStateT: bindStateT, 
        monadStateT: monadStateT, 
        monadPlusStateT: monadPlusStateT, 
        monadTransStateT: monadTransStateT
    };
})();
var PS = PS || {};
PS.Control_Monad_State = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_State_Trans = PS.Control_Monad_State_Trans;
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
PS.Control_Monad_Writer_Trans = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Monoid = PS.Data_Monoid;
    var Control_Alt = PS.Control_Alt;
    var Control_Plus = PS.Control_Plus;
    var Control_Alternative = PS.Control_Alternative;
    var Control_MonadPlus = PS.Control_MonadPlus;
    var WriterT = {
        create: function (value) {
            return value;
        }
    };
    var runWriterT = function (_373) {
        return _373;
    };
    var monadTransWriterT = function (__dict_Monoid_234) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_235) {
            return function (m) {
                return WriterT.create(Prelude[">>="](__dict_Monad_235["__superclass_Prelude.Bind_1"]({}))(m)(function (_22) {
                    return Prelude["return"](__dict_Monad_235)(new Data_Tuple.Tuple(_22, Data_Monoid.mempty(__dict_Monoid_234)));
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
    var liftCallCCWriter = function (__dict_Monoid_238) {
        return function (callCC) {
            return function (f) {
                return WriterT.create(callCC(function (c) {
                    return runWriterT(f(function (a) {
                        return WriterT.create(c(new Data_Tuple.Tuple(a, Data_Monoid.mempty(__dict_Monoid_238))));
                    }));
                }));
            };
        };
    };
    var functorWriterT = function (__dict_Functor_239) {
        return new Prelude.Functor(function (f) {
            return mapWriterT(Prelude["<$>"](__dict_Functor_239)(function (_372) {
                return new Data_Tuple.Tuple(f(_372.value0), _372.value1);
            }));
        });
    };
    var applyWriterT = function (__dict_Monoid_242) {
        return function (__dict_Apply_243) {
            return new Prelude.Apply(function (f) {
                return function (v) {
                    return WriterT.create((function () {
                        var k = function (_374) {
                            return function (_375) {
                                return new Data_Tuple.Tuple(_374.value0(_375.value0), Prelude["<>"](__dict_Monoid_242["__superclass_Prelude.Semigroup_0"]({}))(_374.value1)(_375.value1));
                            };
                        };
                        return Prelude["<*>"](__dict_Apply_243)(Prelude["<$>"](__dict_Apply_243["__superclass_Prelude.Functor_0"]({}))(k)(runWriterT(f)))(runWriterT(v));
                    })());
                };
            }, function (__unused) {
                return functorWriterT(__dict_Apply_243["__superclass_Prelude.Functor_0"]({}));
            });
        };
    };
    var bindWriterT = function (__dict_Monoid_240) {
        return function (__dict_Monad_241) {
            return new Prelude.Bind(function (m) {
                return function (k) {
                    return WriterT.create(Prelude[">>="](__dict_Monad_241["__superclass_Prelude.Bind_1"]({}))(runWriterT(m))(function (_21) {
                        return Prelude[">>="](__dict_Monad_241["__superclass_Prelude.Bind_1"]({}))(runWriterT(k(_21.value0)))(function (_20) {
                            return Prelude["return"](__dict_Monad_241)(new Data_Tuple.Tuple(_20.value0, Prelude["<>"](__dict_Monoid_240["__superclass_Prelude.Semigroup_0"]({}))(_21.value1)(_20.value1)));
                        });
                    }));
                };
            }, function (__unused) {
                return applyWriterT(__dict_Monoid_240)((__dict_Monad_241["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}));
            });
        };
    };
    var applicativeWriterT = function (__dict_Monoid_244) {
        return function (__dict_Applicative_245) {
            return new Prelude.Applicative(function (__unused) {
                return applyWriterT(__dict_Monoid_244)(__dict_Applicative_245["__superclass_Prelude.Apply_0"]({}));
            }, function (a) {
                return WriterT.create(Prelude.pure(__dict_Applicative_245)(new Data_Tuple.Tuple(a, Data_Monoid.mempty(__dict_Monoid_244))));
            });
        };
    };
    var monadWriterT = function (__dict_Monoid_232) {
        return function (__dict_Monad_233) {
            return new Prelude.Monad(function (__unused) {
                return applicativeWriterT(__dict_Monoid_232)(__dict_Monad_233["__superclass_Prelude.Applicative_0"]({}));
            }, function (__unused) {
                return bindWriterT(__dict_Monoid_232)(__dict_Monad_233);
            });
        };
    };
    var altWriterT = function (__dict_Monoid_248) {
        return function (__dict_Alt_249) {
            return new Control_Alt.Alt(function (m) {
                return function (n) {
                    return WriterT.create(Control_Alt["<|>"](__dict_Alt_249)(runWriterT(m))(runWriterT(n)));
                };
            }, function (__unused) {
                return functorWriterT(__dict_Alt_249["__superclass_Prelude.Functor_0"]({}));
            });
        };
    };
    var plusWriterT = function (__dict_Monoid_230) {
        return function (__dict_Plus_231) {
            return new Control_Plus.Plus(function (__unused) {
                return altWriterT(__dict_Monoid_230)(__dict_Plus_231["__superclass_Control.Alt.Alt_0"]({}));
            }, Control_Plus.empty(__dict_Plus_231));
        };
    };
    var alternativeWriterT = function (__dict_Monoid_246) {
        return function (__dict_Alternative_247) {
            return new Control_Alternative.Alternative(function (__unused) {
                return plusWriterT(__dict_Monoid_246)(__dict_Alternative_247["__superclass_Control.Plus.Plus_1"]({}));
            }, function (__unused) {
                return applicativeWriterT(__dict_Monoid_246)(__dict_Alternative_247["__superclass_Prelude.Applicative_0"]({}));
            });
        };
    };
    var monadPlusWriterT = function (__dict_Monoid_236) {
        return function (__dict_MonadPlus_237) {
            return new Control_MonadPlus.MonadPlus(function (__unused) {
                return alternativeWriterT(__dict_Monoid_236)(__dict_MonadPlus_237["__superclass_Control.Alternative.Alternative_1"]({}));
            }, function (__unused) {
                return monadWriterT(__dict_Monoid_236)(__dict_MonadPlus_237["__superclass_Prelude.Monad_0"]({}));
            });
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
        altWriterT: altWriterT, 
        plusWriterT: plusWriterT, 
        alternativeWriterT: alternativeWriterT, 
        bindWriterT: bindWriterT, 
        monadWriterT: monadWriterT, 
        monadPlusWriterT: monadPlusWriterT, 
        monadTransWriterT: monadTransWriterT
    };
})();
var PS = PS || {};
PS.Control_Monad_Cont_Class = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Cont_Trans = PS.Control_Monad_Cont_Trans;
    var Control_Monad_Error_Trans = PS.Control_Monad_Error_Trans;
    var Control_Monad_Maybe_Trans = PS.Control_Monad_Maybe_Trans;
    var Control_Monad_Reader_Trans = PS.Control_Monad_Reader_Trans;
    var Control_Monad_State_Trans = PS.Control_Monad_State_Trans;
    var Control_Monad_Writer_Trans = PS.Control_Monad_Writer_Trans;
    function MonadCont(callCC) {
        this.callCC = callCC;
    };
    var monadContContT = function (__dict_Monad_250) {
        return new MonadCont(Control_Monad_Cont_Trans.callCC);
    };
    var callCC = function (dict) {
        return dict.callCC;
    };
    var monadContErrorT = function (__dict_Error_251) {
        return function (__dict_MonadCont_252) {
            return new MonadCont(Control_Monad_Error_Trans.liftCallCCError(callCC(__dict_MonadCont_252)));
        };
    };
    var monadContMaybeT = function (__dict_MonadCont_253) {
        return new MonadCont(Control_Monad_Maybe_Trans.liftCallCCMaybe(callCC(__dict_MonadCont_253)));
    };
    var monadContReaderT = function (__dict_MonadCont_254) {
        return new MonadCont(Control_Monad_Reader_Trans.liftCallCCReader(callCC(__dict_MonadCont_254)));
    };
    var monadContStateT = function (__dict_MonadCont_255) {
        return new MonadCont(Control_Monad_State_Trans["liftCallCCState'"](callCC(__dict_MonadCont_255)));
    };
    var monadWriterT = function (__dict_Monoid_256) {
        return function (__dict_MonadCont_257) {
            return new MonadCont(Control_Monad_Writer_Trans.liftCallCCWriter(__dict_Monoid_256)(callCC(__dict_MonadCont_257)));
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
    var monadErrorErrorT = function (__dict_Monad_258) {
        return function (__dict_Error_259) {
            return new MonadError(function (m) {
                return function (h) {
                    return Control_Monad_Error_Trans.ErrorT.create(Prelude[">>="](__dict_Monad_258["__superclass_Prelude.Bind_1"]({}))(Control_Monad_Error_Trans.runErrorT(m))(function (_23) {
                        if (_23 instanceof Data_Either.Left) {
                            return Control_Monad_Error_Trans.runErrorT(h(_23.value0));
                        };
                        if (_23 instanceof Data_Either.Right) {
                            return Prelude["return"](__dict_Monad_258)(new Data_Either.Right(_23.value0));
                        };
                        throw new Error("Failed pattern match");
                    }));
                };
            }, function (e) {
                return Control_Monad_Error_Trans.ErrorT.create(Prelude["return"](__dict_Monad_258)(new Data_Either.Left(e)));
            });
        };
    };
    var monadErrorError = function (__dict_Error_260) {
        return new MonadError(function (_376) {
            return function (_377) {
                if (_376 instanceof Data_Either.Left) {
                    return _377(_376.value0);
                };
                if (_376 instanceof Data_Either.Right) {
                    return new Data_Either.Right(_376.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, Data_Either.Left.create);
    };
    var catchError = function (dict) {
        return dict.catchError;
    };
    var monadErrorMaybeT = function (__dict_Monad_261) {
        return function (__dict_MonadError_262) {
            return new MonadError(Control_Monad_Maybe_Trans.liftCatchMaybe(catchError(__dict_MonadError_262)), function (e) {
                return Control_Monad_Trans.lift(Control_Monad_Maybe_Trans.monadTransMaybeT({}))(__dict_Monad_261)(throwError(__dict_MonadError_262)(e));
            });
        };
    };
    var monadErrorReaderT = function (__dict_Monad_263) {
        return function (__dict_MonadError_264) {
            return new MonadError(Control_Monad_Reader_Trans.liftCatchReader(catchError(__dict_MonadError_264)), function (e) {
                return Control_Monad_Trans.lift(Control_Monad_Reader_Trans.monadTransReaderT({}))(__dict_Monad_263)(throwError(__dict_MonadError_264)(e));
            });
        };
    };
    var monadErrorStateT = function (__dict_Monad_265) {
        return function (__dict_MonadError_266) {
            return new MonadError(Control_Monad_State_Trans.liftCatchState(catchError(__dict_MonadError_266)), function (e) {
                return Control_Monad_Trans.lift(Control_Monad_State_Trans.monadTransStateT({}))(__dict_Monad_265)(throwError(__dict_MonadError_266)(e));
            });
        };
    };
    var monadErrorWriterT = function (__dict_Monad_267) {
        return function (__dict_Monoid_268) {
            return function (__dict_MonadError_269) {
                return new MonadError(Control_Monad_Writer_Trans.liftCatchWriter(catchError(__dict_MonadError_269)), function (e) {
                    return Control_Monad_Trans.lift(Control_Monad_Writer_Trans.monadTransWriterT(__dict_Monoid_268))(__dict_Monad_267)(throwError(__dict_MonadError_269)(e));
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
    var Prelude = PS.Prelude;
    var Control_Monad_Reader_Trans = PS.Control_Monad_Reader_Trans;
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
    var monadReaderReaderT = function (__dict_Monad_270) {
        return new MonadReader(Prelude["return"](__dict_Monad_270), Control_Monad_Reader_Trans.withReaderT);
    };
    var monadReaderRWST = function (__dict_Monad_271) {
        return function (__dict_Monoid_272) {
            return new MonadReader(Control_Monad_RWS.ask(__dict_Monad_271["__superclass_Prelude.Applicative_0"]({}))(__dict_Monoid_272), Control_Monad_RWS.local);
        };
    };
    var monadReaderFun = function (__unused) {
        return new MonadReader(Prelude.id(Prelude.categoryArr({})), Prelude[">>>"](Prelude.semigroupoidArr({})));
    };
    var local = function (dict) {
        return dict.local;
    };
    var ask = function (dict) {
        return dict.ask;
    };
    var monadReaderErrorT = function (__dict_Monad_273) {
        return function (__dict_Error_274) {
            return function (__dict_MonadReader_275) {
                return new MonadReader(Control_Monad_Trans.lift(Control_Monad_Error_Trans.monadTransErrorT(__dict_Error_274))(__dict_Monad_273)(ask(__dict_MonadReader_275)), function (f) {
                    return Control_Monad_Error_Trans.mapErrorT(local(__dict_MonadReader_275)(f));
                });
            };
        };
    };
    var monadReaderMaybeT = function (__dict_Monad_276) {
        return function (__dict_MonadReader_277) {
            return new MonadReader(Control_Monad_Trans.lift(Control_Monad_Maybe_Trans.monadTransMaybeT({}))(__dict_Monad_276)(ask(__dict_MonadReader_277)), function (f) {
                return Control_Monad_Maybe_Trans.mapMaybeT(local(__dict_MonadReader_277)(f));
            });
        };
    };
    var monadReaderStateT = function (__dict_Monad_278) {
        return function (__dict_MonadReader_279) {
            return new MonadReader(Control_Monad_Trans.lift(Control_Monad_State_Trans.monadTransStateT({}))(__dict_Monad_278)(ask(__dict_MonadReader_279)), function (f) {
                return Control_Monad_State_Trans.mapStateT(local(__dict_MonadReader_279)(f));
            });
        };
    };
    var monadReaderWriterT = function (__dict_Monad_280) {
        return function (__dict_Monoid_281) {
            return function (__dict_MonadReader_282) {
                return new MonadReader(Control_Monad_Trans.lift(Control_Monad_Writer_Trans.monadTransWriterT(__dict_Monoid_281))(__dict_Monad_280)(ask(__dict_MonadReader_282)), function (f) {
                    return Control_Monad_Writer_Trans.mapWriterT(local(__dict_MonadReader_282)(f));
                });
            };
        };
    };
    var reader = function (__dict_Monad_283) {
        return function (__dict_MonadReader_284) {
            return function (f) {
                return Prelude[">>="](__dict_Monad_283["__superclass_Prelude.Bind_1"]({}))(ask(__dict_MonadReader_284))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](__dict_Monad_283))(f));
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
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
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
    var put = function (__dict_Monad_285) {
        return function (__dict_MonadState_286) {
            return function (s) {
                return state(__dict_MonadState_286)(function (_) {
                    return new Data_Tuple.Tuple(Prelude.unit, s);
                });
            };
        };
    };
    var monadStateWriterT = function (__dict_Monad_287) {
        return function (__dict_Monoid_288) {
            return function (__dict_MonadState_289) {
                return new MonadState(function (f) {
                    return Control_Monad_Trans.lift(Control_Monad_Writer_Trans.monadTransWriterT(__dict_Monoid_288))(__dict_Monad_287)(state(__dict_MonadState_289)(f));
                });
            };
        };
    };
    var monadStateStateT1 = function (__dict_Monad_290) {
        return function (__dict_MonadState_291) {
            return new MonadState(function (f) {
                return Control_Monad_Trans.lift(Control_Monad_State_Trans.monadTransStateT({}))(__dict_Monad_290)(state(__dict_MonadState_291)(f));
            });
        };
    };
    var monadStateStateT = function (__dict_Monad_292) {
        return new MonadState(function (f) {
            return Control_Monad_State_Trans.StateT.create(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](__dict_Monad_292))(f));
        });
    };
    var monadStateReaderT = function (__dict_Monad_293) {
        return function (__dict_MonadState_294) {
            return new MonadState(function (f) {
                return Control_Monad_Trans.lift(Control_Monad_Reader_Trans.monadTransReaderT({}))(__dict_Monad_293)(state(__dict_MonadState_294)(f));
            });
        };
    };
    var monadStateRWST = function (__dict_Monad_295) {
        return function (__dict_Monoid_296) {
            return new MonadState(Control_Monad_RWS.state(__dict_Monad_295["__superclass_Prelude.Applicative_0"]({}))(__dict_Monoid_296));
        };
    };
    var monadStateMaybeT = function (__dict_Monad_297) {
        return function (__dict_MonadState_298) {
            return new MonadState(function (f) {
                return Control_Monad_Trans.lift(Control_Monad_Maybe_Trans.monadTransMaybeT({}))(__dict_Monad_297)(state(__dict_MonadState_298)(f));
            });
        };
    };
    var monadStateErrorT = function (__dict_Monad_299) {
        return function (__dict_Error_300) {
            return function (__dict_MonadState_301) {
                return new MonadState(function (f) {
                    return Control_Monad_Trans.lift(Control_Monad_Error_Trans.monadTransErrorT(__dict_Error_300))(__dict_Monad_299)(state(__dict_MonadState_301)(f));
                });
            };
        };
    };
    var modify = function (__dict_Monad_302) {
        return function (__dict_MonadState_303) {
            return function (f) {
                return state(__dict_MonadState_303)(function (s) {
                    return new Data_Tuple.Tuple(Prelude.unit, f(s));
                });
            };
        };
    };
    var gets = function (__dict_Monad_304) {
        return function (__dict_MonadState_305) {
            return function (f) {
                return state(__dict_MonadState_305)(function (s) {
                    return new Data_Tuple.Tuple(f(s), s);
                });
            };
        };
    };
    var get = function (__dict_Monad_306) {
        return function (__dict_MonadState_307) {
            return state(__dict_MonadState_307)(function (s) {
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
    var tell = function (__dict_Monoid_308) {
        return function (__dict_Monad_309) {
            return function (__dict_MonadWriter_310) {
                return function (w) {
                    return writer(__dict_MonadWriter_310)(new Data_Tuple.Tuple(Prelude.unit, w));
                };
            };
        };
    };
    var pass = function (dict) {
        return dict.pass;
    };
    var monadWriterWriterT = function (__dict_Monoid_311) {
        return function (__dict_Monad_312) {
            return new MonadWriter(function (m) {
                return Control_Monad_Writer_Trans.WriterT.create(Prelude[">>="](__dict_Monad_312["__superclass_Prelude.Bind_1"]({}))(Control_Monad_Writer_Trans.runWriterT(m))(function (_26) {
                    return Prelude["return"](__dict_Monad_312)(new Data_Tuple.Tuple(new Data_Tuple.Tuple(_26.value0, _26.value1), _26.value1));
                }));
            }, function (m) {
                return Control_Monad_Writer_Trans.WriterT.create(Prelude[">>="](__dict_Monad_312["__superclass_Prelude.Bind_1"]({}))(Control_Monad_Writer_Trans.runWriterT(m))(function (_27) {
                    return Prelude["return"](__dict_Monad_312)(new Data_Tuple.Tuple(_27.value0.value0, _27.value0.value1(_27.value1)));
                }));
            }, Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Writer_Trans.WriterT.create)(Prelude["return"](__dict_Monad_312)));
        };
    };
    var monadWriterRWST = function (__dict_Monad_313) {
        return function (__dict_Monoid_314) {
            return new MonadWriter(Control_Monad_RWS.listen(__dict_Monad_313), Control_Monad_RWS.pass(__dict_Monad_313), Control_Monad_RWS.writer(__dict_Monad_313["__superclass_Prelude.Applicative_0"]({})));
        };
    };
    var listen = function (dict) {
        return dict.listen;
    };
    var listens = function (__dict_Monoid_315) {
        return function (__dict_Monad_316) {
            return function (__dict_MonadWriter_317) {
                return function (f) {
                    return function (m) {
                        return Prelude[">>="](__dict_Monad_316["__superclass_Prelude.Bind_1"]({}))(listen(__dict_MonadWriter_317)(m))(function (_24) {
                            return Prelude["return"](__dict_Monad_316)(new Data_Tuple.Tuple(_24.value0, f(_24.value1)));
                        });
                    };
                };
            };
        };
    };
    var monadWriterErrorT = function (__dict_Monad_318) {
        return function (__dict_Error_319) {
            return function (__dict_MonadWriter_320) {
                return new MonadWriter(Control_Monad_Error_Trans.liftListenError(__dict_Monad_318)(listen(__dict_MonadWriter_320)), Control_Monad_Error_Trans.liftPassError(__dict_Monad_318)(pass(__dict_MonadWriter_320)), function (wd) {
                    return Control_Monad_Trans.lift(Control_Monad_Error_Trans.monadTransErrorT(__dict_Error_319))(__dict_Monad_318)(writer(__dict_MonadWriter_320)(wd));
                });
            };
        };
    };
    var monadWriterMaybeT = function (__dict_Monad_321) {
        return function (__dict_MonadWriter_322) {
            return new MonadWriter(Control_Monad_Maybe_Trans.liftListenMaybe(__dict_Monad_321)(listen(__dict_MonadWriter_322)), Control_Monad_Maybe_Trans.liftPassMaybe(__dict_Monad_321)(pass(__dict_MonadWriter_322)), function (wd) {
                return Control_Monad_Trans.lift(Control_Monad_Maybe_Trans.monadTransMaybeT({}))(__dict_Monad_321)(writer(__dict_MonadWriter_322)(wd));
            });
        };
    };
    var monadWriterReaderT = function (__dict_Monad_323) {
        return function (__dict_MonadWriter_324) {
            return new MonadWriter(Control_Monad_Reader_Trans.mapReaderT(listen(__dict_MonadWriter_324)), Control_Monad_Reader_Trans.mapReaderT(pass(__dict_MonadWriter_324)), function (wd) {
                return Control_Monad_Trans.lift(Control_Monad_Reader_Trans.monadTransReaderT({}))(__dict_Monad_323)(writer(__dict_MonadWriter_324)(wd));
            });
        };
    };
    var monadWriterStateT = function (__dict_Monad_325) {
        return function (__dict_MonadWriter_326) {
            return new MonadWriter(Control_Monad_State_Trans.liftListenState(__dict_Monad_325)(listen(__dict_MonadWriter_326)), Control_Monad_State_Trans.liftPassState(__dict_Monad_325)(pass(__dict_MonadWriter_326)), function (wd) {
                return Control_Monad_Trans.lift(Control_Monad_State_Trans.monadTransStateT({}))(__dict_Monad_325)(writer(__dict_MonadWriter_326)(wd));
            });
        };
    };
    var censor = function (__dict_Monoid_327) {
        return function (__dict_Monad_328) {
            return function (__dict_MonadWriter_329) {
                return function (f) {
                    return function (m) {
                        return pass(__dict_MonadWriter_329)(Prelude[">>="](__dict_Monad_328["__superclass_Prelude.Bind_1"]({}))(m)(function (_25) {
                            return Prelude["return"](__dict_Monad_328)(new Data_Tuple.Tuple(_25, f));
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
    var monadRWSRWST = function (__dict_Monad_330) {
        return function (__dict_Monoid_331) {
            return new MonadRWS(function (__unused) {
                return Control_Monad_Reader_Class.monadReaderRWST(__dict_Monad_330)(__dict_Monoid_331);
            }, function (__unused) {
                return Control_Monad_State_Class.monadStateRWST(__dict_Monad_330)(__dict_Monoid_331);
            }, function (__unused) {
                return Control_Monad_Writer_Class.monadWriterRWST(__dict_Monad_330)(__dict_Monoid_331);
            }, function (__unused) {
                return __dict_Monoid_331;
            }, function (__unused) {
                return Control_Monad_RWS_Trans.monadRWST(__dict_Monad_330)(__dict_Monoid_331);
            });
        };
    };
    var monadRWSMaybeT = function (__dict_Monad_332) {
        return function (__dict_Monoid_333) {
            return function (__dict_MonadRWS_334) {
                return function (__dict_MonadReader_335) {
                    return function (__dict_MonadWriter_336) {
                        return function (__dict_MonadState_337) {
                            return new MonadRWS(function (__unused) {
                                return Control_Monad_Reader_Class.monadReaderMaybeT(__dict_Monad_332)(__dict_MonadReader_335);
                            }, function (__unused) {
                                return Control_Monad_State_Class.monadStateMaybeT(__dict_Monad_332)(__dict_MonadState_337);
                            }, function (__unused) {
                                return Control_Monad_Writer_Class.monadWriterMaybeT(__dict_Monad_332)(__dict_MonadWriter_336);
                            }, function (__unused) {
                                return __dict_Monoid_333;
                            }, function (__unused) {
                                return Control_Monad_Maybe_Trans.monadMaybeT(__dict_Monad_332);
                            });
                        };
                    };
                };
            };
        };
    };
    var monadRWSErrorT = function (__dict_Monad_338) {
        return function (__dict_Monoid_339) {
            return function (__dict_MonadRWS_340) {
                return function (__dict_MonadReader_341) {
                    return function (__dict_MonadWriter_342) {
                        return function (__dict_MonadState_343) {
                            return function (__dict_Error_344) {
                                return new MonadRWS(function (__unused) {
                                    return Control_Monad_Reader_Class.monadReaderErrorT(__dict_Monad_338)(__dict_Error_344)(__dict_MonadReader_341);
                                }, function (__unused) {
                                    return Control_Monad_State_Class.monadStateErrorT(__dict_Monad_338)(__dict_Error_344)(__dict_MonadState_343);
                                }, function (__unused) {
                                    return Control_Monad_Writer_Class.monadWriterErrorT(__dict_Monad_338)(__dict_Error_344)(__dict_MonadWriter_342);
                                }, function (__unused) {
                                    return __dict_Monoid_339;
                                }, function (__unused) {
                                    return Control_Monad_Error_Trans.monadErrorT(__dict_Monad_338)(__dict_Error_344);
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
PS.Data_Bifoldable = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Apply = PS.Control_Apply;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Either = PS.Data_Either;
    var Data_Monoid_Any = PS.Data_Monoid_Any;
    var Data_Monoid_All = PS.Data_Monoid_All;
    function Bifoldable(bifoldMap, bifoldl, bifoldr) {
        this.bifoldMap = bifoldMap;
        this.bifoldl = bifoldl;
        this.bifoldr = bifoldr;
    };
    var bifoldr = function (dict) {
        return dict.bifoldr;
    };
    var bitraverse_ = function (__dict_Bifoldable_345) {
        return function (__dict_Applicative_346) {
            return function (f) {
                return function (g) {
                    return bifoldr(__dict_Bifoldable_345)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Apply["*>"](__dict_Applicative_346["__superclass_Prelude.Apply_0"]({})))(f))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Apply["*>"](__dict_Applicative_346["__superclass_Prelude.Apply_0"]({})))(g))(Prelude.pure(__dict_Applicative_346)(Prelude.unit));
                };
            };
        };
    };
    var bifor_ = function (__dict_Bifoldable_347) {
        return function (__dict_Applicative_348) {
            return function (t) {
                return function (f) {
                    return function (g) {
                        return bitraverse_(__dict_Bifoldable_347)(__dict_Applicative_348)(f)(g)(t);
                    };
                };
            };
        };
    };
    var bisequence_ = function (__dict_Bifoldable_349) {
        return function (__dict_Applicative_350) {
            return bitraverse_(__dict_Bifoldable_349)(__dict_Applicative_350)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var bifoldl = function (dict) {
        return dict.bifoldl;
    };
    var bifoldableTuple = function (__unused) {
        return new Bifoldable(function (__dict_Monoid_351) {
            return function (_378) {
                return function (_379) {
                    return function (_380) {
                        return Prelude["<>"](__dict_Monoid_351["__superclass_Prelude.Semigroup_0"]({}))(_378(_380.value0))(_379(_380.value1));
                    };
                };
            };
        }, function (_385) {
            return function (_386) {
                return function (_387) {
                    return function (_388) {
                        return _386(_385(_387)(_388.value0))(_388.value1);
                    };
                };
            };
        }, function (_381) {
            return function (_382) {
                return function (_383) {
                    return function (_384) {
                        return _381(_384.value0)(_382(_384.value1)(_383));
                    };
                };
            };
        });
    };
    var bifoldableEither = function (__unused) {
        return new Bifoldable(function (__dict_Monoid_352) {
            return function (_389) {
                return function (_390) {
                    return function (_391) {
                        if (_391 instanceof Data_Either.Left) {
                            return _389(_391.value0);
                        };
                        if (_391 instanceof Data_Either.Right) {
                            return _390(_391.value0);
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        }, function (_396) {
            return function (_397) {
                return function (_398) {
                    return function (_399) {
                        if (_399 instanceof Data_Either.Left) {
                            return _396(_398)(_399.value0);
                        };
                        if (_399 instanceof Data_Either.Right) {
                            return _397(_398)(_399.value0);
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        }, function (_392) {
            return function (_393) {
                return function (_394) {
                    return function (_395) {
                        if (_395 instanceof Data_Either.Left) {
                            return _392(_395.value0)(_394);
                        };
                        if (_395 instanceof Data_Either.Right) {
                            return _393(_395.value0)(_394);
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        });
    };
    var bifoldMap = function (dict) {
        return dict.bifoldMap;
    };
    var bifold = function (__dict_Bifoldable_353) {
        return function (__dict_Monoid_354) {
            return bifoldMap(__dict_Bifoldable_353)(__dict_Monoid_354)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var biany = function (__dict_Bifoldable_355) {
        return function (p) {
            return function (q) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_Any.runAny)(bifoldMap(__dict_Bifoldable_355)(Data_Monoid_Any.monoidAny({}))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_Any.Any.create)(p))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_Any.Any.create)(q)));
            };
        };
    };
    var biall = function (__dict_Bifoldable_356) {
        return function (p) {
            return function (q) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_All.runAll)(bifoldMap(__dict_Bifoldable_356)(Data_Monoid_All.monoidAll({}))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_All.All.create)(p))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_All.All.create)(q)));
            };
        };
    };
    return {
        Bifoldable: Bifoldable, 
        biall: biall, 
        biany: biany, 
        bisequence_: bisequence_, 
        bifor_: bifor_, 
        bitraverse_: bitraverse_, 
        bifold: bifold, 
        bifoldMap: bifoldMap, 
        bifoldl: bifoldl, 
        bifoldr: bifoldr, 
        bifoldableTuple: bifoldableTuple, 
        bifoldableEither: bifoldableEither
    };
})();
var PS = PS || {};
PS.Data_Bifunctor = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Either = PS.Data_Either;
    function Bifunctor(bimap) {
        this.bimap = bimap;
    };
    var bimap = function (dict) {
        return dict.bimap;
    };
    var lmap = function (__dict_Bifunctor_357) {
        return function (f) {
            return bimap(__dict_Bifunctor_357)(f)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var rmap = function (__dict_Bifunctor_358) {
        return bimap(__dict_Bifunctor_358)(Prelude.id(Prelude.categoryArr({})));
    };
    var bifunctorTuple = function (__unused) {
        return new Bifunctor(function (_403) {
            return function (_404) {
                return function (_405) {
                    return new Data_Tuple.Tuple(_403(_405.value0), _404(_405.value1));
                };
            };
        });
    };
    var bifunctorEither = function (__unused) {
        return new Bifunctor(function (_400) {
            return function (_401) {
                return function (_402) {
                    if (_402 instanceof Data_Either.Left) {
                        return new Data_Either.Left(_400(_402.value0));
                    };
                    if (_402 instanceof Data_Either.Right) {
                        return new Data_Either.Right(_401(_402.value0));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    return {
        Bifunctor: Bifunctor, 
        rmap: rmap, 
        lmap: lmap, 
        bimap: bimap, 
        bifunctorEither: bifunctorEither, 
        bifunctorTuple: bifunctorTuple
    };
})();
var PS = PS || {};
PS.Control_Biapply = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Bifunctor = PS.Data_Bifunctor;
    var Data_Tuple = PS.Data_Tuple;
    function Biapply($less$less$times$greater$greater, __superclass_Data$dotBifunctor$dotBifunctor_0) {
        this["<<*>>"] = $less$less$times$greater$greater;
        this["__superclass_Data.Bifunctor.Bifunctor_0"] = __superclass_Data$dotBifunctor$dotBifunctor_0;
    };
    var $less$less$times$greater$greater = function (dict) {
        return dict["<<*>>"];
    };
    var $less$less$dollar$greater$greater = Prelude.id(Prelude.categoryArr({}));
    var $less$less$times = function (__dict_Biapply_359) {
        return function (a) {
            return function (b) {
                return $less$less$times$greater$greater(__dict_Biapply_359)($less$less$dollar$greater$greater(Data_Bifunctor.bimap(__dict_Biapply_359["__superclass_Data.Bifunctor.Bifunctor_0"]({}))(Prelude["const"])(Prelude["const"]))(a))(b);
            };
        };
    };
    var $times$greater$greater = function (__dict_Biapply_360) {
        return function (a) {
            return function (b) {
                return $less$less$times$greater$greater(__dict_Biapply_360)($less$less$dollar$greater$greater(Data_Bifunctor.bimap(__dict_Biapply_360["__superclass_Data.Bifunctor.Bifunctor_0"]({}))(Prelude["const"](Prelude.id(Prelude.categoryArr({}))))(Prelude["const"](Prelude.id(Prelude.categoryArr({})))))(a))(b);
            };
        };
    };
    var bilift3 = function (__dict_Biapply_361) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return function (b) {
                        return function (c) {
                            return $less$less$times$greater$greater(__dict_Biapply_361)($less$less$times$greater$greater(__dict_Biapply_361)($less$less$dollar$greater$greater(Data_Bifunctor.bimap(__dict_Biapply_361["__superclass_Data.Bifunctor.Bifunctor_0"]({}))(f)(g))(a))(b))(c);
                        };
                    };
                };
            };
        };
    };
    var bilift2 = function (__dict_Biapply_362) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return function (b) {
                        return $less$less$times$greater$greater(__dict_Biapply_362)($less$less$dollar$greater$greater(Data_Bifunctor.bimap(__dict_Biapply_362["__superclass_Data.Bifunctor.Bifunctor_0"]({}))(f)(g))(a))(b);
                    };
                };
            };
        };
    };
    var biapplyTuple = function (__unused) {
        return new Biapply(function (_406) {
            return function (_407) {
                return new Data_Tuple.Tuple(_406.value0(_407.value0), _406.value1(_407.value1));
            };
        }, function (__unused) {
            return Data_Bifunctor.bifunctorTuple({});
        });
    };
    return {
        Biapply: Biapply, 
        bilift3: bilift3, 
        bilift2: bilift2, 
        "<<*": $less$less$times, 
        "*>>": $times$greater$greater, 
        "<<*>>": $less$less$times$greater$greater, 
        "<<$>>": $less$less$dollar$greater$greater, 
        biapplyTuple: biapplyTuple
    };
})();
var PS = PS || {};
PS.Control_Biapplicative = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Biapply = PS.Control_Biapply;
    function Biapplicative(__superclass_Control$dotBiapply$dotBiapply_0, bipure) {
        this["__superclass_Control.Biapply.Biapply_0"] = __superclass_Control$dotBiapply$dotBiapply_0;
        this.bipure = bipure;
    };
    var bipure = function (dict) {
        return dict.bipure;
    };
    var biapplicativeTuple = function (__unused) {
        return new Biapplicative(function (__unused) {
            return Control_Biapply.biapplyTuple({});
        }, Data_Tuple.Tuple.create);
    };
    return {
        Biapplicative: Biapplicative, 
        bipure: bipure, 
        biapplicativeTuple: biapplicativeTuple
    };
})();
var PS = PS || {};
PS.Data_Bitraversable = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Bifunctor = PS.Data_Bifunctor;
    var Data_Bifoldable = PS.Data_Bifoldable;
    var Data_Either = PS.Data_Either;
    function Bitraversable(__superclass_Data$dotBifoldable$dotBifoldable_1, __superclass_Data$dotBifunctor$dotBifunctor_0, bisequence, bitraverse) {
        this["__superclass_Data.Bifoldable.Bifoldable_1"] = __superclass_Data$dotBifoldable$dotBifoldable_1;
        this["__superclass_Data.Bifunctor.Bifunctor_0"] = __superclass_Data$dotBifunctor$dotBifunctor_0;
        this.bisequence = bisequence;
        this.bitraverse = bitraverse;
    };
    var bitraverse = function (dict) {
        return dict.bitraverse;
    };
    var bitraversableTuple = function (__unused) {
        return new Bitraversable(function (__unused) {
            return Data_Bifoldable.bifoldableTuple({});
        }, function (__unused) {
            return Data_Bifunctor.bifunctorTuple({});
        }, function (__dict_Applicative_364) {
            return function (_411) {
                return Prelude["<*>"](__dict_Applicative_364["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_364["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.Tuple.create)(_411.value0))(_411.value1);
            };
        }, function (__dict_Applicative_363) {
            return function (_408) {
                return function (_409) {
                    return function (_410) {
                        return Prelude["<*>"](__dict_Applicative_363["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_363["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.Tuple.create)(_408(_410.value0)))(_409(_410.value1));
                    };
                };
            };
        });
    };
    var bitraversableEither = function (__unused) {
        return new Bitraversable(function (__unused) {
            return Data_Bifoldable.bifoldableEither({});
        }, function (__unused) {
            return Data_Bifunctor.bifunctorEither({});
        }, function (__dict_Applicative_366) {
            return function (_415) {
                if (_415 instanceof Data_Either.Left) {
                    return Prelude["<$>"]((__dict_Applicative_366["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Left.create)(_415.value0);
                };
                if (_415 instanceof Data_Either.Right) {
                    return Prelude["<$>"]((__dict_Applicative_366["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Right.create)(_415.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_365) {
            return function (_412) {
                return function (_413) {
                    return function (_414) {
                        if (_414 instanceof Data_Either.Left) {
                            return Prelude["<$>"]((__dict_Applicative_365["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Left.create)(_412(_414.value0));
                        };
                        if (_414 instanceof Data_Either.Right) {
                            return Prelude["<$>"]((__dict_Applicative_365["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Right.create)(_413(_414.value0));
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        });
    };
    var bisequence = function (dict) {
        return dict.bisequence;
    };
    var bifor = function (__dict_Bitraversable_367) {
        return function (__dict_Applicative_368) {
            return function (t) {
                return function (f) {
                    return function (g) {
                        return bitraverse(__dict_Bitraversable_367)(__dict_Applicative_368)(f)(g)(t);
                    };
                };
            };
        };
    };
    return {
        Bitraversable: Bitraversable, 
        bifor: bifor, 
        bisequence: bisequence, 
        bitraverse: bitraverse, 
        bitraversableTuple: bitraversableTuple, 
        bitraversableEither: bitraversableEither
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
    var strongArr = function (__unused) {
        return new Strong(function (__unused) {
            return Data_Profunctor.profunctorArr({});
        }, function (_416) {
            return function (_417) {
                return new Data_Tuple.Tuple(_416(_417.value0), _417.value1);
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
    var pred = function (__dict_Enum_369) {
        return function (x) {
            return toEnum(__dict_Enum_369)(fromEnum(__dict_Enum_369)(x) - 1);
        };
    };
    var succ = function (__dict_Enum_370) {
        return function (x) {
            return toEnum(__dict_Enum_370)(fromEnum(__dict_Enum_370)(x) + 1);
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
PS.Data_Maybe_Unsafe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var fromJust = function (_418) {
        if (_418 instanceof Data_Maybe.Just) {
            return _418.value0;
        };
        throw new Error("Failed pattern match");
    };
    return {
        fromJust: fromJust
    };
})();
var PS = PS || {};
PS.Data_Array_Unsafe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    var Data_Array = PS.Data_Array;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var tail = function (_420) {
        if (_420.length > 0) {
            var _1459 = _420.slice(1);
            return _1459;
        };
        throw new Error("Failed pattern match");
    };
    var last = function (xs) {
        return xs[Data_Array.length(xs) - 1];
    };
    var init = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Data_Array.init);
    var head = function (_419) {
        if (_419.length > 0) {
            var _1462 = _419.slice(1);
            return _419[0];
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
    var toJSDate = function (_421) {
        return _421.value0;
    };
    var showMonth = function (__unused) {
        return new Prelude.Show(function (_426) {
            if (_426 instanceof January) {
                return "January";
            };
            if (_426 instanceof February) {
                return "February";
            };
            if (_426 instanceof March) {
                return "March";
            };
            if (_426 instanceof April) {
                return "April";
            };
            if (_426 instanceof May) {
                return "May";
            };
            if (_426 instanceof June) {
                return "June";
            };
            if (_426 instanceof July) {
                return "July";
            };
            if (_426 instanceof August) {
                return "August";
            };
            if (_426 instanceof September) {
                return "September";
            };
            if (_426 instanceof October) {
                return "October";
            };
            if (_426 instanceof November) {
                return "November";
            };
            if (_426 instanceof December) {
                return "December";
            };
            throw new Error("Failed pattern match");
        });
    };
    var showDayOfWeek = function (__unused) {
        return new Prelude.Show(function (_429) {
            if (_429 instanceof Sunday) {
                return "Sunday";
            };
            if (_429 instanceof Monday) {
                return "Monday";
            };
            if (_429 instanceof Tuesday) {
                return "Tuesday";
            };
            if (_429 instanceof Wednesday) {
                return "Wednesday";
            };
            if (_429 instanceof Thursday) {
                return "Thursday";
            };
            if (_429 instanceof Friday) {
                return "Friday";
            };
            if (_429 instanceof Saturday) {
                return "Saturday";
            };
            throw new Error("Failed pattern match");
        });
    };
    var now = nowImpl(DateTime.create);
    var liftDate = function (_422) {
        return function (_423) {
            return _422(_423.value0);
        };
    };
    var millisecond = liftDate(jsDateMethod("getMilliseconds"));
    var millisecondUTC = liftDate(jsDateMethod("getUTCMilliseconds"));
    var minute = liftDate(jsDateMethod("getMinutes"));
    var minuteUTC = liftDate(jsDateMethod("getUTCMinutes"));
    var second = liftDate(jsDateMethod("getSeconds"));
    var secondUTC = liftDate(jsDateMethod("getUTCSeconds"));
    var showDate = function (__unused) {
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
    var eqDate = function (__unused) {
        return new Prelude.Eq(liftOp(Prelude["/="](Prelude.eqNumber({}))), liftOp(Prelude["=="](Prelude.eqNumber({}))));
    };
    var ordDate = function (__unused) {
        return new Prelude.Ord(eqDate, liftOp(Prelude.compare(Prelude.ordNumber({}))));
    };
    var enumMonth = function (__unused) {
        return new Data_Enum.Enum(function (_425) {
            if (_425 instanceof January) {
                return 0;
            };
            if (_425 instanceof February) {
                return 1;
            };
            if (_425 instanceof March) {
                return 2;
            };
            if (_425 instanceof April) {
                return 3;
            };
            if (_425 instanceof May) {
                return 4;
            };
            if (_425 instanceof June) {
                return 5;
            };
            if (_425 instanceof July) {
                return 6;
            };
            if (_425 instanceof August) {
                return 7;
            };
            if (_425 instanceof September) {
                return 8;
            };
            if (_425 instanceof October) {
                return 9;
            };
            if (_425 instanceof November) {
                return 10;
            };
            if (_425 instanceof December) {
                return 11;
            };
            throw new Error("Failed pattern match");
        }, function (_424) {
            if (_424 === 0) {
                return new Data_Maybe.Just(January.value);
            };
            if (_424 === 1) {
                return new Data_Maybe.Just(February.value);
            };
            if (_424 === 2) {
                return new Data_Maybe.Just(March.value);
            };
            if (_424 === 3) {
                return new Data_Maybe.Just(April.value);
            };
            if (_424 === 4) {
                return new Data_Maybe.Just(May.value);
            };
            if (_424 === 5) {
                return new Data_Maybe.Just(June.value);
            };
            if (_424 === 6) {
                return new Data_Maybe.Just(July.value);
            };
            if (_424 === 7) {
                return new Data_Maybe.Just(August.value);
            };
            if (_424 === 8) {
                return new Data_Maybe.Just(September.value);
            };
            if (_424 === 8) {
                return new Data_Maybe.Just(October.value);
            };
            if (_424 === 10) {
                return new Data_Maybe.Just(November.value);
            };
            if (_424 === 11) {
                return new Data_Maybe.Just(December.value);
            };
            return Data_Maybe.Nothing.value;
        });
    };
    var month = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Enum.toEnum(enumMonth({})))(liftDate(jsDateMethod("getMonth"))));
    var monthUTC = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Enum.toEnum(enumMonth({})))(liftDate(jsDateMethod("getUTCMonth"))));
    var enumDayOfWeek = function (__unused) {
        return new Data_Enum.Enum(function (_428) {
            if (_428 instanceof Sunday) {
                return 0;
            };
            if (_428 instanceof Monday) {
                return 1;
            };
            if (_428 instanceof Tuesday) {
                return 2;
            };
            if (_428 instanceof Wednesday) {
                return 3;
            };
            if (_428 instanceof Thursday) {
                return 4;
            };
            if (_428 instanceof Friday) {
                return 5;
            };
            if (_428 instanceof Saturday) {
                return 6;
            };
            throw new Error("Failed pattern match");
        }, function (_427) {
            if (_427 === 0) {
                return new Data_Maybe.Just(Sunday.value);
            };
            if (_427 === 1) {
                return new Data_Maybe.Just(Monday.value);
            };
            if (_427 === 2) {
                return new Data_Maybe.Just(Tuesday.value);
            };
            if (_427 === 3) {
                return new Data_Maybe.Just(Wednesday.value);
            };
            if (_427 === 4) {
                return new Data_Maybe.Just(Thursday.value);
            };
            if (_427 === 5) {
                return new Data_Maybe.Just(Friday.value);
            };
            if (_427 === 6) {
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
    var statusChangedTime = function (_439) {
        return Data_Maybe_Unsafe.fromJust(Data_Date.fromJSDate(_439.value0.ctime));
    };
    var showStats = function (__unused) {
        return new Prelude.Show(function (_440) {
            return "Stats " + showStatsObj(_440.value0);
        });
    };
    var modifiedTime = function (_438) {
        return Data_Maybe_Unsafe.fromJust(Data_Date.fromJSDate(_438.value0.mtime));
    };
    var isSymbolicLink = function (_436) {
        return statsMethod("isSymbolicLink", _436.value0);
    };
    var isSocket = function (_435) {
        return statsMethod("isSocket", _435.value0);
    };
    var isFile = function (_430) {
        return statsMethod("isFile", _430.value0);
    };
    var isFIFO = function (_434) {
        return statsMethod("isFIFO", _434.value0);
    };
    var isDirectory = function (_431) {
        return statsMethod("isDirectory", _431.value0);
    };
    var isCharacterDevice = function (_433) {
        return statsMethod("isCharacterDevice", _433.value0);
    };
    var isBlockDevice = function (_432) {
        return statsMethod("isBlockDevice", _432.value0);
    };
    var accessedTime = function (_437) {
        return Data_Maybe_Unsafe.fromJust(Data_Date.fromJSDate(_437.value0.atime));
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
PS.Data_Monoid_First = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Monoid = PS.Data_Monoid;
    var First = {
        create: function (value) {
            return value;
        }
    };
    var showFirst = function (__dict_Show_371) {
        return new Prelude.Show(function (_448) {
            return "First (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_371))(_448) + ")";
        });
    };
    var semigroupFirst = function (__unused) {
        return new Prelude.Semigroup(function (_449) {
            return function (_450) {
                if (_449 instanceof Data_Maybe.Just) {
                    return _449;
                };
                return _450;
            };
        });
    };
    var runFirst = function (_441) {
        return _441;
    };
    var monoidFirst = function (__unused) {
        return new Data_Monoid.Monoid(semigroupFirst, Data_Maybe.Nothing.value);
    };
    var eqFirst = function (__dict_Eq_373) {
        return new Prelude.Eq(function (_444) {
            return function (_445) {
                return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_373))(_444)(_445);
            };
        }, function (_442) {
            return function (_443) {
                return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_373))(_442)(_443);
            };
        });
    };
    var ordFirst = function (__dict_Ord_372) {
        return new Prelude.Ord(function (__unused) {
            return eqFirst(__dict_Ord_372["__superclass_Prelude.Eq_0"]({}));
        }, function (_446) {
            return function (_447) {
                return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_372))(_446)(_447);
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
    var traverse_ = function (__dict_Applicative_374) {
        return function (__dict_Foldable_375) {
            return function (f) {
                return foldr(__dict_Foldable_375)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Apply["*>"](__dict_Applicative_374["__superclass_Prelude.Apply_0"]({})))(f))(Prelude.pure(__dict_Applicative_374)(Prelude.unit));
            };
        };
    };
    var for_ = function (__dict_Applicative_376) {
        return function (__dict_Foldable_377) {
            return Prelude.flip(traverse_(__dict_Applicative_376)(__dict_Foldable_377));
        };
    };
    var sequence_ = function (__dict_Applicative_378) {
        return function (__dict_Foldable_379) {
            return traverse_(__dict_Applicative_378)(__dict_Foldable_379)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var foldl = function (dict) {
        return dict.foldl;
    };
    var mconcat = function (__dict_Foldable_380) {
        return function (__dict_Monoid_381) {
            return foldl(__dict_Foldable_380)(Prelude["<>"](__dict_Monoid_381["__superclass_Prelude.Semigroup_0"]({})))(Data_Monoid.mempty(__dict_Monoid_381));
        };
    };
    var or = function (__dict_Foldable_382) {
        return foldl(__dict_Foldable_382)(Prelude["||"](Prelude.boolLikeBoolean({})))(false);
    };
    var product = function (__dict_Foldable_383) {
        return foldl(__dict_Foldable_383)(Prelude["*"](Prelude.numNumber({})))(1);
    };
    var sum = function (__dict_Foldable_384) {
        return foldl(__dict_Foldable_384)(Prelude["+"](Prelude.numNumber({})))(0);
    };
    var foldableTuple = function (__unused) {
        return new Foldable(function (__dict_Monoid_385) {
            return function (_482) {
                return function (_483) {
                    return _482(_483.value1);
                };
            };
        }, function (_479) {
            return function (_480) {
                return function (_481) {
                    return _479(_480)(_481.value1);
                };
            };
        }, function (_476) {
            return function (_477) {
                return function (_478) {
                    return _476(_478.value1)(_477);
                };
            };
        });
    };
    var foldableRef = function (__unused) {
        return new Foldable(function (__dict_Monoid_386) {
            return function (_474) {
                return function (_475) {
                    return _474(_475);
                };
            };
        }, function (_471) {
            return function (_472) {
                return function (_473) {
                    return _471(_472)(_473);
                };
            };
        }, function (_468) {
            return function (_469) {
                return function (_470) {
                    return _468(_470)(_469);
                };
            };
        });
    };
    var foldableMaybe = function (__unused) {
        return new Foldable(function (__dict_Monoid_387) {
            return function (_466) {
                return function (_467) {
                    if (_467 instanceof Data_Maybe.Nothing) {
                        return Data_Monoid.mempty(__dict_Monoid_387);
                    };
                    if (_467 instanceof Data_Maybe.Just) {
                        return _466(_467.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_463) {
            return function (_464) {
                return function (_465) {
                    if (_465 instanceof Data_Maybe.Nothing) {
                        return _464;
                    };
                    if (_465 instanceof Data_Maybe.Just) {
                        return _463(_464)(_465.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_460) {
            return function (_461) {
                return function (_462) {
                    if (_462 instanceof Data_Maybe.Nothing) {
                        return _461;
                    };
                    if (_462 instanceof Data_Maybe.Just) {
                        return _460(_462.value0)(_461);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var foldableEither = function (__unused) {
        return new Foldable(function (__dict_Monoid_388) {
            return function (_458) {
                return function (_459) {
                    if (_459 instanceof Data_Either.Left) {
                        return Data_Monoid.mempty(__dict_Monoid_388);
                    };
                    if (_459 instanceof Data_Either.Right) {
                        return _458(_459.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_455) {
            return function (_456) {
                return function (_457) {
                    if (_457 instanceof Data_Either.Left) {
                        return _456;
                    };
                    if (_457 instanceof Data_Either.Right) {
                        return _455(_456)(_457.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_452) {
            return function (_453) {
                return function (_454) {
                    if (_454 instanceof Data_Either.Left) {
                        return _453;
                    };
                    if (_454 instanceof Data_Either.Right) {
                        return _452(_454.value0)(_453);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var foldableArray = function (__unused) {
        return new Foldable(function (__dict_Monoid_389) {
            return function (f) {
                return function (xs) {
                    return foldr(foldableArray({}))(function (x) {
                        return function (acc) {
                            return Prelude["<>"](__dict_Monoid_389["__superclass_Prelude.Semigroup_0"]({}))(f(x))(acc);
                        };
                    })(Data_Monoid.mempty(__dict_Monoid_389))(xs);
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
    var lookup = function (__dict_Eq_390) {
        return function (__dict_Foldable_391) {
            return function (a) {
                return function (f) {
                    return Data_Monoid_First.runFirst(foldMap(__dict_Foldable_391)(Data_Monoid_First.monoidFirst({}))(function (_451) {
                        return Prelude["=="](__dict_Eq_390)(a)(_451.value0) ? new Data_Maybe.Just(_451.value1) : Data_Maybe.Nothing.value;
                    })(f));
                };
            };
        };
    };
    var fold = function (__dict_Foldable_392) {
        return function (__dict_Monoid_393) {
            return foldMap(__dict_Foldable_392)(__dict_Monoid_393)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var find = function (__dict_Foldable_394) {
        return function (p) {
            return function (f) {
                var _1557 = foldMap(__dict_Foldable_394)(Data_Monoid.monoidArray({}))(function (x) {
                    return p(x) ? [ x ] : [  ];
                })(f);
                if (_1557.length > 0) {
                    var _1559 = _1557.slice(1);
                    return new Data_Maybe.Just(_1557[0]);
                };
                if (_1557.length === 0) {
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var any = function (__dict_Foldable_395) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(or(foldableArray({})))(foldMap(__dict_Foldable_395)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    var elem = function (__dict_Eq_396) {
        return function (__dict_Foldable_397) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(any(__dict_Foldable_397))(Prelude["=="](__dict_Eq_396));
        };
    };
    var notElem = function (__dict_Eq_398) {
        return function (__dict_Foldable_399) {
            return function (x) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.not(Prelude.boolLikeBoolean({})))(elem(__dict_Eq_398)(__dict_Foldable_399)(x));
            };
        };
    };
    var and = function (__dict_Foldable_400) {
        return foldl(__dict_Foldable_400)(Prelude["&&"](Prelude.boolLikeBoolean({})))(true);
    };
    var all = function (__dict_Foldable_401) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(and(foldableArray({})))(foldMap(__dict_Foldable_401)(Data_Monoid.monoidArray({}))(function (x) {
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
    var values = function (_494) {
        if (_494 instanceof Leaf) {
            return [  ];
        };
        if (_494 instanceof Two) {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_494.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _494.value2 ])(values(_494.value3)));
        };
        if (_494 instanceof Three) {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_494.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _494.value2 ])(Prelude["++"](Data_Array.semigroupArray({}))(values(_494.value3))(Prelude["++"](Data_Array.semigroupArray({}))([ _494.value5 ])(values(_494.value6)))));
        };
        throw new Error("Failed pattern match");
    };
    var toList = function (_492) {
        if (_492 instanceof Leaf) {
            return [  ];
        };
        if (_492 instanceof Two) {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_492.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ new Data_Tuple.Tuple(_492.value1, _492.value2) ])(toList(_492.value3)));
        };
        if (_492 instanceof Three) {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_492.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ new Data_Tuple.Tuple(_492.value1, _492.value2) ])(Prelude["++"](Data_Array.semigroupArray({}))(toList(_492.value3))(Prelude["++"](Data_Array.semigroupArray({}))([ new Data_Tuple.Tuple(_492.value4, _492.value5) ])(toList(_492.value6)))));
        };
        throw new Error("Failed pattern match");
    };
    var singleton = function (k) {
        return function (v) {
            return new Two(Leaf.value, k, v, Leaf.value);
        };
    };
    var showTree = function (__dict_Show_402) {
        return function (__dict_Show_403) {
            return function (_486) {
                if (_486 instanceof Leaf) {
                    return "Leaf";
                };
                if (_486 instanceof Two) {
                    return "Two (" + showTree(__dict_Show_402)(__dict_Show_403)(_486.value0) + ") (" + Prelude.show(__dict_Show_402)(_486.value1) + ") (" + Prelude.show(__dict_Show_403)(_486.value2) + ") (" + showTree(__dict_Show_402)(__dict_Show_403)(_486.value3) + ")";
                };
                if (_486 instanceof Three) {
                    return "Three (" + showTree(__dict_Show_402)(__dict_Show_403)(_486.value0) + ") (" + Prelude.show(__dict_Show_402)(_486.value1) + ") (" + Prelude.show(__dict_Show_403)(_486.value2) + ") (" + showTree(__dict_Show_402)(__dict_Show_403)(_486.value3) + ") (" + Prelude.show(__dict_Show_402)(_486.value4) + ") (" + Prelude.show(__dict_Show_403)(_486.value5) + ") (" + showTree(__dict_Show_402)(__dict_Show_403)(_486.value6) + ")";
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var showMap = function (__dict_Show_404) {
        return function (__dict_Show_405) {
            return new Prelude.Show(function (m) {
                return "fromList " + Prelude.show(Prelude.showArray(Data_Tuple.showTuple(__dict_Show_404)(__dict_Show_405)))(toList(m));
            });
        };
    };
    var lookup = function (__copy___dict_Ord_406) {
        return function (__copy__488) {
            return function (__copy__489) {
                var __dict_Ord_406 = __copy___dict_Ord_406;
                var _488 = __copy__488;
                var _489 = __copy__489;
                tco: while (true) {
                    if (_489 instanceof Leaf) {
                        return Data_Maybe.Nothing.value;
                    };
                    if (_489 instanceof Two && Prelude["=="](__dict_Ord_406["__superclass_Prelude.Eq_0"]({}))(_488)(_489.value1)) {
                        return new Data_Maybe.Just(_489.value2);
                    };
                    if (_489 instanceof Two && Prelude["<"](__dict_Ord_406)(_488)(_489.value1)) {
                        var __tco___dict_Ord_406 = __dict_Ord_406;
                        var __tco__488 = _488;
                        var __tco__489 = _489.value0;
                        __dict_Ord_406 = __tco___dict_Ord_406;
                        _488 = __tco__488;
                        _489 = __tco__489;
                        continue tco;
                    };
                    if (_489 instanceof Two) {
                        var __tco___dict_Ord_406 = __dict_Ord_406;
                        var __tco__488 = _488;
                        var __tco__489 = _489.value3;
                        __dict_Ord_406 = __tco___dict_Ord_406;
                        _488 = __tco__488;
                        _489 = __tco__489;
                        continue tco;
                    };
                    if (_489 instanceof Three && Prelude["=="](__dict_Ord_406["__superclass_Prelude.Eq_0"]({}))(_488)(_489.value1)) {
                        return new Data_Maybe.Just(_489.value2);
                    };
                    if (_489 instanceof Three && Prelude["=="](__dict_Ord_406["__superclass_Prelude.Eq_0"]({}))(_488)(_489.value4)) {
                        return new Data_Maybe.Just(_489.value5);
                    };
                    if (_489 instanceof Three && Prelude["<"](__dict_Ord_406)(_488)(_489.value1)) {
                        var __tco___dict_Ord_406 = __dict_Ord_406;
                        var __tco__488 = _488;
                        var __tco__489 = _489.value0;
                        __dict_Ord_406 = __tco___dict_Ord_406;
                        _488 = __tco__488;
                        _489 = __tco__489;
                        continue tco;
                    };
                    if (_489 instanceof Three && Prelude["<"](__dict_Ord_406)(_489.value1)(_488) && Prelude["<="](__dict_Ord_406)(_488)(_489.value4)) {
                        var __tco___dict_Ord_406 = __dict_Ord_406;
                        var __tco__488 = _488;
                        var __tco__489 = _489.value3;
                        __dict_Ord_406 = __tco___dict_Ord_406;
                        _488 = __tco__488;
                        _489 = __tco__489;
                        continue tco;
                    };
                    if (_489 instanceof Three) {
                        var __tco___dict_Ord_406 = __dict_Ord_406;
                        var __tco__488 = _488;
                        var __tco__489 = _489.value6;
                        __dict_Ord_406 = __tco___dict_Ord_406;
                        _488 = __tco__488;
                        _489 = __tco__489;
                        continue tco;
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    var member = function (__dict_Ord_407) {
        return function (k) {
            return function (m) {
                return Data_Maybe.isJust(lookup(__dict_Ord_407)(k)(m));
            };
        };
    };
    var keys = function (_493) {
        if (_493 instanceof Leaf) {
            return [  ];
        };
        if (_493 instanceof Two) {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_493.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _493.value1 ])(keys(_493.value3)));
        };
        if (_493 instanceof Three) {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_493.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _493.value1 ])(Prelude["++"](Data_Array.semigroupArray({}))(keys(_493.value3))(Prelude["++"](Data_Array.semigroupArray({}))([ _493.value4 ])(keys(_493.value6)))));
        };
        throw new Error("Failed pattern match");
    };
    var isEmpty = function (_487) {
        if (_487 instanceof Leaf) {
            return true;
        };
        return false;
    };
    var functorMap = function (__unused) {
        return new Prelude.Functor(function (_495) {
            return function (_496) {
                if (_496 instanceof Leaf) {
                    return Leaf.value;
                };
                if (_496 instanceof Two) {
                    return new Two(Prelude["<$>"](functorMap({}))(_495)(_496.value0), _496.value1, _495(_496.value2), Prelude["<$>"](functorMap({}))(_495)(_496.value3));
                };
                if (_496 instanceof Three) {
                    return new Three(Prelude["<$>"](functorMap({}))(_495)(_496.value0), _496.value1, _495(_496.value2), Prelude["<$>"](functorMap({}))(_495)(_496.value3), _496.value4, _495(_496.value5), Prelude["<$>"](functorMap({}))(_495)(_496.value6));
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var map = Prelude["<$>"](functorMap({}));
    var fromZipper = function (__copy___dict_Ord_408) {
        return function (__copy__490) {
            return function (__copy__491) {
                var __dict_Ord_408 = __copy___dict_Ord_408;
                var _490 = __copy__490;
                var _491 = __copy__491;
                tco: while (true) {
                    if (_490.length === 0) {
                        return _491;
                    };
                    if (_490.length > 0) {
                        var _1674 = _490.slice(1);
                        if (_490[0] instanceof TwoLeft) {
                            var __tco___dict_Ord_408 = __dict_Ord_408;
                            var __tco__491 = new Two(_491, (_490[0]).value0, (_490[0]).value1, (_490[0]).value2);
                            __dict_Ord_408 = __tco___dict_Ord_408;
                            _490 = _1674;
                            _491 = __tco__491;
                            continue tco;
                        };
                    };
                    if (_490.length > 0) {
                        var _1679 = _490.slice(1);
                        if (_490[0] instanceof TwoRight) {
                            var __tco___dict_Ord_408 = __dict_Ord_408;
                            var __tco__491 = new Two((_490[0]).value0, (_490[0]).value1, (_490[0]).value2, _491);
                            __dict_Ord_408 = __tco___dict_Ord_408;
                            _490 = _1679;
                            _491 = __tco__491;
                            continue tco;
                        };
                    };
                    if (_490.length > 0) {
                        var _1684 = _490.slice(1);
                        if (_490[0] instanceof ThreeLeft) {
                            var __tco___dict_Ord_408 = __dict_Ord_408;
                            var __tco__491 = new Three(_491, (_490[0]).value0, (_490[0]).value1, (_490[0]).value2, (_490[0]).value3, (_490[0]).value4, (_490[0]).value5);
                            __dict_Ord_408 = __tco___dict_Ord_408;
                            _490 = _1684;
                            _491 = __tco__491;
                            continue tco;
                        };
                    };
                    if (_490.length > 0) {
                        var _1692 = _490.slice(1);
                        if (_490[0] instanceof ThreeMiddle) {
                            var __tco___dict_Ord_408 = __dict_Ord_408;
                            var __tco__491 = new Three((_490[0]).value0, (_490[0]).value1, (_490[0]).value2, _491, (_490[0]).value3, (_490[0]).value4, (_490[0]).value5);
                            __dict_Ord_408 = __tco___dict_Ord_408;
                            _490 = _1692;
                            _491 = __tco__491;
                            continue tco;
                        };
                    };
                    if (_490.length > 0) {
                        var _1700 = _490.slice(1);
                        if (_490[0] instanceof ThreeRight) {
                            var __tco___dict_Ord_408 = __dict_Ord_408;
                            var __tco__491 = new Three((_490[0]).value0, (_490[0]).value1, (_490[0]).value2, (_490[0]).value3, (_490[0]).value4, (_490[0]).value5, _491);
                            __dict_Ord_408 = __tco___dict_Ord_408;
                            _490 = _1700;
                            _491 = __tco__491;
                            continue tco;
                        };
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    var insert = function (__dict_Ord_409) {
        var up = function (__copy___dict_Ord_410) {
            return function (__copy__502) {
                return function (__copy__503) {
                    var __dict_Ord_410 = __copy___dict_Ord_410;
                    var _502 = __copy__502;
                    var _503 = __copy__503;
                    tco: while (true) {
                        if (_502.length === 0) {
                            return new Two(_503.value0, _503.value1, _503.value2, _503.value3);
                        };
                        if (_502.length > 0) {
                            var _1718 = _502.slice(1);
                            if (_502[0] instanceof TwoLeft) {
                                return fromZipper(__dict_Ord_410)(_1718)(new Three(_503.value0, _503.value1, _503.value2, _503.value3, (_502[0]).value0, (_502[0]).value1, (_502[0]).value2));
                            };
                        };
                        if (_502.length > 0) {
                            var _1727 = _502.slice(1);
                            if (_502[0] instanceof TwoRight) {
                                return fromZipper(__dict_Ord_410)(_1727)(new Three((_502[0]).value0, (_502[0]).value1, (_502[0]).value2, _503.value0, _503.value1, _503.value2, _503.value3));
                            };
                        };
                        if (_502.length > 0) {
                            var _1736 = _502.slice(1);
                            if (_502[0] instanceof ThreeLeft) {
                                var __tco___dict_Ord_410 = __dict_Ord_410;
                                var __tco__503 = new KickUp(new Two(_503.value0, _503.value1, _503.value2, _503.value3), (_502[0]).value0, (_502[0]).value1, new Two((_502[0]).value2, (_502[0]).value3, (_502[0]).value4, (_502[0]).value5));
                                __dict_Ord_410 = __tco___dict_Ord_410;
                                _502 = _1736;
                                _503 = __tco__503;
                                continue tco;
                            };
                        };
                        if (_502.length > 0) {
                            var _1748 = _502.slice(1);
                            if (_502[0] instanceof ThreeMiddle) {
                                var __tco___dict_Ord_410 = __dict_Ord_410;
                                var __tco__503 = new KickUp(new Two((_502[0]).value0, (_502[0]).value1, (_502[0]).value2, _503.value0), _503.value1, _503.value2, new Two(_503.value3, (_502[0]).value3, (_502[0]).value4, (_502[0]).value5));
                                __dict_Ord_410 = __tco___dict_Ord_410;
                                _502 = _1748;
                                _503 = __tco__503;
                                continue tco;
                            };
                        };
                        if (_502.length > 0) {
                            var _1760 = _502.slice(1);
                            if (_502[0] instanceof ThreeRight) {
                                var __tco___dict_Ord_410 = __dict_Ord_410;
                                var __tco__503 = new KickUp(new Two((_502[0]).value0, (_502[0]).value1, (_502[0]).value2, (_502[0]).value3), (_502[0]).value4, (_502[0]).value5, new Two(_503.value0, _503.value1, _503.value2, _503.value3));
                                __dict_Ord_410 = __tco___dict_Ord_410;
                                _502 = _1760;
                                _503 = __tco__503;
                                continue tco;
                            };
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        var down = function (__copy___dict_Ord_411) {
            return function (__copy__498) {
                return function (__copy__499) {
                    return function (__copy__500) {
                        return function (__copy__501) {
                            var __dict_Ord_411 = __copy___dict_Ord_411;
                            var _498 = __copy__498;
                            var _499 = __copy__499;
                            var _500 = __copy__500;
                            var _501 = __copy__501;
                            tco: while (true) {
                                if (_501 instanceof Leaf) {
                                    return up(__dict_Ord_411)(_498)(new KickUp(Leaf.value, _499, _500, Leaf.value));
                                };
                                if (_501 instanceof Two && Prelude["=="](__dict_Ord_411["__superclass_Prelude.Eq_0"]({}))(_499)(_501.value1)) {
                                    return fromZipper(__dict_Ord_411)(_498)(new Two(_501.value0, _499, _500, _501.value3));
                                };
                                if (_501 instanceof Two && Prelude["<"](__dict_Ord_411)(_499)(_501.value1)) {
                                    var __tco___dict_Ord_411 = __dict_Ord_411;
                                    var __tco__498 = Prelude[":"](new TwoLeft(_501.value1, _501.value2, _501.value3))(_498);
                                    var __tco__499 = _499;
                                    var __tco__500 = _500;
                                    var __tco__501 = _501.value0;
                                    __dict_Ord_411 = __tco___dict_Ord_411;
                                    _498 = __tco__498;
                                    _499 = __tco__499;
                                    _500 = __tco__500;
                                    _501 = __tco__501;
                                    continue tco;
                                };
                                if (_501 instanceof Two) {
                                    var __tco___dict_Ord_411 = __dict_Ord_411;
                                    var __tco__498 = Prelude[":"](new TwoRight(_501.value0, _501.value1, _501.value2))(_498);
                                    var __tco__499 = _499;
                                    var __tco__500 = _500;
                                    var __tco__501 = _501.value3;
                                    __dict_Ord_411 = __tco___dict_Ord_411;
                                    _498 = __tco__498;
                                    _499 = __tco__499;
                                    _500 = __tco__500;
                                    _501 = __tco__501;
                                    continue tco;
                                };
                                if (_501 instanceof Three && Prelude["=="](__dict_Ord_411["__superclass_Prelude.Eq_0"]({}))(_499)(_501.value1)) {
                                    return fromZipper(__dict_Ord_411)(_498)(new Three(_501.value0, _499, _500, _501.value3, _501.value4, _501.value5, _501.value6));
                                };
                                if (_501 instanceof Three && Prelude["=="](__dict_Ord_411["__superclass_Prelude.Eq_0"]({}))(_499)(_501.value4)) {
                                    return fromZipper(__dict_Ord_411)(_498)(new Three(_501.value0, _501.value1, _501.value2, _501.value3, _499, _500, _501.value6));
                                };
                                if (_501 instanceof Three && Prelude["<"](__dict_Ord_411)(_499)(_501.value1)) {
                                    var __tco___dict_Ord_411 = __dict_Ord_411;
                                    var __tco__498 = Prelude[":"](new ThreeLeft(_501.value1, _501.value2, _501.value3, _501.value4, _501.value5, _501.value6))(_498);
                                    var __tco__499 = _499;
                                    var __tco__500 = _500;
                                    var __tco__501 = _501.value0;
                                    __dict_Ord_411 = __tco___dict_Ord_411;
                                    _498 = __tco__498;
                                    _499 = __tco__499;
                                    _500 = __tco__500;
                                    _501 = __tco__501;
                                    continue tco;
                                };
                                if (_501 instanceof Three && Prelude["<"](__dict_Ord_411)(_501.value1)(_499) && Prelude["<="](__dict_Ord_411)(_499)(_501.value4)) {
                                    var __tco___dict_Ord_411 = __dict_Ord_411;
                                    var __tco__498 = Prelude[":"](new ThreeMiddle(_501.value0, _501.value1, _501.value2, _501.value4, _501.value5, _501.value6))(_498);
                                    var __tco__499 = _499;
                                    var __tco__500 = _500;
                                    var __tco__501 = _501.value3;
                                    __dict_Ord_411 = __tco___dict_Ord_411;
                                    _498 = __tco__498;
                                    _499 = __tco__499;
                                    _500 = __tco__500;
                                    _501 = __tco__501;
                                    continue tco;
                                };
                                if (_501 instanceof Three) {
                                    var __tco___dict_Ord_411 = __dict_Ord_411;
                                    var __tco__498 = Prelude[":"](new ThreeRight(_501.value0, _501.value1, _501.value2, _501.value3, _501.value4, _501.value5))(_498);
                                    var __tco__499 = _499;
                                    var __tco__500 = _500;
                                    var __tco__501 = _501.value6;
                                    __dict_Ord_411 = __tco___dict_Ord_411;
                                    _498 = __tco__498;
                                    _499 = __tco__499;
                                    _500 = __tco__500;
                                    _501 = __tco__501;
                                    continue tco;
                                };
                                throw new Error("Failed pattern match");
                            };
                        };
                    };
                };
            };
        };
        return down(__dict_Ord_409)([  ]);
    };
    var union = function (__dict_Ord_412) {
        return function (m1) {
            return function (m2) {
                return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
                    return function (_485) {
                        return insert(__dict_Ord_412)(_485.value0)(_485.value1)(m);
                    };
                })(m2)(toList(m1));
            };
        };
    };
    var eqMap = function (__dict_Eq_413) {
        return function (__dict_Eq_414) {
            return new Prelude.Eq(function (m1) {
                return function (m2) {
                    return !Prelude["=="](eqMap(__dict_Eq_413)(__dict_Eq_414))(m1)(m2);
                };
            }, function (m1) {
                return function (m2) {
                    return Prelude["=="](Prelude.eqArray(Data_Tuple.eqTuple(__dict_Eq_413)(__dict_Eq_414)))(toList(m1))(toList(m2));
                };
            });
        };
    };
    var empty = Leaf.value;
    var fromList = function (__dict_Ord_415) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
            return function (_484) {
                return insert(__dict_Ord_415)(_484.value0)(_484.value1)(m);
            };
        })(empty);
    };
    var unions = function (__dict_Ord_416) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(union(__dict_Ord_416))(empty);
    };
    var $$delete = function (__dict_Ord_417) {
        var up = function (__copy___dict_Ord_418) {
            return function (__copy__507) {
                return function (__copy__508) {
                    var __dict_Ord_418 = __copy___dict_Ord_418;
                    var _507 = __copy__507;
                    var _508 = __copy__508;
                    tco: while (true) {
                        if (_507.length === 0) {
                            return _508;
                        };
                        if (_507.length > 0) {
                            var _1827 = _507.slice(1);
                            if (_507[0] instanceof TwoLeft && (_507[0]).value2 instanceof Leaf && _508 instanceof Leaf) {
                                return fromZipper(__dict_Ord_418)(_1827)(new Two(Leaf.value, (_507[0]).value0, (_507[0]).value1, Leaf.value));
                            };
                        };
                        if (_507.length > 0) {
                            var _1832 = _507.slice(1);
                            if (_507[0] instanceof TwoRight && (_507[0]).value0 instanceof Leaf && _508 instanceof Leaf) {
                                return fromZipper(__dict_Ord_418)(_1832)(new Two(Leaf.value, (_507[0]).value1, (_507[0]).value2, Leaf.value));
                            };
                        };
                        if (_507.length > 0) {
                            var _1837 = _507.slice(1);
                            if (_507[0] instanceof TwoLeft && (_507[0]).value2 instanceof Two) {
                                var __tco___dict_Ord_418 = __dict_Ord_418;
                                var __tco__508 = new Three(_508, (_507[0]).value0, (_507[0]).value1, (_507[0]).value2.value0, (_507[0]).value2.value1, (_507[0]).value2.value2, (_507[0]).value2.value3);
                                __dict_Ord_418 = __tco___dict_Ord_418;
                                _507 = _1837;
                                _508 = __tco__508;
                                continue tco;
                            };
                        };
                        if (_507.length > 0) {
                            var _1846 = _507.slice(1);
                            if (_507[0] instanceof TwoRight && (_507[0]).value0 instanceof Two) {
                                var __tco___dict_Ord_418 = __dict_Ord_418;
                                var __tco__508 = new Three((_507[0]).value0.value0, (_507[0]).value0.value1, (_507[0]).value0.value2, (_507[0]).value0.value3, (_507[0]).value1, (_507[0]).value2, _508);
                                __dict_Ord_418 = __tco___dict_Ord_418;
                                _507 = _1846;
                                _508 = __tco__508;
                                continue tco;
                            };
                        };
                        if (_507.length > 0) {
                            var _1855 = _507.slice(1);
                            if (_507[0] instanceof TwoLeft && (_507[0]).value2 instanceof Three) {
                                return fromZipper(__dict_Ord_418)(_1855)(new Two(new Two(_508, (_507[0]).value0, (_507[0]).value1, (_507[0]).value2.value0), (_507[0]).value2.value1, (_507[0]).value2.value2, new Two((_507[0]).value2.value3, (_507[0]).value2.value4, (_507[0]).value2.value5, (_507[0]).value2.value6)));
                            };
                        };
                        if (_507.length > 0) {
                            var _1867 = _507.slice(1);
                            if (_507[0] instanceof TwoRight && (_507[0]).value0 instanceof Three) {
                                return fromZipper(__dict_Ord_418)(_1867)(new Two(new Two((_507[0]).value0.value0, (_507[0]).value0.value1, (_507[0]).value0.value2, (_507[0]).value0.value3), (_507[0]).value0.value4, (_507[0]).value0.value5, new Two((_507[0]).value0.value6, (_507[0]).value1, (_507[0]).value2, _508)));
                            };
                        };
                        if (_507.length > 0) {
                            var _1879 = _507.slice(1);
                            if (_507[0] instanceof ThreeLeft && (_507[0]).value2 instanceof Leaf && (_507[0]).value5 instanceof Leaf && _508 instanceof Leaf) {
                                return fromZipper(__dict_Ord_418)(_1879)(new Three(Leaf.value, (_507[0]).value0, (_507[0]).value1, Leaf.value, (_507[0]).value3, (_507[0]).value4, Leaf.value));
                            };
                        };
                        if (_507.length > 0) {
                            var _1887 = _507.slice(1);
                            if (_507[0] instanceof ThreeMiddle && (_507[0]).value0 instanceof Leaf && (_507[0]).value5 instanceof Leaf && _508 instanceof Leaf) {
                                return fromZipper(__dict_Ord_418)(_1887)(new Three(Leaf.value, (_507[0]).value1, (_507[0]).value2, Leaf.value, (_507[0]).value3, (_507[0]).value4, Leaf.value));
                            };
                        };
                        if (_507.length > 0) {
                            var _1895 = _507.slice(1);
                            if (_507[0] instanceof ThreeRight && (_507[0]).value0 instanceof Leaf && (_507[0]).value3 instanceof Leaf && _508 instanceof Leaf) {
                                return fromZipper(__dict_Ord_418)(_1895)(new Three(Leaf.value, (_507[0]).value1, (_507[0]).value2, Leaf.value, (_507[0]).value4, (_507[0]).value5, Leaf.value));
                            };
                        };
                        if (_507.length > 0) {
                            var _1903 = _507.slice(1);
                            if (_507[0] instanceof ThreeLeft && (_507[0]).value2 instanceof Two) {
                                return fromZipper(__dict_Ord_418)(_1903)(new Two(new Three(_508, (_507[0]).value0, (_507[0]).value1, (_507[0]).value2.value0, (_507[0]).value2.value1, (_507[0]).value2.value2, (_507[0]).value2.value3), (_507[0]).value3, (_507[0]).value4, (_507[0]).value5));
                            };
                        };
                        if (_507.length > 0) {
                            var _1915 = _507.slice(1);
                            if (_507[0] instanceof ThreeMiddle && (_507[0]).value0 instanceof Two) {
                                return fromZipper(__dict_Ord_418)(_1915)(new Two(new Three((_507[0]).value0.value0, (_507[0]).value0.value1, (_507[0]).value0.value2, (_507[0]).value0.value3, (_507[0]).value1, (_507[0]).value2, _508), (_507[0]).value3, (_507[0]).value4, (_507[0]).value5));
                            };
                        };
                        if (_507.length > 0) {
                            var _1927 = _507.slice(1);
                            if (_507[0] instanceof ThreeMiddle && (_507[0]).value5 instanceof Two) {
                                return fromZipper(__dict_Ord_418)(_1927)(new Two((_507[0]).value0, (_507[0]).value1, (_507[0]).value2, new Three(_508, (_507[0]).value3, (_507[0]).value4, (_507[0]).value5.value0, (_507[0]).value5.value1, (_507[0]).value5.value2, (_507[0]).value5.value3)));
                            };
                        };
                        if (_507.length > 0) {
                            var _1939 = _507.slice(1);
                            if (_507[0] instanceof ThreeRight && (_507[0]).value3 instanceof Two) {
                                return fromZipper(__dict_Ord_418)(_1939)(new Two((_507[0]).value0, (_507[0]).value1, (_507[0]).value2, new Three((_507[0]).value3.value0, (_507[0]).value3.value1, (_507[0]).value3.value2, (_507[0]).value3.value3, (_507[0]).value4, (_507[0]).value5, _508)));
                            };
                        };
                        if (_507.length > 0) {
                            var _1951 = _507.slice(1);
                            if (_507[0] instanceof ThreeLeft && (_507[0]).value2 instanceof Three) {
                                return fromZipper(__dict_Ord_418)(_1951)(new Three(new Two(_508, (_507[0]).value0, (_507[0]).value1, (_507[0]).value2.value0), (_507[0]).value2.value1, (_507[0]).value2.value2, new Two((_507[0]).value2.value3, (_507[0]).value2.value4, (_507[0]).value2.value5, (_507[0]).value2.value6), (_507[0]).value3, (_507[0]).value4, (_507[0]).value5));
                            };
                        };
                        if (_507.length > 0) {
                            var _1966 = _507.slice(1);
                            if (_507[0] instanceof ThreeMiddle && (_507[0]).value0 instanceof Three) {
                                return fromZipper(__dict_Ord_418)(_1966)(new Three(new Two((_507[0]).value0.value0, (_507[0]).value0.value1, (_507[0]).value0.value2, (_507[0]).value0.value3), (_507[0]).value0.value4, (_507[0]).value0.value5, new Two((_507[0]).value0.value6, (_507[0]).value1, (_507[0]).value2, _508), (_507[0]).value3, (_507[0]).value4, (_507[0]).value5));
                            };
                        };
                        if (_507.length > 0) {
                            var _1981 = _507.slice(1);
                            if (_507[0] instanceof ThreeMiddle && (_507[0]).value5 instanceof Three) {
                                return fromZipper(__dict_Ord_418)(_1981)(new Three((_507[0]).value0, (_507[0]).value1, (_507[0]).value2, new Two(_508, (_507[0]).value3, (_507[0]).value4, (_507[0]).value5.value0), (_507[0]).value5.value1, (_507[0]).value5.value2, new Two((_507[0]).value5.value3, (_507[0]).value5.value4, (_507[0]).value5.value5, (_507[0]).value5.value6)));
                            };
                        };
                        if (_507.length > 0) {
                            var _1996 = _507.slice(1);
                            if (_507[0] instanceof ThreeRight && (_507[0]).value3 instanceof Three) {
                                return fromZipper(__dict_Ord_418)(_1996)(new Three((_507[0]).value0, (_507[0]).value1, (_507[0]).value2, new Two((_507[0]).value3.value0, (_507[0]).value3.value1, (_507[0]).value3.value2, (_507[0]).value3.value3), (_507[0]).value3.value4, (_507[0]).value3.value5, new Two((_507[0]).value3.value6, (_507[0]).value4, (_507[0]).value5, _508)));
                            };
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        var removeMaxNode = function (__copy___dict_Ord_419) {
            return function (__copy__510) {
                return function (__copy__511) {
                    var __dict_Ord_419 = __copy___dict_Ord_419;
                    var _510 = __copy__510;
                    var _511 = __copy__511;
                    tco: while (true) {
                        if (_511 instanceof Two && _511.value0 instanceof Leaf && _511.value3 instanceof Leaf) {
                            return up(__dict_Ord_419)(_510)(Leaf.value);
                        };
                        if (_511 instanceof Two) {
                            var __tco___dict_Ord_419 = __dict_Ord_419;
                            var __tco__510 = Prelude[":"](new TwoRight(_511.value0, _511.value1, _511.value2))(_510);
                            var __tco__511 = _511.value3;
                            __dict_Ord_419 = __tco___dict_Ord_419;
                            _510 = __tco__510;
                            _511 = __tco__511;
                            continue tco;
                        };
                        if (_511 instanceof Three && _511.value0 instanceof Leaf && _511.value3 instanceof Leaf && _511.value6 instanceof Leaf) {
                            return up(__dict_Ord_419)(Prelude[":"](new TwoRight(Leaf.value, _511.value1, _511.value2))(_510))(Leaf.value);
                        };
                        if (_511 instanceof Three) {
                            var __tco___dict_Ord_419 = __dict_Ord_419;
                            var __tco__510 = Prelude[":"](new ThreeRight(_511.value0, _511.value1, _511.value2, _511.value3, _511.value4, _511.value5))(_510);
                            var __tco__511 = _511.value6;
                            __dict_Ord_419 = __tco___dict_Ord_419;
                            _510 = __tco__510;
                            _511 = __tco__511;
                            continue tco;
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        var maxNode = function (__copy___dict_Ord_420) {
            return function (__copy__509) {
                var __dict_Ord_420 = __copy___dict_Ord_420;
                var _509 = __copy__509;
                tco: while (true) {
                    if (_509 instanceof Two && _509.value3 instanceof Leaf) {
                        return {
                            key: _509.value1, 
                            value: _509.value2
                        };
                    };
                    if (_509 instanceof Two) {
                        var __tco___dict_Ord_420 = __dict_Ord_420;
                        var __tco__509 = _509.value3;
                        __dict_Ord_420 = __tco___dict_Ord_420;
                        _509 = __tco__509;
                        continue tco;
                    };
                    if (_509 instanceof Three && _509.value6 instanceof Leaf) {
                        return {
                            key: _509.value4, 
                            value: _509.value5
                        };
                    };
                    if (_509 instanceof Three) {
                        var __tco___dict_Ord_420 = __dict_Ord_420;
                        var __tco__509 = _509.value6;
                        __dict_Ord_420 = __tco___dict_Ord_420;
                        _509 = __tco__509;
                        continue tco;
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
        var down = function (__copy___dict_Ord_421) {
            return function (__copy__504) {
                return function (__copy__505) {
                    return function (__copy__506) {
                        var __dict_Ord_421 = __copy___dict_Ord_421;
                        var _504 = __copy__504;
                        var _505 = __copy__505;
                        var _506 = __copy__506;
                        tco: while (true) {
                            if (_506 instanceof Leaf) {
                                return fromZipper(__dict_Ord_421)(_504)(Leaf.value);
                            };
                            if (_506 instanceof Two && _506.value0 instanceof Leaf && _506.value3 instanceof Leaf && Prelude["=="](__dict_Ord_421["__superclass_Prelude.Eq_0"]({}))(_505)(_506.value1)) {
                                return up(__dict_Ord_421)(_504)(Leaf.value);
                            };
                            if (_506 instanceof Two && Prelude["=="](__dict_Ord_421["__superclass_Prelude.Eq_0"]({}))(_505)(_506.value1)) {
                                var max = maxNode(__dict_Ord_421)(_506.value0);
                                return removeMaxNode(__dict_Ord_421)(Prelude[":"](new TwoLeft(max.key, max.value, _506.value3))(_504))(_506.value0);
                            };
                            if (_506 instanceof Two && Prelude["<"](__dict_Ord_421)(_505)(_506.value1)) {
                                var __tco___dict_Ord_421 = __dict_Ord_421;
                                var __tco__504 = Prelude[":"](new TwoLeft(_506.value1, _506.value2, _506.value3))(_504);
                                var __tco__505 = _505;
                                var __tco__506 = _506.value0;
                                __dict_Ord_421 = __tco___dict_Ord_421;
                                _504 = __tco__504;
                                _505 = __tco__505;
                                _506 = __tco__506;
                                continue tco;
                            };
                            if (_506 instanceof Two) {
                                var __tco___dict_Ord_421 = __dict_Ord_421;
                                var __tco__504 = Prelude[":"](new TwoRight(_506.value0, _506.value1, _506.value2))(_504);
                                var __tco__505 = _505;
                                var __tco__506 = _506.value3;
                                __dict_Ord_421 = __tco___dict_Ord_421;
                                _504 = __tco__504;
                                _505 = __tco__505;
                                _506 = __tco__506;
                                continue tco;
                            };
                            if (_506 instanceof Three && _506.value0 instanceof Leaf && _506.value3 instanceof Leaf && _506.value6 instanceof Leaf && Prelude["=="](__dict_Ord_421["__superclass_Prelude.Eq_0"]({}))(_505)(_506.value1)) {
                                return fromZipper(__dict_Ord_421)(_504)(new Two(Leaf.value, _506.value4, _506.value5, Leaf.value));
                            };
                            if (_506 instanceof Three && _506.value0 instanceof Leaf && _506.value3 instanceof Leaf && _506.value6 instanceof Leaf && Prelude["=="](__dict_Ord_421["__superclass_Prelude.Eq_0"]({}))(_505)(_506.value4)) {
                                return fromZipper(__dict_Ord_421)(_504)(new Two(Leaf.value, _506.value1, _506.value2, Leaf.value));
                            };
                            if (_506 instanceof Three && Prelude["=="](__dict_Ord_421["__superclass_Prelude.Eq_0"]({}))(_505)(_506.value1)) {
                                var max = maxNode(__dict_Ord_421)(_506.value0);
                                return removeMaxNode(__dict_Ord_421)(Prelude[":"](new ThreeLeft(max.key, max.value, _506.value3, _506.value4, _506.value5, _506.value6))(_504))(_506.value0);
                            };
                            if (_506 instanceof Three && Prelude["=="](__dict_Ord_421["__superclass_Prelude.Eq_0"]({}))(_505)(_506.value4)) {
                                var max = maxNode(__dict_Ord_421)(_506.value3);
                                return removeMaxNode(__dict_Ord_421)(Prelude[":"](new ThreeMiddle(_506.value0, _506.value1, _506.value2, max.key, max.value, _506.value6))(_504))(_506.value3);
                            };
                            if (_506 instanceof Three && Prelude["<"](__dict_Ord_421)(_505)(_506.value1)) {
                                var __tco___dict_Ord_421 = __dict_Ord_421;
                                var __tco__504 = Prelude[":"](new ThreeLeft(_506.value1, _506.value2, _506.value3, _506.value4, _506.value5, _506.value6))(_504);
                                var __tco__505 = _505;
                                var __tco__506 = _506.value0;
                                __dict_Ord_421 = __tco___dict_Ord_421;
                                _504 = __tco__504;
                                _505 = __tco__505;
                                _506 = __tco__506;
                                continue tco;
                            };
                            if (_506 instanceof Three && Prelude["<"](__dict_Ord_421)(_506.value1)(_505) && Prelude["<"](__dict_Ord_421)(_505)(_506.value4)) {
                                var __tco___dict_Ord_421 = __dict_Ord_421;
                                var __tco__504 = Prelude[":"](new ThreeMiddle(_506.value0, _506.value1, _506.value2, _506.value4, _506.value5, _506.value6))(_504);
                                var __tco__505 = _505;
                                var __tco__506 = _506.value3;
                                __dict_Ord_421 = __tco___dict_Ord_421;
                                _504 = __tco__504;
                                _505 = __tco__505;
                                _506 = __tco__506;
                                continue tco;
                            };
                            if (_506 instanceof Three) {
                                var __tco___dict_Ord_421 = __dict_Ord_421;
                                var __tco__504 = Prelude[":"](new ThreeRight(_506.value0, _506.value1, _506.value2, _506.value3, _506.value4, _506.value5))(_504);
                                var __tco__505 = _505;
                                var __tco__506 = _506.value6;
                                __dict_Ord_421 = __tco___dict_Ord_421;
                                _504 = __tco__504;
                                _505 = __tco__505;
                                _506 = __tco__506;
                                continue tco;
                            };
                            throw new Error("Failed pattern match");
                        };
                    };
                };
            };
        };
        return down(__dict_Ord_417)([  ]);
    };
    var checkValid = function (tree) {
        var allHeights = function (_497) {
            if (_497 instanceof Leaf) {
                return [ 0 ];
            };
            if (_497 instanceof Two) {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_497.value0))(allHeights(_497.value3)));
            };
            if (_497 instanceof Three) {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_497.value0))(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_497.value3))(allHeights(_497.value6))));
            };
            throw new Error("Failed pattern match");
        };
        return Data_Array.length(Data_Array.nub(Prelude.eqNumber({}))(allHeights(tree))) === 1;
    };
    var alter = function (__dict_Ord_422) {
        return function (f) {
            return function (k) {
                return function (m) {
                    var _2137 = f(lookup(__dict_Ord_422)(k)(m));
                    if (_2137 instanceof Data_Maybe.Nothing) {
                        return $$delete(__dict_Ord_422)(k)(m);
                    };
                    if (_2137 instanceof Data_Maybe.Just) {
                        return insert(__dict_Ord_422)(k)(_2137.value0)(m);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    var update = function (__dict_Ord_423) {
        return function (f) {
            return function (k) {
                return function (m) {
                    return alter(__dict_Ord_423)(Data_Maybe.maybe(Data_Maybe.Nothing.value)(f))(k)(m);
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
PS.Data_Monoid_Last = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Monoid = PS.Data_Monoid;
    var Last = {
        create: function (value) {
            return value;
        }
    };
    var showLast = function (__dict_Show_424) {
        return new Prelude.Show(function (_519) {
            return "Last (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_424))(_519) + ")";
        });
    };
    var semigroupLast = function (__unused) {
        return new Prelude.Semigroup(function (_520) {
            return function (_521) {
                if (_521 instanceof Data_Maybe.Just) {
                    return _521;
                };
                if (_521 instanceof Data_Maybe.Nothing) {
                    return _520;
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var runLast = function (_512) {
        return _512;
    };
    var monoidLast = function (__unused) {
        return new Data_Monoid.Monoid(semigroupLast, Data_Maybe.Nothing.value);
    };
    var eqLast = function (__dict_Eq_426) {
        return new Prelude.Eq(function (_515) {
            return function (_516) {
                return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_426))(_515)(_516);
            };
        }, function (_513) {
            return function (_514) {
                return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_426))(_513)(_514);
            };
        });
    };
    var ordLast = function (__dict_Ord_425) {
        return new Prelude.Ord(function (__unused) {
            return eqLast(__dict_Ord_425["__superclass_Prelude.Eq_0"]({}));
        }, function (_517) {
            return function (_518) {
                return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_425))(_517)(_518);
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
    var union = function (__dict_Ord_427) {
        return function (_531) {
            return function (_532) {
                return new Set(Data_Map.union(__dict_Ord_427)(_531.value0)(_532.value0));
            };
        };
    };
    var toList = function (_530) {
        return Data_Array.map(Data_Tuple.fst)(Data_Map.toList(_530.value0));
    };
    var singleton = function (a) {
        return new Set(Data_Map.singleton(a)(Prelude.unit));
    };
    var showSet = function (__dict_Show_428) {
        return new Prelude.Show(function (s) {
            return "fromList " + Prelude.show(Prelude.showArray(__dict_Show_428))(toList(s));
        });
    };
    var member = function (__dict_Ord_429) {
        return function (_524) {
            return function (_525) {
                return Data_Map.member(__dict_Ord_429)(_524)(_525.value0);
            };
        };
    };
    var isEmpty = function (_522) {
        return Data_Map.isEmpty(_522.value0);
    };
    var insert = function (__dict_Ord_430) {
        return function (_526) {
            return function (_527) {
                return new Set(Data_Map.insert(__dict_Ord_430)(_526)(Prelude.unit)(_527.value0));
            };
        };
    };
    var eqSet = function (__dict_Eq_431) {
        return new Prelude.Eq(function (_535) {
            return function (_536) {
                return Prelude["/="](Data_Map.eqMap(__dict_Eq_431)(Prelude.eqUnit({})))(_535.value0)(_536.value0);
            };
        }, function (_533) {
            return function (_534) {
                return Prelude["=="](Data_Map.eqMap(__dict_Eq_431)(Prelude.eqUnit({})))(_533.value0)(_534.value0);
            };
        });
    };
    var empty = new Set(Data_Map.empty);
    var fromList = function (__dict_Ord_432) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
            return function (a) {
                return insert(__dict_Ord_432)(a)(m);
            };
        })(empty);
    };
    var unions = function (__dict_Ord_433) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(union(__dict_Ord_433))(empty);
    };
    var $$delete = function (__dict_Ord_434) {
        return function (_528) {
            return function (_529) {
                return new Set(Data_Map["delete"](__dict_Ord_434)(_528)(_529.value0));
            };
        };
    };
    var checkValid = function (_523) {
        return Data_Map.checkValid(_523.value0);
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
    var traversableTuple = function (__unused) {
        return new Traversable(function (__unused) {
            return Data_Foldable.foldableTuple({});
        }, function (__unused) {
            return Data_Tuple.functorTuple({});
        }, function (__dict_Applicative_436) {
            return function (_551) {
                return Prelude["<$>"]((__dict_Applicative_436["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.Tuple.create(_551.value0))(_551.value1);
            };
        }, function (__dict_Applicative_435) {
            return function (_549) {
                return function (_550) {
                    return Prelude["<$>"]((__dict_Applicative_435["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.Tuple.create(_550.value0))(_549(_550.value1));
                };
            };
        });
    };
    var traversableRef = function (__unused) {
        return new Traversable(function (__unused) {
            return Data_Foldable.foldableRef({});
        }, function (__unused) {
            return Data_Eq.functorRef({});
        }, function (__dict_Applicative_438) {
            return function (_545) {
                return Prelude["<$>"]((__dict_Applicative_438["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Eq.Ref.create)(_545);
            };
        }, function (__dict_Applicative_437) {
            return function (_543) {
                return function (_544) {
                    return Prelude["<$>"]((__dict_Applicative_437["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Eq.Ref.create)(_543(_544));
                };
            };
        });
    };
    var traversableMaybe = function (__unused) {
        return new Traversable(function (__unused) {
            return Data_Foldable.foldableMaybe({});
        }, function (__unused) {
            return Data_Maybe.functorMaybe({});
        }, function (__dict_Applicative_440) {
            return function (_548) {
                if (_548 instanceof Data_Maybe.Nothing) {
                    return Prelude.pure(__dict_Applicative_440)(Data_Maybe.Nothing.value);
                };
                if (_548 instanceof Data_Maybe.Just) {
                    return Prelude["<$>"]((__dict_Applicative_440["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Maybe.Just.create)(_548.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_439) {
            return function (_546) {
                return function (_547) {
                    if (_547 instanceof Data_Maybe.Nothing) {
                        return Prelude.pure(__dict_Applicative_439)(Data_Maybe.Nothing.value);
                    };
                    if (_547 instanceof Data_Maybe.Just) {
                        return Prelude["<$>"]((__dict_Applicative_439["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Maybe.Just.create)(_546(_547.value0));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var traversableEither = function (__unused) {
        return new Traversable(function (__unused) {
            return Data_Foldable.foldableEither({});
        }, function (__unused) {
            return Data_Either.functorEither({});
        }, function (__dict_Applicative_442) {
            return function (_542) {
                if (_542 instanceof Data_Either.Left) {
                    return Prelude.pure(__dict_Applicative_442)(new Data_Either.Left(_542.value0));
                };
                if (_542 instanceof Data_Either.Right) {
                    return Prelude["<$>"]((__dict_Applicative_442["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Right.create)(_542.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_441) {
            return function (_540) {
                return function (_541) {
                    if (_541 instanceof Data_Either.Left) {
                        return Prelude.pure(__dict_Applicative_441)(new Data_Either.Left(_541.value0));
                    };
                    if (_541 instanceof Data_Either.Right) {
                        return Prelude["<$>"]((__dict_Applicative_441["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Right.create)(_540(_541.value0));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var sequence = function (dict) {
        return dict.sequence;
    };
    var traversableArray = function (__unused) {
        return new Traversable(function (__unused) {
            return Data_Foldable.foldableArray({});
        }, function (__unused) {
            return Data_Array.functorArray({});
        }, function (__dict_Applicative_444) {
            return function (_539) {
                if (_539.length === 0) {
                    return Prelude.pure(__dict_Applicative_444)([  ]);
                };
                if (_539.length > 0) {
                    var _2201 = _539.slice(1);
                    return Prelude["<*>"](__dict_Applicative_444["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_444["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"])(_539[0]))(sequence(traversableArray({}))(__dict_Applicative_444)(_2201));
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_443) {
            return function (_537) {
                return function (_538) {
                    if (_538.length === 0) {
                        return Prelude.pure(__dict_Applicative_443)([  ]);
                    };
                    if (_538.length > 0) {
                        var _2205 = _538.slice(1);
                        return Prelude["<*>"](__dict_Applicative_443["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_443["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"])(_537(_538[0])))(traverse(traversableArray({}))(__dict_Applicative_443)(_537)(_2205));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var zipWithA = function (__dict_Applicative_445) {
        return function (f) {
            return function (xs) {
                return function (ys) {
                    return sequence(traversableArray({}))(__dict_Applicative_445)(Data_Array.zipWith(f)(xs)(ys));
                };
            };
        };
    };
    var $$for = function (__dict_Applicative_446) {
        return function (__dict_Traversable_447) {
            return function (x) {
                return function (f) {
                    return traverse(__dict_Traversable_447)(__dict_Applicative_446)(f)(x);
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
    var runIndexing = function (_552) {
        return _552.value0;
    };
    var indexed = function (dict) {
        return dict.indexed;
    };
    var foldableIdentity = function (__unused) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_450) {
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
    var traversableIdentity = function (__unused) {
        return new Data_Traversable.Traversable(foldableIdentity, function (__unused) {
            return Control_Monad_Identity.functorIdentity({});
        }, function (__dict_Applicative_449) {
            return function (_559) {
                return Prelude["<$>"]((__dict_Applicative_449["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_559);
            };
        }, function (__dict_Applicative_448) {
            return function (_557) {
                return function (_558) {
                    return Prelude["<$>"]((__dict_Applicative_448["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_557(_558));
                };
            };
        });
    };
    var distrib = function (dict) {
        return dict.distrib;
    };
    var conjoinedArr = function (__unused) {
        return new Conjoined(function (__unused) {
            return Control_Arrow_ArrowApply.arrowApplyArr({});
        }, function (__unused) {
            return Control_Arrow_ArrowChoice.arrowChoiceArr({});
        }, function (__unused) {
            return Control_Comonad.extendComonad({});
        }, function (__unused) {
            return Data_Distributive.distributiveIdentity({});
        }, function (__unused) {
            return Data_Profunctor_Choice.choiceArr({});
        }, function (__unused) {
            return Data_Profunctor_Rep.corepresentableArrIdentity({});
        }, function (__unused) {
            return Data_Profunctor_Rep.representableArrIdentity({});
        }, function (__unused) {
            return Data_Profunctor_Strong.strongArr({});
        }, traversableIdentity, function (__unused) {
            return Control_Monad_Identity.monadIdentity({});
        }, function (_553) {
            return function (_554) {
                return _553;
            };
        }, function (__dict_Functor_451) {
            return Prelude["<$>"](__dict_Functor_451);
        });
    };
    var indexableArr = function (__unused) {
        return new Indexable(conjoinedArr, function (_555) {
            return function (_556) {
                return _555;
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
    var foldableIdentity = function (__unused) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_456) {
            return function (_567) {
                return function (_568) {
                    return _567(_568);
                };
            };
        }, function (_564) {
            return function (_565) {
                return function (_566) {
                    return _564(_565)(_566);
                };
            };
        }, function (_561) {
            return function (_562) {
                return function (_563) {
                    return _561(_563)(_562);
                };
            };
        });
    };
    var traversableIdentity = function (__unused) {
        return new Data_Traversable.Traversable(foldableIdentity, function (__unused) {
            return Control_Monad_Identity.functorIdentity({});
        }, function (__dict_Applicative_453) {
            return function (_571) {
                return Prelude["<$>"]((__dict_Applicative_453["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_571);
            };
        }, function (__dict_Applicative_452) {
            return function (_569) {
                return function (_570) {
                    return Prelude["<$>"]((__dict_Applicative_452["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_569(_570));
                };
            };
        });
    };
    var settableIdentity = function (__unused) {
        return new Settable(function (__unused) {
            return Data_Distributive.distributiveIdentity({});
        }, traversableIdentity, function (__unused) {
            return Control_Monad_Identity.applicativeIdentity({});
        }, function (__dict_Profunctor_455) {
            return Data_Profunctor.rmap(__dict_Profunctor_455)(Control_Monad_Identity.Identity.create);
        }, function (_560) {
            return _560;
        }, function (__dict_Profunctor_454) {
            return Data_Profunctor.rmap(__dict_Profunctor_454)(Control_Monad_Identity.runIdentity);
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
PS.Control_Lens_Type = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    return {};
})();
var PS = PS || {};
PS.Control_Lens_Getter = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Const = PS.Data_Const;
    var Control_Monad_Reader_Class = PS.Control_Monad_Reader_Class;
    var Data_Profunctor = PS.Data_Profunctor;
    var Control_Monad_State_Class = PS.Control_Monad_State_Class;
    var Data_Contravariant = PS.Data_Contravariant;
    var Void = {
        create: function (value) {
            return value;
        }
    };
    var $up$dot = function (s) {
        return function (asa) {
            return Data_Const.getConst(asa(Data_Const.Const.create)(s));
        };
    };
    var view = function (__dict_Monad_457) {
        return function (__dict_MonadReader_458) {
            return function (ara) {
                return Control_Monad_Reader_Class.reader(__dict_Monad_457)(__dict_MonadReader_458)(Data_Profunctor.rmap(Data_Profunctor.profunctorArr({}))(Data_Const.getConst)(ara(Data_Const.Const.create)));
            };
        };
    };
    var use = function (__dict_Monad_459) {
        return function (__dict_MonadState_460) {
            return function (asa) {
                return Control_Monad_State_Class.gets(__dict_Monad_459)(__dict_MonadState_460)(Data_Profunctor.rmap(Data_Profunctor.profunctorArr({}))(Data_Const.getConst)(asa(Data_Const.Const.create)));
            };
        };
    };
    var absurd = function (a) {
        var spin = function (__copy__572) {
            var _572 = __copy__572;
            tco: while (true) {
                var __tco__572 = _572;
                _572 = __tco__572;
                continue tco;
            };
        };
        return spin(a);
    };
    var coerce = function (__dict_Contravariant_461) {
        return function (__dict_Functor_462) {
            return function (a) {
                return Prelude["<$>"](__dict_Functor_462)(absurd)(Data_Contravariant[">$<"](__dict_Contravariant_461)(absurd)(a));
            };
        };
    };
    var to = function (__dict_Conjoined_463) {
        return function (__dict_Contravariant_464) {
            return function (__dict_Functor_465) {
                return function (__dict_Profunctor_466) {
                    return function (s2a) {
                        return Data_Profunctor.dimap(__dict_Profunctor_466)(s2a)(coerce(__dict_Contravariant_464)(__dict_Functor_465));
                    };
                };
            };
        };
    };
    return {
        view: view, 
        use: use, 
        to: to, 
        "^.": $up$dot
    };
})();
var PS = PS || {};
PS.Control_Lens_Fold = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Const = PS.Data_Const;
    var Data_Profunctor = PS.Data_Profunctor;
    var Data_Monoid_Dual = PS.Data_Monoid_Dual;
    var Data_Monoid_Endo = PS.Data_Monoid_Endo;
    var Data_Monoid_First = PS.Data_Monoid_First;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var Data_Profunctor_Choice = PS.Data_Profunctor_Choice;
    var foldOf = function (asa) {
        return function (s) {
            return Data_Const.getConst(asa(Data_Const.Const.create)(s));
        };
    };
    var foldMapOf = function (__dict_Profunctor_467) {
        return function (prsa) {
            return function (par) {
                return Data_Profunctor.rmap(Data_Profunctor.profunctorArr({}))(Data_Const.getConst)(prsa(Data_Profunctor.rmap(__dict_Profunctor_467)(Data_Const.Const.create)(par)));
            };
        };
    };
    var foldlOf = function (pErsa) {
        return function (par2r) {
            return function (r) {
                return Data_Profunctor.rmap(Data_Profunctor.profunctorArr({}))(Data_Profunctor.lmap(Data_Profunctor.profunctorArr({}))(Data_Monoid_Dual.runDual)(Prelude.flip(Data_Monoid_Endo.runEndo)(r)))(foldMapOf(Data_Profunctor.profunctorArr({}))(pErsa)(Data_Profunctor.rmap(Data_Profunctor.profunctorArr({}))(Data_Profunctor.rmap(Data_Profunctor.profunctorArr({}))(Data_Monoid_Dual.Dual.create)(Data_Monoid_Endo.Endo.create))(Prelude.flip(par2r))));
            };
        };
    };
    var foldrOf = function (__dict_Profunctor_468) {
        return function (pErsa) {
            return function (par2r) {
                return function (r) {
                    return Data_Profunctor.rmap(Data_Profunctor.profunctorArr({}))(Prelude.flip(Data_Monoid_Endo.runEndo)(r))(foldMapOf(__dict_Profunctor_468)(pErsa)(Data_Profunctor.rmap(__dict_Profunctor_468)(Data_Monoid_Endo.Endo.create)(par2r)));
                };
            };
        };
    };
    var toListOf = function (easa) {
        return foldrOf(Data_Profunctor.profunctorArr({}))(easa)(Prelude[":"])([  ]);
    };
    var $up$dot$dot = Prelude.flip(toListOf);
    var $up$qmark = function (s) {
        return function (fasa) {
            return Data_Monoid_First.runFirst(foldMapOf(Data_Profunctor.profunctorArr({}))(fasa)(Data_Profunctor.rmap(Data_Profunctor.profunctorArr({}))(Data_Monoid_First.First.create)(Data_Maybe.Just.create))(s));
        };
    };
    var filtered = function (__dict_Applicative_469) {
        return function (__dict_Choice_470) {
            return function (p) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Profunctor.dimap(__dict_Choice_470["__superclass_Data.Profunctor.Profunctor_0"]({}))(function (x) {
                    return p(x) ? new Data_Either.Right(x) : new Data_Either.Left(x);
                })(Data_Either.either(Prelude.pure(__dict_Applicative_469))(Prelude.id(Prelude.categoryArr({})))))(Data_Profunctor_Choice["right'"](__dict_Choice_470));
            };
        };
    };
    return {
        toListOf: toListOf, 
        foldrOf: foldrOf, 
        foldOf: foldOf, 
        foldMapOf: foldMapOf, 
        foldlOf: foldlOf, 
        filtered: filtered, 
        "^?": $up$qmark, 
        "^..": $up$dot$dot
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
    var Control_Monad_State = PS.Control_Monad_State;
    var $qmark$qmark = function (__dict_Functor_471) {
        return function (ff) {
            return function (x) {
                return Prelude["<$>"](__dict_Functor_471)(function (f) {
                    return f(x);
                })(ff);
            };
        };
    };
    var $less$hash$greater = function (__dict_Functor_472) {
        return function (x) {
            return function (f) {
                return Prelude["<$>"](__dict_Functor_472)(f)(x);
            };
        };
    };
    var $hash$tilde = function (s) {
        return function (sa) {
            return Control_Monad_State.execState(sa)(s);
        };
    };
    var lens = function (s2a) {
        return function (s2b2t) {
            return function (__dict_Functor_473) {
                return function (a2fb) {
                    return function (s) {
                        return Prelude["<$>"](__dict_Functor_473)(s2b2t(s))(a2fb(s2a(s)));
                    };
                };
            };
        };
    };
    return {
        lens: lens, 
        "??": $qmark$qmark, 
        "<#>": $less$hash$greater, 
        "#~": $hash$tilde
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
            var _2228 = stab(new Control_Lens_Internal_Prism.Market(Control_Monad_Identity.Identity.create, Data_Either.Right.create));
            return f(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(_2228.value0))(Prelude[">>>"](Prelude.semigroupoidArr({}))(_2228.value1)(Data_Either.either(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(Data_Either.Left.create))(Data_Either.Right.create)));
        };
    };
    var prism = function (__dict_Applicative_474) {
        return function (__dict_Choice_475) {
            return function (b2t) {
                return function (s2Eta) {
                    return function (pafb) {
                        return Data_Profunctor.dimap(__dict_Choice_475["__superclass_Data.Profunctor.Profunctor_0"]({}))(s2Eta)(Data_Either.either(Prelude.pure(__dict_Applicative_474))(Prelude["<$>"]((__dict_Applicative_474["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(b2t)))(Data_Profunctor_Choice["right'"](__dict_Choice_475)(pafb));
                    };
                };
            };
        };
    };
    var prism$prime = function (b2s) {
        return function (s2Ma) {
            return function (__dict_Applicative_476) {
                return function (__dict_Choice_477) {
                    return prism(__dict_Applicative_476)(__dict_Choice_477)(b2s)(function (s) {
                        return Data_Maybe.maybe(new Data_Either.Left(s))(Data_Either.Right.create)(s2Ma(s));
                    });
                };
            };
        };
    };
    var clonePrism = function (__dict_Applicative_478) {
        return function (__dict_Choice_479) {
            return function (stab) {
                return withPrism(stab)(prism(__dict_Applicative_478)(__dict_Choice_479));
            };
        };
    };
    var _Right = function (__dict_Applicative_480) {
        return function (__dict_Choice_481) {
            return prism(__dict_Applicative_480)(__dict_Choice_481)(Data_Either.Right.create)(Data_Either.either(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Either.Left.create)(Data_Either.Left.create))(Data_Either.Right.create));
        };
    };
    var _Nothing = function (__dict_Applicative_482) {
        return function (__dict_Choice_483) {
            return prism$prime(Prelude["const"](Data_Maybe.Nothing.value))(Data_Maybe.maybe(Data_Maybe.Nothing.value)(Prelude["const"](new Data_Maybe.Just(Prelude.unit))))(__dict_Applicative_482)(__dict_Choice_483);
        };
    };
    var _Left = function (__dict_Applicative_484) {
        return function (__dict_Choice_485) {
            return prism(__dict_Applicative_484)(__dict_Choice_485)(Data_Either.Left.create)(Data_Either.either(Data_Either.Right.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Either.Left.create)(Data_Either.Right.create)));
        };
    };
    var _Just = function (__dict_Applicative_486) {
        return function (__dict_Choice_487) {
            return prism(__dict_Applicative_486)(__dict_Choice_487)(Data_Maybe.Just.create)(Data_Maybe.maybe(new Data_Either.Left(Data_Maybe.Nothing.value))(Data_Either.Right.create));
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
            var _2231 = stab(new Control_Lens_Internal_Iso.Exchange(Prelude.id(Prelude.categoryArr({})), Control_Monad_Identity.Identity.create));
            return f(_2231.value0)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(_2231.value1));
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
    var iso = function (__dict_Profunctor_488) {
        return function (__dict_Functor_489) {
            return function (s2a) {
                return function (b2t) {
                    return Data_Profunctor.dimap(__dict_Profunctor_488)(s2a)(Prelude["<$>"](__dict_Functor_489)(b2t));
                };
            };
        };
    };
    var mapping = function (__dict_Functor_490) {
        return function (__dict_Functor_491) {
            return function (__dict_Profunctor_492) {
                return function (stab) {
                    return withIso(stab)(function (s2a) {
                        return function (b2t) {
                            return iso(__dict_Profunctor_492)(__dict_Functor_490)(Prelude["<$>"](__dict_Functor_490)(s2a))(Prelude["<$>"](__dict_Functor_491)(b2t));
                        };
                    });
                };
            };
        };
    };
    var from = function (__dict_Profunctor_493) {
        return function (__dict_Functor_494) {
            return function (stab) {
                return withIso(stab)(function (s2a) {
                    return function (b2t) {
                        return iso(__dict_Profunctor_493)(__dict_Functor_494)(b2t)(s2a);
                    };
                });
            };
        };
    };
    var $$enum = function (__dict_Enum_495) {
        return function (__dict_Monoid_496) {
            return function (__dict_Functor_497) {
                return function (__dict_Profunctor_498) {
                    return iso(__dict_Profunctor_498)(__dict_Functor_497)(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Enum.toEnum(__dict_Enum_495))(Data_Maybe.maybe(Data_Monoid.mempty(__dict_Monoid_496))(Prelude.id(Prelude.categoryArr({})))))(Data_Enum.fromEnum(__dict_Enum_495));
                };
            };
        };
    };
    var cloneIso = function (__dict_Profunctor_499) {
        return function (__dict_Functor_500) {
            return function (stab) {
                return withIso(stab)(iso(__dict_Profunctor_499)(__dict_Functor_500));
            };
        };
    };
    var auf = function (__dict_Profunctor_501) {
        return function (stab) {
            return withIso(stab)(function (s2a) {
                return function (b2t) {
                    return function (f) {
                        return function (prs) {
                            return function (e) {
                                return b2t(f(Data_Profunctor.rmap(__dict_Profunctor_501)(s2a)(prs))(e));
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
    var sets = function (__dict_Profunctor_502) {
        return function (__dict_Profunctor_503) {
            return function (__dict_Settable_504) {
                return function (pab2qst) {
                    return Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Lens_Internal_Setter.untaintedDot(__dict_Settable_504)(__dict_Profunctor_502))(Prelude[">>>"](Prelude.semigroupoidArr({}))(pab2qst)(Control_Lens_Internal_Setter.taintedDot(__dict_Settable_504)(__dict_Profunctor_503)));
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
    var over = function (__dict_Profunctor_505) {
        return function (pstab) {
            return function (pab) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(pstab(Data_Profunctor.rmap(__dict_Profunctor_505)(Control_Monad_Identity.Identity.create)(pab)));
            };
        };
    };
    var $percent$tilde = function (__dict_Profunctor_506) {
        return over(__dict_Profunctor_506);
    };
    var $amp$amp$tilde = function (__dict_BoolLike_507) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["&&"](__dict_BoolLike_507)(a));
            };
        };
    };
    var $times$tilde = function (__dict_Num_508) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["*"](__dict_Num_508)(a));
            };
        };
    };
    var $plus$plus$tilde = function (__dict_Semigroup_509) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["++"](__dict_Semigroup_509)(a));
            };
        };
    };
    var $plus$tilde = function (__dict_Num_510) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["+"](__dict_Num_510)(a));
            };
        };
    };
    var $minus$tilde = function (__dict_Num_511) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["-"](__dict_Num_511)(a));
            };
        };
    };
    var $div$tilde = function (__dict_Num_512) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["/"](__dict_Num_512)(a));
            };
        };
    };
    var $less$greater$tilde = function (__dict_Semigroup_513) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["<>"](__dict_Semigroup_513)(a));
            };
        };
    };
    var $bar$bar$tilde = function (__dict_BoolLike_514) {
        return function (staa) {
            return function (a) {
                return over(Data_Profunctor.profunctorArr({}))(staa)(Prelude["||"](__dict_BoolLike_514)(a));
            };
        };
    };
    var mapped = function (__dict_Functor_515) {
        return function (__dict_Settable_516) {
            return sets(Data_Profunctor.profunctorArr({}))(Data_Profunctor.profunctorArr({}))(__dict_Settable_516)(Prelude["<$>"](__dict_Functor_515));
        };
    };
    var contramapped = function (__dict_Contravariant_517) {
        return function (__dict_Settable_518) {
            return sets(Data_Profunctor.profunctorArr({}))(Data_Profunctor.profunctorArr({}))(__dict_Settable_518)(Data_Contravariant[">$<"](__dict_Contravariant_517));
        };
    };
    var argument = function (__dict_Profunctor_519) {
        return function (__dict_Settable_520) {
            return sets(Data_Profunctor.profunctorArr({}))(Data_Profunctor.profunctorArr({}))(__dict_Settable_520)(Data_Profunctor.lmap(__dict_Profunctor_519));
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
PS.Control_Lens_At = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Set = PS.Data_Set;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Map = PS.Data_Map;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Data_Traversable = PS.Data_Traversable;
    function Contains(contains) {
        this.contains = contains;
    };
    function Ixed(ix) {
        this.ix = ix;
    };
    function At(__superclass_Control$dotLens$dotAt$dotIxed_0, at) {
        this["__superclass_Control.Lens.At.Ixed_0"] = __superclass_Control$dotLens$dotAt$dotIxed_0;
        this.at = at;
    };
    var ixedSetKKUnit = function (__dict_Ord_521) {
        return new Ixed(function (k) {
            return function (__dict_Applicative_522) {
                return function (u2fu) {
                    return function (setK) {
                        return Data_Set.member(__dict_Ord_521)(k)(setK) ? Prelude["<$>"]((__dict_Applicative_522["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(function (_) {
    return Data_Set.insert(__dict_Ord_521)(k)(setK);
})(u2fu(Prelude.unit)) : Prelude.pure(__dict_Applicative_522)(setK);
                    };
                };
            };
        });
    };
    var ixedMaybeUnitUnitA = function (__unused) {
        return new Ixed(function (_576) {
            return function (__dict_Applicative_523) {
                return function (_577) {
                    return function (_578) {
                        if (_578 instanceof Data_Maybe.Nothing) {
                            return Prelude.pure(__dict_Applicative_523)(Data_Maybe.Nothing.value);
                        };
                        if (_578 instanceof Data_Maybe.Just) {
                            return Prelude["<$>"]((__dict_Applicative_523["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Maybe.Just.create)(Prelude.pure(__dict_Applicative_523)(_578.value0));
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        });
    };
    var ixedMaybeAUnitA = function (__unused) {
        return new Ixed(function (_573) {
            return function (__dict_Applicative_524) {
                return function (_574) {
                    return function (_575) {
                        if (_575 instanceof Data_Maybe.Nothing) {
                            return Prelude.pure(__dict_Applicative_524)(Data_Maybe.Nothing.value);
                        };
                        if (_575 instanceof Data_Maybe.Just) {
                            return Prelude["<$>"]((__dict_Applicative_524["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Maybe.Just.create)(_574(_575.value0));
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        });
    };
    var ixedMapKVKV = function (__dict_Ord_525) {
        return new Ixed(function (k) {
            return function (__dict_Applicative_526) {
                return function (v2fv) {
                    return function (mapKV) {
                        var _2242 = Data_Map.lookup(__dict_Ord_525)(k)(mapKV);
                        if (_2242 instanceof Data_Maybe.Nothing) {
                            return Prelude.pure(__dict_Applicative_526)(mapKV);
                        };
                        if (_2242 instanceof Data_Maybe.Just) {
                            return Prelude["<$>"]((__dict_Applicative_526["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(function (v$prime) {
                                return Data_Map.insert(__dict_Ord_525)(k)(v$prime)(mapKV);
                            })(v2fv(_2242.value0));
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        });
    };
    var ixedIdentityAAA = function (__unused) {
        return new Ixed(function (_579) {
            return function (__dict_Applicative_527) {
                return function (_580) {
                    return function (_581) {
                        return Prelude["<$>"]((__dict_Applicative_527["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Control_Monad_Identity.Identity.create)(_580(_581));
                    };
                };
            };
        });
    };
    var ixedArrEAEA = function (__dict_Eq_528) {
        return new Ixed(function (e) {
            return function (__dict_Applicative_529) {
                return function (a2fa) {
                    return function (e2a) {
                        return Prelude["<$>"]((__dict_Applicative_529["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(function (a) {
                            return function (e$prime) {
                                return Prelude["=="](__dict_Eq_528)(e)(e$prime) ? a : e2a(e$prime);
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
    var ixedArrayaNumberA = function (__unused) {
        return new Ixed(function (_582) {
            return function (__dict_Applicative_530) {
                return function (_583) {
                    return function (_584) {
                        if (_582 < 0) {
                            return Prelude.pure(__dict_Applicative_530)(_584);
                        };
                        if (_584.length === 0) {
                            return Prelude.pure(__dict_Applicative_530)([  ]);
                        };
                        if (_582 === 0 && _584.length > 0) {
                            var _2251 = _584.slice(1);
                            return Prelude["<$>"]((__dict_Applicative_530["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude.flip(Prelude[":"])(_2251))(_583(_584[0]));
                        };
                        if (_584.length > 0) {
                            var _2253 = _584.slice(1);
                            return Prelude["<$>"]((__dict_Applicative_530["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"](_584[0]))(ix(ixedArrayaNumberA({}))(_582 - 1)(__dict_Applicative_530)(_583)(_2253));
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        });
    };
    var containsMapK = function (__dict_Ord_531) {
        return new Contains(function (k) {
            return function (__dict_Functor_532) {
                return function (f) {
                    return function (s) {
                        return Prelude["<$>"](__dict_Functor_532)(function (x) {
                            return x ? Data_Set.insert(__dict_Ord_531)(k)(s) : Data_Set["delete"](__dict_Ord_531)(k)(s);
                        })(f(Data_Set.member(__dict_Ord_531)(k)(s)));
                    };
                };
            };
        });
    };
    var contains = function (dict) {
        return dict.contains;
    };
    var atSetKKUnit = function (__dict_Ord_533) {
        return new At(function (__unused) {
            return ixedSetKKUnit(__dict_Ord_533);
        }, function (k) {
            return function (__dict_Functor_534) {
                return function (a2fa) {
                    return function (setK) {
                        var setK$prime = Data_Set.member(__dict_Ord_533)(k)(setK) ? new Data_Maybe.Just(Prelude.unit) : Data_Maybe.Nothing.value;
                        var go = function (_586) {
                            if (_586 instanceof Data_Maybe.Nothing) {
                                return Data_Maybe.maybe(setK)(Prelude["const"](Data_Set["delete"](__dict_Ord_533)(k)(setK)))(setK$prime);
                            };
                            if (_586 instanceof Data_Maybe.Just) {
                                return Data_Set.insert(__dict_Ord_533)(k)(setK);
                            };
                            throw new Error("Failed pattern match");
                        };
                        return Prelude["<$>"](__dict_Functor_534)(go)(a2fa(setK$prime));
                    };
                };
            };
        });
    };
    var atMaybe = function (__unused) {
        return new At(ixedMaybeUnitUnitA, function (_) {
            return function (__dict_Functor_535) {
                return function (a2fa) {
                    return a2fa;
                };
            };
        });
    };
    var atMapKVKV = function (__dict_Ord_536) {
        return new At(function (__unused) {
            return ixedMapKVKV(__dict_Ord_536);
        }, function (k) {
            return function (__dict_Functor_537) {
                return function (a2fa) {
                    return function (mapKV) {
                        var mapKV$prime = Data_Map.lookup(__dict_Ord_536)(k)(mapKV);
                        var go = function (_585) {
                            if (_585 instanceof Data_Maybe.Nothing) {
                                return Data_Maybe.maybe(mapKV)(Prelude["const"](Data_Map["delete"](__dict_Ord_536)(k)(mapKV)))(mapKV$prime);
                            };
                            if (_585 instanceof Data_Maybe.Just) {
                                return Data_Map.insert(__dict_Ord_536)(k)(_585.value0)(mapKV);
                            };
                            throw new Error("Failed pattern match");
                        };
                        return Prelude["<$>"](__dict_Functor_537)(go)(a2fa(mapKV$prime));
                    };
                };
            };
        });
    };
    var at = function (dict) {
        return dict.at;
    };
    var ixAt = function (__dict_At_538) {
        return function (i) {
            return function (__dict_Applicative_539) {
                return Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Traversable.traverse(Data_Traversable.traversableMaybe({}))(__dict_Applicative_539))(at(__dict_At_538)(i)((__dict_Applicative_539["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({})));
            };
        };
    };
    return {
        Ixed: Ixed, 
        At: At, 
        ix: ix, 
        at: at, 
        ixedArrEAEA: ixedArrEAEA, 
        ixedMaybeAUnitA: ixedMaybeAUnitA, 
        ixedMaybeUnitUnitA: ixedMaybeUnitUnitA, 
        ixedIdentityAAA: ixedIdentityAAA, 
        ixedArrayaNumberA: ixedArrayaNumberA, 
        ixedMapKVKV: ixedMapKVKV, 
        ixedSetKKUnit: ixedSetKKUnit, 
        atMaybe: atMaybe, 
        atMapKVKV: atMapKVKV, 
        atSetKKUnit: atSetKKUnit
    };
})();
var PS = PS || {};
PS.Control_Lens_Tuple = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var $tilde = Data_Tuple.Tuple.create;
    var _2 = function (__dict_Functor_540) {
        return function (_589) {
            return function (_590) {
                return Prelude["<$>"](__dict_Functor_540)(Data_Tuple.Tuple.create(_590.value0))(_589(_590.value1));
            };
        };
    };
    var _1 = function (__dict_Functor_541) {
        return function (_587) {
            return function (_588) {
                return Prelude["<$>"](__dict_Functor_541)(function (b) {
                    return new Data_Tuple.Tuple(b, _588.value1);
                })(_587(_588.value0));
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
PS.Control_Lens_Traversal = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Bitraversable = PS.Data_Bitraversable;
    var traverseOf = Prelude.id(Prelude.categoryArr({}));
    var sequenceOf = function (l) {
        return l(Prelude.id(Prelude.categoryArr({})));
    };
    var forOf = Prelude.flip;
    var both = function (__dict_Bitraversable_542) {
        return function (__dict_Applicative_543) {
            return function (f) {
                return Data_Bitraversable.bitraverse(__dict_Bitraversable_542)(__dict_Applicative_543)(f)(f);
            };
        };
    };
    return {
        traverseOf: traverseOf, 
        sequenceOf: sequenceOf, 
        forOf: forOf, 
        both: both
    };
})();
var PS = PS || {};
PS.Control_Lens = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens_Tuple = PS.Control_Lens_Tuple;
    var Control_Lens_Setter = PS.Control_Lens_Setter;
    var Control_Lens_Fold = PS.Control_Lens_Fold;
    var Control_Lens_Getter = PS.Control_Lens_Getter;
    var Control_Lens_Lens = PS.Control_Lens_Lens;
    var Control_Lens_Prism = PS.Control_Lens_Prism;
    var Control_Lens_Iso = PS.Control_Lens_Iso;
    var Control_Lens_Traversal = PS.Control_Lens_Traversal;
    var Control_Lens_At = PS.Control_Lens_At;
    var Control_Lens_Indexed = PS.Control_Lens_Indexed;
    var $tilde = Control_Lens_Tuple["~"];
    var $bar$bar$tilde = Control_Lens_Setter["||~"];
    var $up$qmark = Control_Lens_Fold["^?"];
    var $up$dot$dot = Control_Lens_Fold["^.."];
    var $up$dot = Control_Lens_Getter["^."];
    var $qmark$tilde = Control_Lens_Setter["?~"];
    var $qmark$qmark = Control_Lens_Lens["??"];
    var $less$greater$tilde = Control_Lens_Setter["<>~"];
    var $less$hash$greater = Control_Lens_Lens["<#>"];
    var $div$tilde = Control_Lens_Setter["/~"];
    var $dot$tilde = Control_Lens_Setter[".~"];
    var $dot$dot = Prelude["<<<"];
    var $minus$tilde = Control_Lens_Setter["-~"];
    var $plus$tilde = Control_Lens_Setter["+~"];
    var $plus$plus$tilde = Control_Lens_Setter["++~"];
    var $times$tilde = Control_Lens_Setter["*~"];
    var $amp$amp$tilde = Control_Lens_Setter["&&~"];
    var $percent$tilde = Control_Lens_Setter["%~"];
    var $hash$tilde = Control_Lens_Lens["#~"];
    var withPrism = Control_Lens_Prism.withPrism;
    var withIso = Control_Lens_Iso.withIso;
    var view = Control_Lens_Getter.view;
    var use = Control_Lens_Getter.use;
    var under = Control_Lens_Iso.under;
    var traverseOf = Control_Lens_Traversal.traverseOf;
    var toListOf = Control_Lens_Fold.toListOf;
    var to = Control_Lens_Getter.to;
    var sets = Control_Lens_Setter.sets;
    var set$prime = Control_Lens_Setter["set'"];
    var set = Control_Lens_Setter.set;
    var sequenceOf = Control_Lens_Traversal.sequenceOf;
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
    var forOf = Control_Lens_Traversal.forOf;
    var foldrOf = Control_Lens_Fold.foldrOf;
    var foldlOf = Control_Lens_Fold.foldlOf;
    var foldOf = Control_Lens_Fold.foldOf;
    var foldMapOf = Control_Lens_Fold.foldMapOf;
    var filtered = Control_Lens_Fold.filtered;
    var $$enum = Control_Lens_Iso["enum"];
    var contramapped = Control_Lens_Setter.contramapped;
    var clonePrism = Control_Lens_Prism.clonePrism;
    var cloneIso = Control_Lens_Iso.cloneIso;
    var both = Control_Lens_Traversal.both;
    var auf = Control_Lens_Iso.auf;
    var au = Control_Lens_Iso.au;
    var at = Control_Lens_At.at;
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
        traverseOf: traverseOf, 
        sequenceOf: sequenceOf, 
        forOf: forOf, 
        both: both, 
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
        "??": $qmark$qmark, 
        "<#>": $less$hash$greater, 
        "#~": $hash$tilde, 
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
        to: to, 
        "^.": $up$dot, 
        toListOf: toListOf, 
        foldrOf: foldrOf, 
        foldOf: foldOf, 
        foldMapOf: foldMapOf, 
        foldlOf: foldlOf, 
        filtered: filtered, 
        "^?": $up$qmark, 
        "^..": $up$dot$dot, 
        ix: ix, 
        at: at, 
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
    var foldJsonString = function (_607) {
        return function (_608) {
            return function (_609) {
                if (_609 instanceof JsonString) {
                    return _608(_609.value0);
                };
                return _607;
            };
        };
    };
    var isString = isJsonType(foldJsonString);
    var jsonStringL = function (__dict_Applicative_544) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_544)(Data_Profunctor_Choice.choiceArr({}))(isString));
    };
    var toString = toJsonType(foldJsonString);
    var stringL = function (__dict_Applicative_545) {
        return function (__dict_Choice_546) {
            return Control_Lens["prism'"](fromString)(toString)(__dict_Applicative_545)(__dict_Choice_546);
        };
    };
    var foldJsonObject = function (_613) {
        return function (_614) {
            return function (_615) {
                if (_615 instanceof JsonObject) {
                    return _614(_615.value0);
                };
                return _613;
            };
        };
    };
    var isObject = isJsonType(foldJsonObject);
    var jsonObjectL = function (__dict_Applicative_547) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_547)(Data_Profunctor_Choice.choiceArr({}))(isObject));
    };
    var toObject = toJsonType(foldJsonObject);
    var objectL = function (__dict_Applicative_548) {
        return function (__dict_Choice_549) {
            return Control_Lens["prism'"](fromObject)(toObject)(__dict_Applicative_548)(__dict_Choice_549);
        };
    };
    var foldJsonNumber = function (_604) {
        return function (_605) {
            return function (_606) {
                if (_606 instanceof JsonNumber) {
                    return _605(_606.value0);
                };
                return _604;
            };
        };
    };
    var isNumber = isJsonType(foldJsonNumber);
    var jsonNumberL = function (__dict_Applicative_550) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_550)(Data_Profunctor_Choice.choiceArr({}))(isNumber));
    };
    var toNumber = toJsonType(foldJsonNumber);
    var numberL = function (__dict_Applicative_551) {
        return function (__dict_Choice_552) {
            return Control_Lens["prism'"](fromNumber)(toNumber)(__dict_Applicative_551)(__dict_Choice_552);
        };
    };
    var foldJsonNull = function (_598) {
        return function (_599) {
            return function (_600) {
                if (_600 instanceof JsonNull) {
                    return _599(Prelude.unit);
                };
                return _598;
            };
        };
    };
    var isNull = isJsonType(foldJsonNull);
    var jsonNullL = function (__dict_Applicative_553) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_553)(Data_Profunctor_Choice.choiceArr({}))(isNull));
    };
    var toNull = toJsonType(foldJsonNull);
    var nullL = function (__dict_Applicative_554) {
        return function (__dict_Choice_555) {
            return Control_Lens["prism'"](fromNull)(toNull)(__dict_Applicative_554)(__dict_Choice_555);
        };
    };
    var foldJsonBoolean = function (_601) {
        return function (_602) {
            return function (_603) {
                if (_603 instanceof JsonBoolean) {
                    return _602(_603.value0);
                };
                return _601;
            };
        };
    };
    var isBoolean = isJsonType(foldJsonBoolean);
    var jsonBooleanL = function (__dict_Applicative_556) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_556)(Data_Profunctor_Choice.choiceArr({}))(isBoolean));
    };
    var toBoolean = toJsonType(foldJsonBoolean);
    var foldJsonArray = function (_610) {
        return function (_611) {
            return function (_612) {
                if (_612 instanceof JsonArray) {
                    return _611(_612.value0);
                };
                return _610;
            };
        };
    };
    var isArray = isJsonType(foldJsonArray);
    var jsonArrayL = function (__dict_Applicative_557) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.id(Prelude.categoryArr({})))(Control_Lens.filtered(__dict_Applicative_557)(Data_Profunctor_Choice.choiceArr({}))(isArray));
    };
    var toArray = toJsonType(foldJsonArray);
    var foldJson = function (_591) {
        return function (_592) {
            return function (_593) {
                return function (_594) {
                    return function (_595) {
                        return function (_596) {
                            return function (_597) {
                                if (_597 instanceof JsonNull) {
                                    return _591(Prelude.unit);
                                };
                                if (_597 instanceof JsonBoolean) {
                                    return _592(_597.value0);
                                };
                                if (_597 instanceof JsonNumber) {
                                    return _593(_597.value0);
                                };
                                if (_597 instanceof JsonString) {
                                    return _594(_597.value0);
                                };
                                if (_597 instanceof JsonArray) {
                                    return _595(_597.value0);
                                };
                                if (_597 instanceof JsonObject) {
                                    return _596(_597.value0);
                                };
                                throw new Error("Failed pattern match");
                            };
                        };
                    };
                };
            };
        };
    };
    var eqJson = function (__unused) {
        return new Prelude.Eq(function (j) {
            return function (j$prime) {
                return !Prelude["=="](eqJson({}))(j)(j$prime);
            };
        }, function (_616) {
            return function (_617) {
                if (_616 instanceof JsonNull && _617 instanceof JsonNull) {
                    return true;
                };
                if (_616 instanceof JsonBoolean && _617 instanceof JsonBoolean) {
                    return _616.value0 === _617.value0;
                };
                if (_616 instanceof JsonNumber && _617 instanceof JsonNumber) {
                    return _616.value0 === _617.value0;
                };
                if (_616 instanceof JsonString && _617 instanceof JsonString) {
                    return _616.value0 === _617.value0;
                };
                if (_616 instanceof JsonArray && _617 instanceof JsonArray) {
                    return Prelude["=="](Prelude.eqArray(eqJson({})))(_616.value0)(_617.value0);
                };
                if (_616 instanceof JsonObject && _617 instanceof JsonObject) {
                    return Prelude["=="](Data_Map.eqMap(Prelude.eqString({}))(eqJson({})))(_616.value0)(_617.value0);
                };
                return false;
            };
        });
    };
    var booleanL = function (__dict_Applicative_558) {
        return function (__dict_Choice_559) {
            return Control_Lens["prism'"](fromBoolean)(toBoolean)(__dict_Applicative_558)(__dict_Choice_559);
        };
    };
    var arrayL = function (__dict_Applicative_560) {
        return function (__dict_Choice_561) {
            return Control_Lens["prism'"](fromArray)(toArray)(__dict_Applicative_560)(__dict_Choice_561);
        };
    };
    return {
        JsonNull: JsonNull, 
        JsonBoolean: JsonBoolean, 
        JsonNumber: JsonNumber, 
        JsonString: JsonString, 
        JsonArray: JsonArray, 
        JsonObject: JsonObject, 
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
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Map = PS.Data_Map;
    var Data_Foldable = PS.Data_Foldable;
    function EncodeJson(encodeJson) {
        this.encodeJson = encodeJson;
    };
    var encodeJsonJson = function (__unused) {
        return new EncodeJson(Prelude.id(Prelude.categoryArr({})));
    };
    var encodeJsonJString = function (__unused) {
        return new EncodeJson(Data_Argonaut_Core.fromString);
    };
    var encodeJsonJNumber = function (__unused) {
        return new EncodeJson(Data_Argonaut_Core.fromNumber);
    };
    var encodeJsonJNull = function (__unused) {
        return new EncodeJson(Data_Argonaut_Core.fromNull);
    };
    var encodeJsonJBoolean = function (__unused) {
        return new EncodeJson(Data_Argonaut_Core.fromBoolean);
    };
    var encodeJson = function (dict) {
        return dict.encodeJson;
    };
    var encodeJsonArray = function (__dict_EncodeJson_562) {
        return new EncodeJson(function (json) {
            return Data_Argonaut_Core.fromArray(Prelude["<$>"](Data_Array.functorArray({}))(encodeJson(__dict_EncodeJson_562))(json));
        });
    };
    var encodeMap = function (__dict_EncodeJson_563) {
        return new EncodeJson(function (json) {
            var assoc = function (_619) {
                return Data_Tuple.Tuple.create(_619.value0)(encodeJson(__dict_EncodeJson_563)(_619.value1));
            };
            var append = function (_618) {
                return Data_Argonaut_Core.foldJsonObject(Data_Argonaut_Core.jsonSingletonObject(_618.value0)(_618.value1))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Map.insert(Prelude.ordString({}))(_618.value0)(_618.value1))(Data_Argonaut_Core.fromObject));
            };
            return Data_Foldable.foldr(Data_Foldable.foldableArray({}))(append)(Data_Argonaut_Core.jsonEmptyObject)(Prelude["<$>"](Data_Array.functorArray({}))(assoc)(Data_Map.toList(json)));
        });
    };
    return {
        EncodeJson: EncodeJson, 
        encodeJson: encodeJson, 
        encodeJsonJNull: encodeJsonJNull, 
        encodeJsonJBoolean: encodeJsonJBoolean, 
        encodeJsonJNumber: encodeJsonJNumber, 
        encodeJsonJString: encodeJsonJString, 
        encodeJsonJson: encodeJsonJson, 
        encodeJsonArray: encodeJsonArray, 
        encodeMap: encodeMap
    };
})();
var PS = PS || {};
PS.Data_Argonaut_Combinators = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Data_Map = PS.Data_Map;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var $tilde$greater = function (_620) {
        return Data_Argonaut_Core.foldJsonObject(Data_Argonaut_Core.jsonSingletonObject(_620.value0)(_620.value1))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Map.insert(Prelude.ordString({}))(_620.value0)(_620.value1))(Data_Argonaut_Core.fromObject));
    };
    var $qmark$greater$greater$eq = function (_621) {
        return function (_622) {
            if (_621 instanceof Data_Maybe.Just) {
                return new Data_Either.Right(_621.value0);
            };
            return Data_Either.Left.create("Couldn't decode " + _622);
        };
    };
    var $colon$eq = function (__dict_EncodeJson_564) {
        return function (k) {
            return function (v) {
                return Data_Tuple.Tuple.create(k)(Data_Argonaut_Encode.encodeJson(__dict_EncodeJson_564)(v));
            };
        };
    };
    return {
        "?>>=": $qmark$greater$greater$eq, 
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
    function Printer(printJson) {
        this.printJson = printJson;
    };
    var stringifyString = Prelude.show(Prelude.showString({}));
    var stringifyNumber = Prelude.show(Prelude.showNumber({}));
    var stringifyNull = function (_623) {
        return "null";
    };
    var stringifyField = Prelude.show(Prelude.showString({}));
    var stringifyBoolean = function (_624) {
        if (_624) {
            return "true";
        };
        if (!_624) {
            return "false";
        };
        throw new Error("Failed pattern match");
    };
    var stringify = function (json) {
        return Data_Argonaut_Core.foldJson(stringifyNull)(stringifyBoolean)(stringifyNumber)(stringifyString)(stringifyArray)(stringifyObject)(json);
    };
    var stringifyArray = function (_625) {
        if (_625.length === 0) {
            return "[]";
        };
        if (_625.length > 0) {
            var _2333 = _625.slice(1);
            var withComma = function (x_1) {
                return function (acc) {
                    return ", " + stringify(x_1) + acc;
                };
            };
            return "[" + stringify(_625[0]) + Data_Foldable.foldr(Data_Foldable.foldableArray({}))(withComma)("]")(_2333);
        };
        throw new Error("Failed pattern match");
    };
    var stringifyObject = function (objMap) {
        var one = function (_626) {
            return Prelude.show(Prelude.showString({}))(_626.value0) + ": " + stringify(_626.value1);
        };
        var withComma = function (x) {
            return function (acc) {
                return ", " + one(x) + acc;
            };
        };
        var _2337 = Data_Map.toList(objMap);
        if (_2337.length > 0) {
            var _2339 = _2337.slice(1);
            return "{" + one(_2337[0]) + Data_Foldable.foldr(Data_Foldable.foldableArray({}))(withComma)("}")(_2339);
        };
        return "{}";
    };
    var printerJNull = function (__unused) {
        return new Printer(stringify);
    };
    var printJson = function (dict) {
        return dict.printJson;
    };
    var showJson = function (__unused) {
        return new Prelude.Show(printJson(printerJNull({})));
    };
    return {
        Printer: Printer, 
        printJson: printJson, 
        printerJNull: printerJNull, 
        showJson: showJson
    };
})();
var PS = PS || {};
PS.Data_Argonaut_Decode = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Map = PS.Data_Map;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Data_Either = PS.Data_Either;
    var Data_Maybe = PS.Data_Maybe;
    var Control_Lens = PS.Control_Lens;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Data_Profunctor_Choice = PS.Data_Profunctor_Choice;
    var Control_Lens_At = PS.Control_Lens_At;
    function DecodeJson(decodeJson) {
        this.decodeJson = decodeJson;
    };
    var foldableMap = function (__unused) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_568) {
            return function (f) {
                return function (ms) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableArray({}))(__dict_Monoid_568)(f)(Data_Map.values(ms));
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
    var traversableMap = function (__dict_Ord_565) {
        return new Data_Traversable.Traversable(foldableMap, function (__unused) {
            return Data_Map.functorMap({});
        }, function (__dict_Applicative_567) {
            return Data_Traversable.traverse(traversableMap(__dict_Ord_565))(__dict_Applicative_567)(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_566) {
            return function (f) {
                return function (ms) {
                    return Data_Foldable.foldr(Data_Foldable.foldableArray({}))(function (x) {
                        return function (acc) {
                            return Prelude["<*>"](__dict_Applicative_566["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_566["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Map.union(__dict_Ord_565))(x))(acc);
                        };
                    })(Prelude.pure(__dict_Applicative_566)(Data_Map.empty))(Prelude["<$>"](Data_Array.functorArray({}))(function (fs) {
                        return Prelude["<$>"]((__dict_Applicative_566["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.uncurry(Data_Map.singleton))(fs);
                    })(Prelude["<$>"](Data_Array.functorArray({}))(Data_Traversable.traverse(Data_Traversable.traversableTuple({}))(__dict_Applicative_566)(f))(Data_Map.toList(ms))));
                };
            };
        });
    };
    var decodeJsonString = function (__unused) {
        return new DecodeJson(Data_Argonaut_Core.foldJsonString(new Data_Either.Left("Not a String."))(Data_Either.Right.create));
    };
    var decodeJsonNumber = function (__unused) {
        return new DecodeJson(Data_Argonaut_Core.foldJsonNumber(new Data_Either.Left("Not a Number."))(Data_Either.Right.create));
    };
    var decodeJsonNull = function (__unused) {
        return new DecodeJson(Data_Argonaut_Core.foldJsonNull(new Data_Either.Left("Not null."))(Data_Either.Right.create));
    };
    var decodeJsonJson = function (__unused) {
        return new DecodeJson(Data_Either.Right.create);
    };
    var decodeJsonBoolean = function (__unused) {
        return new DecodeJson(Data_Argonaut_Core.foldJsonBoolean(new Data_Either.Left("Not a Boolean."))(Data_Either.Right.create));
    };
    var decodeJsonArray = function (__unused) {
        return new DecodeJson(Data_Argonaut_Core.foldJsonArray(new Data_Either.Left("Not a Array."))(Data_Either.Right.create));
    };
    var decodeJson = function (dict) {
        return dict.decodeJson;
    };
    var decodeMaybe = function (__dict_DecodeJson_569) {
        return function (json) {
            return Data_Either.either(Prelude["const"](Data_Maybe.Nothing.value))(Data_Maybe.Just.create)(decodeJson(__dict_DecodeJson_569)(json));
        };
    };
    var decodeL = function (__dict_DecodeJson_570) {
        return function (__dict_EncodeJson_571) {
            return function (__dict_Applicative_572) {
                return function (__dict_Choice_573) {
                    return Control_Lens["prism'"](Data_Argonaut_Encode.encodeJson(__dict_EncodeJson_571))(decodeMaybe(__dict_DecodeJson_570))(__dict_Applicative_572)(__dict_Choice_573);
                };
            };
        };
    };
    var objectFieldL = function (__dict_DecodeJson_574) {
        return function (__dict_EncodeJson_575) {
            return function (key) {
                return function (__dict_Applicative_576) {
                    return Prelude[">>>"](Prelude.semigroupoidArr({}))(decodeL(__dict_DecodeJson_574)(__dict_EncodeJson_575)(__dict_Applicative_576)(Data_Profunctor_Choice.choiceArr({})))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Lens.ix(Control_Lens_At.ixedMapKVKV(Prelude.ordString({})))(key)(__dict_Applicative_576))(Data_Argonaut_Core.objectL(__dict_Applicative_576)(Data_Profunctor_Choice.choiceArr({}))));
                };
            };
        };
    };
    var decodeMap = function (__dict_DecodeJson_577) {
        return new DecodeJson(function (json) {
            return Data_Maybe.maybe(new Data_Either.Left("Couldn't decode."))(Data_Either.Right.create)(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Core.toObject(json))(function (_28) {
                return Data_Traversable.traverse(traversableMap(Prelude.ordString({})))(Data_Maybe.applicativeMaybe({}))(decodeMaybe(__dict_DecodeJson_577))(_28);
            }));
        });
    };
    var decodeArray = function (__dict_DecodeJson_578) {
        return new DecodeJson(function (json) {
            return Data_Maybe.maybe(new Data_Either.Left("Couldn't decode."))(Data_Either.Right.create)(Prelude[">>="](Data_Maybe.bindMaybe({}))(Data_Argonaut_Core.toArray(json))(function (_29) {
                return Data_Traversable.traverse(Data_Traversable.traversableArray({}))(Data_Maybe.applicativeMaybe({}))(decodeMaybe(__dict_DecodeJson_578))(_29);
            }));
        });
    };
    var arrayIndexL = function (__dict_DecodeJson_579) {
        return function (__dict_EncodeJson_580) {
            return function (i) {
                return function (__dict_Applicative_581) {
                    return Prelude[">>>"](Prelude.semigroupoidArr({}))(decodeL(__dict_DecodeJson_579)(__dict_EncodeJson_580)(__dict_Applicative_581)(Data_Profunctor_Choice.choiceArr({})))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Control_Lens.ix(Control_Lens_At.ixedArrayaNumberA({}))(i)(__dict_Applicative_581))(Data_Argonaut_Core.arrayL(__dict_Applicative_581)(Data_Profunctor_Choice.choiceArr({}))));
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
        decodeJsonNull: decodeJsonNull, 
        decodeJsonBoolean: decodeJsonBoolean, 
        decodeJsonNumber: decodeJsonNumber, 
        decodeJsonString: decodeJsonString, 
        decodeJsonArray: decodeJsonArray, 
        decodeJsonJson: decodeJsonJson, 
        decodeMap: decodeMap, 
        decodeArray: decodeArray, 
        foldableMap: foldableMap, 
        traversableMap: traversableMap
    };
})();
var PS = PS || {};
PS.Data_Bifunctor_Clown = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Monoid = PS.Data_Monoid;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Bifunctor = PS.Data_Bifunctor;
    var Data_Bifoldable = PS.Data_Bifoldable;
    var Data_Bitraversable = PS.Data_Bitraversable;
    var Control_Biapply = PS.Control_Biapply;
    var Control_Biapplicative = PS.Control_Biapplicative;
    function Clown(value0) {
        this.value0 = value0;
    };
    Clown.create = function (value0) {
        return new Clown(value0);
    };
    var runClown = function (_627) {
        return _627.value0;
    };
    var clownFunctor = function (__unused) {
        return new Prelude.Functor(function (_630) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(Clown.create)(runClown);
        });
    };
    var clownFoldable = function (__unused) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_584) {
            return function (_637) {
                return function (_638) {
                    return Data_Monoid.mempty(__dict_Monoid_584);
                };
            };
        }, function (_) {
            return function (z) {
                return Prelude["const"](z);
            };
        }, function (_) {
            return function (z) {
                return Prelude["const"](z);
            };
        });
    };
    var clownTraversable = function (__unused) {
        return new Data_Traversable.Traversable(clownFoldable, clownFunctor, function (__dict_Applicative_583) {
            return Data_Traversable.traverse(clownTraversable({}))(__dict_Applicative_583)(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_582) {
            return function (_641) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.pure(__dict_Applicative_582))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Clown.create)(runClown));
            };
        });
    };
    var clownBifunctor = function (__dict_Functor_588) {
        return new Data_Bifunctor.Bifunctor(function (_628) {
            return function (_629) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Clown.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"](__dict_Functor_588)(_628))(runClown));
            };
        });
    };
    var clownBifoldable = function (__dict_Foldable_589) {
        return new Data_Bifoldable.Bifoldable(function (__dict_Monoid_590) {
            return function (_635) {
                return function (_636) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Foldable.foldMap(__dict_Foldable_589)(__dict_Monoid_590)(_635))(runClown);
                };
            };
        }, function (f) {
            return function (_) {
                return function (z) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Foldable.foldl(__dict_Foldable_589)(f)(z))(runClown);
                };
            };
        }, function (f) {
            return function (_) {
                return function (z) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Foldable.foldr(__dict_Foldable_589)(f)(z))(runClown);
                };
            };
        });
    };
    var clownBitraversable = function (__dict_Traversable_585) {
        return new Data_Bitraversable.Bitraversable(function (__unused) {
            return clownBifoldable(__dict_Traversable_585["__superclass_Data.Foldable.Foldable_1"]({}));
        }, function (__unused) {
            return clownBifunctor(__dict_Traversable_585["__superclass_Prelude.Functor_0"]({}));
        }, function (__dict_Applicative_587) {
            return Data_Bitraversable.bitraverse(clownBitraversable(__dict_Traversable_585))(__dict_Applicative_587)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_586) {
            return function (_639) {
                return function (_640) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"]((__dict_Applicative_586["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Clown.create))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Traversable.traverse(__dict_Traversable_585)(__dict_Applicative_586)(_639))(runClown));
                };
            };
        });
    };
    var clownBiapply = function (__dict_Apply_591) {
        return new Control_Biapply.Biapply(function (_631) {
            return function (_632) {
                return new Clown(Prelude["<*>"](__dict_Apply_591)(_631.value0)(_632.value0));
            };
        }, function (__unused) {
            return clownBifunctor(__dict_Apply_591["__superclass_Prelude.Functor_0"]({}));
        });
    };
    var clownBiapplicative = function (__dict_Applicative_592) {
        return new Control_Biapplicative.Biapplicative(function (__unused) {
            return clownBiapply(__dict_Applicative_592["__superclass_Prelude.Apply_0"]({}));
        }, function (_633) {
            return function (_634) {
                return new Clown(Prelude.pure(__dict_Applicative_592)(_633));
            };
        });
    };
    return {
        Clown: Clown, 
        runClown: runClown, 
        clownBifunctor: clownBifunctor, 
        clownFunctor: clownFunctor, 
        clownBiapply: clownBiapply, 
        clownBiapplicative: clownBiapplicative, 
        clownBifoldable: clownBifoldable, 
        clownFoldable: clownFoldable, 
        clownBitraversable: clownBitraversable, 
        clownTraversable: clownTraversable
    };
})();
var PS = PS || {};
PS.Data_Bifunctor_Flip = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Bifunctor = PS.Data_Bifunctor;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Bifoldable = PS.Data_Bifoldable;
    var Data_Monoid = PS.Data_Monoid;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Bitraversable = PS.Data_Bitraversable;
    var Control_Biapply = PS.Control_Biapply;
    var Control_Biapplicative = PS.Control_Biapplicative;
    function Flip(value0) {
        this.value0 = value0;
    };
    Flip.create = function (value0) {
        return new Flip(value0);
    };
    var runFlip = function (_642) {
        return _642.value0;
    };
    var flipFunctor = function (__dict_Bifunctor_596) {
        return new Prelude.Functor(function (f) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(Flip.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifunctor.lmap(__dict_Bifunctor_596)(f))(runFlip));
        });
    };
    var flipFoldable = function (__dict_Bifoldable_597) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_598) {
            return function (f) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldMap(__dict_Bifoldable_597)(__dict_Monoid_598)(f)(Prelude["const"](Data_Monoid.mempty(__dict_Monoid_598))))(runFlip);
            };
        }, function (f) {
            return function (z) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldl(__dict_Bifoldable_597)(f)(Prelude["const"])(z))(runFlip);
            };
        }, function (f) {
            return function (z) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldr(__dict_Bifoldable_597)(f)(Prelude.flip(Prelude["const"]))(z))(runFlip);
            };
        });
    };
    var flipTraversable = function (__dict_Bitraversable_593) {
        return new Data_Traversable.Traversable(function (__unused) {
            return flipFoldable(__dict_Bitraversable_593["__superclass_Data.Bifoldable.Bifoldable_1"]({}));
        }, function (__unused) {
            return flipFunctor(__dict_Bitraversable_593["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
        }, function (__dict_Applicative_595) {
            return Data_Traversable.traverse(flipTraversable(__dict_Bitraversable_593))(__dict_Applicative_595)(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_594) {
            return function (f) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"]((__dict_Applicative_594["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Flip.create))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bitraversable.bitraverse(__dict_Bitraversable_593)(__dict_Applicative_594)(f)(Prelude.pure(__dict_Applicative_594)))(runFlip));
            };
        });
    };
    var flipBifunctor = function (__dict_Bifunctor_602) {
        return new Data_Bifunctor.Bifunctor(function (f) {
            return function (g) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Flip.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifunctor.bimap(__dict_Bifunctor_602)(g)(f))(runFlip));
            };
        });
    };
    var flipBifoldable = function (__dict_Bifoldable_603) {
        return new Data_Bifoldable.Bifoldable(function (__dict_Monoid_604) {
            return function (f) {
                return function (g) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldMap(__dict_Bifoldable_603)(__dict_Monoid_604)(g)(f))(runFlip);
                };
            };
        }, function (f) {
            return function (g) {
                return function (z) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldl(__dict_Bifoldable_603)(g)(f)(z))(runFlip);
                };
            };
        }, function (f) {
            return function (g) {
                return function (z) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldr(__dict_Bifoldable_603)(g)(f)(z))(runFlip);
                };
            };
        });
    };
    var flipBitraversable = function (__dict_Bitraversable_599) {
        return new Data_Bitraversable.Bitraversable(function (__unused) {
            return flipBifoldable(__dict_Bitraversable_599["__superclass_Data.Bifoldable.Bifoldable_1"]({}));
        }, function (__unused) {
            return flipBifunctor(__dict_Bitraversable_599["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
        }, function (__dict_Applicative_601) {
            return Data_Bitraversable.bitraverse(flipBitraversable(__dict_Bitraversable_599))(__dict_Applicative_601)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_600) {
            return function (f) {
                return function (g) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"]((__dict_Applicative_600["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Flip.create))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bitraversable.bitraverse(__dict_Bitraversable_599)(__dict_Applicative_600)(g)(f))(runFlip));
                };
            };
        });
    };
    var flipBiapply = function (__dict_Biapply_605) {
        return new Control_Biapply.Biapply(function (_643) {
            return function (_644) {
                return new Flip(Control_Biapply["<<*>>"](__dict_Biapply_605)(_643.value0)(_644.value0));
            };
        }, function (__unused) {
            return flipBifunctor(__dict_Biapply_605["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
        });
    };
    var flipBiapplicative = function (__dict_Biapplicative_606) {
        return new Control_Biapplicative.Biapplicative(function (__unused) {
            return flipBiapply(__dict_Biapplicative_606["__superclass_Control.Biapply.Biapply_0"]({}));
        }, function (a) {
            return function (b) {
                return new Flip(Control_Biapplicative.bipure(__dict_Biapplicative_606)(b)(a));
            };
        });
    };
    return {
        Flip: Flip, 
        runFlip: runFlip, 
        flipBifunctor: flipBifunctor, 
        flipFunctor: flipFunctor, 
        flipBiapply: flipBiapply, 
        flipBiapplicative: flipBiapplicative, 
        flipBifoldable: flipBifoldable, 
        flipFoldable: flipFoldable, 
        flipBitraversable: flipBitraversable, 
        flipTraversable: flipTraversable
    };
})();
var PS = PS || {};
PS.Data_Bifunctor_Join = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Bifunctor = PS.Data_Bifunctor;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Bifoldable = PS.Data_Bifoldable;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Bitraversable = PS.Data_Bitraversable;
    var Control_Biapply = PS.Control_Biapply;
    var Control_Biapplicative = PS.Control_Biapplicative;
    function Join(value0) {
        this.value0 = value0;
    };
    Join.create = function (value0) {
        return new Join(value0);
    };
    var runJoin = function (_645) {
        return _645.value0;
    };
    var joinFunctor = function (__dict_Bifunctor_610) {
        return new Prelude.Functor(function (f) {
            return Prelude["<$>"](Prelude.functorArr({}))(Join.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifunctor.bimap(__dict_Bifunctor_610)(f)(f))(runJoin));
        });
    };
    var joinFoldable = function (__dict_Bifoldable_611) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_612) {
            return function (f) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldMap(__dict_Bifoldable_611)(__dict_Monoid_612)(f)(f))(runJoin);
            };
        }, function (f) {
            return function (z) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldl(__dict_Bifoldable_611)(f)(f)(z))(runJoin);
            };
        }, function (f) {
            return function (z) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldr(__dict_Bifoldable_611)(f)(f)(z))(runJoin);
            };
        });
    };
    var joinTraversable = function (__dict_Bitraversable_607) {
        return new Data_Traversable.Traversable(function (__unused) {
            return joinFoldable(__dict_Bitraversable_607["__superclass_Data.Bifoldable.Bifoldable_1"]({}));
        }, function (__unused) {
            return joinFunctor(__dict_Bitraversable_607["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
        }, function (__dict_Applicative_609) {
            return Data_Traversable.traverse(joinTraversable(__dict_Bitraversable_607))(__dict_Applicative_609)(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_608) {
            return function (_648) {
                return function (_649) {
                    return Prelude["<$>"]((__dict_Applicative_608["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Join.create)(Data_Bitraversable.bitraverse(__dict_Bitraversable_607)(__dict_Applicative_608)(_648)(_648)(_649.value0));
                };
            };
        });
    };
    var joinApply = function (__dict_Biapply_613) {
        return new Prelude.Apply(function (_646) {
            return function (_647) {
                return new Join(Control_Biapply["<<*>>"](__dict_Biapply_613)(_646.value0)(_647.value0));
            };
        }, function (__unused) {
            return joinFunctor(__dict_Biapply_613["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
        });
    };
    var joinApplicative = function (__dict_Biapplicative_614) {
        return new Prelude.Applicative(function (__unused) {
            return joinApply(__dict_Biapplicative_614["__superclass_Control.Biapply.Biapply_0"]({}));
        }, function (a) {
            return new Join(Control_Biapplicative.bipure(__dict_Biapplicative_614)(a)(a));
        });
    };
    return {
        Join: Join, 
        runJoin: runJoin, 
        joinFunctor: joinFunctor, 
        joinApply: joinApply, 
        joinApplicative: joinApplicative, 
        joinFoldable: joinFoldable, 
        joinTraversable: joinTraversable
    };
})();
var PS = PS || {};
PS.Data_Bifunctor_Joker = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Bifunctor = PS.Data_Bifunctor;
    var Data_Bifoldable = PS.Data_Bifoldable;
    var Data_Bitraversable = PS.Data_Bitraversable;
    var Control_Biapply = PS.Control_Biapply;
    var Control_Biapplicative = PS.Control_Biapplicative;
    function Joker(value0) {
        this.value0 = value0;
    };
    Joker.create = function (value0) {
        return new Joker(value0);
    };
    var runJoker = function (_650) {
        return _650.value0;
    };
    var jokerFunctor = function (__dict_Functor_618) {
        return new Prelude.Functor(function (g) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(Joker.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"](__dict_Functor_618)(g))(runJoker));
        });
    };
    var jokerFoldable = function (__dict_Foldable_619) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_620) {
            return function (g) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Foldable.foldMap(__dict_Foldable_619)(__dict_Monoid_620)(g))(runJoker);
            };
        }, function (g) {
            return function (z) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Foldable.foldl(__dict_Foldable_619)(g)(z))(runJoker);
            };
        }, function (g) {
            return function (z) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Foldable.foldr(__dict_Foldable_619)(g)(z))(runJoker);
            };
        });
    };
    var jokerTraversable = function (__dict_Traversable_615) {
        return new Data_Traversable.Traversable(function (__unused) {
            return jokerFoldable(__dict_Traversable_615["__superclass_Data.Foldable.Foldable_1"]({}));
        }, function (__unused) {
            return jokerFunctor(__dict_Traversable_615["__superclass_Prelude.Functor_0"]({}));
        }, function (__dict_Applicative_617) {
            return Data_Traversable.traverse(jokerTraversable(__dict_Traversable_615))(__dict_Applicative_617)(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_616) {
            return function (g) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"]((__dict_Applicative_616["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Joker.create))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Traversable.traverse(__dict_Traversable_615)(__dict_Applicative_616)(g))(runJoker));
            };
        });
    };
    var jokerBifunctor = function (__dict_Functor_624) {
        return new Data_Bifunctor.Bifunctor(function (_) {
            return function (g) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Joker.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"](__dict_Functor_624)(g))(runJoker));
            };
        });
    };
    var jokerBifoldable = function (__dict_Foldable_625) {
        return new Data_Bifoldable.Bifoldable(function (__dict_Monoid_626) {
            return function (_) {
                return function (g) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Foldable.foldMap(__dict_Foldable_625)(__dict_Monoid_626)(g))(runJoker);
                };
            };
        }, function (_) {
            return function (g) {
                return function (z) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Foldable.foldl(__dict_Foldable_625)(g)(z))(runJoker);
                };
            };
        }, function (_) {
            return function (g) {
                return function (z) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Foldable.foldr(__dict_Foldable_625)(g)(z))(runJoker);
                };
            };
        });
    };
    var jokerBitraversable = function (__dict_Traversable_621) {
        return new Data_Bitraversable.Bitraversable(function (__unused) {
            return jokerBifoldable(__dict_Traversable_621["__superclass_Data.Foldable.Foldable_1"]({}));
        }, function (__unused) {
            return jokerBifunctor(__dict_Traversable_621["__superclass_Prelude.Functor_0"]({}));
        }, function (__dict_Applicative_623) {
            return Data_Bitraversable.bitraverse(jokerBitraversable(__dict_Traversable_621))(__dict_Applicative_623)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_622) {
            return function (_) {
                return function (g) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"]((__dict_Applicative_622["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Joker.create))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Traversable.traverse(__dict_Traversable_621)(__dict_Applicative_622)(g))(runJoker));
                };
            };
        });
    };
    var jokerBiapply = function (__dict_Apply_627) {
        return new Control_Biapply.Biapply(function (_651) {
            return function (_652) {
                return new Joker(Prelude["<*>"](__dict_Apply_627)(_651.value0)(_652.value0));
            };
        }, function (__unused) {
            return jokerBifunctor(__dict_Apply_627["__superclass_Prelude.Functor_0"]({}));
        });
    };
    var jokerBiapplicative = function (__dict_Applicative_628) {
        return new Control_Biapplicative.Biapplicative(function (__unused) {
            return jokerBiapply(__dict_Applicative_628["__superclass_Prelude.Apply_0"]({}));
        }, function (_) {
            return function (b) {
                return new Joker(Prelude.pure(__dict_Applicative_628)(b));
            };
        });
    };
    return {
        Joker: Joker, 
        runJoker: runJoker, 
        jokerBifunctor: jokerBifunctor, 
        jokerFunctor: jokerFunctor, 
        jokerBiapply: jokerBiapply, 
        jokerBiapplicative: jokerBiapplicative, 
        jokerBifoldable: jokerBifoldable, 
        jokerFoldable: jokerFoldable, 
        jokerBitraversable: jokerBitraversable, 
        jokerTraversable: jokerTraversable
    };
})();
var PS = PS || {};
PS.Data_Bifunctor_Product = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Bifunctor = PS.Data_Bifunctor;
    var Data_Bifoldable = PS.Data_Bifoldable;
    var Data_Monoid_Endo = PS.Data_Monoid_Endo;
    var Data_Monoid_Dual = PS.Data_Monoid_Dual;
    var Data_Bitraversable = PS.Data_Bitraversable;
    var Control_Biapply = PS.Control_Biapply;
    var Control_Biapplicative = PS.Control_Biapplicative;
    function Pair(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Pair.create = function (value0) {
        return function (value1) {
            return new Pair(value0, value1);
        };
    };
    var productBifunctor = function (__dict_Bifunctor_633) {
        return function (__dict_Bifunctor_634) {
            return new Data_Bifunctor.Bifunctor(function (_653) {
                return function (_654) {
                    return function (_655) {
                        return new Pair(Data_Bifunctor.bimap(__dict_Bifunctor_633)(_653)(_654)(_655.value0), Data_Bifunctor.bimap(__dict_Bifunctor_634)(_653)(_654)(_655.value1));
                    };
                };
            });
        };
    };
    var productBifoldable = function (__dict_Bifoldable_635) {
        return function (__dict_Bifoldable_636) {
            return new Data_Bifoldable.Bifoldable(function (__dict_Monoid_637) {
                return function (_658) {
                    return function (_659) {
                        return function (_660) {
                            return Prelude["<>"](__dict_Monoid_637["__superclass_Prelude.Semigroup_0"]({}))(Data_Bifoldable.bifoldMap(__dict_Bifoldable_635)(__dict_Monoid_637)(_658)(_659)(_660.value0))(Data_Bifoldable.bifoldMap(__dict_Bifoldable_636)(__dict_Monoid_637)(_658)(_659)(_660.value1));
                        };
                    };
                };
            }, function (f) {
                return function (g) {
                    return function (z) {
                        return function (p) {
                            return Data_Monoid_Endo.runEndo(Data_Monoid_Dual.runDual(Data_Bifoldable.bifoldMap(productBifoldable(__dict_Bifoldable_635)(__dict_Bifoldable_636))(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo({})))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_Dual.Dual.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_Endo.Endo.create)(Prelude.flip(f))))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_Dual.Dual.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_Endo.Endo.create)(Prelude.flip(g))))(p)))(z);
                        };
                    };
                };
            }, function (f) {
                return function (g) {
                    return function (z) {
                        return function (p) {
                            return Data_Monoid_Endo.runEndo(Data_Bifoldable.bifoldMap(productBifoldable(__dict_Bifoldable_635)(__dict_Bifoldable_636))(Data_Monoid_Endo.monoidEndo({}))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_Endo.Endo.create)(f))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Monoid_Endo.Endo.create)(g))(p))(z);
                        };
                    };
                };
            });
        };
    };
    var productBitraversable = function (__dict_Bitraversable_629) {
        return function (__dict_Bitraversable_630) {
            return new Data_Bitraversable.Bitraversable(function (__unused) {
                return productBifoldable(__dict_Bitraversable_629["__superclass_Data.Bifoldable.Bifoldable_1"]({}))(__dict_Bitraversable_630["__superclass_Data.Bifoldable.Bifoldable_1"]({}));
            }, function (__unused) {
                return productBifunctor(__dict_Bitraversable_629["__superclass_Data.Bifunctor.Bifunctor_0"]({}))(__dict_Bitraversable_630["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
            }, function (__dict_Applicative_632) {
                return Data_Bitraversable.bitraverse(productBitraversable(__dict_Bitraversable_629)(__dict_Bitraversable_630))(__dict_Applicative_632)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
            }, function (__dict_Applicative_631) {
                return function (_661) {
                    return function (_662) {
                        return function (_663) {
                            return Prelude["<*>"](__dict_Applicative_631["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_631["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Pair.create)(Data_Bitraversable.bitraverse(__dict_Bitraversable_629)(__dict_Applicative_631)(_661)(_662)(_663.value0)))(Data_Bitraversable.bitraverse(__dict_Bitraversable_630)(__dict_Applicative_631)(_661)(_662)(_663.value1));
                        };
                    };
                };
            });
        };
    };
    var productBiapply = function (__dict_Biapply_638) {
        return function (__dict_Biapply_639) {
            return new Control_Biapply.Biapply(function (_656) {
                return function (_657) {
                    return new Pair(Control_Biapply["<<*>>"](__dict_Biapply_638)(_656.value0)(_657.value0), Control_Biapply["<<*>>"](__dict_Biapply_639)(_656.value1)(_657.value1));
                };
            }, function (__unused) {
                return productBifunctor(__dict_Biapply_638["__superclass_Data.Bifunctor.Bifunctor_0"]({}))(__dict_Biapply_639["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
            });
        };
    };
    var productBiapplicative = function (__dict_Biapplicative_640) {
        return function (__dict_Biapplicative_641) {
            return new Control_Biapplicative.Biapplicative(function (__unused) {
                return productBiapply(__dict_Biapplicative_640["__superclass_Control.Biapply.Biapply_0"]({}))(__dict_Biapplicative_641["__superclass_Control.Biapply.Biapply_0"]({}));
            }, function (a) {
                return function (b) {
                    return new Pair(Control_Biapplicative.bipure(__dict_Biapplicative_640)(a)(b), Control_Biapplicative.bipure(__dict_Biapplicative_641)(a)(b));
                };
            });
        };
    };
    return {
        Pair: Pair, 
        productBifunctor: productBifunctor, 
        productBiapply: productBiapply, 
        productBiapplicative: productBiapplicative, 
        productBifoldable: productBifoldable, 
        productBitraversable: productBitraversable
    };
})();
var PS = PS || {};
PS.Data_Bifunctor_Wrap = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Bifoldable = PS.Data_Bifoldable;
    var Data_Bifunctor = PS.Data_Bifunctor;
    var Control_Biapply = PS.Control_Biapply;
    var Control_Biapplicative = PS.Control_Biapplicative;
    var Data_Bitraversable = PS.Data_Bitraversable;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Monoid = PS.Data_Monoid;
    var Data_Traversable = PS.Data_Traversable;
    function Wrap(value0) {
        this.value0 = value0;
    };
    Wrap.create = function (value0) {
        return new Wrap(value0);
    };
    var unwrap = function (_664) {
        return _664.value0;
    };
    var wrapBifoldable = function (__dict_Bifoldable_644) {
        return new Data_Bifoldable.Bifoldable(function (__dict_Monoid_645) {
            return function (f) {
                return function (g) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldMap(__dict_Bifoldable_644)(__dict_Monoid_645)(f)(g))(unwrap);
                };
            };
        }, function (f) {
            return function (g) {
                return function (z) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldl(__dict_Bifoldable_644)(f)(g)(z))(unwrap);
                };
            };
        }, function (f) {
            return function (g) {
                return function (z) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldr(__dict_Bifoldable_644)(f)(g)(z))(unwrap);
                };
            };
        });
    };
    var wrapBifunctor = function (__dict_Bifunctor_646) {
        return new Data_Bifunctor.Bifunctor(function (f) {
            return function (g) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Wrap.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifunctor.bimap(__dict_Bifunctor_646)(f)(g))(unwrap));
            };
        });
    };
    var wrapBiapply = function (__dict_Biapply_642) {
        return new Control_Biapply.Biapply(function (_665) {
            return function (_666) {
                return new Wrap(Control_Biapply["<<*>>"](__dict_Biapply_642)(_665.value0)(_666.value0));
            };
        }, function (__unused) {
            return wrapBifunctor(__dict_Biapply_642["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
        });
    };
    var wrapBiapplicative = function (__dict_Biapplicative_643) {
        return new Control_Biapplicative.Biapplicative(function (__unused) {
            return wrapBiapply(__dict_Biapplicative_643["__superclass_Control.Biapply.Biapply_0"]({}));
        }, function (a) {
            return function (b) {
                return new Wrap(Control_Biapplicative.bipure(__dict_Biapplicative_643)(a)(b));
            };
        });
    };
    var wrapBitraversable = function (__dict_Bitraversable_647) {
        return new Data_Bitraversable.Bitraversable(function (__unused) {
            return wrapBifoldable(__dict_Bitraversable_647["__superclass_Data.Bifoldable.Bifoldable_1"]({}));
        }, function (__unused) {
            return wrapBifunctor(__dict_Bitraversable_647["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
        }, function (__dict_Applicative_649) {
            return Data_Bitraversable.bitraverse(wrapBitraversable(__dict_Bitraversable_647))(__dict_Applicative_649)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_648) {
            return function (f) {
                return function (g) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"]((__dict_Applicative_648["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Wrap.create))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bitraversable.bitraverse(__dict_Bitraversable_647)(__dict_Applicative_648)(f)(g))(unwrap));
                };
            };
        });
    };
    var wrapFoldable = function (__dict_Bifoldable_650) {
        return new Data_Foldable.Foldable(function (__dict_Monoid_651) {
            return function (f) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldMap(__dict_Bifoldable_650)(__dict_Monoid_651)(Prelude["const"](Data_Monoid.mempty(__dict_Monoid_651)))(f))(unwrap);
            };
        }, function (f) {
            return function (z) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldl(__dict_Bifoldable_650)(Prelude["const"])(f)(z))(unwrap);
            };
        }, function (f) {
            return function (z) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifoldable.bifoldr(__dict_Bifoldable_650)(Prelude.flip(Prelude["const"]))(f)(z))(unwrap);
            };
        });
    };
    var wrapFunctor = function (__dict_Bifunctor_652) {
        return new Prelude.Functor(function (f) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(Wrap.create)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bifunctor.rmap(__dict_Bifunctor_652)(f))(unwrap));
        });
    };
    var wrapTraversable = function (__dict_Bitraversable_653) {
        return new Data_Traversable.Traversable(function (__unused) {
            return wrapFoldable(__dict_Bitraversable_653["__superclass_Data.Bifoldable.Bifoldable_1"]({}));
        }, function (__unused) {
            return wrapFunctor(__dict_Bitraversable_653["__superclass_Data.Bifunctor.Bifunctor_0"]({}));
        }, function (__dict_Applicative_655) {
            return Data_Traversable.traverse(wrapTraversable(__dict_Bitraversable_653))(__dict_Applicative_655)(Prelude.id(Prelude.categoryArr({})));
        }, function (__dict_Applicative_654) {
            return function (f) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["<$>"]((__dict_Applicative_654["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Wrap.create))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Bitraversable.bitraverse(__dict_Bitraversable_653)(__dict_Applicative_654)(Prelude.pure(__dict_Applicative_654))(f))(unwrap));
            };
        });
    };
    return {
        Wrap: Wrap, 
        unwrap: unwrap, 
        wrapBifunctor: wrapBifunctor, 
        wrapFunctor: wrapFunctor, 
        wrapBiapply: wrapBiapply, 
        wrapBiapplicative: wrapBiapplicative, 
        wrapBifoldable: wrapBifoldable, 
        wrapFoldable: wrapFoldable, 
        wrapBitraversable: wrapBitraversable, 
        wrapTraversable: wrapTraversable
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
    var showForeign = function (__unused) {
        return new Prelude.Show(showForeignImpl);
    };
    var readPrimType = function (ty) {
        return function (x) {
            return readPrimTypeImpl(Data_Either.Left.create, Data_Either.Right.create, ty, x);
        };
    };
    var readString = function (__unused) {
        return new ReadForeign(ForeignParser.create(readPrimType("String")));
    };
    var readNumber = function (__unused) {
        return new ReadForeign(ForeignParser.create(readPrimType("Number")));
    };
    var readMaybeImpl$prime = function (x) {
        return readMaybeImpl(Data_Maybe.Nothing.value, Data_Maybe.Just.create, x);
    };
    var readBoolean = function (__unused) {
        return new ReadForeign(ForeignParser.create(readPrimType("Boolean")));
    };
    var read = function (dict) {
        return dict.read;
    };
    var parseForeign = function (_667) {
        return function (_668) {
            return _667.value0(_668);
        };
    };
    var functorForeignParser = function (__unused) {
        return new Prelude.Functor(function (_669) {
            return function (_670) {
                return new ForeignParser(function (x) {
                    return Prelude["<$>"](Data_Either.functorEither({}))(_669)(_670.value0(x));
                });
            };
        });
    };
    var fromString = function (s) {
        return fromStringImpl(Data_Either.Left.create, Data_Either.Right.create, s);
    };
    var parseJSON = function (__dict_ReadForeign_660) {
        return function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(fromString(json))(parseForeign(read(__dict_ReadForeign_660)));
        };
    };
    var applyForeignParser = function (__unused) {
        return new Prelude.Apply(function (_673) {
            return function (_674) {
                return new ForeignParser(function (x) {
                    var _2416 = _673.value0(x);
                    if (_2416 instanceof Data_Either.Left) {
                        return new Data_Either.Left(_2416.value0);
                    };
                    if (_2416 instanceof Data_Either.Right) {
                        return Prelude["<$>"](Data_Either.functorEither({}))(_2416.value0)(_674.value0(x));
                    };
                    throw new Error("Failed pattern match");
                });
            };
        }, functorForeignParser);
    };
    var bindForeignParser = function (__unused) {
        return new Prelude.Bind(function (_671) {
            return function (_672) {
                return new ForeignParser(function (x) {
                    var _2423 = _671.value0(x);
                    if (_2423 instanceof Data_Either.Left) {
                        return new Data_Either.Left(_2423.value0);
                    };
                    if (_2423 instanceof Data_Either.Right) {
                        return parseForeign(_672(_2423.value0))(x);
                    };
                    throw new Error("Failed pattern match");
                });
            };
        }, applyForeignParser);
    };
    var index = function (__dict_ReadForeign_659) {
        return function (i) {
            return Prelude[">>="](bindForeignParser({}))(new ForeignParser(function (x) {
                return Data_Either.Right.create(readIndexImpl$prime(i)(x));
            }))(function (x) {
                return new ForeignParser(function (_) {
                    var _2427 = parseForeign(read(__dict_ReadForeign_659))(x);
                    if (_2427 instanceof Data_Either.Right) {
                        return new Data_Either.Right(_2427.value0);
                    };
                    if (_2427 instanceof Data_Either.Left) {
                        return Data_Either.Left.create("Error reading index '" + Prelude.show(Prelude.showNumber({}))(i) + "':\n" + _2427.value0);
                    };
                    throw new Error("Failed pattern match");
                });
            });
        };
    };
    var readIndexImpl$prime = function (index_1) {
        return function (x) {
            return readPropImpl(index_1, x);
        };
    };
    var prop = function (__dict_ReadForeign_656) {
        return function (p) {
            return Prelude[">>="](bindForeignParser({}))(new ForeignParser(function (x) {
                return Data_Either.Right.create(readPropImpl$prime(p)(x));
            }))(function (x) {
                return new ForeignParser(function (_) {
                    var _2430 = parseForeign(read(__dict_ReadForeign_656))(x);
                    if (_2430 instanceof Data_Either.Right) {
                        return new Data_Either.Right(_2430.value0);
                    };
                    if (_2430 instanceof Data_Either.Left) {
                        return Data_Either.Left.create("Error reading property '" + p + "':\n" + _2430.value0);
                    };
                    throw new Error("Failed pattern match");
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
            var _2433 = readKeysImpl$prime(p)(x);
            if (_2433 instanceof Data_Either.Right) {
                return new Data_Either.Right(_2433.value0);
            };
            if (_2433 instanceof Data_Either.Left) {
                return Data_Either.Left.create("Error reading object keys of '" + p + "':\n" + _2433.value0);
            };
            throw new Error("Failed pattern match");
        });
    };
    var readArray = function (__dict_ReadForeign_657) {
        return new ReadForeign((function () {
            var arrayItem = function (_675) {
                var _2437 = parseForeign(read(__dict_ReadForeign_657))(_675.value1);
                if (_2437 instanceof Data_Either.Right) {
                    return new Data_Either.Right(_2437.value0);
                };
                if (_2437 instanceof Data_Either.Left) {
                    return Data_Either.Left.create("Error reading item at index " + Prelude.show(Prelude.showNumber({}))(_675.value0) + ":\n" + _2437.value0);
                };
                throw new Error("Failed pattern match");
            };
            return Prelude[">>="](bindForeignParser({}))(ForeignParser.create(readPrimType("Array")))(function (xs) {
                return new ForeignParser(function (_) {
                    return Data_Traversable.traverse(Data_Traversable.traversableArray({}))(Data_Either.applicativeEither({}))(arrayItem)(Data_Tuple.zip(Data_Array.range(0)(Data_Array.length(xs)))(xs));
                });
            });
        })());
    };
    var readMaybe = function (__dict_ReadForeign_658) {
        return new ReadForeign(Prelude[">>="](bindForeignParser({}))(ForeignParser.create(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Either.Right.create)(readMaybeImpl$prime)))(function (x) {
            return new ForeignParser(function (_) {
                if (x instanceof Data_Maybe.Just) {
                    return Prelude[">>="](Data_Either.bindEither({}))(parseForeign(read(__dict_ReadForeign_658))(x.value0))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](Data_Either.monadEither({})))(Data_Maybe.Just.create));
                };
                if (x instanceof Data_Maybe.Nothing) {
                    return Prelude["return"](Data_Either.monadEither({}))(Data_Maybe.Nothing.value);
                };
                throw new Error("Failed pattern match");
            });
        }));
    };
    var applicativeForeignParser = function (__unused) {
        return new Prelude.Applicative(applyForeignParser, function (x) {
            return new ForeignParser(function (_) {
                return new Data_Either.Right(x);
            });
        });
    };
    var monadForeignParser = function (__unused) {
        return new Prelude.Monad(applicativeForeignParser, bindForeignParser);
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
        readArray: readArray, 
        readMaybe: readMaybe
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
    var vertices = function (_678) {
        if (_678 instanceof AcyclicSCC) {
            return [ _678.value0 ];
        };
        if (_678 instanceof CyclicSCC) {
            return _678.value0;
        };
        throw new Error("Failed pattern match");
    };
    var showSCC = function (__dict_Show_661) {
        return new Prelude.Show(function (_688) {
            if (_688 instanceof AcyclicSCC) {
                return "AcyclicSCC (" + Prelude.show(__dict_Show_661)(_688.value0) + ")";
            };
            if (_688 instanceof CyclicSCC) {
                return "CyclicSCC " + Prelude.show(Prelude.showArray(__dict_Show_661))(_688.value0);
            };
            throw new Error("Failed pattern match");
        });
    };
    var popUntil = function (__copy___dict_Eq_662) {
        return function (__copy__682) {
            return function (__copy__683) {
                return function (__copy__684) {
                    return function (__copy__685) {
                        var __dict_Eq_662 = __copy___dict_Eq_662;
                        var _682 = __copy__682;
                        var _683 = __copy__683;
                        var _684 = __copy__684;
                        var _685 = __copy__685;
                        tco: while (true) {
                            if (_684.length === 0) {
                                return {
                                    path: [  ], 
                                    component: _685
                                };
                            };
                            if (_684.length > 0) {
                                var _2455 = _684.slice(1);
                                if (Prelude["=="](__dict_Eq_662)(_682(_683))(_682(_684[0]))) {
                                    return {
                                        path: _2455, 
                                        component: Prelude[":"](_684[0])(_685)
                                    };
                                };
                            };
                            if (_684.length > 0) {
                                var _2457 = _684.slice(1);
                                var __tco___dict_Eq_662 = __dict_Eq_662;
                                var __tco__682 = _682;
                                var __tco__683 = _683;
                                var __tco__685 = Prelude[":"](_684[0])(_685);
                                __dict_Eq_662 = __tco___dict_Eq_662;
                                _682 = __tco__682;
                                _683 = __tco__683;
                                _684 = _2457;
                                _685 = __tco__685;
                                continue tco;
                            };
                            throw new Error("Failed pattern match");
                        };
                    };
                };
            };
        };
    };
    var maybeMin = function (_686) {
        return function (_687) {
            if (_687 instanceof Data_Maybe.Nothing) {
                return new Data_Maybe.Just(_686);
            };
            if (_687 instanceof Data_Maybe.Just) {
                return Data_Maybe.Just.create(Math.min(_686)(_687.value0));
            };
            throw new Error("Failed pattern match");
        };
    };
    var scc$prime = function (__dict_Eq_663) {
        return function (__dict_Ord_664) {
            return function (_679) {
                return function (_680) {
                    return function (_681) {
                        return Control_Monad_Eff.runPure(function __do() {
                            var _45 = {
                                value: 0
                            };
                            var _44 = {
                                value: [  ]
                            };
                            var _43 = {
                                value: Data_Map.empty
                            };
                            var _42 = {
                                value: Data_Map.empty
                            };
                            var _41 = {
                                value: [  ]
                            };
                            return (function () {
                                var lowlinkOfKey = function (k) {
                                    return function __do() {
                                        return Data_Map.lookup(__dict_Ord_664)(k)(_42.value);
                                    };
                                };
                                var lowlinkOf = function (v) {
                                    return lowlinkOfKey(_679(v));
                                };
                                var isCycle = function (k) {
                                    return Data_Foldable.any(Data_Foldable.foldableArray({}))(function (_677) {
                                        return Prelude["=="](__dict_Eq_663)(_677.value0)(k) && Prelude["=="](__dict_Eq_663)(_677.value1)(k);
                                    })(_681.value1);
                                };
                                var makeComponent = function (_692) {
                                    if (_692.length === 1 && !isCycle(_679(_692[0]))) {
                                        return new AcyclicSCC(_692[0]);
                                    };
                                    return new CyclicSCC(_692);
                                };
                                var indexOfKey = function (k) {
                                    return function __do() {
                                        return Data_Map.lookup(__dict_Ord_664)(k)(_43.value);
                                    };
                                };
                                var strongConnect = function (k) {
                                    var v = _680(k);
                                    return function __do() {
                                        var _40 = _45.value;
                                        _43.value = Data_Map.insert(__dict_Ord_664)(k)(_40)(_43.value);
                                        _42.value = Data_Map.insert(__dict_Ord_664)(k)(_40)(_42.value);
                                        _45.value = _40 + 1;
                                        _44.value = Prelude[":"](v)(_44.value);
                                        Data_Traversable["for"](Control_Monad_Eff.applicativeEff({}))(Data_Traversable.traversableArray({}))(_681.value1)(function (_676) {
                                            return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Prelude["=="](__dict_Eq_663)(k)(_676.value0))(function __do() {
                                                var _36 = indexOfKey(_676.value1)();
                                                return (function () {
                                                    if (_36 instanceof Data_Maybe.Nothing) {
                                                        var w = _680(_676.value1);
                                                        return function __do() {
                                                            strongConnect(_676.value1)();
                                                            var _33 = lowlinkOfKey(_676.value1)();
                                                            return Data_Foldable.for_(Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_33)(function (lowlink) {
                                                                return Control_Monad_ST.modifySTRef(_42)(Data_Map.alter(__dict_Ord_664)(maybeMin(lowlink))(k));
                                                            })();
                                                        };
                                                    };
                                                    return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Foldable.elem(__dict_Eq_663)(Data_Foldable.foldableArray({}))(_676.value1)(Data_Array.map(_679)(_44.value)))(function __do() {
                                                        var _34 = indexOfKey(_676.value1)();
                                                        return Data_Foldable.for_(Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_34)(function (index_1) {
                                                            return Control_Monad_ST.modifySTRef(_42)(Data_Map.alter(__dict_Ord_664)(maybeMin(index_1))(k));
                                                        })();
                                                    });
                                                })()();
                                            });
                                        })();
                                        var _39 = indexOfKey(k)();
                                        var _38 = lowlinkOfKey(k)();
                                        return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Prelude["=="](Data_Maybe.eqMaybe(Prelude.eqNumber({})))(_39)(_38))(function __do() {
                                            var _37 = _44.value;
                                            return (function () {
                                                var newPath = popUntil(__dict_Eq_663)(_679)(v)(_37)([  ]);
                                                return function __do() {
                                                    _41.value = Prelude.flip(Prelude["++"](Data_Array.semigroupArray({})))([ makeComponent(newPath.component) ])(_41.value);
                                                    _44.value = newPath.path;
                                                    return Prelude.unit;
                                                };
                                            })()();
                                        })();
                                    };
                                };
                                var indexOf = function (v) {
                                    return indexOfKey(_679(v));
                                };
                                var go = function (_691) {
                                    if (_691.length === 0) {
                                        return Control_Monad_ST.readSTRef(_41);
                                    };
                                    if (_691.length > 0) {
                                        var _2491 = _691.slice(1);
                                        return function __do() {
                                            var _32 = indexOf(_691[0])();
                                            Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Maybe.isNothing(_32))(strongConnect(_679(_691[0])))();
                                            return go(_2491)();
                                        };
                                    };
                                    throw new Error("Failed pattern match");
                                };
                                return go(_681.value0);
                            })()();
                        });
                    };
                };
            };
        };
    };
    var scc = function (__dict_Eq_665) {
        return function (__dict_Ord_666) {
            return scc$prime(__dict_Eq_665)(__dict_Ord_666)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var topSort$prime = function (__dict_Eq_667) {
        return function (__dict_Ord_668) {
            return function (makeKey) {
                return function (makeVert) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Array.reverse)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Array.concatMap(vertices))(scc$prime(__dict_Eq_667)(__dict_Ord_668)(makeKey)(makeVert)));
                };
            };
        };
    };
    var topSort = function (__dict_Eq_669) {
        return function (__dict_Ord_670) {
            return topSort$prime(__dict_Eq_669)(__dict_Ord_670)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var eqSCC = function (__dict_Eq_671) {
        return new Prelude.Eq(function (scc1) {
            return function (scc2) {
                return !Prelude["=="](eqSCC(__dict_Eq_671))(scc1)(scc2);
            };
        }, function (_689) {
            return function (_690) {
                if (_689 instanceof AcyclicSCC && _690 instanceof AcyclicSCC) {
                    return Prelude["=="](__dict_Eq_671)(_689.value0)(_690.value0);
                };
                if (_689 instanceof CyclicSCC && _690 instanceof CyclicSCC) {
                    return Prelude["=="](Prelude.eqArray(__dict_Eq_671))(_689.value0)(_690.value0);
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
PS.Network_HTTP = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
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
    var string2Head = function (_693) {
        if (_693 === "Accept") {
            return Accept.value;
        };
        if (_693 === "Accept-Charset") {
            return AcceptCharset.value;
        };
        if (_693 === "Accept-Encoding") {
            return AcceptEncoding.value;
        };
        if (_693 === "Accept-Language") {
            return AcceptLanguage.value;
        };
        if (_693 === "Allow") {
            return Allow.value;
        };
        if (_693 === "Authorization") {
            return Authorization.value;
        };
        if (_693 === "Cache-Control") {
            return CacheControl.value;
        };
        if (_693 === "Connection") {
            return Connection.value;
        };
        if (_693 === "Content-Encoding") {
            return ContentEncoding.value;
        };
        if (_693 === "Content-Language") {
            return ContentLanguage.value;
        };
        if (_693 === "Content-Length") {
            return ContentLength.value;
        };
        if (_693 === "Content-Location") {
            return ContentLocation.value;
        };
        if (_693 === "Content-MD5") {
            return ContentMD5.value;
        };
        if (_693 === "Content-Range") {
            return ContentRange.value;
        };
        if (_693 === "Content-Type") {
            return ContentType.value;
        };
        if (_693 === "Date") {
            return Date.value;
        };
        if (_693 === "Expect") {
            return Expect.value;
        };
        if (_693 === "Expires") {
            return Expires.value;
        };
        if (_693 === "From") {
            return From.value;
        };
        if (_693 === "Host") {
            return Host.value;
        };
        if (_693 === "If-Match") {
            return IfMatch.value;
        };
        if (_693 === "If-Modified-Since") {
            return IfModifiedSince.value;
        };
        if (_693 === "If-None-Match") {
            return IfNoneMatch.value;
        };
        if (_693 === "If-Range") {
            return IfRange.value;
        };
        if (_693 === "If-Unmodified-Since") {
            return IfUnmodifiedSince.value;
        };
        if (_693 === "Last-Modified") {
            return LastModified.value;
        };
        if (_693 === "Max-Forwards") {
            return MaxForwards.value;
        };
        if (_693 === "Pragma") {
            return Pragma.value;
        };
        if (_693 === "Proxy-Authorization") {
            return ProxyAuthorization.value;
        };
        if (_693 === "Range") {
            return Range.value;
        };
        if (_693 === "Referer") {
            return Referer.value;
        };
        if (_693 === "Te") {
            return TE.value;
        };
        if (_693 === "Trailer") {
            return Trailer.value;
        };
        if (_693 === "Transfer-Encoding") {
            return TransferEncoding.value;
        };
        if (_693 === "Upgrade") {
            return Upgrade.value;
        };
        if (_693 === "User-Agent") {
            return UserAgent.value;
        };
        if (_693 === "Via") {
            return Via.value;
        };
        if (_693 === "Warning") {
            return Warning.value;
        };
        return new Custom(_693);
    };
    var status2Number = function (_694) {
        if (_694 instanceof NoStatus) {
            return 0;
        };
        if (_694 instanceof Continue) {
            return 100;
        };
        if (_694 instanceof SwitchingProtocols) {
            return 101;
        };
        if (_694 instanceof Ok) {
            return 200;
        };
        if (_694 instanceof Created) {
            return 201;
        };
        if (_694 instanceof Accepted) {
            return 202;
        };
        if (_694 instanceof NonAuthoritativeInformation) {
            return 203;
        };
        if (_694 instanceof NoContent) {
            return 204;
        };
        if (_694 instanceof ResetContent) {
            return 205;
        };
        if (_694 instanceof PartialContent) {
            return 206;
        };
        if (_694 instanceof MultipleChoices) {
            return 300;
        };
        if (_694 instanceof MovedPermanently) {
            return 301;
        };
        if (_694 instanceof Found) {
            return 302;
        };
        if (_694 instanceof SeeOther) {
            return 303;
        };
        if (_694 instanceof NotModified) {
            return 304;
        };
        if (_694 instanceof UseProxy) {
            return 305;
        };
        if (_694 instanceof TemporaryRedirect) {
            return 307;
        };
        if (_694 instanceof BadRequest) {
            return 400;
        };
        if (_694 instanceof Unauthorized) {
            return 401;
        };
        if (_694 instanceof PaymentRequired) {
            return 402;
        };
        if (_694 instanceof Forbidden) {
            return 403;
        };
        if (_694 instanceof NotFound) {
            return 404;
        };
        if (_694 instanceof MethodNotAllowed) {
            return 405;
        };
        if (_694 instanceof NotAcceptable) {
            return 406;
        };
        if (_694 instanceof ProxyAuthenticationRequired) {
            return 407;
        };
        if (_694 instanceof RequestTimeout) {
            return 408;
        };
        if (_694 instanceof Gone) {
            return 410;
        };
        if (_694 instanceof LengthRequired) {
            return 411;
        };
        if (_694 instanceof PreconditionFailed) {
            return 412;
        };
        if (_694 instanceof RequestEntityTooLarge) {
            return 413;
        };
        if (_694 instanceof RequestURITooLong) {
            return 414;
        };
        if (_694 instanceof UnsupportedMediaType) {
            return 415;
        };
        if (_694 instanceof RequestedRangeNotSatisfiable) {
            return 416;
        };
        if (_694 instanceof ExpectationFailed) {
            return 417;
        };
        if (_694 instanceof InternalServerError) {
            return 500;
        };
        if (_694 instanceof NotImplemented) {
            return 501;
        };
        if (_694 instanceof BadGateway) {
            return 502;
        };
        if (_694 instanceof ServiceUnavailable) {
            return 503;
        };
        if (_694 instanceof GatewayTimeout) {
            return 504;
        };
        if (_694 instanceof HTTPVersionNotSupported) {
            return 505;
        };
        throw new Error("Failed pattern match");
    };
    var showHeaderHead = function (__unused) {
        return new Prelude.Show(function (_698) {
            if (_698 instanceof Accept) {
                return "Accept";
            };
            if (_698 instanceof AcceptCharset) {
                return "Accept-Charset";
            };
            if (_698 instanceof AcceptEncoding) {
                return "Accept-Encoding";
            };
            if (_698 instanceof AcceptLanguage) {
                return "Accept-Language";
            };
            if (_698 instanceof Allow) {
                return "Allow";
            };
            if (_698 instanceof Authorization) {
                return "Authorization";
            };
            if (_698 instanceof CacheControl) {
                return "Cache-Control";
            };
            if (_698 instanceof Connection) {
                return "Connection";
            };
            if (_698 instanceof ContentEncoding) {
                return "Content-Encoding";
            };
            if (_698 instanceof ContentLanguage) {
                return "Content-Language";
            };
            if (_698 instanceof ContentLength) {
                return "Content-Length";
            };
            if (_698 instanceof ContentLocation) {
                return "Content-Location";
            };
            if (_698 instanceof ContentMD5) {
                return "Content-MD5";
            };
            if (_698 instanceof ContentRange) {
                return "Content-Range";
            };
            if (_698 instanceof ContentType) {
                return "Content-Type";
            };
            if (_698 instanceof Date) {
                return "Date";
            };
            if (_698 instanceof Expect) {
                return "Expect";
            };
            if (_698 instanceof Expires) {
                return "Expires";
            };
            if (_698 instanceof From) {
                return "From";
            };
            if (_698 instanceof Host) {
                return "Host";
            };
            if (_698 instanceof IfMatch) {
                return "If-Match";
            };
            if (_698 instanceof IfModifiedSince) {
                return "If-Modified-Since";
            };
            if (_698 instanceof IfNoneMatch) {
                return "If-None-Match";
            };
            if (_698 instanceof IfRange) {
                return "If-Range";
            };
            if (_698 instanceof IfUnmodifiedSince) {
                return "If-Unmodified-Since";
            };
            if (_698 instanceof LastModified) {
                return "Last-Modified";
            };
            if (_698 instanceof MaxForwards) {
                return "Max-Forwards";
            };
            if (_698 instanceof Pragma) {
                return "Pragma";
            };
            if (_698 instanceof ProxyAuthorization) {
                return "Proxy-Authorization";
            };
            if (_698 instanceof Range) {
                return "Range";
            };
            if (_698 instanceof Referer) {
                return "Referer";
            };
            if (_698 instanceof TE) {
                return "Te";
            };
            if (_698 instanceof Trailer) {
                return "Trailer";
            };
            if (_698 instanceof TransferEncoding) {
                return "Transfer-Encoding";
            };
            if (_698 instanceof Upgrade) {
                return "Upgrade";
            };
            if (_698 instanceof UserAgent) {
                return "User-Agent";
            };
            if (_698 instanceof Via) {
                return "Via";
            };
            if (_698 instanceof Warning) {
                return "Warning";
            };
            if (_698 instanceof Custom) {
                return _698.value0;
            };
            throw new Error("Failed pattern match");
        });
    };
    var showHeader = function (__unused) {
        return new Prelude.Show(function (_697) {
            return Prelude.show(showHeaderHead({}))(_697.value0) + ": " + _697.value1;
        });
    };
    var showHTTPVerb = function (__unused) {
        return new Prelude.Show(function (_696) {
            if (_696 instanceof DELETE) {
                return "DELETE";
            };
            if (_696 instanceof GET) {
                return "GET";
            };
            if (_696 instanceof HEAD) {
                return "HEAD";
            };
            if (_696 instanceof OPTIONS) {
                return "OPTIONS";
            };
            if (_696 instanceof PATCH) {
                return "PATCH";
            };
            if (_696 instanceof POST) {
                return "POST";
            };
            if (_696 instanceof PUT) {
                return "PUT";
            };
            throw new Error("Failed pattern match");
        });
    };
    var number2Status = function (_695) {
        if (_695 === 0) {
            return new Data_Maybe.Just(NoStatus.value);
        };
        if (_695 === 100) {
            return new Data_Maybe.Just(Continue.value);
        };
        if (_695 === 101) {
            return new Data_Maybe.Just(SwitchingProtocols.value);
        };
        if (_695 === 200) {
            return new Data_Maybe.Just(Ok.value);
        };
        if (_695 === 201) {
            return new Data_Maybe.Just(Created.value);
        };
        if (_695 === 202) {
            return new Data_Maybe.Just(Accepted.value);
        };
        if (_695 === 203) {
            return new Data_Maybe.Just(NonAuthoritativeInformation.value);
        };
        if (_695 === 204) {
            return new Data_Maybe.Just(NoContent.value);
        };
        if (_695 === 205) {
            return new Data_Maybe.Just(ResetContent.value);
        };
        if (_695 === 206) {
            return new Data_Maybe.Just(PartialContent.value);
        };
        if (_695 === 300) {
            return new Data_Maybe.Just(MultipleChoices.value);
        };
        if (_695 === 301) {
            return new Data_Maybe.Just(MovedPermanently.value);
        };
        if (_695 === 302) {
            return new Data_Maybe.Just(Found.value);
        };
        if (_695 === 303) {
            return new Data_Maybe.Just(SeeOther.value);
        };
        if (_695 === 304) {
            return new Data_Maybe.Just(NotModified.value);
        };
        if (_695 === 305) {
            return new Data_Maybe.Just(UseProxy.value);
        };
        if (_695 === 307) {
            return new Data_Maybe.Just(TemporaryRedirect.value);
        };
        if (_695 === 400) {
            return new Data_Maybe.Just(BadRequest.value);
        };
        if (_695 === 401) {
            return new Data_Maybe.Just(Unauthorized.value);
        };
        if (_695 === 402) {
            return new Data_Maybe.Just(PaymentRequired.value);
        };
        if (_695 === 403) {
            return new Data_Maybe.Just(Forbidden.value);
        };
        if (_695 === 404) {
            return new Data_Maybe.Just(NotFound.value);
        };
        if (_695 === 405) {
            return new Data_Maybe.Just(MethodNotAllowed.value);
        };
        if (_695 === 406) {
            return new Data_Maybe.Just(NotAcceptable.value);
        };
        if (_695 === 407) {
            return new Data_Maybe.Just(ProxyAuthenticationRequired.value);
        };
        if (_695 === 408) {
            return new Data_Maybe.Just(RequestTimeout.value);
        };
        if (_695 === 410) {
            return new Data_Maybe.Just(Gone.value);
        };
        if (_695 === 411) {
            return new Data_Maybe.Just(LengthRequired.value);
        };
        if (_695 === 412) {
            return new Data_Maybe.Just(PreconditionFailed.value);
        };
        if (_695 === 413) {
            return new Data_Maybe.Just(RequestEntityTooLarge.value);
        };
        if (_695 === 414) {
            return new Data_Maybe.Just(RequestURITooLong.value);
        };
        if (_695 === 415) {
            return new Data_Maybe.Just(UnsupportedMediaType.value);
        };
        if (_695 === 416) {
            return new Data_Maybe.Just(RequestedRangeNotSatisfiable.value);
        };
        if (_695 === 417) {
            return new Data_Maybe.Just(ExpectationFailed.value);
        };
        if (_695 === 500) {
            return new Data_Maybe.Just(InternalServerError.value);
        };
        if (_695 === 501) {
            return new Data_Maybe.Just(NotImplemented.value);
        };
        if (_695 === 502) {
            return new Data_Maybe.Just(BadGateway.value);
        };
        if (_695 === 503) {
            return new Data_Maybe.Just(ServiceUnavailable.value);
        };
        if (_695 === 504) {
            return new Data_Maybe.Just(GatewayTimeout.value);
        };
        if (_695 === 505) {
            return new Data_Maybe.Just(HTTPVersionNotSupported.value);
        };
        return Data_Maybe.Nothing.value;
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
    function oboe_(header2Obj, showVerb, obj) {  return function() {    var oboe__;    try {      oboe__ = require('oboe');    } catch (e) {      oboe__ = window.oboe;    }    var headers = {};    obj.headers.map(header2Obj).forEach(function(header) {      headers[header.head] = header.value;    });    return oboe__({      url: obj.url,      method: showVerb(obj.method),      headers: headers,      body: obj.body,      cached: obj.cached,      withCredentials: obj.withCredentials    });  }};
    var showVerb = Prelude.show(Network_HTTP.showHTTPVerb({}));
    var showJSON = function (__unused) {
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
    var header2Obj = function (_699) {
        return {
            head: Prelude.show(Network_HTTP.showHeaderHead({}))(_699.value0), 
            value: _699.value1
        };
    };
    var oboe = function (opts) {
        return oboe_(header2Obj, showVerb, opts);
    };
    var oboeGet = function (url) {
        return oboe((function () {
            var _2512 = {};
            for (var _2513 in oboeOptions) {
                if (oboeOptions.hasOwnProperty(_2513)) {
                    _2512[_2513] = oboeOptions[_2513];
                };
            };
            _2512.url = url;
            return _2512;
        })());
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
    var showBufferValueType = function (__unused) {
        return new Prelude.Show(function (_700) {
            if (_700 instanceof UInt8) {
                return "UInt8";
            };
            if (_700 instanceof UInt16LE) {
                return "UInt16LE";
            };
            if (_700 instanceof UInt16BE) {
                return "UInt16BE";
            };
            if (_700 instanceof UInt32LE) {
                return "UInt32LE";
            };
            if (_700 instanceof UInt32BE) {
                return "UInt32BE";
            };
            if (_700 instanceof Int8) {
                return "Int8";
            };
            if (_700 instanceof Int16LE) {
                return "Int16LE";
            };
            if (_700 instanceof Int16BE) {
                return "Int16BE";
            };
            if (_700 instanceof Int32LE) {
                return "Int32LE";
            };
            if (_700 instanceof Int32BE) {
                return "Int32BE";
            };
            if (_700 instanceof FloatLE) {
                return "FloatLE";
            };
            if (_700 instanceof FloatBE) {
                return "FloatBE";
            };
            if (_700 instanceof DoubleLE) {
                return "DoubleLE";
            };
            if (_700 instanceof DoubleBE) {
                return "DoubleBE";
            };
            throw new Error("Failed pattern match");
        });
    };
    var write = Prelude["<<<"](Prelude.semigroupoidArr({}))(writeImpl)(Prelude.show(showBufferValueType({})));
    var showBuffer = function (__unused) {
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
PS.Node_FS_Sync = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Function = PS.Data_Function;
    var Node_Encoding = PS.Node_Encoding;
    var Data_Date = PS.Data_Date;
    var Node_FS = PS.Node_FS;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Node_FS_Stats = PS.Node_FS_Stats;
    var fs = require('fs');;
    function mkEff(action) {  return action;};
    var writeTextFile = function (encoding) {
        return function (file) {
            return function (text) {
                return mkEff(function (_) {
                    return fs.writeFileSync(file, text, {
                        encoding: Prelude.show(Node_Encoding.showEncoding({}))(encoding)
                    });
                });
            };
        };
    };
    var writeFile = function (file) {
        return function (buff) {
            return mkEff(function (_) {
                return fs.writeFileSync(file, buff, {});
            });
        };
    };
    var utimes = function (file) {
        return function (atime) {
            return function (mtime) {
                return mkEff(function (_) {
                    return fs.utimesSync(file, Data_Date.toEpochMilliseconds(atime) / 1000, Data_Date.toEpochMilliseconds(mtime) / 1000);
                });
            };
        };
    };
    var unlink = function (file) {
        return mkEff(function (_) {
            return fs.unlinkSync(file);
        });
    };
    var truncate = function (file) {
        return function (len) {
            return mkEff(function (_) {
                return fs.truncateSync(file, len);
            });
        };
    };
    var symlink = function (src) {
        return function (dst) {
            return function (ty) {
                return mkEff(function (_) {
                    return fs.symlinkSync(src, dst, Prelude.show(Node_FS.showSymlinkType({}))(ty));
                });
            };
        };
    };
    var stat = function (file) {
        return Prelude["return"](Control_Monad_Eff.monadEff({}))(Node_FS_Stats.Stats.create(fs.statSync(file)));
    };
    var rmdir = function (file) {
        return mkEff(function (_) {
            return fs.rmdirSync(file);
        });
    };
    var rename = function (oldFile) {
        return function (newFile) {
            return mkEff(function (_) {
                return fs.renameSync(oldFile, newFile);
            });
        };
    };
    var realpath$prime = function (path) {
        return function (cache) {
            return mkEff(function (_) {
                return fs.realpathSync(path, cache);
            });
        };
    };
    var realpath = function (path) {
        return mkEff(function (_) {
            return fs.realpathSync(path, {});
        });
    };
    var readlink = function (path) {
        return mkEff(function (_) {
            return fs.readlinkSync(path);
        });
    };
    var readdir = function (file) {
        return mkEff(function (_) {
            return fs.readdirSync(file);
        });
    };
    var readTextFile = function (encoding) {
        return function (file) {
            return mkEff(function (_) {
                return fs.readFileSync(file, {
                    encoding: Prelude.show(Node_Encoding.showEncoding({}))(encoding)
                });
            });
        };
    };
    var readFile = function (file) {
        return mkEff(function (_) {
            return fs.readFileSync(file, {});
        });
    };
    var mkdir$prime = function (file) {
        return function (mode) {
            return mkEff(function (_) {
                return fs.mkdirSync(file, mode);
            });
        };
    };
    var mkdir = Prelude.flip(mkdir$prime)(777);
    var link = function (src) {
        return function (dst) {
            return mkEff(function (_) {
                return fs.linkSync(src, dst);
            });
        };
    };
    var chown = function (file) {
        return function (uid) {
            return function (gid) {
                return mkEff(function (_) {
                    return fs.chownSync(file, uid, gid);
                });
            };
        };
    };
    var chmod = function (file) {
        return function (mode) {
            return mkEff(function (_) {
                return fs.chmodSync(file, mode);
            });
        };
    };
    var appendTextFile = function (encoding) {
        return function (file) {
            return function (buff) {
                return mkEff(function (_) {
                    return fs.appendFileSync(file, buff, {
                        encoding: Prelude.show(Node_Encoding.showEncoding({}))(encoding)
                    });
                });
            };
        };
    };
    var appendFile = function (file) {
        return function (buff) {
            return mkEff(function (_) {
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
PS.Node_FS_Async = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Function = PS.Data_Function;
    var Data_Either = PS.Data_Either;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Node_Encoding = PS.Node_Encoding;
    var Node_FS_Stats = PS.Node_FS_Stats;
    var Node_FS = PS.Node_FS;
    var Data_Date = PS.Data_Date;
    function handleCallbackImpl(left, right, f) {  return function(err, value) {    if (err) f(left(err))();    else f(right(value))();  };};
    var fs = require('fs');;
    var handleCallback = function (cb) {
        return handleCallbackImpl(Data_Either.Left.create, Data_Either.Right.create, cb);
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
    var eventEmitterNWWindow = function (__unused) {
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
PS.Text_Parsing_Parser = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Control_Monad_Trans = PS.Control_Monad_Trans;
    var Data_Either = PS.Data_Either;
    var Control_Monad_State_Class = PS.Control_Monad_State_Class;
    var Data_Tuple = PS.Data_Tuple;
    var Control_Lazy = PS.Control_Lazy;
    var Control_Monad_Error = PS.Control_Monad_Error;
    var Control_Alt = PS.Control_Alt;
    var Control_Plus = PS.Control_Plus;
    var Control_Alternative = PS.Control_Alternative;
    var Control_MonadPlus = PS.Control_MonadPlus;
    function ParseError(value0) {
        this.value0 = value0;
    };
    ParseError.create = function (value0) {
        return new ParseError(value0);
    };
    var ParserT = {
        create: function (value) {
            return value;
        }
    };
    var unParserT = function (_701) {
        return _701;
    };
    var runParserT = function (__dict_Monad_672) {
        return function (s) {
            return function (p) {
                return Prelude[">>="](__dict_Monad_672["__superclass_Prelude.Bind_1"]({}))(unParserT(p)(s))(function (_46) {
                    return Prelude["return"](__dict_Monad_672)(_46.result);
                });
            };
        };
    };
    var runParser = function (s) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Monad_Identity.runIdentity)(runParserT(Control_Monad_Identity.monadIdentity({}))(s));
    };
    var monadTransParserT = function (__unused) {
        return new Control_Monad_Trans.MonadTrans(function (__dict_Monad_673) {
            return function (m) {
                return ParserT.create(function (s) {
                    return Prelude["<$>"](((__dict_Monad_673["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(function (a) {
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
    var monadStateParserT = function (__dict_Monad_674) {
        return new Control_Monad_State_Class.MonadState(function (f) {
            return ParserT.create(function (s) {
                return Prelude["return"](__dict_Monad_674)((function () {
                    var _2517 = f(s);
                    return {
                        input: _2517.value1, 
                        consumed: false, 
                        result: new Data_Either.Right(_2517.value0)
                    };
                })());
            });
        });
    };
    var lazy1ParserT = function (__unused) {
        return new Control_Lazy.Lazy1(function (f) {
            return ParserT.create(function (s) {
                return unParserT(f(Prelude.unit))(s);
            });
        });
    };
    var functorParserT = function (__dict_Functor_677) {
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
                    return Prelude["<$>"](__dict_Functor_677)(f$prime)(unParserT(p)(s));
                });
            };
        });
    };
    var fail = function (__dict_Monad_678) {
        return function (message) {
            return ParserT.create(function (s) {
                return Prelude["return"](__dict_Monad_678)({
                    input: s, 
                    consumed: false, 
                    result: new Data_Either.Left(new ParseError({
                        message: message
                    }))
                });
            });
        };
    };
    var errorParseError = function (__unused) {
        return new Control_Monad_Error.Error(new ParseError({
            message: ""
        }), function (msg) {
            return new ParseError({
                message: msg
            });
        });
    };
    var consume = function (__dict_Monad_680) {
        return ParserT.create(function (s) {
            return Prelude["return"](__dict_Monad_680)({
                consumed: true, 
                input: s, 
                result: new Data_Either.Right(Prelude.unit)
            });
        });
    };
    var applicativeParserT = function (__dict_Monad_683) {
        return new Prelude.Applicative(function (__unused) {
            return applyParserT(__dict_Monad_683);
        }, function (a) {
            return ParserT.create(function (s) {
                return Prelude.pure(__dict_Monad_683["__superclass_Prelude.Applicative_0"]({}))({
                    input: s, 
                    result: new Data_Either.Right(a), 
                    consumed: false
                });
            });
        });
    };
    var applyParserT = function (__dict_Monad_682) {
        return new Prelude.Apply(Prelude.ap(monadParserT(__dict_Monad_682)), function (__unused) {
            return functorParserT(((__dict_Monad_682["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}));
        });
    };
    var monadParserT = function (__dict_Monad_676) {
        return new Prelude.Monad(function (__unused) {
            return applicativeParserT(__dict_Monad_676);
        }, function (__unused) {
            return bindParserT(__dict_Monad_676);
        });
    };
    var bindParserT = function (__dict_Monad_681) {
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
                    return Prelude[">>="](__dict_Monad_681["__superclass_Prelude.Bind_1"]({}))(unParserT(p)(s))(function (o) {
                        if (o.result instanceof Data_Either.Left) {
                            return Prelude["return"](__dict_Monad_681)({
                                input: o.input, 
                                result: new Data_Either.Left(o.result.value0), 
                                consumed: o.consumed
                            });
                        };
                        if (o.result instanceof Data_Either.Right) {
                            return Prelude["<$>"](((__dict_Monad_681["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(updateConsumedFlag(o.consumed))(unParserT(f(o.result.value0))(o.input));
                        };
                        throw new Error("Failed pattern match");
                    });
                });
            };
        }, function (__unused) {
            return applyParserT(__dict_Monad_681);
        });
    };
    var altParserT = function (__dict_Monad_685) {
        return new Control_Alt.Alt(function (p1) {
            return function (p2) {
                return ParserT.create(function (s) {
                    return Prelude[">>="](__dict_Monad_685["__superclass_Prelude.Bind_1"]({}))(unParserT(p1)(s))(function (o) {
                        if (o.result instanceof Data_Either.Left && !o.consumed) {
                            return unParserT(p2)(s);
                        };
                        return Prelude["return"](__dict_Monad_685)(o);
                    });
                });
            };
        }, function (__unused) {
            return functorParserT(((__dict_Monad_685["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}));
        });
    };
    var plusParserT = function (__dict_Monad_679) {
        return new Control_Plus.Plus(function (__unused) {
            return altParserT(__dict_Monad_679);
        }, fail(__dict_Monad_679)("No alternative"));
    };
    var alternativeParserT = function (__dict_Monad_684) {
        return new Control_Alternative.Alternative(function (__unused) {
            return plusParserT(__dict_Monad_684);
        }, function (__unused) {
            return applicativeParserT(__dict_Monad_684);
        });
    };
    var monadPlusParserT = function (__dict_Monad_675) {
        return new Control_MonadPlus.MonadPlus(function (__unused) {
            return alternativeParserT(__dict_Monad_675);
        }, function (__unused) {
            return monadParserT(__dict_Monad_675);
        });
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
        altParserT: altParserT, 
        plusParserT: plusParserT, 
        alternativeParserT: alternativeParserT, 
        bindParserT: bindParserT, 
        monadParserT: monadParserT, 
        monadPlusParserT: monadPlusParserT, 
        monadTransParserT: monadTransParserT, 
        monadStateParserT: monadStateParserT, 
        lazy1ParserT: lazy1ParserT
    };
})();
var PS = PS || {};
PS.Text_Parsing_Parser_Combinators = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Alt = PS.Control_Alt;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Data_Either = PS.Data_Either;
    var Control_Alternative = PS.Control_Alternative;
    var Data_Maybe = PS.Data_Maybe;
    var $less$qmark$greater = function (__dict_Monad_686) {
        return function (p) {
            return function (msg) {
                return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_686))(p)(Text_Parsing_Parser.fail(__dict_Monad_686)("Expected " + msg));
            };
        };
    };
    var $$try = function (__dict_Functor_687) {
        return function (p) {
            var try$prime = function (_703) {
                return function (_704) {
                    if (_704.result instanceof Data_Either.Left) {
                        return {
                            input: _703, 
                            result: _704.result, 
                            consumed: false
                        };
                    };
                    return _704;
                };
            };
            return Text_Parsing_Parser.ParserT.create(function (s) {
                return Prelude["<$>"](__dict_Functor_687)(try$prime(s))(Text_Parsing_Parser.unParserT(p)(s));
            });
        };
    };
    var sepEndBy = function (__dict_Monad_688) {
        return function (p) {
            return function (sep) {
                return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_688))(sepEndBy1(__dict_Monad_688)(p)(sep))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_688))([  ]));
            };
        };
    };
    var sepEndBy1 = function (__dict_Monad_689) {
        return function (p) {
            return function (sep) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_689))(p)(function (_51) {
                    return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_689))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_689))(sep)(function (__unused) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_689))(sepEndBy(__dict_Monad_689)(p)(sep))(function (_50) {
                            return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_689))(Prelude[":"](_51)(_50));
                        });
                    }))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_689))([ _51 ]));
                });
            };
        };
    };
    var sepBy1 = function (__dict_Monad_690) {
        return function (p) {
            return function (sep) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_690))(p)(function (_49) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_690))(Control_Alternative.many(Text_Parsing_Parser.alternativeParserT(__dict_Monad_690))(Text_Parsing_Parser.lazy1ParserT({}))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_690))(sep)(function (__unused) {
                        return p;
                    })))(function (_48) {
                        return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_690))(Prelude[":"](_49)(_48));
                    });
                });
            };
        };
    };
    var sepBy = function (__dict_Monad_691) {
        return function (p) {
            return function (sep) {
                return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_691))(sepBy1(__dict_Monad_691)(p)(sep))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_691))([  ]));
            };
        };
    };
    var optional = function (__dict_Monad_692) {
        return function (p) {
            return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_692))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_692))(p)(function (__unused) {
                return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_692))({});
            }))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_692))({}));
        };
    };
    var option = function (__dict_Monad_693) {
        return function (a) {
            return function (p) {
                return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_693))(p)(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_693))(a));
            };
        };
    };
    var optionMaybe = function (__dict_Functor_694) {
        return function (__dict_Monad_695) {
            return function (p) {
                return option(__dict_Monad_695)(Data_Maybe.Nothing.value)(Prelude["<$>"](Text_Parsing_Parser.functorParserT(__dict_Functor_694))(Data_Maybe.Just.create)(p));
            };
        };
    };
    var endBy1 = function (__dict_Monad_696) {
        return function (p) {
            return function (sep) {
                return Control_Alternative.some(Text_Parsing_Parser.alternativeParserT(__dict_Monad_696))(Text_Parsing_Parser.lazy1ParserT({}))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_696))(p)(function (_52) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_696))(sep)(function (__unused) {
                        return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_696))(_52);
                    });
                }));
            };
        };
    };
    var endBy = function (__dict_Monad_697) {
        return function (p) {
            return function (sep) {
                return Control_Alternative.many(Text_Parsing_Parser.alternativeParserT(__dict_Monad_697))(Text_Parsing_Parser.lazy1ParserT({}))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_697))(p)(function (_53) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_697))(sep)(function (__unused) {
                        return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_697))(_53);
                    });
                }));
            };
        };
    };
    var choice = function (__dict_Monad_698) {
        return function (_702) {
            if (_702.length === 0) {
                return Text_Parsing_Parser.fail(__dict_Monad_698)("Nothing to parse");
            };
            if (_702.length === 1) {
                return _702[0];
            };
            if (_702.length > 0) {
                var _2538 = _702.slice(1);
                return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_698))(_702[0])(choice(__dict_Monad_698)(_2538));
            };
            throw new Error("Failed pattern match");
        };
    };
    var chainr1 = function (__dict_Monad_699) {
        return function (p) {
            return function (f) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_699))(p)(function (_57) {
                    return chainr1$prime(__dict_Monad_699)(p)(f)(_57);
                });
            };
        };
    };
    var chainr1$prime = function (__dict_Monad_700) {
        return function (p) {
            return function (f) {
                return function (a) {
                    return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_700))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_700))(f)(function (_59) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_700))(chainr1(__dict_Monad_700)(p)(f))(function (_58) {
                            return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_700))(_59(a)(_58));
                        });
                    }))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_700))(a));
                };
            };
        };
    };
    var chainr = function (__dict_Monad_701) {
        return function (p) {
            return function (f) {
                return function (a) {
                    return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_701))(chainr1(__dict_Monad_701)(p)(f))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_701))(a));
                };
            };
        };
    };
    var chainl1$prime = function (__dict_Monad_702) {
        return function (p) {
            return function (f) {
                return function (a) {
                    return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_702))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_702))(f)(function (_56) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_702))(p)(function (_55) {
                            return chainl1$prime(__dict_Monad_702)(p)(f)(_56(a)(_55));
                        });
                    }))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_702))(a));
                };
            };
        };
    };
    var chainl1 = function (__dict_Monad_703) {
        return function (p) {
            return function (f) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_703))(p)(function (_54) {
                    return chainl1$prime(__dict_Monad_703)(p)(f)(_54);
                });
            };
        };
    };
    var chainl = function (__dict_Monad_704) {
        return function (p) {
            return function (f) {
                return function (a) {
                    return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_704))(chainl1(__dict_Monad_704)(p)(f))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_704))(a));
                };
            };
        };
    };
    var between = function (__dict_Monad_705) {
        return function (open) {
            return function (close) {
                return function (p) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_705))(open)(function (__unused) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_705))(p)(function (_47) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_705))(close)(function (__unused) {
                                return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_705))(_47);
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
        "<?>": $less$qmark$greater
    };
})();
var PS = PS || {};
PS.Text_Parsing_Parser_Expr = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Control_Alt = PS.Control_Alt;
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
    var termP = function (__dict_Monad_706) {
        return function (prefixP) {
            return function (term) {
                return function (postfixP) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_706))(prefixP)(function (_69) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_706))(term)(function (_68) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_706))(postfixP)(function (_67) {
                                return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_706))(_67(_69(_68)));
                            });
                        });
                    });
                };
            };
        };
    };
    var splitOp = function (_705) {
        return function (_706) {
            if (_705 instanceof Infix && _705.value1 instanceof AssocNone) {
                var _2551 = {};
                for (var _2552 in _706) {
                    if (_706.hasOwnProperty(_2552)) {
                        _2551[_2552] = _706[_2552];
                    };
                };
                _2551.nassoc = Prelude[":"](_705.value0)(_706.nassoc);
                return _2551;
            };
            if (_705 instanceof Infix && _705.value1 instanceof AssocLeft) {
                var _2555 = {};
                for (var _2556 in _706) {
                    if (_706.hasOwnProperty(_2556)) {
                        _2555[_2556] = _706[_2556];
                    };
                };
                _2555.lassoc = Prelude[":"](_705.value0)(_706.lassoc);
                return _2555;
            };
            if (_705 instanceof Infix && _705.value1 instanceof AssocRight) {
                var _2559 = {};
                for (var _2560 in _706) {
                    if (_706.hasOwnProperty(_2560)) {
                        _2559[_2560] = _706[_2560];
                    };
                };
                _2559.rassoc = Prelude[":"](_705.value0)(_706.rassoc);
                return _2559;
            };
            if (_705 instanceof Prefix) {
                var _2563 = {};
                for (var _2564 in _706) {
                    if (_706.hasOwnProperty(_2564)) {
                        _2563[_2564] = _706[_2564];
                    };
                };
                _2563.prefix = Prelude[":"](_705.value0)(_706.prefix);
                return _2563;
            };
            if (_705 instanceof Postfix) {
                var _2566 = {};
                for (var _2567 in _706) {
                    if (_706.hasOwnProperty(_2567)) {
                        _2566[_2567] = _706[_2567];
                    };
                };
                _2566.postfix = Prelude[":"](_705.value0)(_706.postfix);
                return _2566;
            };
            throw new Error("Failed pattern match");
        };
    };
    var rassocP = function (__dict_Monad_707) {
        return function (x) {
            return function (rassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_707))(rassocOp)(function (_62) {
                                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_707))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_707))(termP(__dict_Monad_707)(prefixP)(term)(postfixP))(function (_60) {
                                    return rassocP1(__dict_Monad_707)(_60)(rassocOp)(prefixP)(term)(postfixP);
                                }))(function (_61) {
                                    return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_707))(_62(x)(_61));
                                });
                            });
                        };
                    };
                };
            };
        };
    };
    var rassocP1 = function (__dict_Monad_708) {
        return function (x) {
            return function (rassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_708))(rassocP(__dict_Monad_708)(x)(rassocOp)(prefixP)(term)(postfixP))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_708))(x));
                        };
                    };
                };
            };
        };
    };
    var nassocP = function (__dict_Monad_709) {
        return function (x) {
            return function (nassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_709))(nassocOp)(function (_66) {
                                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_709))(termP(__dict_Monad_709)(prefixP)(term)(postfixP))(function (_65) {
                                    return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_709))(_66(x)(_65));
                                });
                            });
                        };
                    };
                };
            };
        };
    };
    var lassocP = function (__dict_Monad_710) {
        return function (x) {
            return function (lassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_710))(lassocOp)(function (_64) {
                                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_710))(termP(__dict_Monad_710)(prefixP)(term)(postfixP))(function (_63) {
                                    return lassocP1(__dict_Monad_710)(_64(x)(_63))(lassocOp)(prefixP)(term)(postfixP);
                                });
                            });
                        };
                    };
                };
            };
        };
    };
    var lassocP1 = function (__dict_Monad_711) {
        return function (x) {
            return function (lassocOp) {
                return function (prefixP) {
                    return function (term) {
                        return function (postfixP) {
                            return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_711))(lassocP(__dict_Monad_711)(x)(lassocOp)(prefixP)(term)(postfixP))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_711))(x));
                        };
                    };
                };
            };
        };
    };
    var buildExprParser = function (__dict_Monad_712) {
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
                        var rassocOp = Text_Parsing_Parser_Combinators.choice(__dict_Monad_712)(accum.rassoc);
                        var lassocOp = Text_Parsing_Parser_Combinators.choice(__dict_Monad_712)(accum.lassoc);
                        var nassocOp = Text_Parsing_Parser_Combinators.choice(__dict_Monad_712)(accum.nassoc);
                        var prefixOp = Text_Parsing_Parser_Combinators["<?>"](__dict_Monad_712)(Text_Parsing_Parser_Combinators.choice(__dict_Monad_712)(accum.prefix))("");
                        var postfixOp = Text_Parsing_Parser_Combinators["<?>"](__dict_Monad_712)(Text_Parsing_Parser_Combinators.choice(__dict_Monad_712)(accum.postfix))("");
                        var postfixP = Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_712))(postfixOp)(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_712))(Prelude.id(Prelude.categoryArr({}))));
                        var prefixP = Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_712))(prefixOp)(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_712))(Prelude.id(Prelude.categoryArr({}))));
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_712))(termP(__dict_Monad_712)(prefixP)(term)(postfixP))(function (_70) {
                            return Text_Parsing_Parser_Combinators["<?>"](__dict_Monad_712)(Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_712))(Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_712))(Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_712))(rassocP(__dict_Monad_712)(_70)(rassocOp)(prefixP)(term)(postfixP))(lassocP(__dict_Monad_712)(_70)(lassocOp)(prefixP)(term)(postfixP)))(nassocP(__dict_Monad_712)(_70)(nassocOp)(prefixP)(term)(postfixP)))(Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_712))(_70)))("operator");
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
    var Control_Alternative = PS.Control_Alternative;
    var Control_Alt = PS.Control_Alt;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Monoid = PS.Data_Monoid;
    var Text_Parsing_Parser_Combinators = PS.Text_Parsing_Parser_Combinators;
    var string = function (__dict_Monad_713) {
        return function (s) {
            return Text_Parsing_Parser.ParserT.create(function (s$prime) {
                return Prelude["return"](__dict_Monad_713)((function () {
                    var _2577 = Data_String.indexOf(s)(s$prime);
                    if (_2577 === 0) {
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
                })());
            });
        };
    };
    var whiteSpace = function (__dict_Monad_714) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_714))(Control_Alternative.many(Text_Parsing_Parser.alternativeParserT(__dict_Monad_714))(Text_Parsing_Parser.lazy1ParserT({}))(Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_714))(Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_714))(Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_714))(string(__dict_Monad_714)("\n"))(string(__dict_Monad_714)("\r")))(string(__dict_Monad_714)(" ")))(string(__dict_Monad_714)("\t"))))(function (_72) {
            return Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_714))(Data_Foldable.foldMap(Data_Foldable.foldableArray({}))(Data_Monoid.monoidString({}))(Prelude.id(Prelude.categoryArr({})))(_72));
        });
    };
    var eof = function (__dict_Monad_715) {
        return Text_Parsing_Parser.ParserT.create(function (s) {
            return Prelude["return"](__dict_Monad_715)((function () {
                if (s === "") {
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
            })());
        });
    };
    var $$char = function (__dict_Monad_716) {
        return Text_Parsing_Parser.ParserT.create(function (s$prime) {
            return Prelude["return"](__dict_Monad_716)((function () {
                if (s$prime === "") {
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
            })());
        });
    };
    var satisfy = function (__dict_Monad_717) {
        return function (f) {
            return Text_Parsing_Parser_Combinators["try"](((__dict_Monad_717["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_717))($$char(__dict_Monad_717))(function (_71) {
                return f(_71) ? Prelude["return"](Text_Parsing_Parser.monadParserT(__dict_Monad_717))(_71) : Text_Parsing_Parser.fail(__dict_Monad_717)("Character did not satisfy predicate");
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
    var Control_Apply = PS.Control_Apply;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Text_Parsing_Parser_String = PS.Text_Parsing_Parser_String;
    var Control_Alt = PS.Control_Alt;
    var Data_String = PS.Data_String;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Data_Foldable = PS.Data_Foldable;
    var Control_Alternative = PS.Control_Alternative;
    var Text_Parsing_Parser_Combinators = PS.Text_Parsing_Parser_Combinators;
    var Global = PS.Global;
    var Data_Array = PS.Data_Array;
    var Data_Map = PS.Data_Map;
    var Data_Tuple = PS.Data_Tuple;
    var solidus = "/";
    var skipSpaces = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.whiteSpace(Control_Monad_Identity.monadIdentity({})))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))({}));
    var skipMany = function (__dict_Monad_718) {
        return function (p) {
            return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_718))(skipMany1(__dict_Monad_718)(p))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_718))({}));
        };
    };
    var skipMany1 = function (__dict_Monad_719) {
        return function (p) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_719))(p)(function (_95) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_719))(skipMany(__dict_Monad_719)(p))(function (_94) {
                    return Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_719))({});
                });
            });
        };
    };
    var showParseError = function (__unused) {
        return new Prelude.Show(function (_715) {
            return _715.value0.message;
        });
    };
    var reverseSolidus = "\\";
    var ord = Data_String.charCodeAt(0);
    var openBracket = "[";
    var openBrace = "{";
    var nullParser = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("null")))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonNull));
    var noneOf = function (__dict_Monad_720) {
        return function (ss) {
            return Text_Parsing_Parser_String.satisfy(__dict_Monad_720)(Prelude.flip(Data_Foldable.notElem(Prelude.eqString({}))(Data_Foldable.foldableArray({})))(ss));
        };
    };
    var newline = "n";
    var manyTill = function (__dict_Monad_721) {
        return function (p) {
            return function (end) {
                var scan = Control_Alt["<|>"](Text_Parsing_Parser.altParserT(__dict_Monad_721))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_721))(end)(function (__unused) {
                    return Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_721))([  ]);
                }))(Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_721))(p)(function (_98) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_721))(scan)(function (_97) {
                        return Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_721))(Prelude[":"](_98)(_97));
                    });
                }));
                return scan;
            };
        };
    };
    var many1Till = function (__dict_Monad_722) {
        return function (p) {
            return function (end) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_722))(p)(function (_100) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(__dict_Monad_722))(manyTill(__dict_Monad_722)(p)(end))(function (_99) {
                        return Prelude.pure(Text_Parsing_Parser.applicativeParserT(__dict_Monad_722))(Prelude[":"](_100)(_99));
                    });
                });
            };
        };
    };
    var lookAhead = function (__dict_Monad_723) {
        return function (_714) {
            return function (s) {
                return Prelude[">>="](__dict_Monad_723["__superclass_Prelude.Bind_1"]({}))(_714(s))(function (_96) {
                    return Prelude.pure(__dict_Monad_723["__superclass_Prelude.Applicative_0"]({}))((function () {
                        var _2592 = {};
                        for (var _2593 in _96) {
                            if (_96.hasOwnProperty(_2593)) {
                                _2592[_2593] = _96[_2593];
                            };
                        };
                        _2592.input = s;
                        _2592.consumed = false;
                        return _2592;
                    })());
                });
            };
        };
    };
    var isHexAlpha = function (str) {
        var n = ord(str);
        return 65 <= n && n <= 70 || 97 <= n && n <= 102;
    };
    var isDigit = function (_713) {
        if (48 <= ord(_713) && ord(_713) <= 57) {
            return true;
        };
        return false;
    };
    var isHex = Prelude["<*>"](Prelude.applyArr({}))(Prelude["<$>"](Prelude.functorArr({}))(Prelude["||"](Prelude.boolLikeBoolean({})))(isDigit))(isHexAlpha);
    var oneToNine = function (str) {
        return isDigit(str) && str !== "0";
    };
    var invalidJson = function (expected) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Control_Alternative.many(Text_Parsing_Parser.alternativeParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser.lazy1ParserT({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (s) {
            return Text_Parsing_Parser.fail(Control_Monad_Identity.monadIdentity({}))("Invalid JSON:\n\t" + "Expected " + expected + ".\n\t" + "Found: " + Data_String.joinWith("")(s));
        });
    };
    var normalChar = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_86) {
        if (_86 === "\"") {
            return invalidJson("unicode character");
        };
        if (_86 === "\\") {
            return invalidJson("unicode character");
        };
        return Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}));
    });
    var horizontalTab = "t";
    var hexDigit = Text_Parsing_Parser_String.satisfy(Control_Monad_Identity.monadIdentity({}))(isHex);
    var unicodeParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("u"))(function (_93) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(hexDigit)(function (_92) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(hexDigit)(function (_91) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(hexDigit)(function (_90) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(hexDigit)(function (_89) {
                        return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(_93 + _92 + _91 + _90 + _89);
                    });
                });
            });
        });
    });
    var formfeed = "f";
    var doubleQuote = "\"";
    var quoted = function (__dict_Monad_724) {
        return Text_Parsing_Parser_Combinators.between(__dict_Monad_724)(Text_Parsing_Parser_String.string(__dict_Monad_724)(doubleQuote))(Text_Parsing_Parser_String.string(__dict_Monad_724)(doubleQuote));
    };
    var emptyStringParser = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(quoted(Control_Monad_Identity.monadIdentity({}))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))("")));
    var digit = Text_Parsing_Parser_String.satisfy(Control_Monad_Identity.monadIdentity({}))(isDigit);
    var digits = Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Data_String.joinWith(""))(manyTill(Control_Monad_Identity.monadIdentity({}))(digit)(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String.satisfy(Control_Monad_Identity.monadIdentity({}))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.not(Prelude.boolLikeBoolean({})))(isDigit)))));
    var expParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Control_Alt["<|>"](Text_Parsing_Parser.altParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("e")))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("E")))(function (_85) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators.option(Control_Monad_Identity.monadIdentity({}))("")(Control_Alt["<|>"](Text_Parsing_Parser.altParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("+")))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("-")))))(function (_84) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(digits)(function (_83) {
                return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(_85 + _84 + _83);
            });
        });
    });
    var fracParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("."))(function (__unused) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(digits)(function (_82) {
            return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))("." + _82);
        });
    });
    var numberParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__unused) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators.option(Control_Monad_Identity.monadIdentity({}))("")(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("-")))(function (_81) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_80) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))((function () {
                    if (_80 === "0") {
                        return Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}));
                    };
                    if (oneToNine(_80)) {
                        return digits;
                    };
                    return invalidJson("digit");
                })())(function (_79) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators.option(Control_Monad_Identity.monadIdentity({}))("")(fracParser))(function (_78) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators.option(Control_Monad_Identity.monadIdentity({}))("")(expParser))(function (_77) {
                            return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.fromNumber(Global.readFloat(_81 + _79 + _78 + _77)));
                        });
                    });
                });
            });
        });
    });
    var controlChar = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_88) {
        if (_88 === "\\") {
            return Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({})))(Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_87) {
                return Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}));
            }));
        };
        return invalidJson("control character");
    });
    var nonEmptyStringParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__unused) {
        return Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Data_String.joinWith(""))(quoted(Control_Monad_Identity.monadIdentity({}))(manyTill(Control_Monad_Identity.monadIdentity({}))(Control_Alt["<|>"](Text_Parsing_Parser.altParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(normalChar))(controlChar))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))(doubleQuote)))));
    });
    var rawStringParser = Control_Alt["<|>"](Text_Parsing_Parser.altParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(emptyStringParser))(nonEmptyStringParser);
    var stringParser = Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Data_Argonaut_Core.fromString)(rawStringParser);
    var comma = ",";
    var closeBracket = "]";
    var closeBrace = "}";
    var carriageReturn = "r";
    var brackets = function (__dict_Monad_725) {
        return Text_Parsing_Parser_Combinators.between(__dict_Monad_725)(Text_Parsing_Parser_String.string(__dict_Monad_725)(openBracket))(Text_Parsing_Parser_String.string(__dict_Monad_725)(closeBracket));
    };
    var emptyArrayParser = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(brackets(Control_Monad_Identity.monadIdentity({}))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonEmptyArray))));
    var braces = function (__dict_Monad_726) {
        return Text_Parsing_Parser_Combinators.between(__dict_Monad_726)(Text_Parsing_Parser_String.string(__dict_Monad_726)(openBrace))(Text_Parsing_Parser_String.string(__dict_Monad_726)(closeBrace));
    };
    var emptyObjectParser = Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(braces(Control_Monad_Identity.monadIdentity({}))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonEmptyObject))));
    var booleanParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__unused) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_76) {
            if (_76 === "t") {
                return Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("true"))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonTrue));
            };
            if (_76 === "f") {
                return Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))("false"))(Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(Data_Argonaut_Core.jsonFalse));
            };
            return invalidJson("one of 'true' or 'false'");
        });
    });
    var backspace = "b";
    var arrayParser = function (_708) {
        return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(emptyArrayParser))(nonEmptyArrayParser);
    };
    var nonEmptyArrayParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__unused) {
        return Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Data_Argonaut_Core.fromArray)(brackets(Control_Monad_Identity.monadIdentity({}))(Control_Apply["<*"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(Text_Parsing_Parser_Combinators.sepBy(Control_Monad_Identity.monadIdentity({}))(valueParser(Prelude.unit))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))(comma))))(skipSpaces)));
    });
    var valueParser = function (_712) {
        return Text_Parsing_Parser_Combinators.choice(Control_Monad_Identity.monadIdentity({}))(Prelude["<$>"](Data_Array.functorArray({}))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({})))([ nullParser, booleanParser, stringParser, objectParser(Prelude.unit), arrayParser(Prelude.unit), numberParser ]));
    };
    var objectParser = function (_707) {
        return Control_Alt["<|>"](Text_Parsing_Parser.altParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_Combinators["try"](Control_Monad_Identity.functorIdentity({}))(emptyObjectParser))(nonEmptyObjectParser(Prelude.unit));
    };
    var nonEmptyObjectParser = function (_709) {
        return Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(braces(Control_Monad_Identity.monadIdentity({}))(Control_Apply["<*"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(Control_Apply["*>"](Text_Parsing_Parser.applyParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(membersParser(Prelude.unit)))(skipSpaces)));
    };
    var membersParser = function (_710) {
        return Prelude["<$>"](Text_Parsing_Parser.functorParserT(Control_Monad_Identity.functorIdentity({})))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Map.fromList(Prelude.ordString({})))(Data_Argonaut_Core.fromObject))(Text_Parsing_Parser_Combinators.sepBy1(Control_Monad_Identity.monadIdentity({}))(memberParser(Prelude.unit))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))(comma)));
    };
    var memberParser = function (_711) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__unused) {
            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(rawStringParser)(function (_75) {
                return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__unused) {
                    return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(Text_Parsing_Parser_String.string(Control_Monad_Identity.monadIdentity({}))(":"))(function (__unused) {
                        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__unused) {
                            return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(valueParser(Prelude.unit))(function (_74) {
                                return Prelude.pure(Text_Parsing_Parser.applicativeParserT(Control_Monad_Identity.monadIdentity({})))(new Data_Tuple.Tuple(_75, _74));
                            });
                        });
                    });
                });
            });
        });
    };
    var jsonParser = Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(skipSpaces)(function (__unused) {
        return Prelude[">>="](Text_Parsing_Parser.bindParserT(Control_Monad_Identity.monadIdentity({})))(lookAhead(Control_Monad_Identity.monadIdentity({}))(Text_Parsing_Parser_String["char"](Control_Monad_Identity.monadIdentity({}))))(function (_73) {
            if (_73 === "{") {
                return objectParser(Prelude.unit);
            };
            if (_73 === "[") {
                return arrayParser(Prelude.unit);
            };
            return invalidJson("object or array");
        });
    });
    return {
        jsonParser: jsonParser, 
        showParseError: showParseError
    };
})();
var PS = PS || {};
PS.Data_Argonaut = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Argonaut_Combinators = PS.Data_Argonaut_Combinators;
    var Data_Argonaut_Core = PS.Data_Argonaut_Core;
    var Data_Argonaut_Printer = PS.Data_Argonaut_Printer;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var Data_Argonaut_Parser = PS.Data_Argonaut_Parser;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var $tilde$greater = Data_Argonaut_Combinators["~>"];
    var $qmark$greater$greater$eq = Data_Argonaut_Combinators["?>>="];
    var $colon$eq = Data_Argonaut_Combinators[":="];
    var toString = Data_Argonaut_Core.toString;
    var toObject = Data_Argonaut_Core.toObject;
    var toNumber = Data_Argonaut_Core.toNumber;
    var toNull = Data_Argonaut_Core.toNull;
    var toBoolean = Data_Argonaut_Core.toBoolean;
    var toArray = Data_Argonaut_Core.toArray;
    var stringL = Data_Argonaut_Core.stringL;
    var printJson = Data_Argonaut_Printer.printJson;
    var objectL = Data_Argonaut_Core.objectL;
    var objectFieldL = Data_Argonaut_Decode.objectFieldL;
    var numberL = Data_Argonaut_Core.numberL;
    var nullL = Data_Argonaut_Core.nullL;
    var jsonZero = Data_Argonaut_Core.jsonZero;
    var jsonTrue = Data_Argonaut_Core.jsonTrue;
    var jsonStringL = Data_Argonaut_Core.jsonStringL;
    var jsonSingletonObject = Data_Argonaut_Core.jsonSingletonObject;
    var jsonSingletonArray = Data_Argonaut_Core.jsonSingletonArray;
    var jsonParser = Data_Argonaut_Parser.jsonParser;
    var jsonObjectL = Data_Argonaut_Core.jsonObjectL;
    var jsonNumberL = Data_Argonaut_Core.jsonNumberL;
    var jsonNullL = Data_Argonaut_Core.jsonNullL;
    var jsonNull = Data_Argonaut_Core.jsonNull;
    var jsonFalse = Data_Argonaut_Core.jsonFalse;
    var jsonEmptyString = Data_Argonaut_Core.jsonEmptyString;
    var jsonEmptyObject = Data_Argonaut_Core.jsonEmptyObject;
    var jsonEmptyArray = Data_Argonaut_Core.jsonEmptyArray;
    var jsonBooleanL = Data_Argonaut_Core.jsonBooleanL;
    var jsonArrayL = Data_Argonaut_Core.jsonArrayL;
    var isString = Data_Argonaut_Core.isString;
    var isObject = Data_Argonaut_Core.isObject;
    var isNumber = Data_Argonaut_Core.isNumber;
    var isNull = Data_Argonaut_Core.isNull;
    var isBoolean = Data_Argonaut_Core.isBoolean;
    var isArray = Data_Argonaut_Core.isArray;
    var fromString = Data_Argonaut_Core.fromString;
    var fromObject = Data_Argonaut_Core.fromObject;
    var fromNumber = Data_Argonaut_Core.fromNumber;
    var fromNull = Data_Argonaut_Core.fromNull;
    var fromBoolean = Data_Argonaut_Core.fromBoolean;
    var fromArray = Data_Argonaut_Core.fromArray;
    var foldJsonString = Data_Argonaut_Core.foldJsonString;
    var foldJsonObject = Data_Argonaut_Core.foldJsonObject;
    var foldJsonNumber = Data_Argonaut_Core.foldJsonNumber;
    var foldJsonNull = Data_Argonaut_Core.foldJsonNull;
    var foldJsonBoolean = Data_Argonaut_Core.foldJsonBoolean;
    var foldJsonArray = Data_Argonaut_Core.foldJsonArray;
    var foldJson = Data_Argonaut_Core.foldJson;
    var encodeJson = Data_Argonaut_Encode.encodeJson;
    var decodeMaybe = Data_Argonaut_Decode.decodeMaybe;
    var decodeL = Data_Argonaut_Decode.decodeL;
    var decodeJson = Data_Argonaut_Decode.decodeJson;
    var booleanL = Data_Argonaut_Core.booleanL;
    var arrayL = Data_Argonaut_Core.arrayL;
    var arrayIndexL = Data_Argonaut_Decode.arrayIndexL;
    return {
        printJson: printJson, 
        jsonParser: jsonParser, 
        encodeJson: encodeJson, 
        objectFieldL: objectFieldL, 
        arrayIndexL: arrayIndexL, 
        decodeL: decodeL, 
        decodeMaybe: decodeMaybe, 
        decodeJson: decodeJson, 
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
        isObject: isObject, 
        isArray: isArray, 
        isString: isString, 
        isNumber: isNumber, 
        isBoolean: isBoolean, 
        isNull: isNull, 
        foldJsonObject: foldJsonObject, 
        foldJsonArray: foldJsonArray, 
        foldJsonString: foldJsonString, 
        foldJsonNumber: foldJsonNumber, 
        foldJsonBoolean: foldJsonBoolean, 
        foldJsonNull: foldJsonNull, 
        foldJson: foldJson, 
        "?>>=": $qmark$greater$greater$eq, 
        "~>": $tilde$greater, 
        ":=": $colon$eq
    };
})();
var PS = PS || {};
PS.Node_UUID = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foreign = PS.Data_Foreign;
    var Data_Either = PS.Data_Either;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Data_Argonaut = PS.Data_Argonaut;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var uuid;try {  require;  uuid = require('node-uuid');} catch (e) {  uuid = window.uuid;};
    function showuuid(ident) {  return ident.toString();};
    function v1() {  return uuid.v1();};
    function v4() {  return uuid.v4();};
    function runUUID(UUID) {  return UUID();};
    function parse(str) {  return uuid.parse(str);};
    function unparse(buffer) {  return uuid.unparse(buffer);};
    var showUUID = function (__unused) {
        return new Prelude.Show(function (ident) {
            return showuuid(ident);
        });
    };
    var readUUID = function (__unused) {
        return new Data_Foreign.ReadForeign(new Data_Foreign.ForeignParser(function (x) {
            return Data_Either.Right.create(unparse(parse(Prelude.show(Data_Foreign.showForeign({}))(x))));
        }));
    };
    var eqUUID = function (__unused) {
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
    var encodeJsonUUID = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (uuid_1) {
            return Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(Prelude.show(showUUID({}))(uuid_1));
        });
    };
    var decodeJsonUUID = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toString(json))("UUID"))(Prelude[">>>"](Prelude.semigroupoidArr({}))(parse)(Prelude[">>>"](Prelude.semigroupoidArr({}))(unparse)(Data_Either.Right.create)));
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
        readUUID: readUUID, 
        decodeJsonUUID: decodeJsonUUID, 
        encodeJsonUUID: encodeJsonUUID
    };
})();
var PS = PS || {};
PS.SlamData_Types_Workspace_FileSystem = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var Data_Either = PS.Data_Either;
    var Data_Argonaut = PS.Data_Argonaut;
    var Data_Map = PS.Data_Map;
    var FileType = {
        create: function (value) {
            return value;
        }
    };
    var FileTypes = {
        create: function (value) {
            return value;
        }
    };
    var eqFileType = function (__unused) {
        return new Prelude.Eq(function (ft) {
            return function (ft$prime) {
                return !Prelude["=="](eqFileType({}))(ft)(ft$prime);
            };
        }, function (_716) {
            return function (_717) {
                return _716.name === _717.name && _716.type === _717.type && Prelude["=="](Prelude.eqArray(eqFileType({})))(_716.children)(_717.children);
            };
        });
    };
    var ordFileType = function (__unused) {
        return new Prelude.Ord(eqFileType, function (_718) {
            return function (_719) {
                return _718.type === _719.type ? Prelude.compare(Prelude.ordString({}))(_718.name)(_719.name) : _718.type === "directory" ? Prelude.LT.value : Prelude.GT.value;
            };
        });
    };
    var decodeFileType = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("FileType"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("name")(obj))("name"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_103) {
                    return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("type")(obj))("type"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_102) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("children")(obj))("children"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeArray(decodeFileType({})))))(function (_101) {
                            return Prelude.pure(Data_Either.applicativeEither({}))({
                                name: _103, 
                                type: _102, 
                                children: _101
                            });
                        });
                    });
                });
            });
        });
    };
    var decodeFileTypes = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("FileTypes"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("children")(obj))("children"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeArray(decodeFileType({})))))(function (_104) {
                    return Prelude.pure(Data_Either.applicativeEither({}))({
                        children: _104
                    });
                });
            });
        });
    };
    return {
        FileTypes: FileTypes, 
        FileType: FileType, 
        eqFileType: eqFileType, 
        ordFileType: ordFileType, 
        decodeFileType: decodeFileType, 
        decodeFileTypes: decodeFileTypes
    };
})();
var PS = PS || {};
PS.SlamData_Types_Workspace_Notebook_Block = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Node_UUID = PS.Node_UUID;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Data_Argonaut = PS.Data_Argonaut;
    var Data_Argonaut_Printer = PS.Data_Argonaut_Printer;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var Data_Either = PS.Data_Either;
    var Data_Map = PS.Data_Map;
    var BlockType = {
        create: function (value) {
            return value;
        }
    };
    var BlockMode = {
        create: function (value) {
            return value;
        }
    };
    var BlockID = {
        create: function (value) {
            return value;
        }
    };
    var Block = {
        create: function (value) {
            return value;
        }
    };
    var showBlockType = function (__unused) {
        return new Prelude.Show(function (_726) {
            return _726;
        });
    };
    var showBlockMode = function (__unused) {
        return new Prelude.Show(function (_729) {
            return _729;
        });
    };
    var eqBlockType = function (__unused) {
        return new Prelude.Eq(function (bt) {
            return function (bt$prime) {
                return !Prelude["=="](eqBlockType({}))(bt)(bt$prime);
            };
        }, function (_724) {
            return function (_725) {
                return _724 === _725;
            };
        });
    };
    var eqBlockMode = function (__unused) {
        return new Prelude.Eq(function (bm) {
            return function (bm$prime) {
                return !Prelude["=="](eqBlockMode({}))(bm)(bm$prime);
            };
        }, function (_727) {
            return function (_728) {
                return _727 === _728;
            };
        });
    };
    var eqBlockID = function (__unused) {
        return new Prelude.Eq(function (i) {
            return function (i$prime) {
                return !Prelude["=="](eqBlockID({}))(i)(i$prime);
            };
        }, function (_722) {
            return function (_723) {
                return Prelude["=="](Node_UUID.eqUUID({}))(_722)(_723);
            };
        });
    };
    var eqBlock = function (__unused) {
        return new Prelude.Eq(function (b) {
            return function (b$prime) {
                return !Prelude["=="](eqBlock({}))(b)(b$prime);
            };
        }, function (_720) {
            return function (_721) {
                return Prelude["=="](eqBlockID({}))(_720.ident)(_721.ident) && Prelude["=="](eqBlockType({}))(_720.blockType)(_721.blockType) && Prelude["=="](eqBlockMode({}))(_720.blockMode)(_721.blockMode) && _720.editContent === _721.editContent && _720.evalContent === _721.evalContent;
            };
        });
    };
    var encodeJsonBlockType = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (ty) {
            return Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(Prelude.show(showBlockType({}))(ty));
        });
    };
    var encodeJsonBlockMode = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (ty) {
            return Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(Prelude.show(showBlockMode({}))(ty));
        });
    };
    var encodeJsonBlockID = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_731) {
            return Data_Argonaut.encodeJson(Node_UUID.encodeJsonUUID({}))(_731);
        });
    };
    var encodeJsonBlock = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_730) {
            return Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("ident")(Data_Argonaut.encodeJson(encodeJsonBlockID({}))(_730.ident)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("blockType")(Data_Argonaut.encodeJson(encodeJsonBlockType({}))(_730.blockType)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("blockMode")(Data_Argonaut.encodeJson(encodeJsonBlockMode({}))(_730.blockMode)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("editContent")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(_730.editContent)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("evalContent")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(_730.evalContent)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("label")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(_730.label)))(Data_Argonaut.jsonEmptyObject))))));
        });
    };
    var showBlock = function (__unused) {
        return new Prelude.Show(function (block) {
            return Prelude.show(Data_Argonaut_Printer.showJson({}))(Data_Argonaut.encodeJson(encodeJsonBlock({}))(block));
        });
    };
    var decodeJsonBlockType = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toString(json))("BlockType"))(function (ty) {
                if (ty === "Markdown") {
                    return new Data_Either.Right("Markdown");
                };
                if (ty === "SQL") {
                    return new Data_Either.Right("SQL");
                };
                if (ty === "Visual") {
                    return new Data_Either.Right("Visual");
                };
                return new Data_Either.Left("Couldn't decode BlockType");
            });
        });
    };
    var decodeJsonBlockMode = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toString(json))("BlockMode"))(function (ty) {
                if (ty === "Edit") {
                    return new Data_Either.Right("Edit");
                };
                if (ty === "Eval") {
                    return new Data_Either.Right("Eval");
                };
                if (ty === "Locked") {
                    return new Data_Either.Right("Locked");
                };
                return new Data_Either.Left("Couldn't decode BlockMode");
            });
        });
    };
    var decodeJsonBlockID = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude["<$>"](Data_Either.functorEither({}))(BlockID.create)(Data_Argonaut.decodeJson(Node_UUID.decodeJsonUUID({}))(json));
        });
    };
    var decodeJsonBlock = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("Block"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("ident")(obj))("ident"))(Data_Argonaut.decodeJson(decodeJsonBlockID({}))))(function (_110) {
                    return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("blockMode")(obj))("blockMode"))(Data_Argonaut.decodeJson(decodeJsonBlockMode({}))))(function (_109) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("blockType")(obj))("blockType"))(Data_Argonaut.decodeJson(decodeJsonBlockType({}))))(function (_108) {
                            return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("editContent")(obj))("editContent"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_107) {
                                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("evalContent")(obj))("evalContent"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_106) {
                                    return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("label")(obj))("label"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_105) {
                                        return Prelude.pure(Data_Either.applicativeEither({}))({
                                            ident: _110, 
                                            blockMode: _109, 
                                            blockType: _108, 
                                            editContent: _107, 
                                            evalContent: _106, 
                                            label: _105
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    return {
        BlockMode: BlockMode, 
        BlockType: BlockType, 
        Block: Block, 
        BlockID: BlockID, 
        eqBlock: eqBlock, 
        eqBlockID: eqBlockID, 
        eqBlockType: eqBlockType, 
        showBlockType: showBlockType, 
        eqBlockMode: eqBlockMode, 
        showBlockMode: showBlockMode, 
        showBlock: showBlock, 
        decodeJsonBlock: decodeJsonBlock, 
        decodeJsonBlockID: decodeJsonBlockID, 
        decodeJsonBlockType: decodeJsonBlockType, 
        decodeJsonBlockMode: decodeJsonBlockMode, 
        encodeJsonBlock: encodeJsonBlock, 
        encodeJsonBlockID: encodeJsonBlockID, 
        encodeJsonBlockType: encodeJsonBlockType, 
        encodeJsonBlockMode: encodeJsonBlockMode
    };
})();
var PS = PS || {};
PS.SlamData_Types_Workspace_Notebook = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Node_UUID = PS.Node_UUID;
    var SlamData_Types_Workspace_Notebook_Block = PS.SlamData_Types_Workspace_Notebook_Block;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Data_Argonaut = PS.Data_Argonaut;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var Data_Either = PS.Data_Either;
    var Data_Map = PS.Data_Map;
    var NotebookID = {
        create: function (value) {
            return value;
        }
    };
    var Notebook = {
        create: function (value) {
            return value;
        }
    };
    var eqNotebookID = function (__unused) {
        return new Prelude.Eq(function (i) {
            return function (i$prime) {
                return !Prelude["=="](eqNotebookID({}))(i)(i$prime);
            };
        }, function (_732) {
            return function (_733) {
                return Prelude["=="](Node_UUID.eqUUID({}))(_732)(_733);
            };
        });
    };
    var eqNotebook = function (__unused) {
        return new Prelude.Eq(function (nb) {
            return function (nb$prime) {
                return !Prelude["=="](eqNotebook({}))(nb)(nb$prime);
            };
        }, function (_734) {
            return function (_735) {
                return Prelude["=="](eqNotebookID({}))(_734.ident)(_735.ident) && Prelude["=="](Prelude.eqArray(SlamData_Types_Workspace_Notebook_Block.eqBlock({})))(_734.blocks)(_735.blocks);
            };
        });
    };
    var encodeJsonNotebookID = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_737) {
            return Data_Argonaut.encodeJson(Node_UUID.encodeJsonUUID({}))(_737);
        });
    };
    var encodeJsonNotebook = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_736) {
            return Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("ident")(Data_Argonaut.encodeJson(encodeJsonNotebookID({}))(_736.ident)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("blocks")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonArray(SlamData_Types_Workspace_Notebook_Block.encodeJsonBlock({})))(_736.blocks)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("name")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(_736.name)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("path")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(_736.path)))(Data_Argonaut.jsonEmptyObject))));
        });
    };
    var decodeNotebookID = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude["<$>"](Data_Either.functorEither({}))(NotebookID.create)(Data_Argonaut.decodeJson(Node_UUID.decodeJsonUUID({}))(json));
        });
    };
    var decodeNotebook = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("Notebook"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("ident")(obj))("ident"))(Data_Argonaut.decodeJson(decodeNotebookID({}))))(function (_114) {
                    return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("blocks")(obj))("blocks"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeArray(SlamData_Types_Workspace_Notebook_Block.decodeJsonBlock({})))))(function (_113) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("name")(obj))("name"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_112) {
                            return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("path")(obj))("path"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_111) {
                                return Prelude.pure(Data_Either.applicativeEither({}))({
                                    ident: _114, 
                                    blocks: _113, 
                                    name: _112, 
                                    path: _111
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    return {
        Notebook: Notebook, 
        NotebookID: NotebookID, 
        eqNotebookID: eqNotebookID, 
        eqNotebook: eqNotebook, 
        decodeNotebook: decodeNotebook, 
        decodeNotebookID: decodeNotebookID, 
        encodeJsonNotebook: encodeJsonNotebook, 
        encodeJsonNotebookID: encodeJsonNotebookID
    };
})();
var PS = PS || {};
PS.SlamData_Types = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Node_Events = PS.Node_Events;
    var Data_Argonaut_Encode = PS.Data_Argonaut_Encode;
    var Data_Argonaut = PS.Data_Argonaut;
    var Data_Argonaut_Decode = PS.Data_Argonaut_Decode;
    var Data_Either = PS.Data_Either;
    var Data_Map = PS.Data_Map;
    var Data_Traversable = PS.Data_Traversable;
    var SEConfigServer = {
        create: function (value) {
            return value;
        }
    };
    var SDConfigServer = {
        create: function (value) {
            return value;
        }
    };
    var SDConfigNodeWebkit = {
        create: function (value) {
            return value;
        }
    };
    var SDConfig = {
        create: function (value) {
            return value;
        }
    };
    var MountingWrapper = {
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
    function ReadFileSystem(value0) {
        this.value0 = value0;
    };
    ReadFileSystem.create = function (value0) {
        return new ReadFileSystem(value0);
    };
    function ReadFields(value0) {
        this.value0 = value0;
    };
    ReadFields.create = function (value0) {
        return new ReadFields(value0);
    };
    function CreateNotebook() {

    };
    CreateNotebook.value = new CreateNotebook();
    function CloseNotebook(value0) {
        this.value0 = value0;
    };
    CloseNotebook.create = function (value0) {
        return new CloseNotebook(value0);
    };
    function OpenNotebook(value0) {
        this.value0 = value0;
    };
    OpenNotebook.create = function (value0) {
        return new OpenNotebook(value0);
    };
    function RenameNotebook(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    RenameNotebook.create = function (value0) {
        return function (value1) {
            return new RenameNotebook(value0, value1);
        };
    };
    function SaveNotebook(value0) {
        this.value0 = value0;
    };
    SaveNotebook.create = function (value0) {
        return new SaveNotebook(value0);
    };
    function ShowSettings() {

    };
    ShowSettings.value = new ShowSettings();
    function HideSettings() {

    };
    HideSettings.value = new HideSettings();
    function CreateBlock(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    CreateBlock.create = function (value0) {
        return function (value1) {
            return new CreateBlock(value0, value1);
        };
    };
    function DeleteBlock(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    DeleteBlock.create = function (value0) {
        return function (value1) {
            return new DeleteBlock(value0, value1);
        };
    };
    function EditBlock(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    EditBlock.create = function (value0) {
        return function (value1) {
            return new EditBlock(value0, value1);
        };
    };
    function EvalBlock(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    EvalBlock.create = function (value0) {
        return function (value1) {
            return new EvalBlock(value0, value1);
        };
    };
    function EvalVisual(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    EvalVisual.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new EvalVisual(value0, value1, value2);
            };
        };
    };
    var SlamDataEvent = {
        create: function (value) {
            return value;
        }
    };
    var responseEvent = "response";
    var requestEvent = "request";
    var encodeSEConfigServer = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_742) {
            return Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("port")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJNumber({}))(_742.port)))(Data_Argonaut.jsonEmptyObject);
        });
    };
    var encodeSDConfigServer = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_739) {
            return Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("location")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(_739.location)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("port")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJNumber({}))(_739.port)))(Data_Argonaut.jsonEmptyObject));
        });
    };
    var encodeSDConfigNodeWebkit = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_740) {
            return Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("java")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(_740.java)))(Data_Argonaut.jsonEmptyObject);
        });
    };
    var encodeSDConfig = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_738) {
            return Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("server")(Data_Argonaut.encodeJson(encodeSDConfigServer({}))(_738.server)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("nodeWebkit")(Data_Argonaut.encodeJson(encodeSDConfigNodeWebkit({}))(_738.nodeWebkit)))(Data_Argonaut.jsonEmptyObject));
        });
    };
    var encodeMountingRec = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_744) {
            return Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("connectionUri")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(_744.connectionUri)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("database")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeJsonJString({}))(_744.database)))(Data_Argonaut.jsonEmptyObject));
        });
    };
    var encodeMounting = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_743) {
            return Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("mongodb")(Data_Argonaut.encodeJson(encodeMountingRec({}))(_743.value0)))(Data_Argonaut.jsonEmptyObject);
        });
    };
    var encodeSEConfig = function (__unused) {
        return new Data_Argonaut_Encode.EncodeJson(function (_741) {
            return Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("server")(Data_Argonaut.encodeJson(encodeSEConfigServer({}))(_741.server)))(Data_Argonaut["~>"](Data_Argonaut[":="](Data_Argonaut_Encode.encodeJsonJson({}))("mountings")(Data_Argonaut.encodeJson(Data_Argonaut_Encode.encodeMap(encodeMounting({})))(_741.mountings)))(Data_Argonaut.jsonEmptyObject));
        });
    };
    var decodeSEConfigServer = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("SEConfigServer"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("port")(obj))("port"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonNumber({}))))(function (_123) {
                    return Prelude.pure(Data_Either.applicativeEither({}))({
                        port: _123
                    });
                });
            });
        });
    };
    var decodeSDConfigServer = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("SDConfigServer"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("location")(obj))("location"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_118) {
                    return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("port")(obj))("port"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonNumber({}))))(function (_117) {
                        return Prelude.pure(Data_Either.applicativeEither({}))({
                            location: _118, 
                            port: _117
                        });
                    });
                });
            });
        });
    };
    var decodeSDConfigNodeWebkit = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("SDConfigNodeWebkit"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("java")(obj))("java"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_119) {
                    return Prelude.pure(Data_Either.applicativeEither({}))({
                        java: _119
                    });
                });
            });
        });
    };
    var decodeSDConfig = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("SDConfig"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("server")(obj))("server"))(Data_Argonaut.decodeJson(decodeSDConfigServer({}))))(function (_116) {
                    return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("nodeWebkit")(obj))("nodeWebkit"))(Data_Argonaut.decodeJson(decodeSDConfigNodeWebkit({}))))(function (_115) {
                        return Prelude.pure(Data_Either.applicativeEither({}))({
                            server: _116, 
                            nodeWebkit: _115
                        });
                    });
                });
            });
        });
    };
    var decodeMountingRec = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("MountingWrapper"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("connectionUri")(obj))("connectionUri"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_126) {
                    return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("database")(obj))("database"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeJsonString({}))))(function (_125) {
                        return Prelude.pure(Data_Either.applicativeEither({}))({
                            connectionUri: _126, 
                            database: _125
                        });
                    });
                });
            });
        });
    };
    var decodeMounting = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("MountMongo"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("mongodb")(obj))("mongodb"))(Data_Argonaut.decodeJson(decodeMountingRec({}))))(function (_124) {
                    return Prelude.pure(Data_Either.applicativeEither({}))(new MountMongo(_124));
                });
            });
        });
    };
    var decodeSEConfig = function (__unused) {
        return new Data_Argonaut_Decode.DecodeJson(function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Argonaut.toObject(json))("SEConfig"))(function (obj) {
                return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("server")(obj))("server"))(Data_Argonaut.decodeJson(decodeSEConfigServer({}))))(function (_122) {
                    return Prelude[">>="](Data_Either.bindEither({}))(Prelude[">>="](Data_Either.bindEither({}))(Data_Argonaut["?>>="](Data_Map.lookup(Prelude.ordString({}))("mountings")(obj))("mountings"))(Data_Argonaut.decodeJson(Data_Argonaut_Decode.decodeMap(Data_Argonaut_Decode.decodeJsonJson({})))))(function (_121) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Data_Traversable.traverse(Data_Argonaut_Decode.traversableMap(Prelude.ordString({})))(Data_Either.applicativeEither({}))(Data_Argonaut.decodeJson(decodeMounting({})))(_121))(function (_120) {
                            return Prelude.pure(Data_Either.applicativeEither({}))({
                                server: _122, 
                                mountings: _120
                            });
                        });
                    });
                });
            });
        });
    };
    return {
        SaveSDConfig: SaveSDConfig, 
        SaveSEConfig: SaveSEConfig, 
        ReadFileSystem: ReadFileSystem, 
        ReadFields: ReadFields, 
        CreateNotebook: CreateNotebook, 
        CloseNotebook: CloseNotebook, 
        OpenNotebook: OpenNotebook, 
        RenameNotebook: RenameNotebook, 
        SaveNotebook: SaveNotebook, 
        ShowSettings: ShowSettings, 
        HideSettings: HideSettings, 
        CreateBlock: CreateBlock, 
        DeleteBlock: DeleteBlock, 
        EditBlock: EditBlock, 
        EvalBlock: EvalBlock, 
        EvalVisual: EvalVisual, 
        SlamDataEvent: SlamDataEvent, 
        MountingWrapper: MountingWrapper, 
        MountMongo: MountMongo, 
        SEConfigServer: SEConfigServer, 
        SEConfig: SEConfig, 
        SDConfigNodeWebkit: SDConfigNodeWebkit, 
        SDConfigServer: SDConfigServer, 
        SDConfig: SDConfig, 
        responseEvent: responseEvent, 
        requestEvent: requestEvent, 
        encodeSDConfig: encodeSDConfig, 
        encodeSDConfigServer: encodeSDConfigServer, 
        encodeSDConfigNodeWebkit: encodeSDConfigNodeWebkit, 
        decodeSDConfig: decodeSDConfig, 
        decodeSDConfigServer: decodeSDConfigServer, 
        decodeSDConfigNodeWebkit: decodeSDConfigNodeWebkit, 
        encodeSEConfig: encodeSEConfig, 
        encodeSEConfigServer: encodeSEConfigServer, 
        encodeMounting: encodeMounting, 
        encodeMountingRec: encodeMountingRec, 
        decodeSEConfig: decodeSEConfig, 
        decodeSEConfigServer: decodeSEConfigServer, 
        decodeMounting: decodeMounting, 
        decodeMountingRec: decodeMountingRec
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
    var SlamData_Types = PS.SlamData_Types;
    var logo = React_DOM.li({})([ React_DOM.a({
        href: "http://slamdata.com/", 
        id: "slamdata-logo", 
        target: "_blank"
    })([ React_DOM.img({
        alt: "SlamData home page", 
        src: "imgs/slamdata-logo.png"
    })([  ]) ]) ]);
    var intersperse = function (_746) {
        return function (_747) {
            if (_747.length === 0) {
                return [  ];
            };
            if (_747.length === 1) {
                return [ _747[0] ];
            };
            if (_747.length > 0) {
                var _2690 = _747.slice(1);
                return Prelude[":"](_747[0])(Prelude[":"](_746)(intersperse(_746)(_2690)));
            };
            throw new Error("Failed pattern match");
        };
    };
    var divider = React_DOM.li({
        className: "divider"
    })([  ]);
    var menuSide = function (name) {
        return React.createClass((function () {
            var _2691 = {};
            for (var _2692 in React.spec) {
                if (React.spec.hasOwnProperty(_2692)) {
                    _2691[_2692] = React.spec[_2692];
                };
            };
            _2691.displayName = "MenuSide";
            _2691.render = function ($$this) {
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.ul({
                    className: name
                })(Prelude["++"](Data_Array.semigroupArray({}))(intersperse(divider)($$this.props.children))($$this.props.extra)));
            };
            return _2691;
        })());
    };
    var leftSide = menuSide("left");
    var rightSide = menuSide("right");
    var command = function (_745) {
        if (_745.action instanceof Data_Maybe.Nothing) {
            return React_DOM.li({})([ React_DOM.a({
                id: "menu-command-" + _745.name
            })([ React_DOM.rawText(_745.name) ]) ]);
        };
        if (_745.action instanceof Data_Maybe.Just) {
            return React_DOM.li({})([ React_DOM.a({
                id: "menu-command-" + _745.name, 
                onClick: _745.action.value0
            })([ React_DOM.rawText(_745.name) ]) ]);
        };
        throw new Error("Failed pattern match");
    };
    var menuButton = React.createClass((function () {
        var _2699 = {};
        for (var _2700 in React.spec) {
            if (React.spec.hasOwnProperty(_2700)) {
                _2699[_2700] = React.spec[_2700];
            };
        };
        _2699.displayName = "MenuButton";
        _2699.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.li({
                className: "has-dropdown"
            })([ React_DOM.a({
                id: "menu-button-" + $$this.props.name
            })([ React_DOM.rawText($$this.props.name) ]), React_DOM.ul({
                className: "dropdown"
            })(Prelude["<$>"](Data_Array.functorArray({}))(command)($$this.props.commands)) ]));
        };
        return _2699;
    })());
    var editMenu = function (request) {
        return menuButton({
            name: "Edit", 
            commands: [ {
                name: "Settings", 
                action: Data_Maybe.Just.create(request(SlamData_Types.ShowSettings.value))
            } ]
        })([  ]);
    };
    var menuBar = function (request) {
        return React_DOM.section({
            className: "top-bar-section"
        })([ leftSide({
            extra: [ divider ]
        })([ editMenu(request) ]), rightSide({
            extra: [  ]
        })([ logo ]) ]);
    };
    var menu = function (request) {
        return React_DOM.nav({
            className: "top-bar", 
            "data-options": "is_hover: false", 
            "data-topbar": true
        })([ menuBar(request) ]);
    };
    return {
        menu: menu
    };
})();
var PS = PS || {};
PS.SlamData_Components = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var React_DOM = PS.React_DOM;
    var React = PS.React;
    var icon = function (name) {
        return React_DOM.i({
            className: name
        })([  ]);
    };
    var lineChartIcon = icon("icon-chart-line");
    var loadingIcon = icon("fa fa-circle-o-notch fa-spin");
    var markdownIcon = icon("fa fa-file-text");
    var newIcon = icon("fa fa-file");
    var newNotebookIcon = icon("fa fa-plus");
    var openIcon = icon("fa fa-folder-open");
    var pieChartIcon = icon("icon-chart-pie");
    var publishIcon = icon("fa fa-book");
    var renameIcon = icon("fa fa-language");
    var saveIcon = icon("fa fa-save");
    var sqlIcon = icon("fa fa-database");
    var visualIcon = icon("fa fa-bar-chart-o");
    var fileIcon = icon("fa fa-file-o");
    var dirOpenIcon = icon("fa fa-folder-open-o");
    var dirClosedIcon = icon("fa fa-folder-o");
    var closeIcon = icon("fa fa-times");
    var barChartIcon = icon("icon-chart-bar");
    var areaChartIcon = icon("icon-chart-area");
    var actionButton = function ($$this) {
        return function (event) {
            return function (title) {
                return function (icon_1) {
                    return React_DOM.li({})([ React_DOM.a({
                        className: "tiny secondary button has-tooltip", 
                        onClick: React.eventHandler($$this)(function (this_1) {
                            return Prelude.pure(Prelude.applicativeArr({}))(this_1.props.request(event));
                        }), 
                        title: title
                    })([ icon_1 ]) ]);
                };
            };
        };
    };
    return {
        actionButton: actionButton, 
        pieChartIcon: pieChartIcon, 
        lineChartIcon: lineChartIcon, 
        barChartIcon: barChartIcon, 
        areaChartIcon: areaChartIcon, 
        loadingIcon: loadingIcon, 
        newNotebookIcon: newNotebookIcon, 
        fileIcon: fileIcon, 
        dirClosedIcon: dirClosedIcon, 
        dirOpenIcon: dirOpenIcon, 
        visualIcon: visualIcon, 
        sqlIcon: sqlIcon, 
        markdownIcon: markdownIcon, 
        publishIcon: publishIcon, 
        renameIcon: renameIcon, 
        saveIcon: saveIcon, 
        openIcon: openIcon, 
        newIcon: newIcon, 
        closeIcon: closeIcon, 
        icon: icon
    };
})();
var PS = PS || {};
PS.SlamData_Helpers = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var SlamData_Types = PS.SlamData_Types;
    var Data_Maybe = PS.Data_Maybe;
    var Data_String = PS.Data_String;
    var Data_Map = PS.Data_Map;
    function checked(el) {  return el.checked;};
    function selectedOptgroup(el) {  return el.selectedOptions[0].parentNode.label;};
    function value(el) {  return el.value;};
    var serverURI = function (_750) {
        return _750.server.location + ":" + Prelude.show(Prelude.showNumber({}))(_750.server.port);
    };
    var getOrElse = Prelude.flip(Data_Maybe.fromMaybe);
    var endsWith = function (str) {
        return function (suffix) {
            return Data_String["indexOf'"](suffix)(Data_String.length(str) - Data_String.length(suffix))(str) !== -1;
        };
    };
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
        mountings: Data_Map.singleton(defaultMountPath)(SlamData_Types.MountMongo.create({
            connectionUri: defaultMongoURI, 
            database: defaultMongoDatabase
        }))
    };
    var activate = function (__dict_Eq_727) {
        return function (_748) {
            return function (_749) {
                if (Prelude["=="](__dict_Eq_727)(_748)(_749)) {
                    return " active";
                };
                return "";
            };
        };
    };
    return {
        value: value, 
        selectedOptgroup: selectedOptgroup, 
        checked: checked, 
        serverURI: serverURI, 
        defaultSEConfig: defaultSEConfig, 
        defaultSDConfig: defaultSDConfig, 
        defaultServerURI: defaultServerURI, 
        defaultMongoDatabase: defaultMongoDatabase, 
        defaultMongoURI: defaultMongoURI, 
        defaultMountPath: defaultMountPath, 
        defaultServerPort: defaultServerPort, 
        defaultServerLocation: defaultServerLocation, 
        activate: activate, 
        endsWith: endsWith, 
        getOrElse: getOrElse
    };
})();
var PS = PS || {};
PS.SlamData_Lens = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Types = PS.SlamData_Types;
    var SlamData_Types_Workspace_Notebook = PS.SlamData_Types_Workspace_Notebook;
    var SlamData_Types_Workspace_FileSystem = PS.SlamData_Types_Workspace_FileSystem;
    var SlamData_Types_Workspace_Notebook_Block = PS.SlamData_Types_Workspace_Notebook_Block;
    var _settings = function (__dict_Functor_728) {
        return Control_Lens.lens(function (o) {
            return o.settings;
        })(function (o) {
            return function (x) {
                var _2705 = {};
                for (var _2706 in o) {
                    if (o.hasOwnProperty(_2706)) {
                        _2705[_2706] = o[_2706];
                    };
                };
                _2705.settings = x;
                return _2705;
            };
        })(__dict_Functor_728);
    };
    var _server = function (__dict_Functor_729) {
        return Control_Lens.lens(function (o) {
            return o.server;
        })(function (o) {
            return function (x) {
                var _2707 = {};
                for (var _2708 in o) {
                    if (o.hasOwnProperty(_2708)) {
                        _2707[_2708] = o[_2708];
                    };
                };
                _2707.server = x;
                return _2707;
            };
        })(__dict_Functor_729);
    };
    var _seConfigServer = function (__dict_Functor_730) {
        return function (_759) {
            return function (_760) {
                return Prelude["<$>"](__dict_Functor_730)(SlamData_Types.SEConfigServer.create)(_759(_760));
            };
        };
    };
    var _seConfigRec = function (__dict_Functor_731) {
        return function (_753) {
            return function (_754) {
                return Prelude["<$>"](__dict_Functor_731)(SlamData_Types.SEConfig.create)(_753(_754));
            };
        };
    };
    var _seConfig = function (__dict_Functor_732) {
        return function (_773) {
            return function (_774) {
                return Prelude["<$>"](__dict_Functor_732)(function (sec$prime) {
                    var _2715 = {};
                    for (var _2716 in _774) {
                        if (_774.hasOwnProperty(_2716)) {
                            _2715[_2716] = _774[_2716];
                        };
                    };
                    _2715.seConfig = sec$prime;
                    return _2715;
                })(_773(_774.seConfig));
            };
        };
    };
    var _sdConfigServer = function (__dict_Functor_733) {
        return function (_755) {
            return function (_756) {
                return Prelude["<$>"](__dict_Functor_733)(SlamData_Types.SDConfigServer.create)(_755(_756));
            };
        };
    };
    var _sdConfigRec = function (__dict_Functor_734) {
        return function (_751) {
            return function (_752) {
                return Prelude["<$>"](__dict_Functor_734)(SlamData_Types.SDConfig.create)(_751(_752));
            };
        };
    };
    var _sdConfigNodeWebkit = function (__dict_Functor_735) {
        return function (_757) {
            return function (_758) {
                return Prelude["<$>"](__dict_Functor_735)(SlamData_Types.SDConfigNodeWebkit.create)(_757(_758));
            };
        };
    };
    var _sdConfig = function (__dict_Functor_736) {
        return function (_771) {
            return function (_772) {
                return Prelude["<$>"](__dict_Functor_736)(function (sdc$prime) {
                    var _2726 = {};
                    for (var _2727 in _772) {
                        if (_772.hasOwnProperty(_2727)) {
                            _2726[_2727] = _772[_2727];
                        };
                    };
                    _2726.sdConfig = sdc$prime;
                    return _2726;
                })(_771(_772.sdConfig));
            };
        };
    };
    var _port = function (__dict_Functor_737) {
        return Control_Lens.lens(function (o) {
            return o.port;
        })(function (o) {
            return function (x) {
                var _2729 = {};
                for (var _2730 in o) {
                    if (o.hasOwnProperty(_2730)) {
                        _2729[_2730] = o[_2730];
                    };
                };
                _2729.port = x;
                return _2729;
            };
        })(__dict_Functor_737);
    };
    var _notebookRec = function (__dict_Functor_738) {
        return function (_767) {
            return function (_768) {
                return Prelude["<$>"](__dict_Functor_738)(SlamData_Types_Workspace_Notebook.Notebook.create)(_767(_768));
            };
        };
    };
    var _nodeWebkit = function (__dict_Functor_739) {
        return Control_Lens.lens(function (o) {
            return o.nodeWebkit;
        })(function (o) {
            return function (x) {
                var _2733 = {};
                for (var _2734 in o) {
                    if (o.hasOwnProperty(_2734)) {
                        _2733[_2734] = o[_2734];
                    };
                };
                _2733.nodeWebkit = x;
                return _2733;
            };
        })(__dict_Functor_739);
    };
    var _name = function (__dict_Functor_740) {
        return function (_789) {
            return function (_790) {
                return Prelude["<$>"](__dict_Functor_740)(function (i$prime) {
                    var _2737 = {};
                    for (var _2738 in _790) {
                        if (_790.hasOwnProperty(_2738)) {
                            _2737[_2738] = _790[_2738];
                        };
                    };
                    _2737.name = i$prime;
                    return _2737;
                })(_789(_790.name));
            };
        };
    };
    var _mountings = function (__dict_Functor_741) {
        return Control_Lens.lens(function (o) {
            return o.mountings;
        })(function (o) {
            return function (x) {
                var _2740 = {};
                for (var _2741 in o) {
                    if (o.hasOwnProperty(_2741)) {
                        _2740[_2741] = o[_2741];
                    };
                };
                _2740.mountings = x;
                return _2740;
            };
        })(__dict_Functor_741);
    };
    var _mountingWrapper = function (__dict_Functor_742) {
        return function (_761) {
            return function (_762) {
                return Prelude["<$>"](__dict_Functor_742)(SlamData_Types.MountMongo.create)(_761(_762.value0));
            };
        };
    };
    var _mountingRec = function (__dict_Functor_743) {
        return function (_763) {
            return function (_764) {
                return Prelude["<$>"](__dict_Functor_743)(SlamData_Types.MountingWrapper.create)(_763(_764));
            };
        };
    };
    var _location = function (__dict_Functor_744) {
        return Control_Lens.lens(function (o) {
            return o.location;
        })(function (o) {
            return function (x) {
                var _2747 = {};
                for (var _2748 in o) {
                    if (o.hasOwnProperty(_2748)) {
                        _2747[_2748] = o[_2748];
                    };
                };
                _2747.location = x;
                return _2747;
            };
        })(__dict_Functor_744);
    };
    var _java = function (__dict_Functor_745) {
        return Control_Lens.lens(function (o) {
            return o.java;
        })(function (o) {
            return function (x) {
                var _2749 = {};
                for (var _2750 in o) {
                    if (o.hasOwnProperty(_2750)) {
                        _2749[_2750] = o[_2750];
                    };
                };
                _2749.java = x;
                return _2749;
            };
        })(__dict_Functor_745);
    };
    var _ident = function (__dict_Functor_746) {
        return function (_775) {
            return function (_776) {
                return Prelude["<$>"](__dict_Functor_746)(function (i$prime) {
                    var _2753 = {};
                    for (var _2754 in _776) {
                        if (_776.hasOwnProperty(_2754)) {
                            _2753[_2754] = _776[_2754];
                        };
                    };
                    _2753.ident = i$prime;
                    return _2753;
                })(_775(_776.ident));
            };
        };
    };
    var _fileTypeRec = function (__dict_Functor_747) {
        return function (_765) {
            return function (_766) {
                return Prelude["<$>"](__dict_Functor_747)(SlamData_Types_Workspace_FileSystem.FileType.create)(_765(_766));
            };
        };
    };
    var _evalContent = function (__dict_Functor_748) {
        return function (_785) {
            return function (_786) {
                return Prelude["<$>"](__dict_Functor_748)(function (i$prime) {
                    var _2760 = {};
                    for (var _2761 in _786) {
                        if (_786.hasOwnProperty(_2761)) {
                            _2760[_2761] = _786[_2761];
                        };
                    };
                    _2760.evalContent = i$prime;
                    return _2760;
                })(_785(_786.evalContent));
            };
        };
    };
    var _editContent = function (__dict_Functor_749) {
        return function (_783) {
            return function (_784) {
                return Prelude["<$>"](__dict_Functor_749)(function (i$prime) {
                    var _2765 = {};
                    for (var _2766 in _784) {
                        if (_784.hasOwnProperty(_2766)) {
                            _2765[_2766] = _784[_2766];
                        };
                    };
                    _2765.editContent = i$prime;
                    return _2765;
                })(_783(_784.editContent));
            };
        };
    };
    var _database = function (__dict_Functor_750) {
        return Control_Lens.lens(function (o) {
            return o.database;
        })(function (o) {
            return function (x) {
                var _2768 = {};
                for (var _2769 in o) {
                    if (o.hasOwnProperty(_2769)) {
                        _2768[_2769] = o[_2769];
                    };
                };
                _2768.database = x;
                return _2768;
            };
        })(__dict_Functor_750);
    };
    var _content = function (__dict_Functor_751) {
        return function (_777) {
            return function (_778) {
                return Prelude["<$>"](__dict_Functor_751)(function (i$prime) {
                    var _2772 = {};
                    for (var _2773 in _778) {
                        if (_778.hasOwnProperty(_2773)) {
                            _2772[_2773] = _778[_2773];
                        };
                    };
                    _2772.content = i$prime;
                    return _2772;
                })(_777(_778.content));
            };
        };
    };
    var _connectionUri = function (__dict_Functor_752) {
        return Control_Lens.lens(function (o) {
            return o.connectionUri;
        })(function (o) {
            return function (x) {
                var _2775 = {};
                for (var _2776 in o) {
                    if (o.hasOwnProperty(_2776)) {
                        _2775[_2776] = o[_2776];
                    };
                };
                _2775.connectionUri = x;
                return _2775;
            };
        })(__dict_Functor_752);
    };
    var _children = function (__dict_Functor_753) {
        return function (_787) {
            return function (_788) {
                return Prelude["<$>"](__dict_Functor_753)(function (i$prime) {
                    var _2779 = {};
                    for (var _2780 in _788) {
                        if (_788.hasOwnProperty(_2780)) {
                            _2779[_2780] = _788[_2780];
                        };
                    };
                    _2779.children = i$prime;
                    return _2779;
                })(_787(_788.children));
            };
        };
    };
    var _blockType = function (__dict_Functor_754) {
        return function (_781) {
            return function (_782) {
                return Prelude["<$>"](__dict_Functor_754)(function (i$prime) {
                    var _2784 = {};
                    for (var _2785 in _782) {
                        if (_782.hasOwnProperty(_2785)) {
                            _2784[_2785] = _782[_2785];
                        };
                    };
                    _2784.blockType = i$prime;
                    return _2784;
                })(_781(_782.blockType));
            };
        };
    };
    var _blockRec = function (__dict_Functor_755) {
        return function (_769) {
            return function (_770) {
                return Prelude["<$>"](__dict_Functor_755)(SlamData_Types_Workspace_Notebook_Block.Block.create)(_769(_770));
            };
        };
    };
    var _blockMode = function (__dict_Functor_756) {
        return function (_779) {
            return function (_780) {
                return Prelude["<$>"](__dict_Functor_756)(function (i$prime) {
                    var _2791 = {};
                    for (var _2792 in _780) {
                        if (_780.hasOwnProperty(_2792)) {
                            _2791[_2792] = _780[_2792];
                        };
                    };
                    _2791.blockMode = i$prime;
                    return _2791;
                })(_779(_780.blockMode));
            };
        };
    };
    return {
        _name: _name, 
        _children: _children, 
        _evalContent: _evalContent, 
        _editContent: _editContent, 
        _blockType: _blockType, 
        _blockMode: _blockMode, 
        _content: _content, 
        _ident: _ident, 
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
        _blockRec: _blockRec, 
        _notebookRec: _notebookRec, 
        _fileTypeRec: _fileTypeRec, 
        _mountingRec: _mountingRec, 
        _mountingWrapper: _mountingWrapper, 
        _seConfigServer: _seConfigServer, 
        _sdConfigNodeWebkit: _sdConfigNodeWebkit, 
        _sdConfigServer: _sdConfigServer, 
        _seConfigRec: _seConfigRec, 
        _sdConfigRec: _sdConfigRec
    };
})();
var PS = PS || {};
PS.SlamData_App_Workspace_FileSystem = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Lens = PS.SlamData_Lens;
    var Data_Const = PS.Data_Const;
    var Data_Array = PS.Data_Array;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var SlamData_Types = PS.SlamData_Types;
    var React = PS.React;
    var SlamData_Types_Workspace_FileSystem = PS.SlamData_Types_Workspace_FileSystem;
    var React_DOM = PS.React_DOM;
    var Data_String = PS.Data_String;
    var React_TreeView = PS.React_TreeView;
    var Data_Function = PS.Data_Function;
    var toggleTree = function (_791) {
        return function (_792) {
            var name = Control_Lens["^."](_791.props.files)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._fileTypeRec(Data_Const.functorConst({})))(SlamData_Lens._name(Data_Const.functorConst({}))));
            var path = Data_Array.snoc(_791.props.path)(name + "/");
            return _791.state.collapsed ? function __do() {
    _791.props.request(new SlamData_Types.ReadFileSystem(path))();
    return _791.setState({
        collapsed: !_791.state.collapsed
    });
} : Prelude.pure(Control_Monad_Eff.applicativeEff({}))(_791.setState({
    collapsed: !_791.state.collapsed
}));
        };
    };
    var reify = React.createClass((function () {
        var _2804 = {};
        for (var _2805 in React.spec) {
            if (React.spec.hasOwnProperty(_2805)) {
                _2804[_2805] = React.spec[_2805];
            };
        };
        _2804.displayName = "FileSystemTree";
        _2804.getInitialState = function (_) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))({
                collapsed: true
            });
        };
        _2804.render = function ($$this) {
            if ($$this.props.files.type === "file" && $$this.props.files.name === "index.nb") {
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.div({})([ React_DOM.span({
                    onClick: React.eventHandler($$this)(function (this_1) {
                        return function (_) {
                            return this_1.props.request(new SlamData_Types.OpenNotebook(Data_String.joinWith("/")(this_1.props.path)));
                        };
                    })
                })([ React_DOM.rawText("index.nb") ]) ]));
            };
            if ($$this.props.files.type === "file") {
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.div({})([ React_DOM.span({})([ React_DOM.rawText($$this.props.files.name) ]) ]));
            };
            if ($$this.props.files.type === "directory") {
                var name = Control_Lens["^."]($$this.props.files)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._fileTypeRec(Data_Const.functorConst({})))(SlamData_Lens._name(Data_Const.functorConst({}))));
                var path = Data_Array.snoc($$this.props.path)(name);
                var children = Data_Array.sort(SlamData_Types_Workspace_FileSystem.ordFileType({}))(Control_Lens["^."]($$this.props.files)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._fileTypeRec(Data_Const.functorConst({})))(SlamData_Lens._children(Data_Const.functorConst({})))));
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_TreeView.treeView({
                    collapsed: $$this.state.collapsed, 
                    defaultCollapsed: true, 
                    nodeLabel: React_DOM.span({
                        onClick: React.eventHandler(React.coerceThis($$this))(toggleTree)
                    })([ React_DOM.rawText(name) ]), 
                    onClick: React.eventHandler(React.coerceThis($$this))(toggleTree)
                })(Prelude["<$>"](Data_Array.functorArray({}))(function (f) {
                    return reify({
                        files: f, 
                        request: $$this.props.request, 
                        path: path
                    })([  ]);
                })(children)));
            };
            throw new Error("Failed pattern match");
        };
        return _2804;
    })());
    var fsTab = React_DOM.dl({
        className: "tabs", 
        "data-tab": "true"
    })([ React_DOM.dd({
        className: "tab active"
    })([ React_DOM.a({})([ React_DOM.rawText("FileSystem") ]) ]) ]);
    var fsContent = function (files) {
        return function (request) {
            return React_DOM.div({
                className: "tabs-content"
            })([ React_DOM.div({
                className: "content active"
            })([ React_DOM.div({
                className: "actual-content"
            })([ reify({
                files: files, 
                request: request, 
                path: [  ]
            })([  ]) ]) ]) ]);
        };
    };
    var filesystem = React.createClass((function () {
        var _2806 = {};
        for (var _2807 in React.spec) {
            if (React.spec.hasOwnProperty(_2807)) {
                _2806[_2807] = React.spec[_2807];
            };
        };
        _2806.displayName = "FileSystem";
        _2806.shouldComponentUpdate = function ($$this, props, _) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(Prelude["/="](SlamData_Types_Workspace_FileSystem.eqFileType({}))($$this.props.files)(props.files));
        };
        _2806.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.div({
                className: "slamdata-panel"
            })([ fsTab, fsContent($$this.props.files)($$this.props.request) ]));
        };
        return _2806;
    })());
    return {
        filesystem: filesystem
    };
})();
var PS = PS || {};
PS.SlamData_App_Workspace_Notebook_Block_Visual = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Graphics_C3 = PS.Graphics_C3;
    var SlamData_Components = PS.SlamData_Components;
    var React_DOM = PS.React_DOM;
    var React = PS.React;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Lens = PS.SlamData_Lens;
    var Data_Const = PS.Data_Const;
    var Data_Array = PS.Data_Array;
    var SlamData_Types_Workspace_FileSystem = PS.SlamData_Types_Workspace_FileSystem;
    var Data_Array_Unsafe = PS.Data_Array_Unsafe;
    var Data_String = PS.Data_String;
    var Data_Map = PS.Data_Map;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Set = PS.Data_Set;
    var React_TreeView = PS.React_TreeView;
    var SlamData_Types = PS.SlamData_Types;
    var Data_Tuple = PS.Data_Tuple;
    var SlamData_Types_Workspace_Notebook_Block_Visual = PS.SlamData_Types_Workspace_Notebook_Block_Visual;
    var SlamData_App_Workspace_Notebook_Block_Common = PS.SlamData_App_Workspace_Notebook_Block_Common;
    function VisualBar() {

    };
    VisualBar.value = new VisualBar();
    function VisualLine() {

    };
    VisualLine.value = new VisualLine();
    function VisualPie() {

    };
    VisualPie.value = new VisualPie();
    function FieldsTab() {

    };
    FieldsTab.value = new FieldsTab();
    function VisualTypeTab() {

    };
    VisualTypeTab.value = new VisualTypeTab();
    var visualIcon = function (_801) {
        if (_801 instanceof Graphics_C3.Bar) {
            return SlamData_Components.barChartIcon;
        };
        if (_801 instanceof Graphics_C3.Line) {
            return SlamData_Components.lineChartIcon;
        };
        if (_801 instanceof Graphics_C3.Pie) {
            return SlamData_Components.pieChartIcon;
        };
        throw new Error("Failed pattern match");
    };
    var visual = function ($$this) {
        return function (ty) {
            return React_DOM.li({
                onClick: React.eventHandler($$this)(function (this_1) {
                    return function (_) {
                        return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState((function () {
                            var _2809 = {};
                            for (var _2810 in this_1.state) {
                                if (this_1.state.hasOwnProperty(_2810)) {
                                    _2809[_2810] = this_1.state[_2810];
                                };
                            };
                            _2809.visual = ty;
                            return _2809;
                        })()));
                    };
                }), 
                className: SlamData_Helpers.activate(Graphics_C3.eqC3Type({}))(ty)($$this.state.visual)
            })([ React_DOM.a({})([ visualIcon(ty) ]), React_DOM.span({})([ React_DOM.rawText(Prelude.show(Graphics_C3.showC3Type({}))(ty)) ]) ]);
        };
    };
    var toggleTree = function (_795) {
        return function (_796) {
            return function (_797) {
                var name = Control_Lens["^."](_796.props.files)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._fileTypeRec(Data_Const.functorConst({})))(SlamData_Lens._name(Data_Const.functorConst({}))));
                var path = Data_Array.snoc(_796.props.path)(name + "/");
                return _796.state.collapsed ? function __do() {
    _796.props.request(_795)();
    return _796.setState({
        collapsed: !_796.state.collapsed
    });
} : Prelude.pure(Control_Monad_Eff.applicativeEff({}))(_796.setState({
    collapsed: !_796.state.collapsed
}));
            };
        };
    };
    var showVisualTab = function (__unused) {
        return new Prelude.Show(function (_805) {
            if (_805 instanceof FieldsTab) {
                return "Fields";
            };
            if (_805 instanceof VisualTypeTab) {
                return "Type";
            };
            throw new Error("Failed pattern match");
        });
    };
    var reifyField = function (_798) {
        return function (_799) {
            return function (_800) {
                return React_DOM.div({
                    className: "visual-field"
                })([ React_DOM.input({
                    onClick: React.eventHandler(_798)(function (this_1) {
                        return function (e) {
                            var path$prime = Data_Array_Unsafe.tail(_799);
                            var root = Data_Array_Unsafe.head(_799);
                            var field = root + Data_String.joinWith("/")(path$prime);
                            var fields = SlamData_Helpers.checked(e.target) ? Data_Map.alter(Prelude.ordString({}))(Data_Maybe.maybe(Data_Maybe.Just.create(Data_Set.singleton(_800.name)))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Set.insert(Prelude.ordString({}))(_800.name))(Data_Maybe.Just.create)))(field)(this_1.state.fields) : Data_Map.alter(Prelude.ordString({}))(Prelude["<$>"](Data_Maybe.functorMaybe({}))(Data_Set["delete"](Prelude.ordString({}))(_800.name)))(field)(this_1.state.fields);
                            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState((function () {
                                var _2818 = {};
                                for (var _2819 in this_1.state) {
                                    if (this_1.state.hasOwnProperty(_2819)) {
                                        _2818[_2819] = this_1.state[_2819];
                                    };
                                };
                                _2818.fields = fields;
                                return _2818;
                            })()));
                        };
                    }), 
                    type: "checkbox"
                })([  ]), React_DOM.rawText(_800.name) ]);
            };
        };
    };
    var reify = React.createClass((function () {
        var _2827 = {};
        for (var _2828 in React.spec) {
            if (React.spec.hasOwnProperty(_2828)) {
                _2827[_2828] = React.spec[_2828];
            };
        };
        _2827.displayName = "FieldsTree";
        _2827.getInitialState = function (_) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))({
                collapsed: true
            });
        };
        _2827.render = function ($$this) {
            var name = Control_Lens["^."]($$this.props.files)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._fileTypeRec(Data_Const.functorConst({})))(SlamData_Lens._name(Data_Const.functorConst({}))));
            var path = Data_Array.snoc($$this.props.path)(name);
            var path$prime = Data_Array.snoc($$this.props.path)(name + "/");
            var children = Data_Array.sort(SlamData_Types_Workspace_FileSystem.ordFileType({}))(Control_Lens["^."]($$this.props.files)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._fileTypeRec(Data_Const.functorConst({})))(SlamData_Lens._children(Data_Const.functorConst({})))));
            if ($$this.props.files.type === "file") {
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_TreeView.treeView({
                    collapsed: $$this.state.collapsed, 
                    defaultCollapsed: true, 
                    nodeLabel: React_DOM.span({
                        onClick: React.eventHandler(React.coerceThis($$this))(toggleTree(new SlamData_Types.ReadFields(path)))
                    })([ React_DOM.rawText(name) ]), 
                    onClick: React.eventHandler(React.coerceThis($$this))(toggleTree(new SlamData_Types.ReadFields(path)))
                })(Prelude["<$>"](Data_Array.functorArray({}))(reifyField($$this.props.visualThis)(path))(children)));
            };
            if ($$this.props.files.type === "directory") {
                return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_TreeView.treeView({
                    collapsed: $$this.state.collapsed, 
                    defaultCollapsed: true, 
                    nodeLabel: React_DOM.span({
                        onClick: React.eventHandler(React.coerceThis($$this))(toggleTree(new SlamData_Types.ReadFileSystem(path$prime)))
                    })([ React_DOM.rawText(name) ]), 
                    onClick: React.eventHandler(React.coerceThis($$this))(toggleTree(new SlamData_Types.ReadFileSystem(path$prime)))
                })(Prelude["<$>"](Data_Array.functorArray({}))(function (f) {
                    return reify({
                        files: f, 
                        request: $$this.props.request, 
                        path: path, 
                        visualThis: $$this.props.visualThis
                    })([  ]);
                })(children)));
            };
            throw new Error("Failed pattern match");
        };
        return _2827;
    })());
    var placeholder = React_DOM.option({
        disabled: true, 
        selected: true, 
        value: ""
    })([ React_DOM.rawText("Select a field") ]);
    var optionify = function (_802) {
        return React_DOM.optgroup({
            label: _802.value0
        })(Prelude["<$>"](Data_Array.functorArray({}))(function (f) {
            return React_DOM.option({
                value: f
            })([ React_DOM.rawText(f) ]);
        })(Data_Set.toList(_802.value1)));
    };
    var selectFields = function ($$this) {
        return React_DOM.select({
            onChange: React.eventHandler($$this)(function (this_1) {
                return function (e) {
                    var path = SlamData_Helpers.selectedOptgroup(e.target);
                    var field = SlamData_Helpers.value(e.target);
                    var selected = Data_Map.alter(Prelude.ordString({}))(Data_Maybe.maybe(Data_Maybe.Just.create(Data_Set.singleton(field)))(Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Set.insert(Prelude.ordString({}))(field))(Data_Maybe.Just.create)))(path)(this_1.state.selectedFields);
                    return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState((function () {
                        var _2832 = {};
                        for (var _2833 in this_1.state) {
                            if (this_1.state.hasOwnProperty(_2833)) {
                                _2832[_2833] = this_1.state[_2833];
                            };
                        };
                        _2832.selectedFields = selected;
                        return _2832;
                    })()));
                };
            })
        })(Prelude[":"](placeholder)(Prelude["<$>"](Data_Array.functorArray({}))(optionify)(Data_Map.toList($$this.state.fields))));
    };
    var eqVisualTab = function (__unused) {
        return new Prelude.Eq(function (vt) {
            return function (vt$prime) {
                return !Prelude["=="](eqVisualTab({}))(vt)(vt$prime);
            };
        }, function (_803) {
            return function (_804) {
                if (_803 instanceof FieldsTab && _804 instanceof FieldsTab) {
                    return true;
                };
                if (_803 instanceof VisualTypeTab && _804 instanceof VisualTypeTab) {
                    return true;
                };
                return false;
            };
        });
    };
    var visualTab = function ($$this) {
        return function (tab) {
            return React_DOM.dd({
                className: "tab" + SlamData_Helpers.activate(eqVisualTab({}))(tab)($$this.state.active), 
                onClick: React.eventHandler($$this)(function (this_1) {
                    return function (_) {
                        return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState((function () {
                            var _2836 = {};
                            for (var _2837 in this_1.state) {
                                if (this_1.state.hasOwnProperty(_2837)) {
                                    _2836[_2837] = this_1.state[_2837];
                                };
                            };
                            _2836.active = tab;
                            return _2836;
                        })()));
                    };
                })
            })([ React_DOM.a({})([ React_DOM.rawText(Prelude.show(showVisualTab({}))(tab)) ]) ]);
        };
    };
    var visualTabs = function ($$this) {
        return React_DOM.dl({
            className: "tabs vertical"
        })(Prelude["<$>"](Data_Array.functorArray({}))(visualTab($$this))([ FieldsTab.value, VisualTypeTab.value ]));
    };
    var createData = function (_794) {
        return Prelude["<$>"](Data_Array.functorArray({}))(function (_793) {
            return {
                fields: Data_Set.toList(_793.value1), 
                path: _793.value0, 
                type: _794.visual
            };
        })(Data_Map.toList(_794.selectedFields));
    };
    var visualEditorContent = function ($$this) {
        return React_DOM.div({
            className: "tabs-content vertical"
        })([ React_DOM.ul({
            className: "content" + SlamData_Helpers.activate(eqVisualTab({}))(FieldsTab.value)($$this.state.active)
        })([ reify({
            files: $$this.props.files, 
            request: $$this.props.request, 
            path: [  ], 
            visualThis: $$this
        })([  ]) ]), React_DOM.div({
            className: "content" + SlamData_Helpers.activate(eqVisualTab({}))(VisualTypeTab.value)($$this.state.active)
        })([ React_DOM.ul({
            className: "chart-type small-block-grid-5"
        })(Prelude["<$>"](Data_Array.functorArray({}))(visual($$this))([ Graphics_C3.Bar.value, Graphics_C3.Line.value, Graphics_C3.Pie.value ])), selectFields($$this), selectFields($$this), selectFields($$this), React_DOM.div({
            className: "actions"
        })([ React_DOM.a({
            className: "tiny button", 
            onClick: React.eventHandler($$this)(function (this_1) {
                return function (_) {
                    return this_1.props.request(new SlamData_Types.EvalVisual(this_1.props.notebook, this_1.props.block, createData(this_1.state)));
                };
            })
        })([ React_DOM.rawText("Create") ]) ]) ]) ]);
    };
    var visualEditor = React.createClass((function () {
        var _2844 = {};
        for (var _2845 in React.spec) {
            if (React.spec.hasOwnProperty(_2845)) {
                _2844[_2845] = React.spec[_2845];
            };
        };
        _2844.displayName = "VisualEditor";
        _2844.getInitialState = function (_) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))({
                active: FieldsTab.value, 
                fields: Data_Map.empty, 
                selectedFields: Data_Map.empty, 
                visual: Graphics_C3.Line.value
            });
        };
        _2844.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(SlamData_App_Workspace_Notebook_Block_Common.blockRow({
                styles: "block-content edit-visual"
            })([ visualTabs(React.coerceThis($$this)), visualEditorContent(React.coerceThis($$this)) ]));
        };
        return _2844;
    })());
    return {
        FieldsTab: FieldsTab, 
        VisualTypeTab: VisualTypeTab, 
        visualEditor: visualEditor, 
        eqVisualTab: eqVisualTab, 
        showVisualTab: showVisualTab
    };
})();
var PS = PS || {};
PS.SlamData_App_Workspace_Notebook_Block = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var SlamData_Types_Workspace_Notebook_Block = PS.SlamData_Types_Workspace_Notebook_Block;
    var React_DOM = PS.React_DOM;
    var SlamData_Components = PS.SlamData_Components;
    var SlamData_Types = PS.SlamData_Types;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Lens = PS.SlamData_Lens;
    var Data_Const = PS.Data_Const;
    var SlamData_App_Workspace_Notebook_Block_Common = PS.SlamData_App_Workspace_Notebook_Block_Common;
    var React = PS.React;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var SlamData_App_Workspace_Notebook_Block_Visual = PS.SlamData_App_Workspace_Notebook_Block_Visual;
    var typeName = function (_806) {
        return React_DOM.div({
            className: "block-type text-center"
        })([ React_DOM.span({})([ React_DOM.rawText(Prelude.show(SlamData_Types_Workspace_Notebook_Block.showBlockType({}))(_806.blockType)) ]) ]);
    };
    var toolbar = function ($$this) {
        return React_DOM.div({
            className: "button-bar"
        })([ React_DOM.ul({
            className: "left button-group"
        })([  ]), React_DOM.ul({
            className: "right button-group"
        })([ SlamData_Components.actionButton($$this)(new SlamData_Types.DeleteBlock(Control_Lens["^."]($$this.props.notebook)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._notebookRec(Data_Const.functorConst({})))(SlamData_Lens._ident(Data_Const.functorConst({})))), Control_Lens["^."]($$this.props.block)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._blockRec(Data_Const.functorConst({})))(SlamData_Lens._ident(Data_Const.functorConst({}))))))("Close")(SlamData_Components.closeIcon) ]) ]);
    };
    var evaluatedVisualBlock = function ($$this) {
        var blockRec = Control_Lens["^."]($$this.props.block)(SlamData_Lens._blockRec(Data_Const.functorConst({})));
        return SlamData_App_Workspace_Notebook_Block_Common.blockRow({
            styles: "block-content block-" + Prelude.show(SlamData_Types_Workspace_Notebook_Block.showBlockType({}))(blockRec.blockType)
        })([ React_DOM.div({
            className: "block-label"
        })([ React_DOM.rawText(blockRec.label) ]), React_DOM.div({
            className: "evaled-block", 
            onClick: React.eventHandler($$this)(function (this_1) {
                return function (_) {
                    return this_1.props.request(new SlamData_Types.EditBlock(this_1.props.notebook, this_1.props.block));
                };
            })
        })([ React_DOM.div({
            id: Control_Lens["^."]($$this.props.block)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._blockRec(Data_Const.functorConst({})))(SlamData_Lens._evalContent(Data_Const.functorConst({}))))
        })([  ]) ]) ]);
    };
    var evaluatedBlock = function ($$this) {
        var blockRec = Control_Lens["^."]($$this.props.block)(SlamData_Lens._blockRec(Data_Const.functorConst({})));
        return SlamData_App_Workspace_Notebook_Block_Common.blockRow({
            styles: "block-content block-" + Prelude.show(SlamData_Types_Workspace_Notebook_Block.showBlockType({}))(blockRec.blockType)
        })([ React_DOM.div({
            className: "block-label"
        })([ React_DOM.rawText(blockRec.label) ]), React_DOM.div({
            className: "evaled-block", 
            onClick: React.eventHandler($$this)(function (this_1) {
                return function (_) {
                    return this_1.props.request(new SlamData_Types.EditBlock(this_1.props.notebook, this_1.props.block));
                };
            })
        })([ React_DOM.span({
            dangerouslySetInnerHTML: {
                __html: blockRec.evalContent
            }
        })([  ]) ]) ]);
    };
    var blockEditor = function ($$this) {
        return SlamData_App_Workspace_Notebook_Block_Common.blockRow({
            styles: "block-content"
        })([ React_DOM.div({})([ React_DOM.textarea({
            autoFocus: "true", 
            className: "block-editor", 
            onBlur: React.eventHandler($$this)(function (this_1) {
                return function (_) {
                    var block$prime = Control_Lens[".~"](Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._blockRec(Control_Monad_Identity.functorIdentity({})))(SlamData_Lens._editContent(Control_Monad_Identity.functorIdentity({}))))(this_1.state.editContent)(this_1.props.block);
                    return this_1.props.request(new SlamData_Types.EvalBlock(this_1.props.notebook, block$prime));
                };
            }), 
            onChange: React.eventHandler($$this)(function (this_1) {
                return function (e) {
                    return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState((function () {
                        var _2847 = {};
                        for (var _2848 in this_1.state) {
                            if (this_1.state.hasOwnProperty(_2848)) {
                                _2847[_2848] = this_1.state[_2848];
                            };
                        };
                        _2847.editContent = SlamData_Helpers.value(e.target);
                        return _2847;
                    })()));
                };
            }), 
            onKeyUp: React.eventHandler($$this)(function (this_1) {
                return function (k) {
                    return k.ctrlKey && k.key === "Enter" ? (function () {
    var block$prime = Control_Lens[".~"](Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._blockRec(Control_Monad_Identity.functorIdentity({})))(SlamData_Lens._editContent(Control_Monad_Identity.functorIdentity({}))))(this_1.state.editContent)(this_1.props.block);
    return this_1.props.request(new SlamData_Types.EvalBlock(this_1.props.notebook, block$prime));
})() : Prelude.pure(Control_Monad_Eff.applicativeEff({}))(Prelude.unit);
                };
            }), 
            value: $$this.state.editContent
        })([  ]) ]) ]);
    };
    var blockContent = function ($$this) {
        var _2849 = Control_Lens["^."]($$this.props.block)(SlamData_Lens._blockRec(Data_Const.functorConst({})));
        if (_2849.blockMode === "Edit" && _2849.blockType === "Visual") {
            return SlamData_App_Workspace_Notebook_Block_Visual.visualEditor({
                block: $$this.props.block, 
                files: $$this.props.files, 
                notebook: $$this.props.notebook, 
                request: $$this.props.request
            })([  ]);
        };
        if (_2849.blockMode === "Edit") {
            return blockEditor($$this);
        };
        if (_2849.blockMode === "Eval" && _2849.blockType === "Visual") {
            return evaluatedVisualBlock($$this);
        };
        if (_2849.blockMode === "Eval") {
            return evaluatedBlock($$this);
        };
        throw new Error("Failed pattern match");
    };
    var block = React.createClass((function () {
        var _2856 = {};
        for (var _2857 in React.spec) {
            if (React.spec.hasOwnProperty(_2857)) {
                _2856[_2857] = React.spec[_2857];
            };
        };
        _2856.displayName = "Block";
        _2856.getInitialState = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))({
                editContent: Control_Lens["^."]($$this.props.block)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._blockRec(Data_Const.functorConst({})))(SlamData_Lens._editContent(Data_Const.functorConst({})))), 
                evalContent: Control_Lens["^."]($$this.props.block)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._blockRec(Data_Const.functorConst({})))(SlamData_Lens._evalContent(Data_Const.functorConst({}))))
            });
        };
        _2856.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.div({
                className: "block"
            })([ SlamData_App_Workspace_Notebook_Block_Common.blockRow({
                styles: "block-toolbar toolbar"
            })([ typeName($$this.props.block), toolbar(React.coerceThis($$this)) ]), blockContent(React.coerceThis($$this)) ]));
        };
        return _2856;
    })());
    return {
        block: block
    };
})();
var PS = PS || {};
PS.SlamData_Types_JS = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var SlamData_Types = PS.SlamData_Types;
    var isShowSettings = function (_816) {
        if (_816 instanceof SlamData_Types.ShowSettings) {
            return true;
        };
        return false;
    };
    var isSaveSEConfig = function (_808) {
        if (_808 instanceof SlamData_Types.SaveSEConfig) {
            return true;
        };
        return false;
    };
    var isSaveSDConfig = function (_807) {
        if (_807 instanceof SlamData_Types.SaveSDConfig) {
            return true;
        };
        return false;
    };
    var isSaveNotebook = function (_813) {
        if (_813 instanceof SlamData_Types.SaveNotebook) {
            return true;
        };
        return false;
    };
    var isRenameNotebook = function (_815) {
        if (_815 instanceof SlamData_Types.RenameNotebook) {
            return true;
        };
        return false;
    };
    var isReadFileSystem = function (_809) {
        if (_809 instanceof SlamData_Types.ReadFileSystem) {
            return true;
        };
        return false;
    };
    var isReadFields = function (_810) {
        if (_810 instanceof SlamData_Types.ReadFields) {
            return true;
        };
        return false;
    };
    var isOpenNotebook = function (_814) {
        if (_814 instanceof SlamData_Types.OpenNotebook) {
            return true;
        };
        return false;
    };
    var isHideSettings = function (_817) {
        if (_817 instanceof SlamData_Types.HideSettings) {
            return true;
        };
        return false;
    };
    var isEvalVisual = function (_822) {
        if (_822 instanceof SlamData_Types.EvalVisual) {
            return true;
        };
        return false;
    };
    var isEvalBlock = function (_821) {
        if (_821 instanceof SlamData_Types.EvalBlock) {
            return true;
        };
        return false;
    };
    var isEditBlock = function (_820) {
        if (_820 instanceof SlamData_Types.EditBlock) {
            return true;
        };
        return false;
    };
    var isDeleteBlock = function (_819) {
        if (_819 instanceof SlamData_Types.DeleteBlock) {
            return true;
        };
        return false;
    };
    var isCreateNotebook = function (_811) {
        if (_811 instanceof SlamData_Types.CreateNotebook) {
            return true;
        };
        return false;
    };
    var isCreateBlock = function (_818) {
        if (_818 instanceof SlamData_Types.CreateBlock) {
            return true;
        };
        return false;
    };
    var isCloseNotebook = function (_812) {
        if (_812 instanceof SlamData_Types.CloseNotebook) {
            return true;
        };
        return false;
    };
    return {
        isEvalVisual: isEvalVisual, 
        isEvalBlock: isEvalBlock, 
        isEditBlock: isEditBlock, 
        isDeleteBlock: isDeleteBlock, 
        isCreateBlock: isCreateBlock, 
        isHideSettings: isHideSettings, 
        isShowSettings: isShowSettings, 
        isRenameNotebook: isRenameNotebook, 
        isOpenNotebook: isOpenNotebook, 
        isSaveNotebook: isSaveNotebook, 
        isCloseNotebook: isCloseNotebook, 
        isCreateNotebook: isCreateNotebook, 
        isReadFields: isReadFields, 
        isReadFileSystem: isReadFileSystem, 
        isSaveSEConfig: isSaveSEConfig, 
        isSaveSDConfig: isSaveSDConfig
    };
})();
var PS = PS || {};
PS.SlamData_Types_Workspace_Notebook_Settings = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function SlamDataTab() {

    };
    SlamDataTab.value = new SlamDataTab();
    function SlamEngineTab() {

    };
    SlamEngineTab.value = new SlamEngineTab();
    var showSettingsTab = function (__unused) {
        return new Prelude.Show(function (_825) {
            if (_825 instanceof SlamDataTab) {
                return "SlamData";
            };
            if (_825 instanceof SlamEngineTab) {
                return "SlamEngine";
            };
            throw new Error("Failed pattern match");
        });
    };
    var eqSettingsTab = function (__unused) {
        return new Prelude.Eq(function (st) {
            return function (st$prime) {
                return !Prelude["=="](eqSettingsTab({}))(st)(st$prime);
            };
        }, function (_823) {
            return function (_824) {
                if (_823 instanceof SlamDataTab && _824 instanceof SlamDataTab) {
                    return true;
                };
                if (_823 instanceof SlamEngineTab && _824 instanceof SlamEngineTab) {
                    return true;
                };
                return false;
            };
        });
    };
    return {
        SlamDataTab: SlamDataTab, 
        SlamEngineTab: SlamEngineTab, 
        eqSettingsTab: eqSettingsTab, 
        showSettingsTab: showSettingsTab
    };
})();
var PS = PS || {};
PS.SlamData_App_Workspace_Notebook_Settings_SlamData = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Lens = PS.SlamData_Lens;
    var React_DOM = PS.React_DOM;
    var React = PS.React;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Data_Const = PS.Data_Const;
    var Global = PS.Global;
    var _sdServer = function (__dict_Functor_757) {
        return Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._sdConfig(__dict_Functor_757))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._sdConfigRec(__dict_Functor_757))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._server(__dict_Functor_757))(SlamData_Lens._sdConfigServer(__dict_Functor_757))));
    };
    var _sdServerLocation = function (__dict_Functor_758) {
        return Control_Lens[".."](Prelude.semigroupoidArr({}))(_sdServer(__dict_Functor_758))(SlamData_Lens._location(__dict_Functor_758));
    };
    var slamDataServerLocation = function ($$this) {
        return React_DOM.div({})([ React_DOM.label({
            htmlFor: "server-location"
        })([ React_DOM.rawText("Location") ]), React_DOM.input({
            name: "server-location", 
            onChange: React.eventHandler($$this)(function (this_1) {
                return function (e) {
                    return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState(Control_Lens[".~"](_sdServerLocation(Control_Monad_Identity.functorIdentity({})))(SlamData_Helpers.value(e.target))(this_1.state)));
                };
            }), 
            placeholder: "http://localhost", 
            value: Control_Lens["^."]($$this.state)(_sdServerLocation(Data_Const.functorConst({})))
        })([  ]) ]);
    };
    var _sdServerPort = function (__dict_Functor_759) {
        return Control_Lens[".."](Prelude.semigroupoidArr({}))(_sdServer(__dict_Functor_759))(SlamData_Lens._port(__dict_Functor_759));
    };
    var slamDataServerPort = function ($$this) {
        return React_DOM.div({})([ React_DOM.label({
            htmlFor: "server-port"
        })([ React_DOM.rawText("Port") ]), React_DOM.input({
            name: "server-port", 
            onChange: React.eventHandler($$this)(function (this_1) {
                return function (e) {
                    return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState(Control_Lens[".~"](_sdServerPort(Control_Monad_Identity.functorIdentity({})))(Global.readInt(10)(SlamData_Helpers.value(e.target)))(this_1.state)));
                };
            }), 
            placeholder: "8080", 
            value: Control_Lens["^."]($$this.state)(_sdServerPort(Data_Const.functorConst({})))
        })([  ]) ]);
    };
    var slamDataServerSettings = function ($$this) {
        return React_DOM.fieldset({})([ React_DOM.legend({})([ React_DOM.rawText("SlamEngine server") ]), slamDataServerLocation($$this), slamDataServerPort($$this) ]);
    };
    return {
        slamDataServerSettings: slamDataServerSettings
    };
})();
var PS = PS || {};
PS.SlamData_App_Workspace_Notebook_Settings_SlamEngine = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Lens = PS.SlamData_Lens;
    var React_DOM = PS.React_DOM;
    var React = PS.React;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Control_Monad_Identity = PS.Control_Monad_Identity;
    var Global = PS.Global;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Data_Const = PS.Data_Const;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Profunctor = PS.Data_Profunctor;
    var Control_Lens_At = PS.Control_Lens_At;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Array = PS.Data_Array;
    var Data_Map = PS.Data_Map;
    var _seServerPort = function (__dict_Functor_760) {
        return Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._seConfig(__dict_Functor_760))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._seConfigRec(__dict_Functor_760))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._server(__dict_Functor_760))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._seConfigServer(__dict_Functor_760))(SlamData_Lens._port(__dict_Functor_760)))));
    };
    var slamEngineServerPort = function ($$this) {
        return React_DOM.div({})([ React_DOM.label({
            htmlFor: "slamengine-port"
        })([ React_DOM.rawText("Port") ]), React_DOM.input({
            name: "slamengine-port", 
            onChange: React.eventHandler($$this)(function (this_1) {
                return function (e) {
                    return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState(Control_Lens[".~"](_seServerPort(Control_Monad_Identity.functorIdentity({})))(Global.readInt(10)(SlamData_Helpers.value(e.target)))(this_1.state)));
                };
            }), 
            placeholder: "8080", 
            value: Control_Lens["^."]($$this.state)(_seServerPort(Data_Const.functorConst({})))
        })([  ]) ]);
    };
    var slamEngineServerSettings = function ($$this) {
        return React_DOM.fieldset({})([ React_DOM.legend({})([ React_DOM.rawText("Server") ]), slamEngineServerPort($$this) ]);
    };
    var _seMountings = function (__dict_Functor_761) {
        return Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._seConfig(__dict_Functor_761))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._seConfigRec(__dict_Functor_761))(SlamData_Lens._mountings(__dict_Functor_761)));
    };
    var slamEngineMountingPath = function (_826) {
        return function (_827) {
            return React_DOM.div({})([ React_DOM.label({
                htmlFor: "mongodb-path"
            })([ React_DOM.rawText("Path") ]), React_DOM.input({
                name: "mongodb-path", 
                onChange: React.eventHandler(_826)(function (this_1) {
                    return function (e) {
                        var path$prime = SlamData_Helpers.value(e.target);
                        var state$prime = Control_Lens["%~"](Data_Profunctor.profunctorArr({}))(_seMountings(Control_Monad_Identity.functorIdentity({})))(Control_Lens[".."](Prelude.semigroupoidArr({}))(Control_Lens[".~"](Control_Lens.at(Control_Lens_At.atMapKVKV(Prelude.ordString({})))(_827.value0)(Control_Monad_Identity.functorIdentity({})))(Data_Maybe.Nothing.value))(Control_Lens["?~"](Control_Lens.at(Control_Lens_At.atMapKVKV(Prelude.ordString({})))(path$prime)(Control_Monad_Identity.functorIdentity({})))(_827.value1)))(this_1.state);
                        return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState(state$prime));
                    };
                }), 
                placeholder: "/", 
                value: _827.value0
            })([  ]) ]);
        };
    };
    var _sdJava = function (__dict_Functor_762) {
        return Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._sdConfig(__dict_Functor_762))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._sdConfigRec(__dict_Functor_762))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._nodeWebkit(__dict_Functor_762))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._sdConfigNodeWebkit(__dict_Functor_762))(SlamData_Lens._java(__dict_Functor_762)))));
    };
    var slamEngineJavaBinary = function ($$this) {
        return React_DOM.div({})([ React_DOM.label({
            htmlFor: "java-binary"
        })([ React_DOM.rawText("Binary") ]), React_DOM.input({
            name: "java-binary", 
            onChange: React.eventHandler($$this)(function (this_1) {
                return function (e) {
                    return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState(Control_Lens[".~"](_sdJava(Control_Monad_Identity.functorIdentity({})))(SlamData_Helpers.value(e.target))(this_1.state)));
                };
            }), 
            placeholder: "/usr/bin/java", 
            value: Control_Lens["^."]($$this.state)(_sdJava(Data_Const.functorConst({})))
        })([  ]) ]);
    };
    var slamEngineJavaSettings = function ($$this) {
        return React_DOM.fieldset({})([ React_DOM.legend({})([ React_DOM.rawText("Java") ]), slamEngineJavaBinary($$this) ]);
    };
    var _mountingMongoURI = function (__dict_Functor_763) {
        return Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._mountingWrapper(__dict_Functor_763))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._mountingRec(__dict_Functor_763))(SlamData_Lens._connectionUri(__dict_Functor_763)));
    };
    var slamEngineMountingMongoDBMongoUri = function (_828) {
        return function (_829) {
            return React_DOM.div({})([ React_DOM.label({
                htmlFor: "mongodb-mongouri"
            })([ React_DOM.rawText("MongoUri") ]), React_DOM.input({
                name: "mongodb-mongouri", 
                onChange: React.eventHandler(_828)(function (this_1) {
                    return function (e) {
                        var state$prime = Control_Lens["%~"](Data_Profunctor.profunctorArr({}))(_seMountings(Control_Monad_Identity.functorIdentity({})))(Control_Lens["%~"](Data_Profunctor.profunctorArr({}))(Control_Lens.ix(Control_Lens_At.ixedMapKVKV(Prelude.ordString({})))(_829.value0)(Control_Monad_Identity.applicativeIdentity({})))(Control_Lens[".~"](_mountingMongoURI(Control_Monad_Identity.functorIdentity({})))(SlamData_Helpers.value(e.target))))(this_1.state);
                        return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState(state$prime));
                    };
                }), 
                placeholder: "mongodb://localhost:27017", 
                value: Control_Lens["^."](_829.value1)(_mountingMongoURI(Data_Const.functorConst({})))
            })([  ]) ]);
        };
    };
    var _mountingDatabase = function (__dict_Functor_764) {
        return Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._mountingWrapper(__dict_Functor_764))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._mountingRec(__dict_Functor_764))(SlamData_Lens._database(__dict_Functor_764)));
    };
    var slamEngineMountingMongoDBDatabse = function (_830) {
        return function (_831) {
            return React_DOM.div({})([ React_DOM.label({
                htmlFor: "mongodb-database"
            })([ React_DOM.rawText("Database") ]), React_DOM.input({
                name: "mongodb-database", 
                onChange: React.eventHandler(_830)(function (this_1) {
                    return function (e) {
                        var state$prime = Control_Lens["%~"](Data_Profunctor.profunctorArr({}))(_seMountings(Control_Monad_Identity.functorIdentity({})))(Control_Lens["%~"](Data_Profunctor.profunctorArr({}))(Control_Lens.ix(Control_Lens_At.ixedMapKVKV(Prelude.ordString({})))(_831.value0)(Control_Monad_Identity.applicativeIdentity({})))(Control_Lens[".~"](_mountingDatabase(Control_Monad_Identity.functorIdentity({})))(SlamData_Helpers.value(e.target))))(this_1.state);
                        return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState(state$prime));
                    };
                }), 
                placeholder: "test", 
                value: Control_Lens["^."](_831.value1)(_mountingDatabase(Data_Const.functorConst({})))
            })([  ]) ]);
        };
    };
    var slamEngineMounting = function ($$this) {
        return function (mounting) {
            return Prelude["<$>"](Data_Array.functorArray({}))(function (m) {
                return m($$this)(mounting);
            })([ slamEngineMountingPath, slamEngineMountingMongoDBMongoUri, slamEngineMountingMongoDBDatabse ]);
        };
    };
    var slamEngineMountings = function ($$this) {
        return Prelude[">>="](Data_Array.bindArray({}))(Data_Map.toList(Control_Lens["^."]($$this.state.seConfig)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._seConfigRec(Data_Const.functorConst({})))(SlamData_Lens._mountings(Data_Const.functorConst({}))))))(slamEngineMounting($$this));
    };
    var slamEngineMountingsSettings = function ($$this) {
        return React_DOM.fieldset({})(Prelude[":"](React_DOM.legend({})([ React_DOM.rawText("MongoDB mountings") ]))(slamEngineMountings($$this)));
    };
    return {
        slamEngineServerSettings: slamEngineServerSettings, 
        slamEngineMountingsSettings: slamEngineMountingsSettings, 
        slamEngineJavaSettings: slamEngineJavaSettings
    };
})();
var PS = PS || {};
PS.SlamData_App_Workspace_Notebook_Settings = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var React_DOM = PS.React_DOM;
    var React = PS.React;
    var SlamData_Types_Workspace_Notebook_Settings = PS.SlamData_Types_Workspace_Notebook_Settings;
    var SlamData_Types = PS.SlamData_Types;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var SlamData_App_Workspace_Notebook_Settings_SlamEngine = PS.SlamData_App_Workspace_Notebook_Settings_SlamEngine;
    var SlamData_App_Workspace_Notebook_Settings_SlamData = PS.SlamData_App_Workspace_Notebook_Settings_SlamData;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var saveConfig = function ($$this) {
        return function (tab) {
            return React_DOM.a({
                className: "tiny button", 
                onClick: React.eventHandler($$this)(function (this_1) {
                    return function (_) {
                        if (tab instanceof SlamData_Types_Workspace_Notebook_Settings.SlamEngineTab) {
                            return this_1.props.request(new SlamData_Types.SaveSEConfig(this_1.state.seConfig));
                        };
                        if (tab instanceof SlamData_Types_Workspace_Notebook_Settings.SlamDataTab) {
                            return this_1.props.request(new SlamData_Types.SaveSDConfig(this_1.state.sdConfig));
                        };
                        throw new Error("Failed pattern match");
                    };
                })
            })([ React_DOM.rawText("Save") ]);
        };
    };
    var reifyTab = function (name) {
        return function ($$this) {
            return React_DOM.dd({
                className: "tab" + SlamData_Helpers.activate(SlamData_Types_Workspace_Notebook_Settings.eqSettingsTab({}))(name)($$this.state.active)
            })([ React_DOM.a({
                id: "settings-" + Prelude.show(SlamData_Types_Workspace_Notebook_Settings.showSettingsTab({}))(name), 
                onClick: function (_) {
                    return $$this.setState((function () {
                        var _2910 = {};
                        for (var _2911 in $$this.state) {
                            if ($$this.state.hasOwnProperty(_2911)) {
                                _2910[_2911] = $$this.state[_2911];
                            };
                        };
                        _2910.active = name;
                        return _2910;
                    })());
                }
            })([ React_DOM.rawText(Prelude.show(SlamData_Types_Workspace_Notebook_Settings.showSettingsTab({}))(name)) ]) ]);
        };
    };
    var slamDataTab = reifyTab(SlamData_Types_Workspace_Notebook_Settings.SlamDataTab.value);
    var slamEngineTab = reifyTab(SlamData_Types_Workspace_Notebook_Settings.SlamEngineTab.value);
    var tabs = function ($$this) {
        return React_DOM.div({
            className: "small-1 columns", 
            id: "settings-category"
        })([ React_DOM.dl({
            className: "tabs vertical"
        })([ slamEngineTab($$this), slamDataTab($$this) ]) ]);
    };
    var reifyContent = function (_832) {
        return function (_833) {
            if (_832 instanceof SlamData_Types_Workspace_Notebook_Settings.SlamEngineTab) {
                return React_DOM.div({
                    className: "content" + SlamData_Helpers.activate(SlamData_Types_Workspace_Notebook_Settings.eqSettingsTab({}))(SlamData_Types_Workspace_Notebook_Settings.SlamEngineTab.value)(_833.state.active)
                })([ React_DOM.h6({})([ React_DOM.rawText("Settings for the local instance of SlamEngine") ]), React_DOM.form({})([ SlamData_App_Workspace_Notebook_Settings_SlamEngine.slamEngineServerSettings(_833), SlamData_App_Workspace_Notebook_Settings_SlamEngine.slamEngineMountingsSettings(_833), SlamData_App_Workspace_Notebook_Settings_SlamEngine.slamEngineJavaSettings(_833), saveConfig(_833)(SlamData_Types_Workspace_Notebook_Settings.SlamEngineTab.value) ]) ]);
            };
            if (_832 instanceof SlamData_Types_Workspace_Notebook_Settings.SlamDataTab) {
                return React_DOM.div({
                    className: "content" + SlamData_Helpers.activate(SlamData_Types_Workspace_Notebook_Settings.eqSettingsTab({}))(SlamData_Types_Workspace_Notebook_Settings.SlamDataTab.value)(_833.state.active)
                })([ React_DOM.h6({})([ React_DOM.rawText("SlamEngine server to connect to") ]), React_DOM.form({})([ SlamData_App_Workspace_Notebook_Settings_SlamData.slamDataServerSettings(_833), saveConfig(_833)(SlamData_Types_Workspace_Notebook_Settings.SlamDataTab.value) ]) ]);
            };
            throw new Error("Failed pattern match");
        };
    };
    var slamDataContent = reifyContent(SlamData_Types_Workspace_Notebook_Settings.SlamDataTab.value);
    var slamEngineContent = reifyContent(SlamData_Types_Workspace_Notebook_Settings.SlamEngineTab.value);
    var contents = function ($$this) {
        return React_DOM.div({
            className: "small-11 columns", 
            id: "settings-content"
        })([ React_DOM.div({
            className: "tabs-content vertical"
        })([ slamEngineContent($$this), slamDataContent($$this) ]) ]);
    };
    var settings = React.createClass((function () {
        var _2914 = {};
        for (var _2915 in React.spec) {
            if (React.spec.hasOwnProperty(_2915)) {
                _2914[_2915] = React.spec[_2915];
            };
        };
        _2914.displayName = "Settings";
        _2914.getInitialState = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))({
                active: SlamData_Types_Workspace_Notebook_Settings.SlamEngineTab.value, 
                sdConfig: $$this.props.state.settings.sdConfig, 
                seConfig: $$this.props.state.settings.seConfig
            });
        };
        _2914.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.div({
                className: "vertical"
            })([ tabs(React.coerceThis($$this)), contents(React.coerceThis($$this)) ]));
        };
        return _2914;
    })());
    return {
        settings: settings
    };
})();
var PS = PS || {};
PS.SlamData_App_Workspace_Notebook = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var SlamData_Types_Workspace_Notebook = PS.SlamData_Types_Workspace_Notebook;
    var React_DOM = PS.React_DOM;
    var React = PS.React;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Data_Maybe = PS.Data_Maybe;
    var SlamData_Components = PS.SlamData_Components;
    var SlamData_Types_Workspace_Notebook_Block = PS.SlamData_Types_Workspace_Notebook_Block;
    var SlamData_App_Workspace_Notebook_Block = PS.SlamData_App_Workspace_Notebook_Block;
    var SlamData_Types = PS.SlamData_Types;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Data_Array = PS.Data_Array;
    var SlamData_App_Workspace_Notebook_Settings = PS.SlamData_App_Workspace_Notebook_Settings;
    var Data_Function = PS.Data_Function;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Lens = PS.SlamData_Lens;
    var Data_Const = PS.Data_Const;
    var Node_UUID = PS.Node_UUID;
    var settingsTab = function ($$this) {
        return {
            ident: $$this.state.settingsId, 
            blocks: [  ], 
            name: "Settings", 
            path: ""
        };
    };
    var renameAction = function (_842) {
        return function (_843) {
            return React_DOM.li({})([ React_DOM.a({
                className: "tiny secondary button has-tooltip", 
                onClick: React.eventHandler(_842)(function (this_1) {
                    return function (_) {
                        return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState((function () {
                            var _2918 = {};
                            for (var _2919 in this_1.state) {
                                if (this_1.state.hasOwnProperty(_2919)) {
                                    _2918[_2919] = this_1.state[_2919];
                                };
                            };
                            _2918.renaming = new Data_Maybe.Just(_843.name);
                            return _2918;
                        })()));
                    };
                }), 
                title: "Rename"
            })([ SlamData_Components.renameIcon ]) ]);
        };
    };
    var reifyBlock = function (_838) {
        return function (_839) {
            return function (_840) {
                return SlamData_App_Workspace_Notebook_Block.block({
                    block: _840, 
                    key: _840.ident, 
                    notebook: _839, 
                    request: _838.props.request, 
                    files: _838.props.state.files
                })([  ]);
            };
        };
    };
    var noteBookName = function (_844) {
        return function (_845) {
            if (_844.state.renaming instanceof Data_Maybe.Just) {
                return React_DOM.input({
                    onBlur: React.eventHandler(_844)(function (this_1) {
                        return function (e) {
                            return function __do() {
                                this_1.props.request(new SlamData_Types.RenameNotebook(_845, SlamData_Helpers.value(e.target)))();
                                return this_1.setState((function () {
                                    var _2926 = {};
                                    for (var _2927 in this_1.state) {
                                        if (this_1.state.hasOwnProperty(_2927)) {
                                            _2926[_2927] = this_1.state[_2927];
                                        };
                                    };
                                    _2926.renaming = Data_Maybe.Nothing.value;
                                    return _2926;
                                })());
                            };
                        };
                    }), 
                    onChange: React.eventHandler(_844)(function (this_1) {
                        return function (e) {
                            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState((function () {
                                var _2928 = {};
                                for (var _2929 in this_1.state) {
                                    if (this_1.state.hasOwnProperty(_2929)) {
                                        _2928[_2929] = this_1.state[_2929];
                                    };
                                };
                                _2928.renaming = Data_Maybe.Just.create(SlamData_Helpers.value(e.target));
                                return _2928;
                            })()));
                        };
                    }), 
                    value: _844.state.renaming.value0
                })([  ]);
            };
            if (_844.state.renaming instanceof Data_Maybe.Nothing) {
                return React_DOM.rawText(_845.name);
            };
            throw new Error("Failed pattern match");
        };
    };
    var reifyTabs = function (_834) {
        return function (_835) {
            if (Prelude["=="](SlamData_Types_Workspace_Notebook.eqNotebookID({}))(_835.ident)(_834.state.settingsId)) {
                return React_DOM.dd({
                    className: "tab" + SlamData_Helpers.activate(Data_Maybe.eqMaybe(SlamData_Types_Workspace_Notebook.eqNotebookID({})))(new Data_Maybe.Just(_835.ident))(_834.state.active)
                })([ React_DOM.a({
                    id: "notebook-Settings", 
                    onClick: React.eventHandler(_834)(function (this_1) {
                        return function (_) {
                            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_1.setState((function () {
                                var _2933 = {};
                                for (var _2934 in this_1.state) {
                                    if (this_1.state.hasOwnProperty(_2934)) {
                                        _2933[_2934] = this_1.state[_2934];
                                    };
                                };
                                _2933.active = new Data_Maybe.Just(_835.ident);
                                return _2933;
                            })()));
                        };
                    })
                })([ React_DOM.rawText(_835.name), React_DOM.i({
                    className: "fa fa-times", 
                    onClick: React.eventHandler(_834)(function (this_1) {
                        return function (_) {
                            return function __do() {
                                Prelude["=="](Data_Maybe.eqMaybe(SlamData_Types_Workspace_Notebook.eqNotebookID({})))(this_1.state.active)(new Data_Maybe.Just(_835.ident)) ? this_1.setState((function () {
    var _2935 = {};
    for (var _2936 in this_1.state) {
        if (this_1.state.hasOwnProperty(_2936)) {
            _2935[_2936] = this_1.state[_2936];
        };
    };
    _2935.active = Data_Maybe.Nothing.value;
    return _2935;
})()) : Prelude.unit;
                                return this_1.props.request(SlamData_Types.HideSettings.value)();
                            };
                        };
                    })
                })([  ]) ]) ]);
            };
            return React_DOM.dd({
                className: "tab" + SlamData_Helpers.activate(Data_Maybe.eqMaybe(SlamData_Types_Workspace_Notebook.eqNotebookID({})))(new Data_Maybe.Just(_835.ident))(_834.state.active)
            })([ React_DOM.a({
                onClick: React.eventHandler(_834)(function (this_2) {
                    return function (_) {
                        return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(this_2.setState((function () {
                            var _2937 = {};
                            for (var _2938 in this_2.state) {
                                if (this_2.state.hasOwnProperty(_2938)) {
                                    _2937[_2938] = this_2.state[_2938];
                                };
                            };
                            _2937.active = new Data_Maybe.Just(_835.ident);
                            return _2937;
                        })()));
                    };
                })
            })([ noteBookName(React.coerceThis(_834))(_835), React_DOM.i({
                className: "fa fa-times", 
                onClick: React.eventHandler(_834)(function (this_2) {
                    return function (_) {
                        return function __do() {
                            Prelude["=="](Data_Maybe.eqMaybe(SlamData_Types_Workspace_Notebook.eqNotebookID({})))(this_2.state.active)(new Data_Maybe.Just(_835.ident)) ? this_2.setState((function () {
    var _2939 = {};
    for (var _2940 in this_2.state) {
        if (this_2.state.hasOwnProperty(_2940)) {
            _2939[_2940] = this_2.state[_2940];
        };
    };
    _2939.active = Data_Maybe.Nothing.value;
    return _2939;
})()) : Prelude.unit;
                            return this_2.props.request(new SlamData_Types.CloseNotebook(_835.ident))();
                        };
                    };
                })
            })([  ]) ]) ]);
        };
    };
    var externalActions = function ($$this) {
        return function (nb) {
            return React_DOM.ul({
                className: "button-group"
            })([ SlamData_Components.actionButton($$this)(new SlamData_Types.SaveNotebook(nb))("Save")(SlamData_Components.saveIcon), renameAction($$this)(nb) ]);
        };
    };
    var createNotebookButton = function ($$this) {
        return React_DOM.dd({
            className: "tab"
        })([ React_DOM.div({})([ React_DOM.a({
            id: "add-notebook", 
            onClick: React.eventHandler($$this)(function (this_1) {
                return Prelude.pure(Prelude.applicativeArr({}))(this_1.props.request(SlamData_Types.CreateNotebook.value));
            })
        })([ SlamData_Components.newNotebookIcon ]) ]) ]);
    };
    var blockIcon = function (_841) {
        if (_841 === "Markdown") {
            return SlamData_Components.markdownIcon;
        };
        if (_841 === "SQL") {
            return SlamData_Components.sqlIcon;
        };
        if (_841 === "Visual") {
            return SlamData_Components.visualIcon;
        };
        throw new Error("Failed pattern match");
    };
    var actions = function (f) {
        return function (ident) {
            return function (ty) {
                return f(new SlamData_Types.CreateBlock(ident, ty))(Prelude.show(SlamData_Types_Workspace_Notebook_Block.showBlockType({}))(ty))(blockIcon(ty));
            };
        };
    };
    var internalActions = function ($$this) {
        return function (ident) {
            return React_DOM.ul({
                className: "button-group"
            })(Prelude["<$>"](Data_Array.functorArray({}))(actions(SlamData_Components.actionButton($$this))(ident))(Prelude["<$>"](Data_Array.functorArray({}))(SlamData_Types_Workspace_Notebook_Block.BlockType.create)([ "Markdown", "SQL", "Visual" ])));
        };
    };
    var reifyContent = function (_836) {
        return function (_837) {
            if (Prelude["=="](SlamData_Types_Workspace_Notebook.eqNotebookID({}))(_837.ident)(_836.state.settingsId)) {
                return React_DOM.div({
                    className: "content" + SlamData_Helpers.activate(Data_Maybe.eqMaybe(SlamData_Types_Workspace_Notebook.eqNotebookID({})))(new Data_Maybe.Just(_837.ident))(_836.state.active)
                })([ SlamData_App_Workspace_Notebook_Settings.settings({
                    request: _836.props.request, 
                    state: _836.props.state
                })([  ]) ]);
            };
            return React_DOM.div({
                className: "content" + SlamData_Helpers.activate(Data_Maybe.eqMaybe(SlamData_Types_Workspace_Notebook.eqNotebookID({})))(new Data_Maybe.Just(_837.ident))(_836.state.active)
            })([ React_DOM.div({
                className: "toolbar button-bar"
            })([ externalActions(_836)(_837), internalActions(_836)(_837.ident) ]), React_DOM.hr({})([  ]), React_DOM.div({
                className: "actual-content"
            })(Prelude["<$>"](Data_Array.functorArray({}))(reifyBlock(_836)(_837))(_837.blocks)) ]);
        };
    };
    var notebooks = React.createClass((function () {
        var _2950 = {};
        for (var _2951 in React.spec) {
            if (React.spec.hasOwnProperty(_2951)) {
                _2950[_2951] = React.spec[_2951];
            };
        };
        _2950.displayName = "Notebooks";
        _2950.componentWillReceiveProps = function ($$this, props) {
            return props.state.showSettings && !$$this.props.state.showSettings ? Prelude.pure(Control_Monad_Eff.applicativeEff({}))($$this.setState((function () {
    var _2944 = {};
    for (var _2945 in $$this.state) {
        if ($$this.state.hasOwnProperty(_2945)) {
            _2944[_2945] = $$this.state[_2945];
        };
    };
    _2944.active = new Data_Maybe.Just($$this.state.settingsId);
    return _2944;
})())) : Data_Array.length(props.state.notebooks) > Data_Array.length($$this.props.state.notebooks) ? (function () {
    var active = Prelude["<$>"](Data_Maybe.functorMaybe({}))(Prelude.flip(Control_Lens["^."])(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._notebookRec(Data_Const.functorConst({})))(SlamData_Lens._ident(Data_Const.functorConst({})))))(Data_Array.head(Data_Array["\\\\"](SlamData_Types_Workspace_Notebook.eqNotebook({}))(props.state.notebooks)($$this.props.state.notebooks)));
    return Prelude.pure(Control_Monad_Eff.applicativeEff({}))($$this.setState((function () {
        var _2946 = {};
        for (var _2947 in $$this.state) {
            if ($$this.state.hasOwnProperty(_2947)) {
                _2946[_2947] = $$this.state[_2947];
            };
        };
        _2946.active = active;
        return _2946;
    })()));
})() : Data_Array.length(props.state.notebooks) < Data_Array.length($$this.props.state.notebooks) ? (function () {
    var active = Prelude["<$>"](Data_Maybe.functorMaybe({}))(Prelude.flip(Control_Lens["^."])(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._notebookRec(Data_Const.functorConst({})))(SlamData_Lens._ident(Data_Const.functorConst({})))))(Data_Array.head(props.state.notebooks));
    return Prelude.pure(Control_Monad_Eff.applicativeEff({}))($$this.setState((function () {
        var _2948 = {};
        for (var _2949 in $$this.state) {
            if ($$this.state.hasOwnProperty(_2949)) {
                _2948[_2949] = $$this.state[_2949];
            };
        };
        _2948.active = active;
        return _2948;
    })()));
})() : Prelude.pure(Control_Monad_Eff.applicativeEff({}))(Prelude.unit);
        };
        _2950.getInitialState = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))({
                settingsId: SlamData_Types_Workspace_Notebook.NotebookID.create(Node_UUID.runUUID(Node_UUID.v4)), 
                active: Data_Maybe.Nothing.value, 
                renaming: Data_Maybe.Nothing.value
            });
        };
        _2950.render = function ($$this) {
            var settings = $$this.props.state.showSettings ? [ settingsTab($$this) ] : [  ];
            var tabs = Prelude["<$>"](Data_Array.functorArray({}))(reifyTabs(React.coerceThis($$this)))(Prelude["++"](Data_Array.semigroupArray({}))($$this.props.state.notebooks)(settings));
            var tabs$prime = Data_Array.snoc(tabs)(createNotebookButton(React.coerceThis($$this)));
            var content = Prelude["<$>"](Data_Array.functorArray({}))(reifyContent(React.coerceThis($$this)))(Prelude["++"](Data_Array.semigroupArray({}))($$this.props.state.notebooks)(settings));
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.div({
                className: "slamdata-panel"
            })([ React_DOM.dl({
                className: "tabs"
            })(tabs$prime), React_DOM.div({
                className: "tabs-content"
            })(content) ]));
        };
        return _2950;
    })());
    return {
        notebooks: notebooks
    };
})();
var PS = PS || {};
PS.SlamData_App_Workspace = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var React_DOM = PS.React_DOM;
    var SlamData_App_Workspace_FileSystem = PS.SlamData_App_Workspace_FileSystem;
    var SlamData_App_Workspace_Notebook = PS.SlamData_App_Workspace_Notebook;
    var SlamData_Types = PS.SlamData_Types;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Map = PS.Data_Map;
    var React = PS.React;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Control_Reactive_Timer = PS.Control_Reactive_Timer;
    var workspace$prime = function (props) {
        return React_DOM.div({
            className: "row", 
            id: "main-row"
        })([ React_DOM.div({
            className: "small-5 medium-3 large-2 columns", 
            id: "filesystem"
        })([ SlamData_App_Workspace_FileSystem.filesystem({
            files: props.state.files, 
            request: props.request
        })([  ]) ]), React_DOM.div({
            className: "small-7 medium-9 large-10 columns", 
            id: "notebook"
        })([ SlamData_App_Workspace_Notebook.notebooks(props)([  ]) ]) ]);
    };
    var path = function (_846) {
        return SlamData_Helpers.getOrElse(Data_Array.head(Prelude["<$>"](Data_Array.functorArray({}))(Data_Tuple.fst)(Data_Map.toList(_846.settings.seConfig.mountings))))(SlamData_Helpers.defaultMountPath);
    };
    var workspace = React.createClass((function () {
        var _2956 = {};
        for (var _2957 in React.spec) {
            if (React.spec.hasOwnProperty(_2957)) {
                _2956[_2957] = React.spec[_2957];
            };
        };
        _2956.displayName = "Workspace";
        _2956.requestFS = function ($$this) {
            return $$this.props.request(new SlamData_Types.ReadFileSystem([ path($$this.props.state) ]));
        };
        _2956.componentDidMount = function ($$this) {
            return function __do() {
                $$this.requestFS();
                Control_Reactive_Timer.interval(5000)($$this.requestFS)();
                return Prelude.unit;
            };
        };
        _2956.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.div({
                id: "workspace"
            })([ workspace$prime({
                request: $$this.props.request, 
                state: $$this.props.state
            }) ]));
        };
        return _2956;
    })());
    return {
        workspace: workspace
    };
})();
var PS = PS || {};
PS.SlamData_App = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var React = PS.React;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var React_DOM = PS.React_DOM;
    var SlamData_App_Menu = PS.SlamData_App_Menu;
    var SlamData_App_Workspace = PS.SlamData_App_Workspace;
    var app = React.createClass((function () {
        var _2958 = {};
        for (var _2959 in React.spec) {
            if (React.spec.hasOwnProperty(_2959)) {
                _2958[_2959] = React.spec[_2959];
            };
        };
        _2958.displayName = "App";
        _2958.getInitialState = function (_) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))({
                showSettings: false
            });
        };
        _2958.render = function ($$this) {
            return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(React_DOM.div({})([ SlamData_App_Menu.menu($$this.props.request), SlamData_App_Workspace.workspace({
                request: $$this.props.request, 
                state: $$this.props.state
            })([  ]) ]));
        };
        return _2958;
    })());
    return {
        app: app
    };
})();
var PS = PS || {};
PS.SlamData = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Node_Events = PS.Node_Events;
    var SlamData_Types = PS.SlamData_Types;
    var React = PS.React;
    var SlamData_App = PS.SlamData_App;
    var request = function (emitter) {
        return function (state) {
            return function (ty) {
                return function __do() {
                    Node_Events.emit(Node_Events.eventEmitterEmitter({}))(SlamData_Types.requestEvent)({
                        state: state, 
                        event: ty
                    })(emitter)();
                    return Prelude.unit;
                };
            };
        };
    };
    var slamData = function (emitter) {
        return function (state) {
            return function __do() {
                React.renderComponentById(SlamData_App.app({
                    request: request(emitter)(state), 
                    state: state
                })([  ]))("content")();
                Node_Events.on(Node_Events.eventEmitterEmitter({}))(Node_Events.variadicArr({}))(SlamData_Types.responseEvent)(function (state_1) {
                    return React.renderComponentById(SlamData_App.app({
                        request: request(emitter)(state_1), 
                        state: state_1
                    })([  ]))("content");
                })(emitter)();
                return Prelude.unit;
            };
        };
    };
    return {
        slamData: slamData
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
    var Data_Argonaut = PS.Data_Argonaut;
    var Data_Argonaut_Printer = PS.Data_Argonaut_Printer;
    var Text_Parsing_Parser = PS.Text_Parsing_Parser;
    var Data_Maybe = PS.Data_Maybe;
    var Node_Events = PS.Node_Events;
    var Control_Alt = PS.Control_Alt;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var SlamData_Helpers = PS.SlamData_Helpers;
    var SlamData_Types = PS.SlamData_Types;
    var Control_Lens = PS.Control_Lens;
    var SlamData_Lens = PS.SlamData_Lens;
    var Data_Const = PS.Data_Const;
    var Data_Array = PS.Data_Array;
    var Data_Map = PS.Data_Map;
    var Data_Tuple = PS.Data_Tuple;
    var Node_ChildProcess = PS.Node_ChildProcess;
    var Data_Function = PS.Data_Function;
    var Node_Webkit = PS.Node_Webkit;
    var Node_ChildProcess_Signal = PS.Node_ChildProcess_Signal;
    var Node_FS_Sync = PS.Node_FS_Sync;
    var Node_Encoding = PS.Node_Encoding;
    var SlamData = PS.SlamData;
    var SlamData_Types_Workspace_FileSystem = PS.SlamData_Types_Workspace_FileSystem;
    var platform = process.platform;;
    function unsafeEnv(nothing) {  return function(just) {    return function(key) {      var val = process.env[key];      return val == null ? nothing : just(val);    }  }};
    function requireConfig(location) {  return JSON.stringify(require(location));};
    var $less$div$greater = function (fp) {
        return function (fp$prime) {
            return Node_Path.join([ fp, fp$prime ]);
        };
    };
    var showError = Data_Either.either(Debug_Trace.print(Control_Monad_Eff_Exception.showError({})))(Prelude.pure(Control_Monad_Eff.applicativeEff({})));
    var showConfig = function (__dict_EncodeJson_765) {
        return Prelude[">>>"](Prelude.semigroupoidArr({}))(Data_Argonaut.encodeJson(__dict_EncodeJson_765))(Data_Argonaut.printJson(Data_Argonaut_Printer.printerJNull({})));
    };
    var seJar = $less$div$greater("jar")("slamengine_2.10-0.1-SNAPSHOT-one-jar.jar");
    var parseConfig = function (__dict_DecodeJson_766) {
        return function (config) {
            var _2960 = Text_Parsing_Parser.runParser(requireConfig(config))(Data_Argonaut.jsonParser);
            if (_2960 instanceof Data_Either.Left) {
                return Data_Maybe.Nothing.value;
            };
            if (_2960 instanceof Data_Either.Right) {
                return Data_Argonaut.decodeMaybe(__dict_DecodeJson_766)(_2960.value0);
            };
            throw new Error("Failed pattern match");
        };
    };
    var onData = function (__dict_EventEmitter_767) {
        return Node_Events.on(__dict_EventEmitter_767)(Node_Events.variadicFn1({}))("data");
    };
    var env = unsafeEnv(Data_Maybe.Nothing.value)(Data_Maybe.Just.create);
    var linuxConfigHome = Control_Alt["<|>"](Data_Maybe.altMaybe({}))(env("XDG_CONFIG_HOME"))(Prelude["<$>"](Data_Maybe.functorMaybe({}))(function (home) {
        return $less$div$greater(home)(".config");
    })(env("HOME")));
    var resolveConfigDir = (function () {
        if (platform === "darwin") {
            return $less$div$greater($less$div$greater($less$div$greater(Data_Maybe_Unsafe.fromJust(env("HOME")))("Library"))("Application Support"))("slamdata");
        };
        if (platform === "linux") {
            return $less$div$greater(Data_Maybe_Unsafe.fromJust(linuxConfigHome))("slamdata");
        };
        if (platform === "win32") {
            return $less$div$greater(Data_Maybe_Unsafe.fromJust(env("LOCALAPPDATA")))("slamdata");
        };
        throw new Error("Failed pattern match");
    })();
    var sdConfigFile = $less$div$greater(resolveConfigDir)("slamdata-config.json");
    var seConfigFile = $less$div$greater(resolveConfigDir)("slamengine-config.json");
    var main = (function () {
        var sdConfig = SlamData_Helpers.getOrElse(parseConfig(SlamData_Types.decodeSDConfig({}))(sdConfigFile))(SlamData_Helpers.defaultSDConfig);
        var seConfig = SlamData_Helpers.getOrElse(parseConfig(SlamData_Types.decodeSEConfig({}))(seConfigFile))(SlamData_Helpers.defaultSEConfig);
        var java = Control_Lens["^."](sdConfig)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._sdConfigRec(Data_Const.functorConst({})))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._nodeWebkit(Data_Const.functorConst({})))(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._sdConfigNodeWebkit(Data_Const.functorConst({})))(SlamData_Lens._java(Data_Const.functorConst({}))))));
        var mounts = Data_Array.head(Data_Map.toList(Control_Lens["^."](seConfig)(Control_Lens[".."](Prelude.semigroupoidArr({}))(SlamData_Lens._seConfigRec(Data_Const.functorConst({})))(SlamData_Lens._mountings(Data_Const.functorConst({}))))));
        var mount = SlamData_Helpers.getOrElse(Prelude["<$>"](Data_Maybe.functorMaybe({}))(Data_Tuple.fst)(mounts))(SlamData_Helpers.defaultMountPath);
        return function __do() {
            var _129 = Node_ChildProcess.spawn(java)([ "-jar", seJar, seConfigFile ])(Node_ChildProcess.defaultSpawnOptions)();
            onData(Node_ChildProcess.eventEmitterStreamStdout({}))(function (msg) {
                return Debug_Trace.trace("stdout: " + msg);
            })(_129.stdout)();
            onData(Node_ChildProcess.eventEmitterStreamStderr({}))(function (msg) {
                return Debug_Trace.trace("stderr: " + msg);
            })(_129.stderr)();
            var _128 = Prelude[">>="](Control_Monad_Eff.bindEff({}))(Node_Webkit.nwWindow)(Node_Webkit.get)();
            Node_Webkit.onNewWinPolicy(function (_, url, policy) {
                return function __do() {
                    Prelude[">>="](Control_Monad_Eff.bindEff({}))(Node_Webkit.nwShell)(Node_Webkit.openExternal(url))();
                    return Node_Webkit.ignore(policy)();
                };
            })(_128)();
            Node_Webkit.onClose(function () {
                return function __do() {
                    _129.kill(Node_ChildProcess_Signal.sigterm);
                    Node_Webkit.closeWindow(_128)();
                    return Prelude.unit;
                };
            })(_128)();
            var _127 = Node_Events.emitter();
            Node_Events.on(Node_Events.eventEmitterEmitter({}))(Node_Events.variadicArr({}))(SlamData_Types.requestEvent)(function (event) {
                if (event instanceof SlamData_Types.SaveSDConfig) {
                    return Node_FS_Sync.writeTextFile(Node_Encoding.UTF8.value)(sdConfigFile)(showConfig(SlamData_Types.encodeSDConfig({}))(event.value0));
                };
                if (event instanceof SlamData_Types.SaveSEConfig) {
                    return Node_FS_Sync.writeTextFile(Node_Encoding.UTF8.value)(seConfigFile)(showConfig(SlamData_Types.encodeSEConfig({}))(event.value0));
                };
                return function __do() {
                    var _ = Node_Events.emit(Node_Events.eventEmitterEmitter({}))(SlamData_Types.responseEvent)("butts")(_127)();
                    return Debug_Trace.trace("butts")();
                };
            })(_127)();
            return SlamData.slamData(_127)({
                files: {
                    name: mount, 
                    type: "directory", 
                    children: [  ]
                }, 
                notebooks: [  ], 
                settings: {
                    sdConfig: sdConfig, 
                    seConfig: seConfig
                }, 
                showSettings: false
            })();
        };
    })();
    return {
        undefined: undefined, 
        main: main, 
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
PS.Text_Parsing_Parser_Token = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    return {};
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
    function unsafeKey(storage) {  return function(num) {    return null2Maybe(storage.key(num));  }};
    function unsafeGetItem(storage) {  return function(str) {    return null2Maybe(storage.getItem(str));  }};
    function unsafeSetItem(storage) {  return function(str) {    return function(val) {      storage.setItem(str, val);      return storage;    }  }};
    function unsafeRemoveItem(storage) {  return function(str) {    storage.removeItem(str);    return storage;  }};
    function unsafeClear(storage) {  storage.clear();  return storage;};
    function null2Maybe(n) {  return n == null ? nothing : just(n);};
    var storageSessionStorage = function (__unused) {
        return new Storage(function (_858) {
            return unsafeClear(sessionStorage);
        }, function (_855) {
            return unsafeGetItem(sessionStorage);
        }, function (_854) {
            return unsafeKey(sessionStorage);
        }, function (_853) {
            return unsafeLength(sessionStorage);
        }, function (_857) {
            return unsafeRemoveItem(sessionStorage);
        }, function (_856) {
            return unsafeSetItem(sessionStorage);
        });
    };
    var storageLocalStorage = function (__unused) {
        return new Storage(function (_852) {
            return unsafeClear(localStorage);
        }, function (_849) {
            return unsafeGetItem(localStorage);
        }, function (_848) {
            return unsafeKey(localStorage);
        }, function (_847) {
            return unsafeLength(localStorage);
        }, function (_851) {
            return unsafeRemoveItem(localStorage);
        }, function (_850) {
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
PS.SlamData_NodeWebkit.main();
