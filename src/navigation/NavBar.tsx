import {
  Sidebar,
  Brand,
  BrandMark,
  VNav,
  VLink,
  NavSectionLabel,
  SidebarFooter,
  UserRow,
  Avatar,
  UserMeta,
  UserLabel,
  UserEmail,
  FooterActions,
  LogoutButton,
  ThemeToggle,
} from "./SidebarStyles";
import { useAuth } from "../pages/Auth/hooks/useAuth";
import { useTheme } from "../lib/theme";

/* Lightweight inline icons (stroke = currentColor) to avoid an icon dependency */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const HomeIcon = () => (
  <svg {...iconProps}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);
const CheckIcon = () => (
  <svg {...iconProps}>
    <path d="M4 12.5 9 17.5 20 6.5" />
  </svg>
);
const BanIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5.6 5.6 18.4 18.4" />
  </svg>
);
const SparkIcon = () => (
  <svg {...iconProps}>
    <path d="M12 3c.4 3.7 1.3 4.6 5 5-3.7.4-4.6 1.3-5 5-.4-3.7-1.3-4.6-5-5 3.7-.4 4.6-1.3 5-5Z" />
    <path d="M18.5 13.5c.2 1.6.6 2 2.2 2.2-1.6.2-2 .6-2.2 2.2-.2-1.6-.6-2-2.2-2.2 1.6-.2 2-.6 2.2-2.2Z" />
  </svg>
);
const CalendarIcon = () => (
  <svg {...iconProps}>
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);
const SunIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" />
  </svg>
);
const MoonIcon = () => (
  <svg {...iconProps}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
);

export default function NavBar() {
  const { me, logout } = useAuth();
  const { theme, toggle } = useTheme();

  if (!me) return null;

  const initial = (me.name || me.email || "?").trim().charAt(0);

  return (
    <Sidebar>
      <Brand>
        <BrandMark>✺</BrandMark>
        Momentum
      </Brand>

      <NavSectionLabel>Workspace</NavSectionLabel>
      <VNav>
        <VLink to="/" end>
          <HomeIcon />
          Home
        </VLink>
        <VLink to="/todos">
          <CheckIcon />
          Todos
        </VLink>
        <VLink to="/not-todos">
          <BanIcon />
          Not Todos
        </VLink>
        <VLink to="/calendar">
          <CalendarIcon />
          Calendar
        </VLink>
      </VNav>

      <NavSectionLabel>Discover</NavSectionLabel>
      <VNav>
        <VLink to="/suggestions" end>
          <SparkIcon />
          Todo Suggestions
        </VLink>
        <VLink to="/suggestions/not-todos">
          <SparkIcon />
          Not-Todo Suggestions
        </VLink>
      </VNav>

      <SidebarFooter>
        <UserRow>
          <Avatar>{initial}</Avatar>
          <UserMeta>
            <UserLabel>Signed in as</UserLabel>
            <UserEmail>{me.email}</UserEmail>
          </UserMeta>
        </UserRow>
        <FooterActions>
          <LogoutButton type="button" onClick={() => logout()}>
            Log out
          </LogoutButton>
          <ThemeToggle
            type="button"
            onClick={toggle}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </ThemeToggle>
        </FooterActions>
      </SidebarFooter>
    </Sidebar>
  );
}
