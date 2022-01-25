package de.neuefische.backend;


import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repository.MongoUserRepository;
import de.neuefische.backend.service.MongoUserDetailsService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
//@EnableMongoRepositories(basePackageClasses = RepositoryMongoTest.class)
public class BackendApplication implements CommandLineRunner {
    private static final Log LOG = LogFactory.getLog(BackendApplication.class);
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Autowired
    MongoUserRepository repository;


    //    @Autowired
//    PasswordEncoder encoder;
    PasswordEncoder encoder = new Argon2PasswordEncoder();

    @Override
    public void run(String... args) throws Exception {
        final String encodedPassword = encoder.encode("frank");

        final UserMongo user = UserMongo.builder()
                .username("frank")
                .password(encodedPassword)
                .authorities(List.of(new SimpleGrantedAuthority(MongoUserDetailsService.AUTHORITY_API_READWRITE))).build();

        try {
            repository.insert(user);
        } catch (Exception e){
            LOG.info("User "+ user.getUsername().toUpperCase() + " already exists");
        }
//        repository.findAll().stream().forEach(System.out::println);
    }
}
