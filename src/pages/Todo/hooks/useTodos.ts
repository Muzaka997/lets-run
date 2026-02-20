import { gql, type ApolloCache, useMutation, useQuery } from "@apollo/client";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  estimatedMinutes: number;
  tags: string[];
  category: string;
  type: "TODO" | "NOT_TODO";
};

const GET_TASKS = gql`
  query GetTasks($type: TaskType!) {
    tasks(type: $type) {
      id
      title
      completed
      estimatedMinutes
      tags
      category
      type
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask(
    $title: String!
    $type: TaskType!
    $category: String
    $estimatedMinutes: Int
    $tags: [String!]
  ) {
    addTask(
      title: $title
      type: $type
      category: $category
      estimatedMinutes: $estimatedMinutes
      tags: $tags
    ) {
      id
      title
      completed
      estimatedMinutes
      tags
      category
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

export function useTodos() {
  const listVars = { type: "TODO" as const };
  const { data, loading, error } = useQuery<{ tasks: Todo[] }>(GET_TASKS, {
    variables: listVars,
  });

  const [addTaskMutation] = useMutation<
    { addTask: Todo },
    {
      title: string;
      type: "TODO";
      category?: string | null;
      estimatedMinutes?: number | null;
      tags?: string[] | null;
    }
  >(ADD_TASK, {
    update(cache: ApolloCache<unknown>, { data }) {
      if (!data?.addTask) return;
      const existing = cache.readQuery<{ tasks: Todo[] }>({
        query: GET_TASKS,
        variables: listVars,
      });
      if (existing?.tasks) {
        cache.writeQuery<{ tasks: Todo[] }>({
          query: GET_TASKS,
          variables: listVars,
          data: { tasks: [data.addTask, ...existing.tasks] },
        });
      }
    },
  });

  const [toggleTaskMutation] = useMutation<
    { toggleTask: Pick<Todo, "id" | "completed"> },
    { id: string }
  >(TOGGLE_TASK);

  const [deleteTaskMutation] = useMutation<
    { deleteTask: boolean },
    { id: string }
  >(DELETE_TASK, {
    update(cache: ApolloCache<unknown>, _result, { variables }) {
      if (!variables?.id) return;
      const existing = cache.readQuery<{ tasks: Todo[] }>({
        query: GET_TASKS,
        variables: listVars,
      });
      if (existing?.tasks) {
        cache.writeQuery<{ tasks: Todo[] }>({
          query: GET_TASKS,
          variables: listVars,
          data: {
            tasks: existing.tasks.filter((t) => t.id !== variables.id),
          },
        });
      }
    },
  });

  async function addTodo(
    title: string,
    options?: { category?: string; estimatedMinutes?: number; tags?: string[] },
  ) {
    const trimmed = title.trim();
    if (!trimmed) return;
    await addTaskMutation({
      variables: {
        title: trimmed,
        type: "TODO",
        category: options?.category ?? null,
        estimatedMinutes: options?.estimatedMinutes ?? null,
        tags: options?.tags ?? null,
      },
      optimisticResponse: {
        addTask: {
          id: Math.random().toString(36),
          title: trimmed,
          completed: false,
          estimatedMinutes: 0,
          tags: options?.tags ?? [],
          category: options?.category ?? "General",
          type: "TODO",
        },
      },
    });
  }

  async function toggleTodo(id: string, currentCompleted: boolean) {
    await toggleTaskMutation({
      variables: { id },
      optimisticResponse: { toggleTask: { id, completed: !currentCompleted } },
    });
  }

  async function deleteTodo(id: string) {
    await deleteTaskMutation({
      variables: { id },
      optimisticResponse: { deleteTask: true },
    });
  }

  return {
    todos: data?.tasks ?? [],
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
