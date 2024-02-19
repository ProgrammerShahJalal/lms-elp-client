import EditCoursePlylist from "@/components/dashboard/admin/EditCoursePlaylist";
import { useGetAllPlaylistQuery } from "@/redux/api/videoApi";

const EditCoursePlaylistPage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <EditCoursePlylist id={id} />
    </div>
  );
};

export async function generateStaticParams() {
  const { data: coursePlaylists } = useGetAllPlaylistQuery({
    limit: 10000,
    page: 1,
  });
  return coursePlaylists?.playlists?.data?.map((data) => ({ id: data?._id }));
}

export default EditCoursePlaylistPage;
