"use client"
import Header from "../components/header";

export default function Resume(){
    return (
      <div>
        <Header />
        <div 
          className="flex justify-center items-center  p-4 pt-25">
          <embed
            src="gourav_resume_v1.pdf"
            width="800px"
            height="1100px"
            type="application/pdf"
            className="rounded-xl"
          />
        </div>
      </div>
    );
}