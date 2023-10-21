function Slide({ num, url, q, author, leftId, rightId }) {

  function ArrowView(e){
    const slide = document.querySelectorAll('#slideview');
    if(e.type === 'mouseover'){
      slide.forEach((el) => {
        el.style.display = 'flex'
      })
    } 
    if(e.type === 'mouseleave'){
      slide.forEach((el) => {
        el.style.display = 'none'
      })
    } 
  }

  return (
    <div
      onMouseOver={ArrowView}
      onMouseLeave={ArrowView}
      id={num}
      className="carousel-item relative w-full flex justify-center items-center"
    >
      <div className="w-full flex flex-col justify-center items-center h-full gap-4 sm:flex-row">
        <img src={url} alt={author} className="w-[50%] sm:w-[30%]" />
        <div className="w-[80%] flex flex-col h-full justify-center items-center sm:w-1/2">
          <q className="text-base sm:text-xl font-bold font-mono">{q}</q>
          <p className="pt-6 sm:pt-12 self-end text-yellow-500 font-bold font-serif">
            - {author}
          </p>
        </div>
      </div>

      <div id='slideview' className="absolute hidden justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a aria-label={author} href={leftId} className="btn btn-circle">
          ❮
        </a>
        <a aria-label={author} href={rightId} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
}

export default Slide;
