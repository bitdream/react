import React from 'react';


function Led(params) {
    let historyStyle = {
        // width:"90vmin",
        // height:"15vmin",
        height:"7.5vmin",
        margin:"5vmin",
        fontSize:"2em",
        fontStyle:"bold",
        textAlign:"right"
        // border:"solid lightgrey 1px"

    }
    return (<div style = {historyStyle}> {params.result} </div>);
}

function HistoryLed(params) {
    let historyStyle = {
        // height:"5vmin",
        height:"2.5vmin",
        margin:"5vmin",
        textAlign:"right"

    }
    return (<div style = {historyStyle}> {params.result} </div>);
}

function Number(pros) {
    let buttonStyle= {
        // width:"20vmin",
        // height:"20vmin",
        width:"9vmin",
        height:"9vmin",
        margin:"1vmin",
        fontSize:"1.2em"
    };
    return(            <button type="button" 
    style={buttonStyle} 
    onClick={pros.fun} >
        {pros.num}
    </button>);
}
class Calculator extends React.Component {
    constructor(pros) {
        super(pros);

        this.state = {
            leftOperand:0,
            rightOperand:0,
            currentNumberString:"0",
            currentOperation:0,
            newNumber:true
        };

        this.calc = this.calc.bind(this);

    }

    processNumber(param) {
        switch (param) {
            case "0": case "1": case "2": case "3":case "4": case "5": case "6": case "7":case "8": case "9":  {
            let value = this.state.currentNumberString;
            if (this.state.newNumber || value === "0") {
                value = param;
            } else {
                // value = parseFloat(param) + value * 10;
                value = value + param;
            }
            this.setState({
                currentNumberString:value,
                newNumber:false
            });
        }
                break;  

            case ".": {
                let value = this.state.currentNumberString;
                if (!value.includes(".")) {
                    value = value + param;
                    this.setState({
                        currentNumberString:value,
                        newNumber:false
                    });
                }
            }
                break;

                case "+/-": {
                    let value = this.state.currentNumberString;
                    if (value.startsWith("-")) {
                        value = value.substr(1, value.length);
                    } else {
                        value = "-"+value;
                    }
                    this.setState({
                        currentNumberString:value,
                        newNumber:false
                    });
                }

                break;
            default:
        }

    }

    processOperator(param) {

        if (this.state.currentOperation === 0) {

            this.setState({
                currentOperation:param,
                // currentNumberString:"0",
                leftOperand:parseFloat(this.state.currentNumberString),
                newNumber:true
            });
        }

    }

    processEqual() {
        let leftValue = this.state.leftOperand;
        let rightValue = parseFloat(this.state.currentNumberString);
        let result = 0;
        console.log("processEqual:"+leftValue+","+rightValue);
        switch (this.state.currentOperation) {
            case "+": 
                result = leftValue + rightValue;
            
            break;

            case "-": 
                result = leftValue - rightValue;

            
            break;

            case "*": 
                result = leftValue * rightValue;

            
            break;

            case "/": 
                result = leftValue / rightValue;

            
            break;
                default:
        }

        this.setState({
            currentNumberString:""+result,
            currentOperation:0,
            newNumber:true
        });
    }

    processReturn(param) {
        switch(param) {
            case "<-":
                if (this.state.currentNumberString.length > 0) {
                    this.setState({
                        currentNumberString:this.state.currentNumberString.substr(0, this.state.currentNumberString.length-1)
                    });
                }
                break;

                case "CE":
                    this.setState({
                            currentNumberString:"0"
                    });
                    
                    break;
                case "C":
                        this.setState({
                                currentNumberString:"0",
                                currentOperation:0,
                                newNumber:true
                        });
                        
                        break;                    
            default:
        }
    }

    calc (params) {
        console.log("calc:"+params);
        switch (params) {
            case "CE": case "C":case "<-":
                this.processReturn(params);
                break;
            case "+": case "-": case "*": case "/":
                this.processOperator(params);
                break;
            case "0": case "1": case "2": case "3":case "4": case "5": case "6": case "7":case "8": case "9": case "+/-": case ".": 
                this.processNumber(params);
                break;       
            case "=":
                this.processEqual();
                break;                                                                             
            default:

        }

    }

    render() {
        let frameStyle = {
            // width:"90vmin",
            width:"45vmin",
            margin:"2vmin",
            border:"solid  1vmin  black"
        }

        let displayFrameStyle = {
            margin:"2vmin",
            border:"solid  1vmin  grey"
        }

        let commentStyle = {
            fontStyle:"italic",
            textAlign:"left",
            fontSize:"1.2em",
            margin:"2vmin",
            // border:"solid black 1px"
        }
        const buttons = ["CE","C","<-","/","7","8","9","*","4","5","6","-","1","2","3","+","+/-","0",".","="];
        var data = [];
        for (let i = 0; i < buttons.length; ++i) {
            data.push(<Number num={buttons[i]} key={i} fun={()=>{this.calc(buttons[i])}}/>);
            if (i % 4 === 3) {
                data.push(<br/>);
            }
        }

        
        return (
<div>
            <div style={frameStyle}>

<div style={displayFrameStyle} >
                <HistoryLed result={this.state.currentOperation === 0 ? " ": ""+this.state.leftOperand+this.state.currentOperation} />
                <Led result={this.state.currentNumberString} />
                </div>
                {data}


            </div>

<div style={commentStyle}> React Calculator Demo by Ben </div>

            </div>
        );
    }
}

export default Calculator;
