const ContactForm = () => {
  return (
    <div>
      <form action="#" className="space-y-4">
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
          placeholder="Subject *"
          required
        />
        <textarea
          type="text"
          className="px-4 py-3 bg-gray-200 w-full outline-none text-xl rounded "
          placeholder="Type comment here *"
          required
        />
        <input
          type="submit"
          className="px-4 py-3 bg-bluePrimary w-full text-white outline-none text-lg rounded  cursor-pointer hover:bg-cyanPrimary transition-all duration-500 delay-500"
          value="Submit Now"
          
        />
      </form>
    </div>
  );
};

export default ContactForm;
