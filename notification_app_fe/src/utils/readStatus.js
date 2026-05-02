const READ_KEY = 'read_notifications';

export const getReadIds = () => {
  try {
    const data = localStorage.getItem(READ_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const isRead = (id) => {
  const readIds = getReadIds();
  return readIds.includes(id);
};

export const markAsRead = (id) => {
  const readIds = getReadIds();
  if (!readIds.includes(id)) {
    readIds.push(id);
    localStorage.setItem(READ_KEY, JSON.stringify(readIds));
  }
};

export const markAllAsRead = (ids) => {
  const readIds = getReadIds();
  let changed = false;
  ids.forEach(id => {
    if (!readIds.includes(id)) {
      readIds.push(id);
      changed = true;
    }
  });
  if (changed) {
    localStorage.setItem(READ_KEY, JSON.stringify(readIds));
  }
};
