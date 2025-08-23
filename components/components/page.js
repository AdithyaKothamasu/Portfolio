'use client';

import { useRouter } from 'next/navigation';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import TextPressure from './TextPressure';
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import FlowingMenu from './FlowingMenu';

export default function MainPage() {
    const testimonials = [{
        name: "I'm a DEVELOPER and an INDIE HACKER🧑‍💻",
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
            id: "animator-chat",
            title: "Animator Chat - Ongoing",
            description: "This is a prompt to motion graphics generator. It is like cursor but for motion graphics. this is currently in the pre-MVP stage",
            imgSrc: "/animator-chat.png",
        },
        {
            id: "macrobalance",
            title: "MacroBalance - Calorie Tracker",
            description: "My first production level project, This is an AI calorie and fitness habit tracker. helps you track nutrition and lose/gain weight.",
            imgSrc: "https://api.screenshotone.com/take?access_key=opt2ZCNQxdLeMA&url=https%3A%2F%2Fmacrobalance.app&format=jpg&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=0&timeout=60&response_type=by_format&image_quality=80",
            linkHref: "https://macrobalance.app"
        },
        {
            id: "trash-dump",
            title: "Trash Dump",
            description: "This is a useless but fun website where people can dump whatever text they want and then dive in to see what others dumped. you can also edit others dump.",
            imgSrc:"https://api.screenshotone.com/take?access_key=opt2ZCNQxdLeMA&url=https%3A%2F%2Ftrashdump.online&format=jpg&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=0&timeout=60&response_type=by_format&image_quality=80",
            linkHref:"https://trashdump.online/"
        },
        {
            id: "KOCOwork",
            title: "KOCOwork",
            description: "This is a freelance project, I built a website for a local business called KOCOwork, which is a co-working space in Hyderabad.",
            imgSrc: "https://api.screenshotone.com/take?access_key=opt2ZCNQxdLeMA&url=https%3A%2F%2Fkocowork.in&format=jpg&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=0&timeout=60&response_type=by_format&image_quality=80",
            linkHref: "https://kocowork.in"
        },
        {
            id:"hmc",
            title: "How Many Calories",
            description: "Simple ios app that tells you how many calories are there in your meal using a picture",
            imgSrc: "/hmc.PNG",
            linkHref: "https://apps.apple.com/us/app/howmanycalories/id6745625874"
        },
    ]
    
const socials = [
    { link: 'https://www.instagram.com/adithya_kothamasu_109/', text: 'Instagram', image: '/face.png' },
    { link: 'https://x.com/puzzledAdi', text: 'X', image: '/fitness.jpeg' },
    { link: 'https://www.linkedin.com/in/sai-adithya-kothamasu', text: 'Linkedin', image: '/student.jpeg' },
  ];
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative text-white mt-10">
      {/* Your Content/Components */}
        {/* <img src="/face.png" alt="Adithya" width={100} height={100} className="rounded-full z-10"/> */}
        <div style={{position: 'relative', height: '150px md:h-200px'}}>
            <TextPressure
                text="Adithya.cloud"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={window.innerWidth < 768 ? 100 : 200}
            />
        </div>
        <div className="relative bg-amber-200 m-8 rounded-2xl md:rounded-full md:p-20 z-10">
            <CircularTestimonials
            testimonials={testimonials}
            />
        </div>
        <div style={{position: 'relative', height: '150px md:h-200px'}}>
            <TextPressure
                text="Projects"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={window.innerWidth < 768 ? 100 : 200}
            />
        </div>
        <ExpandingCards className="mt-8 mb-20" items={projects} defaultActiveIndex={0} />

        <div className='w-full' style={{ height: '300px', position: 'relative' }}>
            <FlowingMenu items={socials} />
        </div>
    </div>
  );
}
