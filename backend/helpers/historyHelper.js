function formatHistory(history = []) {
  return history.map(msg => ({
    role: msg.role,
    content: msg.content,
  }));
}

function addMessage(history = [], role, content) {
  return [...history, { role, content }];
}

module.exports = { formatHistory, addMessage };