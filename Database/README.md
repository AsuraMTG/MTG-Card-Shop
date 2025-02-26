# Kártyabolt - Adatbázis Felépítés

Ez a dokumentáció bemutatja a **Kártyabolt** projekt adatbázisának struktúráját, amely különböző táblákat és azok kapcsolatait tartalmazza a működéshez.

---

## Adatbázis Tábla Struktúra

### `categories` - Kategóriák
Ez a tábla a termékek kategóriáit tartalmazza.

- `category_id` (INT): Az egyedi azonosító.
- `category_name` (VARCHAR): A kategória neve.
- `category_description` (TEXT): A kategória leírása.

### `customers` - Vásárlók
A vásárlók adatait tárolja.

- `customer_id` (INT): Az egyedi vásárlói azonosító.
- `name` (VARCHAR): Vásárló neve.
- `email` (VARCHAR): Vásárló e-mail címe.
- `address` (TEXT): Vásárló címadatai.
- `phone_number` (VARCHAR): Vásárló telefonszáma.
- `registration_date` (DATETIME): A regisztráció dátuma.

### `events` - Események
Az események, mint például versenyek, találkozók adatait tárolja.

- `event_id` (INT): Az esemény egyedi azonosítója.
- `event_name` (VARCHAR): Az esemény neve.
- `event_date` (DATETIME): Az esemény dátuma és időpontja.
- `event_description` (TEXT): Az esemény leírása.
- `max_participants` (INT): A maximális résztvevők száma.
- `current_participants` (INT): A jelenlegi résztvevők száma.

### `orders` - Rendelések
A vásárlók rendeléseit tartalmazza.

- `order_id` (INT): Az egyedi rendelési azonosító.
- `customer_id` (INT): A vásárló azonosítója.
- `order_date` (DATETIME): A rendelés dátuma.
- `total_amount` (DECIMAL): A rendelés összértéke.
- `status` (VARCHAR): A rendelés állapota (pl. "Feldolgozás alatt").

### `order_items` - Rendelési Tételek
Az egyes rendelési tételek (termékek) adatait tárolja.

- `order_item_id` (INT): Az egyedi tétel azonosítója.
- `order_id` (INT): A rendelés azonosítója.
- `product_id` (INT): A termék azonosítója.
- `quantity` (INT): A megrendelt mennyiség.
- `price_at_order` (DECIMAL): Az adott tétel ára rendeléskor.

### `products` - Termékek
A boltban elérhető termékek adatait tartalmazza.

- `product_id` (INT): Az egyedi termék azonosító.
- `name` (VARCHAR): A termék neve.
- `category` (VARCHAR): A termék kategóriája.
- `price` (DECIMAL): A termék ára.
- `stock_quantity` (INT): A készleten lévő mennyiség.
- `available` (TINYINT): Elérhetőség (1 - elérhető, 0 - nem elérhető).
- `description` (TEXT): A termék leírása.
- `image_url` (VARCHAR): A termékhez tartozó kép URL-je.

### `product_categories` - Termék Kategóriák
A termékek és kategóriák közötti kapcsolatokat tárolja.

- `product_id` (INT): A termék azonosítója.
- `category_id` (INT): A kategória azonosítója.

### `registrations` - Eseményregisztrációk
A vásárlók által eseményekre történt regisztrációk adatai.

- `registration_id` (INT): Az egyedi regisztrációs azonosító.
- `event_id` (INT): Az esemény azonosítója.
- `customer_id` (INT): A vásárló azonosítója.
- `registration_date` (DATETIME): A regisztráció dátuma.

---

## Adatbázis Kapcsolatok

- A `customers` és `orders` tábla közötti kapcsolatot a `customer_id` biztosítja.
- A `orders` és `order_items` tábla közötti kapcsolatot az `order_id` biztosítja.
- A `order_items` és `products` tábla közötti kapcsolatot a `product_id` biztosítja.
- A `product_categories` tábla a `products` és `categories` közötti kapcsolatot valósítja meg a `product_id` és `category_id` kulcsokkal.
- A `registrations` tábla az eseményekre történt regisztrációkat tárolja, és az `event_id`, illetve `customer_id` kulcsokkal kapcsolódik az `events` és `customers` táblákhoz.

---

## Eseményindítók

A `registrations` tábla új bejegyzései után egy trigger frissíti az eseményekhez tartozó résztvevők számát a `events` táblában. Ez biztosítja, hogy az eseményekhez tartozó aktuális résztvevők száma mindig naprakész legyen.

```sql
DELIMITER $$

CREATE TRIGGER `update_current_participants_after_registration` 
AFTER INSERT ON `registrations` 
FOR EACH ROW 
BEGIN
    UPDATE events
    SET current_participants = (SELECT COUNT(*) FROM registrations WHERE event_id = NEW.event_id)
    WHERE event_id = NEW.event_id;
END$$

DELIMITER ;
