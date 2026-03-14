import { gql, useMutation, useQuery } from "@apollo/client";

export type CalEvent = {
  id: string;
  title: string;
  start: string; // ISO
  end: string; // ISO
  kind: "TODO" | "NOT_TODO";
  notes?: string | null;
};

const EVENTS = gql`
  query Events($timeMin: String!, $timeMax: String!) {
    events(timeMin: $timeMin, timeMax: $timeMax) {
      id
      title
      start
      end
      kind
      notes
    }
  }
`;

const ADD_EVENT = gql`
  mutation AddEvent(
    $title: String!
    $start: String!
    $end: String!
    $kind: EventKind!
    $notes: String
  ) {
    addEvent(
      title: $title
      start: $start
      end: $end
      kind: $kind
      notes: $notes
    ) {
      id
      title
      start
      end
      kind
      notes
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String
    $start: String
    $end: String
    $kind: EventKind
    $notes: String
  ) {
    updateEvent(
      id: $id
      title: $title
      start: $start
      end: $end
      kind: $kind
      notes: $notes
    ) {
      id
      title
      start
      end
      kind
      notes
    }
  }
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export function useCalendar(range: { timeMin: string; timeMax: string }) {
  const { data, loading, error, refetch } = useQuery<{ events: CalEvent[] }>(
    EVENTS,
    { variables: range },
  );

  const [addEventMutation] = useMutation<
    { addEvent: CalEvent },
    Omit<CalEvent, "id">
  >(ADD_EVENT, {
    // Keep UI snappy: inject the new event into the current cache immediately
    update(cache, { data }) {
      const created = data?.addEvent;
      if (!created) return;
      cache.updateQuery<{ events: CalEvent[] }>(
        { query: EVENTS, variables: range },
        (prev) => (prev ? { events: [created, ...prev.events] } : prev),
      );
    },
  });

  const [updateEventMutation] = useMutation<
    { updateEvent: CalEvent },
    { id: string } & Partial<Omit<CalEvent, "id">>
  >(UPDATE_EVENT, {
    update(cache, { data }) {
      const updated = data?.updateEvent;
      if (!updated) return;
      cache.updateQuery<{ events: CalEvent[] }>(
        { query: EVENTS, variables: range },
        (prev) =>
          prev
            ? {
                events: prev.events.map((e) =>
                  e.id === updated.id ? { ...e, ...updated } : e,
                ),
              }
            : prev,
      );
    },
  });

  const [deleteEventMutation] = useMutation<
    { deleteEvent: boolean },
    { id: string }
  >(DELETE_EVENT, {
    update(cache, _result, { variables }) {
      if (!variables?.id) return;
      cache.updateQuery<{ events: CalEvent[] }>(
        { query: EVENTS, variables: range },
        (prev) =>
          prev
            ? { events: prev.events.filter((e) => e.id !== variables.id) }
            : prev,
      );
    },
  });

  async function addEvent(e: Omit<CalEvent, "id">) {
    await addEventMutation({
      variables: e,
      optimisticResponse: {
        addEvent: {
          id: `temp-${Date.now()}`,
          ...e,
        },
      },
    });
    // Still refetch to reconcile server truth (IDs, ordering)
    await refetch();
  }

  async function updateEvent(id: string, patch: Partial<Omit<CalEvent, "id">>) {
    await updateEventMutation({
      variables: { id, ...patch },
      optimisticResponse: {
        updateEvent: {
          id,
          title: patch.title ?? "",
          start: patch.start ?? "",
          end: patch.end ?? "",
          kind: (patch.kind as CalEvent["kind"]) ?? "TODO",
          notes: patch.notes ?? null,
        },
      },
    });
    await refetch();
  }

  async function deleteEvent(id: string) {
    await deleteEventMutation({
      variables: { id },
      optimisticResponse: { deleteEvent: true },
    });
    await refetch();
  }

  return {
    events: data?.events ?? [],
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    refetch,
  };
}
