/* eslint-disable no-unused-vars */
import AnimatedSection from "./AnimatedSection";
import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
  useInView,
} from "framer-motion";

// import components
import DownloadButton from "../common/components/DownloadButton/DownloadButton";
import IconButton from "../common/components/IconButton/IconButton";
import InputField from "../common/components/InputField/InputField";
import TextAreaField from "../common/components/TextAreaField/TextAreaField";
import SubmitButton from "../common/components/SubmitButton/SubmitButton";
import Loader from "../common/components/Loader/Loader";

// import icons
import { AiFillGithub, AiFillLinkedin, AiOutlineEye } from "react-icons/ai";
import { FaCode, FaLaptopCode, FaBook } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

//import images
import foodapp from "../assets/images/foodapp.png";
import chat from "../assets/images/chat.png";
import payswift from "../assets/images/payswift.png";
import proctorer from "../assets/images/proctorer.png";
import ipl from "../assets/images/ipl.png";
import profilePhoto from "../assets/images/profile_photo.jpg";

// import style
import style from "./App.module.css";
// Animation variants
const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const staggerContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Example SDE skills
const sdeSkills = [
  { name: "JavaScript", cssName: "js" },
  { name: "React", cssName: "react" },
  { name: "Node.js", cssName: "node" },
  { name: "MongoDB", cssName: "mongodb" },
  { name: "Express.js", cssName: "express" },
  { name: "HTML5", cssName: "html" },
  { name: "CSS3", cssName: "css" },
  { name: "Git", cssName: "git" },
];

// Portfolio projects (updated)
const projects = [
  {
    name: "PaySwift (Digital Wallet System)",
    description:
      "PaySwift is a full-stack digital wallet system processing 200+ secure transactions with fund transfers, transaction history, and balance management. It includes JWT authentication, OTP verification, and insightful dashboards for spending analytics.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    demo: "https://pay-swift-frontend.vercel.app/",
    github: "https://github.com/Balu2200/Digital_Wallet_System_Frontend",
  },
  {
    name: "ConnectNow (Social Networking Application)",
    description:
      "ConnectNow is a full-stack social networking platform enabling 500+ users to discover and connect through personalized feeds. It supports real-time chat using Socket.io, efficient connection request handling, and an AI-powered chatbot using Langchain for customer support.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    demo: "https://connect-now-frontend.vercel.app/",
    github: "https://github.com/Balu2200/ConnectNow_Frontend",
  },
  {
    name: "Proctoring Analysis",
    description:
      "Developed an AI-powered video proctoring system detecting real-time exam anomalies. Used for hackathon-winning project at IIT Kharagpur.",
    tags: ["Python", "OpenCV", "AI"],
    demo: "https://proctoring-analysis.vercel.app/",
    github: "https://github.com/Balu2200/Video_Proctorer",
  },
  {
    name: "Cuisine Finder",
    description:
      "Cuisine Finder is a food discovery platform with real-time search and personalized recommendations.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    demo: "https://food-app-frontend-pearl.vercel.app/",
    github: "https://github.com/Balu2200/Food-app-Frontend",
  },
];


const scaleX = 1;

const form = { current: null };
const sendEmail = (e) => {
  e.preventDefault();
};
const loading = false;
const error = null;


const mlAiSkills = [
  { name: "Python", cssName: "python"},
  { name: "NumPy", cssName: "numpy" },
  { name: "Pandas", cssName: "pandas" },
  { name: "Matplotlib", cssName: "matplotlib" },
  { name: "OpenCV", cssName: "opencv" },
  { name: "TensorFlow", cssName: "tensorflow" },
  { name: "Scikit-learn", cssName: "scikit-learn" },
  { name: "Streamlit", cssName: "streamlit" },
  { name: "Flask", cssName: "flask" },
  { name: "Machine Learning", cssName: "machine-learning" },
  { name: "Deep Learning", cssName: "deep-learning" },
  { name: "Generative AI", cssName: "generative-ai" },
];

