import React,{Component} from 'react';
import axios from 'axios';
import Push from 'push.js';
class Header extends Component{
  constructor(){
    super()
   this.verify=()=>{
     if(localStorage.getItem('token')!=undefined){
      axios.post('http://localhost:8080/http://localhost:5000/verifyToken',{'token':localStorage.getItem('token')})
      .then((result)=>{
        console.log(result)
        if(result.data.status=='valid'){
          document.getElementById("login-signup").style.display="none";
          document.getElementById("login-signup").insertAdjacentHTML('afterend',`
          <p id="welcomeText">WELCOME,${localStorage.getItem('userName')}</p>
          `)
          document.getElementById("welcomeText").insertAdjacentHTML('afterend',`<img id="downArrow" src=${require('./Images/DArrow2.png')} />`)
          
          // document.getElementById("downAarrow").display="block";
          
        }
      if(result.data.status=='invalid'){
        alert("Your Session is Expired ")
      }

      })
      .catch() 
     }

   }
  }

  componentDidMount(){
    this.verify()
  }

  render(){
  
    Push.create("Forkify",{body:"Welcome to Forkify",timeout:4000,icon:require('./Images/fork.png')}); 
      return(

        
        <div id="header">
          <div id="logoutBox">
            <button type="button" class="btn btn-primary" id="Blogout">Log Out</button>
          </div>
          <p id="H_title">Forkify</p>
          <input id="searchBar" placeholder="Search Here" type="text" />
          <img id="imgS" src={require('./Images/search1.jpg')}/>    
          <button className="btn btn-primary" type="button" id="login-signup">LogIn</button>
          {/* <img id="downArrow" src={require('./Images/DArrow.jpg')} /> */}
  
         <img id="heart" src={require('./Images/heart1.jpg')}/>
         <img id="menu" src={require('./Images/menu.png')}/>
         <img id="heart2" src={require('./Images/heart1.jpg')}/>
        </div>
      )

   // }

    
}

}

export default Header;