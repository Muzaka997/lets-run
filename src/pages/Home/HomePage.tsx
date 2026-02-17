export default function HomePage() {
  return (
    <div>
      <h1 style={{ margin: 0, fontSize: 22 }}>Welcome to My App</h1>
      <p style={{ color: "#4b5563", marginTop: 8 }}>
        This is a simple learning app demonstrating authentication and GraphQL.
        Use the sidebar to navigate between your Todos and Not Todos.
      </p>
      <ul style={{ marginTop: 12, color: "#374151" }}>
        <li>Secure login and signup</li>
        <li>Manage your todo list</li>
        <li>Track things you do not want to do</li>
      </ul>
    </div>
  );
}
