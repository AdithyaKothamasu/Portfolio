import Image from 'next/image';

export default function HeroSection() {
  return <section className="journal-about journal-section" id="about" aria-labelledby="about-title">
    <div className="journal-about-copy">
      <div className="journal-section-label">01 / A LITTLE ABOUT ME</div>
      <h2 id="about-title">Hi, I&apos;m Adithya.</h2>
      <p className="journal-intro">I&apos;m a <strong className="journal-gold">software engineer</strong> and <strong className="journal-red">entrepreneur</strong>.</p>
      <p>I graduated from BITS Pilani, Hyderabad Campus, with a bachelor&apos;s in <strong>Computer Science</strong> and a minor in <strong>Finance</strong>.</p>
      <p>I build products that solve <strong>real problems</strong> and have fun along the way.</p>
      <p>When I&apos;m not coding, you&apos;ll find me at the gym, playing volleyball, or bingeing on Youtube.</p>
      <a className="journal-text-link" href="#projects">See what I&apos;ve been building <span aria-hidden="true">↘</span></a>
    </div>
    <figure className="journal-portrait"><div className="journal-photo"><Image src="/hiking.jpeg" alt="Portrait of Adithya Kothamasu on a hike" fill sizes="(max-width: 700px) 70vw, 300px" className="object-cover" priority /></div><figcaption>OFF SCREEN <span aria-hidden="true">↗</span></figcaption></figure>
  </section>;
}
