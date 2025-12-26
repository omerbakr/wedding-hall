import { ReactNode } from "react";

interface TestimonialCardProps {
  children: ReactNode;
  className?: string;
}

const TestimonialCard = ({ children, className }: TestimonialCardProps) => {
  return (
    <div
      className={`flex flex-col px-8 py-10 h-full border border-b-3 border-primary rounded-xl shadow-md bg-white ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default TestimonialCard;
