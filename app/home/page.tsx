import Header from "../components/header";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-start justify-start min-h-screen px-4 py-52 sm:px-10 md:px-20 lg:px-40  lg:py-52">
        <div className="w-full max-w-4xl font-mono px-4 sm:px-6 md:px-8 lg:pl-16">
          <h1 className="text-4xl text-white mb-6">
            <span className="typewriter">Hi, Gourav here</span>
          </h1>
          <p className="leading-relaxed text-white  whitespace-pre-line">
            I build cool software, document what I learn, and dive into the
            latest in tech. I&apos;m a software guy at heart—driven to
            contribute to the tech universe.
          </p>
          <br />
          <p className="leading-relaxed text-white  whitespace-pre-line">
            I completed my B.Tech from{" "}
            <a
              href="https://vit.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className=" font-semibold text-green-300 hover:text-green-400 transition-colors"
            >
              VIT
            </a>{" "}
            in the Department of Electronics and Communication. Over time, I’ve
            developed a stronger passion for software development and computer
            science. Now, I spend my days (and nights) building cool things—with
            my trusty coffee mug always by my side.
          </p>
          <br />
          <div className="text-white text-lg leading-relaxed whitespace-pre-line font-mono">
            Here are some of the technologies I&apos;ve been working with:
            <br />
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-white text-lg font-mono">
              <div className="flex items-center space-x-2">
                <span className="text-green-300">▸</span>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-300">▸</span>
                <span>Python</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-300">▸</span>
                <span>React.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-300">▸</span>
                <span>Java</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-300">▸</span>
                <span>JavaScript</span>
              </div>
            </div>
            <br />
          </div>

          <p className="leading-relaxed text-white  whitespace-pre-line">
            Outside of building things, I love spending time watching{" "}
            <a
              href="https://anilist.co/user/ElysianEchos/"
              target="_blank"
              rel="noopener noreferrer"
              className=" font-semibold text-green-300 hover:text-green-400 transition-colors"
            >
              anime
            </a>{" "}
            and devlogs (those behind-the-scenes videos on game development). I
            do enjoy gaming, though I&apos;m not playing much these days. When
            I&apos;m on the move or stumble upon a great story, you’ll often
            find me diving into manhwa, manga, or novels.
          </p>
          <br />
          
        </div>
      </div>
    </div>
  );
}
