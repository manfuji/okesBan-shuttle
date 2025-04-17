// app/welcome/page.tsx for Next.js 13+ App Router
// or pages/welcome.tsx for older Pages Router
'use client'; // Only needed for App Router if using event handlers

import { useRouter } from 'next/navigation'; // or 'next/router' for Pages Router
import Image from 'next/image';

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/c1_h1.jpeg" // Place image in public/images/
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 -z-10" />

      {/* Content */}
      <div className="flex flex-col justify-center items-center text-center h-full text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
          Welcome to OkesBan Shuttle Services
        </h1>
        <p className="text-lg mb-8">Select a service to get started:</p>

        <div className="space-x-4 flex flex-wrap justify-center">
          <button
            onClick={() => router.push('/survey')}
            className="btn-service"
          >
            Ashesi Shuttles
          </button>
          <button
            onClick={() => router.push('/survey')}
            className="btn-service"
          >
            Bus Rentals
          </button>
          <button
            onClick={() => router.push('/survey')}
            className="btn-service"
          >
            SchoolBus Pickup
          </button>
        </div>
      </div>

      {/* Tailwind CSS Custom Classes */}
      <style jsx>{`
        .btn-service {
          font-size: 1.125rem;
          margin: 0.5rem;
          padding: 0.75rem 2rem;
          background-color: #007bff;
          border: none;
          color: white;
          border-radius: 0.375rem;
          text-transform: uppercase;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s;
        }
        .btn-service:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
