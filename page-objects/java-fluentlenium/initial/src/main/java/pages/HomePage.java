package pages;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.By;

import static org.assertj.core.api.Assertions.assertThat;

public class HomePage extends FluentPage {

    @Page
    private SearchResultsPage searchResultsPage;

    @Override
    public String getUrl() {
        return "https://www.zalando.de/";
    }

    @Override
    public void isAt() {
        assertThat(window().title().toLowerCase()).contains("zalando");
    }

    public SearchResultsPage search(String searchText) {
        find(By.id("searchContent")).write(searchText).submit();
        return searchResultsPage;
    }

}
