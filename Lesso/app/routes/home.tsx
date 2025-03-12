import SideBoarder from "~/components/side-boarder";
import LoginButton from "~/components/login-button";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lesso" },
    { name: "description", content: "Welcome to Lesso!" },
  ];
}

export default function Home() {
  return (
  <div>
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      <LoginButton />
    </div>
    <div>
      <SideBoarder />
    </div>
  </div>
  )
}
