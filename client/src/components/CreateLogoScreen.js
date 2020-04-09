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
            text: "",
            textColor : "",
            fontSize : "",
            backgroundColor: "",
            borderRadius: "",
            borderWidth: "",
            margin: "",
            padding: "",
            borderColor: "",




        };

    }


    handleText = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ text: event.target.value });
    };

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ textColor: event.target.value });
    };






    handleFontSizeChange = (event) => {
        console.log("handleTextColorChangeComplete to " + event.target.value);
        this.setState({ fontSize: event.target.value });

    };







    handleMarginChange = (event) => {
        this.setState({ margin: event.target.value });

    };

    handleBorderWidthChange = (event) => {
        this.setState({ borderWidth: event.target.value });

    };


    handlePaddingChange = (event) => {
        this.setState({ padding: event.target.value });

    };


    handleBorderRadiusChange = (event) => {
        this.setState({ borderRadius: event.target.value });

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
                                        <input type="text" onChange={this.handleText} className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" onChange={this.handleTextColorChange} className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" />
                                    </div>



                                    <div className="form-group">
                                        <label htmlFor="color">Background Color:</label>
                                        <input type="color"  onChange={this.handleBackgroundColorChange} className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="color">Border Color:</label>
                                        <input type="color" onChange={this.handleBorderColorChange} className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fontSize">Border Radius:</label>
                                        <input type="number" onChange={this.handleBorderRadiusChange} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="border radius" />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="fontSize">Border Width:</label>
                                        <input type="number" onChange={this.handleBorderWidthChange} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fontSize">Margin:</label>
                                        <input type="number" onChange={this.handleMarginChange} className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" min="0" max="100" onChange={this.handlePaddingChange} className="form-control" name="fontSize" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" />

                                    </div>





                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" min="0" max="100" className="form-control" name="fontSize"  onChange={this.handleFontSizeChange} ref={node => {
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