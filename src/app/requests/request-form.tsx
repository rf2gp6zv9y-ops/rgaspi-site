"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type RequestFormProps = {
  email: string;
};

export function RequestForm({ email }: RequestFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          topic: topic.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Произошла ошибка при отправке");
        return;
      }

      setDone(true);
    } catch {
      setError("Не удалось отправить заявку. Попробуйте позже или напишите на " + email);
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-lg font-semibold">Заявка отправлена</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Спасибо за обращение! Сотрудники архива рассмотрят вашу заявку и
            свяжутся с вами указанным контактом.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setDone(false);
            setName("");
            setContact("");
            setTopic("");
            setMessage("");
          }}
        >
          Отправить ещё одну заявку
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="request-name">Ваше имя</Label>
          <Input
            id="request-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Иван Иванов"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="request-contact">Телефон или эл. почта</Label>
          <Input
            id="request-contact"
            name="contact"
            autoComplete="email"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="user@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="request-topic">Тема запроса</Label>
        <Input
          id="request-topic"
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder="Например: архивная справка о трудовом стаже"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="request-message">Текст запроса</Label>
        <Textarea
          id="request-message"
          name="message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Опишите запрос: ФИО, даты, организация, период, что нужно подтвердить или найти"
          required
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={sending} className="w-full sm:w-auto">
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Отправляем…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Отправить запрос
          </>
        )}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Заявка будет обработана сотрудниками архива. Мы свяжемся с вами по
        указанному контакту.
      </p>
    </form>
  );
}
