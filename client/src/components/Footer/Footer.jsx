import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs'
import Li from './LI';

function Footer(){

    const newDate = new Date();
    const year = newDate.getFullYear();

    return(
        <footer className="flex w-full bg-gradient-to-r from-[#0d0d0d] to-[#0d0d0de0] flex-col sm:flex-row items-center justify-between py-4 px-4 sm:px-12">
            <section className='w-[30%]'>
               <img className='w-full aspect-auto' src="/assets/classroom2.svg" alt="classroomLogo" />
            </section>
            <section>
                <ul className='flex items-center justify-center gap-4 sm:gap-8 text-lg sm:text-2xl'>
                    <Li><BsFacebook /></Li>
                    <Li><BsTwitter /></Li>
                    <Li><BsInstagram /></Li>
                    <Li><BsLinkedin /></Li>
                </ul>
            </section>
        </footer>
    )
}

export default Footer;