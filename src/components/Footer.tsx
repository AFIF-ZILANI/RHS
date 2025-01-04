import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Raigon High School</h3>
            <p className="text-gray-400">
              Nurturing minds, building futures since 1970
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-blue-400">
                  Notices
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-blue-400">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-400">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>info@raigonhigh.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>123 School Street, City</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">School Hours</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday</li>
              <li>8:00 AM - 3:30 PM</li>
              <li>Office Hours:</li>
              <li>7:30 AM - 4:30 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Raigon High School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}