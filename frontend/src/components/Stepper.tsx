import { useState } from "react";
import { Stepper, Step, StepLabel, } from "@mui/material";

// 1. On personnalise le connecteur (la ligne entre les points)


export default function MovieStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Synopsis", sub: "Contexte historique" },
    { label: "Production", sub: "" },
    { label: "Nominations", sub: "" },
  ];

  return (
    <div className="bg-transparent p-8 rounded-xl max-w-2xl mx-auto">
      <h2 className="text-white tracking-widest text-sm font-semibold mb-6">
        STORY
      </h2>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        
      >
        {steps.map((step, index) => (
          <Step key={step.label} onClick={() => setActiveStep(index)}>
            <StepLabel>
              <span className="text-white/80 text-xs font-medium cursor-pointer hover:text-white">
                {step.label}
                {step.sub && (
                  <>
                    <br />
                    <span className="text-white/50">{step.sub}</span>
                  </>
                )}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
