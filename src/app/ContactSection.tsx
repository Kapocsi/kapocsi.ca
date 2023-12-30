import { ReactNode } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

type Props = {
  text: string;
  link: string;
  children: ReactNode;
};

const ContactButton = ({ text, link, children }: Props) => {
  return (
    <div
      className="flex flex-row justify-center items-center whitespace-nowrap"
      style={{ color: "var(--f_med)" }}
    >
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
