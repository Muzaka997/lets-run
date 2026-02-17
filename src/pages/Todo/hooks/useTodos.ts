import { gql, type ApolloCache, useMutation, useQuery } from "@apollo/client";

export type Todo = { id: string; title: string; completed: boolean };

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation Toggle($id: ID!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation Delete($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export function useTodos() {
  const { data, loading, error } = useQuery<{ todos: Todo[] }>(GET_TODOS);

  const [addTodoMutation] = useMutation<{ addTodo: Todo }, { title: string }>(
    ADD_TODO,
    {
      update(cache: ApolloCache<unknown>, { data }) {
        if (!data?.addTodo) return;
        const existing = cache.readQuery<{ todos: Todo[] }>({
          query: GET_TODOS,
        });
        if (existing?.todos) {
          cache.writeQuery<{ todos: Todo[] }>({
            query: GET_TODOS,
            data: { todos: [data.addTodo, ...existing.todos] },
          });
        }
      },
    },
  );

  const [toggleTodoMutation] = useMutation<
    { toggleTodo: Pick<Todo, "id" | "completed"> },
    { id: string }
  >(TOGGLE_TODO);

  const [deleteTodoMutation] = useMutation<
    { deleteTodo: boolean },
    { id: string }
  >(DELETE_TODO, {
    update(cache: ApolloCache<unknown>, _result, { variables }) {
      if (!variables?.id) return;
      const existing = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS });
      if (existing?.todos) {
        cache.writeQuery<{ todos: Todo[] }>({
          query: GET_TODOS,
          data: { todos: existing.todos.filter((t) => t.id !== variables.id) },
        });
      }
    },
  });

  async function addTodo(title: string) {
    const trimmed = title.trim();
    if (!trimmed) return;
    await addTodoMutation({
      variables: { title: trimmed },
      optimisticResponse: {
        addTodo: {
          id: Math.random().toString(36),
          title: trimmed,
          completed: false,
        },
      },
    });
  }

  async function toggleTodo(id: string, currentCompleted: boolean) {
    await toggleTodoMutation({
      variables: { id },
      optimisticResponse: { toggleTodo: { id, completed: !currentCompleted } },
    });
  }

  async function deleteTodo(id: string) {
    await deleteTodoMutation({ variables: { id } });
  }

  return {
    todos: data?.todos ?? [],
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
