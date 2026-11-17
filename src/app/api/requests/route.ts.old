import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "requests.json");

interface RequestItem {
  id: string;
  createdAt: string;
  name: string;
  contact: string;
  topic: string;
  message: string;
  processed: boolean;
}

async function readRequests(): Promise<RequestItem[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeRequests(data: RequestItem[]): Promise<void> {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const requests = await readRequests();
  return NextResponse.json(requests);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contact, topic, message } = body;

    if (!name?.trim() || !contact?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Заполните обязательные поля: имя, контакт и текст запроса" },
        { status: 400 }
      );
    }

    const requests = await readRequests();
    const newItem: RequestItem = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      contact: contact.trim(),
      topic: topic?.trim() || "",
      message: message.trim(),
      processed: false,
    };

    requests.unshift(newItem);
    await writeRequests(requests);

    return NextResponse.json({ ok: true, id: newItem.id });
  } catch {
    return NextResponse.json(
      { error: "Ошибка при сохранении заявки" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Не указан ID заявки" },
        { status: 400 }
      );
    }

    const requests = await readRequests();
    const index = requests.findIndex((r) => r.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Заявка не найдена" },
        { status: 404 }
      );
    }

    requests[index].processed = !requests[index].processed;
    await writeRequests(requests);

    return NextResponse.json({ ok: true, processed: requests[index].processed });
  } catch {
    return NextResponse.json(
      { error: "Ошибка при обновлении заявки" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Не указан ID заявки" },
        { status: 400 }
      );
    }

    const requests = await readRequests();
    const filtered = requests.filter((r) => r.id !== id);

    if (filtered.length === requests.length) {
      return NextResponse.json(
        { error: "Заявка не найдена" },
        { status: 404 }
      );
    }

    await writeRequests(filtered);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Ошибка при удалении заявки" },
      { status: 500 }
    );
  }
}
