"use client";
import React, { useCallback, useRef, useState } from "react";
import ModelsContext, { PageModel } from "../ModelsContext";
import ModelOverlay from "../ModelOverlay";
import { Container, OverlaysRoot } from "./styles";

interface ModelsWrapperProps {
  children: React.ReactNode;
}

const ModelsWrapper: React.FC<ModelsWrapperProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [registeredModels, setRegisteredModels] = useState<PageModel[]>([]);

  const registerModel = useCallback((model: PageModel) => {
    setRegisteredModels((state) => [...state, { ...model }]);
  }, []);

  const unregisterModel = useCallback((modelName: string) => {
    setRegisteredModels((state) =>
      state.filter((model) => model.modelName !== modelName)
    );
  }, []);

  const getModelByName = useCallback(
    (modelName: string) => {
      return (
        registeredModels.find((item) => item.modelName === modelName) || null
      );
    },
    [registeredModels]
  );

  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName,
      }}
    >
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          {registeredModels.map((item) => (
            <ModelOverlay key={item.modelName} model={item}>
              {item.overlayNode}
            </ModelOverlay>
          ))}
        </OverlaysRoot>

        {children}
      </Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
