import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactButton = ({ text, link, children }) => {
  return (
    <div className="flex flex-row justify-center items-center">
      {children}
      <a className="underline pl-2" href={link}>
        {text}
      </a>
    </div>
  );
};
export const ContactSection = () => {
  return (
    <div>
      <ContactButton text="Kapocsi" link="https://github.com/kapocsi">
        <FaGithub />
      </ContactButton>
      <ContactButton
        text="thomas-kapocsi-3688b11b0"
        link="https://www.linkedin.com/in/thomas-kapocsi-3688b11b0/"
      >
        <FaLinkedin />
      </ContactButton>
      <ContactButton text="thomas@kapocsi.ca" link="mailto:thomas@kapocsi.ca">
        <FaEnvelope />
      </ContactButton>
    </div>
  );
};
