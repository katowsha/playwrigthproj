Feature: Search fligth from new york to berlin

    Scenario: search flight and validate information
        Given I navigate to avia sales url
        When I look up for flights from new york to berlin por 2 adult passengers
        And  I click on search buttons
        Then I should see new tab open with