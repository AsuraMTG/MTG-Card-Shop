# Esemény Regisztrációs API

Ez a projekt egy API-t biztosít az események regisztrációjának kezelésére. Lehetővé teszi az adminisztrátorok számára, hogy kezeljék az eseményeket, felhasználókat és regisztrációkat, míg a felhasználók megnézhetik az elérhető eseményeket és regisztrálhatnak rájuk.

## Szükséges Modulok

A projekt futtatásához az alábbi Node.js modulokra van szükség:

- **express**: Web framework Node.js-hez
- **mysql2**: MySQL kliens Node.js-hez az adatbázis kezelésére
- **dotenv**: Környezeti változók betöltése a `.env` fájlból
- **body-parser**: Middleware a bejövő kérés törzsének feldolgozására
- **cors**: Middleware a Cross-Origin Resource Sharing (CORS) kezelésére

A szükséges modulok telepítéséhez futtasd a következő parancsot:

```bash
npm install express mysql2 dotenv body-parser cors
```

Az alkalmazás indításához az alábbi parancsot másoldki:

```bash
node app.js
```