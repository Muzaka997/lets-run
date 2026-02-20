import { Sidebar, Brand, VNav, VLink, SidebarFooter } from "./SidebarStyles";
import { useAuth } from "../pages/Auth/hooks/useAuth";

export default function NavBar() {
  const { me, logout } = useAuth();

  return (
    <Sidebar>
      {me && (
        <>
          <Brand>My App</Brand>
          <VNav>
            <VLink to="/" end>
              Home
            </VLink>
            <VLink to="/todos">Todos</VLink>
            <VLink to="/not-todos">Not Todos</VLink>
            <VLink to="/suggestions">Suggestions</VLink>
          </VNav>
          <SidebarFooter>
            <div style={{ marginTop: 12 }}>
              Signed in as <b>{me.email}</b>
            </div>
            <div style={{ marginTop: 8 }}>
              <button type="button" onClick={() => logout()}>
                Log out
              </button>
            </div>
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  );
}
