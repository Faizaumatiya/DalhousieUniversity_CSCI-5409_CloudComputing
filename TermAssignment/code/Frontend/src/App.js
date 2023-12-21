import './App.css';
import { Route, Routes } from "react-router-dom";
//import Header from './Components/Header';
import RegistrationForm from './Components/Registeration/Registeration';
import LoginForm from './Components/Login/Login';
import AddBlog from './Components/Blog/AddBlog';
import BlogList from './Components/Blog/ViewBlog';

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <Routes>
        <Route path = '/' element={<RegistrationForm />}></Route>
        <Route path = '/loginPage' element={<LoginForm/>} ></Route>
        <Route path ='/addBlog' element = {<AddBlog/>}></Route>
        <Route path = '/viewBlog' element = {<BlogList/>}></Route>
      </Routes>
    </div>
  );
}

export default App;


