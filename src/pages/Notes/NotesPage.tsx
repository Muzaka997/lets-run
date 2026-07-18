import { useState } from "react";
import {
  NotesWrap,
  NotesHeading,
  NotesSubhead,
  Composer,
  TitleInput,
  BodyInput,
  ComposerRow,
  AddButton,
  NotesGrid,
  NoteCard,
  NoteTitle,
  NoteBody,
  NoteFooter,
  NoteDate,
  NoteActions,
  IconButton,
  EditTitle,
  EditBody,
  EditActions,
  SaveButton,
  CancelButton,
  RecorderBar,
  RecordButton,
  RecTime,
  RecPreview,
  DiscardButton,
  RecError,
  NoteAudio,
} from "./NotesStyles";
import { useNotes, type Note } from "./hooks/useNotes";
import { useRecorder } from "./hooks/useRecorder";
import EmptyState from "../../ui/EmptyState";

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PinIcon = ({ filled }: { filled?: boolean }) => (
  <svg {...svg} fill={filled ? "currentColor" : "none"}>
    <path d="M9 4h6l-1 6 3 3H7l3-3-1-6ZM12 16v4" />
  </svg>
);
const EditIcon = () => (
  <svg {...svg}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
  </svg>
);
const TrashIcon = () => (
  <svg {...svg}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);
const MicIcon = () => (
  <svg {...svg}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />
  </svg>
);
const StopIcon = () => (
  <svg {...svg} fill="currentColor" stroke="none">
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
  </svg>
);

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtDuration(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function NotesPage() {
  const { notes, loading, error, addNote, updateNote, togglePin, deleteNote } =
    useNotes();
  const rec = useRecorder();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const canSubmit = !!title.trim() || !!body.trim() || !!rec.audioData;

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    await addNote(title, body, rec.audioData);
    setTitle("");
    setBody("");
    rec.reset();
  }

  function startEdit(n: Note) {
    setEditingId(n.id);
    setEditTitle(n.title);
    setEditBody(n.body);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditBody("");
  }

  async function saveEdit(id: string) {
    await updateNote(id, { title: editTitle.trim(), body: editBody.trim() });
    cancelEdit();
  }

  if (error) {
    return (
      <NotesWrap>
        <NotesHeading>Notes</NotesHeading>
        <NotesSubhead>Couldn't load your notes. Please try again.</NotesSubhead>
      </NotesWrap>
    );
  }

  return (
    <NotesWrap>
      <NotesHeading>Notes</NotesHeading>
      <NotesSubhead>Jot down anything you want to remember.</NotesSubhead>

      <Composer onSubmit={onAdd}>
        <TitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <BodyInput
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a note…"
        />
        <ComposerRow>
          <RecorderBar>
            {rec.status === "recording" ? (
              <RecordButton type="button" $recording onClick={rec.stop}>
                <StopIcon />
                <RecTime>{fmtDuration(rec.seconds)}</RecTime>
                Stop
              </RecordButton>
            ) : (
              <RecordButton type="button" onClick={rec.start}>
                <MicIcon />
                {rec.status === "recorded" ? "Re-record" : "Record"}
              </RecordButton>
            )}

            {rec.status === "recorded" && rec.audioData ? (
              <RecPreview>
                <audio controls src={rec.audioData} />
                <DiscardButton
                  type="button"
                  onClick={rec.reset}
                  aria-label="Discard recording"
                  title="Discard recording"
                >
                  <TrashIcon />
                </DiscardButton>
              </RecPreview>
            ) : null}

            {rec.error ? <RecError>{rec.error}</RecError> : null}
          </RecorderBar>

          <AddButton type="submit" disabled={!canSubmit}>
            Add note
          </AddButton>
        </ComposerRow>
      </Composer>

      {!loading && notes.length === 0 ? (
        <div style={{ marginTop: 22 }}>
          <EmptyState
            icon="🗒️"
            accent="var(--grad-notes)"
            title="No notes yet"
            description="Capture a thought, a list, or a reminder above — your notes will show up here."
          />
        </div>
      ) : null}

      <NotesGrid>
        {notes.map((n: Note, i: number) => (
          <NoteCard key={n.id} $i={i} $pinned={n.pinned}>
            {editingId === n.id ? (
              <>
                <EditTitle
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <EditBody
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  placeholder="Write a note…"
                />
                <EditActions>
                  <SaveButton type="button" onClick={() => saveEdit(n.id)}>
                    Save
                  </SaveButton>
                  <CancelButton type="button" onClick={cancelEdit}>
                    Cancel
                  </CancelButton>
                </EditActions>
              </>
            ) : (
              <>
                {n.title ? <NoteTitle>{n.title}</NoteTitle> : null}
                {n.body ? <NoteBody>{n.body}</NoteBody> : null}
                {n.audio ? <NoteAudio controls src={n.audio} /> : null}
                <NoteFooter>
                  <NoteDate>{formatDate(n.updatedAt)}</NoteDate>
                  <NoteActions>
                    <IconButton
                      type="button"
                      $active={n.pinned}
                      onClick={() => togglePin(n.id, n.pinned)}
                      aria-label={n.pinned ? "Unpin note" : "Pin note"}
                      title={n.pinned ? "Unpin" : "Pin"}
                    >
                      <PinIcon filled={n.pinned} />
                    </IconButton>
                    <IconButton
                      type="button"
                      onClick={() => startEdit(n)}
                      aria-label="Edit note"
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      type="button"
                      $danger
                      onClick={() => deleteNote(n.id)}
                      aria-label="Delete note"
                      title="Delete"
                    >
                      <TrashIcon />
                    </IconButton>
                  </NoteActions>
                </NoteFooter>
              </>
            )}
          </NoteCard>
        ))}
      </NotesGrid>
    </NotesWrap>
  );
}
