'use client';

import PortfolioMasthead from './PortfolioMasthead';
import HeroSection from './HeroSection';
import WorkExperience from './WorkExperience';
import ProjectsShowcase from './ProjectsShowcase';
import SkyNavigation from './SkyNavigation';

export default function MainPage() {
    const testimonials = [{
        name: "I'm a Software Developer",
        quote: "I have been building products and fun stuff for the past 1 year. You'll see what I've built below.",
        src: "/developer.jpeg",
    },
    {
        name: "I'm into FITNESS",
        quote: "I have been playing different sports since I was 9 years old. Volleyball and gym🏋 make 3hrs of my day.",
        src: "/fitness.jpeg",
    },
    {
        name: "I'm a BITS Pilani graduate 👨🏽‍🎓",
        quote: "I graduated from BITS Pilani, Hyderabad Campus, with a bachelor's in Computer Science and a minor in Finance.",
        src: "/student.jpeg"
    }];
    const projects = [
        {
            id: "REMLogic",
            title: "REMLogic - still in testflight beta",
            description: "Built this app to help me analyze and compare my sleep data from different nights, and also see how different events like Dinner, Workout, Caffeine and their timings affect my sleep. I also integrated a way to connect my OpenClaw Agent(Odin) to this app. So now i have a UI to view compare/analyze my data and also can chat with my agent to get insights and recommendations.",
            imgSrc: "/remlogic.png",
            linkHref: "https://testflight.apple.com/join/xHbXwhzW"
        },
        {
            id: "macrobalance",
            title: "MacroBalance - Calorie Tracker",
            description: "My first production level project, This is an AI calorie and fitness habit tracker. Helps you track your nutrition and lose/gain weight. Built this to help myself and I have lost 10Kgs since I started using it in July 2025.",
            imgSrc: "/macrobalance.png",
            linkHref: "https://macrobalance.app"
        },
        {
            id: "trash-dump",
            title: "Trash Dump",
            description: "This is a useless but fun website where people can dump whatever text they want and then dive in to see what others dumped. you can also edit others dump.",
            imgSrc:"/trash-dump.png",
            linkHref:"https://trashdump.online/"
        },
        {
            id: "KOCOwork",
            title: "KOCOwork",
            description: "This is a freelance project, I built a website for a local business called KOCOwork, which is a co-working space in Hyderabad.",
            imgSrc: "/kocowork.png",
            linkHref: "https://kocowork-website.adithya261004.workers.dev/"
        },
        {
            id:"hmc",
            title: "How Many Calories",
            description: "Simple ios app that tells you how many calories are there in your meal using a picture",
            imgSrc: "/hmc.PNG",
            linkHref: "https://apps.apple.com/us/app/howmanycalories/id6745625874"
        },
        {
            id:"alumforms",
            title: "Alum Forms ",
            description: "Another freelance project, I built a website for a local business called ALum Forms, which is an aluminium formwork design and manufacturing company in Hyderabad.",
            imgSrc: "/alumforms.png",
            linkHref: "https://alumforms.com"
        },
        {
            id:"Twitter reply assistant",
            title: "Twitter/X reply assistant",
            description: "A chrome extension which is atwitter/x reply assistant that helps you in writing different types/tones of replies. Made this while trying to grow on x, helped in putting in more posts and replies, which helps with the algorithm.",
            imgSrc: "/x-bot.png",
            linkHref: "https://github.com/AdithyaKothamasu/X-reply-extension"
        },
    ]
    
const socials = [
    { link: 'https://github.com/AdithyaKothamasu', text: 'Github', image: '/github.jpg' },
    { link: 'https://x.com/puzzledAdi', text: 'X', image: '/fitness.jpeg' },
    { link: 'https://www.linkedin.com/in/sai-adithya-kothamasu', text: 'Linkedin', image: '/student.jpeg' },
    { link: 'https://www.instagram.com/adithya_kothamasu_109/', text: 'Instagram', image: '/face.png' },
  ];
  return (
    <main className="sky-journal" id="top">
      <SkyNavigation />
      <PortfolioMasthead />
      <HeroSection />
      <WorkExperience />
      <ProjectsShowcase projects={projects} />
      <footer className="journal-contact" id="contact">
        <div className="journal-section-label">04 / KEEP IN TOUCH</div>
        <div className="contact-heading"><h2>Say hello.</h2><span aria-hidden="true">↗</span></div>
        <p>Find me around the internet.</p>
        <nav aria-label="Social links" className="journal-socials">
          {socials.map(item => <a key={item.text} href={item.link} target="_blank" rel="noopener noreferrer">{item.text}<span aria-hidden="true">↗</span></a>)}
        </nav>
        <div className="journal-signoff"><span>ADITHYA.CLOUD</span><a href="#top">Back to the sky ↑</a></div>
      </footer>
    </main>
  );
}
