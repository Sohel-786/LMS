import HomeLayout from "../layouts/HomeLayout";
import aboutImage from "../../public/assets/aboutImage.png";

function Aboutus() {
  return (
    <HomeLayout>
      <section className="flex justify-center items-center mx-auto border-[2px] border-white pt-14">
        <div className="w-full flex justify-center items-center">
          <div className="w-1/2 flex flex-col justify-center gap-12">
            <h1>Affordable and Quality Education</h1>
            <p>
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </div>

          <div>
            <img src={aboutImage} alt="About Us Main Image" />
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}

export default Aboutus;
