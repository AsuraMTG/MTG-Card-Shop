# MTG Cardshop Admin

Ez a projekt egy adminisztrációs felület a Magic: The Gathering (MTG) kártyák online boltjának kezelésére. Az alkalmazás célja, hogy egyszerűsíti a bolt adminisztrációját, lehetővé téve a különböző események, vásárlók és termékek kezelését. A rendszer backend API-val kommunikál, amely lehetővé teszi az adatok lekérését, módosítását és törlését.

## Funkciók

### 1. **Események kezelése**
Az adminisztrátorok képesek létrehozni, módosítani és törölni az eseményeket, amelyek a boltban történő eseményekhez kapcsolódnak.

- **Új esemény hozzáadása**: Az adminisztrátor egy új eseményt hozhat létre, amely tartalmazza az esemény nevét, dátumát, helyét, a maximális résztvevők számát és egy rövid leírást.
- **Események frissítése**: Az adminisztrátor frissítheti az események adatait, például módosíthatja a résztvevők számát vagy az esemény dátumát.
- **Események törlése**: Az adminisztrátor törölheti a már nem szükséges eseményeket a rendszerből.
- **Diagramok**: Az alkalmazás vizuálisan ábrázolja az eseményekhez kapcsolódó adatokat, például a résztvevők számát egy diagram formájában.

### 2. **Vásárlók kezelése**
Az adminisztrátorok számára lehetőség van a vásárlói adatok kezelésére, mint például az új vásárlók hozzáadása, meglévők frissítése vagy törlése.

- **Vásárlók megtekintése**: Az adminisztrátorok megtekinthetik a vásárlók listáját, beleértve a nevüket, email címüket, címüket, telefonszámukat és regisztrációjuk dátumát.
- **Vásárlók frissítése**: Az adminisztrátorok módosíthatják a vásárlói adatokat, például frissíthetik a címüket, telefonszámukat, email címüket vagy más adatokat.
- **Vásárlók törlése**: Az adminisztrátor törölheti a vásárlók adatait a rendszerből.

### 3. **Termékek kezelése**
Az adminisztrátorok képesek új termékeket hozzáadni, módosítani a meglévőket, törölni őket, valamint feltölteni a termékekhez tartozó képeket.

- **Új termék hozzáadása**: Az adminisztrátor új terméket hozhat létre, beleértve annak nevét, kategóriáját, árát, készletét és elérhetőségét. Továbbá a termékekhez leírást is rendelhet.
- **Termékek frissítése**: Az adminisztrátorok frissíthetik a termékek adatait, beleértve a termékek nevét, kategóriáját, árát, készletét, elérhetőségét és leírását.
- **Termékek törlése**: Az adminisztrátorok törölhetik a termékeket a rendszerből.
- **Kép feltöltése**: Az adminisztrátorok képeket tölthetnek fel a termékekhez, amelyeket a termékekhez rendelhetnek, hogy azok vizuálisan is megjelenjenek a boltban.

### 4. **Felhasználóbarát felület**
Az alkalmazás egy könnyen használható, vizuálisan tiszta felületet biztosít az adminisztrátorok számára. A felhasználói felületet Windows Forms segítségével készítettük, amely egyszerű navigációt biztosít a különböző szekciók között.

### 5. **Diagramok és statisztikák**
A rendszer diagramokat és statisztikákat kínál az eseményekhez kapcsolódó adatokról, például a résztvevők számáról és egyéb fontos információkról. Ez segíti az adminisztrátorokat abban, hogy gyorsan áttekintsék a statisztikákat és szükség esetén beavatkozhassanak.

## Telepítés

### Előfeltételek
- A projekt futtatásához szükséges .NET Framework 4.7.2 vagy újabb verzió.
- A backend API futtatása helyben, a megfelelő URL-eken.
- Az alábbi URL-eket kell beállítani a backend kiszolgálóhoz való csatlakozáshoz:
    - **Események**: `http://localhost:3000/desktop/admin/events`
    - **Vásárlók**: `http://localhost:3000/desktop/admin/customers`
    - **Termékek**: `http://localhost:3000/desktop/admin/products`

### Telepítési lépések

1. Klónozd a repót a gépedre:

```bash
git clone https://github.com/AsuraMTG/MTG-Card-Shop.git
