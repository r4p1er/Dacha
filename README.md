# API

## Token
| API                        | Description              | Request body                    | Response body         |
|:--------------------------:|:------------------------:|:-------------------------------:|:---------------------:|
| `POST /api/token`          | Get a token for auth     |  Login and password of user     | Token                 |

## Accounts
| API                         | Description              | Request body  | Response body            |
|:---------------------------:|:------------------------:|:-------------:|:------------------------:|
| `GET /api/accounts`         | Get all account items    |  None         | Array of account items   |
| `GET /api/accounts/{id}`    | Get an item by ID        |  None         | Account item             |
| `POST /api/accounts`        | Add a new item           |  Account item | Account item             |
| `PUT /api/accounts/{id}`    | Update an existing item  |  Account item | None                     |
| `DELETE /api/accounts/{id}` | Delete an item           |  None         | None                     |

## Profiles
| API                         | Description              | Request body  | Response body            |
|:---------------------------:|:------------------------:|:-------------:|:------------------------:|
| `GET /api/profiles`         | Get all profile items    |  None         | Array of profile items   |
| `GET /api/profiles/{id}`    | Get an item by ID        |  None         | Profile item             |
| `POST /api/profiles`        | Add a new item           |  Profile item | Profile item             |
| `PUT /api/profiles/{id}`    | Update an existing item  |  Profile item | None                     |
| `DELETE /api/profiles/{id}` | Delete an item           |  None         | None                     |

## Roles
| API                         | Description              | Request body  | Response body            |
|:---------------------------:|:------------------------:|:-------------:|:------------------------:|
| `GET /api/roles`            | Get all role items       |  None         | Array of role items      |
| `GET /api/roles/{id}`       | Get an item by ID        |  None         | Role item                |

## Adverts
| API                        | Description              | Request body  | Response body         |
|:--------------------------:|:------------------------:|:-------------:|:---------------------:|
| `GET /api/adverts`         | Get all advert items     |  None         | Array of advert items |
| `GET /api/adverts/{id}`    | Get an item by ID        |  None         | Advert item           |
| `POST /api/adverts`        | Add a new item           |  Advert item  | Advert item           |
| `PUT /api/adverts/{id}`    | Update an existing item  |  Advert item  | None                  |
| `DELETE /api/adverts/{id}` | Delete an item           |  None         | None                  |

## News
| API                        | Description              | Request body  | Response body         |
|:--------------------------:|:------------------------:|:-------------:|:---------------------:|
| `GET /api/news`            | Get all news items       |  None         | Array of news items   |
| `GET /api/news/{id}`       | Get an item by ID        |  None         | News item             |
| `POST /api/news`           | Add a new item           |  News item    | News item             |
| `PUT /api/news/{id}`       | Update an existing item  |  News item    | None                  |
| `DELETE /api/news/{id}`    | Delete an item           |  None         | None                  |
