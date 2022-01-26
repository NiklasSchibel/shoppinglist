package de.neuefische.backend.controller;


import de.neuefische.backend.model.LoginData;
import de.neuefische.backend.service.JWTUtils;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@RestController
@RequestMapping("auth/login")
public class LoginController {
    final AuthenticationManager authenticationManager;
    final JWTUtils jwtService;

    private final static Log LOG = LogFactory.getLog(LoginController.class);

    public LoginController(AuthenticationManager authenticationManager, JWTUtils jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping
    public String login(@RequestBody LoginData data) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(data.getName(), data.getPassword())
            );
            LOG.info("User: " + data.getName().toUpperCase() + " ist eingeloggt");
            return jwtService.createToken(new HashMap<>(), data.getName());
        } catch (AuthenticationException e) {
            LOG.warn("Benutzername oder Password von User: " + data.getName().toUpperCase() + " nicht richtig");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid_credentials");
        }
    }
}