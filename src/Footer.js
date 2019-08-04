import React,{Component} from 'react';
class Footer extends Component{
    constructor(){
        super();
    }



render(){
    return(
     <div id="footer">
         <h3 id="F_title">Forkify</h3>
        <center>
         <div id="imageDiv">
           <p id="conText">Contact Us:</p>
           
           <img class="image" src={require('./Images/fb.jpg')}/>
            <img class="image" src={require('./Images/insta.jpg')} />
            <img class="image" src={require('./Images/tweet.jpg')}/>
            

         </div>
         </center>
     </div>
    )
}
}

export default Footer;