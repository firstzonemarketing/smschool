import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  y?: number;
}

export function Reveal({ children, delay = 0, y = 24, className = '', ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  accent = 'sky',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  accent?: 'sky' | 'coral' | 'fresh' | 'lavender' | 'sunshine';
}) {
  const pillClasses: Record<string, string> = {
    sky: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
    coral: 'bg-[#FFF1EE] text-[#C2410C] border-[#FED7AA]',
    fresh: 'bg-[#D1FAE5] text-[#047857] border-[#A7F3D0]',
    lavender: 'bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]',
    sunshine: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
  };

  return (
    <Reveal
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
    >
      <span
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${pillClasses[accent]}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0F172A] leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
