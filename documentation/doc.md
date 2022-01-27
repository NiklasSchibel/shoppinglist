#Heroku
- Heroku braucht die die system.properties Datei im Root Verzeichnis mit der Java Version:
- Frontend zuerst bauen lassen in oberster POM mit mkdir damit ein Verzeichnis da ist , dann frontend POM dann Backend
  Alternative wäre webchar ist aber schwieriger
- in Procfile wird festgelegt was Heroku ausführen soll
  ``
  java.runtime.version=17
  ``

#Git
- in git commits eintragen, warum wir etwas gemacht haben nicht was wir gemacht haben, das sieht man in den added files

#maven

- Versionen von dependencies in parent pom angeben dann in child poms löschen, nach automatischen imports in der IDE anschließend prüfen häufig wird die Version mit angegeben in der Child pom
- verwende nach dem Pull Request und dem Code Review für den Merge immer den squash and merge (zieht alle commits zusammen, damit bleibt das Projekt übersichtlicher)

#Design Patterns
-https://refactoring.guru
- auch sehr wichtig die sogenannten anti-pattern (siehe Wikipedia)

#ListenInListen
-ShoppingListItem mit Usern als Parameter (username, testpassword, authorities)
.user(User.newUser("test-username", "test-password", List.of()))

#LoginAnmeldung
- Login: Token in UseState abspeichern
- Logout: Token aus UseState löschen

#Debugging
- IntelliJ Käfer nur für BackendDebugging
- Frontend Debugging im Browser mit Console log oder dem "schlechten" Debugging Feature dort
- sehr hilfreich ist der Tab Netzwerkanalyse für Request/Status überwachung
- Frontend Debugging mit React Plugin Add-On

#Kommentare und Dokumentation
- Kommentare sollten durch deutlichen/selbsterklärenden Code ersetzt werden
- Dokumentation sollte immer geschrieben werden, wenn es nicht absolut offensichtlich ist was die Funktion tut, ist sozusagen der Vertrag was die Funktion tut

#DTO Datentransfer Objekt
- wir können einen Artikel definieren (Datenmodell) der für den Anwender verwendet wird, an die Prüfung anschließend wird dieser dann erst in das Datenbankobjekt (ShoppingListItem) umgeschrieben

#Frontend testing
- Selenium

#Logging
````
private final static Log LOG = LogFactory.getLog(LoginController.class);
LOG.debug("login(" + data.getName() + ")");
LOG.info("LoginController initialized");
````

Achtung Log Dateien dürfen nicht sicherheitsrelevante Daten (z.B. Passwörter veröffentlichen)

- jede Exception die geworfen wird sollte auch ein LOG Eintrag schreiben
- jede If Abfrage die zum Beispiel username != null abfragt sollte auch einen LOG eintragen, da dieser Fall eigentlich nicht auftreten sollte, in den meisten Fällen wird der Log Eintrag also nicht aufgerufen
- in jeden eigentlihc nicht normalen Fall ein Logging eintragen

- run/debug configurations kann das aktive Profil auf "dev" gesetzt werden, dann wird die application-dev.properties Datei verwendet

#Stacktracing
````
- throw new UnsupprtedOperationException("Code not yet implemented");
````
- Stacktrace beschreibt die Fehlerreihenfolge in einem Programm
- bei Spring Fehlern immer ganz unten anfangen dass ist der relevante Teil, oben ist nur die gesamte Fehlerkette zu sehen
- falls der unterste Fehler keinen Sinn macht, einen Fehler weiter oben anschauen
````
 catch (AuthenticationException e) {
LOG.trace("invalid credentials of user:" + data.getName());
throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid_credentials");
````
- Gute Möglichkeit durch das Werfen eines Fehlers, das Programm bewusst zu beenden, damit dieser ungewollte Zustand (eventuell größerer Programmierfehler oder Hacker) nicht weitergetragen wird

#PostgreSQL
-https://sqldbm.com/Home/

#Login
- weiterleiten auf Loginseite, probieren ob eingeloggt sonst catch und weiterleitung auf login
