"use client";

import { useEffect, useState } from "react";
import { LogOut, CheckCircle2, Circle, Loader2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions";

interface RequestItem {
  id: string;
  createdAt: string;
  name: string;
  contact: string;
  topic: string;
  message: string;
  processed: boolean;
}

export function RequestsList() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Ошибка загрузки заявок:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleToggleProcessed = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, processed: !r.processed } : r))
        );
      }
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить заявку?")) return;
    setActionLoading(id);
    try {
      const res = await fetch("/api/requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = requests.filter((r) => !r.processed).length;

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Управление заявками
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {pendingCount > 0
              ? `${pendingCount} ${pendingCount === 1 ? "заявка" : pendingCount < 5 ? "заявки" : "заявок"} ожидают обработки`
              : "Все заявки обработаны"}
          </p>
        </div>
        <form action={logoutAction}>
          <Button variant="outline" size="sm" type="submit">
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">Заявок пока нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className={`rounded-lg border p-4 transition-all ${
                req.processed
                  ? "bg-muted/30 opacity-70"
                  : "bg-background"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{req.name}</span>
                    <Badge
                      variant={req.processed ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {req.processed ? (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      ) : (
                        <Circle className="mr-1 h-3 w-3" />
                      )}
                      {req.processed ? "Обработана" : "Новая"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(req.createdAt)}
                    </span>
                  </div>

                  {req.topic && (
                    <p className="text-sm font-medium text-muted-foreground">
                      {req.topic}
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground">
                    Контакт: {req.contact}
                  </p>

                  <div className="rounded-md bg-secondary/50 p-3 text-sm leading-relaxed">
                    {req.message}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleProcessed(req.id)}
                    disabled={actionLoading === req.id}
                    title={
                      req.processed
                        ? "Вернуть в необработанные"
                        : "Отметить как обработанную"
                    }
                  >
                    {actionLoading === req.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : req.processed ? (
                      <>
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        Обработана
                      </>
                    ) : (
                      <>
                        <Circle className="mr-1 h-4 w-4" />
                        Обработать
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(req.id)}
                    disabled={actionLoading === req.id}
                    className="text-destructive hover:text-destructive"
                    title="Удалить заявку"
                  >
                    {actionLoading === req.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
