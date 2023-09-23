# fileformat.impact

Owner: Elijah

<aside>
💡 By having composable fields between impact certificates of different standards, we can aggregate and analyze metadata (scope, dates, contributors, etc) across multiple platforms.

</aside>

insert link to thing here

- fields
    - impactName (string, s)
    - impactId (int, s)
    - projectURL (url, s)
    - scopeTags (string, m)
    - startDate (date, s)
    - endDate (date, s) - how to make indefinite?
    - contributors (list, m)
    - usageRights (str, s)
    - percentDistribution (int, s) - how to set deduplicate = TRUE???
    - allowlist (csv, s)
    - description (string, s)
    - image
    - backgroundImage
    
- impact.records
- impact.files
- impact.jobs
- impact.jobtypes