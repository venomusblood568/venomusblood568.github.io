
import Header from "../components/header";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center w-full">
        {" "}
        <div className="flex flex-col items-center text-center px-5 py-36">
          {" "}
          <h1 className="font-extrabold uppercase text-6xl md:text-7xl tracking-widest text-gray-200">
            BLUECODES&apos;S BLOG
          </h1>
          <p className="uppercase mt-6 text-xl tracking-wider text-gray-200">
            I WRITE WITH A CUP OF COFFEE
          </p>
        </div>
      </div>
    </div>
  );
}
