import type { Route } from "./+types/features";
import { FeaturePage } from "~/components/FeatureImportancePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Star Wars Prediction App" },
    { name: "description", content: "App to predict if someone is a rebel or empire!" },
  ];
}

export default function Homepage() {
  return <FeaturePage />;
}
