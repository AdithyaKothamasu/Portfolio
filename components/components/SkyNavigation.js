export default function SkyNavigation() {
  return <nav className="journal-nav" aria-label="Portfolio navigation">
    <a href="#top" className="journal-wordmark">adithya<span>.cloud</span></a>
    <div className="journal-nav-links"><a href="#about">About</a><a href="#work">Work</a><a href="#projects">Projects</a><a href="#contact">Contact <span aria-hidden="true">↗</span></a></div>
  </nav>;
}
