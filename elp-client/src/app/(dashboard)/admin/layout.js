import AdminDashboard from "./profile/page";

export const metadata = {
    title: 'অ্যাডমিন ড্যাশবোর্ড',
    description: 'a admin homepage',
}
const DashboardLayout = ({ children }) => {
    return (
        <div>
            <AdminDashboard />
            {children}
        </div>
    );
};

export default DashboardLayout;