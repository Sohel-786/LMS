function Slide({num , url, q, author, leftId, rightId }){
    return(
        <div
        id={num}
        className="carousel-item relative w-full flex justify-center items-center"
      > 
        <div className="w-full flex justify-center items-center h-full gap-4">
          <img src={url} alt={author} className="w-[30%]" />
          <div className="w-1/2 flex flex-col h-full justify-center items-center">
            <q className="text-xl font-bold font-mono">{q}</q>
            <p className="pt-12 self-end text-yellow-400 font-bold font-serif">- {author}</p>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href={leftId} className="btn btn-circle">
            ❮
          </a>
          <a href={rightId} className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    )
}

export default Slide;