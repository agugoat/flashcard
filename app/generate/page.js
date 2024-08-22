'use client'

import { useState, useEffect } from 'react'
import { doc, collection, getDoc, writeBatch, getDocs, } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAt0Cb9wDU4ZMQBpeKYfKaTGHeP9B_fbwE",
  authDomain: "flashcards-b571a.firebaseapp.com",
  projectId: "flashcards-b571a",
  storageBucket: "flashcards-b571a.appspot.com",
  messagingSenderId: "439220971734",
  appId: "1:439220971734:web:7b7343038645e560274177",
  measurementId: "G-XR33GDB2Z2"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [session, setSession] = useState(null)
  const [flipped, setFlipped] = useState({})
  const { user } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('id')
  const session_id = searchParams.get('session_id')

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
      }
    }
    getFlashcards()
  }, [user])

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return

      const colRef = collection(doc(collection(db, 'users'), user.id), search)
      const docs = await getDocs(colRef)
      const flashcards = []
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() })
      })
      setFlashcards(flashcards)
    }
    getFlashcard()
  }, [search, user])

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return
      try {
        const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
        const sessionData = await res.json()
        if (res.ok) {
          setSession(sessionData)
        } else {
          setError(sessionData.error)
        }
      } catch (err) {
        setError('An error occurred while retrieving the session.')
      } finally {
        setLoading(false)
      }
    }
    fetchCheckoutSession()
  }, [session_id])

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })

      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }

      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  
  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.');
      return;
    }
  
    try {
      const userDocRef = doc(collection(db, 'users'), user.id);
      console.log("User Document Reference:", userDocRef);
  
      const userDocSnap = await getDoc(userDocRef);
      console.log("User Document Snapshot Exists:", userDocSnap.exists());
  
      const batch = writeBatch(db);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log("User Data:", userData);
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }];
        console.log("Updated Sets:", updatedSets);
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        console.log("Creating new user document");
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }
  
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName);
      console.log("Set Document Reference:", setDocRef);
  
      batch.set(setDocRef, { flashcards });
      console.log("Flashcards to save:", flashcards);
  
      await batch.commit();
      console.log("Batch commit successful");
  
      alert('Flashcards saved successfully!');
      handleCloseDialog();
      setSetName('');
    } catch (error) {
      console.error('Error saving flashcards:', error.message);
      alert('An error occurred while saving flashcards. Please try again.');
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

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
      <div className="container mx-auto p-4">
        <div className="my-4">
          <h1 className="text-4xl font-bold mb-4 text-pink-500 ">Generate Flashcards</h1>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Enter text"
            rows="4"
          ></textarea>
          <button className="btn btn-primary w-full bg-pink-500" onClick={handleSubmit}>
            Generate Flashcards
          </button>
        </div>

        {flashcards.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">Generated Flashcards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {flashcards.map((flashcard, index) => (
                <div key={index} className="card shadow-lg">
                  <div className="card-body">
                    <h3 className="card-title">Front:</h3>
                    <p>{flashcard.front}</p>
                    <h3 className="card-title mt-2">Back:</h3>
                    <p>{flashcard.back}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button className="btn btn-primary bg-pink-500 border-white" onClick={handleOpenDialog}>
                Save Flashcards
              </button>
            </div>
          </div>
        )}

        {dialogOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-pink-500">Save Flashcard Set</h3>
              <p className="py-4">Please enter a name for your flashcard set.</p>
              <input
                type="text"
                placeholder="Set Name"
                className="input input-bordered w-full mb-4"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
              />
              <div className="modal-action">
                <button className="btn" onClick={handleCloseDialog}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveFlashcards}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {session && (
          <div className="container mx-auto text-center mt-4">
            {session.payment_status === 'paid' ? (
              <>
                <h1 className="text-4xl font-bold">Thank you for your purchase!</h1>
                <p className="text-xl mt-2">Session ID: {session_id}</p>
                <p>We have received your payment. You will receive an email with the order details shortly.</p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold">Payment failed</h1>
                <p>Your payment was not successful. Please try again.</p>
              </>
            )}
          </div>
        )}

        {flashcards.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">Study Your Flashcards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {flashcards.map((flashcard) => (
                <div key={flashcard.id} className="card shadow-lg">
                  <div
                    className={`card-body cursor-pointer ${flipped[flashcard.id] ? 'flipped' : ''}`}
                    onClick={() => handleCardClick(flashcard.id)}
                  >
                    <p>{flipped[flashcard.id] ? flashcard.back : flashcard.front}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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