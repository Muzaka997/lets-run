import { useState } from "react";
import {
  TodoWrap,
  TodoForm,
  TodoList,
  TodoItem,
  TodoTitle,
  TodoInput,
  TodoCard,
  TodoRow,
  TodoSmall,
  TodoHeading,
} from "./TodoStyles";
import { useTodos, type Todo } from "./hooks/useTodos";
import { useAuth } from "../Auth/hooks/useAuth";

export default function TodosPage() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { me, logout } = useAuth();
  const [title, setTitle] = useState("");

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    await addTodo(title);
    setTitle("");
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TodoWrap>
      <TodoCard>
        <TodoRow>
          <TodoSmall>
            {me ? (
              <>
                Signed in as <b>{me.email}</b>
              </>
            ) : (
              <>Not signed in</>
            )}
          </TodoSmall>
          <button
            type="button"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </button>
        </TodoRow>
      </TodoCard>
      <TodoHeading>Todos</TodoHeading>
      <TodoForm onSubmit={onAdd}>
        <TodoInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </TodoForm>
      <TodoList>
        {todos.map((t: Todo) => (
          <TodoItem key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTodo(t.id, t.completed)}
            />
            <TodoTitle $completed={t.completed}>{t.title}</TodoTitle>
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </TodoItem>
        ))}
      </TodoList>
    </TodoWrap>
  );
}
