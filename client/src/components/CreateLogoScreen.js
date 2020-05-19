import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import {clamp} from "../utils/utlity";
import {Rnd} from "react-rnd";
import html2canvas from "html2canvas";


const ADD_LOGO = gql`
    mutation AddLogo(
        $text: [textInput]!,
        $width: Int!,
        $height: Int!,
        
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $margin: Int!,
        $padding: Int!,
        $images: [imageInput]!
        ) {
        addLogo(
            text: $text,
            width: $width,
            height: $height,
           images: $images,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            margin: $margin,
            padding: $padding,
            ) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: [],
            width: "",
            height: "",


            backgroundColor: "",
            borderRadius: "",
            borderWidth: "",
            margin: "",
            padding: "",
            borderColor: "",
            images: [],



            possibleUrl: "",
            possibletext: "",
            flag: false,
            Focus: {},
            focusIndex: "",
            imageFocus: {},
            imagefocusIndex: "",
            borderText: "",
            color: "",
            fontSize: "",

            addDisabled: false


        };

    }


    changeObjectLocation = (index, event, destination) => {

        let tempItems = this.state.text;
        let itemBeingMoved = tempItems[index];

        itemBeingMoved.posX = destination.x;
        itemBeingMoved.posY = destination.y;
        tempItems[index] = itemBeingMoved;
        console.log(tempItems[index]);
        this.setState({
            text: tempItems,

        });

    };

    changeImageLocation = (index, event, destination) => {

        let tempItems = this.state.images;
        let itemBeingMoved = tempItems[index];

        itemBeingMoved.imageX = destination.x;
        itemBeingMoved.imageY = destination.y;
        tempItems[index] = itemBeingMoved;

        this.setState({
            images: tempItems,

        });

    };


    resizeObject = (index, event, direction, ref, delta, position) => {

        let tempItems = this.state.images;
        let itemBeingResized = tempItems[index];

        itemBeingResized.height = parseFloat(ref.style.height);
        itemBeingResized.width = parseFloat(ref.style.width);

        this.setState({

            images: tempItems,

        })

    }

    setImageFocus = (index) => {


        this.setState({imageFocus: this.state.images[index]});
        this.setState({imagefocusIndex: index});
        console.log(this.state.imagefocusIndex)

    };

    //called by ondragstop rnd
    setFocus = (index) => {

        this.setState({addDisabled: true});
        this.setState({Focus: this.state.text[index]});
        this.setState({focusIndex: index});


    };



    handleTextColorChange = (event) => {




        if(this.state.focusIndex!== ""){
            let temp = this.state.text[this.state.focusIndex];
            temp.textColor = event.value;
            let tempArray = this.state.text;
            tempArray[this.state.focusIndex] = temp;
            this.setState({text: tempArray})
        }

    };

    handleFontSizeChange = (event) => {




        if(this.state.focusIndex!== ""){
            let temp = this.state.text[this.state.focusIndex];
            temp.textFontSize = parseInt(event.value);

            let tempArray = this.state.text;
            tempArray[this.state.focusIndex] = temp;
            this.setState({text: tempArray})
        }

    };


    exportToJPG() {
        window.scrollTo(0, 0);
        var container = document.getElementById("canvas");
        html2canvas(container, {allowTaint:true}).then(function(canvas) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.download = "Logo";
            link.href = canvas.toDataURL();
            link.target = '_blank';
            link.click();
        });
    }


    removeImage = (index) => {
        this.setState({focusImage: index});
        console.log(index)

    };

    dataParameters = (text, backgroundColor,
                      borderRadius, borderWidth, margin, padding, borderColor,
                      width ,height ,images ,flag) => {
        this.setState({text: text,
            backgroundColor:backgroundColor, borderRadius:borderRadius,
            borderWidth:borderWidth, margin:margin, padding:padding, borderColor:borderColor,width: width
            ,height: height ,images: images ,flag:flag});
    };

    render() {


        const styles = {


            rndStyle:{
                width: "max-content",

            },

        };


        let text, text2 ,color, fontSize, backgroundColor, borderColor, borderRadius,
            borderWidth, margin, padding, width, height, images, image2;





        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (



                    <div className="row">

                    <div className="container col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: this.state.text, width: parseInt(width.value), height: parseInt(height.value), color: color.value, backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), margin: parseInt(margin.value), padding: parseInt(padding.value), fontSize: parseInt(fontSize.value), images: this.state.images } });
                                    images = [];
                                    text2 = "";
                                    width.value = "";
                                    height.value = "";
                                    color.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    margin.value = "";
                                    padding.value = "";
                                    fontSize.value = "";

                                }}>
                                    <div>

                                        <button type={"button"} class="btn btn-dark" onClick={() => this.exportToJPG()

                                        }>
                                            Export Logo
                                        </button>

                                    </div>

                                    <div className="form-group col-8">
                                        <label htmlFor="padding">Width:</label>
                                        <input type="number" onInput={()=>{width.value = clamp(width.value, 10, 2000);}} className="form-control" name="width" ref={node => {
                                            width = node;
                                        }} onChange={() => this.setState({width: parseInt(width.value)})}  />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Height:</label>
                                        <input type="number" onInput={()=>{height.value = clamp(height.value, 10, 2000);}} className="form-control" name="margin" ref={node => {
                                            height = node;
                                        }} onChange={() => this.setState({height: parseInt(height.value)})}  />
                                    </div>

                                    <div className="form-group col-8">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" onInput={()=>{fontSize.value = clamp(fontSize.value, 4, 100);}} className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} onChange={() => this.handleFontSizeChange(fontSize)} />
                                    </div>

                                    <div className="form-group col-4">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} onChange={() => this.handleTextColorChange(color)}  placeholder={this.state.Focus.textColor} defaultValue={this.state.Focus.textColor} />
                                    </div>

                                    <div className="form-group col-8">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" value={this.state.possibletext} className="form-control" name="text" ref={node => {
                                            text2 = node;
                                        }} onChange={() => this.setState({possibletext: text2.value})}/>

                                        <button type={"button"} disabled={this.state.addDisabled} className="btn btn-dark"
                                                onClick={() => {

                                                    let temp1 = this.state.possibletext.trim();


                                                    if(temp1 !== ""){

                                                        let tempText = this.state.text;
                                                        let obj = {};
                                                        obj["textString"] = this.state.possibletext;
                                                        obj["textColor"] = color.value;
                                                        obj["textFontSize"] = parseInt(fontSize.value);
                                                        obj["posX"] = 0;
                                                        obj["posY"] = 0;

                                                        tempText.push(obj);

                                                        this.setState({text: tempText});
                                                        this.setState({possibletext: ""});


                                                    }






                                                    console.log(this.state.text);
                                                }}>
                                            Add Text
                                        </button>




                                        <button type={"button"} className="btn btn-dark"
                                                onClick={() => {



                                                    let tempText = this.state.text;
                                                    tempText.splice(this.state.focusIndex, 1);


                                                    this.setState({text: tempText});
                                                    this.setState({possibletext: ""});
                                                    this.setState({focusIndex: ""});
                                                    this.setState({addDisabled: false});
                                                    console.log(this.state.text)

                                                }}>
                                            Remove Selected Text
                                        </button>

                                        <button type={"button"} className="btn btn-dark"
                                                onClick={() => {


                                                    this.setState({Focus: {}});
                                                    this.setState({focusIndex: ""});
                                                    this.setState({addDisabled: false});

                                                }}>
                                            Deselect Text
                                        </button>

                                        <p style={{color:"red", backgroundColor: "black", margin: 5}}>Selected Text is: {(this.state.focusIndex !== "") ? <span>{this.state.text[this.state.focusIndex].textString}</span>: <span>None</span>}</p>




                                    </div>


                                    <div className="form-group col-8">
                                        <label htmlFor="text">Image source:</label>
                                        <input type="text" value={this.state.possibleUrl} className="form-control" name="text" ref={node => {
                                            image2 = node;
                                        }} onChange={() => this.setState({possibleUrl: image2.value})}/>

                                        <button type={"button"} className="btn btn-dark"
                                                onClick={() => {






                                                    let tempImages = this.state.images;

                                                    let obj = {};
                                                    obj["imageString"] = this.state.possibleUrl;
                                                    obj["imageX"] = 0;
                                                    obj["imageY"] = 0;
                                                    obj["width"] = 100;
                                                    obj["height"] = 100;
                                                    console.log(obj.imageX);

                                                    tempImages.push(obj);
                                                    this.setState({images: tempImages});
                                                    this.setState({possibleUrl: ""});

                                                }}>
                                            Add Image
                                        </button>




                                        <button type={"button"} className="btn btn-dark"
                                                onClick={() => {



                                                    let tempImages = this.state.images;

                                                    tempImages.splice(this.state.imagefocusIndex, 1);

                                                    this.setState({images: tempImages});
                                                    this.setState({imageFocus: {}});
                                                    this.setState({imagefocusIndex: ""});

                                                }}>
                                            Remove Selected Image
                                        </button>
                                        <button type={"button"} className="btn btn-dark"
                                                onClick={() => {


                                                    this.setState({imageFocus: {}});
                                                    this.setState({imagefocusIndex: ""});

                                                }}>
                                            Deselect Image
                                        </button>

                                        <p style={{color:"red", backgroundColor: "black", margin: 5, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>Selected Image is: {(this.state.imagefocusIndex !== "") ? <span>{this.state.images[this.state.imagefocusIndex].imageString}</span>: <span>None</span>}</p>

                                    </div>




                                    <div className="form-group col-4">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} onChange={() => this.setState({backgroundColor: backgroundColor.value})}  />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} onChange={() => this.setState({borderColor: borderColor.value})}  />
                                    </div>

                                    <div className="form-group col-8">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} onChange={() => this.setState({borderWidth: parseInt(borderWidth.value)})} />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} onChange={() => this.setState({borderRadius: parseInt(borderRadius.value)})} />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} onChange={() => this.setState({padding: parseInt(padding.value)})}  />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number"  onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} onChange={() => this.setState({margin: parseInt(margin.value)})}  />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>

                        <div className="col-6">

                                         <span id={"canvas"} style={{
                                             display: "inline-block",

                                             backgroundColor: this.state.backgroundColor ? this.state.backgroundColor :"#FFFFFF",
                                             borderColor: this.state.borderColor ? this.state.borderColor : "#000000",
                                             borderStyle: "solid",
                                             borderWidth: (this.state.borderWidth ? this.state.borderWidth : 50) + "px",
                                             borderRadius: (this.state.borderRadius ? this.state.borderRadius : 5) + "px",
                                             padding: (this.state.padding ? this.state.padding : 0) + "px",
                                             margin: (this.state.margin ? this.state.margin : 0) + "px",
                                             width: (this.state.width ? this.state.width : 200) + "px",
                                             height: (this.state.height ? this.state.height : 200) + "px",



                                         }}>





                                             {( (this.state.text ? this.state.text : this.state.text)).map((text, index) =>

                                                 <Rnd
                                                     bounds="#canvas"
                                                     scale={1}
                                                     enableResizing={"disable"}
                                                     style={styles.rndStyle}

                                                     onDragStop={(event, destination) => this.changeObjectLocation(index, event, destination)}

                                                     default={{
                                                         x: text.posX,
                                                         y: text.posY,

                                                     }}
                                                 >
                                                     <div onClick={() => this.setFocus(index)}

                                                          style={{

                                                              color: this.state.text[index].textColor ? this.state.text[index].textColor : "#000000",
                                                              fontSize: this.state.text[index].textFontSize ? this.state.text[index].textFontSize : 30 + "px",



                                                          }}

                                                     >

                                                         {text.textString}

                                                     </div>

                                                 </Rnd>

                                             )}

                                             {( (this.state.images ? this.state.images : this.state.images)).map((image, index) =>



                                                 <Rnd

                                                     bounds="#canvas"
                                                     scale={1}

                                                     onDragStop={(event, destination) => this.changeImageLocation(index, event, destination)}
                                                     onResizeStop={(event, direction, ref, delta, position) => this.resizeObject(index, event, direction, ref, delta, position)}
                                                     default={{
                                                         x: image.imageX,
                                                         y: image.imageY,
                                                         width: image.width + "px",
                                                         height: image.height + "px"
                                                     }}

                                                     style ={ { backgroundImage: `url(${image.imageString})`, backgroundRepeat: "no-repeat",  display: "flex",
                                                         alignItems: "center",
                                                         justifyContent: "center",
                                                         border: "solid 1px #ddd",
                                                         backgroundSize: "cover",
                                                     }}


                                                 >

                                                     <div style={{width: image.width + "px", height: image.height + "px"}} onClick={() => this.setImageFocus(index)}>&nbsp;&nbsp;</div>



                                                 </Rnd>





                                             )}


                                         </span>





                        </div>



                    </div>
                )}

            </Mutation>
        );
    }
}

export default CreateLogoScreen;