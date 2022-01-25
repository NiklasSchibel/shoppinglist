package de.neuefische.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "shopItems")
public class ShoppingListItem {
    @Id
    private String id;
    private String name;
    private int quantity;
//    private String ofUserName;
}
