package org.ajabshahar.factory;



import org.ajabshahar.api.CategoryRepresentation;
import org.ajabshahar.api.CategoryRepresentationFactory;
import org.ajabshahar.platform.models.Category;
import org.hamcrest.core.IsEqual;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertNull;

/**
 * Created by amit on 6/16/2015.
 */
public class CategoryRepresentationFactoryTest {

    private Category category;
    private CategoryRepresentationFactory categoryRepresentationFactory;

    @Before
    public void setUp(){
        categoryRepresentationFactory = new CategoryRepresentationFactory();
        category = new Category();
        category.setId(1L);
        category.setName("Editor");
//        category.setCategoryType(null);
    }

    @Test
    public void shouldCreateCategoryRepresentation(){
        CategoryRepresentation categoryRepresentation = categoryRepresentationFactory.createCategoryRepresentation(category);

        assertThat(categoryRepresentation.getId(), IsEqual.equalTo(1L));
        assertThat(categoryRepresentation.getName(),IsEqual.equalTo("Editor"));
        assertNull(categoryRepresentation.getCategoryType());
    }


}
