const HISTORY_KEY = 'ssc_mcq_exam_history_v1';
const BOOKMARKS_KEY = 'ssc_mcq_bookmarks_v1';
const THEME_KEY = 'ssc_mcq_theme_preference';

export const storage = {
  getHistory: () => {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load history', e);
      return [];
    }
  },

  saveResult: (result) => {
    try {
      const current = storage.getHistory();
      const newRecord = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...result,
      };
      const updated = [newRecord, ...current].slice(0, 50); // keep last 50
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return newRecord;
    } catch (e) {
      console.error('Failed to save result', e);
    }
  },

  clearHistory: () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  },

  getBookmarks: () => {
    try {
      const data = localStorage.getItem(BOOKMARKS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  toggleBookmark: (subjectId, questionId) => {
    try {
      const bookmarks = storage.getBookmarks();
      const subjectBookmarks = bookmarks[subjectId] || [];
      const index = subjectBookmarks.indexOf(questionId);
      
      if (index > -1) {
        subjectBookmarks.splice(index, 1);
      } else {
        subjectBookmarks.push(questionId);
      }
      
      bookmarks[subjectId] = subjectBookmarks;
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      return bookmarks;
    } catch (e) {
      console.error('Failed to toggle bookmark', e);
    }
  },

  getTheme: () => {
    try {
      return localStorage.getItem(THEME_KEY) || 'light';
    } catch (e) {
      return 'light';
    }
  },

  setTheme: (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.error('Failed to set theme', e);
    }
  }
};
