import { useState } from "react";
import { Sun, Moon, Check, type LucideIcon } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { user } from "@/mock/dashboard";

// ─── types ────────────────────────────────────────────────────────────────────

type Theme = "light" | "dark";
type TabKey = "profile" | "appearance" | "password";

// ─── shared ───────────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
   return (
      <label className="text-forground-muted mb-1.5 block text-xs font-medium">{children}</label>
   );
}

// ─── ProfileSection ───────────────────────────────────────────────────────────

function ProfileSection() {
   const [name, setName] = useState(user.name);
   const [saving, setSaving] = useState(false);

   const dirty = name.trim() !== user.name && name.trim().length > 0;

   function onSave(e: React.FormEvent) {
      e.preventDefault();
      if (!dirty) return;
      setSaving(true);
      console.log("Save profile →", { name: name.trim() });
      setTimeout(() => setSaving(false), 600); // simulate async
   }

   return (
      <Card
         padding="lg"
         className="max-w-2xl"
      >
         <CardHeader>
            <div>
               <CardTitle className="text-base">Profile</CardTitle>
               <CardDescription className="mt-1">
                  Your display name appears on the dashboard greeting and on your resumes.
               </CardDescription>
            </div>
         </CardHeader>

         <form
            onSubmit={onSave}
            className="space-y-4"
         >
            <div className="flex items-center gap-4">
               <div className="bg-accent-soft text-accent-strong ring-surface dark:text-forground dark:bg-accent-strong flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold ring-2">
                  {(user.name[0] ?? "?").toUpperCase()}
               </div>
               <div className="text-forground-muted text-xs">
                  Avatar is generated from your initial.
               </div>
            </div>

            <div>
               <FieldLabel>Full name</FieldLabel>
               <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  placeholder="Your name"
               />
            </div>

            <div>
               <FieldLabel>Email</FieldLabel>
               <Input
                  value={user.email}
                  disabled
               />
               <p className="text-forground-muted mt-1.5 text-[11px]">
                  Email changes aren&apos;t supported yet.
               </p>
            </div>

            <div className="flex justify-end pt-2">
               <Button
                  type="submit"
                  disabled={!dirty || saving}
               >
                  {saving ? "Saving..." : "Save changes"}
               </Button>
            </div>
         </form>
      </Card>
   );
}

// ─── AppearanceSection ────────────────────────────────────────────────────────

interface ThemeOptionProps {
   value: Theme;
   label: string;
   icon: LucideIcon;
   current: Theme;
   onSelect: (v: Theme) => void;
}

function ThemeOption({ value, label, icon: Icon, current, onSelect }: ThemeOptionProps) {
   const active = current === value;
   return (
      <button
         type="button"
         onClick={() => onSelect(value)}
         className={cn(
            "relative flex flex-1 flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all",
            active ? "border-accent bg-accent-soft" : "bg-surface hover:bg-surface-2",
         )}
      >
         <div
            className={cn(
               "flex h-9 w-9 items-center justify-center rounded-xl",
               active ? "bg-accent-strong text-white" : "text-forground-muted bg-surface-2",
            )}
         >
            <Icon size={16} />
         </div>
         <div>
            <div className="text-sm font-semibold">{label}</div>
            <div className="text-forground-muted mt-0.5 text-[11px]">
               {value === "light" ? "Soft, airy, sage tones" : "Calm, low-glare night"}
            </div>
         </div>
         {active && (
            <span className="bg-accent-strong absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full text-white">
               <Check size={12} />
            </span>
         )}
      </button>
   );
}

function AppearanceSection() {
   const { setTheme, theme } = useTheme();

   function handleTheme(value: Theme) {
      setTheme(value);
   }

   return (
      <Card
         padding="lg"
         className="max-w-2xl"
      >
         <CardHeader>
            <div>
               <CardTitle className="text-base">Appearance</CardTitle>
               <CardDescription className="mt-1">
                  Pick a theme. Your choice is remembered on this device.
               </CardDescription>
            </div>
         </CardHeader>

         <div className="flex gap-3">
            <ThemeOption
               value="light"
               label="Light"
               icon={Sun}
               current={theme}
               onSelect={handleTheme}
            />
            <ThemeOption
               value="dark"
               label="Dark"
               icon={Moon}
               current={theme}
               onSelect={handleTheme}
            />
         </div>
      </Card>
   );
}

// ─── PasswordSection ──────────────────────────────────────────────────────────

function PasswordSection() {
   const [currentPassword, setCurrent] = useState("");
   const [newPassword, setNext] = useState("");
   const [confirm, setConfirm] = useState("");
   const [saving, setSaving] = useState(false);

   const newTooShort = newPassword.length > 0 && newPassword.length < 8;
   const mismatch = confirm.length > 0 && confirm !== newPassword;
   const canSubmit =
      currentPassword.length > 0 && newPassword.length >= 8 && confirm === newPassword && !saving;

   function onSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!canSubmit) return;
      setSaving(true);
      console.log("Change password →", { currentPassword, newPassword });
      setTimeout(() => {
         setCurrent("");
         setNext("");
         setConfirm("");
         setSaving(false);
      }, 600);
   }

   return (
      <Card
         padding="lg"
         className="max-w-2xl"
      >
         <CardHeader>
            <div>
               <CardTitle className="text-base">Password</CardTitle>
               <CardDescription className="mt-1">
                  Use at least 8 characters. Mix letters, numbers, and a symbol for a stronger
                  password.
               </CardDescription>
            </div>
         </CardHeader>

         <form
            onSubmit={onSubmit}
            className="space-y-4"
         >
            <div>
               <FieldLabel>Current password</FieldLabel>
               <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrent(e.target.value)}
                  autoComplete="current-password"
               />
            </div>

            <div>
               <FieldLabel>New password</FieldLabel>
               <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNext(e.target.value)}
                  autoComplete="new-password"
               />
               {newTooShort && (
                  <p className="text-danger mt-1.5 text-[11px]">
                     Needs to be at least 8 characters.
                  </p>
               )}
            </div>

            <div>
               <FieldLabel>Confirm new password</FieldLabel>
               <Input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
               />
               {mismatch && (
                  <p className="text-danger mt-1.5 text-[11px]">Passwords don&apos;t match.</p>
               )}
            </div>

            <div className="flex justify-end pt-2">
               <Button
                  type="submit"
                  disabled={!canSubmit}
               >
                  {saving ? "Updating..." : "Update password"}
               </Button>
            </div>
         </form>
      </Card>
   );
}

// ─── Settings page ────────────────────────────────────────────────────────────

export default function Settings() {
   const [tab, setTab] = useState<TabKey>("profile");

   return (
      <section className="flex-1 space-y-5">
         <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Settings</h2>
            <p className="text-forground-muted text-sm leading-relaxed">
               Manage your account, look &amp; feel, and password.
            </p>
         </div>

         <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as TabKey)}
         >
            <TabsList>
               <TabsTrigger value="profile">Profile</TabsTrigger>
               <TabsTrigger value="appearance">Appearance</TabsTrigger>
               <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <div className="mt-6">
               <TabsContent value="profile">
                  <ProfileSection />
               </TabsContent>
               <TabsContent value="appearance">
                  <AppearanceSection />
               </TabsContent>
               <TabsContent value="password">
                  <PasswordSection />
               </TabsContent>
            </div>
         </Tabs>
      </section>
   );
}
