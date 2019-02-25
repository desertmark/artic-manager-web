import React, { Component } from 'react';

class FooterComponent extends Component {

  render(){
    return(
      <div id="footer-component" className="bg-dark text-light p-3 mt-auto">
        <footer>
            <div className="row">
                <div className="col">
                    <a className="text-light" href="https://www.linkedin.com/in/fernando-asulay-134653a6">
                        <i className="mr-3 fab fa-linkedin"></i>
                    </a>
                    <a className="text-light" href="https://github.com/desertmark">
                        <i className="mr-3 fab fa-github"></i>
                    </a>
                    <span className="text-muted">Developed by</span> <span className="font-weight-light">Fernando Asulay</span>
                </div>
                <div className="col text-right">
                    Version: {VERSION}
                </div>
            </div>
        </footer>
      </div>
    );
  }
}

export default FooterComponent;