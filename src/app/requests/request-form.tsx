"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
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

  const mailto = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const lines = [
      `Имя: ${name.trim()}`,
      `Контакт: ${contact.trim()}`,
      "",
      message.trim(),
    ];

    const url =
      `mailto:${email}` +
      `?subject=${encodeURIComponent(`Запрос в архив: ${topic.trim() || "без темы"}`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;

    setSending(true);
    setError(null);
    try {
      window.location.href = url;
      setDone(true);
    } catch {
      setError("Не удалось открыть почтовую программу. Напишите нам вручную.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Почтовая программа должна открыться с готовым письмом — проверьте и
          нажмите «Отправить». Если она не открылась,{" "}
          <button
            type="button"
            onClick={() => setDone(false)}
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            вернитесь к форме
          </button>{" "}
          или напишите на{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-primary hover:underline"
          >
            {email}
          </a>{" "}
          вручную.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={mailto} className="space-y-4" noValidate={false}>
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
            Открываем почту…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Отправить по эл. почте
          </>
        )}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Письмо уйдёт на {email} из вашей почтовой программы — перед отправкой
        можно проверить текст.
      </p>
    </form>
  );
}
