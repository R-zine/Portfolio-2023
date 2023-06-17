import { useEffect, useState, useRef } from "react";
import {
  MenuItem,
  Tail,
  Curtain,
  MenUButton,
  MenuButtonContainer,
  MenuButtonTail,
} from "./Menu.styles";
import gsap from "gsap";

export const Menu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const itemsRef = useRef(null);

  useEffect(() => {
    if (isExpanded)
      gsap.to(itemsRef.current.children, { opacity: 1, stagger: 0.3 });
    if (!isExpanded)
      gsap.to(itemsRef.current.children, { opacity: 0, stagger: -0.1 });
  }, [isExpanded]);

  return (
    <>
      <MenuButtonContainer
        className="button"
        onClick={() => setIsExpanded((p) => !p)}
      >
        <MenUButton>Menu</MenUButton>
        <MenuButtonTail />
      </MenuButtonContainer>
      <Curtain expanded={isExpanded} />

      <div ref={itemsRef}>
        <MenuItem top={11} left={23}>
          Contact
        </MenuItem>
        <Tail top={14} left={24} width={24} />
        <MenuItem top={30} left={70}>
          About
        </MenuItem>
        <Tail top={33} left={59} width={12} />
        <MenuItem top={45} left={37}>
          ???
        </MenuItem>
        <Tail top={48} left={38} width={11} />
      </div>
    </>
  );
};
