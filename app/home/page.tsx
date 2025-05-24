"use client"
import { useState } from "react";
import Header from "../components/header";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            my trusty coffee mug always by my side. Explore my complete list of
            <a
              href="/project"
              className="font-semibold text-green-300 hover:text-green-400 transition-colors"
            >
              {" "}
              projects
            </a>{" "}
            here.
          </p>
          <br />
          <div className="text-white text-lg leading-relaxed whitespace-pre-line font-mono">
            Here are some of the technologies I&apos;ve been working with:
            <br />
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-white text-lg font-mono">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">▸</span>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">▸</span>
                <span>Python</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">▸</span>
                <span>React.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">▸</span>
                <span>Java</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">▸</span>
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
              className=" font-semibold text-green-400 hover:text-green-300 transition-colors"
            >
              anime
            </a>{" "}
            and devlogs (those behind-the-scenes videos on game development). I
            do enjoy gaming, though I&apos;m not playing much these days. When
            I&apos;m on the move or stumble upon a great story, you’ll often
            find me diving into manhwa, manga, or novels.
          </p>
          <br />
          <div className="leading-relaxed text-white whitespace-pre-line">
            <p>
              During my time in college, I’ve had the opportunity to work at
              multiple places:
            </p>

            <div className="text-white">
              {/* BEL */}
              <div className="mt-4 cursor-pointer" onClick={() => toggle(0)}>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <p className="font-semibold underline text-xl text-green-400">
                    Bharat Electronics Limited, Bangalore, India
                  </p>
                </div>
                {openIndex === 0 && (
                  <div className="ml-6 mt-2">
                    <p className="italic">
                      Mil-Com Intern (Aug 2023 – Sep 2023)
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>
                        <span className="font-medium">
                          Military Communications:
                        </span>{" "}
                        Engineered a streamlined workflow in military
                        communications, optimizing the process from idea
                        generation to production through systematic part
                        sourcing, simulation analysis, and internal approvals —
                        reducing time-to-market by 30%.
                      </li>
                      <li>
                        <span className="font-medium">Military Radar:</span>{" "}
                        Observed the development of secure, interoperable
                        defense communication systems, including radios and
                        encryption tools. Focused on innovation, rigorous
                        testing, cybersecurity, and modernization to enhance
                        military operations.
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* DIRO */}
              <div className="mt-4 cursor-pointer" onClick={() => toggle(1)}>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <p className="font-semibold underline text-xl text-green-400">
                    DIRO, Vellore, India
                  </p>
                </div>
                {openIndex === 1 && (
                  <div className="ml-6 mt-2">
                    <p className="italic">
                      Research and Development Intern (Feb 2023 – Mar 2023)
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>
                        <span className="font-medium">Research:</span> Conducted
                        in-depth analysis of vehicle types, assessed performance
                        and cost-effectiveness, and explored advanced sensor
                        integrations. Analyzed rating systems of Ola, Uber, and
                        Rapido.
                      </li>
                      <li>
                        <span className="font-medium">
                          Notion Implementation:
                        </span>{" "}
                        Led transition from Google Docs to Notion, designing a
                        streamlined workspace and improving collaboration and
                        workflow efficiency.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="leading-relaxed text-white whitespace-pre-line">
              <br />
              <p>...and there’s a lot more on the horizon.</p>
            </div>
            <div className="leading-relaxed text-white whitespace-pre-line">
              <br />
              <p>
                I recently moved to Delhi, if you are around, please reach out
                and let’s have some coffee or work together.
              </p>
              <br />
              <hr className="w-40 mx-auto text-gray-500" />
              <br />
              Find me on
              <br />
              
              <div className="flex flex-row gap-5">
                <a
                  href="https://github.com/venomusblood568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline flex items-center gap-2 hover:text-green-400 cursor-pointer"
                >
                  <FaGithub size={20} />
                  Github
                </a>
                <a
                  href="mailto:gouravanand0354@gamil.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline flex flex-center gap-2 hover:text-green-400 cursor-pointer"
                >
                  <FaEnvelope size={20} />
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/gourav-anand-jha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline flex flex-center gap-2 hover:text-green-400 cursor-pointer"
                >
                  <FaLinkedin size={20} />
                  Linkedin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
