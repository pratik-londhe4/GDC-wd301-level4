export function  getLocalForms() {
    const savedFormsJSON = localStorage.getItem("savedForms");
    const persistentFormFields = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  
    return persistentFormFields;
  };

  export const saveLocalForms = (localForms: FormData[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
  };