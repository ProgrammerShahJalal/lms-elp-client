import Commonbanner from "@/components/banners/Commonbanner"
import GetInTouch from "./GetInTouch";
import OurMap from "./OurMap";


const ContactUs = () => {
    const breadcrumbItems = [
        { label: 'হোম', link: '/' },
        { label: 'Contact' },
      ];
  return (
    <div>
        <Commonbanner title="Contact Us" breadcrumbItems={breadcrumbItems}/>
        <GetInTouch/>
        <OurMap/>
    </div>
  )
}

export default ContactUs