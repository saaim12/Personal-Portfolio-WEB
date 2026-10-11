export const person = {
  firstName: "Saaim",
  name: "Saaim Abdullah",
  role: "Software engineer",
  avatar: "/images/avatar.jpg",
  email: "saaim.abdullah.work@gmail.com",
  location: "Asia/Karachi",
  locale: "en",
};

export const portraits = {
  playful: "/images/avatar_2.jpeg",
  casual: "/images/avatar_3.jpeg",
};

export const bookingLink = "https://cal.com/saaim-abdullah-gm3ck6";

// All profiles also appear in Person structured data, even if absent from the footer.
export const social = [
  { name: "GitHub", link: "https://github.com/saaim12" },
  { name: "LinkedIn", link: "https://www.linkedin.com/in/saaim-abdullah/" },
  { name: "Upwork", link: "https://www.upwork.com/freelancers/saaim" },
  { name: "WhatsApp", link: "https://wa.me/923249923289" },
  { name: "Medium", link: "https://medium.com/@saymmalik08" },
  { name: "Email", link: `mailto:${person.email}` },
];

export const home = {
  path: "/",
  image: `/api/og/generate?title=${encodeURIComponent(`${person.name}, Software Engineer`)}`,
  title: `${person.name}, Software Engineer`,
  description: "Saaim Abdullah is a software engineer in Lahore who turns complex software problems into dependable products, APIs, and data systems.",
  subline: "I build backend services, web applications, and data pipelines, taking work from requirements through deployment and handover. At Fitter Health, I delivered a health platform as the sole engineer. At Expertflow, I built APIs, improved response times, and worked across cloud, data, and communication systems.",
};

export const work = {
  path: "/work",
  title: "Systems I've built",
  description: "Explore Saaim Abdullah's software projects, from product delivery and backend services to data pipelines, AI applications, and engineering experiments.",
};
