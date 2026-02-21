import "./App.css";
import type { ReactElement } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import TodosPage from "./pages/Todo/TodosPage";
import NotTodosPage from "./pages/NotTodo/NotTodosPage";
import SuggestionsPage from "./pages/Suggestions/SuggestionsPage";
import NotTodoSuggestionsPage from "./pages/Suggestions/NotTodoSuggestionsPage";
import HomePage from "./pages/Home/HomePage";
import { useAuth } from "./pages/Auth/hooks/useAuth";
import SidebarLayout from "./navigation/SidebarLayout";

function RequireAuth({ children }: { children: ReactElement }) {
  const { me } = useAuth();
  const location = useLocation();
  if (!me) return <Navigate to="/auth" replace state={{ from: location }} />;
  return children;
}

export default function App() {
  const { me } = useAuth();
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <SidebarLayout />
          </RequireAuth>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="not-todos" element={<NotTodosPage />} />
        <Route path="suggestions" element={<SuggestionsPage />} />
        <Route
          path="suggestions/not-todos"
          element={<NotTodoSuggestionsPage />}
        />
      </Route>
      <Route path="*" element={<Navigate to={me ? "/" : "/auth"} replace />} />
    </Routes>
  );
}
