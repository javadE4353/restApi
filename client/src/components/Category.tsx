import { showAlert } from "../atoms/modalAtom";
import Card from "../subcomponents/Card";
import { Movies } from "../typeing";
import { useRecoilState } from "recoil";

interface Props {
  movie: Movies[] | null | undefined;
}

function Category({ movie }: Props) {
  const [showalret, setShowAlert] = useRecoilState(showAlert);
  return (
    <>
      <div
        className={`fixed top-0 z-[999] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${
          showalret ? "block" : "hidden"
        }`}
      >
        <strong className="font-bold">اشتراک!</strong>
        <span className="block sm:inline">برای تماشای فیلم ها باید اشتراک داشته باشید یا در سایت ثبت نام کنید</span>
        <span
          className="absolute top-0 bottom-0 left-0 px-4 py-3"
          onClick={() => setShowAlert(false)}
        >
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
     
    
    <div className="flex flex-wrap justify-center	items-center">
      <>
        {movie ? (
          <>
            {movie?.map((item: Movies) => {
              return (
                <div className="flex flex-wrap">
                  <Card movie={item} />
                </div>
              );
            })}
          </>
        ) : 
        
        <div className="w-[21rem] max-w-[100%] bg-black rounded-xl p-3 text-white m-5 flex flex-col  cursor-pointer text-xl hover:scale-110 h-36 justify-center item-center">
          <div className="h-[100%]">
            <h4>فیلم وجود ندارد</h4>
          </div>
        </div>
        
        }
      </>
    </div>
    </>
  );
}

export default Category;
