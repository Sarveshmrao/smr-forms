# Change Log

All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [Unreleased]

### Added

### Changed

### Fixed

### Security

## [0.9.7] - 2020-09-02

### Added

### Changed

### Fixed

### Security

- upgraded dependencies
 
## [0.9.6] - 2020-07-17

### Added

- default index.html for api without bundled ui
- slug for form fields can now be saved
- submission webhooks with ability to customize json payload
  ```
  {
    form: ID
    submission: ID
    created: DateTime
    lastModified: DateTime
    fields: [
        {
            field: ID
            slug: String
            value: any
        }
    ]
  }
  ```
  

### Changed

- minify containers to reduce layer size

### Fixed

- bug in settings resolver with nullable fields
- bug if user was deleted and form still exists

### Security

- container now runs as non root user

## [0.9.5] - 2020-06-10
 
### Added

- `DEFAULT_ROLE` -> `admin` | `superuser` | `user` - with `user` being the default, making it possible that new users can create their own forms after creating
- `LOGIN_NOTE` -> markdown for Login Page, to show info text on login page
- `HIDE_CONTRIB` -> ability to hide contribution banner

### Fixed

- di on setting resolver, prevented signup settings to be visible in ui
- return admin of form also for admins

## [0.9.4] - 2020-06-09
 
### Added

- `SIGNUP_DISABLED=true` to prevent users from signing up 
- travis lints

### Fixed

- startup error with invalid create admin config

## [0.9.2]

### Security

- update apollo-server for https://github.com/advisories/GHSA-w42g-7vfc-xf37
 
## [0.9.1] - 2020-06-02

### Added

- form field options
- form field rating settings
- form field logic jump settings

### Changed

- improved documentation
- Installation Metrics

### Fixed

- anonymous submission of forms
