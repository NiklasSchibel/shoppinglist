package de.neuefische.backend.controller;

import de.neuefische.backend.model.ShoppingListItem;
import de.neuefische.backend.service.ShoppingListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/shoppinglist")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }


    @GetMapping(path = "/test/Mongo")
    public ResponseEntity<List<ShoppingListItem>> getAllShoppingListItemsMongo() {
        List<ShoppingListItem> allItems = shoppingListService.allItemsMongo();
        return ok(allItems);
    }

    @GetMapping(path = "/test/Mongo/{id}")
    public ResponseEntity<ShoppingListItem> getShoppingListItemByID(@PathVariable("id") String id) throws Exception {
        Optional<ShoppingListItem> item = shoppingListService.getItemById(id);
//        oder unterhalb alles rausnehmen und nur mit return item;
        if (item.isPresent()) {
            return new ResponseEntity<ShoppingListItem>(item.get(), HttpStatus.OK);
        } else {
            throw new Exception();
        }
    }

//    das hier ist nur um den angemeldeten User abfragen zu können
    @GetMapping(path = "/test/me")
    public String getLoggedInUser(Principal principal) {
        String username = principal.getName();

        return username;
    }



    @PutMapping(path = "/test/Mongo")
    public void changeShoppingListItem(@RequestBody ShoppingListItem item) {
        shoppingListService.updateShoppingListItem(item);
    }

    @PutMapping(path = "/test/Mongo/{id}")
    public void changeShoppingListItemTest(@RequestBody ShoppingListItem item) {
        shoppingListService.updateShoppingListItem(item);
    }

    @DeleteMapping(value = "/test/Mongo/{id}")
    public ShoppingListItem deletePost(@PathVariable String id) {
        return shoppingListService.deleteById(id);
    }


//    @PutMapping(path = "{id}/update")
//    public void updateTodo(@PathVariable String id, @RequestBody Todo todo) {
//        this.service.updateTodo(id, todo);
//    }


//    @GetMapping
//    public List<ToDo> getToDos() {
//        List<ToDo> toDoList = toDoService.getToDoList();
//        return toDoList;
//    }
//
//    @PostMapping()
//    public void createToDo(@RequestBody ToDo toDo) {
//        toDoService.createToDo(toDo);
//    }
//
//    @PutMapping("{id}")
//    public void changeToDo(@RequestBody ToDo toDo) {
//        toDoService.changeToDo(toDo);
//    }

//    @PutMapping(path = "{id}")
//    public void putToDo(String description){
//        toDoService.putToDo(description);
//    }
//
//    @PostMapping
//    public void post(@RequestBody ToDo todo){
//        toDoService.postToDo(todo);
//    }


//    @PostMapping
//    public void addTodo(@RequestBody Todo todo) {
//        this.service.addTodo(todo);
//    }
//
//    @PutMapping(path = "{id}")
//    public void advanceTodo(@PathVariable String id, @RequestBody Todo todo) {
//        this.service.updateTodo(id, todo);
//    }
//
//    @PutMapping(path = "{id}/update")
//    public void updateTodo(@PathVariable String id, @RequestBody Todo todo) {
//        this.service.updateTodo(id, todo);
//    }


}



