#In system.properties

- Angabe für Heroku damit mit der Heroku App verbunden werden kann
  `spring.data.mongodb.uri = ${MONGODB_URI:mongodb://localhost/shoppingDB?retryWrites=true&w=majority}`
mit dieser Einstellung wird entweder die MONGODB_URI Variable die in der Heroku Umgebung(ist auf Heroku gespeichert) angegeben wird verwendet oder als default die mongodb://local... für das locale Development (dann greift er auf die lokale Mongo DB zu) 

`spring.data.mongodb.uri = mongodb+srv://NiklasSchibel:mWMQKsXSq6KSPN0x@cluster0.gh5gp.mongodb.net/shoppingDB`
so würden passwort und benutzername an github übermittelt (Sicherheitsproblem!)



- server.port=${PORT:8080}, nimmt als ServerPort die Environment Variable(in diesem Fall von Heroku), sonst 8080 wenn es lokal läuft

#Security

-zwei Gedanken, einmal sollte der Zugriff möglichst sicher sein. Desweiteren soll immer der Fall abgedeckt sein, dass jemand Zugriff bekommt, dann darf entweder nichts wichtiges da sein oder nichts leserlich sein..

-NoOpPasswordEncoder speichert Passwörter lesbar ab, deshalb niemals außer für Demozwecke verwenden. Hier werden normalerweiße Argon2 encoder verwendet. Passwörter sind dann stärker als SHA 256. (hashen) 

- Rollen beinhalten Berechtigungen , API Schnittstellen fragen nach den Berechtigugen der User (nicht nach dessen Rolle ab), ist eine erleichterung nur mit Rollen zu arbeiten wird schnell zu kompliziert


#JWT Token Library
- Filter immer abschließen mit filterChain.doFilter(request,repsonse) z.B; damit die anderen Filter im Anschluss immer weiterlaufen können
- immer Log eingaben schreiben im catch Error bereich des try catch Blocks damit die Suche später kleiner wird
- Token wird von Server beim ersten erfolgreichen Login erzeugt und an Client geschickt dieser kann diesen nutzen bis er expired ist. Besser als cookies, token wird immer über den Header im Request mitgeschickt.
- Daten die von außen an unseren Client geschickt werden sehr gut sichern gegen fehlerhafte eingaben oder "null" nicht damit der Server abgeschossen werden kann 

