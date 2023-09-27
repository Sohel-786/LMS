import { FaCheck } from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { FcVideoCall } from 'react-icons/fc'

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
          <div className='flex text-gray-700 text-[15.5px] font-bold tracking-wider'><FaCheck size={'50px'} className='bg-green-100 p-1 h-5 font-semibold rounded-full text-green-600 mt-1 mr-2' /><p>{el.description}</p></div>

          <div className='flex text-black text-[15.5px] font-bold tracking-wide my-4'><BsPersonWorkspace size={'22px'} className='h-5 font-semibold rounded-full text-green-600 mr-2' /><p>Mentor : <span className='text-yellow-900'>{el.createdBy}</span></p></div>

          <div className='flex text-black text-[15.5px] font-bold tracking-wide my-4'><FcVideoCall size={'23px'} className='h-5 font-semibold rounded-full text-green-600 mt-1 mr-[6px]' /><p>Totol Lectures : <span className='text-yellow-900'>{el.numberofLectures}</span></p></div>

        </div>
      </div>
    </div>
  );
}

export default CourseCard;
