import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:mubashiryaseen@hotmail.com" data-cursor="disable">
                mubashiryaseen@hotmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>+92-312-2029878</p>
            <h4>Location</h4>
            <p>Karachi, Pakistan</p>
            <h4>Education</h4>
            <div style={{display: "flex", flexDirection: "column", gap: "10px", marginTop: "5px"}}>
              <div>
                <p style={{fontWeight: 400, margin: 0}}>Master of Science, Artificial Intelligence</p>
                <p style={{fontSize: "13px", opacity: 0.7, margin: 0}}>NED University of Engineering & Technology | 2025 - Present</p>
              </div>
              <div>
                <p style={{fontWeight: 400, margin: 0}}>Bachelor of Engineering, Electrical Engineering</p>
                <p style={{fontSize: "13px", opacity: 0.7, margin: 0}}>National University of Sciences and Technology (NUST) | 2016 - 2020</p>
              </div>
            </div>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/mubashir-yaseen"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-mubashir-38a1361a1/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Muhammad Mubashir</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
