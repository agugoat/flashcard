'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function AboutPage() {
  return (
    <div>
      {/* Header and Navigation */}
      <div className="navbar bg-teal-500 text-white shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content bg-teal-400 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><a href="/">Home</a></li>
              <li><a href="/generate">Generate</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-xl text-white font-bold">FlashCardZ</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a href="/" className="hover:text-pink-300">Home</a></li>
            <li><a href="/generate" className="hover:text-pink-300">Generate</a></li>
            <li><a href="/about" className="hover:text-pink-300">About</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <SignedOut>
            <a href="/sign-in" className="btn btn-outline border-white text-white hover:bg-pink-500 mr-2">Login</a>
            <a href="/sign-up" className="btn btn-outline border-white text-white hover:bg-pink-500">Sign Up</a>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-center mb-8">About FlashCardZ</h1>
        <div className="text-lg leading-relaxed">
          <p className="mb-4">
            Welcome to <strong>FlashCardZ</strong>, your ultimate tool for effective and efficient learning. At FlashCardZ, we believe that learning should be accessible, engaging, and tailored to your needs. Our platform is designed to help students, professionals, and lifelong learners create, organize, and study flashcards with ease.
          </p>

          <p className="mb-4">
            FlashCardZ was born out of the necessity to have a versatile and user-friendly tool for studying. Traditional flashcards have been a staple in education for decades, but we wanted to bring this powerful method into the digital age. Whether you're preparing for an exam, learning a new language, or just trying to memorize important information, FlashCardZ is here to help you succeed.
          </p>

          <p className="mb-4">
            Our platform allows you to create customized flashcards, organize them into sets, and study them anywhere, anytime. We offer a variety of features such as progress tracking, analytics, and the ability to share your flashcards with others. We are constantly evolving and adding new features to enhance your learning experience.
          </p>

          <p className="mb-4">
            FlashCardZ is built by a team of passionate educators and technologists who are committed to making learning easier and more effective. We understand the challenges of learning new material and have created FlashCardZ to be a reliable partner in your educational journey.
          </p>

          <p className="mb-4">
            Thank you for choosing FlashCardZ. We are excited to be a part of your learning process and look forward to helping you achieve your goals.
          </p>

          <p className="text-center mt-8">
            <a href="/generate" className="btn btn-primary">Get Started</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center bg-teal-200 text-teal-900 p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by FlashCardZ | Made by 
            <a href="https://agugoat.github.io/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 ml-2">
              Princeobiuto Aguguo
            </a>
          </p>
        </aside>
      </footer>
    </div>
  )
}