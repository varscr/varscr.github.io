import { ReactNode, forwardRef } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = "" }, ref) => {
    return (
      <section ref={ref} id={id} className={`py-16 md:py-24 ${className}`}>
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
