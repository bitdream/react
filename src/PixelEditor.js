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
            // content:"",
            lineHeight:"0vmin",
            // display:"inline-block",
            display:"inline-block",
            padding:0,
            margin:0,
            borderSpacing:0,
            backgroundColor:"black",
            height:0
        }
        for (let y = 0; y < this.state.height; ++y) {
            for (let x = 0; x < this.state.width; ++x) {
                renderImage.push(<div style={this.state.data[y][x] === 0?gridStyle:gridStyleClicked} onClick={()=>{this.handleClick(x, y);}}></div>);
            }
            renderImage.push(<br style={brStyle}/>); 
        }
        return (
            <div>
        <div style={brStyle}> {renderImage}</div>

<br/>
 
<a id="download" download="image.png"><button type="button" onClick={()=>{

let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
const scale = 16;
const targetWidth = this.state.width * scale;
const targetHeight = this.state.height * scale;
const imgData = context.createImageData(targetWidth, targetHeight);
let pixelData = imgData.data;

canvas.height = targetWidth;
canvas.width = targetHeight;
for (let y = 0; y < this.state.height; ++y) {
for (let x = 0; x < this.state.width; ++x) {

    for (let sy = 0; sy < scale; ++sy) {
        for (let sx = 0; sx < scale; ++sx) {
            const scaledY = y * scale + sy;
            const scaledX = x * scale + sx;
            const i = 4 * (scaledY * targetWidth + scaledX);
            pixelData[i] = this.state.data[y][x] ? 0 : 255;
            pixelData[i + 1] = this.state.data[y][x] ? 0 : 255;
            pixelData[i + 2] =this.state.data[y][x] ? 0 : 255;
            pixelData[i + 3] = 255; // Alpha channel
        }
    }
    // pixelData[i] = this.state.data[y][x] ? 0 : 255;
    // pixelData[i + 1] = this.state.data[y][x] ? 0 : 255;
    // pixelData[i + 2] =this.state.data[y][x] ? 0 : 255;
    // pixelData[i + 3] = 255; // Alpha channel
    // i = i + 4;

}
}
console.log(imgData);

// put data to context at (0, 0)
context.putImageData(imgData, 0, 0);


var download = document.getElementById("download");
var image = canvas.toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
download.setAttribute("href", image);

}}>Download</button></a>



        </div>
        );
    }
}

export default PixelEditor;
