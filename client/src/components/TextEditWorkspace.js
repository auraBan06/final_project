import React, { Component } from 'react'

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class TextEditWorkspace extends Component {
    render() {
        const styles = {
            container: {
                color: this.props.logo.color,
                fontSize: this.props.logo.fontSize + "px",
                margin: this.props.logo.margin + "px",
                padding: this.props.logo.padding + "px",
                borderWidth: this.props.logo.borderWidth + "px",
                borderRadius: this.props.logo.borderRadius + "px",
                backgroundColor: this.props.logo.backgroundColor,
                borderColor: this.props.logo.borderColor,
                width: "max-content",
                borderStyle: "solid",
                minWidth: "max-content",




            }
        };
        return (
            <div className="col s8"
                 style={ styles.container}>
                {this.props.logo.text}
            </div>
        )
    }
}

export default TextEditWorkspace