import { ReactNode } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

type Props = {
  text: string;
  link: string;
  children: ReactNode;
};

function ContactButton({ text, link, children }: Props) {
  return (
    <div className="whitespace-nowrap" style={{ color: "var(--f_high)" }}>
      <a className="underline pl-2 flex flex-row justify-center items-center" href={link}>
        <div style={{ paddingBottom: 1 + "pt" }}>{children}</div> {text}
      </a>
    </div>
  );
}
export function ContactSection() {
  return (
    <div className="">
      <ContactButton text="Kapocsi" link="https://github.com/kapocsi">
        <FaGithub />
      </ContactButton>
      <ContactButton text="thomas-kapocsi" link="https://www.linkedin.com/in/thomas-kapocsi">
        <FaLinkedin />
      </ContactButton>
      <ContactButton text="thomas@kapocsi.ca" link="mailto:thomas@kapocsi.ca">
        <FaEnvelope />
      </ContactButton>
    </div>
  );
}
