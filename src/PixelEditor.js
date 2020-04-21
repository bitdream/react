import React from "react";

class PixelEditor extends React.Component {
    constructor(pros) {
        super(pros);

        this.state = {
            width:12,
            height:12,
            data:{}
        }
    }

    componentWillMount() {
        let image = new Array();
        for (let y = 0; y < this.state.height; ++y) {
            image[y] = new Array();
            for (let x = 0; x < this.state.width; ++x) {
                image[y][x] = 0;
            }
        }
        this.setState({data:image});
    }

    handleClick(x, y) {
        let image = this.state.data;
        image[y][x] = 1;
        this.setState({data:image});
    }

    render() {
        let renderImage = [];
        let gridStyle = {
            backgroundColor:"white",
            width:"6vmin",
            height:"6vmin",
            display:"inline-block",
            padding:0,
            margin:0,
            border:"solid grey 0.1px",
            borderSpacing:0,
        };

        let gridStyleClicked = {
            backgroundColor:"black",
            width:"6vmin",
            height:"6vmin",
            display:"inline-block",
            padding:0,
            margin:0,
            border:"solid grey 0.1px",
            borderSpacing:0,
        };

        let brStyle = {
            content:"",
            lineHeight:"4vmin",
            display:"inline-block",
            padding:0,
            margin:0,
        }
        for (let y = 0; y < this.state.height; ++y) {
            for (let x = 0; x < this.state.width; ++x) {
                renderImage.push(<div style={this.state.data[y][x] === 0?gridStyle:gridStyleClicked} onClick={()=>{this.handleClick(x, y);}}></div>);
            }
            renderImage.push(<br style={brStyle}/>); 
        }
        return (<div style={brStyle}> {renderImage}</div>);
    }
}

export default PixelEditor;
