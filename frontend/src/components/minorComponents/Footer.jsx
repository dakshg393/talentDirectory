import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full  border-t-1 border-border-color flex flex-col justify-between items-center  px-[20px] bg-surface dark:bg-surface-dark ">
      <div className="flex flex-col text-center py-[60px] px-[10px] border-b-1 border-border-color w-full gap-[20px]">
        <h1>
          Talent X <span className="text-primary">.</span>
        </h1>
        <p>
          The next-generation platform for managing top-tier talent. <br/>
          Developed by <span className="text-primary">Daksh Gupta</span> to help you build the perfect team.
        </p>
        <div className="flex gap-6 items-center justify-center">
          <a
            href="https://github.com/dakshg393/"
            target="_blank"
            className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <IoLogoGithub size={20} />
          </a>
          <a
            href="https://x.com/dakshg393"
                target="_blank"
            className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/dakshg393/"
                target="_blank"
            className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <IoLogoLinkedin size={20} />
          </a>
          <a
            href="https://dakshgupta.vercel.app/"
            target="_blank"
            className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <IoGlobe size={20} />
          </a>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center w-full py-[20px] ">
        <h1>© 2025 Talent X. All rights reserved.</h1>
        <h1>Built with using React, Express, & MongoDB</h1>
      </div>
    </div>
  );
};

export default Footer;
