import { useLocation, useNavigate } from "react-router-dom";

import { docketSteps } from "../config/docketStepsConfig";

const BASE_PATH = "/docket/new";

export default function useDocketStepNavigation() {
  const location = useLocation();

  const navigate = useNavigate();

  // Get current route step
  const currentPath =
    location.pathname.split("/").pop();

  // Find current step index
  const currentIndex = docketSteps.findIndex(
    (step) => step.path === currentPath
  );

  // Previous step
  const previousStep =
    currentIndex > 0
      ? docketSteps[currentIndex - 1]
      : null;

  // Next step
  const nextStep =
    currentIndex < docketSteps.length - 1
      ? docketSteps[currentIndex + 1]
      : null;

  // Navigation Functions
  const goNext = () => {
    if (nextStep) {
      navigate(`${BASE_PATH}/${nextStep.path}`);
    }
  };

  const goPrevious = () => {
    if (previousStep) {
      navigate(`${BASE_PATH}/${previousStep.path}`);
    }
  };

  return {
    currentIndex,
    currentStep: docketSteps[currentIndex],

    previousStep,
    nextStep,

    goNext,
    goPrevious,
  };
}