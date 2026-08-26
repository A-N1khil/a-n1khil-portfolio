import Landing from "@/app/landing";
import About from "@/app/about";
import Skills from "@/app/skills";
import Experience from "./experience";
import Projects from "./Projects";
import ContactRail from "./contact-rail";
import Contact from "./contact";
import SectionNavigator from "./section-navigator";

export default function Home() {
  return (
    <>
      <Landing />
      <ContactRail />
      <SectionNavigator />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
