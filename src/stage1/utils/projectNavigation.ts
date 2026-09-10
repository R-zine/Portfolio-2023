export const UNKNOWN_PROJECT_INDEX = 0;

export const getNextProjectIndex = (
  currentIndex: number,
  projectCount: number
): number => {
  if (
    !Number.isInteger(currentIndex) ||
    !Number.isInteger(projectCount) ||
    projectCount < 1
  ) {
    return UNKNOWN_PROJECT_INDEX;
  }

  return currentIndex < 1 || currentIndex >= projectCount
    ? 1
    : currentIndex + 1;
};

export const getPreviousProjectIndex = (
  currentIndex: number,
  projectCount: number
): number => {
  if (
    !Number.isInteger(currentIndex) ||
    !Number.isInteger(projectCount) ||
    projectCount < 1
  ) {
    return UNKNOWN_PROJECT_INDEX;
  }

  return currentIndex <= 1 || currentIndex > projectCount
    ? projectCount
    : currentIndex - 1;
};

export const getProjectByIndex = <Project>(
  projectList: readonly Project[] | null,
  projectIndex: number
): Project | null => {
  if (
    projectList === null ||
    !Number.isInteger(projectIndex) ||
    projectIndex < 1
  )
    return null;
  return projectList[projectIndex - 1] ?? null;
};
