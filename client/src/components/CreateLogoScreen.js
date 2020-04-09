import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import TextEditWorkspace from "./TextEditWorkspace";

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
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
            text: "goLogoLo",
            color : "#A52A2A",
            fontSize : "30",
            backgroundColor: "#7FFFD4",
            borderRadius: "30",
            borderWidth: "30",
            margin: "30",
            padding: "30",
            borderColor: "#FFE4C4",




        };

    }


    handleText = (event) => {

        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ text: event.target.value });
    };

    handleTextColorChange = (event) => {

            console.log("handleTextColorChange to " + event.target.value);
            this.setState({color: event.target.value});

    };






    handleFontSizeChange = (event) => {
        if (event.target.value >= 4 && event.target.value <= 100) {
            console.log("handleTextColorChangeComplete to " + event.target.value);
            this.setState({fontSize: event.target.value});
        }
    };







    handleMarginChange = (event) => {

        if (event.target.value >= 0 && event.target.value <= 100){
            this.setState({ margin: event.target.value });
        }


    };

    handleBorderWidthChange = (event) => {
        if (event.target.value >= 0 && event.target.value <= 100) {
            this.setState({borderWidth: event.target.value});
        }

    };


    handlePaddingChange = (event) => {
        if (event.target.value >= 0 && event.target.value <= 100) {
            this.setState({padding: event.target.value});
        }
    };


    handleBorderRadiusChange = (event) => {
        if (event.target.value >= 0 && event.target.value <= 100) {
            this.setState({borderRadius: event.target.value});
        }
    };

    handleBackgroundColorChange = (event) => {

        this.setState({ backgroundColor: event.target.value });
    };

    handleBorderColorChange = (event) => {

        this.setState({ borderColor: event.target.value });
    };












    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, margin, padding;





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
                                    addLogo({ variables: { text: text.value, color: color.value, backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), margin: parseInt(margin.value), padding: parseInt(padding.value), fontSize: parseInt(fontSize.value) } });
                                    text.value = "";
                                    color.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    margin.value = "";
                                    padding.value = "";
                                    fontSize.value = "";

                                }}>



                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" minlength= "1" onChange={this.handleText} required={true} value={this.state.text} className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" onChange={this.handleTextColorChange} value={this.state.color} className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" />
                                    </div>



                                    <div className="form-group">
                                        <label htmlFor="color">Background Color:</label>
                                        <input type="color"  onChange={this.handleBackgroundColorChange} value={this.state.backgroundColor} className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="color">Border Color:</label>
                                        <input type="color" onChange={this.handleBorderColorChange} value={this.state.borderColor} className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fontSize">Border Radius:</label>
                                        <input type="number" min="0" max="100" onChange={this.handleBorderRadiusChange} value={this.state.borderRadius} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="border radius" />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="fontSize">Border Width:</label>
                                        <input type="number" min="0" max="100" onChange={this.handleBorderWidthChange} value={this.state.borderWidth} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fontSize">Margin:</label>
                                        <input type="number" className="form-control" min="0" max="100" onChange={this.handleMarginChange} value={this.state.margin} name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" min="0" max="100" onChange={this.handlePaddingChange} value={this.state.padding} className="form-control" name="fontSize" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" />

                                    </div>





                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" min="0" max="100" className="form-control" name="fontSize" onChange={this.handleFontSizeChange} value={this.state.fontSize} ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                        <div className="col-sm-6">

                            <TextEditWorkspace logo={this.state}/>

                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;