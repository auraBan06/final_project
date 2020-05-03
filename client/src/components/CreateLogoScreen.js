import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import {clamp} from "../utils/utlity";


const ADD_LOGO = gql`
    mutation AddLogo(
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
        addLogo(
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
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

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
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, margin, padding, width, height;





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
                                    addLogo({ variables: { text: text.value, width: parseInt(width.value), height: parseInt(height.value), color: color.value, backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), margin: parseInt(margin.value), padding: parseInt(padding.value), fontSize: parseInt(fontSize.value) } });
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
                                        <input type="number" onInput={()=>{width.value = clamp(width.value, 10, 2000);}} className="form-control" name="padding" ref={node => {
                                            width = node;
                                        }} onChange={() => this.setState({width: parseInt(width.value)})} placeholder="Width" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Height:</label>
                                        <input type="number" onInput={()=>{height.value = clamp(height.value, 10, 2000);}} className="form-control" name="height" ref={node => {
                                            height = node;
                                        }} onChange={() => this.setState({height: parseInt(height.value)})} placeholder="Height" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" required={"yes"} className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} onChange={() => this.setState({text: text.value})} placeholder="Text" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }}onChange={() => this.setState({color: color.value})} placeholder="Color" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} onChange={() => this.setState({backgroundColor: backgroundColor.value})} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} onChange={() => this.setState({borderColor: borderColor.value})} placeholder="Border Color" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" onInput={()=>{fontSize.value = clamp(fontSize.value, 4, 100);}} className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} onChange={() => this.setState({fontSize: parseInt(fontSize.value)})} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} onChange={() => this.setState({borderWidth: parseInt(borderWidth.value)})} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} onChange={() => this.setState({borderRadius: parseInt(borderRadius.value)})} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} onChange={() => this.setState({padding: parseInt(padding.value)})} placeholder="Padding" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} onChange={() => this.setState({margin: parseInt(margin.value)})} placeholder="Margin" />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                        <div className="col-sm-6" >

                             <div id={"canvas"} style={{
                                 display: "inline-block",
                                 color: this.state.color ? this.state.color : "#000000",
                                 backgroundColor: this.state.backgroundColor ? this.state.backgroundColor : "#FFFFFF",
                                 borderColor: this.state.borderColor ? this.state.borderColor : "#000000",
                                 borderStyle: "solid",
                                 fontSize: (this.state.fontSize ? this.state.fontSize : 12) + "px",
                                 borderWidth: (this.state.borderWidth ? this.state.borderWidth : 5) + "px",
                                 borderRadius: (this.state.borderRadius ? this.state.borderRadius : 5) + "px",
                                 padding: (this.state.padding ? this.state.padding : 0) + "px",
                                 margin: (this.state.margin ? this.state.margin : 0) + "px",
                                 width: (this.state.width ? this.state.width : 200) + "px",
                                 height: (this.state.height ? this.state.height : 200) + "px"
                             }}>{this.state.text ? this.state.text : "New Logo"}</div>


                            </div>






                        </div>

                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;