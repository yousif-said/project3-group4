import Navbar from "./NavBar";
import InputForm from "./InputForm";
import FeatureImportanceChart from "./FeatureImportanceChart";

export function Home() {
  return (
    <main className="flex items-center justify-center pl-4 pr-4 pb-4">
      <div className="min-h-screen bg-gray-100 w-full">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <InputForm />
        </div>
      </div>
    </main>
  );
}

