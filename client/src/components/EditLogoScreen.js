import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import TextEditWorkspace from "./TextEditWorkspace";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
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
            color : "",
            fontSize : "",
            backgroundColor: "",
            borderRadius: "",
            borderWidth: "",
            margin: "",
            padding: "",
            borderColor: "",

            flag: false,


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







    dataParameters = (text, color, fontSize, backgroundColor, borderRadius, borderWidth, margin, padding, borderColor, flag) => {
        this.setState({text: text, color: color, fontSize:fontSize,
            backgroundColor:backgroundColor, borderRadius:borderRadius,
            borderWidth:borderWidth, margin:margin, padding:padding, borderColor:borderColor, flag:flag});

    };



    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, margin, padding;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    if(this.state.flag === false){
                        this.dataParameters(data.logo.text, data.logo.color, data.logo.fontSize,data.logo.backgroundColor, data.logo.borderRadius,
                            data.logo.borderWidth, data.logo.margin, data.logo.padding, data.logo.borderColor, true
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
                                                updateLogo({ variables: {id:data.logo._id, text: text.value, color: color.value, backgroundColor: backgroundColor.value, borderColor:
                                                        borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), margin:
                                                            parseInt(margin.value), padding: parseInt(padding.value), fontSize: parseInt(fontSize.value) } });


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
                                                    <input type="text" className="form-control" required={true} onChange={this.handleText} value={this.state.text} name="text" ref={node => {
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
                                                    <input type="color" className="form-control"   onChange={this.handleBackgroundColorChange} value={this.state.backgroundColor} name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Background Color" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="color">Border Color:</label>
                                                    <input type="color" className="form-control" onChange={this.handleBorderColorChange} value={this.state.borderColor} name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color" />
                                                </div>




                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Border Radius:</label>
                                                    <input type="number" class="form-control" min="0" max="100" onChange={this.handleBorderRadiusChange} value={this.state.borderRadius} name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="border radius" />
                                                </div>


                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Border Width:</label>
                                                    <input type="number" class="form-control" min="0" max="100" onChange={this.handleBorderWidthChange} value={this.state.borderWidth} name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Margin:</label>
                                                    <input type="number" class="form-control" min="0" max="100"  onChange={this.handleMarginChange} value={this.state.margin} name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" class="form-control" min="0" max="100"  onChange={this.handlePaddingChange} value={this.state.padding} name="fontSize" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" />
                                                </div>





                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" class="form-control" min="4" max="100" onChange={this.handleFontSizeChange} value={this.state.fontSize} name="fontSize" ref={node => {
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

                                    <div class="col-sm-6">

                                        <TextEditWorkspace logo={this.state} />

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