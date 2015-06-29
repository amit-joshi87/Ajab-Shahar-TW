package org.ajabshahar.core;

import org.ajabshahar.platform.daos.CategoryDAO;
import org.ajabshahar.platform.models.Category;

/**
 * Created by amit on 6/15/2015.
 */
public class Categories {
    public final CategoryDAO categoryDAO;

    public Categories (CategoryDAO categoryDAO){
        this.categoryDAO = categoryDAO;
    }

    public Category create(Category category) {
        return categoryDAO.saveOrUpdate(category);
    }
}
