'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 pb-12 md:pb-20">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Portrait Image */}
        <div className="flex-shrink-0 w-full md:w-auto">
          <div className="relative w-64 h-80 md:w-120 md:h-160 mx-auto md:mx-0">
            <Image
              src="/hero.png"
              alt="Adithya Kothamasu"
              fill
              className="object-contain object-center"
              priority
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
              }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6">
          {/* <h1 className="text-4xl md:text-5xl lg:text-5xl font-light font-mono text-white">
            Sai Adithya Kothamasu
          </h1> */}
          <div className="space-y-3 md:space-y-4 text-white/90 text-md font-light text-left font-mono md:text-xl leading-relaxed">
            <p>
              I&apos;m a <span className='text-yellow-500'> software developer</span>, <span className='text-red-500'> entrepreneur</span>, and <span className='text-blue-500'> student</span>. 
            </p>
            <p>
              I am currently pursuing a Bachelor&apos;s in <span className='text-yellow-500'> Computer Science</span> with a minor in <span className='text-red-500'> Finance</span> at BITS Pilani, Hyderabad Campus.
            </p>
            <p>
              I build products that solve <span className='text-blue-500'> real problems</span> and have fun along the way.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me at the gym, playing volleyball or bingeing on Youtube.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

