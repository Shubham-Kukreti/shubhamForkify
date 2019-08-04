import React from "react";

class Test extends React.Component{
   constructor(props){
       super(props);
   }
    render(){
        return(
            <div>
                <p>Welcome</p>
                <p>{
                    this.props.name
                }</p>
            </div>
        );
    }


}

export default Test;