'use client'
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useAddSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AddSubscription = () => {
    const [addSubscription] = useAddSubscriptionMutation()
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { data: categories } = useGetAllCategoriesQuery(undefined);
    const { data: subCategories, refetch: refetchSubCategories } =
        useGetAllSubcategoriesQuery({
            category_id: selectedCategory,
        });
    const { data: courses, refetch: refetchCourses } = useGetAllCoursesQuery({
        sub_category_id: selectedSubcategory,
    });
    const allCourse = courses?.courses?.data;
    useEffect(() => {
        const fetchSubCategory = async () => {
            await refetchSubCategories({ category_id: selectedCategory });
        };
        fetchSubCategory();
    }, [selectedCategory]);

    useEffect(() => {
        const fetchSubCategories = async () => {
            await refetchCourses({ sub_category_id: selectedSubcategory });
        };
        fetchSubCategories();
    }, [selectedSubcategory]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const subscriptionData = {
            name: event.target.name.value,
            subscription_duration_in_months: parseInt(event.target.duration_month.value),
            cost: parseInt(event.target.cost.value),
            course_id: selectedCourse,
        }
        try {
            const response = await addSubscription(subscriptionData)
            console.log(response);
            if (response) {
                toast.success("Successfully Added Subscription")
            }
        } catch (error) {
            toast.error("Not adding subscription")
            console.error('Error adding subscription', error)

        }

    };


    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className=" w-full  mx-auto bg-white p-8 border rounded shadow"
            >
                <h1>অ্যাডমিন সাবস্ক্রিপশন যোগ করেছেন</h1>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Subscription Name
                    </label>
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="month"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Subscription Duration In Month
                    </label>
                    <input
                        required
                        type="number"
                        id="duration_month"
                        name="duration_month"
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="cost"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Subscription Cost
                    </label>
                    <input
                        required
                        type="number"
                        id="cost"
                        name="cost"
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="categories"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Categories
                    </label>
                    <select
                        id="categories"
                        name="categories"
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select a category
                        </option>
                        {categories &&
                            categories?.categories?.map((category) => (
                                <option key={category?.id} value={category?.id}>
                                    {category.title}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="subcategories"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Subcategories
                    </label>
                    <select
                        id="subcategories"
                        name="subcategories"
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        disabled={!selectedCategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select a sub category
                        </option>
                        {!!subCategories &&
                            subCategories?.subcategories?.map((subCategory) => (
                                <option key={subCategory?.id} value={subCategory?.id}>
                                    {subCategory?.title}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="courses"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Select Courses
                    </label>
                    <select
                        id="courses"
                        name="courses"
                        disabled={!selectedSubcategory}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    >
                        <option value="" disabled selected>
                            Select a course
                        </option>
                        {allCourse?.length === 0 ? (
                            <option value="" disabled>
                                No courses available
                            </option>
                        ) : (
                            allCourse?.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
                    >
                        Add Subscription
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSubscription;