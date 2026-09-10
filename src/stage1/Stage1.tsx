import { Question } from "./3DComponents/Question/Question";
import { Floor } from "./3DComponents/Floor/Floor";
import { Effects } from "./3DComponents/Effects/Effects";

export const Stage1 = (): JSX.Element => {
  return (
    <>
      <Question />
      <Floor />
      <Effects />
    </>
  );
};
