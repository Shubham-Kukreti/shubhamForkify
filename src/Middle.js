import React,{Component} from 'react';
import axios from 'axios';
import { bigIntLiteral } from '@babel/types';
import header from './Header';
class Middle extends Component{
  
  constructor(){
    super()
    
 document.addEventListener("click",(e)=>{
   if(localStorage.getItem('token')!=undefined){
     document.getElementById("loginMenu").innerHTML=`Welcome ${localStorage.getItem('userName')}`;
     document.getElementById("loginMenu").insertAdjacentHTML("afterend",`
     <button id="menuLogOut" type="button">LogOut</button>
     `)
    }
 
  else if(e.target.className=="recipesIdentity" ) {

  document.getElementById("first").innerHTML=""
  var recipeName=e.target.textContent
  document.getElementById("recipeTitle").innerHTML=recipeName;

  var contentJson=JSON.parse(localStorage.getItem('content'));

 for(var i=0;;i++){
   if(contentJson.data.recipes[i].title==recipeName){  
    document.getElementById("first").insertAdjacentHTML("beforeend",`
      <img id="recipeImg" src="${contentJson.data.recipes[i].image_url}"/>`)
       break; 
   }
 }


  
  axios.post('http://localhost:8080/http://localhost:5000/sendData',{'rname':recipeName})
   .then((result)=>{

   document.getElementById('ing').innerHTML="";
   document.getElementById('prep').innerHTML="";

   document.getElementById('ing').style.borderRight='2px';
   document.getElementById('ing').style.borderRightStyle='solid';
   document.getElementById('ing').style.borderRightColor='#CF2097';
   
   document.getElementById('ing').insertAdjacentHTML("beforeend",`
   <p><b><i>Ingredients</i></b><br/></p>
   ${result.data.ingredients}
   `)
   document.getElementById('prep').insertAdjacentHTML("beforeend",`
   <p><b><i>Preparation</i></b><br/></p>
   ${result.data.preparation}
   `)
   
  })
   .catch()
    
 
  } 
})
 

}


  render(){
    return(
     
      <div id="middle">
       <div>
       <img id="CrossShow" src={require('./Images/cross2.png')} />
       <h2 id="recipeTitle"></h2>
       </div>
              <div id="first">
                </div>
        <button type="button" id="showRecipe">Show Recipe</button>
       
        <div id="second">
          
          <p id="ing"></p>
          
          <p id="prep"></p>
        </div>
        <div id="menuBar">
          
          <input id="menuSearch" type="text" placeholder="Search Here" />

          <button type="button" id="loginMenu">Login</button> 
          
          {/* <button type="button" id="favMenu">My Fav List</button>         */}
          <button type="button" id="rList">Recipes List</button> 
        </div>
      </div>
      

      
    )
  }
}
export default Middle;