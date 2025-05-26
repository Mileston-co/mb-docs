---
sidebar_position: 1
---

# Warum API-Schlüssel verwenden?

**API-Schlüssel** sind unerlässlich für die Integration mit den APIs von Mileston. Sie spielen eine entscheidende Rolle, um eine sichere und effiziente Kommunikation zwischen Ihrer Anwendung und unseren Diensten zu ermöglichen. Hier erfahren Sie, warum wir API-Schlüssel verwenden:

- **Zahlungen programmatisch erstellen**: API-Schlüssel ermöglichen es Ihrer Anwendung, Zahlungslinks, Rechnungen und wiederkehrende Zahlungen programmatisch zu erstellen und so Ihre Workflows nahtlos und automatisiert zu gestalten.
- **Geschäftsautorisierung**: Jeder API-Schlüssel ist eindeutig Ihrem Unternehmen zugeordnet und stellt sicher, dass nur autorisierte Anwendungen mit Ihrem Konto interagieren können.
- **Erhöhte Sicherheit**: API-Schlüssel bieten eine sichere Möglichkeit zur Authentifizierung von Anfragen, schützen sensible Daten und stellen sicher, dass nur verifizierte Aufrufe verarbeitet werden.
- **Vereinfachte Integration**: Mit API-Schlüsseln sind keine komplexen Authentifizierungsmechanismen nötig. Sie sind plattformübergreifend einfach zu verwenden.

### API-Schlüssel mit Ihrer Business-ID kombinieren

Zusätzlich zu Ihrem API-Schlüssel benötigen Sie Ihre **Business-ID**, um API-Anfragen zu autorisieren. Ihre Business-ID finden Sie im Dropdown-Menü neben Ihrem Geschäftslogo im Dashboard.

Sobald Sie Ihren API-Schlüssel und Ihre Business-ID haben, können Sie unsere APIs nutzen! 🚀

---

### Arten von API-Schlüsseln

Mileston stellt zwei Arten von API-Schlüsseln bereit, die jeweils für bestimmte Anwendungsfälle konzipiert sind:

1. **Normaler API-Schlüssel**:

   - Wird in Backend-Integrationen verwendet.
   - Ermöglicht sichere Vorgänge wie das Erstellen von Zahlungslinks, Rechnungen und wiederkehrenden Zahlungen.
   - Muss sicher in Ihrer Backend-Umgebung gespeichert werden.
   - **Format**:
     - Test: `Mileston_TEST_abcdefgh1234567890...`
     - Live: `Mileston_LIVE_abcdefgh1234567890...`

2. **Checkout-API-Schlüssel**:
   - Wird in Frontend-Integrationen verwendet.
   - Ermöglicht die sichere Einleitung von Zahlungen und das Abrufen von Zahlungsstatus in Client-SDKs wie `mileston-payment-client`.
   - Mit eingeschränktem Umfang für mehr Sicherheit im Frontend konzipiert.
   - **Format**:
     - Test: `Mileston_TEST_CHECKOUTKEY_abcdefgh1234567890`
     - Live: `Mileston_LIVE_CHECKOUTKEY_abcdefgh1234567890`

---

### Wie erhalte ich meine API-Schlüssel?

So greifen Sie auf Ihre API-Schlüssel zu:

1. Gehen Sie zum Dashboard unter [business.mileston.co](https://business.mileston.co).
2. Navigieren Sie zum Tab **Entwickler**.
3. Sie finden die folgenden Schlüssel:
   - **Normaler API-Schlüssel**: Für Backend-Operationen.
   - **Checkout-API-Schlüssel**: Für Frontend-Integrationen.

---

### Checkout-API-Schlüssel: Was und warum?

Der **Checkout-API-Schlüssel** ist ein spezialisierter API-Schlüssel, der für die Verwendung in clientseitigen Anwendungen entwickelt wurde. Er ermöglicht sichere Interaktionen mit der Mileston-API zum Initiieren von Zahlungen und zum Abrufen von Zahlungsstatus.

#### Hauptmerkmale:

- **Eingeschränkter Umfang**: Beschränkt auf bestimmte Aktionen wie das Initiieren von Zahlungen und das Abrufen von Zahlungsstatus, um sicherzustellen, dass keine sensiblen Backend-Operationen durchgeführt werden können.
- **Frontend-freundlich**: Entwickelt für die sichere Verwendung in clientseitigen SDKs wie `mileston-payment-client`.
- **Benutzerfreundlichkeit**: Vereinfacht die Integration, indem er die direkte Verwendung im Frontend ermöglicht.

#### Sicherheitsüberlegungen:

- Kombinieren Sie den Checkout-API-Schlüssel immer mit HTTPS, um eine sichere Kommunikation zu gewährleisten.
- Vermeiden Sie es, den Schlüssel direkt in Ihrem Code zu hinterlegen. Verwenden Sie Umgebungsvariablen oder sichere Build-Tools, um ihn während der Bereitstellung einzufügen.

---

### Möchten Sie mehr über Mileston erfahren?

Besuchen Sie unsere [Website](https://mileston.co), um alle erstaunlichen Tools und Funktionen zu entdecken, die wir anbieten.
