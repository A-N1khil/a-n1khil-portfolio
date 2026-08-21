import Landing from "@/app/landing";
import Skills from "@/app/skills";
import Experience from "./experience";
import Projects from "./Projects";
import ContactRail from "./contact-rail";
import Contact from "./contact";

export default function Home() {
  return (
    <>
      <Landing />
      <ContactRail />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
