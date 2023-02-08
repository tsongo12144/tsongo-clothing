import { useState,useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { 
signInWithGooglePopup,
createUserDocumentFromAuth,
signInAuthUserWithEmailAndPassword
} 
from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';
import Button from "../button/button.component";
const defaultformFields={
    email:'',
    password:'',
    } 
const SignInForm=()=>{
const [formFields,setFormFields]=useState(defaultformFields);
const {email,password,}=formFields;

const{setcurrentUser}=useContext(UserContext)

const resetFormFields=()=>{
setFormFields(defaultformFields);
}
    const signInWithGoogle=async()=>{
    const {user}=await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    };
       
const handleSubmit = async(event)=>{
event.preventDefault();
try{
const {user}= await signInAuthUserWithEmailAndPassword(email,password);
setcurrentUser(user);
resetFormFields();
}
catch(error){
switch(error.code){
case 'auth/wrong-password':
alert('Incorect Password or Email address');
break
case 'auth/user-not-found':
alert('User Email Does Not Exist');
break
default:
console.log(error);
}
}
}
const handleChange=(event)=>{
const {name,value}=event.target;
setFormFields({...formFields,[name]:value});
};
return(
<div className="sign-up-container">
<h2>I Already Have an Account <hr /></h2>
<span>Sign In With Email and Password</span>
<form onSubmit={handleSubmit}>
 

    <FormInput 
    type="email" 
    label="Email"
    required 
    onChange={handleChange} 
    name="email" 
    value={email} />

    <FormInput 
    type="password" 
    label="Password"
    required 
    onChange={handleChange} 
    name="password"
    value={password} />
<div className='buttons-container'>
<Button type="submit">Sign In</Button>
<Button type='button' buttonType='google' onClick={signInWithGoogle}>
 Google sign in</Button>
</div>
</form>
</div>
)
}
export default SignInForm;