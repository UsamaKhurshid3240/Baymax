// Web Loading Screen
//imports
import React, {Component} from 'react';
import './splash-screen.css';

//Loading Screen Content
function LoadingMessage() {

  return (
    <div className="splash-screen">
      <div className="loading-dot">.</div>     
      <div className="typewriter">
	  <h1 className="project-name">BAYMAX AN INTERACTIVE STRESS MANAGER</h1>
    </div>
    </div> 
  );
}

//Laoding Animation
function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
     
    }

    //Check if toekna lready exist then not disply olaoding screen else shows
    async componentDidMount() {
      var t= localStorage.getItem('usertoken')
    if(t==null){
    
      try {
       //set TIme for Loading
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
    else{
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