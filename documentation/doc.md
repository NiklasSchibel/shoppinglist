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
