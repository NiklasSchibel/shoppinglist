# serviceAPI Frontend
``
const INDEV = process.env.NODE_ENV === "development";
const BASEURL: string = INDEV ? "http://localhost:8080" : "";
``
kann verwendet werden um im DevSystem in node über eine andere URL zu arbeiten.

analog würde die Einstellung   "proxy": "http://localhost:8080", in der package-json Datei das Gleiche machen (nicht getestet)

#Fehlerbehebung bei npm

- zuerst node_modules Verzeichnis löschen (im Terminal mit -r und -f, entspricht force und rekursiven Verzeichnissen)dann npm install und npm run build
- wenn Fehler bestehen bleibt, dann package-lock.json Datei löschen, ACHTUNG jetzt wirds heikel! (...nicht ideal)

-dann googlen eventuell läuft ein npm modul nicht mehr! (falls muss die Version des Modules festgeschrieben werden siehe unten)

in package.json eintragen 
``
"overrides": {
"mini-css-extract-plugin": "2.4.5"
}
`` auf root eben in der Datei
und das oben benannte Verzeichnis (node_modules) und die package-lock.json Datei löschen
als alternative zu oben kann auch über:
npm i -D --save-exact mini-css-extract-plugin@2.4.5
eine bestimmte Version eines modules festgelegt werden

#Fetch Request 
-im Frontend muss auf Heroku relativ sein und auf Localhost absolut auf den BackendServer verweisen
const BASEURL="";
in axios get vor erstem / noch "${BASEURL}"

#Frontend Testing
- Möglichkeit Selenium

#Copy Plugin in Maven
```
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-resources-plugin</artifactId>
                <version>3.2.0</version>
                <executions>
                    <execution>
                        <id>position-react-build</id>
                        <goals>
                            <goal>copy-resources</goal>
                        </goals>
                        <phase>prepare-package</phase>
                        <configuration>
                            <outputDirectory>${project.parent.basedir}/backend/src/main/resources/static</outputDirectory>
                            <resources>
                                <resource>
                                    <directory>${project.basedir}/build</directory>
                                    <filtering>false</filtering>
                                </resource>
                            </resources>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

```


