import React from 'react';
import ReactDOM from 'react-dom';//for render.
import './index.css';
import App from './App';
import axios from 'axios';
import LandS from './LandS';
import * as serviceWorker from './serviceWorker';
import Login from './Login';

ReactDOM.render(<App />, document.getElementById('root'));
var i=0
var j=0
var k=0
document.addEventListener("click",(e)=>{
  //alert(e.target.textContent);
  var docWidth = document.documentElement.offsetWidth;

[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
);
  
  if(e.target.id=="heart"){
    
    
    if(i==1){
      document.getElementById("shopping").style.display="none";
      document.getElementById("show").style.gridTemplateColumns="30% 70%";
      document.getElementById("middle").style.gridTemplateRows="10% 42% 48%";
      document.getElementById("middle").style.height="116vh"
      i--;
    }
    else if(i==0){
    document.getElementById("show").style.gridTemplateColumns="30% 40% 30%";
    document.getElementById("shopping").style.display="block";
    document.getElementById("middle").style.gridTemplateRows="10% 25% 65%";
    document.getElementById("middle").style.height="120vh"
    i++;
    }
  }
  else if(e.target.id=="login-signup"){
    document.getElementById("dyna").style.display="block";
    document.getElementById("transparentBack").style.display="block";
    
    ReactDOM.render(<Login />,document.getElementById("dyna"));
  }
  else if(e.target.id=="transparentBack"){
    document.getElementById("dyna").style.display="none";
    document.getElementById("transparentBack").style.display="none";

  }
   else if(e.target.id=="bSignup"){
    document.getElementById("pLogin").style.display="none";
    ReactDOM.render(<LandS />,document.getElementById("dyna"));  
  }
  else if(e.target.id=="bLogin"){
    document.getElementById("pSignup").style.display="none";
    ReactDOM.render(<Login />,document.getElementById("dyna"));
  }
  else if(e.target.id=="BLogin"){
     var uname=document.getElementById("uName").value;
     var upass=document.getElementById("uPass").value;
     var umail=document.getElementById("uEmail").value;
     axios.post('/login',{'userName':uname,'userPassword':upass,'userEmail':umail})
     .then((result)=>{
      console.log(result)
      if(result.data.token=='invalid'){
        alert("You have to SignUp First")
        window.location.reload();
      }  
      else{
        localStorage.setItem('token',result.data.token);
        localStorage.setItem('userName',uname);
        window.location.reload();}
     })
     .catch()}
  
     else if(e.target.id=="menuLogOut"){
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      document.getElementById("loginMenu").innerHTML=`LogIn`;
      document.getElementById("menuLogOut").style.display="none;"
      window.location.reload()
    }

    
  
    else if(e.target.id=="menu"){
      if(j==0){
          
          document.getElementById("menuBar").style.display="grid"
          document.getElementById("menuBar").style.gridTemplateRows="10% 10% 10% 10% 10% 10% 10% 10% 10% 10%"
          document.getElementById("listContainer").style.display="none"
          document.getElementById("middle").style.display="block"
          document.getElementById("CrossShow").style.display="none";
          document.getElementById("showRecipe").style.display="none";
          j++;
          // document.getElementById("menuBar").style.display="block"
     }
      else if(j==1){
        document.getElementById("menuBar").style.display="none";
        document.getElementById("listContainer").style.display="block"
        document.getElementById("middle").style.display="none";
        j--
      }
    
    }

  // else if(e.target.id=="cross"){
    
  //   document.getElementById("menuBar").style.display="none"
  // }

  else if(e.target.id=="loginMenu"){
    ReactDOM.render(<Login />,document.getElementById("dyna"))
    document.getElementById("dyna").style.display="block"
    document.getElementById("menuBar").style.display="none"
    j=0;
  } 
  
   else if(e.target.id=="menu"){
    if(localStorage.getItem('token')!=undefined && window.outerWidth<450){
      document.getElementById("loginMenu").innerHTML="";
      document.getElementById("loginMenu").innerHTML=`Welcome ${localStorage.getItem('userName')}`;
      document.getElementById("loginMenu").insertAdjacentHTML("afterend",`
      <button id="menuLogOut" type="button">LogOut</button>
      `)
    
   }
  }

  else if(e.target.className=="CrossLS"){
    document.getElementById("dyna").style.display="none"
    document.getElementById("transparentBack").style.display="none";
  }
  else if(e.target.id=="heart2"){
    document.getElementById("shopping").style.display="block"
    document.getElementById("menuBar").style.display="none"
    j=0;

  }
  else if(e.target.id=="favCross"){
    document.getElementById("shopping").style.display="none"

  }
  else if(e.target.id=="rList" && window.outerWidth<450){
    document.getElementById("menuBar").style.display="none";
    document.getElementById("show").style.gridTemplateColumns = "100% 0%";
    document.getElementById("listContainer").style="block";
    document.getElementById("middle").style.display = "none";
    j=0
   
  }
 else if(e.target.id=="recipeI" && window.outerWidth<450){
   document.getElementById("listContainer").display="none";
   document.getElementById("show").style.gridTemplateColumns = "0% 100%";
   document.getElementById("middle").style.display = "block";
   document.getElementById("second").style.display="none";
   document.getElementById("CrossShow").style.display="block"
   document.getElementById("showRecipe").style.display="block";

 }
 else if(e.target.id=="showRecipe" && window.outerWidth<450){
   document.getElementById("showRecipe").style.display="none";
   document.getElementById("second").style.display="grid";
   document.getElementById("second").style.gridTemplateColumns="auto auto";
   
 }

 else if(e.target.id=="downArrow"){
  if(k==0){
  document.getElementById("logoutBox").style.display="block";
  k++
}
else if(k==1){
  document.getElementById("logoutBox").style.display="none";
  k-- 
}
 }

else if(e.target.id=="Blogout"){

  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  window.location.reload()
}

else if(e.target.id=="CrossShow"){
  document.getElementById("middle").style.display="block"
          document.getElementById("listContainer").style.display="block"
          
  j++
   document.getElementById("middle").style.display = "none";

}
}

)

serviceWorker.unregister();

 