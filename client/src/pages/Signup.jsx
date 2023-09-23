import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const navigate = useNavigate();
    const [ signupDetails, setSignupDetails] = useState({
        email : '',
        fullname : '',
        password : '',
        avatar : ''
    })
    return(
    )
}
 
export default SignUp;