import PrivateRoute from "@/components/shared/private-route";
import { ReactNode } from "react";

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  return <PrivateRoute>{children}</PrivateRoute>;
};

export default UserDashboardLayout;
