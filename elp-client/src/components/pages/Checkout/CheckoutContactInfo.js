

const CheckoutContactInfo = () => {
  return (
    <div>

        <div className="bg-white border rounded">
        
        <form action="#" className="space-y-4 px-5 py-5">
        <input
          type="text"
          className="px-4 py-3 bg-gray-200 w-full outline-none text-xl rounded "
          placeholder="Your Name *"
          required
        />
        <input
          type="text"
          className="px-4 py-3 bg-gray-200 w-full outline-none text-xl rounded "
          placeholder="Your Email *"
          required
        />
        <input
          type="text"
          className="px-4 py-3 bg-gray-200 w-full outline-none text-xl rounded "
          placeholder="Your Phone *"
          required
        />
        <input
          type="text"
          className="px-4 py-3 bg-gray-200 w-full outline-none text-xl rounded "
          placeholder="Address"
          required
        />
        
        
      </form>

        </div>
    </div>
  )
}

export default CheckoutContactInfo