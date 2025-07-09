
import Navbar from "./NavBar";
import FeatureImportanceChart from "./FeatureImportanceChart";

export function FeaturePage() {
    return (
      <main className="flex items-center justify-center pl-4 pr-4 pb-4">
      <div className="min-h-screen bg-gray-100 w-full">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <FeatureImportanceChart />
        </div>

      </div>
    </main>
    );
}
  