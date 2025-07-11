import type { Route } from "./+types/home";
import { Home } from "../components/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Star Wars Prediction App" },
    { name: "description", content: "App to predict if someone is a rebel or empire!" },
  ];
}

export default function Homepage() {
  return <Home />;
}
