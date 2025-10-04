import AdminRoute from "@/components/shared/admin-route";
import { ReactNode } from "react";

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  return <AdminRoute>{children}</AdminRoute>;
};

export default AdminDashboardLayout;
