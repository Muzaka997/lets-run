import {
  HomeWrap,
  Hero,
  Eyebrow,
  HomeTitle,
  HomeLead,
  HeroActions,
  HeroButton,
  SectionTitle,
  FeatureList,
  FeatureItem,
  FeatureIcon,
  FeatureName,
  FeatureDesc,
} from "./HomeStyles";
import { useAuth } from "../Auth/hooks/useAuth";

const features = [
  {
    to: "/todos",
    icon: "✓",
    grad: "var(--grad-todo)",
    name: "Todos",
    desc: "Capture and complete everything you want to get done.",
  },
  {
    to: "/not-todos",
    icon: "✕",
    grad: "var(--grad-nottodo)",
    name: "Not Todos",
    desc: "Track the habits and distractions you're choosing to avoid.",
  },
  {
    to: "/calendar",
    icon: "📅",
    grad: "var(--grad-calendar)",
    name: "Calendar",
    desc: "Plan your week and schedule what matters most.",
  },
  {
    to: "/suggestions",
    icon: "✦",
    grad: "var(--grad-brand)",
    name: "Suggestions",
    desc: "Browse curated ideas and add them in a single tap.",
  },
];

export default function HomePage() {
  const { me } = useAuth();
  const firstName = (me?.name || "").split(" ")[0];

  return (
    <HomeWrap>
      <Hero>
        <Eyebrow>Welcome back</Eyebrow>
        <HomeTitle>
          {firstName ? `Hello, ${firstName} 👋` : "Hello there 👋"}
        </HomeTitle>
        <HomeLead>
          Momentum keeps your todos, the things you want to avoid, and your
          weekly plan in one calm place. Pick up right where you left off.
        </HomeLead>
        <HeroActions>
          <HeroButton to="/todos">View my todos</HeroButton>
          <HeroButton to="/calendar" $ghost>
            Open calendar
          </HeroButton>
        </HeroActions>
      </Hero>

      <SectionTitle>Jump back in</SectionTitle>
      <FeatureList>
        {features.map((f) => (
          <FeatureItem key={f.to} to={f.to}>
            <FeatureIcon $grad={f.grad}>{f.icon}</FeatureIcon>
            <FeatureName>{f.name}</FeatureName>
            <FeatureDesc>{f.desc}</FeatureDesc>
          </FeatureItem>
        ))}
      </FeatureList>
    </HomeWrap>
  );
}
