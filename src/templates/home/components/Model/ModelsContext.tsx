"use client";
import React, { ReactNode } from "react";

export interface PageModel {
  modelName: string;
  overlayNode: ReactNode;
  sectionRef: React.RefObject<HTMLElement>;
}

interface ModelsContext {
  wrapperRef: React.RefObject<HTMLElement>;
  registeredModels: PageModel[];
  registerModel: (model: PageModel) => void;
  unregisterModel: (modelName: string) => void;
  getModelByName: (modelName: string) => PageModel | null;
}

// Export with default values
export default React.createContext<ModelsContext>({} as ModelsContext);
