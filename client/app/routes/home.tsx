import type { Route } from "./+types/home";
import { Home } from "../components/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Home to React Router!" },
  ];
}

export default function Homepage() {
  return <Home />;
}
