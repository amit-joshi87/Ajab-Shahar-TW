package org.ajabshahar.api;

import java.util.ArrayList;
import java.util.List;

import static java.lang.String.format;

public class PersonRepresentation {

    private long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String firstNameInHindi;
    private String middleNameInHindi;
    private String lastNameInHindi;
    private List<String> roles;

    public PersonRepresentation(long id, String firstName, String middleName, String lastName, String firstNameInHindi, String middleNameInHindi, String lastNameInHindi, List<String> roles) {
        this.id = id;
        this.firstNameInHindi = firstNameInHindi;
        this.middleNameInHindi = middleNameInHindi;
        this.lastNameInHindi = lastNameInHindi;
        this.roles = new ArrayList<>();
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.roles = roles;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public List<String> getRoles() {
        return roles;
    }

    public String getMiddleName() {
        return middleName;
    }

    @Override
    public String toString() {
        return format("first name: %s, middle name: %2s, last name: %3s", getFirstName(), getMiddleName(), getLastName());
    }

    public long getId() {
        return id;
    }

    public String getFirstNameInHindi() {
        return firstNameInHindi;
    }

    public String getMiddleNameInHindi() {
        return middleNameInHindi;
    }

    public String getLastNameInHindi() {
        return lastNameInHindi;
    }
}
