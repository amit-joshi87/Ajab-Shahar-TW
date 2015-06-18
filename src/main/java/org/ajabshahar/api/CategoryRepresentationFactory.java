package org.ajabshahar.api;

import com.google.gson.Gson;
import org.ajabshahar.platform.models.Category;
import org.ajabshahar.platform.models.Word;

/**
 * Created by amit on 6/15/2015.
 */
public class CategoryRepresentationFactory {

    public Category create(String jsonCategory) {
        return toCategory(new Gson().fromJson(jsonCategory, CategoryRepresentation.class));
    }

    public Category toCategory(CategoryRepresentation categoryRepresentation) {
        Category category = new Category();
        category.setId(categoryRepresentation.getId());
        category.setName(categoryRepresentation.getName());
        category.setCategoryType(categoryRepresentation.getCategoryType());
        return category;
    }

    public CategoryRepresentation createCategoryRepresentation(Category category){
        CategoryRepresentation categoryRepresentation = new CategoryRepresentation();
        categoryRepresentation.setId(category.getId());
        categoryRepresentation.setName(category.getName());
        categoryRepresentation.setCategoryType(category.getCategoryType());
        return categoryRepresentation;
    }
}
