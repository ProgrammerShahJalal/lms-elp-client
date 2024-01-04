'use client'
import { useParams } from "next/navigation";


const CoursePag = () => {
    
    const params = useParams()
    console.log(params,'from details page');
    return (
        <div>
            <h2>hello  </h2>
        </div>
    );
};

export default CoursePag;