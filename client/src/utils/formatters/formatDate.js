export function formatDate(createdAt) {
    const date = new Date(parseInt(createdAt));
    return date.toLocaleDateString();
  }