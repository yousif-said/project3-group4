import type { Route } from "./+types/results";
import { ResultsPage } from "../components/ResultsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Results" },
    { name: "description", content: "Home to React Router!" },
  ];
}

export default function ResultsRoute() {
  return <ResultsPage />;
}
