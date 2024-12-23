"use client";

export const useCapitalize = () => {

  try {
    const capitalize = (string) => {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      return '';
    };

    return { capitalize };
    
  } catch (error) {
    console.log("useCapitalize", error.message);
  }
};