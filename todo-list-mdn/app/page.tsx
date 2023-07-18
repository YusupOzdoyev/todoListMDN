import App from "../components/_App"

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

export default function Home(props: any) {
  return (
    <div>
      <App tasks={DATA} />
    </div>
  );
}
