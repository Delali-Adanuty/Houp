
<div align="center">
  <h1>Houp</h1>
  <p>Connecting the campus, one ride at a time.</p>
</div>

<h3>Houp (React + Firebase MVP)</h3>

<p>
Houp is a student-exclusive, "along-the-way" ride-hailing platform designed to make campus commutes safer, cheaper, and more community-oriented. By leveraging verified university credentials, Houp connects student drivers with peers heading in the same direction.

This repository contains the original MVP architecture, built for rapid deployment and real-time synchronization.
</p>
<br>

<h3>Key Features</h3>

Verified Student Access: Secure authentication restricted to university email domains.

Real-Time Ride Matching: Seamless state synchronization between drivers and riders using Firebase.

"Along-the-Way" Logistics: Designed for casual pickups rather than professional taxi services, focusing on existing student routes.

Live Database: NoSQL architecture for instant updates on ride availability and status.

<br>
<h3>
Tech Stack
</h3>

Frontend: React.js

Backend/Database: Firebase (Authentication & Firestore/Realtime Database)

Hosting/Deployment: Netlify with CI/CD integration

State Management: React Hooks and Firebase listeners

<br>
<h3>
Roadmap
</h3>

While this React/Firebase version served as the proof of concept, the project is evolving. Future iterations include:

Migration to FastAPI and SQLModel for more complex backend logic.

Mobile-first optimization using React Native.

Enhanced route-matching algorithms.

<br>
<h3>
How It Works
</h3>


The app operates on a simple "Request and Match" flow designed for the campus environment:

1. Authentication
Student Verification: Users sign up using their university email (.edu).

Firebase Auth: The system handles secure login and ensures only verified students can access the ride pool.

2. The Rider's Journey
Post a Request: A student looking for a ride enters their destination and current location.

Real-Time Listing: The request is written to the Firestore rides collection, which triggers an update on all active drivers' screens via a snapshot listener.

3. The Driver's Journey
Browse Routes: Drivers see a list of students whose destinations align with their own "along-the-way" route.

Accept Ride: When a driver accepts, the ride status updates to "Matched" in Firebase.

Live Sync: Both users receive an instant notification/UI update showing the match is confirmed.

4. The "Houp" (Pickup)
Coordination: Using the real-time data, the driver picks up the student at the designated campus spot.

Completion: Once the trip is over, the driver marks it as complete, clearing the entry from the active pool.
