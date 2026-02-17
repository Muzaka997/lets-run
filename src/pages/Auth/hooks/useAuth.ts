import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

export type User = {
  id: string;
  email: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
};

const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $name: String!
    $gender: Gender!
  ) {
    signup(email: $email, password: $password, name: $name, gender: $gender) {
      token
      user {
        id
        email
        name
        gender
      }
    }
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        gender
      }
    }
  }
`;

const ME = gql`
  query Me {
    me {
      id
      email
      name
      gender
    }
  }
`;

export function useAuth() {
  const client = useApolloClient();
  const [authError, setAuthError] = useState<string | null>(null);
  const { data: meData, refetch: refetchMe } = useQuery<{ me: User | null }>(
    ME,
  );
  const [signupMutation] = useMutation<
    { signup: { token: string; user: User } },
    { email: string; password: string; name: string; gender: User["gender"] }
  >(SIGNUP);
  const [loginMutation] = useMutation<
    { login: { token: string; user: User } },
    { email: string; password: string }
  >(LOGIN);

  async function signup(
    email: string,
    password: string,
    name: string,
    gender: User["gender"],
  ) {
    setAuthError(null);
    try {
      const { data } = await signupMutation({
        variables: { email, password, name, gender },
      });
      const token = data?.signup?.token;
      if (token) {
        localStorage.setItem("token", token);
        await client.resetStore();
        await refetchMe();
      }
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : typeof e === "string"
            ? e
            : "Signup failed";
      setAuthError(message);
      throw e;
    }
  }

  async function login(email: string, password: string) {
    setAuthError(null);
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      const token = data?.login?.token;
      if (token) {
        localStorage.setItem("token", token);
        await client.resetStore();
        await refetchMe();
      }
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : typeof e === "string"
            ? e
            : "Login failed";
      setAuthError(message);
      throw e;
    }
  }

  async function logout() {
    localStorage.removeItem("token");
    await client.resetStore();
    await refetchMe();
  }

  return {
    me: meData?.me ?? null,
    authError,
    signup,
    login,
    logout,
  };
}
