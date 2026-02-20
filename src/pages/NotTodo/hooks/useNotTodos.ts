import { gql, type ApolloCache, useMutation, useQuery } from "@apollo/client";

export type NotTodo = { id: string; title: string; completed: boolean };

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

const ADD_TASK = gql`
  mutation AddTask($title: String!, $type: TaskType!) {
    addTask(title: $title, type: $type) {
      id
      title
      completed
      type
    }
  }
`;

const TOGGLE_TASK = gql`
  mutation Toggle($id: ID!) {
    toggleTask(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation Delete($id: ID!) {
    deleteTask(id: $id)
  }
`;

export function useNotTodos() {
  const variables = { type: "NOT_TODO" as const };
  const { data, loading, error } = useQuery<{ tasks: NotTodo[] }>(GET_TASKS, {
    variables,
  });

  const [addMutation] = useMutation<
    { addTask: NotTodo },
    { title: string; type: "NOT_TODO" }
  >(ADD_TASK, {
    update(cache: ApolloCache<unknown>, { data }) {
      if (!data?.addTask) return;
      const existing = cache.readQuery<{ tasks: NotTodo[] }>({
        query: GET_TASKS,
        variables,
      });
      if (existing?.tasks) {
        cache.writeQuery<{ tasks: NotTodo[] }>({
          query: GET_TASKS,
          variables,
          data: { tasks: [data.addTask, ...existing.tasks] },
        });
      }
    },
  });

  const [toggleMutation] = useMutation<
    { toggleTask: Pick<NotTodo, "id" | "completed"> },
    { id: string }
  >(TOGGLE_TASK);

  const [deleteMutation] = useMutation<{ deleteTask: boolean }, { id: string }>(
    DELETE_TASK,
    {
      update(cache: ApolloCache<unknown>, _result, { variables }) {
        if (!variables?.id) return;
        const existing = cache.readQuery<{ tasks: NotTodo[] }>({
          query: GET_TASKS,
          variables,
        });
        if (existing?.tasks) {
          cache.writeQuery<{ tasks: NotTodo[] }>({
            query: GET_TASKS,
            variables,
            data: {
              tasks: existing.tasks.filter((t) => t.id !== variables.id),
            },
          });
        }
      },
    },
  );

  async function addNotTodo(title: string) {
    const trimmed = title.trim();
    if (!trimmed) return;
    await addMutation({
      variables: { title: trimmed, type: "NOT_TODO" },
      optimisticResponse: {
        addTask: {
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
      optimisticResponse: { toggleTask: { id, completed: !currentCompleted } },
    });
  }

  async function deleteNotTodo(id: string) {
    await deleteMutation({ variables: { id } });
  }

  return {
    notTodos: data?.tasks ?? [],
    loading,
    error,
    addNotTodo,
    toggleNotTodo,
    deleteNotTodo,
  };
}
