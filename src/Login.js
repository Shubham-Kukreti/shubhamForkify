import React,{Component} from 'react';
class Login extends Component{
constructor(){
    super();
}



render(){
    return(
        <div id="pLogin">
           <img className="CrossLS" src={require('./Images/cross2.png')}/>
           <center>
               <h3 class="loginSup">LogIn</h3>
            
                <form>
                   <table id="lTable">
                       <tr>
                           <td><label>UserName: </label></td>
                           <td><input id="uName" placeholder="Your FirstName" type="text"></input></td>
                       </tr>
                       <tr>
                           <td><label>Email: </label></td>
                           <td><input id="uEmail" type="email"></input></td>
                       </tr>
                      
                       <tr>
                           <td><label>Password: </label></td>
                           <td><input id="uPass" type="password"></input></td>
                       </tr>
                       </table>
                       <p></p>
                       <button type="button" id="BLogin"  class="btn btn-primary">Login</button>
                       <p><br/></p>
                        <table>
                        <tr>
                        <td><h6 class="aSignUp">Not Registered Yet?</h6></td>
                        <td><button type="button" id="bSignup" class="btn btn-primary">Sign Up</button></td>
                        </tr>
                        </table>
               </form>
           </center>

        </div>
    )
}
}
export default Login 