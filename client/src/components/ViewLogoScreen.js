import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';


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
            
            images
            lastUpdate
            
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {

        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (

                        <div className="row">
                        <div className="container col-sm-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/">Home</Link></h4>

                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <dl>
                                        <dt>Width:</dt>
                                        <dd>{data.logo.width}</dd>
                                        <dt>Height:</dt>
                                        <dd>{data.logo.height}</dd>

                                        <dt>Text:</dt>
                                        <dd>{data.logo.text[0].textString}</dd>
                                        <dt>Color:</dt>


                                        <dt>Background Color:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>

                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.borderColor}</dd>

                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>

                                        <dt>Border Width:</dt>
                                        <dd>{data.logo.borderWidth}</dd>

                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>

                                        <dt>Padding:</dt>
                                        <dd>{data.logo.padding}</dd>





                                        <dt>Font Size:</dt>

                                        <dt>Images:</dt>
                                        <dd>{data.logo.images}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (




                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                            </div>
                        </div>
                            <div className="col-sm-6">

                                                <span style={{
                                                    display: "inline-block",

                                                    backgroundColor: data.logo.backgroundColor,
                                                    borderColor: data.logo.borderColor,
                                                    borderStyle: "solid",

                                                    borderWidth: data.logo.borderWidth + "px",
                                                    borderRadius: data.logo.borderRadius + "px",
                                                    padding: data.logo.padding + "px",
                                                    margin: data.logo.margin + "px",
                                                    width: data.logo.width + "px",
                                                    height: data.logo.height + "px",
                                                }}>{data.logo.text.textString}</span>



                            </div>
                        </div>


                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;