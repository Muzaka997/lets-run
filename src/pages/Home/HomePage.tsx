import {
  HomeWrap,
  HomeTitle,
  HomeLead,
  FeatureList,
  FeatureItem,
} from "./HomeStyles";

export default function HomePage() {
  return (
    <HomeWrap>
      <HomeTitle>Welcome to My App</HomeTitle>
      <HomeLead>
        This is a simple learning app demonstrating authentication and GraphQL.
        Use the sidebar to navigate between your Todos and Not Todos.
      </HomeLead>
      <FeatureList>
        <FeatureItem>Secure login and signup</FeatureItem>
        <FeatureItem>Manage your todo list</FeatureItem>
        <FeatureItem>Track things you do not want to do</FeatureItem>
      </FeatureList>
    </HomeWrap>
  );
}
