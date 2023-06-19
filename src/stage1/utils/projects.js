import stackr1 from "../assets/stackr1.jpg";
import stackr2 from "../assets/stackr2.jpg";
import port20211 from "../assets/port20211.jpg";
import port20212 from "../assets/port20212.jpg";

import wiki from "../assets/wiki.jpg";

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
    "A block-stacking 3D game with simulated physics. Written in React and the React-three-fiber ecosystem.",
    ["React", "React-three-fiber", "CannonJS physics engine", "GSAP"],
    [stackr1, stackr2],
    "https://github.com/R-zine/stackr",
    "https://stckr.netlify.app/"
  ),
  new Project(
    "This is my dev portfolio from 2021. The site you are currently viewing was envisioned as a continuation of the old portfolio with multiple improvements. Albeit much simpler, I am happy how it turned out and it now serves as a fallback for devices with low processing power and/or small screens.",
    ["React", "React-three-fiber (for the Tech tab)", "Blender", "GSAP"],
    [port20211, port20212],
    "https://github.com/R-zine/PortfolioSite2021/",
    "https://ivanradev.netlify.app/"
  ),
  new Project(
    "A real-time Wikipedia search page that offers search results with snippets together with voice recognition.",
    ["Vanilla JS", "Speech recognition API"],
    wiki
  ),
  new Project(
    "A real-time Wikipedia search page that offers search results with snippets together with voice recognition.",
    ["Vanilla JS", "Speech recognition API"],
    wiki
  ),
  new Project(
    "A real-time Wikipedia search page that offers search results with snippets together with voice recognition.",
    ["Vanilla JS", "Speech recognition API"],
    wiki
  ),
  new Project(
    "A real-time Wikipedia search page that offers search results with snippets together with voice recognition.",
    ["Vanilla JS", "Speech recognition API"],
    wiki
  ),
  new Project(
    "A real-time Wikipedia search page that offers search results with snippets together with voice recognition.",
    ["Vanilla JS", "Speech recognition API"],
    wiki
  ),
];
