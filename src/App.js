import React from 'react';
import {Parser} from "./parser";
import {Tokenize} from "./tokenize";


class App extends React.Component {
    con = null;

    state = {tokens: []}

    highLight(e, tokens) {
        let html = '';
        if (tokens.length) {

        }
    }


    handleKeyUp = () => {
        let raw = this.con.innerText;
        let tokens = new Tokenize().tokenize(raw);
        console.log(tokens);
        this.setState({tokens})
    }
   handleParser=()=>{
       console.log(new Parser().travel(this.state.tokens));
   }
    render() {
        return (
            <div>
                <div ref={e => this.con = e} style={{height: "600px", padding: "10px", border: "1px solid black"}}
                     contentEditable={true}
                     onKeyUp={this.handleKeyUp}
                >

                </div>
                <button onClick={this.handleParser}>parser</button>
            </div>
        );
    }


}

export default App;
