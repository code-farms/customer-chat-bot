import {
  validateAdditionalInfo,
  validateBasicInfo,
  validateCTA,
  ValidationResult,
} from "./../lib/types";
import { CtaTypeEnum } from "@/generated/prisma";
import { ValidationErrors } from "@/lib/types";
import { create } from "zustand";

export type WebinarFormState = {
  basicInfo: {
    webinarName?: string;
    description?: string;
    date?: Date;
    time?: string;
    timeformat?: "AM" | "PM";
  };

  cta: {
    ctaLabel?: string;
    tags?: string[];
    ctaType?: CtaTypeEnum;
    aiAgent: string;
    priceId: string;
  };

  additionalInfo: {
    lockChat?: boolean;
    couponCode?: string;
    couponEnabled?: boolean;
  };
};

type ValidationState = {
  basicInfo: {
    valid: boolean;
    errors: ValidationErrors;
  };

  cta: {
    valid: boolean;
    errors: ValidationErrors;
  };

  additionalInfo: {
    valid: boolean;
    errors: ValidationErrors;
  };
};

type WebinarStore = {
  isModalOpen: boolean;
  isComplete: boolean;
  isSubmitting: boolean;
  formData: WebinarFormState;
  validation: ValidationState;

  setModalOpen: (isModalOpen: boolean) => void;
  setComplete: (isComplete: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;

  updateBasicInfoField: <K extends keyof WebinarFormState["basicInfo"]>(
    field: K,
    value: WebinarFormState["basicInfo"][K]
  ) => void;

  updateCTAField: <K extends keyof WebinarFormState["cta"]>(
    field: K,
    value: WebinarFormState["cta"][K]
  ) => void;

  updateAdditionalInfoField: <
    K extends keyof WebinarFormState["additionalInfo"]
  >(
    field: K,
    value: WebinarFormState["additionalInfo"][K]
  ) => void;

  validateStep: (stepId: keyof WebinarFormState) => boolean;

  getStepValidationErrors: (stepId: keyof WebinarFormState) => ValidationErrors;

  resetForm: () => void;
};

const initialState: WebinarFormState = {
  basicInfo: {
    webinarName: "",
    description: "",
    date: undefined,
    time: "",
    timeformat: "AM",
  },
  cta: {
    ctaLabel: "",
    tags: [],
    ctaType: "BOOK_A_CALL",
    aiAgent: "",
    priceId: "",
  },
  additionalInfo: {
    lockChat: false,
    couponCode: "",
    couponEnabled: false,
  },
};

const initialValidation: ValidationState = {
  basicInfo: {
    valid: false,
    errors: {},
  },
  cta: {
    valid: false,
    errors: {},
  },
  additionalInfo: {
    valid: false,
    errors: {},
  },
};

export const useWebinarStore = create<WebinarStore>((set, get) => ({
  isModalOpen: false,
  isComplete: false,
  isSubmitting: false,
  formData: initialState,
  validation: initialValidation,

  setModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
  setComplete: (isComplete: boolean) => set({ isComplete }),
  setSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),

  updateBasicInfoField: (field, value) => {
    set((state) => {
      const newBasicInfo = {
        ...state.formData.basicInfo,
        [field]: value,
      };
      const ValidationResult = validateBasicInfo(newBasicInfo);
      return {
        formData: {
          ...state.formData,
          basicInfo: newBasicInfo,
        },
        validation: {
          ...state.validation,
          basicInfo: ValidationResult,
        },
      };
    });
  },

  updateCTAField: (field, value) => {
    set((state) => {
      const newCTA = { ...state.formData.cta, [field]: value };

      const ValidationResult = validateCTA({
        ...newCTA,
        ctaType: newCTA.ctaType ?? "", // fallback to empty string
      });

      return {
        formData: {
          ...state.formData,
          cta: newCTA,
        },
        validation: {
          ...state.validation,
          cta: ValidationResult,
        },
      };
    });
  },

  updateAdditionalInfoField: (field, value) => {
    set((state) => {
      const newAdditionalInfo = {
        ...state.formData.additionalInfo,
        [field]: value,
      };
      const ValidationResult = validateAdditionalInfo(newAdditionalInfo);
      return {
        formData: {
          ...state.formData,
          additionalInfo: newAdditionalInfo,
        },
        validation: {
          ...state.validation,
          additionalInfo: ValidationResult,
        },
      };
    });
  },

  validateStep: (stepId) => {
    const { formData } = get();
    let validationResult: ValidationResult;

    switch (stepId) {
      case "basicInfo":
        validationResult = validateBasicInfo(formData.basicInfo);
        break;
      case "cta":
        validationResult = validateCTA({
          ...formData.cta,
          ctaType: formData.cta.ctaType ?? "", // ensure it's a string
        });
        break;
      case "additionalInfo":
        validationResult = validateAdditionalInfo(formData.additionalInfo);
        break;
      default:
        validationResult = { valid: true, errors: {} };
    }

    set((state) => ({
      validation: {
        ...state.validation,
        [stepId]: validationResult,
      },
    }));

    return validationResult.valid;
  },

  getStepValidationErrors: (stepId) => {
    const { validation } = get();
    return validation[stepId].errors;
  },

  resetForm: () => {
    set({
      isComplete: false,
      isSubmitting: false,
      formData: initialState,
      validation: initialValidation,
    });
  },
}));
