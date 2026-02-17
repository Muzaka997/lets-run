import { useState } from "react";
import {
  NotTodoWrap,
  NotTodoCard,
  NotTodoRow,
  NotTodoSmall,
  NotTodoHeading,
  NotTodoForm,
  NotTodoInput,
  NotTodoList,
  NotTodoItem,
  NotTodoTitle,
} from "./NotTodoStyles";
import { useNotTodos, type NotTodo } from "./hooks/useNotTodos";
import { useAuth } from "../Auth/hooks/useAuth";

export default function NotTodosPage() {
  const { notTodos, loading, error, addNotTodo, toggleNotTodo, deleteNotTodo } =
    useNotTodos();
  const { me, logout } = useAuth();
  const [title, setTitle] = useState("");

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    await addNotTodo(title);
    setTitle("");
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <NotTodoWrap>
      <NotTodoCard>
        <NotTodoRow>
          <NotTodoSmall>
            {me ? (
              <>
                Signed in as <b>{me.email}</b>
              </>
            ) : (
              <>Not signed in</>
            )}
          </NotTodoSmall>
          <button
            type="button"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </button>
        </NotTodoRow>
      </NotTodoCard>
      <NotTodoHeading>Not Todos</NotTodoHeading>
      <NotTodoForm onSubmit={onAdd}>
        <NotTodoInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a not-todo"
        />
        <button type="submit">Add</button>
      </NotTodoForm>
      <NotTodoList>
        {notTodos.map((t: NotTodo) => (
          <NotTodoItem key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleNotTodo(t.id, t.completed)}
            />
            <NotTodoTitle $completed={t.completed}>{t.title}</NotTodoTitle>
            <button onClick={() => deleteNotTodo(t.id)}>Delete</button>
          </NotTodoItem>
        ))}
      </NotTodoList>
    </NotTodoWrap>
  );
}
