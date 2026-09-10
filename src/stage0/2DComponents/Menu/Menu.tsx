import { useEffect, useState, useRef } from "react";
import {
  MenuItem,
  Tail,
  Curtain,
  MenuButton,
  MenuButtonContainer,
  MenuButtonTail,
} from "./Menu.styles";
import gsap from "gsap";

interface MenuProps {
  onContact: () => void;
  onAbout: () => void;
  onProjects: () => void;
}

export const Menu = ({ onContact, onAbout, onProjects }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemsRef.current) return undefined;

    const tween = gsap.to(itemsRef.current.children, {
      opacity: isExpanded ? 1 : 0,
      stagger: isExpanded ? 0.3 : -0.1,
      overwrite: "auto",
    });

    return () => {
      tween.kill();
    };
  }, [isExpanded]);

  return (
    <>
      <MenuButtonContainer
        type="button"
        aria-expanded={isExpanded}
        aria-controls="main-menu-items"
        className="button"
        onClick={() => setIsExpanded((p) => !p)}
      >
        <MenuButton>Menu</MenuButton>
        <MenuButtonTail />
      </MenuButtonContainer>
      <Curtain expanded={isExpanded} />

      <div id="main-menu-items" ref={itemsRef} aria-hidden={!isExpanded}>
        <MenuItem
          type="button"
          top={11}
          left={23}
          disabled={!isExpanded}
          onClick={onContact}
        >
          Contact
        </MenuItem>
        <Tail top={14} left={24} width={24} />
        <MenuItem
          type="button"
          top={30}
          left={70}
          disabled={!isExpanded}
          onClick={onAbout}
        >
          About
        </MenuItem>
        <Tail top={33} left={59} width={12} />
        <MenuItem
          type="button"
          aria-label="Projects"
          top={45}
          left={37}
          disabled={!isExpanded}
          onClick={onProjects}
        >
          ???
        </MenuItem>
        <Tail top={48} left={38} width={11} />
      </div>
    </>
  );
};
