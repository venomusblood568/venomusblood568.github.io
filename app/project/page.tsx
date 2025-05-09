import Header from "../components/header";

export default function Project() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 pt-20 pb-10 gap-4">
        <h1 className="text-6xl font-bold tracking-tight py-10 px-10 opacity-40">
          Project Showcase
        </h1>
        <p className="text-xl text-gray-300">
          A collection of my favorite projects — Each build reflects a moment of
          learning, exploration, and the joy of bringing ideas to life.
        </p>
      </div>
      <h1 className="text-8xl font-bold tracking-tight py-10 px-10 opacity-20 text-outline">
        Work in progress
      </h1>
    </div>
  );
}
