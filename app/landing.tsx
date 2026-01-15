import Image from "next/image";

export default function Landing() {

    /*<script>
        const openMenu = document.getElementById("open-menu");
        const closeMenu = document.getElementById("close-menu");
        const navLinks = document.getElementById("mobile-navLinks");

        const openMenuHandler = () => { navLinks.classList.remove("-translate-x-full")
        navLinks.classList.add("translate-x-0") }

        const closeMenuHandler = () => { navLinks.classList.remove("translate-x-0")
        navLinks.classList.add("-translate-x-full") }

        openMenu.addEventListener("click", openMenuHandler);
        closeMenu.addEventListener("click", closeMenuHandler);
    </script>*/

    return (<>
        <section className="flex flex-col items-center text-white text-sm">
            <svg className="absolute -z-10 w-screen -mt-40 md:mt-0" width="1440" height="676" viewBox="0 0 1440 676"
                 fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="-92" y="-948" width="1624" height="1624" rx="812" fill="url(#a)"/>
                <defs>
                    <radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                    gradientTransform="rotate(90 428 292)scale(812)">
                        <stop offset=".63" stopColor="#372AAC" stopOpacity="0"/>
                        <stop offset="1" stopColor="#372AAC"/>
                    </radialGradient>
                </defs>
            </svg>
            <nav
                className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    <a href="https://prebuiltui.com" className="flex items-center gap-2 leading-none">
                        <Image
                            className="invert"
                            src="/laptop.png"
                            alt="Nikhil Anand"
                            width={70}
                            height={20}
                            priority
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block h-auto w-40" viewBox="-2 -2 275 55">
                             <path
                                 d="M2.17 30.75L2.17 48.44L0 48.44L0 21.16L2.11 21.16L2.11 25.48L2.33 25.48Q3.28 23.37 5.40 22.09Q7.51 20.81 10.42 20.81Q13.17 20.81 15.26 21.98Q17.35 23.15 18.53 25.31Q19.71 27.47 19.71 30.45L19.71 48.44L17.54 48.44L17.54 30.54Q17.54 27.06 15.47 24.94Q13.41 22.82 10.01 22.82Q7.74 22.82 5.97 23.81Q4.19 24.80 3.18 26.59Q2.17 28.37 2.17 30.75ZM28.80 48.44L28.80 21.16L30.95 21.16L30.95 48.44L28.80 48.44M29.88 16.34Q29.17 16.34 28.65 15.84Q28.13 15.34 28.13 14.63Q28.13 13.92 28.64 13.42Q29.15 12.93 29.88 12.93Q30.59 12.93 31.12 13.42Q31.64 13.92 31.64 14.63Q31.64 15.34 31.13 15.84Q30.61 16.34 29.88 16.34ZM41.92 37.78L41.89 34.68L42.45 34.68L56.09 21.16L58.91 21.16L46.40 33.59L46.18 33.68L41.92 37.78M40.04 48.44L40.04 12.07L42.21 12.07L42.21 48.44L40.04 48.44M56.71 48.44L45.21 33.90L46.77 32.46L59.48 48.44L56.71 48.44ZM67.51 30.75L67.51 48.44L65.34 48.44L65.34 12.07L67.51 12.07L67.51 25.48L67.72 25.48Q68.68 23.35 70.78 22.08Q72.89 20.81 75.83 20.81Q78.59 20.81 80.68 21.97Q82.78 23.14 83.96 25.29Q85.14 27.45 85.14 30.45L85.14 48.44L82.99 48.44L82.99 30.54Q82.99 27.04 80.91 24.93Q78.84 22.82 75.43 22.82Q73.14 22.82 71.34 23.81Q69.55 24.80 68.53 26.59Q67.51 28.37 67.51 30.75ZM94.23 48.44L94.23 21.16L96.38 21.16L96.38 48.44L94.23 48.44M95.31 16.34Q94.60 16.34 94.08 15.84Q93.55 15.34 93.55 14.63Q93.55 13.92 94.07 13.42Q94.58 12.93 95.31 12.93Q96.02 12.93 96.55 13.42Q97.07 13.92 97.07 14.63Q97.07 15.34 96.56 15.84Q96.04 16.34 95.31 16.34ZM107.63 12.07L107.63 48.44L105.47 48.44L105.47 12.07L107.63 12.07ZM133.98 48.44L133.98 50.50L112.00 50.50L112.00 48.44L133.98 48.44ZM145.60 49.02Q143.24 49.02 141.27 48.08Q139.31 47.14 138.13 45.33Q136.95 43.52 136.95 40.93Q136.95 39.22 137.55 37.93Q138.16 36.63 139.42 35.69Q140.68 34.75 142.65 34.14Q144.62 33.52 147.35 33.19Q149.43 32.94 151.07 32.70Q152.70 32.46 153.63 31.94Q154.56 31.43 154.56 30.38L154.56 29.24Q154.56 26.26 152.68 24.50Q150.80 22.75 147.50 22.75Q144.57 22.75 142.57 24.03Q140.57 25.32 139.77 27.34L137.73 26.58Q138.51 24.63 139.99 23.33Q141.48 22.03 143.40 21.40Q145.33 20.76 147.44 20.76Q149.27 20.76 150.93 21.27Q152.59 21.79 153.90 22.83Q155.20 23.88 155.97 25.51Q156.73 27.13 156.73 29.39L156.73 48.44L154.56 48.44L154.56 43.52L154.40 43.52Q153.69 45.05 152.46 46.30Q151.23 47.55 149.49 48.29Q147.76 49.02 145.60 49.02M145.81 47.02Q148.37 47.02 150.35 45.77Q152.33 44.51 153.44 42.33Q154.56 40.15 154.56 37.38L154.56 33.36Q154.15 33.72 153.38 33.99Q152.61 34.27 151.64 34.47Q150.67 34.68 149.62 34.83Q148.56 34.98 147.57 35.10Q144.58 35.46 142.71 36.19Q140.84 36.93 139.98 38.12Q139.12 39.31 139.12 41.00Q139.12 43.79 141.03 45.40Q142.95 47.02 145.81 47.02ZM167.97 30.75L167.97 48.44L165.80 48.44L165.80 21.16L167.92 21.16L167.92 25.48L168.13 25.48Q169.09 23.37 171.20 22.09Q173.31 20.81 176.23 20.81Q178.98 20.81 181.06 21.98Q183.15 23.15 184.33 25.31Q185.51 27.47 185.51 30.45L185.51 48.44L183.35 48.44L183.35 30.54Q183.35 27.06 181.28 24.94Q179.21 22.82 175.82 22.82Q173.54 22.82 171.77 23.81Q169.99 24.80 168.98 26.59Q167.97 28.37 167.97 30.75ZM201.72 49.02Q199.36 49.02 197.40 48.08Q195.44 47.14 194.26 45.33Q193.08 43.52 193.08 40.93Q193.08 39.22 193.68 37.93Q194.28 36.63 195.54 35.69Q196.80 34.75 198.77 34.14Q200.75 33.52 203.48 33.19Q205.56 32.94 207.19 32.70Q208.82 32.46 209.76 31.94Q210.69 31.43 210.69 30.38L210.69 29.24Q210.69 26.26 208.81 24.50Q206.92 22.75 203.62 22.75Q200.69 22.75 198.69 24.03Q196.70 25.32 195.90 27.34L193.86 26.58Q194.64 24.63 196.12 23.33Q197.60 22.03 199.53 21.40Q201.46 20.76 203.57 20.76Q205.40 20.76 207.06 21.27Q208.72 21.79 210.02 22.83Q211.33 23.88 212.09 25.51Q212.86 27.13 212.86 29.39L212.86 48.44L210.69 48.44L210.69 43.52L210.53 43.52Q209.82 45.05 208.58 46.30Q207.35 47.55 205.62 48.29Q203.89 49.02 201.72 49.02M201.94 47.02Q204.49 47.02 206.47 45.77Q208.45 44.51 209.57 42.33Q210.69 40.15 210.69 37.38L210.69 33.36Q210.28 33.72 209.51 33.99Q208.74 34.27 207.77 34.47Q206.80 34.68 205.74 34.83Q204.69 34.98 203.69 35.10Q200.71 35.46 198.84 36.19Q196.96 36.93 196.10 38.12Q195.24 39.31 195.24 41.00Q195.24 43.79 197.16 45.40Q199.08 47.02 201.94 47.02ZM224.09 30.75L224.09 48.44L221.93 48.44L221.93 21.16L224.04 21.16L224.04 25.48L224.25 25.48Q225.21 23.37 227.33 22.09Q229.44 20.81 232.35 20.81Q235.10 20.81 237.19 21.98Q239.28 23.15 240.46 25.31Q241.64 27.47 241.64 30.45L241.64 48.44L239.47 48.44L239.47 30.54Q239.47 27.06 237.40 24.94Q235.33 22.82 231.94 22.82Q229.67 22.82 227.89 23.81Q226.12 24.80 225.11 26.59Q224.09 28.37 224.09 30.75ZM259.98 49.01Q256.69 49.01 254.24 47.19Q251.79 45.38 250.45 42.20Q249.11 39.01 249.11 34.87Q249.11 30.77 250.47 27.58Q251.83 24.40 254.28 22.58Q256.73 20.76 260.00 20.76Q262.34 20.76 264.07 21.65Q265.80 22.55 266.98 24.02Q268.16 25.50 268.79 27.25L269.00 27.25L269.00 12.07L271.15 12.07L271.15 48.44L269.05 48.44L269.05 42.49L268.79 42.49Q268.13 44.25 266.96 45.73Q265.78 47.21 264.04 48.11Q262.30 49.01 259.98 49.01M260.17 47.00Q262.94 47.00 264.92 45.41Q266.90 43.82 267.96 41.08Q269.02 38.33 269.02 34.85Q269.02 31.37 267.96 28.65Q266.90 25.92 264.92 24.35Q262.94 22.78 260.17 22.78Q257.37 22.78 255.37 24.37Q253.37 25.96 252.32 28.69Q251.26 31.43 251.26 34.85Q251.26 38.28 252.32 41.03Q253.37 43.79 255.37 45.39Q257.37 47.00 260.17 47.00Z"
                                stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                     </a>
                 </div>

                <div className="hidden md:block space-x-3">
                    <button className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md">
                        Login
                    </button>
                </div>
                <button id="open-menu" className="md:hidden active:scale-90 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-menu-icon lucide-menu">
                        <path d="M4 5h16"/>
                        <path d="M4 12h16"/>
                        <path d="M4 19h16"/>
                    </svg>
                </button>
            </nav>
            <div
                id="mobile-navLinks"
                className="fixed inset-0 z-100 bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 -translate-x-full">
                <a href="#products">
                    Products
                </a>
                <a href="#resources">
                    Resources
                </a>
                <a href="#stories">
                    Stories
                </a>
                <a href="#pricing">
                    Pricing
                </a>
                <button id="close-menu"
                        className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-x-icon lucide-x">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                    </svg>
                </button>
            </div>

            <div className="flex items-center mt-32 gap-2 border border-slate-600 text-gray-50 rounded-full px-4 py-2">
                <div className="size-2.5 bg-green-500 rounded-full"></div>
                <span>Book a live demo today</span>
            </div>
            <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-2xl">
                Lets build AI agents together
            </h1>
            <p className="text-center text-base max-w-lg mt-2">
                Our platform helps you build, test, and deliver faster — so you can focus on what matters.
            </p>
            <div className="flex items-center gap-4 mt-8">
                <button
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11">
                    Get started
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="#fff"
                              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button
                    className="border border-slate-400 active:scale-95 hover:bg-white/10 transition rounded-lg px-8 h-11">
                    Book a demo
                </button>
            </div>
            <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-2.png"
                className="w-full rounded-[15px] max-w-4xl mt-16"
                alt="hero section showcase"
            />
        </section>
    </>)
}