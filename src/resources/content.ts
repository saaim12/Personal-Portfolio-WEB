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
  withDog: "/images/avatar 5.jpeg",
  smiling: "/images/avatar 4.jpeg",
  withChicken: "/images/avatar 7.jpeg",
  withChickenSmiling: "/images/avatart 8.jpeg",
  withDuckVideo: "/images/avatart 6.mp4",
  duckVideoPoster: "/images/duck-video-poster.webp",
};

export const bookingLink = "https://cal.com/saaim-abdullah-gm3ck6";

// All profiles also appear in Person structured data, even if absent from the footer.
export const social = [
  { name: "GitHub", link: "https://github.com/saaim12" },
  { name: "LinkedIn", link: "https://www.linkedin.com/in/saaim-abdullah/" },
  { name: "WhatsApp", link: "https://api.whatsapp.com/send/?phone=923249923289&text&type=phone_number&app_absent=0" },
  { name: "Medium", link: "https://medium.com/@saymmalik08" },
  { name: "Email", link: `mailto:${person.email}` },
];

export const home = {
  path: "/",
  image: "/images/social-preview.png",
  title: `${person.name}, Software Engineer`,
  description: "Saaim Abdullah is a software engineer in Lahore who turns complex software problems into dependable products, APIs, and data systems.",
};

export const work = {
  path: "/projects",
  title: "Projects",
  description: "Explore Saaim Abdullah's software projects, from product delivery and backend services to data pipelines, AI applications, and engineering experiments.",
};
