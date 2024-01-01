import Image from "next/image";
import avatar from "../../../../assets/images/img1.png";
import { PiNotebookBold } from "react-icons/pi";
import Link from "next/link";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAddToCartMutation } from "@/redux/api/cartApi";

const BookSectionCard = ({item}) => {
  const [addToCart] = useAddToCartMutation()
  // const dispatch = useDispatch();

  const handleAddBook = async (item) => {

    const res = await addToCart({book_id: item?._id, quantity: 1 });
    console.log(res, 'from book section');
    console.log(res?.data?.book_id?._id, 'from book section');
    if (res?.data?.quantity && res.data.quantity > 1) {
      toast.success('Book has already been added to your cart. Please check your cart.');
    } else {
      toast.success('Book added to your cart successfully.');
    }
    // console.log(item)
    // dispatch(addToCart(item));
    // toast.success('Book added in your cart')
    
  }

  return (
    <>
      <div className="card w-[350px]  shadow-xl cursor-pointer transition ease-in-out delay-150  duration-300 rounded bg-white">
        <figure className="relative">
          <Image
            className="rounded w-full h-72"
            src={item?.cover_page}
            alt="course"
            width={400}
            height={100}
          />
        </figure>

        <div  className="cursor-pointer p-4 hover:bg-white hover:rounded hover:text-cyanPrimary">
          <h2 className="card-title  border px-4 py-2  bg-bluePrimary  ring-1 border-white absolute top-[220px] text-white text-[16px] border-b-0 rounded">
            {item?.title}
          </h2>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <Image src={avatar} width={40} height={50} alt="avatar" className="rounded-full" />
              <span className="pl-2 text-cyanPrimary hover:text-cyanPrimary">{item?.writer}</span>
            </div>
            <div className="flex items-center">
              <PiNotebookBold />{" "}
              <span className="pl-1 text-cyanPrimary font-semibold"> {item?.format}</span>
            </div>
            
          </div>

          <p className="py-2">{item?.description}<Link className="text-bluePrimary pl-5"  href={`/books/details/${item?._id}`}>আর দেখুন</Link> </p>
          
          <hr />
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm font-semibold py-3">
              {" "}
              কোর্সের মূল্যঃ <del className="text-gray-400  "> -{item?.discount_price} </del> <span className="font-bold pl-2">{item?.price}</span> Tk
            </p>
            <button onClick={() => handleAddBook(item)}  className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded  hover:bg-bluePrimary ">
              এড টু কার্ড
            </button>
          </div>
          {/* <div className=" card-actions justify-start ">
            <button className="text-black transition-all duration-300 rounded hover:text-yellowPrimary font-medium underline">
              বইটি কিনুন
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default BookSectionCard;
