"use client";

import { useState, useRef } from "react";
import {
  User,
  Palette,
  Upload,
  Download,
  AlertTriangle,
  Moon,
  Sun,
  Monitor,
  FileUp,
  Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ThemeOption = "light" | "dark" | "system";

interface ThemeCardProps {
  value: ThemeOption;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onSelect: () => void;
}

function ThemeCard({
  value,
  label,
  icon: Icon,
  isActive,
  onSelect,
}: ThemeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:bg-accent",
        isActive
          ? "border-primary bg-primary/5"
          : "border-transparent bg-muted/50"
      )}
    >
      <Icon
        className={cn(
          "size-6",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      />
      <span
        className={cn(
          "text-xs font-medium",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </button>
  );
}

function DeleteAccountDialog() {
  const [confirmText, setConfirmText] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">アカウントを削除</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            アカウントの削除
          </DialogTitle>
          <DialogDescription>
            この操作は取り消せません。すべてのデータ（ブックマーク、コレクション、チャット履歴）が完全に削除されます。
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Label htmlFor="delete-confirm">
            確認のため「削除」と入力してください
          </Label>
          <Input
            id="delete-confirm"
            type="text"
            placeholder="削除"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            キャンセル
          </Button>
          <Button variant="destructive" disabled={confirmText !== "削除"}>
            アカウントを完全に削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    // Placeholder: actual import logic would parse the HTML bookmark file
    setTimeout(() => {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">設定</h1>
        <p className="text-sm text-muted-foreground">
          アカウントとアプリケーションの設定を管理します。
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="size-4" />
            プロフィール
          </CardTitle>
          <CardDescription>
            アカウントの基本情報です。変更はClerkのアカウント設定から行えます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isLoaded ? (
            <div className="flex items-center gap-4">
              <Skeleton className="size-14 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Avatar size="lg" className="size-14">
                {user?.imageUrl && (
                  <AvatarImage
                    src={user.imageUrl}
                    alt={user.fullName || ""}
                  />
                )}
                <AvatarFallback className="text-lg">
                  {user?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold">
                  {user?.fullName || user?.username || "ユーザー"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user?.primaryEmailAddress?.emailAddress || ""}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="size-4" />
            外観
          </CardTitle>
          <CardDescription>
            アプリケーションのテーマを設定します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <ThemeCard
              value="light"
              label="ライト"
              icon={Sun}
              isActive={theme === "light"}
              onSelect={() => setTheme("light")}
            />
            <ThemeCard
              value="dark"
              label="ダーク"
              icon={Moon}
              isActive={theme === "dark"}
              onSelect={() => setTheme("dark")}
            />
            <ThemeCard
              value="system"
              label="システム"
              icon={Monitor}
              isActive={theme === "system"}
              onSelect={() => setTheme("system")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Import / Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Upload className="size-4" />
            データ管理
          </CardTitle>
          <CardDescription>
            ブックマークのインポート・エクスポートができます。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Import */}
          <div className="flex flex-col gap-3 rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileUp className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  ブラウザブックマークをインポート
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Chrome、Firefox、SafariなどからエクスポートしたHTML形式のブックマークファイルを取り込めます。
                </p>
              </div>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".html,.htm"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleImport}
                disabled={isImporting}
              >
                {isImporting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    インポート中...
                  </>
                ) : (
                  <>
                    <Upload className="size-4" />
                    HTMLファイルを選択
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Export */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Download className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium">データをエクスポート</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  すべてのブックマークとコレクションをJSON形式でダウンロードします。
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              エクスポート
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-destructive">
            <AlertTriangle className="size-4" />
            危険な操作
          </CardTitle>
          <CardDescription>
            以下の操作は取り消すことができません。十分にご注意ください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div>
              <p className="text-sm font-medium">アカウントを削除</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                アカウントとすべてのデータを完全に削除します。
              </p>
            </div>
            <DeleteAccountDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
