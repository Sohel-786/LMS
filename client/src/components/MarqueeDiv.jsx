function MarqueeDiv({url}){
    return (
        <div className="w-[111.997px] h-[111.997px] flex justify-center items-center aspect-auto rounded-3xl shadow-marquee overflow-hidden mx-4">
            <img className="w-[90%] aspect-auto" src={url} alt="Companies" />
        </div>
    )
}

export default MarqueeDiv;