# 🍽️ PlateMate – One Meal Saved, One Meal Served.

PlateMate isn't something fancy.  
Neither is it just another food waste management tool.  
It’s a **simple yet powerful community platform** that creates real impact — one plate at a time.  

---

## 🌍 What is PlateMate?

**PlateMate** is a web application built during the **GDSC Hawkathon 2025** with the theme: _“Tech for Community: Build with AI.”_  

It connects individuals with **excess or leftover food** to nearby people in need — fostering a circular food economy while reducing food waste and promoting kindness.

---

## 💡 Key Features

- 🥘 **Post a Meal:** Anyone with excess food can easily post it — including details like location, freshness, and image.
- 🔍 **Find Food Nearby:** Visitors can discover available meals filtered by their ZIP code.
- 📩 **Request a Meal:** Users can request any meal and instantly notify the donor via email/SMS.
- 🧠 **AI-Powered Recipe Recommender:** If someone has leftovers but doesn’t know what to make, our integrated **AI recipe assistant** generates creative, zero-waste meals from those ingredients.
- 🏆 **Leaderboard:** Recognize top food donors and encourage kindness with a points system.

---

## 🧠 AI Integration (Powered by Gemini API)

Our project includes a **completely free AI integration** using Google’s **Gemini Pro API** to help users:

- Convert leftover ingredients into delicious recipes.
- Promote **smart food utilization** instead of unnecessary disposal.
- Help users find value in even small quantities of food.

AI Recipe Recommender can be accessed from the homepage or while posting food — making the whole process more engaging and helpful.

---

## 🧪 Tech Stack

- **Frontend:** Next.js 15, TypeScript, TailwindCSS, Radix UI
- **Backend:** Firebase (Auth, Firestore, Storage)
- **AI API:** Google Gemini Pro (via `@google/generative-ai`)
- **Email/SMS:** EmailJS (free-tier)
- **Hosting:** Vercel

---

## ⚖️ Responsibility & Trust

We do **not verify the freshness or safety of shared food**. Users are encouraged to:

- Mark food clearly as **fresh, same-day, or leftovers**.
- Share responsibly.
- Request and consume food at their own discretion.

> ⚠️ **Disclaimer:** PlateMate serves as a connector. The platform does **not take legal responsibility** for food quality or resulting health effects.

---

## 👨‍💻 Team BigBulls – Hackathon Warriors

| Name               | Role              |
|--------------------|-------------------|
| 🧑‍💻 Puskar Pandel     | Frontend & UX     |
| 🧑‍💻 Sushil Phuyal     | AI Integration & Lead |
| 👩‍💻 Karuna Adhikari   | Firebase & Forms  |
| 🧑‍💻 Rupak Bhattarai   | UI/Testing        |

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/sushilneo/PlateMate.git
cd PlateMate
pnpm install
pnpm dev
