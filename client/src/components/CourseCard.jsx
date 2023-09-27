function CourseCard({ el }) {
  return (
    <div className="w-[380px]">
      <div>
        <img src={el.thumbnail.secure_url} alt={"course"} />
      </div>
      <div>
        <h1>{el.title}</h1>
        <h3>{el.category}</h3>
      </div>
      <hr />
      <div>
        <p>{el.description}</p>
        <p>Mentor : {el.createdBy}</p>
        <p>Totol Lectures : {el.numberofLectures} </p>
      </div>
    </div>
  );
}

export default CourseCard;
