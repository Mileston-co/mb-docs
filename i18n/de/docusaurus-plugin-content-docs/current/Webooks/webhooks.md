# Webhooks

---

## Übersicht

Webhooks ermöglichen es Ihnen, Echtzeit-Benachrichtigungen zu erhalten, wenn bestimmte Ereignisse auf der Mileston Business-Plattform auftreten. Sie können Webhooks nutzen, um Workflows zu automatisieren, Ihre Datenbank zu aktualisieren oder andere Aktionen in Ihrer Anwendung auszulösen.

Der **Entwickler-Tab** im Mileston Business-Dashboard bietet eine Oberfläche zur Verwaltung Ihrer Webhooks, einschließlich Registrierung neuer Webhooks, Anzeige bestehender und Löschen von Webhooks.

---

## Zugriff auf den Entwickler-Tab

1. Melden Sie sich in Ihrem Mileston Business-Konto an.
2. Navigieren Sie im Seitenmenü zum **Entwickler-Tab**.
3. Im Bereich **Webhooks** finden Sie Optionen zur Verwaltung Ihrer Webhooks.

---

## Einrichten von Webhooks

### **Schritt 1: Webhook registrieren**

1. Gehen Sie im **Entwickler-Tab** zum Bereich **Webhooks**.
2. Klicken Sie auf die Schaltfläche **Webhook registrieren**.
3. Füllen Sie die folgenden Angaben aus:

   - **Endpoint-URL**: Die URL Ihres Webhook-Endpunkts, an die Ereignisse gesendet werden.
   - **Verifizierungstoken**: Ein Token, das zur Überprüfung der Echtheit von Webhook-Anfragen verwendet wird.
   - **Events**: Wählen Sie die Ereignisse aus, die Sie abonnieren möchten. Wenn keine ausgewählt werden, werden die Standard-Events (`invoice-paid`, `paymentlink-paid`, `recurring-paid`) verwendet.

4. Klicken Sie auf **Speichern**, um den Webhook zu registrieren.

---

### **Schritt 2: Registrierte Webhooks anzeigen**

Im Bereich **Webhooks** des **Entwickler-Tabs** sehen Sie eine Liste aller registrierten Webhooks.

---

### **Schritt 3: Webhook löschen**

1. Suchen Sie den Webhook, den Sie löschen möchten, in der Liste der registrierten Webhooks.
2. Klicken Sie auf die Schaltfläche **Löschen** neben dem Webhook.

---

## Webhook-Ereignisse

Die folgenden Ereignisse werden unterstützt:

- **`invoice-paid`**: Ausgelöst, wenn eine Rechnung bezahlt wird.
- **`paymentlink-paid`**: Ausgelöst, wenn ein Zahlungslink bezahlt wird.
- **`recurring-paid`**: Ausgelöst, wenn eine wiederkehrende Zahlung erfolgt.

---

## Webhook-Nutzlast

Wenn ein Ereignis ausgelöst wird, sendet der Webhook eine `POST`-Anfrage an Ihren konfigurierten Endpunkt mit der folgenden Nutzlaststruktur:

### Beispiel-Nutzlast für `paymentlink-paid`

```json
{
  "event": "paymentlink-paid",
  "payload": {
    "paymentLinkId": "id",
    "payer": "0x2.................",
    "recipientWalletAddress": "0x4..............",
    "amount": "1",
    "userUUID": "id",
    "transactionSignature": "0xc................",
    "feeSignature": "0x1....................",
    "chain": "pol",
    "env": "test",
    "status": "paid",
    "createdAt": "2025-05-16T20:38:25.343Z"
  }
}
```

### Feldbeschreibungen

- **`event`**: Der Name des ausgelösten Ereignisses (`paymentlink-paid` in diesem Fall).
- **`payload`**: Die mit dem Ereignis verknüpften Daten, die Folgendes umfassen:
  - **`paymentLinkId`**: Die eindeutige Kennung des Zahlungslinks.
  - **`payer`**: Die Wallet-Adresse des Zahlenden.
  - **`recipientWalletAddress`**: Die Wallet-Adresse des Empfängers.
  - **`amount`**: Der gezahlte Betrag.
  - **`userUUID`**: Die eindeutige Kennung des Benutzers, der mit dem Zahlungslink verknüpft ist.
  - **`transactionSignature`**: Die Transaktionssignatur für die Zahlung.
  - **`feeSignature`**: Die Signatur für die mit der Transaktion verbundene Gebühr.
  - **`chain`**: Das Blockchain-Netzwerk, in dem die Transaktion stattgefunden hat (z. B. `pol` für Polygon).
  - **`env`**: Die Umgebung, in der die Transaktion stattgefunden hat (`test` oder `prod`).
  - **`status`**: Der Status der Zahlung (z. B. `paid`).
  - **`createdAt`**: Der Zeitstempel, wann die Zahlung erstellt wurde.

## Support

Wenn Sie auf Probleme stoßen oder Fragen haben, treten Sie bitte unserer Discord-Community bei: https://discord.gg/JT3BhUCy
