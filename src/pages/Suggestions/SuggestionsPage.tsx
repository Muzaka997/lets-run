import { useSuggestions } from "./hooks/useSuggestions";
import {
  SuggestionsWrap,
  SuggestionsHeading,
  SuggestionsList,
  SuggestionsItem,
  SuggestionsDetails,
  SuggestionsTitle,
  SuggestionsMeta,
  TagRow,
  TagChip,
  SuggestionsButton,
} from "./SuggestionsStyles";

export default function SuggestionsPage() {
  const { suggestions, loading, error, addToMyTodos } = useSuggestions();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading suggestions</div>;

  return (
    <SuggestionsWrap>
      <SuggestionsHeading>Suggested Tasks</SuggestionsHeading>
      <SuggestionsList>
        {suggestions.map((s) => (
          <SuggestionsItem key={s.id}>
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
            <SuggestionsButton type="button" onClick={() => addToMyTodos(s.id)}>
              Add to My Tasks
            </SuggestionsButton>
          </SuggestionsItem>
        ))}
      </SuggestionsList>
    </SuggestionsWrap>
  );
}
