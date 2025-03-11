import Logo from "~/components/logo";
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
    <div>
      <Logo />
    </div>
    <div>
      <LoginButton />
    </div>
  </div>
  )
}
