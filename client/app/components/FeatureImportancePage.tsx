
import Navbar from "./NavBar";
import FeatureImportanceChart from "./FeatureImportanceChart";

export function FeaturePage() {
    return (
      <main className="flex items-center justify-center pl-4 pr-4 pb-4">
        <div className="flex flex-col bg-gray-100 w-full h-full">
        <Navbar />
        <div className="container flex-grow mx-auto px-4 py-8 h-400">
          <FeatureImportanceChart />
        </div>

      </div>
    </main>
    );
}
  