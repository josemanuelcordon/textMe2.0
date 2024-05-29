import { Outlet } from "react-router-dom";
import NotificationPanel from "../components/NotificationPanel";

const RootPage = () => {
  return (
    <>
      <Outlet />
      <NotificationPanel />
    </>
  );
};

export default RootPage;
