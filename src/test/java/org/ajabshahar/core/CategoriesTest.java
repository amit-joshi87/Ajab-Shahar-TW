package org.ajabshahar.core;

import org.ajabshahar.platform.daos.CategoryDAO;
import org.ajabshahar.platform.models.Category;
import org.hamcrest.core.IsEqual;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;


import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;
import static org.junit.Assert.assertEquals;

/**
 * Created by amit on 6/15/2015.
 */
@RunWith(MockitoJUnitRunner.class)
public class CategoriesTest {
    public static final int ID = 1;
    private Categories categories;
    private Category category;

    @Mock
    private CategoryDAO categoryRepository;

    @Before
    public void setup(){
        categories = new Categories(categoryRepository);

        category = new Category();
        category.setId(1L);
        category.setName("Editor");
        category.setCategoryType("person");
    }

    @Test
    public void shouldCreateCategory(){
//        when(categoryRepository.saveOrUpdate(any(Category.class))).thenReturn(category);
        when(categoryRepository.create(any(Category.class))).thenReturn(category);

        Category categoryExpected = categories.create(category);

        assertEquals(categoryExpected,category);
        assertThat(categoryExpected.getName(), IsEqual.equalTo("Editor"));
        assertThat(categoryExpected.getCategoryType(), IsEqual.equalTo("person"));
        assertThat(categoryExpected.getId(), IsEqual.equalTo(1L));
    }
}
