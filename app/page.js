'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function HomePage() {
  return (
    <div className="bg-white text-teal-900">
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

      {/* Hero Section */}
      <div className="hero bg-white min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Hero Image"
          />
          <div>
            <h1 className="text-5xl font-bold text-teal-900">Welcome to Flashcard SaaS</h1>
            <p className="py-6 text-teal-800">
              The easiest way to create flashcards from your text. Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <div>
              <a href="/generate" className="btn bg-pink-500 text-white hover:bg-pink-600 mr-4">Get Started</a>
              <a href="/about" className="btn btn-outline border-pink-500 text-pink-500 hover:bg-pink-100">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto my-16">
        <h2 className="text-4xl font-bold text-center text-teal-900 mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          {/* Feature 1: Easy Flashcard Creation */}
          <div className="card bg-teal-50 shadow-lg p-6">
            <div className="card-body">
              <div className="icon bg-teal-500 text-white rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-teal-900 mb-4">Easy Flashcard Creation</h3>
              <p className="text-teal-800">
                Create flashcards effortlessly with our intuitive interface. Whether you need a quick study aid or a detailed set, our tools make it easy to generate exactly what you need.
              </p>
            </div>
          </div>
          
          {/* Feature 2: Organized Study Sets */}
          <div className="card bg-teal-50 shadow-lg p-6">
            <div className="card-body">
              <div className="icon bg-teal-500 text-white rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h13m-7-2h7m-7 4h7m-7 4h7M3 13h.01M7 13h.01M7 9h.01M7 17h.01M3 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-teal-900 mb-4">Organized Study Sets</h3>
              <p className="text-teal-800">
                Keep your study materials neatly organized with our set management features. Group flashcards by subject, course, or topic to streamline your study sessions.
              </p>
            </div>
          </div>
          
          {/* Feature 3: Track Your Progress */}
          <div className="card bg-teal-50 shadow-lg p-6">
            <div className="card-body">
              <div className="icon bg-teal-500 text-white rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-teal-900 mb-4">Track Your Progress</h3>
              <p className="text-teal-800">
                Monitor your learning progress with detailed analytics. See how much you've learned over time and identify areas that need more focus to optimize your study sessions.
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto text-center my-16">
        <h2 className="text-4xl font-bold text-teal-900 mb-8">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          
          {/* Basic Plan */}
          <div className="card bg-pink-100 shadow-lg">
            <div className="card-body">
              <h3 className="text-2xl font-bold text-teal-900">Basic</h3>
              <p className="text-4xl font-bold text-teal-900 my-4">$9<span className="text-lg">/mo</span></p>
              <ul className="text-left text-teal-800 mb-4">
                <li className="mb-2">✔ 10 Flashcard Sets</li>
                <li className="mb-2">✔ 100 Flashcards</li>
                <li className="mb-2">✔ Email Support</li>
              </ul>
              <button className="btn bg-pink-500 text-white hover:bg-pink-600 w-full">Choose Basic</button>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="card bg-pink-300 shadow-lg">
            <div className="card-body">
              <h3 className="text-2xl font-bold text-teal-900">Pro</h3>
              <p className="text-4xl font-bold text-teal-900 my-4">$29<span className="text-lg">/mo</span></p>
              <ul className="text-left text-teal-800 mb-4">
                <li className="mb-2">✔ Unlimited Flashcard Sets</li>
                <li className="mb-2">✔ 1000 Flashcards</li>
                <li className="mb-2">✔ Priority Support</li>
                <li className="mb-2">✔ Analytics Dashboard</li>
              </ul>
              <button className="btn bg-pink-500 text-white hover:bg-pink-600 w-full">Choose Pro</button>
            </div>
          </div>
          
          {/* Enterprise Plan */}
          <div className="card bg-pink-100 shadow-lg">
            <div className="card-body">
              <h3 className="text-2xl font-bold text-teal-900">Enterprise</h3>
              <p className="text-4xl font-bold text-teal-900 my-4">$99<span className="text-lg">/mo</span></p>
              <ul className="text-left text-teal-800 mb-4">
                <li className="mb-2">✔ Custom Flashcard Sets</li>
                <li className="mb-2">✔ Unlimited Flashcards</li>
                <li className="mb-2">✔ Dedicated Account Manager</li>
                <li className="mb-2">✔ Custom Analytics</li>
              </ul>
              <button className="btn bg-pink-500 text-white hover:bg-pink-600 w-full">Choose Enterprise</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center bg-teal-200 text-teal-900 p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by FlashCardZ made by</p>
          <a href="https://agugoat.github.io/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 ml-2">
                Princeobiuto Aguguo
            </a>
        </aside>
      </footer>
    </div>
  )
}

