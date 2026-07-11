import "./styles/TechStack.css";

const techNames = [
  "Python",
  "R",
  "SQL",
  "DAX",
  "AWS",
  "NoSQL",
  "MongoDB",
  "Power BI",
  "Jupyter",
  "Random Forest",
  "CatBoost",
  "Logistic Regression",
  "Rpart",
  "data.table",
  "JSON",
  "PySpark",
  "REST",
  "Pandas",
  "Numpy",
  "Plotly",
  "Bash",
  "CRON",
  "Regex",
  "Rstudio",
  "MySQL",
  "PostgreSQL",
  "MS Office",
  "Fabrics",
  "Data transformation",
  "Star Schema",
  "Feature Engineering",
  "JSON Parsing",
  "MLOps",
  "A/B Testing",
  "KPI Tracking",
  "GitHub",
  "Antigravity",
  "Cursor",
  "Claude Code",
  "LLMs",
  "API",
  "Stable Diffusion",
  "Qwen",
  "FLUX",
  "Z-Image",
  "LTX",
  "Wan",
  "ComfyUI",
  "CI/CD",
  "Agentic AI",
  "Automation",
  "Gradient Boosting",
  "Decision Trees",
  "Time Series",
  "ggplot2",
  "Shell scripting",
];

const iconMap: Record<string, string> = {
  Python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  R: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  Jupyter:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
  JSON: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg",
  Pandas:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  Numpy:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  Plotly:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/plotly/plotly-original.svg",
  Bash: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  Rstudio:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rstudio/rstudio-original.svg",
  MySQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  PostgreSQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  GitHub:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
};

const TechStack = () => {
  return (
    <section className="techstack section-container" aria-labelledby="techstack-heading">
      <h2 id="techstack-heading">My Techstack</h2>

      <div className="techstack-body">
        <h3 className="techstack-subtitle">All skills &amp; technologies</h3>
        <ul className="techstack-chips">
          {techNames.map((name) => (
            <li key={name} className="techstack-chip">
              {iconMap[name] ? (
                <img
                  src={iconMap[name]}
                  alt=""
                  className="techstack-chip-icon"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TechStack;
