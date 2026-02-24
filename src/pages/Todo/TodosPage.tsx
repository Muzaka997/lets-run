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
  TodoButton,
  TodoDangerButton,
  TodoDetails,
  TodoMeta,
  TagRow,
  TagChip,
} from "./TodoStyles";
import { useTodos, type Todo } from "./hooks/useTodos";
import { useAuth } from "../Auth/hooks/useAuth";

export default function TodosPage() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { me, logout } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [estimated, setEstimated] = useState<number | "">("");
  const [tagsText, setTagsText] = useState("");

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    await addTodo(title, {
      category: category || undefined,
      estimatedMinutes:
        typeof estimated === "number" && !Number.isNaN(estimated)
          ? estimated
          : undefined,
      tags,
    });
    setTitle("");
    setCategory("General");
    setEstimated("");
    setTagsText("");
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
          <TodoButton
            type="button"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </TodoButton>
        </TodoRow>
      </TodoCard>
      <TodoHeading>Todos</TodoHeading>
      <TodoForm onSubmit={onAdd}>
        <TodoInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a todo"
        />
        <TodoInput
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g., Work)"
        />
        <TodoInput
          value={estimated}
          onChange={(e) => {
            const v = e.target.value;
            const n = Number(v);
            setEstimated(v === "" ? "" : Number.isNaN(n) ? "" : n);
          }}
          placeholder="Estimated minutes"
        />
        <TodoInput
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="Tags (comma-separated)"
        />
        <TodoButton type="submit">Add</TodoButton>
      </TodoForm>
      <TodoList>
        {todos.map((t: Todo) => (
          <TodoItem key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTodo(t.id, t.completed)}
            />
            <TodoDetails>
              <TodoTitle $completed={t.completed}>{t.title}</TodoTitle>
              <TodoMeta>
                {t.category} • {t.estimatedMinutes ?? 0} min
              </TodoMeta>
              {Array.isArray(t.tags) && t.tags.length > 0 ? (
                <TagRow>
                  {t.tags.map((tag) => (
                    <TagChip key={tag}>#{tag}</TagChip>
                  ))}
                </TagRow>
              ) : null}
            </TodoDetails>
            <TodoDangerButton onClick={() => deleteTodo(t.id)}>
              Delete
            </TodoDangerButton>
          </TodoItem>
        ))}
      </TodoList>
    </TodoWrap>
  );
}