function App() {
  // Handle menu link click (close menu on mobile)
  const handleMenuLinkClick = () => setMenuOpen(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset"; 
    };
  }, [menuOpen]);

  
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore quota or privacy errors */
    }
  }, [theme]);

  useEffect(() => {
    const sections = ["Home", "About", "Projects", "CodingProfiles", "Contact"];
    const observers = [];
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          document
            .querySelectorAll("nav a")
            .forEach((a) => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let px = 0,
      py = 0;
    let targetX = 0,
      targetY = 0;
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = e.clientX - cx;
      targetY = e.clientY - cy;
      if (!raf) tick();
    };
    const tick = () => {
      px += (targetX - px) * 0.08;
      py += (targetY - py) * 0.08;
      const root = document.documentElement;
      root.style.setProperty("--pxA", `${px}px`);
      root.style.setProperty("--pyA", `${py}px`);
      root.style.setProperty("--pxB", `${px}px`);
      root.style.setProperty("--pyB", `${py}px`);
      raf =
        Math.abs(targetX - px) > 0.5 || Math.abs(targetY - py) > 0.5
          ? requestAnimationFrame(tick)
          : 0;
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={style.app}>
      <motion.div className={style["progress-bar"]} style={{ scaleX }} />

      {/* Navbar */}
      <motion.nav
        className={style.nav}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
      >
        <motion.a
          href="#Home"
          className={style.logo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMenuLinkClick}
        >
          <h5>Balu Pasumarthi</h5>
        </motion.a>
        <ul className={style["desktop-nav"]}>
          {["Home", "About"].map((item) => (
            <motion.li
              key={item}
              variants={itemVariant}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href={`#${item}`}>{item}</a>
            </motion.li>
          ))}
          <div style={{ display: "flex", gap: "1.5rem", marginLeft: "2.5rem" }}>
            {["CodingProfiles", "Achievements", "Projects", "Contact"].map(
              (item) => (
                <motion.li
                  key={item}
                  variants={itemVariant}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ listStyle: "none" }}
                >
                  <a href={`#${item}`}>
                    {item === "CodingProfiles"
                      ? "Coding"
                      : item === "Achievements"
                      ? "Achievements"
                      : item === "Projects"
                      ? "Projects"
                      : item === "Contact"
                      ? "Contact"
                      : item}
                  </a>
                </motion.li>
              )
            )}
          </div>
        </ul>
        <div className={style["nav-actions"]}>
          <button
            aria-label="Toggle theme"
            className={style["theme-toggle"]}
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            title={theme === "light" ? "Switch to dark" : "Switch to light"}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <div className={style["menu-icon"]}>
            <input
              id="checkbox"
              className={style.checkbox2}
              type="checkbox"
              checked={menuOpen}
              onChange={() => setMenuOpen(!menuOpen)}
            />
            <label className={style.toggle} htmlFor="checkbox">
              <div className={`${style.bars} ${style.bar4}`}></div>
              <div className={`${style.bars} ${style.bar5}`}></div>
              <div className={`${style.bars} ${style.bar6}`}></div>
            </label>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className={`${style.menu} ${menuOpen ? style.open : ""}`}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          >
            {["Home", "About"].map((item) => (
              <motion.li
                key={item}
                variants={itemVariant}
                whileHover={{ x: 10, color: "var(--primary-color)" }}
                whileTap={{ scale: 0.9 }}
              >
                <a href={`#${item}`} onClick={handleMenuLinkClick}>
                  {item}
                </a>
              </motion.li>
            ))}
            <div
              style={{ display: "flex", gap: "1.5rem", marginLeft: "2.5rem" }}
            >
              {["CodingProfiles", "Achievements", "Projects", "Contact"].map(
                (item) => (
                  <motion.li
                    key={item}
                    variants={itemVariant}
                    whileHover={{ x: 10, color: "var(--primary-color)" }}
                    whileTap={{ scale: 0.9 }}
                    style={{ listStyle: "none" }}
                  >
                    <a href={`#${item}`} onClick={handleMenuLinkClick}>
                      {item === "CodingProfiles"
                        ? "Coding"
                        : item === "Achievements"
                        ? "Achievements"
                        : item === "Projects"
                        ? "Projects"
                        : item === "Contact"
                        ? "Contact"
                        : item}
                    </a>
                  </motion.li>
                )
              )}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Contact Navigation (Side Social Links) */}
      <motion.div
        className={style["contact-nav"]}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.7, type: "spring", stiffness: 50 }}
      >
        <motion.a
          href="https://github.com/Balu2200"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <AiFillGithub />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/balupasumarthi2200/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <AiFillLinkedin />
        </motion.a>
        <motion.a
          href="https://leetcode.com/u/BALU_PASUMARTHI3/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaCode />
        </motion.a>
        <motion.a
          href="https://www.codechef.com/users/balu_47"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaLaptopCode />
        </motion.a>
        <motion.a
          href="https://takeuforward.org/plus/profile/Balu%20pasumarthi"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaBook />
        </motion.a>
      </motion.div>

      {/* Home Section */}
      <AnimatedSection id="Home" className={style.home}>
        {/* Parallax layers */}
        <div className={style.parallaxA} />
        <div className={style.parallaxB} />
        <motion.div
          className={style["home-content"]}
          variants={staggerContainerVariant} 
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariant}>
            Hi, I am <span>Balu Pasumarthi</span>
          </motion.h1>
          <motion.p variants={itemVariant}>
            A passionate B.Tech Computer Science student specializing in Data
            Structures, Machine Learning, and MERN stack development. Proven
            experience in building impactful full-stack applications and
            innovative Machine Learning models.
          </motion.p>
          <motion.div
            variants={itemVariant}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1RsRI3NnAJLSw6GpOyh-tOOfAryQHiY6h/view?usp=drive_link"
                )
              }
              style={{
                padding: "1rem 2rem",
                backgroundColor: "var(--secondary)",
                color: "#ffffff",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-md)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
                letterSpacing: "-0.2px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--secondary-dark)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "var(--secondary)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "var(--shadow-md)";
              }}
            >
              My Resume
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          className={style["scroll-icon"]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className={style.chevrons}>
            <div className={style["chevron-down"]}></div>
            <div className={style["chevron-down"]}></div>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection id="About" className={style.about}>
        <div className={style.container}>
          <h2 className={style.title}>About Me</h2>
          <p className={style["section-description"]}>
            Discover more about my journey, my approach to technology, and the
            skills I bring to the table.
          </p>
          <div className={style["about-content"]}>
            <motion.div
              className={style["about-image-container"]}
              variants={itemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={profilePhoto}
                alt="Balu Pasumarthi"
                className={style["profile-photo"]}
              />
            </motion.div>
            <motion.div className={style["about-info"]} variants={itemVariant}>
              <h3>Get to know me!</h3>
              <p>
                As a dedicated B.Tech Computer Science student at Gayatri Vidya
                Parishad, I possess a strong foundation in software engineering
                principles, with specialized expertise in Data Structures,
                Algorithms, Machine Learning, MERN stack development, and
                Generative AI.
              </p>
              <p>
                My practical skills are evidenced by a first-place victory at an
                IIT Kharagpur hackathon, where I led the development of an
                innovative AI-driven Video Proctoring Analysis system. I am
                adept at translating complex problems into robust, scalable
                full-stack applications and thrive in environments that demand
                continuous learning and practical application of technology.
              </p>
              <p>
                Key attributes include a proactive approach to problem-solving,
                a proven ability to deliver reliable results, and a
                collaborative spirit. I am eager to contribute my technical
                proficiency and commitment to innovation to a challenging and
                growth-oriented role.
              </p>
            </motion.div>
            <motion.div
              className={`${style["my-skill"]} ${style["full-width-skill-area"]}`}
              variants={itemVariant}
              style={{ gridColumn: "1 / -1" }}
            >
              <h3>My Skills</h3>
              <h4 className={style["skill-subsection-title"]}>
                Software Development
              </h4>
              <motion.div
                className={style.skills}
                variants={staggerContainerVariant}
              >
                {sdeSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`${style.skill} ${style[skill.cssName] || ""}`}
                    variants={itemVariant}
                    whileHover={{
                      y: -7,
                      backgroundColor: "var(--primary-light)",
                      color: "white",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                      scale: 1.05,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {skill.icon && (
                      <span className={style["skill-icon"]}>{skill.icon}</span>
                    )}
                    {skill.name}
                  </motion.div>
                ))}
              </motion.div>
              <h4
                className={style["skill-subsection-title"]}
                style={{ marginTop: "2rem" }}
              >
                Machine Learning & AI
              </h4>
              <motion.div
                className={style.skills}
                variants={staggerContainerVariant}
              >
                {mlAiSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`${style.skill} ${style[skill.cssName] || ""}`}
                    variants={itemVariant}
                    whileHover={{
                      y: -7,
                      backgroundColor: "var(--accent-color)",
                      color: "white",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                      scale: 1.05,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {skill.icon && (
                      <span className={style["skill-icon"]}>{skill.icon}</span>
                    )}
                    {skill.name}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Achievements Section */}
      {/* Achievements Section */}
      <AnimatedSection id="Achievements" className={style.achievements}>
        <div className={style.container}>
          <h2 className={style.title}>Honors & Achievements</h2>
          <div className={style["achievements-block"]}>
            <h3 className={style["achievements-subheading"]}>
              Competitive Programming
            </h3>
            <ul className={style["achievements-list"]}>
              <li>Top 5% in Amazon ML Challenge among 80,000+ participants</li>
              <li>
                Global Rank 1418 in ICPC Codefest among 10,000+ participants
              </li>
              <li>
                LeetCode: Achieved Knight badge with Rating 1850+ (Top 5.8%)
              </li>
              <li>CodeChef: Achieved 3 star with maximum Rating 1600+</li>
            </ul>
            <h3 className={style["achievements-subheading"]}>Hackathons</h3>
            <ul className={style["achievements-list"]}>
              <li>
                1st Place, HackTank Hackathon (Hosted by IIT Kharagpur):
                Developed AI-powered video proctoring system detecting real-time
                exam anomalies
              </li>
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="Projects" className={style.projects}>
        <div className={style.container}>
          <h2 className={style.title}>My Projects</h2>
          <p className={style["section-description"]}>
            A selection of projects that showcase my skills in web development,
            AI, and problem-solving.
          </p>
          <motion.div
            className={style["projects-list"]}
            variants={staggerContainerVariant}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.name + index}
                className={style.project}
                variants={itemVariant}
              >
                <div className={style["project-info"]}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {project.tags && (
                    <div className={style["project-tags"]}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={style["project-tag"]}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className={style["project-buttons"]}>
                    <a
                      href={project.demo}
                      className={style["project-button-link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        className={`${style["glass-btn"]} ${style["live-btn"]}`}
                      >
                        <span className={style["btn-dot"]}></span>
                        Live Demo
                      </button>
                    </a>
                    <a
                      href={project.github}
                      className={style["project-button-link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        className={`${style["glass-btn"]} ${style["github-btn"]}`}
                      >
                        <span className={style["btn-dot"]}></span>
                        GitHub
                      </button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Coding Profiles Section */}
      <AnimatedSection id="CodingProfiles" className={style.codingProfiles}>
        <div className={style.container}>
          <h2 className={style.title}>Coding Profiles</h2>
          <div className={style["coding-badges-grid"]}>
            {/* LeetCode */}
            <div className={style["coding-badge"]}>
              <div className={style["badge-header"]}>
                <img
                  src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
                  alt="LeetCode"
                  className={style["badge-logo"]}
                />
                <span className={style["badge-title"]}>LeetCode</span>
              </div>
              <div className={style["badge-body"]}>
                <span className={style["badge-rank leetcode"]}>Knight</span>
                <span className={style["badge-stat"]}>
                  <b>1850+</b> Rating
                </span>
                <span className={style["badge-stat"]}>Top 5.8%</span>
                <a
                  href="https://leetcode.com/u/BALU_PASUMARTHI3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style["badge-link"]}
                >
                  Profile →
                </a>
              </div>
            </div>
            {/* CodeChef */}
            <div className={style["coding-badge"]}>
              <div className={style["badge-header"]}>
                <img
                  src="https://cdn.codechef.com/images/cc-logo.svg"
                  alt="CodeChef"
                  className={style["badge-logo"]}
                />
                <span className={style["badge-title"]}>CodeChef</span>
              </div>
              <div className={style["badge-body"]}>
                <span className={style["badge-rank codechef"]}>3★</span>
                <span className={style["badge-stat"]}>
                  <b>1600+</b> Max Rating
                </span>
                <a
                  href="https://www.codechef.com/users/balu_47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style["badge-link"]}
                >
                  Profile →
                </a>
              </div>
            </div>
            {/* TakeUForward */}
            <div className={style["coding-badge"]}>
              <div className={style["badge-header"]}>
                <img
                  src="https://takeuforward.org/wp-content/uploads/2021/10/cropped-takeUforward-logo-1-192x192.png"
                  alt="TakeUForward"
                  className={style["badge-logo"]}
                />
                <span className={style["badge-title"]}>TakeUForward</span>
              </div>
              <div className={style["badge-body"]}>
                <span className={style["badge-rank tuf"]}>Active Learner</span>
                <span className={style["badge-stat"]}>Focus: DSA</span>
                <a
                  href="https://takeuforward.org/plus/profile/Balu%20pasumarthi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style["badge-link"]}
                >
                  Profile →
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="Contact" className={style.contact}>
        <div className={style.container}>
          <h2 className={style.title}>Get In Touch</h2>
          <p className={style["section-description"]}>
            Have a project in mind or just want to connect? Feel free to reach
            out!
          </p>

          <motion.form
            ref={form}
            onSubmit={sendEmail}
            variants={itemVariant}
            className={loading ? style["form-loading"] : ""}
          >
            <InputField
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
            />
            <InputField
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
            />
            <TextAreaField name="message" placeholder="Your Message" required />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "1rem 2rem",
                  backgroundColor: loading
                    ? "var(--neutral-300)"
                    : "var(--accent)",
                  color: "#ffffff",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "all 0.25s",
                  boxShadow: loading ? "none" : "var(--shadow-md)",
                }}
                onMouseOver={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = "var(--accent-dark)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "var(--shadow-lg)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = "var(--accent)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "var(--shadow-md)";
                  }
                }}
              >
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <RiSendPlaneFill size={20} />
                    Send Message
                  </>
                )}
              </button>
            </motion.div>

            {error && (
              <motion.p
                className={style["form-error-message"]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}
          </motion.form>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className={style.footer}>
        <div className={style.container}>
          <div className={style["footer-info"]}>
            <motion.div variants={itemVariant}>
              <h3>Balu Pasumarthi</h3>
              <p>
                Ambitious Computer Science student crafting innovative digital
                experiences with a focus on full-stack development and Machine
                Learning.
              </p>
            </motion.div>
            <motion.div className={style.social} variants={itemVariant}>
              <h3>Connect With Me</h3>
              <div>
                <a
                  href="https://github.com/Balu2200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/balupasumarthi2200/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin />
                </a>
              </div>
              <p style={{ marginTop: "1rem" }}>
                <a href="mailto:balupasumarthi1@gmail.com">
                  balupasumarthi1@gmail.com
                </a>
              </p>
            </motion.div>
          </div>
          <motion.div className={style["copy-right"]} variants={itemVariant}>
            <span>
              &copy; {new Date().getFullYear()} Balu Pasumarthi. All rights
              reserved.
            </span>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
