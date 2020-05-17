import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import htmlToImage from 'html-to-image';
import download from 'downloadjs';
import {Rnd} from "react-rnd";
import {clamp} from "../utils/utlity";




const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text{textString, textFontSize, posX, posY, textColor}
            width
            height
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            margin
            padding
            images{imageString, imageX, imageY, width, height}
            
        }
    }
`;

const UPDATE_LOGO = gql`

    mutation updateLogo(
        $id: String!,
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
            updateLogo(
                id: $id,
                text: $text,
                width: $width,
                height: $height,
               
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                margin: $margin,
                padding: $padding,
                
                
                images: $images
                
                
                )
                 
                 {
                    lastUpdate
                }
        }
`;



class EditLogoScreen extends Component {

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


        this.setState({Focus: this.state.text[index]});
        this.setState({focusIndex: index});


    };

    changeColor = () => {

            console.log(this.state.focus)


    };


    changeBorder = (index) => {

        this.setState({focus: index});
        this.setState({borderText: "2px dotted red"});
        console.log(index)
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

        const MAX_LENGTH = 30;


        const styles = {
            rndStyle:{
                width: "max-content",
                border: this.state.borderText,
            },
        };
        const style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0"
        };

        let text, text2 ,color, fontSize, backgroundColor, borderColor, borderRadius,
            borderWidth, margin, padding, width, height, images, image2;

        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    if(this.state.flag === false){
                        this.dataParameters(data.logo.text, data.logo.backgroundColor,
                            data.logo.borderRadius, data.logo.borderWidth, data.logo.margin, data.logo.padding,
                            data.logo.borderColor,data.logo.width ,data.logo.height ,data.logo.images ,true
                        );
                    }

                    return (


                        <Mutation  mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="row">
                                <div className="container col-sm-6">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">
                                                    <form onSubmit={e => {
                                                    e.preventDefault();
                                                updateLogo({ variables: {id:data.logo._id, text: this.state.text, width: parseInt(width.value),
                                                        height: parseInt(height.value), backgroundColor: backgroundColor.value, borderColor:
                                                        borderColor.value, borderRadius: parseInt(borderRadius.value),
                                                        borderWidth: parseInt(borderWidth.value), margin:
                                                            parseInt(margin.value), padding: parseInt(padding.value),
                                                     images: this.state.images } });

                                                        text= [

                                                        ]
                                                        ;
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

                                                            <button type={"button"} class="btn btn-dark" onClick={() => htmlToImage.toPng(document.getElementById('canvas'))
                                                                .then(function (dataUrl) {
                                                                    download(dataUrl, 'my-node.png');
                                                                })}>
                                                                Export Logo
                                                            </button>

                                                        </div>

                                                        <div className="form-group col-8">
                                                            <label htmlFor="padding">Width:</label>
                                                            <input type="number" onInput={()=>{width.value = clamp(width.value, 10, 2000);}} className="form-control" name="width" ref={node => {
                                                                width = node;
                                                            }} onChange={() => this.setState({width: parseInt(width.value)})} placeholder={data.logo.width} defaultValue={data.logo.width} />
                                                        </div>
                                                        <div className="form-group col-8">
                                                            <label htmlFor="margin">Height:</label>
                                                            <input type="number" onInput={()=>{height.value = clamp(height.value, 10, 2000);}} className="form-control" name="margin" ref={node => {
                                                                height = node;
                                                            }} onChange={() => this.setState({height: parseInt(height.value)})} placeholder={data.logo.height} defaultValue={data.logo.height} />
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

                                                        <button type={"button"} className="btn btn-dark"
                                                                onClick={() => {
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

                                                                }}>
                                                            Remove Selected Text
                                                        </button>

                                                            <button type={"button"} className="btn btn-dark"
                                                                    onClick={() => {


                                                                        this.setState({Focus: {}});
                                                                        this.setState({focusIndex: ""});

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
                                                            }} onChange={() => this.setState({backgroundColor: backgroundColor.value})} placeholder={data.logo.backgroundColor} defaultValue={data.logo.backgroundColor} />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="borderColor">Border Color:</label>
                                                            <input type="color" className="form-control" name="borderColor" ref={node => {
                                                                borderColor = node;
                                                            }} onChange={() => this.setState({borderColor: borderColor.value})} placeholder={data.logo.color} defaultValue={data.logo.borderColor} />
                                                        </div>

                                                        <div className="form-group col-8">
                                                            <label htmlFor="borderWidth">Border Width:</label>
                                                            <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                                                borderWidth = node;
                                                            }} onChange={() => this.setState({borderWidth: parseInt(borderWidth.value)})} placeholder={data.logo.borderWidth} defaultValue={data.logo.borderWidth} />
                                                        </div>
                                                        <div className="form-group col-8">
                                                            <label htmlFor="borderRadius">Border Radius:</label>
                                                            <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                                                borderRadius = node;
                                                            }} onChange={() => this.setState({borderRadius: parseInt(borderRadius.value)})} placeholder={data.logo.borderRadius} defaultValue={data.logo.borderRadius} />
                                                        </div>
                                                        <div className="form-group col-8">
                                                            <label htmlFor="padding">Padding:</label>
                                                            <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                                                padding = node;
                                                            }} onChange={() => this.setState({padding: parseInt(padding.value)})} placeholder={data.logo.padding} defaultValue={data.logo.padding} />
                                                        </div>
                                                        <div className="form-group col-8">
                                                            <label htmlFor="margin">Margin:</label>
                                                            <input type="number"  onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                                                margin = node;
                                                            }} onChange={() => this.setState({margin: parseInt(margin.value)})} placeholder={data.logo.margin} defaultValue={data.logo.margin} />
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

                                             backgroundColor: this.state.backgroundColor ? this.state.backgroundColor : data.logo.backgroundColor,
                                             borderColor: this.state.borderColor ? this.state.borderColor : data.logo.borderColor,
                                             borderStyle: "solid",
                                             borderWidth: (this.state.borderWidth ? this.state.borderWidth : data.logo.borderWidth) + "px",
                                             borderRadius: (this.state.borderRadius ? this.state.borderRadius : data.logo.borderRadius) + "px",
                                             padding: (this.state.padding ? this.state.padding : data.logo.padding) + "px",
                                             margin: (this.state.margin ? this.state.margin : data.logo.margin) + "px",
                                             width: (this.state.width ? this.state.width : data.logo.width) + "px",
                                             height: (this.state.height ? this.state.height : data.logo.height) + "px",



                                         }}>





                                             {( (this.state.text ? this.state.text : data.logo.text)).map((text, index) =>

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

                                                             color: this.state.text[index].textColor ? this.state.text[index].textColor : data.logo.text[index].textColor,
                                                             fontSize: this.state.text[index].textFontSize ? this.state.text[index].textFontSize : data.logo.text[index].textFontSize + "px",



                                                         }}

                                                     >

                                                             {text.textString}

                                                     </div>

                                                 </Rnd>

                                             )}

                                             {( (this.state.images ? this.state.images : data.logo.images)).map((image, index) =>



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
                }}
            </Query>



        );
    }





}




export default EditLogoScreen;