import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

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

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, margin, padding;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
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
                                                updateLogo({ variables: { text: text.value, color: color.value, backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), margin: parseInt(margin.value), padding: parseInt(padding.value), fontSize: parseInt(fontSize.value) } });


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
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder="Text" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" />
                                                </div>







                                                <div className="form-group">
                                                    <label htmlFor="color">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Background Color" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="color">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Border Radius:</label>
                                                    <input type="number" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="border radius" />
                                                </div>


                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Border Width:</label>
                                                    <input type="number" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Margin:</label>
                                                    <input type="number" className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" className="form-control" name="fontSize" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" />
                                                </div>





                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" className="form-control" name="fontSize" ref={node => {
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
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;