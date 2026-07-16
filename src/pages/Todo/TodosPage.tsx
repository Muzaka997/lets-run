import { useState } from "react";
import {
  TodoWrap,
  TodoForm,
  TodoList,
  TodoItem,
  TodoTitle,
  TodoInput,
  TodoHeading,
  TodoSubhead,
  TodoButton,
  TodoDangerButton,
  TodoDetails,
  TodoMeta,
  TagRow,
  TagChip,
} from "./TodoStyles";
import { useTodos, type Todo } from "./hooks/useTodos";
import EmptyState from "../../ui/EmptyState";
import Checkbox from "../../ui/Checkbox";

export default function TodosPage() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
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
      <TodoHeading>Todos</TodoHeading>
      <TodoSubhead>Everything you want to get done — one list.</TodoSubhead>
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
      {todos.length === 0 ? (
        <div style={{ marginTop: 22 }}>
          <EmptyState
            icon="✓"
            accent="var(--grad-todo)"
            title="No todos yet"
            description="Add your first task above, or grab a ready-made idea from Todo Suggestions."
          />
        </div>
      ) : null}
      <TodoList>
        {todos.map((t: Todo, i: number) => (
          <TodoItem key={t.id} $i={i}>
            <Checkbox
              checked={t.completed}
              accent="var(--grad-todo)"
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
