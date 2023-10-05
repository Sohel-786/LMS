import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const { avatar, fullname, email, createdAt } = useSelector(
    (s) => s?.auth?.data
  );

  return (
    <div className="h-[100vh]">
      <header className="flex justify-center items-center shadow-headershadow">
        <div className="w-[160px] aspect-auto">
          <img
            className="w-full aspect-auto"
            src={"/assets/classroom.svg"}
            alt="logo"
          />
        </div>
      </header>

      <div className="w-[90%] shadow-headershadow">
        <div
          style={{
            backgroundImage: `url(${avatar.secure_url})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          className="w-[350px] h-[350px] rounded-full border-[2px] border-black"
        ></div>
      </div>
    </div>
  );
}

export default Profile;
