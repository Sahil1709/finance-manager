"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { useTheme } from "@/components/theme/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Button } from "@/components/ui/button"

const colorThemes = [
  {
    name: "Red",
    value: "red",
    color: "hsl(0 72.2% 50.6%)",
  },
  {
    name: "Blue",
    value: "blue",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  {
    name: "Green",
    value: "green",
    color: "hsl(142.1 76.2% 36.3%)",
  },
  {
    name: "Purple",
    value: "purple",
    color: "hsl(262.1 83.3% 57.8%)",
  },
  {
    name: "Orange",
    value: "orange",
    color: "hsl(24.6 95% 53.1%)",
  },
]

const radiusOptions = [
  { name: "None", value: "none" },
  { name: "Small", value: "sm" },
  { name: "Medium", value: "md" },
  { name: "Large", value: "lg" },
]

export default function SettingsPage() {
  const { colorTheme, setColorTheme, radius, setRadius } = useTheme()
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the appearance of the app. Automatically switches between day and night themes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="theme-mode">Theme Mode</Label>
              <ThemeSwitcher />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color-theme">Color Theme</Label>
              <Select value={colorTheme} onValueChange={(value: any) => setColorTheme(value)}>
                <SelectTrigger id="color-theme">
                  <SelectValue placeholder="Select theme color" />
                </SelectTrigger>
                <SelectContent>
                  {colorThemes.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: theme.color }} />
                        {theme.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="radius">Border Radius</Label>
              <Select value={radius} onValueChange={(value: any) => setRadius(value)}>
                <SelectTrigger id="radius">
                  <SelectValue placeholder="Select border radius" />
                </SelectTrigger>
                <SelectContent>
                  {radiusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Preview</CardTitle>
          <CardDescription>Preview how your theme selections look with different components.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Input className="w-[200px]" placeholder="Input field" />
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

