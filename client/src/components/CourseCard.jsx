function CourseCard({ el }) {
  return (
    <div className="w-[380px] h-[548px] rounded-lg overflow-hidden bg-white">
      <div className="w-full h-[40%]">
        <img
          className="w-full aspect-auto max-h-full"
          src={el.thumbnail.secure_url}
          alt={"course"}
        />
      </div>
      <div className="flex flex-col justify-center px-6">
        <div className="flex justify-center flex-col">
          <h1 className="text-black font-bold text-[22px]">{el.title}</h1>
          <h3 className="text-gray-600 font-bold text-lg font-mono tracking-wide">{el.category}</h3>
        </div>
        <hr className="border-t-[1px] my-3" />
        <div>
          <p>{el.description}</p>
          <p>Mentor : {el.createdBy}</p>
          <p>Totol Lectures : {el.numberofLectures} </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
