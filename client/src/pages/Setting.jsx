import { Bell, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Preferences</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage profile details and workspace behavior.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="size-4 text-primary" />
            Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Input placeholder="Your name" />
          <Input placeholder="Email address" type="email" />
          <Button className="sm:w-fit">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div>
              <p className="font-medium">Daily reminders</p>
              <p className="text-sm text-muted-foreground">Get a nudge for tasks due today.</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div>
              <p className="font-medium">Quiet focus mode</p>
              <p className="text-sm text-muted-foreground">Reduce nonessential alerts.</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/25">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <ShieldCheck className="size-4" />
            Danger Zone
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Button variant="destructive">Delete All Tasks</Button>
        </CardContent>
      </Card>
    </div>
  );
}
