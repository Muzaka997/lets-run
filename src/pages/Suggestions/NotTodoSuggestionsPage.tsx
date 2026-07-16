import { useNotTodoSuggestions } from "./hooks/useNotTodoSuggestions";
import {
  SuggestionsWrap,
  SuggestionsHeading,
  SuggestionsSubhead,
  SuggestionsList,
  SuggestionsItem,
  SuggestionsDetails,
  SuggestionsTitle,
  SuggestionsMeta,
  TagRow,
  TagChip,
  SuggestionsButton,
} from "./SuggestionsStyles";

export default function NotTodoSuggestionsPage() {
  const { suggestions, loading, error, addToMyNotTodos } =
    useNotTodoSuggestions();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading suggestions</div>;

  return (
    <SuggestionsWrap>
      <SuggestionsHeading>Suggested Not-Todos</SuggestionsHeading>
      <SuggestionsSubhead>
        Habits worth dropping — add any of them to your not-todos in one tap.
      </SuggestionsSubhead>
      <SuggestionsList>
        {suggestions.map((s, i) => (
          <SuggestionsItem key={s.id} $i={i}>
            <SuggestionsDetails>
              <SuggestionsTitle>{s.title}</SuggestionsTitle>
              <SuggestionsMeta>
                {s.category} • {s.estimatedMinutes} min
              </SuggestionsMeta>
              {s.tags?.length ? (
                <TagRow>
                  {s.tags.map((t) => (
                    <TagChip key={t}>#{t}</TagChip>
                  ))}
                </TagRow>
              ) : null}
            </SuggestionsDetails>
            <SuggestionsButton
              type="button"
              onClick={() => addToMyNotTodos(s.id)}
            >
              Add to My Not-Todos
            </SuggestionsButton>
          </SuggestionsItem>
        ))}
      </SuggestionsList>
    </SuggestionsWrap>
  );
}
