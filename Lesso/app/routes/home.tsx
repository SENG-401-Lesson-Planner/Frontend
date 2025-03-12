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
    <div>
      <img src="app/assets/backgroundfigurines2.png" alt="Background Figurine 2" className="responsive-img img1" />
      <img src="app/assets/backgroundfigurines1.png" alt="Background Figurine 1" className="responsive-img img2" />
    </div>
    <style >{`
      .responsive-img {
        position: absolute;
        width: 30%;
        height: auto;
      }
      .img1 {
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .img2 {
        top: 65%;
        left: 70%;
        transform: translate(-50%, -50%);
      }
      @media (max-width: 640px) {
        .responsive-img {
          width: 50%;
        }
        .img1 {
          top: 50%;
          left: 35%;
        }
        .img2 {
          top: 75%;
          left: 65%;
        }
      }
      @media (max-width: 480px) {
        .responsive-img {
          width: 70%;
        }
        .img1 {
          top: 50%;
        }
        .img2 {
          top: 75%;
        }
      }
    `}</style>
  </div>
  )
}
