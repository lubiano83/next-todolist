import TextoInicio from "./components/TextoInicio";
import TodoList from "./components/todos/TodoList";
import { cookies } from 'next/headers';

export default async function Home() {

  const cookieStore = await cookies();
  const cookie = cookieStore.get(process.env.COOKIE_NAME)?.value;

  return (
    <div className="flex justify-center items-center">
      { cookie ? <TodoList /> : <TextoInicio /> }
    </div>
  );
}
