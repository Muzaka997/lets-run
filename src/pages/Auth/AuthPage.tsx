import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth, type User } from "./hooks/useAuth";
import {
  AuthWrap,
  AuthCard,
  BrandMark,
  Heading,
  Subtitle,
  Row,
  Field,
  Label,
  Input,
  Select,
  Actions,
  Button,
  Note,
} from "./AuthStyles";

export default function AuthPage() {
  const { me, signup, login, authError } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as any)?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<User["gender"]>("OTHER");

  if (me) return <Navigate to={from} replace />;

  async function onAuth(act: "login" | "signup") {
    if (!email || !password) return;
    try {
      if (act === "login") {
        await login(email, password);
      } else {
        await signup(email, password, name || email.split("@")[0], gender);
      }
      // On success, go back to intended page
      navigate(from, { replace: true });
    } catch {
      // Failure is already surfaced to the user via `authError` (shown in the
      // Note below). Swallow here so it doesn't become an unhandled rejection.
    }
  }

  return (
    <AuthWrap>
      <AuthCard>
        <BrandMark>✺</BrandMark>
        <Heading>Welcome to Momentum</Heading>
        <Subtitle>Log in, or sign up to start building momentum.</Subtitle>
        <Row>
          <Field>
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
            />
          </Field>
          <Field>
            <Label>Name (signup)</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>
          <Field>
            <Label>Gender</Label>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value as User["gender"])}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </Select>
          </Field>
        </Row>
        <Actions>
          <Button type="button" onClick={() => onAuth("signup")}>
            Sign up
          </Button>
          <Button type="button" $primary onClick={() => onAuth("login")}>
            Log in
          </Button>
        </Actions>
        <Note $error={!!authError}>{authError ?? "Not signed in"}</Note>
      </AuthCard>
    </AuthWrap>
  );
}
