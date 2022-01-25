package de.neuefische.backend.repository;

import de.neuefische.backend.model.UserMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MongoUserRepository extends MongoRepository<UserMongo, String> {
    Optional<UserMongo> findByUsername(String username);
}