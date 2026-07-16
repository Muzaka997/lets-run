import { useSuggestions } from "./hooks/useSuggestions";
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

export default function SuggestionsPage() {
  const { suggestions, loading, error, addToMyTodos } = useSuggestions();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading suggestions</div>;

  return (
    <SuggestionsWrap>
      <SuggestionsHeading>Suggested Tasks</SuggestionsHeading>
      <SuggestionsSubhead>
        Handpicked ideas — add any of them to your todos in one tap.
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
            <SuggestionsButton type="button" onClick={() => addToMyTodos(s.id)}>
              Add to My Tasks
            </SuggestionsButton>
          </SuggestionsItem>
        ))}
      </SuggestionsList>
    </SuggestionsWrap>
  );
}
