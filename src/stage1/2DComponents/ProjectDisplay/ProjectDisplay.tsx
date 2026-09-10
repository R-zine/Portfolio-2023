import { useEffect, useState } from "react";
import {
  Button,
  ButtonsContainer,
  Container,
  CursorReplace,
  Description,
  FlexContainer,
  Image,
  QuestionMark,
  Tail,
  TechContainer,
  Title,
  TitleContainer,
  Back,
  ImageCont,
} from "./ProjectDisplay.styles";
import {
  MenuButtonContainer,
  MenuButton,
  MenuButtonTail,
} from "../../../stage0/2DComponents/Menu/Menu.styles";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { decrement, increment } from "../../../app/projectCounterSlice";
import { projects } from "../../utils/projects";
import { getProjectByIndex } from "../../utils/projectNavigation";

interface ProjectDisplayProps {
  back: () => void;
}

interface HoverState {
  one: boolean;
  two: boolean;
  three: boolean;
}

export const ProjectDisplay = ({ back }: ProjectDisplayProps) => {
  const [isHovered, setIsHovered] = useState({
    one: false,
    two: false,
    three: false,
  });
  const [isBack, setIsBack] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isBack) {
      const timers = [
        setTimeout(() => setIsFlipped(true), 1500),
        setTimeout(() => setIsFlipped(false), 2000),
        setTimeout(() => setIsFlipped(true), 3300),
        setTimeout(() => back(), 3500),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [back, isBack]);

  const handleHover = (name: keyof HoverState, direction: boolean) =>
    setIsHovered((p) => ({ ...p, [name]: direction }));

  const projectIndex = useAppSelector((state) => state.projectCounter.value);
  const currentProject = getProjectByIndex(projects, projectIndex);
  const hasProject = currentProject !== null;
  const hasPreview = Boolean(
    currentProject?.site && currentProject.preview?.some(Boolean)
  );

  const dispatch = useAppDispatch();

  if (!isBack)
    return (
      <>
        <Container
          as={currentProject?.source ? "a" : "section"}
          href={currentProject?.source || undefined}
          target={currentProject?.source ? "_blank" : undefined}
          rel={currentProject?.source ? "noopener noreferrer" : undefined}
          aria-label={
            currentProject ? `View source for project ${projectIndex}` : undefined
          }
          width={30}
          height={30}
          top={10}
          left={5}
          onMouseEnter={() => handleHover("one", true)}
          onMouseLeave={() => handleHover("one", false)}
          isHovered={isHovered.one}
        >
          <TitleContainer>
            <Title>{hasProject ? "Description:" : "??????"}</Title>
            <Tail width={23} />
          </TitleContainer>
          <Description isQuestion={!hasProject}>
            {hasProject ? currentProject.description : "?"}
          </Description>
        </Container>
        <Container
          as={currentProject?.source ? "a" : "section"}
          href={currentProject?.source || undefined}
          target={currentProject?.source ? "_blank" : undefined}
          rel={currentProject?.source ? "noopener noreferrer" : undefined}
          aria-label={
            currentProject ? `View source for project ${projectIndex}` : undefined
          }
          width={30}
          height={25}
          top={60}
          left={5}
          delay={0.8}
          onMouseEnter={() => handleHover("two", true)}
          onMouseLeave={() => handleHover("two", false)}
          isHovered={isHovered.two}
        >
          <TitleContainer>
            <Title delay={0.6}>{hasProject ? "Tech:" : "??????"}</Title>
            <Tail width={25} />
          </TitleContainer>

          {!hasProject ? (
            <QuestionMark>?</QuestionMark>
          ) : (
            <FlexContainer>
              <TechContainer>
                {currentProject.tech.map((t) => (
                  <div key={t}>{t}</div>
                ))}
              </TechContainer>
            </FlexContainer>
          )}
        </Container>
        {(!hasProject || hasPreview) && (
          <Container
            width={30}
            height={75}
            top={10}
            left={65}
            delay={1.8}
            onMouseEnter={() => handleHover("three", true)}
            onMouseLeave={() => handleHover("three", false)}
            isHovered={isHovered.three}
          >
            <TitleContainer>
              <Title delay={2.1}>
                {hasProject ? "Preview:" : "??????"}
              </Title>
              <Tail width={23} />
            </TitleContainer>
            <Description
              as={currentProject?.site ? "a" : "div"}
              href={currentProject?.site || undefined}
              target={currentProject?.site ? "_blank" : undefined}
              rel={currentProject?.site ? "noopener noreferrer" : undefined}
              aria-label={
                currentProject ? `Open project ${projectIndex}` : undefined
              }
              delay={1.2}
              isQuestion={!hasProject}
            >
              {!hasProject ? (
                <QuestionMark>?</QuestionMark>
              ) : currentProject.preview.length === 2 ? (
                <ImageCont>
                  <Image
                    src={currentProject.preview[0]}
                    alt={`Project ${projectIndex} preview 1`}
                  />
                  <Image
                    src={currentProject.preview[1]}
                    alt={`Project ${projectIndex} preview 2`}
                  />
                </ImageCont>
              ) : (
                <ImageCont single>
                  <Image
                    src={currentProject.preview[0]}
                    alt={`Project ${projectIndex} preview`}
                  />
                </ImageCont>
              )}
            </Description>
          </Container>
        )}
        <Container width={12} height={4} top={92} left={44} className="button">
          <ButtonsContainer>
            <Button
              type="button"
              direction="left"
              aria-label="Previous project"
              onClick={() => dispatch(decrement())}
            >
              {"<"}
            </Button>
            <div style={{ fontSize: "0.8vw" }}>
              {hasProject ? projectIndex : "???"}
            </div>
            <Button
              type="button"
              aria-label="Next project"
              onClick={() => dispatch(increment())}
            >
              {">"}
            </Button>
          </ButtonsContainer>
        </Container>
        {Object.values(isHovered).some(Boolean) &&
          hasProject && (
            <CursorReplace
              top={isHovered.one ? 41 : 86}
              left={isHovered.three ? 90 : 30}
            >
              {!isHovered.three
                ? "See source"
                : projectIndex === 7
                ? "Back to home"
                : "Go to site"}
            </CursorReplace>
          )}
        <MenuButtonContainer
          type="button"
          className="button"
          onClick={() => setIsBack(true)}
        >
          <MenuButton>Back</MenuButton>
          <MenuButtonTail />
        </MenuButtonContainer>
      </>
    );
  return <Back flipped={isFlipped}>?</Back>;
};
