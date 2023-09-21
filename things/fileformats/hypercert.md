# fileformat.hypercert

Owner: Elijah

<aside>
💡 By having composable fields between impact certificates of different standards, we can aggregate and analyze metadata (scope, dates, contributors, etc) across multiple platforms.

</aside>

[https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/fileformat.hypercert](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/fileformat.hypercert)

- fields
    - hypercertName (string, s)
    - hypercertProject (url, s)
    - hypercertScopeTags (string, m)
    - hypercertWorkStart (date, s)
    - hypercertWorkEnd (date, s) - how to make indefinite?
    - hypercertContributors (string, m)
    - hypercertUsageRights (???, s)
    - hypercertDistribution (int, s) - how to set deduplicate = TRUE???
    - hypercertAllowlist (csv, s)
    - description (string, s)
    - image
    - backgroundImage
- hypercert.records
- hypercert.files
- hypercert.jobs
- hypercert.jobTypes