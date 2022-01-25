package de.neuefische.backend.service;

import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repository.MongoUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MongoUserDetailsService implements UserDetailsService {
    public static final String AUTHORITY_API_READWRITE = "API_READWRITE";
    private final MongoUserRepository repository;

    public MongoUserDetailsService(MongoUserRepository repository) {

        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


//        wenn das hier hinzugefügt und ein Optional in Repository definiert wird sind alle bisherigen und neu angelegten User gelockt
//        return repository.findByUsername(username)
//                .orElseThrow(()->new UsernameNotFoundException("User " + username + " not found"));


        UserMongo user = repository.findByUsername(username).orElseThrow();
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new User(user.getUsername(), user.getPassword(),
                user.getAuthorities()); // hier eventuell nur "user" als String hinterlegen

    }
}
