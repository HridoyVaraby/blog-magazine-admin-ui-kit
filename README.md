# Admin UI Kit

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/HridoyVaraby/blog-magazine-admin-ui-kit)
[![npm](https://img.shields.io/npm/v/blog-magazine-admin-ui-kit)](https://www.npmjs.com/package/blog-magazine-admin-ui-kit)

A **standalone Admin Dashboard UI Kit** for Next.js projects. Built with React 19, Tailwind CSS, and shadcn/ui components.

> 🤖 **AI-First Documentation** — This README is optimized for AI coding assistants (Cursor, Windsurf, Cline, etc.)

**Repository:** https://github.com/HridoyVaraby/blog-magazine-admin-ui-kit.git  
**npm:** https://www.npmjs.com/package/blog-magazine-admin-ui-kit

---

## ⚡ Quick Install (CLI)

The easiest way to install the Admin UI Kit into your existing Next.js project:

```bash
npx blog-magazine-admin-ui-kit
```

This will:
- Clone the kit to a temp folder
- Copy admin routes, components, hooks, and utilities
- Auto-detect your package manager (pnpm/npm/yarn/bun)
- Install all required dependencies
- Clean up temp files

---

## 📦 Section 1: Dependencies

### Complete Install Command

```bash
pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @tanstack/react-query class-variance-authority clsx cmdk date-fns lucide-react next-auth@beta tailwind-merge zod
```

### Dev Dependencies

```bash
pnpm add -D @tailwindcss/typography autoprefixer postcss tailwindcss
```

---

## 🗂️ Section 2: Integration Logic (Folder Mapping)

| Kit Source | Target Destination | Description |
|------------|-------------------|-------------|
| `app/admin/` | `your-app/app/admin/` | All admin routes (dashboard, posts, categories, etc.) |
| `app/api/auth/` | `your-app/app/api/auth/` | Auth API handler (NextAuth v5) |
| `components/ui/` | `your-app/components/ui/` | 43 shadcn/ui components |
| `components/admin/` | `your-app/components/admin/` | Admin-specific components (Sidebar, RichTextEditor, etc.) |
| `components/providers.tsx` | `your-app/components/providers.tsx` | SessionProvider + QueryClientProvider |
| `hooks/` | `your-app/hooks/` | 17 custom hooks (use-toast, use-auth, etc.) |
| `lib/utils.ts` | `your-app/lib/utils.ts` | `cn()` helper + utility functions |
| `auth.ts` | `your-app/auth.ts` | NextAuth v5 configuration |
| `app/globals.css` | Merge with existing | CSS variables for theming |
| `tailwind.config.ts` | Merge with existing | Extended theme config |

---

## 🤖 Section 3: The Master Prompt

**Copy this prompt into your AI coding assistant to integrate this kit:**

````markdown
## Task: Integrate Admin UI Kit

I want to integrate the Admin UI Kit from https://github.com/HridoyVaraby/blog-magazine-admin-ui-kit.git into this Next.js project.

### Step 1: Install Dependencies
> ⚠️ **Skip any packages that are already installed in your project.**

```bash
# Check package.json first, then only install missing packages
pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @tanstack/react-query class-variance-authority clsx cmdk date-fns lucide-react next-auth@beta tailwind-merge zod

pnpm add -D @tailwindcss/typography
```

### Step 2: Clone the Kit
```bash
git clone https://github.com/HridoyVaraby/blog-magazine-admin-ui-kit.git /tmp/admin-ui-kit
```

### Step 3: Copy Files
```bash
# Copy admin routes
cp -r /tmp/admin-ui-kit/app/admin ./app/admin

# Copy auth API route
mkdir -p ./app/api/auth
cp -r /tmp/admin-ui-kit/app/api/auth/\[...nextauth\] ./app/api/auth/

# Copy UI components (merge if exists)
cp -r /tmp/admin-ui-kit/components/ui ./components/
cp -r /tmp/admin-ui-kit/components/admin ./components/

# Copy providers
cp /tmp/admin-ui-kit/components/providers.tsx ./components/

# Copy hooks
cp -r /tmp/admin-ui-kit/hooks ./

# Copy auth config
cp /tmp/admin-ui-kit/auth.ts ./
```

### Step 4: Merge globals.css
Add these CSS variables to your `app/globals.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

### Step 5: Update tailwind.config.ts
Add to your content array:
```ts
content: [
  "./app/admin/**/*.{js,ts,jsx,tsx}",
  "./components/admin/**/*.{js,ts,jsx,tsx}",
  "./components/ui/**/*.{js,ts,jsx,tsx}",
]
```

Add the extended theme colors for shadcn/ui theming.

### Step 6: Wrap App with Providers
Update your root `layout.tsx` to wrap children with `<Providers>`:
```tsx
import { Providers } from "@/components/providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Step 7: Set Environment Variables
Create `.env`:
```
AUTH_SECRET="generate-with-npx-auth-secret"
```

### Step 8: Configure lib/utils.ts
Ensure you have the `cn()` helper:
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Done!
Navigate to `/admin` to see the dashboard.
````

---

## 📁 Project Structure

```
admin-ui-kit/
├── app/
│   ├── admin/              # Admin dashboard routes
│   │   ├── page.tsx        # Dashboard home
│   │   ├── posts/          # Posts management
│   │   ├── categories/     # Categories management
│   │   ├── tags/           # Tags management
│   │   └── ...
│   ├── api/auth/           # NextAuth API handlers
│   ├── globals.css         # CSS variables
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # 43 shadcn/ui components
│   ├── admin/              # Admin-specific components
│   └── providers.tsx       # Context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── auth.ts                 # NextAuth v5 config
└── tailwind.config.ts      # Tailwind configuration
```

---

## 🚀 Quick Start (Standalone)

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open http://localhost:3000/admin
```

---

## 📝 Notes for AI Agents

- **Demo Mode**: Authentication is bypassed by default. Enable by uncommenting code in `app/admin/layout.tsx`.
- **Stub Files**: `lib/prisma.ts`, `lib/auth.ts`, `lib/minio.ts` are stubs — replace with your implementations.
- **Bangla UI**: Text labels are in Bangla — replace with your preferred language.
- **NextAuth v5 Beta**: Uses the beta version for React 19 compatibility.

---

## License

MIT
