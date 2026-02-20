
export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if(serializedState === null) {
        return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch (err) {
    return undefined;
  }
};

export const saveState = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  }
  catch (err) {

  }
};

// utils/parseAttachments.js
export function parseAttachments(data) {
  if (!data) return [];
  try {
    if (Array.isArray(data)) return data;

    if (typeof data === "string") {
      return JSON.parse(data);
    }

    // fallback
    return [];
  } catch (err) {
    console.error("Error parsing attachments:", data, err);
    return [];
  }
}
