package de.neuefische.backend.controller;


import de.neuefische.backend.service.MongoUserDetailsService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class DemoJWTController {

    final UserDetailsService userDetailsService;


    public DemoJWTController(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/jwt")
    String getHallo(Principal principal) {

        Collection<? extends GrantedAuthority> authorities =
                SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        final boolean isAllowed =
                authorities.stream()
                        .anyMatch(g -> MongoUserDetailsService.AUTHORITY_API_READWRITE.equals(g.getAuthority()));
        if (isAllowed) {
            String username = principal.getName();
            return "API: Hallo " + username.toUpperCase();
        } else {
            return "Darfst du nicht!!!";
        }
    }
}
