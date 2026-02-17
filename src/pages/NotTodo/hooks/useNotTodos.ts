import { gql, type ApolloCache, useMutation, useQuery } from "@apollo/client";

export type NotTodo = { id: string; title: string; completed: boolean };

const GET_NOT_TODOS = gql`
  query GetNotTodos {
    notTodos {
      id
      title
      completed
    }
  }
`;

const ADD_NOT_TODO = gql`
  mutation AddNotTodo($title: String!) {
    addNotTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const TOGGLE_NOT_TODO = gql`
  mutation ToggleNotTodo($id: ID!) {
    toggleNotTodo(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_NOT_TODO = gql`
  mutation DeleteNotTodo($id: ID!) {
    deleteNotTodo(id: $id)
  }
`;

export function useNotTodos() {
  const { data, loading, error } = useQuery<{ notTodos: NotTodo[] }>(
    GET_NOT_TODOS,
  );

  const [addMutation] = useMutation<{ addNotTodo: NotTodo }, { title: string }>(
    ADD_NOT_TODO,
    {
      update(cache: ApolloCache<unknown>, { data }) {
        if (!data?.addNotTodo) return;
        const existing = cache.readQuery<{ notTodos: NotTodo[] }>({
          query: GET_NOT_TODOS,
        });
        if (existing?.notTodos) {
          cache.writeQuery<{ notTodos: NotTodo[] }>({
            query: GET_NOT_TODOS,
            data: { notTodos: [data.addNotTodo, ...existing.notTodos] },
          });
        }
      },
    },
  );

  const [toggleMutation] = useMutation<
    { toggleNotTodo: Pick<NotTodo, "id" | "completed"> },
    { id: string }
  >(TOGGLE_NOT_TODO);

  const [deleteMutation] = useMutation<
    { deleteNotTodo: boolean },
    { id: string }
  >(DELETE_NOT_TODO, {
    update(cache: ApolloCache<unknown>, _result, { variables }) {
      if (!variables?.id) return;
      const existing = cache.readQuery<{ notTodos: NotTodo[] }>({
        query: GET_NOT_TODOS,
      });
      if (existing?.notTodos) {
        cache.writeQuery<{ notTodos: NotTodo[] }>({
          query: GET_NOT_TODOS,
          data: {
            notTodos: existing.notTodos.filter((t) => t.id !== variables.id),
          },
        });
      }
    },
  });

  async function addNotTodo(title: string) {
    const trimmed = title.trim();
    if (!trimmed) return;
    await addMutation({
      variables: { title: trimmed },
      optimisticResponse: {
        addNotTodo: {
          id: Math.random().toString(36),
          title: trimmed,
          completed: false,
        },
      },
    });
  }

  async function toggleNotTodo(id: string, currentCompleted: boolean) {
    await toggleMutation({
      variables: { id },
      optimisticResponse: {
        toggleNotTodo: { id, completed: !currentCompleted },
      },
    });
  }

  async function deleteNotTodo(id: string) {
    await deleteMutation({ variables: { id } });
  }

  return {
    notTodos: data?.notTodos ?? [],
    loading,
    error,
    addNotTodo,
    toggleNotTodo,
    deleteNotTodo,
  };
}
