import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  const handleClickTarget = (index: number) => {
    const container = containerRef.current[index];
    if (container) {
      handleClick(container);
    }
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
        }
      });
    }
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
            onClick={() => handleClickTarget(0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI/ML ENGINEER</h3>
              <h4>Predictive Modeling & Automations</h4>
              <p>
                Spearheading AI initiatives and MLOps pipelines. From deploying ML based models, to automating real-time workflows by employing Agentic and Generative AI
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">PySpark</div>
                <div className="what-tags">Random Forest</div>
                <div className="what-tags">CatBoost</div>
                <div className="what-tags">Logistic Regression</div>
                <div className="what-tags">Rpart</div>
                <div className="what-tags">Gradient Boosting</div>
                <div className="what-tags">Decision Trees</div>
                <div className="what-tags">Time Series</div>
                <div className="what-tags">Feature Engineering</div>
                <div className="what-tags">MLOps</div>
                <div className="what-tags">LLMs</div>
                <div className="what-tags">Stable Diffusion</div>
                <div className="what-tags">Qwen</div>
                <div className="what-tags">FLUX</div>
                <div className="what-tags">Z-Image</div>
                <div className="what-tags">LTX</div>
                <div className="what-tags">Wan</div>
                <div className="what-tags">ComfyUI</div>
                <div className="what-tags">CI/CD</div>
                <div className="what-tags">Agentic AI</div>
                <div className="what-tags">Automation</div>
                <div className="what-tags">API</div>
                <div className="what-tags">REST</div>
                <div className="what-tags">Cursor</div>
                <div className="what-tags">Claude Code</div>
                <div className="what-tags">Antigravity</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
            onClick={() => handleClickTarget(1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DATA SCIENTIST</h3>
              <h4>Insights, ETL & Visualizations</h4>
              <p>
                Transforming databases into actionable insights. Building automated data cleaning, transformation, ETL pipelines and interactive analytical dashboards.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">R</div>
                <div className="what-tags">SQL</div>
                <div className="what-tags">DAX</div>
                <div className="what-tags">Power BI</div>
                <div className="what-tags">Pandas</div>
                <div className="what-tags">Numpy</div>
                <div className="what-tags">data.table</div>
                <div className="what-tags">AWS</div>
                <div className="what-tags">NoSQL</div>
                <div className="what-tags">MongoDB</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">Jupyter</div>
                <div className="what-tags">Rstudio</div>
                <div className="what-tags">Plotly</div>
                <div className="what-tags">ggplot2</div>
                <div className="what-tags">JSON</div>
                <div className="what-tags">JSON Parsing</div>
                <div className="what-tags">Star Schema</div>
                <div className="what-tags">Data transformation</div>
                <div className="what-tags">A/B Testing</div>
                <div className="what-tags">KPI Tracking</div>
                <div className="what-tags">Regex</div>
                <div className="what-tags">Bash</div>
                <div className="what-tags">Shell scripting</div>
                <div className="what-tags">CRON</div>
                <div className="what-tags">GitHub</div>
                <div className="what-tags">MS Office</div>
                <div className="what-tags">Fabrics</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
