import { gql, type ApolloCache, useMutation, useQuery } from "@apollo/client";

export type Note = {
  id: string;
  title: string;
  body: string;
  audio: string | null;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      body
      audio
      pinned
      createdAt
      updatedAt
    }
  }
`;

const ADD_NOTE = gql`
  mutation AddNote($title: String, $body: String, $audio: String) {
    addNote(title: $title, body: $body, audio: $audio) {
      id
      title
      body
      audio
      pinned
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote(
    $id: ID!
    $title: String
    $body: String
    $audio: String
    $pinned: Boolean
  ) {
    updateNote(
      id: $id
      title: $title
      body: $body
      audio: $audio
      pinned: $pinned
    ) {
      id
      title
      body
      audio
      pinned
      createdAt
      updatedAt
    }
  }
`;

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

export function useNotes() {
  const { data, loading, error, refetch } = useQuery<{ notes: Note[] }>(
    GET_NOTES,
  );

  const [addNoteMutation] = useMutation<
    { addNote: Note },
    { title?: string | null; body?: string | null; audio?: string | null }
  >(ADD_NOTE, {
    update(cache: ApolloCache<unknown>, { data }) {
      if (!data?.addNote) return;
      const existing = cache.readQuery<{ notes: Note[] }>({ query: GET_NOTES });
      if (existing?.notes) {
        cache.writeQuery<{ notes: Note[] }>({
          query: GET_NOTES,
          data: { notes: [data.addNote, ...existing.notes] },
        });
      }
    },
  });

  const [updateNoteMutation] = useMutation<
    { updateNote: Note },
    {
      id: string;
      title?: string | null;
      body?: string | null;
      audio?: string | null;
      pinned?: boolean;
    }
  >(UPDATE_NOTE);

  const [deleteNoteMutation] = useMutation<
    { deleteNote: boolean },
    { id: string }
  >(DELETE_NOTE, {
    update(cache: ApolloCache<unknown>, _result, { variables }) {
      if (!variables?.id) return;
      const existing = cache.readQuery<{ notes: Note[] }>({ query: GET_NOTES });
      if (existing?.notes) {
        cache.writeQuery<{ notes: Note[] }>({
          query: GET_NOTES,
          data: { notes: existing.notes.filter((n) => n.id !== variables.id) },
        });
      }
    },
  });

  async function addNote(title: string, body: string, audio?: string | null) {
    const t = title.trim();
    const b = body.trim();
    if (!t && !b && !audio) return;
    await addNoteMutation({ variables: { title: t, body: b, audio: audio ?? null } });
  }

  async function updateNote(
    id: string,
    patch: { title?: string; body?: string; audio?: string | null; pinned?: boolean },
  ) {
    await updateNoteMutation({ variables: { id, ...patch } });
    // Server orders by pinned + updatedAt, so re-fetch to reflect reordering.
    await refetch();
  }

  async function togglePin(id: string, currentPinned: boolean) {
    await updateNote(id, { pinned: !currentPinned });
  }

  async function deleteNote(id: string) {
    await deleteNoteMutation({
      variables: { id },
      optimisticResponse: { deleteNote: true },
    });
  }

  return {
    notes: data?.notes ?? [],
    loading,
    error,
    addNote,
    updateNote,
    togglePin,
    deleteNote,
  };
}
