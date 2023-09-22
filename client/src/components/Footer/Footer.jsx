import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs'
import Li from './LI';

function Footer(){

    const newDate = new Date();
    const year = newDate.getFullYear();

    return(
        <footer className="flex w-full bg-gray-800 absolute bottom-0 flex-col sm:flex-row items-center h-[10vh] justify-between py-4 px-4 sm:px-12">
            <section>
                <h1 className='text-base font-sans'>CopyRight {year} | All rights reserved</h1>
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