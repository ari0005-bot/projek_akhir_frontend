export const messageUtils = {
  getMessages() {
    const stored = localStorage.getItem("contactMessages");
    return stored ? JSON.parse(stored) : [];
  },

  addMessage(messageData) {
    const messages = this.getMessages();
    const newMessage = {
      id: Date.now().toString(),
      ...messageData,
      timestamp: new Date().toISOString(),
      read: false,
      status: "unread",
      replies: [],
      recipients: ["admin", "organizer"],
    };

    messages.unshift(newMessage);
    localStorage.setItem("contactMessages", JSON.stringify(messages));

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Pesan Baru dari Contact Form", {
        body: `${messageData.name}: ${messageData.subject}`,
        icon: "/favicon.ico",
      });
    }

    return newMessage;
  },

  updateMessageStatus(messageId, status) {
    const messages = this.getMessages();
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId
        ? { ...msg, status, read: status !== "unread" }
        : msg,
    );
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
  },

  addReply(messageId, replyData) {
    const messages = this.getMessages();
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId
        ? {
            ...msg,
            replies: [...(msg.replies || []), replyData],
            status: "replied",
            read: false,
          }
        : msg,
    );
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
  },

  deleteMessage(messageId) {
    const messages = this.getMessages();
    const filteredMessages = messages.filter((msg) => msg.id !== messageId);
    localStorage.setItem("contactMessages", JSON.stringify(filteredMessages));
  },

  getUnreadCount() {
    const messages = this.getMessages();
    return messages.filter((msg) => msg.status === "unread").length;
  },

  getMessagesForRole(role) {
    return this.getMessages();
  },

  getMessagesForUser(email) {
    const messages = this.getMessages();
    return messages.filter((msg) => msg.email === email);
  },
};
