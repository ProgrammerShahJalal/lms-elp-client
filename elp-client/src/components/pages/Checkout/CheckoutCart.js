import { useSelector } from "react-redux";

const CheckoutCart = () => {
  const { books, total } = useSelector((state) => state.cart);

  return (
    <div>
      <div className="bg-white border rounded py-10">
      
        <div className="px-6">
          {books?.map((item) => (
            <div key={item?._id}>
              <div className="flex justify-between items-center pb-5">
                <h2>{item?.name}</h2>
                <h2>{item?.quantity * item?.price} TK</h2>
              </div>
            </div>
          ))}
          <hr />
          <div>
            <div>
              <h2 className="font-bold text-xl text-bluePrimary">Shipping Method</h2>
              <p className="border px-2 py-1"> Standard Delivery :70tk</p>
            </div>
            <div className="py-5">
              <h2 className="font-bold text-xl text-bluePrimary">Payment Method</h2>
              <p className="border px-2 py-1"> CashOn Delivery </p>
              <p className="border px-2 py-1"> Sslcommerz</p>
            </div>
            <div className="pt-5">
              <div className="flex justify-between items-center text-start">
                <h2>Subtotal:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">{total.toFixed(2)}</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Shipping fee:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">70 TK</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Tax:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">0.00 Tk</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Discount:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">0.00 Tk</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Total:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">{(total+ 70).toFixed(2)} </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;