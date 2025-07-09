import Navbar from "./NavBar";
import InputForm from "./InputForm";

export function Home() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <InputForm />
        </div>
      </div>
    </main>
  );
}

