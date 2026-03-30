'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import TextPressure from './TextPressure';
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import FlowingMenu from './FlowingMenu';
import HeroSection from './HeroSection';
import WorkExperience from './WorkExperience';
import ProjectsShowcase from './ProjectsShowcase';

export default function MainPage() {
    const [minFontSize, setMinFontSize] = useState(200);

    useEffect(() => {
        const updateMinFontSize = () => {
            setMinFontSize(window.innerWidth < 768 ? 100 : 200);
        };

        updateMinFontSize();
        window.addEventListener('resize', updateMinFontSize);

        return () => window.removeEventListener('resize', updateMinFontSize);
    }, []);

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
        name: "I'm a STUDENT 👨🏽‍🎓",
        quote: "I'm currently a senior at BITS Pilani, Hyderabad Campus. I'm pursuing a bachelors in Computer Science. I also have a minor degree in Finance",
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative text-white mt-10">
      {/* Your Content/Components */}
        <div style={{position: 'relative', height: '150px md:h-200px'}}>
            <TextPressure
                text="ADITHYA.CLOUD"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={minFontSize}
            />
        </div>
        <HeroSection />
        <WorkExperience />
        <div className="mt-8 mb-20 md:w-[70%] w-full mx-auto">
            <ProjectsShowcase projects={projects} />
        </div>

        <div className='w-full' style={{ height: '300px', position: 'relative' }}>
            <FlowingMenu items={socials} />
        </div>
    </div>
  );
}
