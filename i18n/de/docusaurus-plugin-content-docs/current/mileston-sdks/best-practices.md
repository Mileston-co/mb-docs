---
sidebar_position: 2
---

# Best Practices (Empfohlene Vorgehensweisen)

Die **Mileston Payments SDKs** wurden entwickelt, um Ihre Zahlungsintegration nahtlos, sicher und entwicklerfreundlich zu gestalten. Wenn Sie diese Best Practices befolgen, nutzen Sie sowohl das **Client SDK** als auch das **Backend SDK** effizient und gewährleisten Sicherheit sowie bewährte Entwicklungsstandards.

---

## 🚀 Warum beide SDKs verwenden?

### Frontend + Backend = Nahtlose Integration

Durch die Kombination des **Mileston Client SDK** für benutzerorientierte Zahlungsabläufe und des **Backend SDK** für sichere Backend-Operationen schaffen Sie eine robuste und zuverlässige Zahlungslösung. Egal ob Sie einen Zahlungslink generieren, Rechnungen erstellen oder wiederkehrende Zahlungen verwalten – diese SDKs arbeiten perfekt zusammen.

Zum Beispiel:

- Verwenden Sie das **Client SDK**, um Zahlungslinks, Formulare oder Zahlungsstatus für Nutzer anzuzeigen.
- Verwenden Sie das **Backend SDK**, um Zahlungslinks, Rechnungen oder wiederkehrende Zahlungen sicher zu generieren und zu verwalten.

---

## ⚙️ Beispiel-Workflow: SDKs für einen Zahlungsablauf kombinieren

### Schritt 1: Zahlungslink im Backend generieren

Nutzen Sie das **Backend SDK**, um einen sicheren Zahlungslink zu erstellen.

```typescript
import { PaymentLink } from "mileston-payments";

const apiKey = process.env.MILESTON_API_KEY; // API-Schlüssel niemals hardcoden!
const businessId = process.env.BUSINESS_ID;

const paymentLink = new PaymentLink(apiKey, businessId);

const createPaymentPayload = {
  amount: "100.00",
  description: "Premium-Abonnement",
  customerEmail: "user@example.com",
};

const paymentLinkResponse = await paymentLink.create(createPaymentPayload);
console.log("Zahlungslink:", paymentLinkResponse.paymentLink);
```

### Schritt 2: Zahlungslink im Frontend verwenden

Geben Sie den generierten Zahlungslink an Ihr Frontend weiter. Mit dem **Client SDK** können Sie das Nutzererlebnis verbessern, indem Sie den Link einbetten oder anzeigen.

```javascript
import React from "react";
import { PayButton } from "mileston-payment-client";

const paymentLink = "https://checkout.mileston.co/payment"; // Link, der im Backend generiert wurde

<PayButton
  onPaymentComplete={() => console.log("Zahlung abgeschlossen!")}
  onPaymentDataReceived={(data) =>
    console.log("Zahlungsdaten empfangen:", data)
  }
  onPaymentError={(error) => console.error("Zahlungsfehler:", error)}
  paymentUrl={paymentLink}
  style={{ backgroundColor: "green", color: "white" }}
>
  Jetzt bezahlen
</PayButton>;
```

---

## 🛡️ Sicherheitsbestimmungen

1. **API-Schlüssel sicher aufbewahren**

   - Speichern Sie API-Schlüssel und sensible Informationen in Umgebungsvariablen (`process.env`).
   - Verwenden Sie Dienste wie AWS Secrets Manager, HashiCorp Vault oder Azure Key Vault zur Verwaltung von Geheimnissen.

   🚫 **API-Schlüssel oder Geheimnisse niemals hardcoden!**

2. **Zugriff auf API-Schlüssel einschränken**

   - Beschränken Sie die Berechtigungen des API-Schlüssels auf notwendige Aktionen.
   - Verwenden Sie den **Checkout API-Schlüssel** für clientseitige Integrationen, um eingeschränkten Zugriff zu gewährleisten.
   - Rotieren Sie die Schlüssel regelmäßig, um das Risiko bei einem Leak zu verringern.

