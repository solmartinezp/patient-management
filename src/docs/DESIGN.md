🧠 Design Decisions & Tooling Overview

This project is a patient data management interface built using React and TypeScript, focused on accessibility, responsiveness, modular architecture, and smooth user experience. Below is an overview of the main technical and design decisions made throughout the development.

📁 Folder Structure

patient-management/
├── public/
├── src/
│   ├── components/     
│   ├── constants/
│   └── enums/
|   └── hooks/
|   └── pages/
|   └── types/
├── App.tsx
├── App.css
├── i18n.ts
├── package.json
└── README.md

This modular structure promotes separation of concerns, reusability, and scalability.

🔧 Technologies & Libraries
1. React Query
Used to handle asynchronous data fetching from the public API that provides patient records.

React Query (or TanStack Query) is a powerful data synchronization library for React. It manages server state, handles caching, background updates, and provides tools to handle loading and error states efficiently.

Reduces boilerplate code for API calls.

Enhances performance through intelligent caching.

Simplifies data synchronization and pagination.

2. react-i18next
Used for internationalization and managing all UI text content.

react-i18next is a powerful internationalization framework for React based on i18next. It provides language detection, translation management, and dynamic switching capabilities.

Enables multilingual support (even if not required yet).

Makes text management scalable and maintainable.

Centralizes string resources for clarity.

3. React Hook Form
Used for building the forms that allow users to add or edit patient records.

React Hook Form is a performant, flexible library for building form interfaces in React using uncontrolled inputs and React Hooks.

Reduces re-rendering and improves performance.

Provides built-in validation capabilities.

Integrates easily with custom UI components.

4. TypeScript
The entire codebase is written in TypeScript.

TypeScript is a statically typed superset of JavaScript that provides optional type-checking at compile time.

Catches errors early during development.

Enhances IDE support and developer experience.

Makes code easier to understand, document, and maintain.

🎨 UI/UX & Styling Decisions
All styles are written using pure CSS, avoiding utility-based frameworks like Tailwind CSS.

This decision was made to maximize code readability for reviewers and align with the challenge restrictions.

Components are styled with maintainability in mind.

CSS Variables (variables.css) are used for global design tokens such as primary colors, font stacks, etc.

Promotes DRY (Don’t Repeat Yourself) principles.

Enables quick theme adjustments.

Custom reusable components:

Button

Input

Modal

Spinner

Toast, among others.

These components abstract away repetitive logic and design patterns, improving maintainability and consistency.

CSS Animations are carefully integrated for interactive, responsive UI without compromising user experience.

A highlight is the animated border on the patient cards, which transitions on hover.

The expand/collapse mechanism of the cards was tuned to avoid excessive motion, ensuring usability and clarity.

📱 Mobile-First Responsiveness
The project follows a mobile-first approach to responsive design.

Mobile-first means designing the layout for small screens first, then adapting it for larger ones via media queries.

Benefits:

Ensures the app is usable on all devices, especially mobile where constraints are tighter.

Simplifies progressive enhancement (adding features for larger screens, not removing them for smaller ones).

🖼️ Icons & Illustrations
All illustrations and avatars were sourced from undraw.co, which provides open-source SVGs.

These are free for public use.

Easily customizable to match the project’s color scheme.

Illustrations (e.g., doctors, health workers) match the domain of the application.

✅ Summary
This project demonstrates best practices in:

Frontend architecture

State management and form handling

Reusability of UI components

Clean styling without external UI libraries

Internationalization readiness

Developer experience with TypeScript

All of this was done while carefully balancing UX aesthetics and professional tone appropriate for the healthcare domain.