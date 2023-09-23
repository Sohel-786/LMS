import Slide from "../components/About/Slide";
import HomeLayout from "../layouts/HomeLayout";
import aboutImage from "/assets/aboutImage.png";

function Aboutus() {
  return (
    <HomeLayout>
      <section className="flex flex-col justify-center items-center mx-auto pt-14">
        <div className="w-full flex justify-center items-center px-10 gap-4">
          <div className="w-1/2 flex flex-col justify-center gap-10">
            <h1 className="text-5xl text-yellow-400 font-bold font-sans">Affordable and Quality Education</h1>
            <p className="text-lg tracking-wide font-semibold">
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

        <div className="carousel w-[90%] my-20">

          <Slide num={'slide1'} url={'/assets/apj.png'} q={' The best brains of the nation may be found on the last benches of the classroom. '} author={'A. P. J. Abdul Kalam'} leftId={'#slide4'} rightId={'#slide2'}  />

          <Slide num={'slide2'} url={'/assets/einstein.png'} q={' We cannot solve our problems with the same thinking we used when we created them. '} author={'Albert Einstein'} leftId={'#slide1'} rightId={'#slide3'}  />

          <Slide num={'slide3'} url={'/assets/billGates.png'} q={" What's amazing is, if young people understood how doing well in school makes the rest of their life so much interesting, they would be more motivated. "} author={'Bill Gates'} leftId={'#slide2'} rightId={'#slide4'}  />

          <Slide num={'slide4'} url={'/assets/nelsonMandela.png'} q={' Do not judge me by my successes, judge me by how many times I fell down and got back up again. '} author={'Nelson Mandela'} leftId={'#slide3'} rightId={'#slide1'}  />
          
        </div>
      </section>
    </HomeLayout>
  );
}

export default Aboutus;
