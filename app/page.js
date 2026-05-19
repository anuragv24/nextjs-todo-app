import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoStats from "@/components/TodoStats";



export default function Home() {
  return (
    <div className="min-h-screen flex  justify-center items-center">
      <main className="w-full max-w-2xl border border-white/10 rounded-2xl shadow-2xl  p-2  space-y-6" >
        <div className="text-center">
          <h1>Todo-APP</h1>
        </div>
        
        <TodoStats />

        <div className="border border-white/50 rounded-2xl shadow-2xl  p-6 space-y-5">
          <TodoForm />
          <TodoList />
        </div> 
        
      </main>
    </div>
  );
}
