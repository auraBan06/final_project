import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import {Rnd} from "react-rnd";
import {clamp} from "../utils/utlity";


const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            width
            height
            color
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            margin
            padding
            fontSize
            
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $width: Int!,
        $height: Int!,
        $color: String!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $margin: Int!,
        $padding: Int!,
        
        $fontSize: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                width: $width,
                height: $height,
                color: $color,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                margin: $margin,
                padding: $padding,
                
                fontSize: $fontSize) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {


    constructor(props) {
        super(props);

        this.state = {

            text: "",
            width: "",
            height: "",
            color : "",
            fontSize : "",
            backgroundColor: "",
            borderRadius: "",
            borderWidth: "",
            margin: "",
            padding: "",
            borderColor: "",


        };

    }




    render() {

        const styles = {


            rndStyle:{
                width: "max-content",
                border: this.state.border,
            },

        };




        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, margin, padding, width, height;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;




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
                                                updateLogo({ variables: {id:data.logo._id, text: text.value, width: parseInt(width.value), height: parseInt(height.value) ,color: color.value, backgroundColor: backgroundColor.value, borderColor:
                                                        borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), margin:
                                                            parseInt(margin.value), padding: parseInt(padding.value), fontSize: parseInt(fontSize.value) } });


                                                text.value = "";
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
                                                            <label htmlFor="text">Text:</label>
                                                            <input type="text" required={"yes"} className="form-control" name="text" ref={node => {
                                                                text = node;
                                                            }} onChange={() => this.setState({text: text.value})} placeholder={data.logo.text} defaultValue={data.logo.text} />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="color">Color:</label>
                                                            <input type="color" className="form-control" name="color" ref={node => {
                                                                color = node;
                                                            }} onChange={() => this.setState({color: color.value})} placeholder={data.logo.color} defaultValue={data.logo.color} />
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
                                                            <label htmlFor="fontSize">Font Size:</label>
                                                            <input type="number" onInput={()=>{fontSize.value = clamp(fontSize.value, 4, 100);}} className="form-control" name="fontSize" ref={node => {
                                                                fontSize = node;
                                                            }} onChange={() => this.setState({fontSize: parseInt(fontSize.value)})} placeholder={data.logo.fontSize} defaultValue={data.logo.fontSize} />
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
                                                            <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
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

                                    <div className="col-6" >

                                         <div id={"canvas"} style={{
                                             display: "inline-block",
                                             color: this.state.color ? this.state.color : data.logo.color,
                                             backgroundColor: this.state.backgroundColor ? this.state.backgroundColor : data.logo.backgroundColor,
                                             borderColor: this.state.borderColor ? this.state.borderColor : data.logo.borderColor,
                                             borderStyle: "solid",
                                             fontSize: (this.state.fontSize ? this.state.fontSize : data.logo.fontSize) + "px",
                                             borderWidth: (this.state.borderWidth ? this.state.borderWidth : data.logo.borderWidth) + "px",
                                             borderRadius: (this.state.borderRadius ? this.state.borderRadius : data.logo.borderRadius) + "px",
                                             padding: (this.state.padding ? this.state.padding : data.logo.padding) + "px",
                                             margin: (this.state.margin ? this.state.margin : data.logo.margin) + "px",
                                             width: (this.state.width ? this.state.width : data.logo.width) + "px",
                                             height: (this.state.height ? this.state.height : data.logo.height) + "px"
                                         }}>


                                             <Rnd
                                                 bounds="#canvas"
                                                 scale={1}
                                                 enableResizing={"disable"}

                                                 style={styles.rndStyle}
                                                 onDrag={() => { this.setState({ border: "2px dotted red"}) }}

                                                 onDragStop={() => { this.setState({ border: ""}) }}
                                             >

                                                 {this.state.text ? this.state.text :  data.logo.text}


                                             </Rnd>








                                         </div>

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