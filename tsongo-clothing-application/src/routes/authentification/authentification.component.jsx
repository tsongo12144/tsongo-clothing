import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import './autentification.styles.scss';
import SignInForm
 from "../../components/sign-in-form/sign-in-form.component";
const Authentification=()=>{

return(
<div className="authentification-container"> 
<SignInForm />
<SignUpForm />
</div>
);
}
export default Authentification;