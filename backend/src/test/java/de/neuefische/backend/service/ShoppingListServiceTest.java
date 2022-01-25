package de.neuefische.backend.service;

import de.neuefische.backend.model.ShoppingListItem;
import de.neuefische.backend.repository.MongoDBItemRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.hamcrest.Matchers;

import java.util.Optional;

class ShoppingListServiceTest {

    private final MongoDBItemRepository itemRepository = mock(MongoDBItemRepository.class);

    private final ShoppingListService itemService = new ShoppingListService(itemRepository);

    public ShoppingListItem createExpectedItem() {
        ShoppingListItem expected = ShoppingListItem.builder()
                .id("test-id")
                .name("test-name")
                .build();
//                .user(User.newUser("test-username", "test-password", List.of())) // eventuell für spätere Tests wenn Items auch usern zugeordnet sind
        return expected;
    }

    @Test
    void itemByIDTest() {
        //Given
        ShoppingListItem expected = createExpectedItem();

        when(itemRepository.findById("test-id")).thenReturn(Optional.of(expected));
        //When
        Optional<ShoppingListItem> actual = itemService.getItemById("test-id");
        //Then
        assertThat(actual, Matchers.is(Optional.of(expected)));
    }


    @Test
    void getItemByNonExistingId() {
        //Given
        ShoppingListItem expected = createExpectedItem();

        when(itemRepository.findById("test-id")).thenReturn(Optional.of(expected));
        when(itemRepository.findById("wrong-id")).thenReturn(Optional.empty());

        //WHEN
        Optional<ShoppingListItem> actual = itemService.getItemById("wrong-id");

        //THEN
        assertThat(actual, Matchers.is(Optional.empty()));
    }

    @Test
    void getItemByNullId() {
        //GIVEN
        ShoppingListItem expected = createExpectedItem();
        when(itemRepository.findById("test-id")).thenReturn(Optional.of(expected));
        when(itemRepository.findById(null)).thenThrow(new IllegalArgumentException());

        //WHEN
        try {
            itemService.getItemById(null);
            fail();
        }
        catch (IllegalArgumentException e) {

        }
    }

}