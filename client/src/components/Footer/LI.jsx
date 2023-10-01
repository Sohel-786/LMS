function Li({children}){
    return(
        <li className='hover:text-sky-400 text-white transition-all ease-in-out duration-300'>
            <a href="#" aria-label="social-media">{children}</a>
        </li>
    )
}

export default Li;