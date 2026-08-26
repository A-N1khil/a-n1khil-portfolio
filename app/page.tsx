import Landing from "@/app/landing";
import About from "@/app/about";
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
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
