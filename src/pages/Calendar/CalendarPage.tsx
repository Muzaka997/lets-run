import { useMemo, useState } from "react";
import {
  CalWrap,
  CalHeading,
  CalCard,
  Row,
  Input,
  Select,
  Button,
  DangerButton,
  List,
  Item,
  Title,
  Meta,
  EventDetails,
  KindBadge,
  ErrorText,
} from "./CalendarStyles";
import { useCalendar } from "./hooks/useCalendar";

function startOfWeek(d: Date) {
  const date = new Date(d);
  const day = date.getDay(); // 0 Sun .. 6 Sat
  const diff = (day + 6) % 7; // make Monday start
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function endOfWeek(d: Date) {
  const s = startOfWeek(d);
  const e = new Date(s);
  e.setDate(s.getDate() + 7);
  e.setHours(23, 59, 59, 999);
  return e;
}

function toLocalInput(dt: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
}

export default function CalendarPage() {
  const [anchor, setAnchor] = useState(() => new Date());
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(() => toLocalInput(new Date()));
  const [end, setEnd] = useState(() =>
    toLocalInput(new Date(Date.now() + 60 * 60 * 1000)),
  );
  const [kind, setKind] = useState<"TODO" | "NOT_TODO">("TODO");
  const [notes, setNotes] = useState("");

  const range = useMemo(() => {
    const s = startOfWeek(anchor);
    const e = endOfWeek(anchor);
    return { timeMin: s.toISOString(), timeMax: e.toISOString() };
  }, [anchor]);

  const { events, loading, error, addEvent, deleteEvent } = useCalendar(range);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const s = new Date(start);
    const en = new Date(end);
    if (Number.isNaN(s.getTime()) || Number.isNaN(en.getTime())) return;
    await addEvent({
      title: title.trim(),
      start: s.toISOString(),
      end: en.toISOString(),
      kind,
      notes,
    });
    setTitle("");
    setNotes("");
  }

  return (
    <CalWrap>
      <CalHeading>My Week</CalHeading>
      <CalCard>
        <Row>
          <label>
            Week of
            <Input
              type="date"
              value={toLocalInput(startOfWeek(anchor)).slice(0, 10)}
              onChange={(e) => {
                const d = new Date(e.target.value);
                if (!Number.isNaN(d.getTime())) setAnchor(d);
              }}
              style={{ marginLeft: 8 }}
            />
          </label>
        </Row>
      </CalCard>

      <CalCard as="form" onSubmit={onAdd}>
        <Row>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <Input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <Select
            value={kind}
            onChange={(e) => setKind(e.target.value as "TODO" | "NOT_TODO")}
          >
            <option value="TODO">Todo</option>
            <option value="NOT_TODO">Not-Todo</option>
          </Select>
          <Input
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </Row>
      </CalCard>

      <CalCard>
        {loading ? (
          <div>Loading events…</div>
        ) : error ? (
          <ErrorText>Error loading events</ErrorText>
        ) : (
          <List>
            {events.map((ev) => (
              <Item key={ev.id}>
                <EventDetails>
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <Title>{ev.title}</Title>
                    <KindBadge $kind={ev.kind}>
                      {ev.kind === "NOT_TODO" ? "Not-Todo" : "Todo"}
                    </KindBadge>
                  </div>
                  <Meta>
                    {fmt(ev.start)} — {fmt(ev.end)}
                  </Meta>
                  {ev.notes ? (
                    <div style={{ fontSize: 12, marginTop: 4 }}>{ev.notes}</div>
                  ) : null}
                </EventDetails>
                <DangerButton type="button" onClick={() => deleteEvent(ev.id)}>
                  Delete
                </DangerButton>
              </Item>
            ))}
          </List>
        )}
      </CalCard>
    </CalWrap>
  );
}
