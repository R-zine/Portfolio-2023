import { Question } from "./3DComponents/Question/Question";
import { Floor } from "./3DComponents/Floor/Floor";
import { Effects } from "./3DComponents/Effects/Effects";
import { ProjectAtmosphere } from "./3DComponents/ProjectAtmosphere/ProjectAtmosphere";

export const Stage1 = (): JSX.Element => {
  return (
    <>
      <Question />
      <Floor />
      <ProjectAtmosphere />
      <Effects />
    </>
  );
};
