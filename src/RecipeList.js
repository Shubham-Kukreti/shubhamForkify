import React,{Component} from 'react';
import axios from 'axios';
class RecipeList extends Component{
constructor(){
    super();
    this.prev=()=>{
        if(this.state.j>1){
        this.setState({j:this.state.j-10})}
        this.populate()
        
    }
    this.next=()=>{
        if(this.val-this.state.j>=1){
        this.setState({j:this.state.j+10})
        this.populate()
    }
    }
    
    this.state={
        j:1
    }
    this.val=0;
    this.populate=()=>{
        document.getElementById('itemlist').innerHTML="";
        document.getElementById('itemlist').innerHTML=`<img src="${require('./Images/loading.gif')}"/>`
        if(localStorage.getItem('content')==undefined){
        axios.post("https://www.food2fork.com/api/search?key=7832f9c887ac55419569f2823cf20f40")
        .then((result)=>{
          localStorage.setItem('content',JSON.stringify(result));  
           this.val=JSON.stringify(Object.keys(result.data.recipes).length);
           if(result.data.recipes[this.state.j-1]!=undefined){
            document.getElementById("itemlist").innerHTML="";
        } 
        else{
            return;
        } 
           for(var i=this.state.j-1;i<this.state.j+9;i++){
            if(result.data.recipes[i]==undefined)
            break;
            else{
                    document.getElementById("itemlist").insertAdjacentHTML('beforeend',`
                    <li class="items">
                    <img id="recipeimg" src="${result.data.recipes[i].image_url}"/>
                    <p class="recipesIdentity">${result.data.recipes[i].title}</p>
                    </li>
                    `);
                }
            }
         document.getElementById("itemlist").insertAdjacentHTML('beforeend',` 
         <div id="navg">
         <p id="previous"> <<< Prev</p>
         <p id="next">Next >>> </p> 
         </div>`
         )     
                  
  }
)
        .catch((error)=>{
            alert("Something Has Went Wrong");
        })
       }
      
        
    else{
        var result=JSON.parse(localStorage.getItem('content'));
        this.val=JSON.stringify(Object.keys(result.data.recipes).length);

        if(result.data.recipes[this.state.j-1]!=undefined){
            document.getElementById("itemlist").innerHTML="";
        } 
        else{
            return;
        }
         
        
        
         for(var i=this.state.j-1;i<this.state.j+9;i++){
             if(result.data.recipes[i]==undefined)
             break;
             else{   
                     document.getElementById("itemlist").insertAdjacentHTML('beforeend',`
                     <li class="items">
                     <img id="recipeimg" src="${result.data.recipes[i].image_url}"/>
                     <p class="recipesIdentity" id="recipeI">${result.data.recipes[i].title}</p>
                     </li>
                     `);
                 }
             }
          document.getElementById("itemlist").insertAdjacentHTML('beforeend',` 
          <div id="navg">
          <p id="previous"> <<< Prev</p>
          <p id="next">Next >>> </p> 
          </div>`
          )
    }    
}
document.addEventListener("click",(e)=>{
    if(e.target.id=="next"){
    this.next();
    }

    else if(e.target.id=="previous"){
      this.prev();
    }
        })
    }
   
    componentDidMount(){
        this.populate();
    }




render(){
    return(
    <div id="listContainer">
    <ul id="itemlist">
        
    
    </ul>

    
    
</div>

);

    }

}
export default RecipeList;