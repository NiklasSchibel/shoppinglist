package de.neuefische.backend.service;

import de.neuefische.backend.BackendApplication;
import de.neuefische.backend.model.ShoppingListItem;
import de.neuefische.backend.repository.MongoDBItemRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListService {
    private static final Log LOG = LogFactory.getLog(BackendApplication.class);

    private final MongoDBItemRepository mongoDB;

    public ShoppingListService(MongoDBItemRepository mongoDB) {
        this.mongoDB = mongoDB;
    }


    public ShoppingListItem updateShoppingListItem(ShoppingListItem item) {
        try {
            mongoDB.save(item);
        } catch (Exception e) {
            LOG.info("Item " + item.getName().toUpperCase() + " konnte nicht in der DB gespeichert werden");
        }
        return item;
    }

    public List<ShoppingListItem> allItemsMongo() {
        return mongoDB.findAll();
    }

    public ShoppingListItem deleteById(String id) {
        ShoppingListItem item = mongoDB.findById(id).orElseThrow();
        mongoDB.deleteById(id);
        return item;

    }

    public Optional<ShoppingListItem> getItemById(String id) {
        return mongoDB.findById(id);

//Todo: Service mit catch , sicherer machen?!
//        und throws exception in public method zeile
        //        try {
//            return mongoDB.findById(id);
//            //  Block of code to try
//        }
//        catch(Exception e) {
//            System.out.println("something went wrong: " +e.getMessage());
//            //  Block of code to handle errors
//        }
//        return null;
    }
}

//    public ShoppingListItem create(ShoppingListItem todo) {
//    }


//public void updateTodo(String id, Todo todo) {
//        Todo tmp = getTodoById(id);
//        todo.setId(id);
//        this.todos.remove(tmp);
//        this.todos.add(todo);
//        }
