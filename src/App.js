import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import RecipeList from './RecipeList';
import Middle from './Middle';
import ShoppingCart from './ShoppingCart';
import Footer from './Footer';
class App extends Component {
  

   

  
  
  render(){
    return(
    <div id="app_container">
      <Header />
     <div id="show">
      <RecipeList />
      <Middle />
      <ShoppingCart />
      </div>
      <Footer />
      </div>
  );
}
}

export default App;
