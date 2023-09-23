import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

function SignUp() {
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullname: "",
    password: "",
    avatar: "",
  });

  return (
    <HomeLayout>
      <div className="flex "></div>
    </HomeLayout>
  );
}

export default SignUp;
