const NUMBER = "NUMBER";
const STRING = "STRING";
const RETURN = "RETURN";
const LET = "LET";
const IF = "IF";
const ELSE = "ELSE";
const FUNCTION = "FUNCTION";
const EQUAL_SIGN = "EQUAL_SIGN"
const OPEN_BRACE = "{";
const CLOSE_BRACE = "}";
const OPEN_CURVE = "(";
const CLOSE_CURVE = ")";
const SEMICOLON = ";";
const LITERAL = "LITERAL";
const OPEN_SQUARE_BRACKET = "[";
const CLOSE_SQUARE_BRACKET = "]";
const COMMA = ",";
const UNDEFINED = "undefined";
const NULL = "null";
const PLUS = "+";
const MINUS = "-";
const PRODUCT = "*";
const DIVIDE = "/";
const OPERATOR = "OPERATOR";
export const keywords = {
    NUMBER, STRING, LITERAL, RETURN,
    LET, IF, ELSE, FUNCTION,
    OPEN_BRACE, CLOSE_BRACE,
    OPEN_SQUARE_BRACKET,
    CLOSE_SQUARE_BRACKET,
    COMMA, UNDEFINED, NULL, SEMICOLON,
    PLUS, MINUS, PRODUCT, DIVIDE, OPERATOR, EQUAL_SIGN,
    OPEN_CURVE, CLOSE_CURVE
};

export class Token {
    constructor({literal, start, end, line, type = LITERAL}) {
        Object.assign(this, {literal, start, end, line, type});
    }
}

export class Tokenize {
    isLiteral(str) {
        return /[a-zA-Z0-9\.]/.exec(str);
    }

    isSpace(str) {
        return /\s/.exec(str);
    }

    isOperator(str) {
        return "+-*/".indexOf(str) > -1;
    }

    isNumber(str) {
        return /^(-?[0-9])+(\.[0-9]+)?/.exec(str);
    }

    isLet(str) {
        return str === 'let';
    }

    isFunction(str) {
        return str === 'function'
    }

    isIf(str) {
        return str === 'if'
    }

    isReturn(str) {
        return str === 'return'
    }

    isElse = str => str === 'else'

    isEqualsSign(str) {
        return str === '='
    }

    isSemicolon(str) {
        return str === ';'
    }

    isColon(str) {
        return str === '"';
    }

    isComma = str => str === ",";
    isOpenBrace = (str) => str === "{";
    isCloseBrace = str => str === "}"
    isOpenCurve = str => str === "(";
    isCloseCurve = str => str === ")";
    isOpenSquareBracket = str => str === '[';
    isCloseSquareBracket = str => str === ']';


    tokenize(raw) {
        let i = 0;
        let ret = [];
        let count = 0;
        while (i < raw.length) {
            let literal = "";
            while (i < raw.length && this.isSpace(raw[i]))
                i++;
            while (i < raw.length && this.isLiteral(raw[i])) {
                literal += raw[i];
                i++;
            }
            if (literal) {
                if (this.isNumber(literal)) {
                    ret.push(new Token({literal, end: i - 1, type: NUMBER}))
                } else if (this.isReturn(literal)) {
                    ret.push(new Token({literal, end: i - 1, type: RETURN}))
                } else if (this.isLet(literal)) {
                    ret.push(new Token({literal, end: i - 1, type: LET}))
                } else if (this.isIf(literal)) {
                    ret.push(new Token({literal, end: i - 1, type: IF}))
                } else if (this.isElse(literal)) {
                    ret.push(new Token({literal, end: i - 1, type: ELSE}))
                } else if (this.isFunction(literal)) {
                    ret.push(new Token({literal, end: i - 1, type: FUNCTION}))
                } else {
                    ret.push(new Token({literal, end: i - 1}));
                }


            }
            if (i < raw.length && this.isOperator(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: OPERATOR}));
                i++;
            }

            if (i < raw.length && this.isEqualsSign(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: EQUAL_SIGN}));
                i++;
            }
            if (i < raw.length && this.isSemicolon(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: SEMICOLON}));
                i++;
            }

            if (i < raw.length && this.isColon(raw[i])) {
                let str = '';
                while (i < raw.length && !this.isColon(raw[++i])) {
                    str += raw[i];
                }
                ret.push(new Token({literal: str, type: STRING, end: i}))
                i++;
            }
            if (i < raw.length && this.isCloseBrace(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: CLOSE_BRACE}));
                i++;
            }
            if (i < raw.length && this.isOpenBrace(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: OPEN_BRACE}));
                i++;
            }
            if (i < raw.length && this.isOpenCurve(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: OPEN_CURVE}));
                i++;
            }
            if (i < raw.length && this.isCloseCurve(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: CLOSE_CURVE}));
                i++;
            }
            if (i < raw.length && this.isOpenSquareBracket(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: OPEN_SQUARE_BRACKET}));
                i++;
            }
            if (i < raw.length && this.isCloseSquareBracket(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: CLOSE_SQUARE_BRACKET}));
                i++;
            }
            if (i < raw.length && this.isComma(raw[i])) {
                ret.push(new Token({literal: raw[i], end: i, type: COMMA}));
                i++;
            }

            if (count++ > 100) {
                return ret;
            }
        }
        return ret;
    }

}
