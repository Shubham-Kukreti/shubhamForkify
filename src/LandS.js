import React,{Component} from 'react';
import axios from 'axios';
class LandS extends Component{
constructor(){
    super();
    this.sign=()=>{ 
    var fName= document.getElementById("fname").value;
    var lName=document.getElementById("lname").value;
    var mailE=document.getElementById("e-mail").value;
    var pass=document.getElementById("passW").value;
    var cpassW=document.getElementById("CpassW").value;
    
    if(fName=="" || lName=="" || pass=="" || cpassW==""){
        alert("Fields cannot be empty")
        window.location.reload()
    }
    else if(pass!=cpassW){
        alert("Confirm Password Should be Same as Password")
        window.location.reload()
    }
    else{
        axios.post('/signup',{'firstN':fName,'lastN':lName,'email':mailE,'passwordS':pass,'CpasswordS':cpassW})
        .then((res)=>{
            if(res.data.value=="already"){
                alert("You have already registered")
                window.location.reload();
            }
            
            else if(res.data.value=="registered"){
               alert("Succesfully Signed Up. \n Please Login Using Your Credentials.")
                window.location.reload();
            }
        })
        .catch()  

    }




}

    
}
render(){
    return(
        <div id="pSignup">
            <img className="CrossLS" src={require('./Images/cross2.png')}/>
            <center>
               <h3 class="loginSup">Sign Up</h3>
               <form id="signup">
                <table id="login_table">
                    <tr>
                    <td><label>First Name: </label></td>
                    <td><input type="text"id="fname"></input></td>
                    </tr>
                    <tr>
                    <td><label>Last Name: </label></td>
                    <td><input id="lname" type="text"></input></td>
                    </tr>    
                    <tr>
                    <td><label>Email: </label></td>
                    <td><input id="e-mail" type="email"></input></td>
                    </tr>    
                    <tr>
                    <td><label>Password: </label></td>
                    <td><input id="passW" type="password"></input></td>
                    </tr>    
                    <tr>
                    <td><label>Confirm Password: </label></td>
                    <td><input id="CpassW" type="password"></input></td>
                    </tr>
                    <tr>
                    <td><p></p></td> 
                    </tr>
                    <tr>
                    <td><button type="button" class="btn btn-primary" onClick={this.sign}>SignUp</button></td>
                    <td><button type="button" class="btn btn-danger">Reset</button></td>
                    </tr>            
                    <br/>
                    <tr>
                    <td><h6 class="aSignUp">Already Signed Up? </h6></td>
                    <td><button type='button' class="btn btn-primary" id="bLogin">Log In</button></td>
                    </tr>
                </table>    
                </form>
                <br/>
                
            </center>            
        </div>
    )
}

}
export default LandS;