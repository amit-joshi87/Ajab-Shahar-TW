package org.ajabshahar.platform.resources;

import com.ninja_squad.dbsetup.DbSetup;
import com.ninja_squad.dbsetup.Operations;
import com.ninja_squad.dbsetup.destination.DataSourceDestination;
import com.ninja_squad.dbsetup.operation.Operation;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import io.dropwizard.testing.junit.DropwizardAppRule;
import net.minidev.json.JSONObject;
import org.ajabshahar.DataSetup;
import org.ajabshahar.api.CategoryRepresentation;
import org.ajabshahar.platform.PlatformApplication;
import org.ajabshahar.platform.PlatformConfiguration;
import org.h2.jdbcx.JdbcDataSource;
import org.hamcrest.core.IsEqual;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import static org.hamcrest.Matchers.greaterThan;

import javax.ws.rs.core.NewCookie;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

/**
 * Created by amit on 6/16/2015.
 */
public class CategoryResourceIT {
    @ClassRule
    public static final DropwizardAppRule<PlatformConfiguration> RULE =
            new DropwizardAppRule<>(PlatformApplication.class, resourceFilePath("test-config.yaml"));

    private Client client;
    private JdbcDataSource dataSource;
    private JSONObject jsonCategory;

    private static String resourceFilePath(String resource) {
        return ClassLoader.getSystemClassLoader().getResource(resource).getFile();
    }

    @Before
    public void setUp() throws Exception {
        client = new Client();
        dataSource = new JdbcDataSource();
        dataSource.setUrl("jdbc:h2:./test");
        dataSource.setUser("sa");
        dataSource.setPassword("");

        jsonCategory = new JSONObject();
        jsonCategory.put("name","Editor");
        jsonCategory.put("categoryType","person");
    }

//    @Test
//    public void shouldCreateCategory(){
//        Operation operation = Operations.sequenceOf(DataSetup.DELETE_ALL);
//
//        DbSetup dbSetup = new DbSetup(new DataSourceDestination(dataSource), operation);
//        dbSetup.launch();
//
//        ClientResponse categoryResponse = loginAndPost("http://localhost:%d/api/category/create", jsonCategory);
//        CategoryRepresentation categoryRepresentation = categoryResponse.getEntity(CategoryRepresentation.class);
//        assertThat(categoryResponse.getStatus(), is(200));
//        assertThat(categoryRepresentation.getName(), IsEqual.equalTo("Editor"));
//        assertThat(categoryRepresentation.getCategoryType(), IsEqual.equalTo("person"));
//        assertThat(categoryRepresentation.getId(), greaterThan(0L));
//    }

    private ClientResponse httpGet(String url) {
        return client.resource(
                String.format(url, RULE.getLocalPort()))
                .header("Content-type", "application/json")
                .get(ClientResponse.class);
    }

    private ClientResponse loginAndPost(String postUrl, Object jsonObj) {
        String userCredentials = "{\"username\":\"admin\",\"password\":\"password\"}";
        ClientResponse response = client.resource(
                String.format("http://localhost:%d/api/login", RULE.getLocalPort())).header("Content-type", "application/json")
                .post(ClientResponse.class, userCredentials);

        NewCookie sessionCookie = getCookie(response, "JSESSIONID");
        return client.resource(
                String.format(postUrl, RULE.getLocalPort()))
                .header("Content-type", "application/json")
                .cookie(sessionCookie)
                .post(ClientResponse.class, jsonObj);
    }

    private NewCookie getCookie(ClientResponse response, String name) {
        NewCookie sessionCookie = null;
        for (NewCookie cookie : response.getCookies()) {
            if (cookie.getName().equalsIgnoreCase(name)) {
                sessionCookie = cookie;
            }
        }
        return sessionCookie;
    }
}
