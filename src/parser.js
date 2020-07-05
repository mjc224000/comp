import {keywords, keywords as type} from "./tokenize";

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

class Literal {
    type = 'literal'
    value

    constructor(val) {
        this.value = val;
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

    handleArrayExpression(tokens, start) {
        let index = start;
        let cur = tokens[++index];
        let ret = [];
        while (cur.type !== keywords.CLOSE_SQUARE_BRACKET) {
            /**
             * an element can be either a literal or an expression
             * @type {*[]}
             */
            let elementTokens = [];
            while (cur.type !== keywords.COMMA) {
                elementTokens.push(cur);
                cur = tokens[++index];
            }
            switch (elementTokens.length) {
                case 0:{
                    ret.push(new Null());
                    break;
                }
                case 1:{
                    ret.push(new Literal(elementTokens[0].literal));
                    break;
                }
                default :{
                    ret.push(this.travel(elementTokens,0,elementTokens.length-1))
                }
            }
            cur =tokens[++index];
        }

          return [ret,index-1]
    }
    handleExpression(tokens,start){
        let index=start;
        let cur=tokens[index];
        let stack=[];
        while (cur.type!=keywords.SEMICOLON){

        }

    }
    handleBinaryExpression() {

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
                // pass let,index->identifier
                let identifier = new Identifier(tokens[++left]);
                let init;
                // pass equal sign,index-> "="
                left++;
                //index->first token of expression
                let initToken = tokens[++left];
                switch (initToken.type) {
                    /**
                     * starts with a "[" ,init is an array,left->"["
                     */
                    case keywords.OPEN_SQUARE_BRACKET: {
                        let [arrayExpression, _left] = this.handleArrayExpression(tokens, left);
                        left = _left;//"]"
                        left++;//";"
                        init = arrayExpression;
                        break;
                    }
                }
                ret.push(new VariableDeclaration({identifier, init}));
                left++;
            }
            if(tokens[left].type===keywords.LITERAL){

            }
            left++

        }
    }

}

