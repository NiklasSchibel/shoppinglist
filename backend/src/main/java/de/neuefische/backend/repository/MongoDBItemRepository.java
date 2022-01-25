package de.neuefische.backend.repository;

import de.neuefische.backend.model.ShoppingListItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MongoDBItemRepository extends MongoRepository<ShoppingListItem, String> {
    ShoppingListItem findById();
}
