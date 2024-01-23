"use client"
import Commonbanner from "@/components/banners/Commonbanner";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";

const RoutinesPage = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const categoriesData = categories?.categories;

  const { data: subCategories } = useGetAllSubcategoriesQuery();
  const subCategoriesData = subCategories?.subcategories;

  const { data: courses } = useGetAllCoursesQuery();
  const coursesData = courses?.courses?.data;

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'ক্লাস রুটিন' },
  ];


  return (
    <>
      <Commonbanner title="ক্লাস রুটিন" breadcrumbItems={breadcrumbItems} />
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {coursesData?.map((course) => (
          <div key={course.id} className="p-4 rounded shadow bg-green-200">
            <h2 className="text-2xl font-bold mb-2 text-center">
              {course.title}
            </h2>
           
            {course.sub_category_id && (
              <div className="mb-2">
                <h3 className="text-lg font-bold mb-1">
                  Category: {course.sub_category_id.category_id.title}
                </h3>
                <p className="text-sm mb-1">
                  Subcategory: {course.sub_category_id.title}
                </p>
              </div>
            )}
           
            {course.routine ? (
             <a
             href={course.routine}
             target="_blank"
             rel="noopener noreferrer"
             className="text-blue-500 hover:underline"
           >
             <button className="bg-blue-500 hover:bg-orange-400 text-white px-4 py-2 rounded-full">
               রুটিন দেখুন
             </button>
           </a>
            ) : (
              <p className="text-black">রুটিন শীঘ্রই আসছে</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RoutinesPage;
