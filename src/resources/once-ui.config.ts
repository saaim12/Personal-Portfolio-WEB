const baseURL: string = "https://saaim.site";

const routes = {
  "/": true,
  "/experience": true,
  "/work": true,
  "/about": true,
  "/services": true,
  "/journal": true,
  "/playground": true,
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
