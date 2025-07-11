
import Navbar from "./NavBar";
import PredictionResults from "./PredictionResults";

export function ResultsPage() {
    return (
      <main className="flex items-center justify-center pb-4">
        <div className="min-h-screen bg-gray-100 w-full">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <PredictionResults />
            </div>
            
        </div>
      </main>
    );
}
  