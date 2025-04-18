import Header from "../components/header";

export default function Blog() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">BLOG PAGE</h1>
          <h5 className="text-lg mt-2">
            Still cookin&apos;... ladies and gentlemen 🍳🔥
          </h5>
        </div>
      </div>
    </div>
  );
}
