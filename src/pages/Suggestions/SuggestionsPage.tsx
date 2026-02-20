import { useSuggestions } from "./hooks/useSuggestions";

export default function SuggestionsPage() {
  const { suggestions, loading, error, addToMyTodos } = useSuggestions();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading suggestions</div>;

  return (
    <div>
      <h2>Suggested Tasks</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {suggestions.map((s) => (
          <li key={s.id} style={{ margin: "8px 0", display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{s.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {s.category} • {s.estimatedMinutes} min
              </div>
              {s.tags?.length ? (
                <div style={{ marginTop: 4, fontSize: 12 }}>
                  {s.tags.map((t) => (
                    <span key={t} style={{ marginRight: 6, opacity: 0.8 }}>
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <button type="button" onClick={() => addToMyTodos(s.id)}>
              Add to My Tasks
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
