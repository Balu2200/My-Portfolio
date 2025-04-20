import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// import components
import DownloadButton from "../common/components/DownloadButton/DownloadButton";
import IconButton from "../common/components/IconButton/IconButton";
import InputField from "../common/components/InputField/InputField";
import TextAreaField from "../common/components/TextAreaField/TextAreaField";
import SubmitButton from "../common/components/SubmitButton/SubmitButton";
import Loader from "../common/components/Loader/Loader";
import cv from "../assets/files/cv.pdf";

// import icons
import { FaReact } from "react-icons/fa";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillHtml5,
  AiOutlineEye,
} from "react-icons/ai";
import { FaCode, FaLaptopCode, FaBook } from "react-icons/fa";
import {
  BiLogoGmail,
  BiLogoCss3,
  BiLogoJavascript,
  BiLogoRedux,
  BiLogoJava,
} from "react-icons/bi";
import { BsFacebook, BsGit, BsPuzzle } from "react-icons/bs";
import { TbBrandCpp } from "react-icons/tb";
import { FaMobileAlt } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { SiTypescript, SiRecoil, SiReactquery } from "react-icons/si";

//import images
import foodapp from "../assets/images/foodapp.png";
import chat from "../assets/images/chat.png";
import payswift from "../assets/images/payswift.png";
import proctorer from "../assets/images/proctorer.png";
import ipl from "../assets/images/ipl.png";

// import style
import style from "./App.module.css";
import clsx from "clsx";

const skills = [
  {
    name: "HTML 5",
    cssName: "html",
  },
  {
    name: "CSS 3",
    cssName: "css",
  },
  {
    name: "Java Script",
    cssName: "java-script",
  },
  {
    name: "ReactJs",
    cssName: "react",
  },
  {
    name: "NodeJs",
    cssName: "react",
  },
  {
    name: "Express",
    cssName: "react",
  },
  {
    name: "MongoDb",
    cssName: "react",
  },
  {
    name: "MySQL",
    cssName: "react",
  },

  {
    name: "Git",
    cssName: "git",
  },
  {
    name: "java",
    cssName: "java",
  },
  {
    name: "python",
    cssName: "java",
  },
  {
    name: "c",
    cssName: "java",
  },
  {
    name: "Problem Solving",
    cssName: "problem-solving",
  },
  {
    name: "Data Structures",
    cssName: "problem-solving",
  },
  {
    name: "Algorithms",
    cssName: "problem-solving",
  },
];

const projects = [
  {
    name: "PaySwift",
    link: "https://youtu.be/B59wr91VqMA",
    github: "https://github.com/Balu2200/PaySwift-Frontend",
    description:
      "This is a full-stack Payment web application built using the MERN (MongoDB, Express, React, Node.js) stack with Tailwind CSS for styling. The platform enables users to transfer money, manage accounts, view transaction history, schedule automatic payments, and interact with an AI-powered chatbot for assistance.",
    image: payswift,
  },
  {
    name: `Exam Proctoring`,
    link: "https://youtu.be/ljOCpotcnd0",
    github: "https://github.com/Balu2200/Video_Proctorer",
    description:
      "AI-Powered Video Proctoring System – IIT Kharagpur HackTank Hackathon (1st Place Winner) Developed an intelligent video proctoring solution designed to uphold exam integrity during remote assessments. Leveraged MediaPipe for facial landmark detection and YOLOv4 for real-time object detection, enabling accurate monitoring of candidates. The system tracks eye movements, head orientation, and mouth activity, while also identifying prohibited objects in the environment. A Tkinter-based GUI was built to offer a user-friendly interface for seamless operation. The project secured 1st place at the prestigious IIT Kharagpur HackTank hackathon.",
    image: proctorer,
  },
  {
    name: "Chat with Docs",
    link: "https://ibrahimhiarea.github.io/Soko-Number/",
    github: "https://github.com/Balu2200/Chat_with_PDFs",
    description:
      "Chat with MultiPDFs is an interactive Streamlit-based web application designed to enable users to upload multiple PDF documents, process their content, and engage in a conversational question-answering experience. The application leverages advanced natural language processing (NLP) and vector search technologies to provide accurate and contextually relevant responses based on the uploaded documents.",
    image: chat,
  },
  {
    name: "IPL Winning Predictor",
    link: "https://iplwinningprobabilityprediction-ms8ltqzzcraey5jbrrwztu.streamlit.app/",
    github: "https://github.com/Balu2200/IPL_winning_probability_prediction",
    description:
      "The IPL Win Predictor is a Streamlit web app that predicts a cricket team's winning probability in an IPL match using real-time data like scores, overs, wickets, and player stats. Users choose from machine learning models (e.g., Logistic Regression, Random Forest) for predictions and view player statistics, match metrics, and visualizations like progress bars and charts, creating an engaging experience for cricket fans.",
    image: ipl,
  },
  {
    name: "Food App",
    link: "https://youtu.be/n7OfJ2h7G3c",
    github: "https://github.com/Balu2200/FoodApp",
    description:
      "The MERN Food App is a dynamic web application built with MongoDB, Express.js, React, and Node.js, offering a seamless food discovery experience. Users can search restaurants by name, ID, location (using latitude/longitude), or by uploading images of restaurants, and explore a vibrant home page feed featuring trending restaurants and dishes. With a responsive UIand robust backend,  it’s perfect for food lovers seeking nearby dining options.",
    image: foodapp,
  },
];

