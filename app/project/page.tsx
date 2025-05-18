import Header from "../components/header";

export default function Project() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 pt-30 pb-10 gap-4">
        <h1 className="text-6xl font-bold tracking-tight opacity-80">
          Projects
        </h1>
        <p className="text-xl text-gray-300">
          A collection of projects I&apos;sve created or currently maintain.
        </p>
        <hr className="w-24 border-t-2 border-gray-600" />
      </div>

      <h1 className="text-8xl font-bold tracking-tight py-4 px-10 opacity-20 text-outline">
        Work in progress
      </h1>
      <div className="flex flex-wrap justify-center gap-2 px-12 py-6">
        {/* 1st card */}
        <div className="max-w-sm p-6 m-2 px-10 rounded-2xl flex items-center gap-2 text-gray-300 hover:cursor-pointer hover:opacity-50 hover:bg-gray-600 hover:text-white transition duration-200">
          <div>
            <h2 className="text-xl font-semibold">Fine</h2>
            <p className="text-sm">Cooking something cool.....</p>
            <div className="mt-2 flex gap-4 text-sm">
              <a
                href="sss"
                className="hover:underline hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; GitHub
              </a>
              <a
                href="sss"
                className="hover:underline hover:scale-105"
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
        <div className="max-w-sm p-6 m-2 px-10 rounded-2xl flex items-center gap-2 text-gray-300 hover:cursor-pointer hover:opacity-50 hover:bg-gray-600 hover:text-white transition duration-200">
          <div>
            <h2 className="text-xl font-semibold">Neuron</h2>
            <p className="text-sm">
              Space to store and organize thoughts, inspiration and knowledge.
            </p>
            <div className="mt-2 flex gap-4 text-sm">
              <a
                href="https://github.com/venomusblood568/Neuron-front-end"
                className="hover:underline hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; GitHub
              </a>
              <a
                href="https://neuron-duck.vercel.app/"
                className="hover:underline hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; Live Demo
              </a>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="max-w-sm p-6 m-2 px-10 rounded-2xl flex items-center gap-2 text-gray-300 hover:cursor-pointer hover:opacity-50 hover:bg-gray-600 hover:text-white transition duration-200">
          <div>
            <h2 className="text-xl font-semibold">Hue</h2>
            <p className="text-sm">
              Mimicking Clone Ray to understand how Ray.so works under the hood.
            </p>
            <div className="mt-2 flex gap-4 text-sm">
              <a
                href="https://github.com/venomusblood568/hue"
                className="hover:underline hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; GitHub
              </a>
              <a
                href="https://hue-duck.vercel.app/"
                className="hover:underline hover:scale-105"
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
        Chrome Extension
      </h1>
      <div className="flex flex-wrap justify-center gap-2 px-12 py-6">
        {/* card 1*/}
        <div className="max-w-sm p-6 m-2 px-10 rounded-2xl flex items-center gap-2 text-gray-300 hover:cursor-pointer hover:opacity-50 hover:bg-gray-600 hover:text-white transition duration-200">
          <div>
            <h2 className="text-xl font-semibold">Link Vault</h2>
            <p className="text-sm">
              A handy extension to save and organize all your links for later
              visits.
            </p>
            <div className="mt-2 flex gap-4 text-sm">
              <a
                href="https://github.com/venomusblood568/linkvault"
                className="hover:underline hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; GitHub
              </a>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="max-w-sm p-6 m-2 px-10 rounded-2xl flex items-center gap-2 text-gray-300 hover:cursor-pointer hover:opacity-50 hover:bg-gray-600 hover:text-white transition duration-200">
          <div>
            <h2 className="text-xl font-semibold">Hyper Flow</h2>
            <p className="text-sm">
              Easily adjust YouTube playback speed from 0.5x to 4x with a
              simple, user-friendly interface.
            </p>
            <div className="mt-2 flex gap-4 text-sm">
              <a
                href="https://github.com/venomusblood568/HyperFlow_playcontrol"
                className="hover:underline hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; GitHub
              </a>
            </div>
          </div>
        </div>
        {/* card 3 */}
        <div className="max-w-sm p-6 m-2 px-10 rounded-2xl flex items-center gap-2 text-gray-300 hover:cursor-pointer hover:opacity-50 hover:bg-gray-600 hover:text-white transition duration-200">
          <div>
            <h2 className="text-xl font-semibold">GitaVerses</h2>
            <p className="text-sm">
              GitaVerse Explorer shows you a random Bhagavad Gita verse with one
              click, bringing daily spiritual insight to your browser.
            </p>
            <div className="mt-2 flex gap-4 text-sm">
              <a
                href="https://github.com/venomusblood568/Project5/tree/main/GitaVerses"
                className="hover:underline hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                &gt; GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
