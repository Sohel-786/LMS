import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/Profile/ForgotPassword";

function ForgottenPassword() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full h-[700px] lg:h-auto">
      <header
        style={{ userSelect: "none" }}
        className="flex justify-center items-center shadow-headershadow w-full h-[10%] lg:h-auto"
      >
        <div className="w-[160px] aspect-auto">
          <img
            className="w-full aspect-auto"
            src={"/assets/classroom.svg"}
            alt="logo"
          />
        </div>
      </header>
      <div className="w-full flex justify-center items-center h-[563px]">
        <ForgotPassword
          hideForgotPass={() => {
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
}

export default ForgottenPassword;
