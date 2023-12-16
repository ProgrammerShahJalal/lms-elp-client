import { PiSmiley, PiStudentBold } from "react-icons/pi";
import { SlSupport } from "react-icons/sl";

const ChooseUs = () => {
  return (
    <div className="px-14 py-36">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="grid grid-cols-2 gap-7">
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <PiStudentBold className="text-4xl " />
              </div>

              <h2 className="font-bold text-2xl">200</h2>
              <p className="text-graySecondary">Learners & counting</p>
            </div>
          </div>
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <PiStudentBold className="text-4xl " />
              </div>

              <h2 className="font-bold text-2xl">200</h2>
              <p className="text-graySecondary">Learners & counting</p>
            </div>
          </div>
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <PiStudentBold className="text-4xl " />
              </div>

              <h2 className="font-bold text-2xl">200</h2>
              <p className="text-graySecondary">Learners & counting</p>
            </div>
          </div>
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <PiStudentBold className="text-4xl " />
              </div>

              <h2 className="font-bold text-2xl">200</h2>
              <p className="text-graySecondary">Learners & counting</p>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-5">
            <h5 className="uppercase font-bold text-bluePrimary ">WHY CHOOSE US</h5>
            <h2 className="text-3xl font-semibold">Creating A Community Of Life Long Learners</h2>
            <p className="text-graySecondary">
              Our courses are designed by industry experts and delivered through interactive online
              modules, allowing you to learn at your own pace.
            </p>

            <div className="flex justify-between items-center">
              <div>
                <div className="flex justify-center p-2 rounded-full bg-yellowPrimary ">
                  <PiSmiley className="text-white text-3xl" />
                </div>
              </div>
              <div className="pl-5">
                <h4 className="text-xl font-semibold text-bluePrimary">Trusted By Thousands</h4>
                <p className="text-graySecondary">
                  Online learning has become increasingly popular in recent years, offering a
                  flexible and convenient way for learning.
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex justify-center p-2 rounded-full bg-yellowPrimary ">
                  <SlSupport className="text-white text-3xl" />
                </div>
              </div>
              <div className="pl-5">
                <h4 className="text-xl font-semibold text-bluePrimary">
                  Unlimited Resources With Strong Support
                </h4>
                <p className="text-graySecondary">
                  Our platform also features a collaborative learning environment, where you can
                  connect with fellow learners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
