# Groovy Project: Extensive Technical Handoff

This document provides a comprehensive technical overview of the Groovy platform, designed to give the next AI assistant full context for continued development and debugging.

## 1. Infrastructure Architecture (GCP)
Groovy is hosted on Google Cloud Platform (GCP) using a self-hosted Supabase-style stack deployed via Cloud Run.

*   **Project ID**: `lets-get-grooooooooovy`
*   **Region**: `europe-west2`
*   **Docker Artifact Registry**: `europe-west2-docker.pkg.dev/lets-get-grooooooooovy/groovy-docker`

### **Core Services (Cloud Run)**:
1.  **`groovy-frontend`**: The React/Vite application (Nginx-backed container).
2.  **`groovy-rest`**: PostgREST service (API layer).
3.  **`groovy-auth`**: GoTrue service (Authentication layer).
4.  **`groovy-db`**: PostgreSQL (The single source of truth).

### **Deployment Pipeline (CI/CD)**:
*   **Automatic**: Every `git push origin main` to `https://github.com/groovy-work/groovy-ui-scaffold` triggers an automatic build and deploy.
*   **Trigger**: `groovy-frontend-auto-deploy` (2nd Gen Cloud Build Trigger in `europe-west2`).
*   **Service Account**: Uses the Compute Engine default SA (`1082448614461-compute@developer.gserviceaccount.com`) which has been granted `roles/run.admin` and `roles/secretmanager.secretAccessor`.
*   **Logging**: Configured with `CLOUD_LOGGING_ONLY` to satisfy CMEK security requirements.
*   **Manual Override**: `gcloud builds triggers run groovy-frontend-auto-deploy --branch=main --region=europe-west2`.

---

## 2. Frontend Architecture
The frontend is a modern React SPA using Vite, TypeScript, and a custom "Liquid Glass" design system.

*   **Design Language**: 
    *   Glassmorphism (vibrant colors, blur, gradients, premium micro-animations).
    *   Core styles in `src/index.css`.
*   **Routing**: React Router with a `ProtectedRoute` component that validates both auth session and workspace association.

### **Key Directories**:
*   `/src/contexts`: Contains `AuthContext.tsx` (the "brain" of the app).
*   `/src/lib`: Contains `supabase.ts` (client init) and `workspace.ts` (data fetching logic).
*   `/src/pages`: Page components (Landing, Setup, Space/Marketplace, Settings).
*   `/src/layouts`: Persistent UI wrappers (MarketingLayout, AuthLayout).

---

## 3. Authentication & Workspace Flow
The app uses a 2-tier check: **User Identity** → **Workspace Association**.

### **The Auth Switchboard (`AuthContext.tsx`)**:
*   **Initialization**: 
    1.  `supabase.auth.getSession()` reads from localStorage (instant, no network needed).
    2.  If user exists, it calls `loadWorkspaceData`.
    3.  `onAuthStateChange` listens for subsequent events (login, logout, token refresh).
    4.  **IMPORTANT**: We explicitly skip the `INITIAL_SESSION` event in `onAuthStateChange` because it's already handled by `getSession()`. This prevents a race condition that previously caused infinite loading.

### **Workspace Management (`workspace.ts`)**:
*   `fetchUserProfile(user)`: Gets the row from the `user_profiles` table.
*   `fetchUserWorkspace(user)`: Gets the row from the `company_workspaces` table.
*   `ensureUserProfile(user)`: Creates a profile record if the DB trigger fails.

---

## 4. Credentials & Access

> [!WARNING]
> These are production credentials. Use with caution.

*   **Production URL**: `https://groovy.work`
*   **Supabase URL**: `https://groovy.work` (The LB routes /rest/ and /auth/ to the internal services)
*   **GitHub Repository**: `https://github.com/groovy-work/groovy-ui-scaffold`
*   **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc0NDgyOTk1LCJleHAiOjIwODk4NDI5OTV9.xKmwKufcmjf4jWv_RclCigzNSNo6-zijNgA4Jl3XexA`
*   **DB Status**: **Wiped Clean** as of 2026-03-28. No users currently exist.
*   **Test Admin**: Create a new account with `fawaaz@groovy.work` to begin.

---

## 5. Recent Technical Lessons (Crucial for Debugging)

### **Lesson A: The Concurrency Deadlock**
The previous loading hang was caused because both `getSession` and `onAuthStateChange` fired together. One would lock the state while the other bailed, often resulting in `profile = null` even when data existed.
*   **Solution**: `getSession` handles the cold load. `onAuthStateChange` handles life-cycle events ONLY.

### **Lesson B: PostgREST Schema Cache (503 errors)**
The API occasionally throws `PGRST002 "Could not query database for schema cache"`. 
*   **Solution**: Ensure `PGRST_DB_SCHEMAS` in the Cloud Run env vars includes `public,auth`. Restart the `groovy-rest` service if you see a 503 error during development.

### **Lesson C: Protected Routing**
The `ProtectedRoute` was previously too aggressive, redirecting to `/setup` before the profile had finished loading from the network.
*   **Solution**: The router now respects the `loading` state from `AuthContext`, which only turns `false` after ALL workspace data is resolved.

---

## 6. Common Operations for the next AI

### **Check Database Tables**:
```bash
curl -H "apikey: <ANON_KEY>" "https://groovy.work/rest/v1/user_profiles?limit=5"
```

### **Push Frontend Changes (AUTOMATIC)**:
```bash
# Just push to main. Google Cloud Build takes care of the rest.
git add . && git commit -m "your message" && git push origin main
```

### **Manual Build & Deploy (If Trigger Fails)**:
```bash
gcloud builds submit --config cloudbuild.yaml . --project lets-get-grooooooooovy --region europe-west2
```

### **Debug Service Logs**:
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=groovy-rest" --limit 20 --project lets-get-grooooooooovy
```
