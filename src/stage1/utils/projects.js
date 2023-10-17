class Project {
  constructor(description, tech, preview, source, site) {
    this.description = description;
    this.tech = tech;
    this.preview = preview;
    this.source = source;
    this.site = site;
  }
}

export const projects = [
  new Project(
    "This is my dev portfolio from 2021. The site you are currently viewing was envisioned as a continuation of the old portfolio with multiple improvements. Albeit much simpler, I am happy how it turned out and it now serves as a fallback for devices with low processing power and/or small screens.",
    ["React", "React-three-fiber (for the Tech tab)", "Blender", "GSAP"],
    ["./port20211.jpg", "./port20212.jpg"],
    "https://github.com/R-zine/PortfolioSite2021/",
    "https://ivanradev2021.netlify.app/"
  ),
  new Project(
    "A block-stacking 3D game with simulated physics. Written in React and the React-three-fiber ecosystem.",
    ["React", "React-three-fiber", "CannonJS physics engine", "GSAP"],
    ["./stackr1.jpg", "./stackr2.jpg"],
    "https://github.com/R-zine/stackr",
    "https://stckr.netlify.app/"
  ),
  new Project(
    "A full-stack Snake game built on NextJS with PostegreSQL integration through Prisma. The user details and preferences are saved on the DB (Supabase). The speed, growth-rate, and size of the playing board are adjustable. If the user is viewing the App on a mobile device arrow buttons are automatically rendered.",
    ["NextJS", "Prisma (endpoints and DB management)", "PostgreSQL", "SASS"],
    ["./snake1.jpg", "./snake2.jpg"],
    "https://github.com/R-zine/snake-next-js",
    "https://next-snake-taupe.vercel.app/"
  ),
  new Project(
    "This is my personal traditional paintings' website. It is built on React/Vite and uses Wordpress as a backend. Animations are powered by eact Spring and GSAP.",
    [
      "React",
      "Redux Toolkit (state and query management)",
      "WordPress API",
      "Emotion/styled",
      "GSAP",
      "React Spring",
    ],
    ["./art1.jpg", "./art2.jpg"],
    "https://github.com/R-zine/personal-paintings-website",
    "https://ivanradevart.netlify.app/"
  ),
  new Project(
    "Item Hunter is an AI-powered game in which the user gets points when they find one of 300 items in the real world. This App is built on React Native (Expo) and has TensorFlowJS object recognition. The score and current selection are handled via Redux with persistors. The built .APK is available in the GitHub repository.",
    [
      "React Native with Expo",
      "Redux with persistors (state management and saving data locally)",
      "TensorFlowJS AI integration",
    ],
    ["./native.jpg"],
    "https://github.com/R-zine/ItemHunter",
    "https://item-hunter-preview.netlify.app/"
  ),
  new Project(
    "An architectural portfolio website, featuring many different types of animations and an unique styling approach. The website is fully responsive and has a custom 3D model in the contacts' page.",
    [
      "Vite/ React with routing",
      "GSAP",
      "Framer motion",
      "React Spring",
      "React Three Fiber (for the Contacts page)",
    ],
    ["./arch1.jpg", "./arch2.jpg"],
    "https://github.com/R-zine/architect-portfolio",
    "https://dradeva.netlify.app/"
  ),
  new Project(
    "Personal portfolio website 2023",
    [
      "React / Vite",
      "React Three Fiber / Drei",
      "React Rapier (3D engine)",
      "GSAP",
      "Emotion / Styled",
    ],
    [""],
    "https://github.com/R-zine/Portfolio-2023",
    ""
  ),
];
