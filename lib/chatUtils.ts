import { db } from "./firebase"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore"

export const sendMessage = async (chatId: string, senderId: string, text: string) => {
  const messagesRef = collection(db, "chats", chatId, "messages")
  await addDoc(messagesRef, {
    senderId,
    text,
    timestamp: serverTimestamp(),
  })
}

export const subscribeToMessages = (
  chatId: string,
  callback: (messages: { id: string; text: string; senderId: string }[]) => void
) => {
  const messagesRef = collection(db, "chats", chatId, "messages")
  const q = query(messagesRef, orderBy("timestamp", "asc"))
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[]
    callback(messages)
  })
}
