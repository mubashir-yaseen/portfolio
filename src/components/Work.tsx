import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";

const projects = [
  {
    title: "RAG chatbot for PSX Financial Document QA & Market Analytics",
    category: "Finance AI",
    tools: "Llama 3, FAISS, BM25, Transformers",
    description: "Designed a financial QA system for PSX disclosures and reports, delivering sub-second answers over messy tables and fragmented layouts.",
    links: [
      { label: "Github", url: "https://github.com/mubashir-yaseen/RAG_chatbot/tree/main" },
      { label: "WebApp", url: "https://ragchatbot-elm73jvswqd5mh22xofhwy.streamlit.app/" },
    ],
    image: "/project-screenshots/1.png",
  },
  {
    title: "Automated Long-Format AI Video Generation Pipeline",
    category: "Media Automation",
    tools: "n8n, Supabase, ElevenLabs, OpenRouter, Pollinations",
    description: "Automated long-format video generation from prompts, reducing media production latency by 90% with parallel voice and image workflows.",
    links: [
      { label: "Github", url: "https://placeholder" },
      { label: "Deployment", url: "https://placeholder" },
    ],
    image: "/project-screenshots/2.png",
  },
  {
    title: "Supply Chain Analytics & Predictive Optimization App",
    category: "Logistics Intelligence",
    tools: "Streamlit, Random Forest, Plotly, Pandas",
    description: "Built an analytics app with revenue prediction, inventory simulation, and cost optimization for supply chain decision-making.",
    links: [
      { label: "Source Code", url: "https://huggingface.co/spaces/mubashir1234321/supply-chain-analytics/tree/main" },
      { label: "Live Demo", url: "https://huggingface.co/spaces/mubashir1234321/supply-chain-analytics" },
    ],
    image: "/project-screenshots/3.png",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                width: `${projects.length * 100}%`,
                transform: `translateX(-${(currentIndex * 100) / projects.length}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div
                  className="carousel-slide"
                  key={index}
                  style={{ width: `${100 / projects.length}%`, minWidth: 'auto', flexBasis: `${100 / projects.length}%` }}
                >
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Overview</span>
                          <p>{project.description}</p>
                        </div>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <div className="carousel-tools" style={{display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap"}}>
                          {project.links.map((link, j) => (
                            <a key={j} href={link.url} target="_blank" data-cursor="disable" style={{padding: "5px 15px", borderRadius: "20px", border: "1px solid var(--accentColor)", color: "var(--accentColor)", textDecoration: "none", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px", transition: "0.3s"}}>
                              {link.label} <MdArrowOutward />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
