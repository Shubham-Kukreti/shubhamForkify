import React,{Component} from 'react';
class ShoppingCart extends Component{
    constructor(){
        super()
    this.add=()=>
    {   document.getElementById("Text").innerHTML=""
        document.getElementById("Text").insertAdjacentHTML('beforeend',`
        <h6>Now Click on the Dishes To add...<br /> <<< </h6>
              `)
        document.addEventListener("click",(e)=>{
            if(e.target.className=="recipesIdentity"){
                document.getElementById("Text").innerHTML=""
                document.getElementById("favList").insertAdjacentHTML('beforeend',`
                <li id="listFav"class="alert alert-warning alert-dismissable">
                <button type="button" class="close" data-dismiss="alert">×</button>
                ${e.target.textContent}</li>
                `)
            
            }
           

            
        })
    }
    
    }
     render(){
         return(
             <div id="shopping">
                <img id="favCross" src={require('./Images/cross2.png')} />
                <h1 class="shoppingHead"><i>My Fav list</i></h1>
                <div id="Text">
                <h4>Empty</h4>
                <h6>Want to add something?  <button id="sButton"onClick={this.add} class="btn btn-primary">Click Me</button></h6>
                </div>
                <ul id="favList">
                      
                </ul>

             </div>
         );
     }


}
export default ShoppingCart;