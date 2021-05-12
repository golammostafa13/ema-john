import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, fbSignIn, FirebaseConfigure, signIn, signOut, signUserWithEmailAndPassword } from "./LoginManager";
function Login() {
  FirebaseConfigure();
  const [user, setUser] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    isSignedIn: false,
    error: '',
    success: false,
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignIn = () =>{
    signIn()
    .then(res =>{
      setUser(res);
      setLoggedInUser(res);
    })
  }
  const handleSignOut = () =>{
    signOut()
    .then(res =>{
      setUser(res);
      setLoggedInUser(res);
    })
  }

  const  handleFbSignIn = () => {
    fbSignIn()
    .then(res =>{
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const handleSubmit = (e)=>{
    // console.log('hello');
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res=>{
        setUser(res);
        setLoggedInUser(res);
      })
    }
    if(!newUser && user.email && user.password){
      signUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
      .catch(res => {
        setUser(res);
        setLoggedInUser(res);
      })
    }
    e.preventDefault();
  }
  
  const handleBlur = (e) =>{
    // console.log(e.target.name, e.target.value);
    let isFieldValid=true;
    if(e.target.name==="email"){
       let isEmailValid = /\S+@\S+\.\S/.test(e.target.value);
       isFieldValid = isEmailValid;
    }if(e.target.name === "password"){
        const checkLength = e.target.value.length > 6;
        const numberCheck = /\d{1}/.test(e.target.value);
        isFieldValid = checkLength && numberCheck;
      }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e?.target?.name] = e?.target?.value;
      // console.log(newUserInfo);
      setUser(newUserInfo);
    }
  }
 
  return (
    <div style={{textAlign: 'center'}}>
      { user.isSignedIn ?
        <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In with google</button>
      } 
      {/* {user.isSignedIn && } */}
      <br></br>
      <button onClick={handleFbSignIn}>Sign in with facebook</button>
      <div>
        <input type="checkbox" onChange={()=>setNewUser(!newUser)}></input> 
        <label>New User Sign in</label>
        <form onSubmit={handleSubmit}>
          {newUser && <input onBlur={handleBlur} name="name" type="text" placeholder="Your name"></input>}<br></br>
          <input onBlur={handleBlur} name="email" type="email" placeholder="Enter email" required></input><br></br>
          <input onBlur={handleBlur} name="password" type="password" placeholder="password" required></input><br></br>
          <button type="submit">{newUser?'Sign Up':'Sign In'}</button>
        </form>
        <p style={{color: 'red'}}>{user.error}</p>
        {user.success && <p style={{color: 'green'}}>User {!newUser?'signed in': 'created'} successfully</p>}
        
      </div>
    </div>
  );
}

export default Login;