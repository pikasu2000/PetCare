import {
  Facebook,
  InstagramIcon,
  Locate,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

import Button from "./ui/Button";

function Footer() {
  return (
    <footer>
      <div className="bg-green-100  py-10 dark:bg-zinc-800 dark:text-white">
        <div className="flex justify-between items-center px-6 md:px-16 lg:px-20 xl:px-20">
          <div className="flex flex-col gap-4 mt-4 ">
            <h1 className="text-4xl font-semibold ">Contact</h1>
            <div className="flex items-center gap-2 mt-4 text-gray-600 dark:text-white">
              <Phone />
              <span className="ml-2">+91 934 567 890</span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-gray-600 dark:text-white">
              <Phone />
              <span className="ml-2">+91 981 192 1000</span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-gray-600 dark:text-white">
              <Mail />
              <span className="ml-2">abc@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-gray-600 dark:text-white">
              <MapPin />
              <span className="ml-2">123, Main Street, City, Country</span>
            </div>
          </div>

          <div>
            <h1 className="text-4xl ">
              <span className="font-bold text-5xl">Want</span> To Keep
            </h1>
            <h1 className="text-4xl">
              <span className="font-bold text-5xl">Your Pet In,</span>Our Center
              <span className="font-bold text-5xl">?</span>{" "}
            </h1>
            <Button className="mt-4" asChild>
              Get Started
            </Button>
          </div>
          <div>
            <div>
              <h1 className="text-4xl font-semibold">Follow Us</h1>
              <div className="flex gap-4 mt-4">
                <a
                  href=""
                  className="bg-purple-500 hover:bg-purple-600 py-4 px-4 rounded-full"
                >
                  <Facebook />
                </a>
                <a
                  href=""
                  className="bg-purple-500 hover:bg-purple-600 py-4 px-4 rounded-full"
                >
                  <Twitter />
                </a>
                <a
                  href=""
                  className="bg-purple-500 hover:bg-purple-600 py-4 px-4 rounded-full"
                >
                  <Youtube />
                </a>
                <a
                  href=""
                  className="bg-purple-500 hover:bg-purple-600 py-4 px-4 rounded-full"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
            <div className="mt-10">
              <h1 className="text-4xl font-semibold">Opening hours</h1>
              <div className="flex flex-col gap-2 mt-4 text-gray-600 dark:text-white">
                <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                <span>Saturday: 10:00 AM - 4:00 PM</span>
                <span>Sunday: Closed</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="text-gray-400 mt-10" />
        <div className="text-center mt-10 text-gray-600 dark:text-white">
          <p>&copy; 2025 PetCareApp. All rights reserved.</p>
          <p>Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
