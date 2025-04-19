import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { ArrowRight, Leaf, Users, Tractor, LineChart } from "lucide-react"

const teamMembers = [
  {
    name: "Ishika Khanagwal",
    role: "Farm Operations Manager",
    image: "/ishika.jpg",
  },
  {
    name: "Sparsh Ranjan",
    role: "Agritech Specialist",
    image: "/s2.png",
  },
  {
    name: "Prakhar Palod",
    role: "Supply Chain Coordinator",
    image: "/prakhar.jpg",
  },
  {
    name: "Shubham Prakash",
    role: "Marketing Head",
    image: "/shubham.jpg",
  },
]

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl text-green-600">FarmConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-green-600">
              About
            </Link>
            <SignedIn>
              <Link href="/dashboard" className="text-sm font-medium hover:text-green-600">
                Dashboard
              </Link>
            </SignedIn>
          </nav>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up" className="hidden md:block">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-[url('/hero.jpg?height=600&width=1600')] bg-cover bg-center opacity-20"></div>
          <div className="relative container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                About <span className="text-green-600">FarmConnect</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Empowering farmers with modern technology to enhance productivity, streamline operations, and connect
                with the agricultural marketplace.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-4">
                  At FarmConnect, we're dedicated to transforming agricultural management through innovative technology
                  solutions. Our mission is to empower farmers with tools that simplify complex processes, provide
                  valuable insights, and create new opportunities for growth.
                </p>
                <p className="text-lg text-gray-600">
                  We believe that by bridging the gap between traditional farming practices and modern technology, we
                  can help create a more sustainable, efficient, and profitable agricultural sector.
                </p>
              </div>
              <div className="bg-[url('/misson.jpg?height=400&width=600')] bg-cover bg-center h-80 rounded-lg shadow-lg"></div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">System Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">Centralized Management</h3>
                <p className="text-gray-600">
                  Manage all aspects of your farming operation from a single, intuitive platform.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Tractor className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">Increased Efficiency</h3>
                <p className="text-gray-600">
                  Streamline processes and reduce administrative overhead with automated workflows.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">Data-Driven Decisions</h3>
                <p className="text-gray-600">
                  Leverage analytics and insights to make informed decisions about your agricultural operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div
                    className="bg-cover bg-center h-64 w-64 mx-auto rounded-full mb-4"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="bg-green-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto mb-8">
              Join our platform today and experience the benefits of modern farm management.
            </p>
            <SignedOut>
              <Link href="/sign-up">
                <Button size="lg" variant="secondary">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="font-bold text-xl">FarmConnect</span>
              </div>
              <p className="text-gray-400">Modern solutions for agricultural management.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/sign-in" className="text-gray-400 hover:text-white">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="text-gray-400 hover:text-white">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Farmer Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Agro Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: info@farmconnect.com</li>
                <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
                <li className="text-gray-400">Address: 123 Farm Road, Agriville</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} FarmConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
