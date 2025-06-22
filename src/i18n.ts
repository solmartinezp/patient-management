import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          addPatient: "Add Patient",
          sortByName: "Sort by name",
          sortByDate: "Sort by date",
          searchPlaceholder: "Search by name or date",
          loading: "Loading patients...",
          error: "Failed to load patients.",
          name: "Name",
          required: "This field is required",
          nameValidation: "Name must contain only letters.",
          description: "Description",
          descriptionValidation: "Description must be at least 10 characters.",
          website: "Website",
          websiteValidation: "Enter a valid website URL.",
          avatar: "Avatar URL",
          save: "Save",
          cancel: "Cancel",
          collapse: "Collapse",
          expand: "Expand",
          edit: "Edit",
          editPatient: "Edit Patient",
          successAdd: "Patient added successfully!",
          successEdit: "Patient updated successfully!",
          headerTitle: "Patient Management Data",
          patientNotFound: "Patient not found."
        },
      },
    },
  });

export default i18n;