function App() {
  const form = useRef();

  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(function () {
      emailjs
        .sendForm(
          "service_gjbmeus",
          "template_qk6p0pa",
          form.current,
          "HDMwz57k3xrihLg4J"
        )
        .then((result) => {
          e.target.name.value = "";
          e.target.email.value = "";
          e.target.message.value = "";
        });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={style.app}>
      {/* Navbar */}
      <div className={style.nav}>
        <a className={style.logo}>
          <h5>Balu Pasumarthi</h5>
        </a>
        <ul>
          <li>
            <a href="#Home">Home</a>
          </li>
          <li>
            <a href="#About">About</a>
          </li>
          <li>
            <a href="#Projects">Projects</a>
          </li>
          <li>
            <a href="#Contact">Contact</a>
          </li>
        </ul>
        <div className={style["menu-icon"]}>
          <input id="checkbox" className={style["checkbox2"]} type="checkbox" />
          <label
            className={`${style.toggle} ${style.toggle2}`}
            for="checkbox"
            onClick={() => setMenu(!menu)}
          >
            <div className={`${style.bars} ${style.bar4}`}></div>
            <div className={`${style.bars} ${style.bar5}`}></div>
            <div className={`${style.bars} ${style.bar6}`}></div>
          </label>
        </div>
      </div>
      {menu === true && (
        <ul className={style.menu}>
          <li>
            <a href="#Home">Home</a>
          </li>
          <li>
            <a href="#About">About</a>
          </li>
          <li>
            <a href="#Projects">Projects</a>
          </li>
          <li>
            <a href="#Contact">Contact</a>
          </li>
        </ul>
      )}
      {/* Home */}
      <div id="Home" className={style.home}>
        <div className={style["home-content"]}>
          <h1>Hi, I am Balu Pasumarthi</h1>
          <p>
            Balu Pasumarthi, a B.Tech Computer Science student, excels in Data
            Structures, Machine Learning and MERN stack development, with
            experience in building full-stack applications and Machine Learning
            models.
          </p>
          <a
            href={cv}
            download="cv-PDF-document"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DownloadButton>Download CV</DownloadButton>
          </a>
        </div>
        <div className={style["scroll-icon"]}>
          <div
            className={style["scroll-down"]}
            style={{ color: "skyblue !important" }}
          >
            <div className={style.chevrons}>
              <div className={style["chevron-down"]}></div>
              <div className={style["chevron-down"]}></div>
            </div>
          </div>
        </div>
        <div className={style["contact-nav"]}>
          <a
            className={style.github}
            target="_blank"
            href="https://github.com/Balu2200"
          >
            <AiFillGithub size="30px" color="black" />
          </a>
          <a
            className={style.linkedin}
            target="_blank"
            href="https://www.linkedin.com/in/balupasumarthi2200/"
          >
            <AiFillLinkedin size="30px" color="black" />
          </a>
          <a
            className={style.linkedin}
            target="_blank"
            href="https://leetcode.com/u/BALU_PASUMARTHI3/"
          >
            <FaCode size="30px" color="black" />
          </a>
          <a
            className={style.linkedin}
            target="_blank"
            href="https://www.codechef.com/users/balupasumarthi"
          >
            <FaLaptopCode size="30px" color="black" />
          </a>
          <a
            className={style.linkedin}
            target="_blank"
            href="https://takeuforward.org/plus/profile/Balu%20pasumarthi"
          >
            <FaBook size="30px" color="black" />
          </a>
        </div>
      </div>
      {/* About */}
      <div id="About" className={style.about}>
        <div className={style.container}>
          <h2 className={style.title}>About Me</h2>
          <p>
            Here you will find more information about me, what I do, and my
            current skills mostly in terms of programming and technology
          </p>
          <div className={style["about-content"]}>
            <div className={style["about-info"]}>
              <h3>Get to know me!</h3>
              <p>
                I'm Balu Pasumarthi, a B.Tech Computer Science student at
                Gayatri Vidya Parishad with a passion for problem-solving, Data
                Structures, Machine Learning, MERN stack development,
                GenerativeAI. I recently won first place at an IIT Kharagpur
                hackathon for creating an AI-based Video Proctoring Analysis
                system to detect cheating. I have hands-on experience in
                building full-stack applications and enjoy working on real-world
                projects. My strengths include punctuality, reliability,
                teamwork, and a strong commitment to learning and innovation.
                Excited to apply my skills to new challenges!
              </p>
            </div>
            <div className={style["my-skill"]}>
              <h3>My Skills</h3>
              <div className={style.skills}>
                {skills.map((skill, index) => {
                  return (
                    <div
                      key={`skill${index}`}
                      className={`${style.skill} ${style[skill.cssName]}`}
                    >
                      <div className={style["skill-name"]}>{skill.name}</div>
                      <div className={style["skill-icon"]}>{skill.icon}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Projects */}
      <div id="Projects" className={style.projects}>
        <div className={style.container}>
          <h2 className={style.title}>Projects</h2>
          <p>
            Here you will find some of the personal projects in Web-Development,
            Machine Learning
          </p>
          <div className={style["projects-list"]}>
            {projects.map((project, index) => {
              return (
                <div key={`project${index}`} className={style.project}>
                  <div className={style["project-image"]}>
                    <img src={project.image} alt="Project Image" />
                  </div>
                  <div className={style["project-info"]}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className={style["project-buttons"]}>
                      <IconButton
                        width="170px"
                        height="50px"
                        backgroundColor="var(--primary-main)"
                        color="white"
                        link={project.link}
                        icon={<AiOutlineEye size="25px" color="white" />}
                      >
                        Live Demo
                      </IconButton>
                      <IconButton
                        width="100px"
                        height="50px"
                        backgroundColor="black"
                        color="white"
                        link={project.github}
                        icon={<AiFillGithub size="25px" color="white" />}
                      >
                        Github
                      </IconButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Contact */}
      <div id="Contact" className={style.contact}>
        <div className={style.container}>
          <h2 className={style.title}>Contact</h2>
          <p>
            Feel free to Contact me by submitting the form below and I will get
            back to you as soon as possible
          </p>
          <form
            ref={form}
            onSubmit={sendEmail}
            className={clsx({ [style["inactive-form"]]: loading })}
          >
            <InputField
              width="700px"
              height="40px"
              name="name"
              placeholder="Enter Your Name"
              label="Name"
              type="text"
            />
            <InputField
              width="700px"
              height="40px"
              name="email"
              placeholder="Enter Your Email"
              label="Email"
              type="email"
            />
            <TextAreaField
              width="700px"
              height="250px"
              name="message"
              placeholder="Enter Your Message"
              label="Message"
              type="text"
            />
            <SubmitButton
              icon={<RiSendPlaneFill size="20px" color="white" />}
              width="200px"
              height="60px"
              color="white"
              backgroundColor="var(--primary-main)"
            >
              Submit
            </SubmitButton>
            {loading && (
              <div className={style.loader}>
                <Loader />
              </div>
            )}
          </form>
        </div>
      </div>
      {/* footer */}
      <div className={style.footer}>
        <div className={style.container}>
          <div className={style["footer-info"]}>
            <div>
              <h3>Balu Pasumarthi</h3>
              <p>
                Balu Pasumarthi, a B.Tech Computer Science student, very good at
                Data Structures Machine Learning and MERN stack development,
                with experience in building full-stack applications.
              </p>
            </div>
            <div className={style.social}>
              <h3>Social</h3>
              <div className="">
                <a
                  className={style.git}
                  target="_blank"
                  href="https://github.com/Balu2200"
                >
                  <AiFillGithub size="30px" color="white" />
                </a>
                <a
                  className={style.linkedin}
                  target="_blank"
                  href="https://www.linkedin.com/in/balupasumarthi2200/"
                >
                  <AiFillLinkedin size="30px" color="white" />
                </a>
                <a href="mailto:balupasumarthi1@gmail.com">
                  balupasumarthi1@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
