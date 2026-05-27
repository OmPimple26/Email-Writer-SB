# 🚀 Email Writer SB

AI-powered Email Reply Generator built using Spring Boot, React, Gemini API, and Chrome Extension integration. This application generates smart, personalized email responses with different tones and allows users to generate replies directly inside Gmail through a browser extension.

---

## ✨ Features

✅ Generate AI-powered email replies instantly  
✅ Multiple reply tones (Professional, Friendly, Casual)  
✅ Clean and responsive UI using Material UI  
✅ Copy generated replies with one click  
✅ Gmail Chrome Extension support  
✅ AI-generated contextual responses  
✅ Full-stack architecture using Spring Boot + React  

---

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- Spring WebFlux
- Maven
- Gemini API

### Frontend
- React.js
- Material UI
- Axios
- React Toastify
- Vite

### Browser Extension
- JavaScript
- Chrome Extension (Manifest V3)

---

## 📂 Project Structure

```bash
Email-Writer-SB
│
├── email-writer-sb-backend
│   ├── controller
│   ├── dto
│   ├── service
│   └── resources
│
├── email-writer-sb-frontend
│   ├── src
│   ├── public
│   └── assets
│
├── email-writer-ext
│   ├── content.js
│   ├── content.css
│   └── manifest.json
│
└── hello-world-ext
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/OmPimple26/Email-Writer-SB.git
```

Move into project folder:

```bash
cd Email-Writer-SB
```

---

## 🔹 Backend Setup

Move to backend folder:

```bash
cd email-writer-sb-backend
```

Create:

```properties
application.properties
```

Add:

```properties
spring.application.name=email-writer-sb
gemini.api.url=https://generativelanguage.googleapis.com
gemini.api.key=YOUR_GEMINI_API_KEY
```

Run backend:

```bash
mvn spring-boot:run
```

Backend starts at:

```bash
http://localhost:8080
```

---

## 🔹 Frontend Setup

Move to frontend folder:

```bash
cd email-writer-sb-frontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

Frontend starts at:

```bash
http://localhost:5173
```

---

## 🔹 Chrome Extension Setup

1. Open Chrome
2. Navigate to:

```bash
chrome://extensions/
```

3. Enable:

```bash
Developer Mode
```

4. Click:

```bash
Load unpacked
```

5. Select:

```bash
email-writer-ext
```

6. Open Gmail and start composing an email

7. Click:

```bash
AI Reply
```

---

## 📸 Screenshots

<img width="1920" height="864" alt="Email Writer SB Project Home Page" src="https://github.com/user-attachments/assets/bee01ea4-5a5f-4dd5-ad53-5bcf9764afd5" />

---

## 🔮 Future Enhancements

- Add more reply tones
- Add multilingual email generation
- Add user authentication
- Save email history
- Dark mode support
- Deploy frontend and backend

---

## 👨‍💻 Author

**Om Pimple**

GitHub: https://github.com/OmPimple26

---

## ⭐ Support

If you found this project useful, consider giving it a star ⭐
