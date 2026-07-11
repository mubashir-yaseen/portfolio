import "./styles/Career.css";

function DateRange({
  startMonth,
  startYear,
  endMonth,
  endYear,
}: {
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
}) {
  return (
    <div className="career-date" aria-label={`${startMonth} ${startYear} to ${endMonth} ${endYear}`}>
      <div className="career-date-range">
        <div className="career-date-point">
          <span className="career-year">{startYear}</span>
          <span className="career-month">{startMonth}</span>
        </div>
        <span className="career-date-sep" aria-hidden="true">
          –
        </span>
        <div className="career-date-point">
          <span className="career-year">{endYear}</span>
          <span className="career-month">{endMonth}</span>
        </div>
      </div>
    </div>
  );
}

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Scientist</h4>
                <h5>Pakistan Petroleum Limited (PPL)</h5>
              </div>
              <DateRange
                startMonth="2025"
                startYear="2025"
                endMonth="Present"
                endYear="Present"
              />
            </div>
            <p>
              Manage corporate data workflows, write optimized SQL queries, and extract insights from millions of raw records.
              Built 3D-CNN seismic models for hydrocarbon prediction, deployed forecast pipelines, and reduced KPI reporting time by 45%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI/ML Engineer</h4>
                <h5>Iqra University & Greenwich University</h5>
              </div>
              <DateRange
                startMonth="2022"
                startYear="2022"
                endMonth="2025"
                endYear="2025"
              />
            </div>
            <p>
              Built a RAG chatbot with Llama 3 and FAISS, automated document workflows, and deployed a multi-document summarization app.
              Mentored students and led AI workshops covering OCR, feature engineering, model tracking, and production deployment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Officer</h4>
                <h5>NUST Power & Research Lab</h5>
              </div>
              <DateRange
                startMonth="2020"
                startYear="2020"
                endMonth="2021"
                endYear="2021"
              />
            </div>
            <p>
              Built a fault-detection model for grid transformers and automated sensor ingestion pipelines linked to Power BI dashboards.
              Improved anomaly detection accuracy and delivered research-grade industrial data validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
