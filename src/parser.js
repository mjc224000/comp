import {Token, keywords as type} from "./tokenize";

/**
 * 所有表达式 返回[数组或literal,结束位置]
 */
class Expression {
    constructor(val) {
    }
}

class Null {

}

class Identifier {
    type = "identifier"
    name

    constructor(name) {
        this.name = name;
    }
}

class BinaryExpression {
    left
    right
    type = "BinaryExpression"
    operator

    constructor({left, right, operator}) {
        Object.assign(this, {left, right, operator})
    }
}

class Literal {
    type = 'literal'
    value
    raw

    constructor({value, raw}) {
        Object.assign(this, {value, raw});
    }
}

class Statement {
    constructor() {
    }
}

class FunctionDeclaration extends Statement {
    constructor({identifier, body}) {
        super();
        Object.assign(this, {identifier, body})
    }
}

class ArrayExpression extends Expression {
    type = "ArrayExpression";
    elements = []

    constructor(els) {
        super();
        this.elements = els;
    }
}

class VariableDeclaration extends Statement {
    identifier = null;
    init = undefined;
    kind = "let";

    constructor({identifier, init}) {
        super();
        Object.assign(this, {identifier, init})
    }
}

class Program {
    type = "Program"
    body = []

    constructor(_body) {
        this.body = _body;
    }
}

export class Parser {
    program = null;
    priority = {
        [type.PLUS]: 1,
        [type.MINUS]: 1,
        [type.PRODUCT]: 2,
        [type.DIVIDE]: 2,
        [type.CLOSE_CURVE]:3
    }

    handleArrayExpression(tokens, start) {
        let index = start;
        let cur = tokens[++index];
        let ret = [];
        while (cur.type !== type.CLOSE_SQUARE_BRACKET) {
            /**
             * an element can be either a literal or an expression
             * @type {*[]}
             */
            let elementTokens = [];
            while (cur.type !== type.COMMA) {
                elementTokens.push(cur);
                cur = tokens[++index];
            }
            switch (elementTokens.length) {
                case 0: {
                    ret.push(new Null());
                    break;
                }
                case 1: {
                    ret.push(new Literal({value: elementTokens[0].literal, raw: elementTokens[0].literal}));
                    break;
                }
                default : {
                    ret.push(this.travel(elementTokens, 0, elementTokens.length - 1))
                }
            }
            cur = tokens[++index];
        }

        return [ret, index - 1]
    }

    handleExpression(tokens) {
        if (tokens.length === 1) {
            return new Literal({value: tokens[0].literal, raw: tokens[0].literal})
        }
        let liberalStack = [];
        let operatorStack = [];
        let preOperator;
        for (let i = 0; i < tokens.length; i++) {
            let cur = tokens[i];
            if (cur.type === type.OPERATOR) {
               if (preOperator) {
                    if (this.priority[preOperator[type]] >= this.priority[cur.type]) {
                        let l1=liberalStack.pop();
                        let l2=liberalStack.pop();

                    }
                }
                operatorStack.push(cur);
                preOperator = cur;
            } else if (cur.type === type.NUMBER || cur.type === type.LITERAL) {
                liberalStack.push(cur);
            } else if (cur.type === type.CLOSE_CURVE) {
                let operator = operatorStack.pop();
                let l1 = liberalStack.pop();
                let l2 = liberalStack.pop();

            }

        }

        return null;
    }


    parser(tokens) {
        if (this.program === null) {
            let ret = this.travel(tokens, 0, tokens.length - 1, this.program);
            this.program = new Program(ret);
            return this.program;
        }
    }

    travel(tokens, left, right) {
        let ret = [];

        while (left <= right) {
            /**
             * let identifier = init;
             */

            if (tokens[left].type === type.LET) {
                /**
                 * pass let,index->identifier
                 */

                let identifier = new Identifier(tokens[++left]);
                let init;
                // pass equal sign,index-> "="
                left++;
                //index->first token of expression
                let initToken = tokens[++left];
                let cur = initToken;
                let initExpression = [];
                while (cur.type !== type.SEMICOLON) {
                    initExpression.push(cur);
                    cur = tokens[++left];
                }
                switch (initToken.type) {
                    /**
                     * starts with a "[" ,init is an array,left->"["
                     */
                    case type.OPEN_SQUARE_BRACKET: {
                        break;
                    }
                    case  type.LITERAL: {
                        break;
                    }
                    case type.NUMBER: {
                        init = this.handleExpression(tokens);
                        break;
                    }

                }
                ret.push(new VariableDeclaration({identifier, init}));
                left++;
            }
            if (tokens[left] && tokens[left].type === type.LITERAL) {

            }


        }
        return ret
    }

}

