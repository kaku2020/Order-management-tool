import  {useState} from 'react';
import userData from "../data/LoginData.js";
import { Navigate} from 'react-router-dom';
import './Login.css';

function Login() {
    const [email , setEmail] =  useState('');
    const [password, setPassword] = useState('');
    const [errmessage, setErrMessage] = useState('');
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    
   
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userData);
        debugger
        //here i will call the api for getting the data but just for test purpose i will be using mock data
        //also any crucial inforformation should be encrypted but here for test purpose i am taking it as is.
        if(!email || !password){
            setErrMessage('Please enter your email and password.');
            return;
        }
        if(!isValidEmail(email)){
            setErrMessage('Please enter a valid email id');
            return;
        }
       
        if(password.length < 8  || !(/[A-Z]/.test(password)) || 
        !(/[a-z]/.test(password)) ||  !(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) || !(/\d/.test(password)))
        {
            setErrMessage('The password should be atleast 8 character long and should have atleast one uppercase,lowercase,special character and a number value in it.');
            return;
        }


        try{    
          
            let match = userData.find((item) => item.email === email && item.password === password );
            
            let usernames = userData.map(item => item.email.split("@")[0]);
            
            let usernamesmatch = userData.find((item,ind) => usernames[ind] === email && item.password === password);
            
            if(match ){
                sessionStorage.setItem("userid",match.id);
                setIsLoggedIn(true);
                return;
            }else if(usernamesmatch){
                sessionStorage.setItem("userid",usernamesmatch.id);
                setIsLoggedIn(true);
                return;
            }else{
                setErrMessage('incorrect email or password.')
                return;
            }
        }catch (error){
            console.log(error);
            return;
        }
      

    }

const  isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
}
if (isLoggedIn){
 
    return <Navigate to ="/orders"/> ;
}

return (
    <div className='login__container' key='login_container'>
      
      <form onSubmit={handleSubmit} className ="login__form" key="login_form">
        <label className='login_form_1_label' key ='login_form_1'>
            Email :
            <input  key ='login_form_input_1'  value={email} onChange = {(e) => setEmail(e.target.value)}/>
        </label>
        <br />
        <label className='login_form_2_label' key ='login_form_2'>
            Password :
            <input key ='login_form_input_2' type="password" value={password} onChange = {(e) => setPassword(e.target.value)}/>
        </label>
        <br />
        <button type="submit" className='submit-button' key='submit-button'>Submit</button>
      </form>
      <div className='login__container__error' data-testid='error_message' style={{display:null}}>{errmessage}</div>
     
    </div>
  )
}

export default Login;
