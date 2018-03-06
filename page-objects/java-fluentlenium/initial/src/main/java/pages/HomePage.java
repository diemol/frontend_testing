package pages;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.By;

import static org.assertj.core.api.Assertions.assertThat;

@SuppressWarnings("unused")
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
        find(By.cssSelector(".z-navicat-header_searchInput")).write(searchText).submit();
        return searchResultsPage;
    }

}
