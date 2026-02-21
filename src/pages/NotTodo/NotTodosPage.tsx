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
  const [category, setCategory] = useState("General");
  const [estimated, setEstimated] = useState<number | "">("");
  const [tagsText, setTagsText] = useState("");

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    await addNotTodo(title, {
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
        <NotTodoInput
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g., Fun)"
        />
        <NotTodoInput
          value={estimated}
          onChange={(e) => {
            const v = e.target.value;
            const n = Number(v);
            setEstimated(v === "" ? "" : Number.isNaN(n) ? "" : n);
          }}
          placeholder="Estimated minutes"
        />
        <NotTodoInput
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="Tags (comma-separated)"
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
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <NotTodoTitle $completed={t.completed}>{t.title}</NotTodoTitle>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
                {t.category} • {t.estimatedMinutes ?? 0} min
              </div>
              {Array.isArray(t.tags) && t.tags.length > 0 ? (
                <div
                  style={{
                    marginTop: 4,
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        padding: "2px 6px",
                        borderRadius: 8,
                        background: "#eef2f7",
                        color: "#334155",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <button onClick={() => deleteNotTodo(t.id)}>Delete</button>
          </NotTodoItem>
        ))}
      </NotTodoList>
    </NotTodoWrap>
  );
}
