import React, {Component} from 'react';

import './splash-screen.css';



import $ from 'jquery';




function LoadingMessage() {

 
  return (
    <div className="splash-screen">
   



    
      <div className="loading-dot">.</div>
      <div className="typewriter">
	  <h1 className="project-name">BAYMAX: AN INTERACTIVE STRESS MANAGER</h1>
    </div>
    </div>
    
  );

  
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
       
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 6000)
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
	}
	


	

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };


  
}



export default withSplashScreen;