import React, { useEffect, useState } from "react";
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
  MenuButtonContainer,
  MenUButton,
  MenuButtonTail,
  Back,
} from "./ProjectDisplay.styles";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../../app/projectCounterSlice";
import { projects } from "../../utils/projects";

export const ProjectDisplay = ({ back }) => {
  const [isHovered, setIsHovered] = useState({
    one: false,
    two: false,
    three: false,
  });
  const [isBack, setIsBack] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isBack) {
      setTimeout(() => setIsFlipped(true), 1500);
      setTimeout(() => setIsFlipped(false), 2000);
      setTimeout(() => setIsFlipped(true), 3300);
      setTimeout(() => back(), 3500);
    }
  }, [isBack]);

  const handleHover = (name, direction) =>
    setIsHovered((p) => ({ ...p, [name]: direction }));

  const projectIndex = useSelector((state) => state.projectCounter.value);

  const dispatch = useDispatch();

  if (!isBack)
    return (
      <>
        <Container
          width={30}
          height={30}
          top={10}
          left={5}
          onMouseEnter={() => handleHover("one", true)}
          onMouseLeave={() => handleHover("one", false)}
          isHovered={isHovered.one}
        >
          <TitleContainer>
            <Title>{projectIndex === 0 ? "??????" : "Description:"}</Title>
            <Tail width={23} />
          </TitleContainer>
          <Description isQuestion={projectIndex === 0}>
            {projectIndex === 0 ? "?" : projects[projectIndex - 1].description}
          </Description>
        </Container>
        <Container
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
            <Title delay={0.6}>{projectIndex === 0 ? "??????" : "Tech:"}</Title>
            <Tail width={25} />
          </TitleContainer>

          {projectIndex === 0 ? (
            <QuestionMark>?</QuestionMark>
          ) : (
            <FlexContainer>
              <TechContainer>
                {projects[projectIndex - 1].tech.map((t) => (
                  <div key={t + Math.random()}>{t}</div>
                ))}
              </TechContainer>
            </FlexContainer>
          )}
        </Container>
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
              {projectIndex === 0 ? "??????" : "Preview:"}
            </Title>
            <Tail width={23} />
          </TitleContainer>
          <Description delay={1.2} isQuestion={projectIndex === 0}>
            {projectIndex === 0 ? (
              <QuestionMark>?</QuestionMark>
            ) : (
              <Image src={projects[projectIndex - 1].preview} />
            )}
          </Description>
        </Container>
        <Container width={12} height={4} top={92} left={44} className="button">
          <ButtonsContainer>
            <Button type={"left"} onClick={() => dispatch(decrement())}>
              {"<"}
            </Button>
            <div style={{ fontSize: "0.8vw" }}>
              {projectIndex === 0 ? "???" : projectIndex}
            </div>
            <Button onClick={() => dispatch(increment())}>{">"}</Button>
          </ButtonsContainer>
        </Container>
        {Object.keys(isHovered).some((k) => isHovered[k]) && (
          <CursorReplace
            top={isHovered.one ? 41 : 86}
            left={isHovered.three ? 90 : 30}
          >
            {isHovered.three ? "Go to site" : "See source"}
          </CursorReplace>
        )}
        <MenuButtonContainer className="button" onClick={() => setIsBack(true)}>
          <MenUButton>Back</MenUButton>
          <MenuButtonTail />
        </MenuButtonContainer>
      </>
    );
  return <Back flipped={isFlipped}>?</Back>;
};
