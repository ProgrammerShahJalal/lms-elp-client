import Image from 'next/image';
import img1 from '../../../assets/images/team_img.jpg'
import img2 from '../../../assets/images/team_img_2.png'
import img3 from '../../../assets/images/team_img_3.png'
import img4 from '../../../assets/images/team_img_4.png';
import { CgFacebook } from "react-icons/cg";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";

const Teachers = () => {
  return (
    <div className=" py-10">
    <div className="px-14">
      <div className="flex justify-center">
        <div className="">
          <h3 className='font-bold text-2xl capitalize py-10'>our Teachers</h3>
          {/* <img src="assets/img/divider.png" alt="" /> */}
        </div>
      </div>
      <div className="">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="">
            <div className="overflow-hidden text-center text-uppercase">
              <div className="team_img relative border border-gray-300">
                <Image src={img1} className="w-full" alt="alt" />
                <div className="team_img_overlay absolute  bg-cyanPrimary top-0 right-0 opacity-0 flex justify-center items-center transition duration-500 ease-in-out invisible h-full" >
                  <ul>
                    <li>
                      <a href="/" className='hover:bg-bluePrimary border-bluePrimary'><CgFacebook/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><FaLinkedinIn/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><FaWhatsapp/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><IoLogoTwitter/></a>
                    </li>
                  </ul>
                </div>
              </div>
              <h4 className="text-md  uppercase font-medium cursor-pointer pt-3 transition duration-500 ease-in-out hover:text-bluePrimary">sajal shardar</h4>
              <h5 className="text-sm font-normal capitalize ">English Teacher</h5>
            </div>
          </div>
          <div className="">
            <div className="overflow-hidden text-center text-uppercase">
              <div className="team_img relative border border-gray-300">
                <Image src={img1} className="w-full" alt="alt" />
                <div className="team_img_overlay absolute  bg-cyanPrimary top-0 right-0 opacity-0 flex justify-center items-center transition duration-500 ease-in-out invisible h-full" >
                  <ul>
                    <li>
                      <a href="/" className='hover:bg-bluePrimary border-bluePrimary'><CgFacebook/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><FaLinkedinIn/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><FaWhatsapp/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><IoLogoTwitter/></a>
                    </li>
                  </ul>
                </div>
              </div>
              <h4 className="text-md  uppercase font-medium cursor-pointer pt-3 transition duration-500 ease-in-out hover:text-bluePrimary">sajal shardar</h4>
              <h5 className="text-sm font-normal capitalize ">English Teacher</h5>
            </div>
          </div>
          <div className="">
            <div className="overflow-hidden text-center text-uppercase">
              <div className="team_img relative border border-gray-300">
                <Image src={img1} className="w-full" alt="alt" />
                <div className="team_img_overlay absolute  bg-cyanPrimary top-0 right-0 opacity-0 flex justify-center items-center transition duration-500 ease-in-out invisible h-full" >
                  <ul>
                    <li>
                      <a href="/" className='hover:bg-bluePrimary border-bluePrimary'><CgFacebook/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><FaLinkedinIn/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><FaWhatsapp/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><IoLogoTwitter/></a>
                    </li>
                  </ul>
                </div>
              </div>
              <h4 className="text-md  uppercase font-medium cursor-pointer pt-3 transition duration-500 ease-in-out hover:text-bluePrimary">sajal shardar</h4>
              <h5 className="text-sm font-normal capitalize ">English Teacher</h5>
            </div>
          </div>
          <div className="">
            <div className="overflow-hidden text-center text-uppercase">
              <div className="team_img relative border border-gray-300">
                <Image src={img1} className="w-full" alt="alt" />
                <div className="team_img_overlay absolute  bg-cyanPrimary top-0 right-0 opacity-0 flex justify-center items-center transition duration-500 ease-in-out invisible h-full" >
                  <ul>
                    <li>
                      <a href="/" className='hover:bg-bluePrimary border-bluePrimary'><CgFacebook/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><FaLinkedinIn/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><FaWhatsapp/></a>
                    </li>
                    <li>
                      <a href="#"className='hover:bg-bluePrimary border-bluePrimary'><IoLogoTwitter/></a>
                    </li>
                  </ul>
                </div>
              </div>
              <h4 className="text-md  uppercase font-medium cursor-pointer pt-3 transition duration-500 ease-in-out hover:text-bluePrimary">sajal shardar</h4>
              <h5 className="text-sm font-normal capitalize ">English Teacher</h5>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Teachers