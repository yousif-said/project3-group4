import type { Route } from "./+types/results";
import { ResultsPage } from "../components/ResultsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Star Wars Prediction Results" },
    { name: "description", content: "Results for Starwars Prediction!" },
  ];
}

export default function ResultsRoute() {
  return <ResultsPage />;
}
