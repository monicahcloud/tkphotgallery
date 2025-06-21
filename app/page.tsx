import UploadImage from "./[dashboard]/page";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <UploadImage />
      </main>
    </>
  );
}
