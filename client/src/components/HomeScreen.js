import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {



    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;



                    return (
                        <div className="container row">
                            <div className="col s4">
                                <h3  style={headerStyle} >Recent Work</h3>



                                {data.logos.sort((a, b) => b.lastUpdate > a.lastUpdate).map((logo, index) => (



                                        <Link to={`/view/${logo._id}`}> <div key={index} className='home_logo_link'
                                                                             style={logoStyle} >{logo.text.map(text => <span>{text}</span>)}</div></Link>

                                ))}
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    <br />
                                    goLogoLo
                                </div>
                                <div>
                                    <Link style={newLogoStyle} id="add_logo_button" to="/create">Add Logo</Link>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}


const logoStyle = {

    borderStyle: "solid",
    cursor: "pointer",
    background: "#f4511e",

    color: "white",
    padding: "16px 32px",

    font: "16px",
    margin: "4px 2px",

    borderRadius: "30px"

}

const newLogoStyle={
    cursor: "pointer",
    background: "#f4511e",
    padding: "30px",
    color: "white",
    fontSize: "20px",
    borderRadius: "30px",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "5px",
    fontWeight: "bold",


};


const headerStyle={
    color:"black",

};

export default HomeScreen;
