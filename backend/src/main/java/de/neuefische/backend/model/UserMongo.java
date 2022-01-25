package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "User")
public class UserMongo implements UserDetails {
    public static UserMongo newUser(String username, String password, List<String> authorities) {
        return UserMongo.builder()
                .username(username).password(password)
                .rights(authorities)
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .build();
    }

    @Id
    String username;
    String password;
    List<String> rights;
    boolean enabled;
    boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialsNonExpired;

    // für Anwendungsfall User hat bestimmte ListItems
//    List<ShoppingListItem> myItems;

    @Override
    @Transient
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return rights.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toCollection(ArrayList::new));
    }

}

