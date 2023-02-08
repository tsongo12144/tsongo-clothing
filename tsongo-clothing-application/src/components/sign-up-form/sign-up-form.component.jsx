import { useState,useContext } 
from "react";
import {
createAuthUserWithEmailAndPassword,
createUserDocumentFromAuth 
} 
from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss';
import Button from "../button/button.component";
const defaultFormField={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
    } 
const SignUpForm=()=>{
const [formFields,setFormFields]=useState(defaultFormField);
const {displayName,email,password,confirmPassword}=formFields;

const {setcurrentUser}=useContext(UserContext);


const resetFormFields=()=>{
setFormFields(defaultFormField);
}
const handleSubmit = async(event)=>{
event.preventDefault();
if(password !== confirmPassword){
alert("password do not match");
return;
}
try{
const {user}=await createAuthUserWithEmailAndPassword(email,password);
setcurrentUser(user);
await createUserDocumentFromAuth(user,{displayName});
resetFormFields();
}
catch(error){
if(error.code==='auth/email-already-in-use'){ 
alert('cannot create User , email already use');
}
else{
console.log('user creation error',error);
}
}
}
const handleChange=(event)=>{
const {name,value}=event.target;
setFormFields({...formFields,[name]:value});
};
return(
<div className="sign-up-container">
<h2>I Don't Have an Account <hr /></h2>
<span>Sign Up With Email and Password</span>
<form onSubmit={handleSubmit}>
    <FormInput 
    label="Display name"
    type="text" 
    required 
    onChange={handleChange} 
    name="displayName" 
    value={displayName} /> 

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

    <FormInput 
    type="password" 
    label="Confirm Password"
    required 
    onChange={handleChange} 
    name="confirmPassword" 
    value={confirmPassword} />
    <Button type="submit">Sign Up</Button>
</form>
</div>
)
}
export default SignUpForm;