3. **HTTPS verwenden**

   - Stellen Sie immer eine sichere Kommunikation zwischen Ihrem Client, Server und der Mileston API sicher.

4. **Sensible Daten tokenisieren**
   - Vermeiden Sie die Offenlegung sensibler Benutzer- oder Zahlungsinformationen. Verwenden Sie von Mileston APIs bereitgestellte Tokens.

---

## 📦 Anwendungsbeispiel: Integration des Zahlungsdashboards

Mileston bietet auch ein **Business Dashboard**, um Zahlungslinks manuell zu erstellen und zu verwalten. Diese Links können dann direkt in das **Client SDK** integriert werden, um sie in Ihre App einzubinden, ohne dass eine Backend-Verarbeitung erforderlich ist.

**Beispiel: Verwendung eines im Dashboard generierten Links**

```javascript
import { MilestonClient } from 'mileston-client-sdk';

const dashboardGeneratedLink = ""https://checkout.mileston.co/payment"";

<PayButton
    onPaymentComplete={() => console.log('Zahlung abgeschlossen!')}
    onPaymentDataReceived={(data) => console.log('Zahlungsdaten empfangen:', data)}
    onPaymentError={(error) => console.error('Zahlungsfehler:', error)}
    paymentUrl={dashboardGeneratedLink}
    style={{ backgroundColor: 'green', color: 'white' }}
    >
    Jetzt bezahlen
</PayButton>
```

---

## 🧰 Fortgeschrittenes Beispiel: Wiederkehrende Zahlungen einfach gemacht

### Backend: Erstellen einer wiederkehrenden Zahlung

```typescript
import { RecurringPayment } from "mileston-payments";

const recurringPayment = new RecurringPayment(apiKey, businessId);

const recurringPayload = {
  amount: "50.00",
  subscriberFullName: "John Doe",
  subscriberEmail: "john.doe@example.com",
  recurringDate: new Date("2025-02-01"),
  recurringInterval: 30,
};

const recurringResponse = await recurringPayment.create(
  "Acme Corp",
  recurringPayload
);
console.log("Wiederkehrende Zahlung erstellt:", recurringResponse);
```

### Frontend: Benutzer benachrichtigen

```javascript
const subscriptionDetails = {
  amount: "50.00",
  nextPaymentDate: "2025-02-01",
};

console.log(
  `Hallo John, Ihre nächste Zahlung von $${subscriptionDetails.amount} ist fällig am ${subscriptionDetails.nextPaymentDate}.`
);
```

---

## 🏆 Entwicklertipps

1. **Im Sandbox-Modus testen**

   - Testen Sie Ihre Integration immer zuerst in einer Sandbox-Umgebung, bevor Sie live gehen.

2. **Antworten zum Debuggen protokollieren**

   - Protokollieren Sie API-Antworten in Ihrem Backend (aber vermeiden Sie sensible Daten!), um Probleme schnell zu debuggen.

3. **Dokumentation nutzen**

   - Konsultieren Sie die [Mileston API-Dokumentation](https://docs.mileston.co) für detaillierte API-Referenzen und erweiterte Anwendungsfälle.

4. **Modular denken**
   - Halten Sie Ihre Zahlungslogik modular, um Aktualisierungen und Skalierungen zu erleichtern.

---

## 💡 Fazit

Die Verwendung der **Mileston SDKs** ist ein Wendepunkt für jedes Unternehmen, das Zahlungen vereinfachen möchte. Egal, ob Sie ein Einzelentwickler oder Teil eines Teams sind, die Integration sowohl des Frontend- als auch des Backend-SDKs gewährleistet ein nahtloses, sicheres und entwicklerfreundliches Erlebnis.

Viel Spaß beim Programmieren! 🚀

---
