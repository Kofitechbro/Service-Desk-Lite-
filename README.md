# ServiceDesk Lite

ServiceDesk Lite is a modern React-based IT service desk application designed to streamline support ticket management through a clean, intuitive dashboard. It enables users to create, search, filter, edit, update, and delete support tickets while demonstrating practical frontend development, state management, and responsive UI implementation.

**Live Demo:** https://service-desk-lite-three.vercel.app

## Features

- **Dashboard Overview** — Displays ticket statistics, including total, open, in-progress, and resolved ticket counts.
- **Create Tickets** — Add new support tickets with a title, description, requester, category, and priority.
- **Edit Tickets** — Update existing ticket information through the same form used for ticket creation.
- **Search Tickets** — Quickly find tickets by searching their titles.
- **Filter Tickets** — Filter tickets by status and priority, with support for combining multiple filters.
- **Update Ticket Status** — Change a ticket's status directly from the ticket list.
- **Update Ticket Priority** — Adjust ticket priority without opening the edit form.
- **Delete Tickets** — Remove tickets with a confirmation step to prevent accidental deletion.
- **Ticket Details View** — Open an individual ticket to view its information in a focused details layout.
- **Form Validation** — Prevents ticket creation or editing when required fields are left empty.
- **Responsive Interface** — Adapts the dashboard and ticket-management interface to different screen sizes.
- **Component-Based Architecture** — Organized into modular components (Header, Sidebar, Dashboard, MainContent) for maintainability.

## Tech Stack

- **React** — UI library
- **Vite** — build tool and development server
- **JavaScript (ES6+)** — no TypeScript
- **CSS** (Flexbox) — no CSS framework or component library
- **Git & GitHub** — version control
- **Vercel** — hosting/deployment

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/Kofitechbro/Service-Desk-Lite-.git
```
2. Navigate into the project folder:
```bash
   cd Service-Desk-Lite-
```
3. Install dependencies:
```bash
   npm install
```
4. Start the development server:
```bash
   npm run dev
```
5. Open the URL shown in your terminal (typically `http://localhost:5173`)

## Project Structure

src/
├── components/
│ ├── Header.jsx
│ ├── Sidebar.jsx
│ ├── MainContent.jsx
│ └── Dashboard.jsx
├── data/
│ └── tickets.js
├── App.jsx
├── App.css
└── main.jsx


## Known Limitations

- **Data is not persistent.** Ticket data is stored in React state (`useState`), seeded from a static sample dataset. Refreshing the page or reopening the app resets all tickets to their original state. A future version could add a backend and database for permanent storage.
- No user authentication or role-based access (single-user, frontdesk-style usage only).
- No email notifications.

## About This Project

This project was built as a hands-on learning exercise focused on React fundamentals: component composition, state management, controlled forms, conditional rendering, array methods (`map`, `filter`), and responsive design — without relying on external state-management or UI libraries.