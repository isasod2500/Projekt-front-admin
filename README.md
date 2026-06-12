# Front-end för Projektuppgift i Backend - Administrationsgränssnitt

## [E4-Haket Admin](https://projekt-front-admin.onrender.com/)

Detta gränssnitt (frontend) är till för medarbetare på restaurangen E4-Haket. 
En inloggningssida välkomnar besökaren och efter lyckad inloggning är förstasidan på intranätet en meny med alternativ. Vanliga anställda har fyra alternativ där dem kan se över maträtter, inkommande beställningar, recensioner och meddelande från kunder.
Kontot med administrationsroller, så som chefer eller adminkontot (IT-användare tex), har ytterligare ett alternativ för att hantera medarbetare. Här kan dem skapa, redigera och radera användare.

Gränssnittet utför samtliga CRUD förfrågningar (fetches) till webbtjänsten (backend) och alla har felhantering inbyggd där en respons kommer från backend vid lyckad eller misslyckad förfrågan. Relevanta felmeddelanden spelgas i gränssnittet för besökare och en mer teknisk respons meddelas i backend.
