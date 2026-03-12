import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDUyALMKpDP80xgvIPFmwsmYDwBwq797CA"; // Replace with your key
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the Model with System Instructions
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are Tammy L Stonez's Portfolio Assistant. Only answer based on [Hello, I am Livingstone, and my nickname is (Tammy L Stonez). I am a student of the Outliers Technical Training Services. I live in Nigeria, Rivers State. I am an 18 year old web developer, passionate about creating and learning. I am an ambitious and disciplined person. I am a Senior Level Front-end developer, Graphics designer, Video Editor, and very enthusiastic to new technologies. I dream to build a Tech Institution where all who dream about going into tech can have their dream come true.]..."
});

let chat = model.startChat({ history: [] });

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;
  if (!message) return;

  // Add user message to UI
  appendMessage("You", message);
  input.value = "";

  try {
    const result = await chat.sendMessage(message);
    const response = await result.response;
    appendMessage("AI", response.text());
  } catch (error) {
    appendMessage("AI", "Oops, something went wrong.");
  }
}

function appendMessage(sender, text) {
  const window = document.getElementById("chat-window");
  window.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
}