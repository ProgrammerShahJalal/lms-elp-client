const AllNoticesPage = () => {
  return (
    <div>
      <h2 className="text-center font-bold text-3xl my-4">সব নোটিশ দেখুন</h2>
      <div className="my-5 space-y-4">
        <div className=" bg-white rounded-lg border-b-2">
          <div className="flex justify-between items-center">
            <div className="bg-green-500 text-white px-3 rounded py-4">
              <h2>February</h2>
              <h1 className="font-bold text-2xl">21</h1>
            </div>
            <div className="text-gray-500 pl-5">
              <h2 className="font-bold text-xl">
                Today Free class will be held
              </h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aliquam perferendis enim excepturi ut quos quibusdam ipsa
                quaerat quis pariatur nobis repudiandae soluta aperiam,
                reiciendis quidem, sapiente rerum sint illo nostrum voluptatibus
                tenetur ipsam. Quod sed aliquid deleniti est fugit consequatur?
              </p>

              <button
                className="bg-red-500 text-white py- mb-4 px-2 rounded-md"
                onClick={() => handleDelete(category.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-lg border-b-2">
          <div className="flex justify-between items-center">
            <div className="bg-green-500 text-white px-3 rounded py-4">
              <h2>February</h2>
              <h1 className="font-bold text-2xl">21</h1>
            </div>
            <div className="text-gray-500 pl-5">
              <h2 className="font-bold text-xl">
                Today Free class will be held
              </h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aliquam perferendis enim excepturi ut quos quibusdam ipsa
                quaerat quis pariatur nobis repudiandae soluta aperiam,
                reiciendis quidem, sapiente rerum sint illo nostrum voluptatibus
                tenetur ipsam. Quod sed aliquid deleniti est fugit consequatur?
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-lg border-b-2">
          <div className="flex justify-between items-center">
            <div className="bg-green-500 text-white px-3 rounded py-4">
              <h2>February</h2>
              <h1 className="font-bold text-2xl">21</h1>
            </div>
            <div className="text-gray-500 pl-5">
              <h2 className="font-bold text-xl">
                Today Free class will be held
              </h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aliquam perferendis enim excepturi ut quos quibusdam ipsa
                quaerat quis pariatur nobis repudiandae soluta aperiam,
                reiciendis quidem, sapiente rerum sint illo nostrum voluptatibus
                tenetur ipsam. Quod sed aliquid deleniti est fugit consequatur?
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-lg border-b-2">
          <div className="flex justify-between items-center">
            <div className="bg-green-500 text-white px-3 rounded py-4">
              <h2>February</h2>
              <h1 className="font-bold text-2xl">21</h1>
            </div>
            <div className="text-gray-500 pl-5">
              <h2 className="font-bold text-xl">
                Today Free class will be held
              </h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aliquam perferendis enim excepturi ut quos quibusdam ipsa
                quaerat quis pariatur nobis repudiandae soluta aperiam,
                reiciendis quidem, sapiente rerum sint illo nostrum voluptatibus
                tenetur ipsam. Quod sed aliquid deleniti est fugit consequatur?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNoticesPage;
