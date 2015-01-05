package org.ajabshahar.platform.daos;

import com.google.common.base.Optional;
import com.google.common.base.Strings;
import io.dropwizard.hibernate.AbstractDAO;
import org.ajabshahar.platform.models.PersonDetails;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class PersonDAO extends AbstractDAO<PersonDetails> {
    private final SessionFactory sessionFactory;

    public PersonDAO(SessionFactory sessionFactory) {
      super(sessionFactory);
      this.sessionFactory = sessionFactory;
  }

    public Optional<PersonDetails> findById(Long id) {
        return Optional.fromNullable(get(id));
    }

    public PersonDetails create(PersonDetails personDetails) {
        return persist(personDetails);
    }

    public List<PersonDetails> findAll() {
        return list(namedQuery("org.ajabshahar.platform.models.PersonDetails.findAll"));
    }

    public List<PersonDetails> findBy(int personId, String role) {
        Session session = currentSession();
        Criteria criteria = session.createCriteria(PersonDetails.class, "personDetails");
        if (personId > 0) {
            criteria.add(Restrictions.eq("id", Long.valueOf(personId)));
        }
        if (!Strings.isNullOrEmpty(role)) {
            criteria.createAlias("personDetails.category", "category");
            criteria.add(Restrictions.eq("category.name", role));
        }
        return criteria.list();
    }

    public PersonDetails updatePerson(PersonDetails updatablePerson) {
        Long id = updatablePerson.getId();
        PersonDetails originalPersonData = (PersonDetails) sessionFactory.openStatelessSession().get(PersonDetails.class, id);
        originalPersonData = invokeAllSetters(originalPersonData, updatablePerson);
        sessionFactory.getCurrentSession().update(originalPersonData);
        return originalPersonData;
    }

    private PersonDetails invokeAllSetters(PersonDetails originalPersonData, PersonDetails updatablePerson) {
        originalPersonData.setCategory(updatablePerson.getCategory());
        originalPersonData.setFirstName(updatablePerson.getFirstName());
        originalPersonData.setLastName(updatablePerson.getLastName());
        originalPersonData.setMiddleName(updatablePerson.getMiddleName());
        originalPersonData.setFirstNameInHindi(updatablePerson.getFirstNameInHindi());
        originalPersonData.setMiddleNameInHindi(updatablePerson.getMiddleNameInHindi());
        originalPersonData.setLastNameInHindi(updatablePerson.getLastNameInHindi());
        return originalPersonData;
    }
}
