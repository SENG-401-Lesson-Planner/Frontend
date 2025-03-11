import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lesso" },
    { name: "description", content: "Welcome to Lesso!" },
  ];
}

export default function Home() {
  return (
    <div style={{ 
      backgroundImage: 'url(/app/assets/background.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw', 
    }}>
      <h1>Hello World</h1>
    </div>
  );
}
