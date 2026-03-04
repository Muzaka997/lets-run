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

  const [addEventMutation] = useMutation<{ addEvent: CalEvent }>(ADD_EVENT);
  const [updateEventMutation] = useMutation<{ updateEvent: CalEvent }>(
    UPDATE_EVENT,
  );
  const [deleteEventMutation] = useMutation<{ deleteEvent: boolean }>(
    DELETE_EVENT,
  );

  async function addEvent(e: Omit<CalEvent, "id">) {
    await addEventMutation({
      variables: e,
    });
    await refetch();
  }

  async function updateEvent(id: string, patch: Partial<Omit<CalEvent, "id">>) {
    await updateEventMutation({ variables: { id, ...patch } });
    await refetch();
  }

  async function deleteEvent(id: string) {
    await deleteEventMutation({ variables: { id } });
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
