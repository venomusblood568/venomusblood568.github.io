import Header from "../components/header";
import HueIcon from "./project_icon/hueicon";
import NeuronIcon from "./project_icon/neuronicon";

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
      <hr className="w-24 border-t-2 border-white mx-auto" />
      <h1 className="text-8xl font-bold tracking-tight py-4 px-10 opacity-20 text-outline">
        Work in progress
      </h1>
      <div className="flex flex-wrap justify-center gap-2 px-12 py-6">
        <div className="max-w-sm p-6 m-2 px-10 rounded-2xl flex items-center gap-2 text-gray-500 hover:cursor-pointer hover:opacity-50 hover:bg-gray-600 hover:text-red transition duration-200">
          <div className="text-3xl m-2">
            <NeuronIcon />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white ">FINE</h2>
            <p className="text-sm text-white">
              Still cooking coming right up ....
            </p>
            <div className="mt-2 flex gap-4 text-sm text-white">
              <a
                href="your-gitlink-here"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; GitHub
              </a>
              <a
                href="your-link-here"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-8xl font-bold tracking-tight py-4 px-10 opacity-20 text-outline">
        Websites
      </h1>
      <div className="flex flex-wrap justify-center gap-2 px-12 py-6">
        {/* card 1*/}
        <div className="max-w-sm p-6 m-2 px-10 rounded-2xl flex items-center gap-2 text-gray-500 hover:cursor-pointer hover:opacity-50 hover:bg-gray-600 hover:text-white transition duration-200">
          <div className="text-3xl m-2">
            <NeuronIcon />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Neuron</h2>
            <p className="text-sm text-white">
              Space to store and organize thoughts, inspiration and knowledge.
            </p>
            <div className="mt-2 flex gap-4 text-sm text-white">
              <a
                href="your-gitlink-here"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; GitHub
              </a>
              <a
                href="your-link-here"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; Live Demo
              </a>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="max-w-sm p-6 m-2 px-10 rounded-2xl flex items-center gap-2 text-gray-500 hover:cursor-pointer hover:opacity-50 hover:bg-gray-600 hover:text-white transition duration-200">
          <div className="text-3xl m-2">
            <HueIcon />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Hue</h2>
            <p className="text-sm text-white">
              Mimicking Clone Ray to understand how Ray.so works under the hood.
            </p>
            <div className="mt-2 flex gap-4 text-sm text-white">
              <a
                href="your-gitlink-here"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; GitHub
              </a>
              <a
                href="your-link-here"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
