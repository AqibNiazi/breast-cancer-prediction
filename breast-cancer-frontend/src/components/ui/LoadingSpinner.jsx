import clsx from "clsx";

export default function LoadingSpinner({ size = "md", className }) {
  const sizes = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-10 h-10" };
  return (
    <div className={clsx("relative", sizes[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-teal-500/20" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-400 animate-spin" />
    </div>
  );
}
