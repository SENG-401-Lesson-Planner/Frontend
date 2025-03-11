import Logo from "~/components/logo";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lesso" },
    { name: "description", content: "Welcome to Lesso!" },
  ];
}

export default function Home() {
  return <Logo />;
}
