import { NextResponse } from "next/server";
import { sendEmail } from "@/libs/mailgun";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    let name, email, phone, message;
    if (isJson) {
      ({ name, email, phone, message } = await req.json());
    } else {
      const form = await req.formData();
      name = (form.get("name") || "").toString();
      email = (form.get("email") || "").toString();
      phone = (form.get("phone") || "").toString();
      message = (form.get("message") || "").toString();
    }

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
    }

    const toEmail = process.env.TO_EMAIL || "info@abservice.be";
    const subject = `Nieuwe contactaanvraag van ${name}`;
    const text = `Naam: ${name}\nE-mail: ${email}\nTelefoon: ${phone}\n\nBericht:\n${message || "(geen bericht)"}`;
    const html = `
      <h2>Nieuwe contactaanvraag via website</h2>
      <p><strong>Naam:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefoon:</strong> ${phone}</p>
      <p><strong>Bericht:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    await sendEmail({ to: toEmail, subject, text, html, replyTo: email });

    if (!isJson) {
      const referer = req.headers.get("referer") || "/";
      const url = new URL(referer);
      url.searchParams.set("contact", "success");
      url.hash = "contact";
      return NextResponse.redirect(url, 303);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/contact error:", e);
    const contentType = req.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    if (!isJson) {
      const referer = req.headers.get("referer") || "/";
      const url = new URL(referer);
      url.searchParams.set("contact", "error");
      url.hash = "contact";
      return NextResponse.redirect(url, 303);
    }
    return NextResponse.json({ error: e?.message || "Er ging iets mis." }, { status: 500 });
  }
}
