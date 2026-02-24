import { gql, useQuery, useMutation } from "@apollo/client";

export type Suggestion = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  estimatedMinutes: number;
};

const GET_SUGGESTIONS = gql`
  query GetSuggestions($category: String, $limit: Int) {
    notTodoSuggestions(category: $category, limit: $limit) {
      id
      title
      category
      tags
      estimatedMinutes
    }
  }
`;

const ADD_SUGGESTION_TO_TASKS = gql`
  mutation AddSuggestionToTasks($suggestionId: ID!, $type: TaskType!) {
    addSuggestionToTasks(suggestionId: $suggestionId, type: $type) {
      id
      title
      completed
      type
    }
  }
`;

// mirror of the NotTodos hook query for cache refetch after mutation
const GET_TASKS = gql`
  query GetTasks($type: TaskType!) {
    tasks(type: $type) {
      id
      title
      completed
      type
    }
  }
`;

export function useNotTodoSuggestions(category?: string, limit?: number) {
  const { data, loading, error } = useQuery<{
    notTodoSuggestions: Suggestion[];
  }>(GET_SUGGESTIONS, {
    variables: { category: category ?? null, limit: limit ?? null },
  });

  const [addSuggestionToTasks] = useMutation<
    { addSuggestionToTasks: { id: string; title: string; completed: boolean } },
    { suggestionId: string; type: "TODO" | "NOT_TODO" }
  >(ADD_SUGGESTION_TO_TASKS);

  async function addToMyNotTodos(suggestionId: string) {
    await addSuggestionToTasks({
      variables: { suggestionId, type: "NOT_TODO" },
      refetchQueries: [{ query: GET_TASKS, variables: { type: "NOT_TODO" } }],
    });
  }

  return {
    suggestions: data?.notTodoSuggestions ?? [],
    loading,
    error,
    addToMyNotTodos,
  };
}
