import React, { Component } from "react";

class ContactPageComponent extends Component{
  render(){
    return(
      <div id="contact-page-component">
        <div className="jumbotron">
          <h1 className="display-4">Contact us!</h1>
          <p className="lead">by email or chat.</p>
          <hr className="my-4" />
          <p>fernando.asulay@gmail.com</p>
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>
      </div>
    );
  }
}

export default ContactPageComponent;