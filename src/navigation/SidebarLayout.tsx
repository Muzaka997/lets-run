import { Outlet } from "react-router-dom";
import { Shell, Main } from "./SidebarStyles";
import NavBar from "./NavBar";

export default function SidebarLayout() {
  return (
    <Shell>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </Shell>
  );
}
