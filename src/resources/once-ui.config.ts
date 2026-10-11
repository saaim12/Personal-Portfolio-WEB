const baseURL: string = (process.env.NEXT_PUBLIC_SITE_URL || "https://saaim.site").replace(/\/$/, "");

const routes = {
  "/": true,
  "/professional-experience": true,
  "/projects": true,
  "/services": true,
  "/journal": true,
  "/contact": true,
};
const style = {
  neutral: "slate",
  brand: "indigo",
  accent: "indigo",
  solid: "contrast",
  solidStyle: "flat",
  border: "conservative",
  surface: "translucent",
  transition: "micro",
  scaling: "100",
} as const;

export { routes, baseURL, style };
