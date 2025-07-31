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
import cv from "../assets/files/cv.pdf";

// import icons
import { AiFillGithub, AiFillLinkedin, AiOutlineEye } from "react-icons/ai";
import { FaCode, FaLaptopCode, FaBook } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
// Import other skill icons as needed, e.g.:
// import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaJava, FaPython } from "react-icons/fa";
// import { SiMongodb, SiMysql, SiExpress } from "react-icons/si";

//import images
import foodapp from "../assets/images/foodapp.png";
import chat from "../assets/images/chat.png";
import payswift from "../assets/images/payswift.png";
import proctorer from "../assets/images/proctorer.png";
import ipl from "../assets/images/ipl.png";
import profilePhoto from "../assets/images/profile_photo.jpg";

// import style
import style from "./App.module.css";

const sdeSkills = [
  { name: "HTML 5", cssName: "html" /* icon: <FaHtml5 /> */ },
  { name: "CSS 3", cssName: "css" /* icon: <FaCss3Alt /> */ },
  { name: "JavaScript", cssName: "java-script" /* icon: <FaJsSquare /> */ },
  { name: "ReactJs", cssName: "react" /* icon: <FaReact /> */ },
  { name: "NodeJs", cssName: "nodejs" /* icon: <FaNodeJs /> */ },
  { name: "Express", cssName: "express" /* icon: <SiExpress /> */ },
  { name: "MongoDB", cssName: "mongodb" /* icon: <SiMongodb /> */ },
  { name: "MySQL", cssName: "mysql" /* icon: <SiMysql /> */ },
  { name: "Git", cssName: "git" /* icon: <FaGitAlt /> */ },
  { name: "Java", cssName: "java" /* icon: <FaJava /> */ },
  { name: "C", cssName: "c-lang" }, // Changed cssName for C
  { name: "Problem Solving", cssName: "problem-solving" },
  { name: "Data Structures", cssName: "data-structures" },
  { name: "Algorithms", cssName: "algorithms" },
];

const mlAiSkills = [
  { name: "Python", cssName: "python" /* icon: <FaPython /> */ },
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

const projects = [
  {
    name: "PaySwift",
    link: "https://pay-swift-frontend.vercel.app/",
    github: "https://github.com/Balu2200/PaySwift-Frontend",
    description:
      "A full-stack MERN payment app with Tailwind CSS, enabling money transfers, account management, transaction history, scheduled payments, and an AI chatbot.",
    image: payswift,
    tags: ["React", "Node.js", "MongoDB", "Express", "AI"],
  },
  {
    name: `Exam Proctoring (1st Place Winner)`, 
    link: "https://youtu.be/ljOCpotcnd0",
    github: "https://github.com/Balu2200/Video_Proctorer",
    description:
      "AI-powered video proctoring system for exam integrity, using MediaPipe & YOLOv4 for real-time monitoring. Features facial landmark detection, object identification, and a Tkinter GUI.",
    image: proctorer,
    tags: ["AI", "Python", "MediaPipe", "YOLOv4", "Tkinter"],
  },
  {
    name: "Food App",
    link: "https://food-app-frontend-pearl.vercel.app/",
    github: "https://github.com/Balu2200/BiteBuddy-Food-App",
    description:
      "MERN stack food discovery app allowing users to search restaurants by name, location, or image uploads, with a dynamic feed of trending options.",
    image: foodapp,
    tags: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    name: "IPL Winning Predictor",
    link: "https://iplwinningprobabilityprediction-ms8ltqzzcraey5jbrrwztu.streamlit.app/",
    github: "https://github.com/Balu2200/IPL_winning_probability_prediction",
    description:
      "Streamlit web app predicting IPL match outcomes using real-time data and ML models. Features player stats, match metrics, and visualizations.",
    image: ipl,
    tags: ["Python", "Streamlit", "Machine Learning"],
  },
  {
    name: "Chat with Docs",
    link: "https://github.com/Balu2200/Chat_with_PDFs", // Update if this is the correct demo link
    github: "https://github.com/Balu2200/Chat_with_PDFs",
    description:
      "Interactive Streamlit app for uploading multiple PDFs and engaging in conversational Q&A using NLP and vector search for contextually relevant responses.",
    image: chat,
    tags: ["Python", "Streamlit", "NLP", "AI"],
  },
];

// Animation Variants
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Helper component for animating sections on scroll
const AnimatedSection = ({ children, className, id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      variants={sectionVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
};

function App() {
  const form = useRef();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120, // Slightly stiffer for a quicker response
    damping: 35,
    restDelta: 0.001,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(""); 

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailSent(false);

    emailjs
      .sendForm(
        "service_gjbmeus", 
        "template_qk6p0pa", 
        form.current,
        "HDMwz57k3xrihLg4J" 
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset(); // Clear form fields
          setLoading(false);
          setEmailSent(true);
          setTimeout(() => setEmailSent(false), 4000); // Hide message after 4s
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
          // Optionally: show an error message to the user
        }
      );
  };

  // Close menu when a link is clicked
  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset"; // Cleanup on unmount
    };
  }, [menuOpen]);

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
          {" "}
          {/* For desktop nav items */}
          {["Home", "About", "Projects", "Contact"].map((item) => (
            <motion.li
              key={item}
              variants={itemVariant}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href={`#${item}`}>{item}</a>
            </motion.li>
          ))}
        </ul>
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
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <motion.li
                key={item}
                variants={itemVariant} // Reuse item variant for consistency
                whileHover={{ x: 10, color: "var(--primary-color)" }}
                whileTap={{ scale: 0.9 }}
              >
                <a href={`#${item}`} onClick={handleMenuLinkClick}>
                  {item}
                </a>
              </motion.li>
            ))}
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
        <motion.div
          className={style["home-content"]}
          variants={staggerContainerVariant} // Apply stagger to children
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1uATkkLbCsDJbjoYkTDkdo043zL8p4EeL/view?usp=drive_link"
                )
              }
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                transition: "background-color 0.3s",
                border: "none",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
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
              variants={itemVariant} // You can create a specific variant if needed
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
              {" "}
              {/* Make skills span full width below image and text */}
              <h3>My Skills</h3>
              {/* SDE Skills Section */}
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
              {/* ML/AI Skills Section */}
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
                key={project.name + index} // Ensure unique key
                className={style.project}
                variants={itemVariant}
                // whileHover effect is handled by CSS for transform, JS for other potential interactions
              >
                <div className={style["project-image"]}>
                  <img src={project.image} alt={project.name} />
                </div>
                <div className={style["project-info"]}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {/* Optional: Add project tags here */}
                  {/* <div className={style["project-tags"]}>
                    {project.tags && project.tags.map(tag => <span key={tag} className={style.tag}>{tag}</span>)}
                  </div> */}
                  <div className={style["project-buttons"]}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={style["project-button-link"]}
                    >
                      <IconButton>Link</IconButton>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={style["project-button-link"]}
                    >
                      <IconButton>GitHub</IconButton>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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

            <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.95 }}>
              <button type="submit" disabled={loading}>
                {loading ? (
                  <Loader />
                ) : (
                  <span className={style["submit-button-content"]}>
                    <RiSendPlaneFill style={{ marginRight: "8px" }} />
                    Send Message
                  </span>
                )}
              </button>
            </motion.div>

            {emailSent && (
              <motion.p
                className={style["form-success-message"]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✅ Your message has been sent successfully!
              </motion.p>
            )}

            {error && (
              <motion.p
                className={style["form-error-message"]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ❌ {error}
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
                {/* Add more social links if needed */}
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
