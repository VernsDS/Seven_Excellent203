"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { CONTACT_RAFA, waLink } from "@/lib/contact";

interface NavItem {
  heading: string;
  href: string;
  subheading: string;
}

const NAV_ITEMS: NavItem[] = [
  { heading: "Home", href: "/", subheading: "Beranda arsip kelas" },
  { heading: "Students", href: "/students", subheading: "36 murid kelas 7E" },
  { heading: "Gallery", href: "/gallery", subheading: "Kenangan dan kegiatan kelas" },
  { heading: "Schedule", href: "/schedule", subheading: "Jadwal pelajaran" },
  { heading: "About", href: "/about", subheading: "Tentang kelas 7E" },
];

interface CurvedMenuContextValue {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

const CurvedMenuContext = createContext<CurvedMenuContextValue>({
  open: false,
  openMenu: () => {},
  closeMenu: () => {},
  toggleMenu: () => {},
});

export function useCurvedMenu(): CurvedMenuContextValue {
  return useContext(CurvedMenuContext);
}

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const MENU_SLIDE = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: EASE } },
  exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: EASE } },
};

function Curve() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setHeight(window.innerHeight));
    return () => cancelAnimationFrame(raf);
  }, []);
  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  return (
    <svg
      className="absolute top-0 -left-[99px] h-full w-[100px] stroke-none"
      style={{ fill: "var(--background)" }}
      aria-hidden="true"
    >
      <motion.path
        variants={{
          initial: { d: initialPath },
          enter: { d: targetPath, transition: { duration: 1, ease: EASE } },
          exit: { d: initialPath, transition: { duration: 0.8, ease: EASE } },
        }}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
}

function NavLink({
  heading,
  href,
  index,
  isTouch,
  closeMenu,
}: {
  heading: string;
  href: string;
  index: number;
  isTouch: boolean;
  closeMenu: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      initial="initial"
      whileHover={isTouch ? undefined : "whileHover"}
      animate={isTouch ? "autoPlay" : "initial"}
      className="curved-row"
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={
          isTouch
            ? undefined
            : (e) => {
                const rect = ref.current?.getBoundingClientRect();
                if (!rect) return;
                x.set((e.clientX - rect.left) / rect.width - 0.5);
                y.set((e.clientY - rect.top) / rect.height - 0.5);
              }
        }
        onClick={closeMenu}
      >
        <div className="relative flex items-start">
          <span className="curved-row-index">{index}.</span>
          <motion.span
            variants={{
              initial: { x: 0 },
              whileHover: { x: -16 },
              autoPlay: {
                x: [0, -8, 0],
                transition: { duration: 2.4, repeat: Infinity, repeatType: "mirror", delay: index * 0.15 },
              },
            }}
            transition={{ type: "spring", staggerChildren: 0.075, delayChildren: 0.25 }}
            className="curved-row-heading"
          >
            {heading.split("").map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                variants={{
                  initial: { x: 0 },
                  whileHover: { x: 16 },
                  autoPlay: {
                    x: [0, 6, 0],
                    transition: {
                      duration: 2.4,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: index * 0.15 + i * 0.03,
                    },
                  },
                }}
                transition={{ type: "spring" }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}
/**
 * Single fullscreen curved menu shared by the desktop hamburger and the
 * mobile floating nav "Lainnya" button. Mounted once in the root layout.
 * The slide-in panel uses var(--background) for the curve fill so it
 * always matches the Zen Linen theme. z-62: above floating nav (55),
 * motion banner (60) and footer content (20).
 */
export function CurvedMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => setOpen(true), []);
  const toggleMenu = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setIsTouch(window.matchMedia("(hover: none)").matches),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => closeMenu());
    return () => cancelAnimationFrame(raf);
  }, [pathname, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <CurvedMenuContext.Provider value={{ open, openMenu, closeMenu, toggleMenu }}>
      {children}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            variants={MENU_SLIDE}
            initial="initial"
            animate="enter"
            exit="exit"
            className="curved-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
          >
            <div className="curved-panel-inner">
              <div className="curved-head">
                <p className="curved-label">Navigation</p>
                <button
                  type="button"
                  className="curved-close"
                  aria-label="Tutup menu"
                  onClick={closeMenu}
                >
                  <X size={22} />
                </button>
              </div>
              <section className="curved-items">
                {NAV_ITEMS.map((item, index) => (
                  <NavLink
                    key={item.href}
                    heading={item.heading}
                    href={item.href}
                    index={index + 1}
                    isTouch={isTouch}
                    closeMenu={closeMenu}
                  />
                ))}
              </section>
              <div className="curved-footer">
                <span className="curved-footer-brand">Kelas 7E · SMPN 203 Jakarta</span>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="curved-footer-wa"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>{CONTACT_RAFA.label}</span>
                </a>
              </div>
            </div>
            <Curve />
          </motion.div>
        )}
      </AnimatePresence>
    </CurvedMenuContext.Provider>
  );
}